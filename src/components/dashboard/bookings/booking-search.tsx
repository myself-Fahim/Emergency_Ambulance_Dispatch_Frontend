"use client";

import { Filter, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type BookingSearchProps = {
  searchTerm: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export function BookingSearch({
  searchTerm,
  status,
  onSearchChange,
  onStatusChange,
}: BookingSearchProps) {
  return (
    <section className="rounded-xl border border-border/80 bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Filter className="size-4" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Find a booking
          </h2>
          <p className="text-xs text-muted-foreground">
            Search by customer, phone, address, or booking ID.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
        <label htmlFor="booking-search" className="relative block">
          <span className="sr-only">Search bookings</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="booking-search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search bookings..."
            className="h-10 pl-9"
          />
        </label>

        <label htmlFor="booking-status" className="block">
          <span className="sr-only">Filter by booking status</span>
          <select
            id="booking-status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="ALL">All bookings</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </label>
      </div>
    </section>
  );
}
