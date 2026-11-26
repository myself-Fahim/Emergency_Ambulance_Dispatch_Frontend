import { Loader } from 'lucide-react';
import React from 'react';

const AuthLoading = ({label}:{label:string}) => {
    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <div className='flex items-center gap-3'>
                <Loader className='animate-spin'></Loader>
                <p>{label}</p>
            </div>
            
        </div>
    );
};

export default AuthLoading;