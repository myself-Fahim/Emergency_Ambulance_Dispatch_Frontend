import { Filter, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function DriverApplicationSearch() {
  return (
    <section className="rounded-xl border border-border/80 bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Filter className="size-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Find an application
            </h2>
            <p className="text-xs text-muted-foreground">
              Search by applicant, ID, or license number.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
        <label htmlFor="application-search" className="relative block">
          <span className="sr-only">Search applications</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="application-search"
            placeholder="Search applications..."
            className="h-10 pl-9"
          />
        </label>

        <label htmlFor="application-status" className="block">
          <span className="sr-only">Filter by status</span>
          <select
            id="application-status"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option>All applications</option>
            <option>Pending review</option>
            <option>In review</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </label>
      </div>
    </section>
  );
}
