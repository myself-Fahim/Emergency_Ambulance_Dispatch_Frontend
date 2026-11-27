"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import AuthLoading from "@/components/auth/authLoading";
import { useGetMe } from "@/hooks/auth.hooks";

const redirectByRole = {
  ADMIN: "/admin",
  DRIVER: "/driver/my-bookings",
  CUSTOMER: "/customer/profile",
} as const;

export function LoggedInRouteGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;

  useEffect(() => {
    if (!isPending && user && !isError) {
      router.replace(redirectByRole[user.role as keyof typeof redirectByRole] ?? "/");
    }
  }, [isError, isPending, router, user]);

  if (isPending || (user && !isError)) {
    return <AuthLoading label="Checking your account" />;
  }

  return <>{children}</>;
}
