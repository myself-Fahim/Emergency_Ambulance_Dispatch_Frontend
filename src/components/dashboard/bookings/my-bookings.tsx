"use client";

import { Ambulance, Check, CircleCheck, Clock3, MapPin, Play, UserRound } from "lucide-react";

import AuthLoading from "@/components/auth/authLoading";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useGetMe } from "@/hooks/auth.hooks";
import { useAcceptBooking, useCompleteBooking, useGetMyAssignedBookings, useStartBooking } from "@/hooks/booking.hooks";
import type { TBooking } from "@/types/booking.type";

const statusStyles: Record<string, string> = {
  ASSIGNED: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  ACCEPTED: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  IN_PROGRESS: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  COMPLETED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
};

const formatDate = (value: string) => new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));

const errorMessage = (error: unknown) => {
  if (error && typeof error === "object" && "data" in error) {
    return (error as { data?: { message?: string } }).data?.message ?? "Request failed.";
  }
  return "Request failed.";
};

export function MyBookings() {
  const { data: userResponse, isPending: userPending } = useGetMe();
  const driverId = (userResponse?.data as { driver?: { id?: string } } | undefined)?.driver?.id;
  const { data, isPending, isFetching, isError } = useGetMyAssignedBookings(driverId);
  const accept = useAcceptBooking();
  const start = useStartBooking();
  const complete = useCompleteBooking();
  const bookings = data?.data ?? [];
  const isLoading = userPending || isPending || isFetching;
  const isMutating = accept.isPending || start.isPending || complete.isPending;

  const runAction = (mutation: { mutate: (id: string, options: { onSuccess: () => void; onError: (error: unknown) => void }) => void }, booking: TBooking, title: string) => {
    mutation.mutate(booking.id, {
      onSuccess: () => toast.add({ type: "success", title, description: "Your bookings have been refreshed." }),
      onError: (error) => toast.add({ type: "error", title: "Action failed", description: errorMessage(error) }),
    });
  };

  return (
    <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
      <div className="flex flex-col gap-1 border-b border-border/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div><h2 className="text-base font-semibold text-foreground">My assigned bookings</h2><p className="text-xs text-muted-foreground">Accept and manage emergency trips assigned to you.</p></div>
        <span className="text-xs font-medium text-muted-foreground">{bookings.length} bookings</span>
      </div>
      {isLoading ? <div className="flex min-h-48 items-center justify-center"><AuthLoading label="Retrieving assigned bookings" /></div> : bookings.length === 0 ? <div className="px-5 py-12 text-center text-sm text-muted-foreground">You have no booking assigned currently.</div> : isError ? <div className="px-5 py-12 text-center text-sm text-muted-foreground">Unable to retrieve your bookings right now.</div> : (
        <div className="divide-y divide-border/70">
          {bookings.map((booking) => <BookingCard key={booking.id} booking={booking} isMutating={isMutating} onAccept={() => runAction(accept, booking, "Booking accepted")} onStart={() => runAction(start, booking, "Booking started")} onComplete={() => runAction(complete, booking, "Booking completed")} />)}
        </div>
      )}
    </section>
  );
}

function BookingCard({ booking, isMutating, onAccept, onStart, onComplete }: { booking: TBooking; isMutating: boolean; onAccept: () => void; onStart: () => void; onComplete: () => void }) {
  const canAccept = booking.status === "ASSIGNED";
  const canStart = booking.status === "ACCEPTED";
  const canComplete = booking.status === "IN_PROGRESS";

  return (
    <article className="p-5 transition-colors hover:bg-muted/20">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">{booking.CustomerName}</span><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[booking.status] ?? "bg-muted text-muted-foreground"}`}>{booking.status.replace("_", " ")}</span><span className="text-xs text-muted-foreground">{formatDate(booking.createdAt)}</span></div>
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /><div><p className="font-medium">{booking.pickupAddress}</p><p className="text-xs text-muted-foreground">To: {booking.destinationAddress ?? "Not specified"}</p></div></div>
            <div className="flex gap-2"><Ambulance className="mt-0.5 size-4 shrink-0 text-primary" /><div><p className="font-medium">{booking.ambulanceType} ambulance</p><p className="text-xs text-muted-foreground">{booking.emergencyType} · {booking.priority} · {booking.CustomerPhone}</p></div></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 xl:justify-end">
          <Button size="sm" onClick={onAccept} disabled={!canAccept || isMutating}><Check className="size-4" />Accept</Button>
          <Button size="sm" variant="outline" onClick={onStart} disabled={!canStart || isMutating}><Play className="size-4" />Start</Button>
          <Button size="sm" variant="outline" onClick={onComplete} disabled={!canComplete || isMutating}>{isMutating ? <Spinner /> : <CircleCheck className="size-4" />}Complete</Button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><UserRound className="size-3.5" />Customer: {booking.CustomerPhone}</span><span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" />Payment: {booking.payment?.status ?? "PENDING"}</span><span>Fare: {booking.payment?.currency ?? "BDT"} {booking.estimatedFare}</span></div>
    </article>
  );
}
