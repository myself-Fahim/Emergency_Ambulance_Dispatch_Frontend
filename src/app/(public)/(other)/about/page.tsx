import {
  Activity,
  HeartHandshake,
  Route,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const values = [
  {
    icon: HeartHandshake,
    title: "People first",
    text: "Every decision starts with the patient and the people supporting them.",
  },
  {
    icon: Activity,
    title: "Move with purpose",
    text: "Clear information helps dispatch teams make confident, timely decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Trust by design",
    text: "A simple, transparent experience for users, drivers, and care teams.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background">
      <section className="relative overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10">
        <div className="absolute right-[-8rem] top-[-12rem] size-[30rem] rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-rose-300">
            About Ambulancia
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Emergency response should feel connected.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-300 sm:text-lg">
            We are building a more coordinated way for people to request help,
            for drivers to serve their communities, and for dispatch teams to
            keep every journey moving.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:items-center md:py-24 lg:px-10">
        <div>
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Route className="size-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            One clear route from need to care.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-7 text-muted-foreground">
          <p>
            Ambulancia connects the full dispatch journey in one place. A
            customer can request an ambulance, a driver can respond to an
            assignment, and administrators can coordinate the network behind the
            scenes.
          </p>
          <p>
            That means less uncertainty at the moment help is needed and a
            better experience for the people doing the work. We keep the
            interface focused, the actions clear, and the information useful.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40 px-5 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              What guides us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built around calm, confident action.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between md:py-20 lg:px-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Our network
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Better together, every mile.
          </h2>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <UsersRound className="size-8 text-primary" />
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            Customers, drivers, and dispatchers working as one response team.
          </p>
        </div>
      </section>
    </main>
  );
}
