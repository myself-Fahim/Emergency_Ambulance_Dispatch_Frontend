"use client";

import Link from "next/link";
import { Ambulance, ArrowRight, Building2, Phone } from "lucide-react";

import AuthLoading from "@/components/auth/authLoading";
import { useGetAmbulances } from "@/hooks/ambulance.hooks";

export function AmbulanceList() {
  const { data, isPending, isFetching, isError } = useGetAmbulances();
  const ambulances = data?.data?.filter((ambulance) => ambulance.status === "AVAILABLE") ?? [];

  return <section className="space-y-5">
    {isPending || isFetching ? <div className="flex min-h-48 items-center justify-center"><AuthLoading label="Finding available ambulances" /></div> : isError ? <div className="rounded-xl border border-border/80 bg-card p-10 text-center text-sm text-muted-foreground">Unable to retrieve available ambulances.</div> : ambulances.length === 0 ? <div className="rounded-xl border border-border/80 bg-card p-10 text-center text-sm text-muted-foreground">No ambulances are available currently.</div> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{ambulances.map((ambulance) => <article key={ambulance.id} className="rounded-xl border border-border/80 bg-card p-5 shadow-sm transition-shadow hover:shadow-md"><div className="flex items-start justify-between"><div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Ambulance className="size-6" /></div><span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">AVAILABLE</span></div><h2 className="mt-5 text-lg font-bold">{ambulance.type}</h2><p className="mt-1 text-sm text-muted-foreground">Registration: <span className="font-semibold text-foreground">{ambulance.registrationNumber}</span></p><div className="mt-4 space-y-2 text-sm text-muted-foreground"><p className="flex items-center gap-2"><Building2 className="size-4 text-primary" />{ambulance.provider?.name ?? "Provider unavailable"}</p><p className="flex items-center gap-2"><Phone className="size-4 text-primary" />{ambulance.provider?.phone ?? "Phone unavailable"}</p></div><Link href={`/customer/ambulance/details?id=${encodeURIComponent(ambulance.id)}`} className="mt-5 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/80">View details <ArrowRight className="size-4" /></Link></article>)}</div>}
  </section>;
}
