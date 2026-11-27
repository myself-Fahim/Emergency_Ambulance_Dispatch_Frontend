import React, { ReactNode } from 'react';
import { LoggedInRouteGuard } from '@/components/auth/logged-in-route-guard';

const AuthLayout = ({children} : {children : ReactNode}) => {
    return (
        <div>
            <LoggedInRouteGuard>{children}</LoggedInRouteGuard>
        </div>
    );
};

export default AuthLayout;
