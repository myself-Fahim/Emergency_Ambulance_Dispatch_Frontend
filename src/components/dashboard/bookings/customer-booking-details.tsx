"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Ambulance, CheckCircle2, Clock3, MapPin } from "lucide-react";
import { useGetMyBookings } from "@/hooks/booking.hooks";
import { useCreateCheckout } from "@/hooks/payment.hooks";
import AuthLoading from "@/components/auth/authLoading";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export function CustomerBookingDetails() {
  const id = useSearchParams().get("id");
  const { data, isPending } = useGetMyBookings();
  const checkout = useCreateCheckout();
  const booking = data?.data?.find((item) => item.id === id);
  if (isPending) return <div className="flex min-h-64 items-center justify-center"><AuthLoading label="Loading booking details" /></div>;
  if (!booking) return <div className="rounded-xl border border-border/80 bg-card p-10 text-center text-sm text-muted-foreground">Booking details could not be found.</div>;
  const paid = booking.payment?.status === "PAID";
  const pay = () => checkout.mutate(booking.id, { onSuccess: (response) => window.location.assign(response.data.checkoutUrl), onError: (error) => toast.add({ type: "error", title: "Checkout failed", description: error.data?.message ?? "Unable to start payment checkout." }) });
  return <section className="rounded-xl border border-border/80 bg-card p-6 shadow-sm sm:p-8"><Link href="/customer/my-bookings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Back to my bookings</Link><div className="mt-8 flex items-start justify-between gap-4"><div><p className="text-sm text-muted-foreground">Booking details</p><h1 className="mt-1 text-2xl font-bold">{booking.ambulanceType} ambulance</h1><p className="mt-1 text-xs text-muted-foreground">{booking.id}</p></div><span className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold">{booking.status.replace("_", " ")}</span></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><Info icon={<MapPin />} label="Pickup" value={booking.pickupAddress} /><Info icon={<Ambulance />} label="Emergency" value={`${booking.emergencyType} · ${booking.priority}`} /><Info icon={<Clock3 />} label="Payment" value={booking.payment?.status ?? "PENDING"} /><Info icon={<CheckCircle2 />} label="Fare" value={`${booking.payment?.currency ?? "BDT"} ${booking.estimatedFare}`} /></div><Button onClick={pay} disabled={paid || checkout.isPending} className="mt-8 h-11 w-full sm:w-auto">{paid ? "Paid" : checkout.isPending ? "Starting checkout..." : "Pay now"}</Button></section>;
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex items-center gap-3 rounded-lg border border-border/70 p-4"><span className="text-primary [&_svg]:size-5">{icon}</span><div><p className="text-xs text-muted-foreground">{label}</p><p className="text-sm font-semibold">{value}</p></div></div>; }
