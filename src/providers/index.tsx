import React, { ReactNode } from 'react';
import QueryProvider from './QueryProvider';
import GoogleAuthProvider from './GoogleAuthProvider';
import { TooltipProvider } from '@/components/ui/tooltip';

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <GoogleAuthProvider>
            <QueryProvider>
               <TooltipProvider>
                {children}
               </TooltipProvider>
            </QueryProvider>
        </GoogleAuthProvider>
    );
};

export default Provider;