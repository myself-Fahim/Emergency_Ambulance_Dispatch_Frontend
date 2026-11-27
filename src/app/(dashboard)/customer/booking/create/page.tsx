import { Suspense } from "react";
import { BookingForm } from "@/components/form/booking_form";

export default function CreateBookingPage() { return <main className="mx-auto w-full max-w-[900px] space-y-6 pb-8"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Customer workspace</p><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Request an ambulance</h1><p className="mt-2 text-sm text-muted-foreground">Confirm your details and tell us where help is needed.</p></div><section className="rounded-xl border border-border/80 bg-card p-5 shadow-sm sm:p-7"><Suspense fallback={<div className="min-h-64" />}><BookingForm /></Suspense></section></main>; }
