import Footer from '@/components/layout/public/footer';
import Navbar from '@/components/layout/public/navbar';
import React, { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className=' flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <main className='flex-1 w-full max-w-320 mx-auto border my-7'>
                {children}
            </main>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;