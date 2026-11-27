/** biome-ignore-all lint/a11y/useValidAriaRole: <explanation> */
import RoleGuard from '@/components/auth/roleguard';
import DashboardShell from '@/components/dashboard/dashboard_shell';
import React, { ReactNode } from 'react';

const DriverLayout = ({children}:{children : ReactNode}) => {
    return (
       <RoleGuard roles={["DRIVER"]}>
        <DashboardShell role="DRIVER">{children}</DashboardShell>
       </RoleGuard>
    );
};

export default DriverLayout;
