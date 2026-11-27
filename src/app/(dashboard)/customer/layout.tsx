import RoleGuard from '@/components/auth/roleguard';
import DashboardShell from '@/components/dashboard/dashboard_shell';
import React, { ReactNode } from 'react';

const CustomerLayout = ({ children }: { children: ReactNode }) => {
    return (
        <RoleGuard roles={['CUSTOMER']}>
            <DashboardShell role="CUSTOMER">{children}</DashboardShell>
        </RoleGuard>
    );
};

export default CustomerLayout;
