"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Ambulance, ArrowLeft, Building2, Mail, Phone } from "lucide-react";

import AuthLoading from "@/components/auth/authLoading";
import { Button } from "@/components/ui/button";
import { useGetAmbulance } from "@/hooks/ambulance.hooks";

export function AmbulanceDetails() {
  const id = useSearchParams().get("id") ?? undefined;
  const { data, isPending, isError } = useGetAmbulance(id);
  const ambulance = data?.data;
  if (isPending) return <div className="flex min-h-64 items-center justify-center"><AuthLoading label="Loading ambulance details" /></div>;
  if (isError || !ambulance) return <div className="rounded-xl border border-border/80 bg-card p-10 text-center text-sm text-muted-foreground">Ambulance details could not be found.</div>;
  return <section className="rounded-xl border border-border/80 bg-card p-6 shadow-sm sm:p-8"><Link href="/customer/ambulance" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Back to ambulances</Link><div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"><div className="flex gap-4"><div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Ambulance className="size-8" /></div><div><p className="text-sm text-muted-foreground">Ambulance details</p><h1 className="text-3xl font-bold">{ambulance.type}</h1><p className="mt-1 text-sm text-muted-foreground">{ambulance.registrationNumber}</p></div></div><span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">{ambulance.status}</span></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><Info icon={<Building2 />} label="Provider" value={ambulance.provider?.name ?? "Unavailable"} /><Info icon={<Phone />} label="Phone" value={ambulance.provider?.phone ?? "Unavailable"} /><Info icon={<Mail />} label="Email" value={ambulance.provider?.email ?? "Unavailable"} /><Info icon={<Ambulance />} label="Registration" value={ambulance.registrationNumber} /></div><Button nativeButton={false} render={<Link href={`/customer/booking/create?ambulanceId=${encodeURIComponent(ambulance.id)}`} />} className="mt-8 h-11 w-full sm:w-auto">Book this ambulance</Button></section>;
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex items-center gap-3 rounded-lg border border-border/70 p-4"><span className="text-primary [&_svg]:size-5">{icon}</span><div><p className="text-xs text-muted-foreground">{label}</p><p className="text-sm font-semibold">{value}</p></div></div>; }
