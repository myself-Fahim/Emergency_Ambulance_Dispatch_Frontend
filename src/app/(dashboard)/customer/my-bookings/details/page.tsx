import { Suspense } from "react";
import { CustomerBookingDetails } from "@/components/dashboard/bookings/customer-booking-details";

export default function CustomerBookingDetailsPage() { return <main className="mx-auto w-full max-w-[1100px] space-y-6 pb-8"><Suspense fallback={<div className="min-h-64" />}><CustomerBookingDetails /></Suspense></main>; }
