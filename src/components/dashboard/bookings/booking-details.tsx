"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Ambulance, CheckCircle2, CircleUserRound, MapPin, UserRound, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import AuthLoading from "@/components/auth/authLoading";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetDrivers } from "@/hooks/driver.hooks";
import { useGetBookings, useAssignBooking, useCancelBooking, useCompleteBooking, useStartBooking } from "@/hooks/booking.hooks";
import { getAmbulancesApi } from "@/api/ambulance.api";
import type { TBooking } from "@/types/booking.type";
import type { TDispatchAmbulance, TDispatchDriver } from "@/types/dispatch.type";
import { useQuery } from "@tanstack/react-query";

const asList = <T,>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === "object" && Array.isArray((value as { data?: unknown }).data)) {
    return (value as { data: T[] }).data;
  }
  return [];
};

const normalize = (value: unknown) => String(value ?? "").trim().toLowerCase().replace(/[\s-]+/g, "_");
const isAvailable = (item: { status?: string }) => item.status === "AVAILABLE";

const getErrorMessage = (error: unknown) => {
  if (error && typeof error === "object" && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Something went wrong. Please try again.";
};

export function BookingDetails() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const { data: bookingResponse, isPending: bookingsPending } = useGetBookings();
  const { data: driverResponse, isPending: driversPending } = useGetDrivers();
  const { data: ambulanceResponse, isPending: ambulancesPending, isError: ambulancesError } = useQuery({
    queryKey: ["ambulances"],
    queryFn: getAmbulancesApi,
  });
  const assignBooking = useAssignBooking();
  const startBooking = useStartBooking();
  const completeBooking = useCompleteBooking();
  const cancelBooking = useCancelBooking();
  const [driverId, setDriverId] = useState("");
  const [ambulanceId, setAmbulanceId] = useState("");

  const bookings = asList<TBooking>(bookingResponse);
  const booking = bookings.find((item) => item.id === bookingId);
  const drivers = asList<TDispatchDriver>(driverResponse).filter(
    (driver) =>
      driver.driver?.availability === "AVAILABLE" ||
      driver.driver?.id === booking?.driverId ||
      driver.id === booking?.driverId,
  );
  const ambulances = asList<TDispatchAmbulance>(ambulanceResponse).filter((ambulance) => {
    const ambulanceType = ambulance.type ?? ambulance.ambulanceType;
    return (
      normalize(ambulanceType) === normalize(booking?.ambulanceType) &&
      (isAvailable(ambulance) || ambulance.id === booking?.ambulanceId)
    );
  });
  const isLoading = bookingsPending || driversPending || ambulancesPending;
  const isMutating = assignBooking.isPending || startBooking.isPending || completeBooking.isPending || cancelBooking.isPending;
  const isAssigned = Boolean(booking?.driverId && booking.ambulanceId);
  const canStart = isAssigned && booking?.status === "ACCEPTED";
  const canComplete = booking?.status === "IN_PROGRESS";

  const assignedDriver = useMemo(
    () => drivers.find((driver) => driver.driver?.id === booking?.driverId || driver.id === booking?.driverId),
    [drivers, booking?.driverId],
  );
  const selectedDriver = useMemo(() => drivers.find((driver) => (driver.driver?.id ?? driver.id) === driverId), [drivers, driverId]);
  const selectedAmbulance = useMemo(() => ambulances.find((ambulance) => ambulance.id === ambulanceId), [ambulances, ambulanceId]);

  useEffect(() => {
    setDriverId(assignedDriver?.driver?.id ?? booking?.driverId ?? "");
    setAmbulanceId(booking?.ambulanceId ?? "");
  }, [assignedDriver, booking?.driverId, booking?.ambulanceId]);

  const runMutation = (mutation: { mutate: (id: string, options: { onSuccess: (response: unknown) => void; onError: (error: unknown) => void }) => void }, id: string, success: string) => {
    mutation.mutate(id, {
      onSuccess: () => toast.add({ type: "success", title: success, description: "The booking list has been refreshed." }),
      onError: (error) => toast.add({ type: "error", title: "Request failed", description: getErrorMessage(error) }),
    });
  };

  if (isLoading) return <div className="flex min-h-64 items-center justify-center"><AuthLoading label="Loading booking details" /></div>;
  if (!bookingId || !booking) {
    return <section className="rounded-xl border border-border/80 bg-card p-8 text-center text-sm text-muted-foreground">Booking not found. Return to the booking list and choose a booking.</section>;
  }

  const assign = () => {
    if (!driverId || !ambulanceId) return;
    assignBooking.mutate({ bookingId: booking.id, driverId, ambulanceId }, {
      onSuccess: () => toast.add({ type: "success", title: "Booking assigned", description: "The driver and ambulance are now assigned to this booking." }),
      onError: (error) => toast.add({ type: "error", title: "Assignment failed", description: getErrorMessage(error) }),
    });
  };

  return (
    <div className="space-y-6">
      <Link href="/admin/booking" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Back to bookings</Link>
      <section className="rounded-xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Dispatch details</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">Booking assignment</h1>
            <p className="mt-1 break-all text-xs text-muted-foreground">{booking.id}</p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold">{booking.status.replace("_", " ")}</span>
        </div>
        <div className="grid gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
          <Info icon={<CircleUserRound />} label="Customer" value={booking.CustomerName} detail={booking.CustomerPhone} />
          <Info icon={<MapPin />} label="Route" value={booking.pickupAddress} detail={`To: ${booking.destinationAddress ?? "Not specified"}`} />
          <Info icon={<Ambulance />} label="Request" value={booking.ambulanceType} detail={`${booking.emergencyType} · ${booking.priority}`} />
          <Info icon={<UserRound />} label="Current assignment" value={booking.driverId ? "Driver assigned" : "Unassigned"} detail={booking.ambulanceId ? "Ambulance assigned" : "Ambulance unassigned"} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <AssignmentCard title="Assign driver" icon={<UserRound className="size-5" />}>
          <select value={driverId} onChange={(event) => setDriverId(event.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" disabled={drivers.length === 0}>
            <option value="">{drivers.length ? "Select an available driver" : "No available drivers"}</option>
            {drivers.map((driver) => <option key={driver.driver?.id ?? driver.id} value={driver.driver?.id ?? driver.id}>{driver.name ?? driver.email ?? driver.id}{driver.driver?.phone ? ` · ${driver.driver.phone}` : ""}</option>)}
          </select>
          {selectedDriver && <p className="mt-2 text-xs text-muted-foreground">Selected: {selectedDriver.name ?? selectedDriver.id}{selectedDriver.driver?.phone ? ` · ${selectedDriver.driver.phone}` : ""}</p>}
        </AssignmentCard>
        <AssignmentCard title={`Assign ${booking.ambulanceType} ambulance`} icon={<Ambulance className="size-5" />}>
          <select value={ambulanceId} onChange={(event) => setAmbulanceId(event.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" disabled={ambulances.length === 0}>
            <option value="">{ambulances.length ? "Select an available ambulance" : `No available ${booking.ambulanceType} ambulances`}</option>
            {ambulances.map((ambulance) => {
              const ambulanceType = ambulance.type ?? ambulance.ambulanceType ?? booking.ambulanceType;
              const registrationNumber = ambulance.registrationNumber ?? ambulance.vehicleNumber ?? ambulance.name ?? ambulance.id;
              return <option key={ambulance.id} value={ambulance.id}>{ambulanceType} · {registrationNumber}</option>;
            })}
          </select>
          {selectedAmbulance && <p className="mt-2 text-xs text-muted-foreground">Selected: {selectedAmbulance.type ?? selectedAmbulance.ambulanceType ?? booking.ambulanceType} · {selectedAmbulance.registrationNumber ?? selectedAmbulance.vehicleNumber ?? selectedAmbulance.id}</p>}
        </AssignmentCard>
      </section>

      {ambulancesError && <p className="text-sm text-destructive">Unable to load ambulances. Please refresh and try again.</p>}
      <section className="flex flex-wrap gap-3 rounded-xl border border-border/80 bg-card p-5 shadow-sm">
        <Button onClick={assign} disabled={booking.status !== "PENDING" || !driverId || !ambulanceId || isMutating}><CheckCircle2 className="size-4" />Assign booking</Button>
        <Button variant="outline" onClick={() => runMutation(startBooking, booking.id, "Booking started")} disabled={!canStart || isMutating}>Start / In Progress</Button>
        <Button variant="outline" onClick={() => runMutation(completeBooking, booking.id, "Booking completed")} disabled={!canComplete || isMutating}>Complete</Button>
        <Button
          variant="destructive"
          onClick={() => runMutation(cancelBooking, booking.id, "Booking cancelled")}
          disabled={isMutating || !["PENDING", "ASSIGNED", "ACCEPTED"].includes(booking.status)}
        >
          <XCircle className="size-4" />Cancel booking
        </Button>
      </section>
      <p className="text-xs text-muted-foreground">Start is enabled after assignment. Complete is enabled once the booking is in progress. Cancellation remains available until the booking is cancelled.</p>
    </div>
  );
}

function Info({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  return <div className="rounded-lg bg-muted/45 p-4"><div className="mb-2 flex items-center gap-2 text-primary">{icon}<span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span></div><p className="truncate font-semibold" title={value}>{value}</p><p className="truncate text-xs text-muted-foreground" title={detail}>{detail}</p></div>;
}

function AssignmentCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm"><h2 className="mb-4 flex items-center gap-2 font-semibold">{icon}{title}</h2>{children}</div>;
}
