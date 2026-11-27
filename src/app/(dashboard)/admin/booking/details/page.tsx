import { Suspense } from "react";

import { BookingDetails } from "@/components/dashboard/bookings/booking-details";

export default function BookingDetailsPage() {
  return (
    <main className="mx-auto w-full max-w-[1500px] space-y-6 pb-8">
      <Suspense fallback={<div className="min-h-64" />}>
        <BookingDetails />
      </Suspense>
    </main>
  );
}
