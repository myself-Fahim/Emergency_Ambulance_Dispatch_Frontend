import { Ambulance, HeartPulse, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr] lg:px-10">
        <div>
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Ambulance className="size-5" />
            </span>
            <span className="text-lg font-bold">Ambulancia</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
            A connected emergency ambulance network helping people reach timely,
            reliable care when it matters most.
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs font-medium text-rose-300">
            <HeartPulse className="size-4" />
            Care in motion
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Explore</h2>
          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/about" className="transition-colors hover:text-white">
              About us
            </Link>
            <Link
              href="/register"
              className="transition-colors hover:text-white"
            >
              Create an account
            </Link>
            <Link
              href="/driver_application"
              className="transition-colors hover:text-white"
            >
              Join as a driver
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Need help?</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <a
              href="tel:999"
              className="flex items-center gap-2 hover:text-white"
            >
              <Phone className="size-4" />
              Emergency: 999
            </a>
            <a
              href="mailto:support@ambulancia.app"
              className="flex items-center gap-2 hover:text-white"
            >
              <Mail className="size-4" />
              support@ambulancia.app
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 Ambulancia. All rights reserved.</p>
          <p>Built for faster, safer emergency response.</p>
        </div>
      </div>
    </footer>
  );
}
