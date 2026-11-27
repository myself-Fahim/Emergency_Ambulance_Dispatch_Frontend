import { CustomerBookings } from "@/components/dashboard/bookings/customer-bookings";

export default function CustomerBookingsPage() { return <main className="mx-auto w-full max-w-[1500px] space-y-6 pb-8"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Customer workspace</p><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">My bookings</h1><p className="mt-2 text-sm text-muted-foreground">Track your ambulance requests and payment status.</p></div><CustomerBookings /></main>; }
