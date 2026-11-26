import RoleGuard from '@/components/auth/roleguard';
import React, { ReactNode } from 'react';

const DriverLayout = ({children}:{children : ReactNode}) => {
    return (
       <RoleGuard roles={["DRIVER"]}>
        {children}
       </RoleGuard>
    );
};

export default DriverLayout;