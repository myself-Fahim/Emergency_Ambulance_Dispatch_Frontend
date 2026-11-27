import { Suspense } from "react";
import { AmbulanceDetails } from "@/components/dashboard/ambulances/ambulance-details";

export default function AmbulanceDetailsPage() { return <main className="mx-auto w-full max-w-[1100px] space-y-6 pb-8"><Suspense fallback={<div className="min-h-64" />}><AmbulanceDetails /></Suspense></main>; }
