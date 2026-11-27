"use client";

import Link from "next/link";
import { ArrowRight, Ambulance, Clock3, MapPin } from "lucide-react";

import AuthLoading from "@/components/auth/authLoading";
import { useGetMyBookings } from "@/hooks/booking.hooks";

const statusStyles: Record<string, string> = { PENDING: "bg-amber-500/10 text-amber-700", ACCEPTED: "bg-sky-500/10 text-sky-700", IN_PROGRESS: "bg-violet-500/10 text-violet-700", COMPLETED: "bg-emerald-500/10 text-emerald-700", CANCELLED: "bg-rose-500/10 text-rose-700" };

export function CustomerBookings() {
  const { data, isPending, isFetching, isError } = useGetMyBookings();
  const bookings = data?.data ?? [];
  if (isPending || isFetching) return <div className="flex min-h-48 items-center justify-center"><AuthLoading label="Retrieving your bookings" /></div>;
  if (bookings.length === 0) return <div className="rounded-xl border border-border/80 bg-card p-10 text-center text-sm text-muted-foreground">You have no booking currently.</div>;
  if (isError) return <div className="rounded-xl border border-border/80 bg-card p-10 text-center text-sm text-muted-foreground">Unable to retrieve your bookings.</div>;
  return <div className="grid gap-5 lg:grid-cols-2">{bookings.map((booking) => <article key={booking.id} className="rounded-xl border border-border/80 bg-card p-5 shadow-sm"><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold">{booking.ambulanceType} ambulance</span><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[booking.status] ?? "bg-muted"}`}>{booking.status.replace("_", " ")}</span></div><div className="mt-5 space-y-3 text-sm"><p className="flex gap-2"><MapPin className="size-4 shrink-0 text-primary" />{booking.pickupAddress}</p><p className="flex gap-2"><Ambulance className="size-4 shrink-0 text-primary" />{booking.emergencyType} · {booking.priority}</p><p className="flex gap-2 text-muted-foreground"><Clock3 className="size-4 shrink-0" />Payment: {booking.payment?.status ?? "PENDING"}</p></div><div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4"><span className="font-semibold">{booking.payment?.currency ?? "BDT"} {booking.estimatedFare}</span><Link href={`/customer/my-bookings/details?id=${encodeURIComponent(booking.id)}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">View details <ArrowRight className="size-4" /></Link></div></article>)}</div>;
}
