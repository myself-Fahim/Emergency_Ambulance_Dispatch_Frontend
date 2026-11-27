import { MyBookings } from "@/components/dashboard/bookings/my-bookings";

const MyBookingsPage = () => {
  return (
    <main className="mx-auto w-full max-w-[1500px] space-y-6 pb-8">
      <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Driver workspace</p><h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">My bookings</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">Review assigned emergency requests and update each trip as you respond.</p></div>
      <MyBookings />
    </main>
  );
};

export default MyBookingsPage;
