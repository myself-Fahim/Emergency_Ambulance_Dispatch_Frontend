import { BookingTable } from "@/components/dashboard/bookings/booking-table";

const Booking = () => {
  return (
    <main className="mx-auto w-full max-w-[1500px] space-y-6 pb-8">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Admin workspace
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Booking management
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Review customer requests and keep emergency dispatch activity moving.
        </p>
      </div>

      <BookingTable />
    </main>
  );
};

export default Booking;
