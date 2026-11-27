/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import AuthLoading from "@/components/auth/authLoading";
import NoAccess from "@/components/auth/noAccess";
import { useGetMe } from "@/hooks/auth.hooks";

const redirectByRole = {
  ADMIN: "/admin",
  DRIVER: "/driver/my-bookings",
  CUSTOMER: "/customer/profile",
} as const;

export function LoggedInRouteGuard({ children, loggedInBehavior = "redirect" }: { children: ReactNode; loggedInBehavior?: "redirect" | "no-access" }) {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;
  const shouldRedirect = loggedInBehavior === "redirect";

  useEffect(() => {
    if (shouldRedirect && !isPending && user && !isError) {
      router.replace(redirectByRole[user.role as keyof typeof redirectByRole] ?? "/");
    }
  // The behavior is fixed by the route layout for the lifetime of this guard.
  // Keeping this dependency list stable also avoids Fast Refresh hook warnings.
  // biome-ignore lint/correctness/useExhaustiveDependencies: route behavior does not change while mounted
  }, [isError, isPending, router, user]);

  if (isPending || (user && !isError)) {
    if (loggedInBehavior === "no-access" && user && !isError) {
      return <NoAccess showNavbar={false} />;
    }
    return <AuthLoading label="Checking your account" />;
  }

  return <>{children}</>;
}
