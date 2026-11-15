import React, { ReactNode } from 'react';
import QueryProvider from './QueryProvider';
import GoogleAuthProvider from './GoogleAuthProvider';

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <GoogleAuthProvider>
            <QueryProvider>
                {children}
            </QueryProvider>
        </GoogleAuthProvider>
    );
};

export default Provider;