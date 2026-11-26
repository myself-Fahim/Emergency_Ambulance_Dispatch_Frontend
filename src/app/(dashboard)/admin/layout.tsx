/** biome-ignore-all lint/a11y/useValidAriaRole: <explanation> */
import RoleGuard, { TRoleguard } from '@/components/auth/roleguard';
import DashboardShell from '@/components/dashboard/dashboard_shell';
import { ReactNode } from 'react';

const AdminLayout = ({children}:{children : ReactNode}) => {
    return (
       <RoleGuard roles={["ADMIN","CUSTOMER"]}>
        <DashboardShell role='ADMIN'>

        {children}
        </DashboardShell>
       </RoleGuard>
    );
};

export default AdminLayout;