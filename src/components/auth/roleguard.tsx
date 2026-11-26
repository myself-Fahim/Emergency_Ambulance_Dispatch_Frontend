"use client";

import type { ReactNode } from "react";
import { useGetMe } from "@/hooks/auth.hooks";
import type { UserRole } from "@/types/roleguard.types";
import NoAccess from "./noAccess";
import AuthLoading from "./authLoading";

export type TRoleguard = {
  children: ReactNode;
  roles: UserRole[];
};

const RoleGuard = ({ children, roles }: TRoleguard) => {
  const { data, isLoading, isError } = useGetMe();

  const user = data?.data;

  if (isLoading) {
    return <AuthLoading label="loading"></AuthLoading>;
  }

  if (isError || !user) {
    return <NoAccess />;
  }

  if (!roles.includes(user.role)) {
    return <NoAccess />;
  }

  return <>{children}</>;
};

export default RoleGuard;