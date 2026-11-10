import React, { ReactNode } from 'react';
import QueryProvider from './QueryProvider';

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    );
};

export default Provider;