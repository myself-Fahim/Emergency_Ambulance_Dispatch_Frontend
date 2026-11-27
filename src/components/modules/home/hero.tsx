import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  HeartPulse,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const highlights = [
  { icon: Clock3, label: "Fast response", value: "When every second matters" },
  { icon: MapPin, label: "Live dispatch", value: "The nearest help, directed" },
  {
    icon: ShieldCheck,
    label: "Trusted care",
    value: "A safer way to get moving",
  },
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_15%,rgba(225,29,72,0.3),transparent_34%),radial-gradient(circle_at_15%_85%,rgba(14,165,233,0.18),transparent_30%)]" />
      <div className="absolute right-[-10rem] top-1/3 -z-10 size-[28rem] rounded-full border border-white/10 bg-white/[0.03] blur-sm sm:size-[42rem]" />
      <div className="absolute bottom-[-14rem] left-[-10rem] -z-10 size-[30rem] rounded-full border border-rose-300/10 bg-rose-500/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-rose-100/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-rose-100">
            <span className="flex size-2 animate-pulse rounded-full bg-rose-400" />
            Emergency support, connected
          </div>
          <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Help is closer than you think.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-slate-300 sm:text-lg">
            Ambulancia brings patients, drivers, and dispatch teams together so
            the right ambulance can reach the right place, faster.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              render={<Link href="/register" />}
              nativeButton={false}
              className="h-12 rounded-full bg-rose-500 px-6 text-white shadow-lg shadow-rose-950/30 hover:bg-rose-400"
            >
              Register as a user
              <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/driver_application" />}
              nativeButton={false}
              className="h-12 rounded-full border-white/20 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white"
            >
              Apply as a driver
            </Button>
          </div>

          <div className="mt-12 grid max-w-xl gap-5 border-t border-white/10 pt-6 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-3 sm:block">
                <div className="mb-2 flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-rose-300 sm:size-8">
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
          <div className="absolute -left-4 top-8 z-10 hidden items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-2xl backdrop-blur sm:flex">
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <BadgeCheck className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Dispatch ready</p>
              <p className="text-[11px] text-slate-400">
                Coordinated care, all the way
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.08] p-3 shadow-2xl shadow-black/30 backdrop-blur sm:p-5">
            <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-rose-500 via-rose-600 to-slate-900">
              <Image
                src="/ambulance-dispatch.svg"
                alt="Emergency ambulance dispatch illustration"
                width={700}
                height={700}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-5 sm:px-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-300">
                  <HeartPulse className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Care in motion
                  </p>
                  <p className="text-xs text-slate-400">
                    Your journey starts here
                  </p>
                </div>
              </div>
              <span className="hidden rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300 sm:inline-flex">
                Available 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
