"use client";

import { CalendarDays, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";

import AuthLoading from "@/components/auth/authLoading";
import { useGetMe } from "@/hooks/auth.hooks";

const demoImage = (name: string) => `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0f766e`;

const formatDate = (value?: string) => value ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value)) : "Not available";

export function ProfileContent() {
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;

  if (isPending) return <div className="flex min-h-64 items-center justify-center"><AuthLoading label="Loading profile" /></div>;
  if (isError || !user) return <div className="rounded-xl border border-border/80 bg-card p-8 text-center text-sm text-muted-foreground">Unable to load your profile.</div>;

  const phone = user.driver?.phone ?? user.phone;
  const image = user.image || demoImage(user.name);

  return (
    <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
      <div className="h-32 bg-gradient-to-r from-primary/80 via-primary to-teal-700" />
      <div className="px-5 pb-6 sm:px-8">
        <div className="-mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <img src={image} alt={`${user.name}'s profile`} className="size-28 rounded-2xl border-4 border-card bg-muted object-cover shadow-lg" />
            <div className="pb-1"><h2 className="text-2xl font-bold text-foreground">{user.name}</h2><p className="text-sm text-muted-foreground">{user.role}</p></div>
          </div>
          <span className="mb-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300"><span className="size-1.5 rounded-full bg-current" />{user.status}</span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ProfileItem icon={<Mail />} label="Email" value={user.email} />
          <ProfileItem icon={<Phone />} label="Phone" value={phone ?? "Not provided"} />
          <ProfileItem icon={<ShieldCheck />} label="Account status" value={user.emailVerified ? "Email verified" : "Email not verified"} />
          <ProfileItem icon={<CalendarDays />} label="Member since" value={formatDate(user.createdAt)} />
        </div>

        {user.driver && <div className="mt-6 rounded-xl bg-muted/45 p-4"><div className="mb-3 flex items-center gap-2 font-semibold"><UserRound className="size-4 text-primary" />Driver details</div><div className="grid gap-3 text-sm sm:grid-cols-2"><p><span className="text-muted-foreground">Availability:</span> <span className="font-medium">{user.driver.availability}</span></p><p><span className="text-muted-foreground">Driver ID:</span> <span className="font-medium">{user.driver.id}</span></p></div></div>}
      </div>
    </section>
  );
}

function ProfileItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="flex items-center gap-3 rounded-lg border border-border/70 p-4"><span className="text-primary [&_svg]:size-5">{icon}</span><div className="min-w-0"><p className="text-xs text-muted-foreground">{label}</p><p className="truncate text-sm font-semibold text-foreground" title={value}>{value}</p></div></div>;
}
