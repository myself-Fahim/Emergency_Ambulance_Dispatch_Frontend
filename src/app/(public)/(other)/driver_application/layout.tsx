import type { ReactNode } from "react";

import { LoggedInRouteGuard } from "@/components/auth/logged-in-route-guard";

export default function DriverApplicationLayout({ children }: { children: ReactNode }) {
  return <LoggedInRouteGuard>{children}</LoggedInRouteGuard>;
}
