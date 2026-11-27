"use client";

import { Eye } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import AuthLoading from "@/components/auth/authLoading";
import { useGetBookings } from "@/hooks/booking.hooks";
import type { TBooking } from "@/types/booking.type";

import { BookingSearch } from "./booking-search";

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  CONFIRMED: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  IN_PROGRESS: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  COMPLETED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  CANCELLED: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  REJECTED: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export function BookingTable() {
  const { data, isPending, isFetching, isError } = useGetBookings();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("ALL");
  const bookings = data?.data ?? [];
  const isLoading = isPending || isFetching;

  const filteredBookings = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return bookings.filter((booking: TBooking) => {
      const matchesSearch =
        !query ||
        [
          booking.id,
          booking.CustomerName,
          booking.CustomerPhone,
          booking.pickupAddress,
          booking.destinationAddress,
          booking.emergencyType,
        ].some((value) => value?.toLowerCase().includes(query));

      return matchesSearch && (status === "ALL" || booking.status === status);
    });
  }, [bookings, searchTerm, status]);

  return (
    <>
      <BookingSearch
        searchTerm={searchTerm}
        status={status}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatus}
      />
      <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
        <div className="flex flex-col gap-1 border-b border-border/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Bookings
            </h2>
            <p className="text-xs text-muted-foreground">
              Monitor customer requests and emergency dispatch details.
            </p>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {filteredBookings.length} results
          </span>
        </div>

        {isLoading ? (
          <div className="flex min-h-48 items-center justify-center">
            <AuthLoading label="Retrieving bookings" />
          </div>
        ) : isError ? (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground">
            Unable to retrieve bookings right now. Please try again later.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-muted/45 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Trip</th>
                  <th className="px-4 py-3 font-semibold">Emergency</th>
                  <th className="px-4 py-3 font-semibold">Fare</th>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {filteredBookings.length ? (
                  filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="transition-colors hover:bg-muted/25"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-foreground">
                          {booking.CustomerName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.CustomerPhone}
                        </p>
                      </td>
                      <td className="max-w-[280px] px-4 py-4">
                        <p
                          className="truncate text-foreground"
                          title={booking.pickupAddress}
                        >
                          From: {booking.pickupAddress}
                        </p>
                        <p
                          className="truncate text-xs text-muted-foreground"
                          title={booking.destinationAddress ?? "Not specified"}
                        >
                          To: {booking.destinationAddress ?? "Not specified"}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-foreground">
                          {booking.emergencyType}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.ambulanceType} · {booking.priority}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-medium text-foreground">
                        {booking.payment?.currency ?? "BDT"}{" "}
                        {booking.estimatedFare}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                        {formatDate(booking.createdAt)}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[booking.status] ?? "bg-muted text-muted-foreground"}`}
                        >
                          <span className="mr-1.5 size-1.5 self-center rounded-full bg-current" />
                          {booking.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/booking/details?id=${encodeURIComponent(booking.id)}`}
                          className="inline-flex size-7 items-center justify-center rounded-lg text-sm font-medium transition-all hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                          aria-label={`View booking for ${booking.CustomerName}`}
                          title="View booking"
                        >
                          <Eye className="size-4" aria-hidden="true" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-sm text-muted-foreground"
                    >
                      No bookings match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
