import RoleGuard from '@/components/auth/roleguard';
import React, { ReactNode } from 'react';

const CustomerLayout = ({ children }: { children: ReactNode }) => {
    return (
        <RoleGuard roles={['CUSTOMER']}>
            {children}
        </RoleGuard>
    );
};

export default CustomerLayout;