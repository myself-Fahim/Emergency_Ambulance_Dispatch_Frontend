import { CheckCircle2, Clock3, FileCheck2, Users } from "lucide-react";

const summary = [
  {
    label: "Total applications",
    value: "48",
    note: "All time submissions",
    icon: Users,
    tone: "text-primary bg-primary/10",
  },
  {
    label: "Pending review",
    value: "12",
    note: "Needs your attention",
    icon: Clock3,
    tone: "text-amber-600 bg-amber-500/10",
  },
  {
    label: "In review",
    value: "08",
    note: "Currently being assessed",
    icon: FileCheck2,
    tone: "text-sky-600 bg-sky-500/10",
  },
  {
    label: "Approved this month",
    value: "28",
    note: "+12% from last month",
    icon: CheckCircle2,
    tone: "text-emerald-600 bg-emerald-500/10",
  },
];

export function DriverApplicationSummary() {

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {summary.map(({ label, value, note, icon: Icon, tone }) => (
        <div
          key={label}
          className="rounded-xl border border-border/80 bg-card p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {label}
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                {value}
              </p>
            </div>
            <div
              className={`flex size-9 items-center justify-center rounded-lg ${tone}`}
            >
              <Icon className="size-4" aria-hidden="true" />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{note}</p>
        </div>
      ))}
    </div>
  );
}