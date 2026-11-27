import { ProfileContent } from "@/components/dashboard/profile/profile-content";

export default function CustomerProfilePage() {
  return <main className="mx-auto w-full max-w-[1100px] space-y-6 pb-8"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Customer workspace</p><h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">My profile</h1><p className="mt-2 text-sm text-muted-foreground">View your account information.</p></div><ProfileContent /></main>;
}
