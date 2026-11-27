import { AmbulanceList } from "@/components/dashboard/ambulances/ambulance-list";

export default function CustomerAmbulancesPage() {
  return <main className="mx-auto w-full max-w-[1500px] space-y-6 pb-8"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Customer workspace</p><h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Available ambulances</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">Choose an available ambulance for your emergency request.</p></div><AmbulanceList /></main>;
}
