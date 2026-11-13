
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {

    const routes = [
        { name: 'Home', url: "/" },
        { name: 'About us', url: "/about" }
    ]
    return (



        <header className='flex justify-between px-30 pt-5'>

            <div>
                <h1>Ambulancia</h1>
            </div>
            <div className='flex gap-5'>
                {
                    routes.map(route => <Link key={route.url} href={route.url}>{route.name}</Link>)
                }

            </div>
           <Button variant={'outline'} render={<Link href="/login">Login</Link>} nativeButton={false} className="px-3 font-bold hover:bg-rose-400 hover:text-white">Login</Button>



        </header>



        // <div className='border border-b flex justify-center items-center gap-5'>

        //     <h1>Ambulancia</h1>
        //     {
        //         routes.map(route => <Link key={route.url} href={route.url}>{route.name}</Link>)
        //     }
        //     <button>Login</button>
        // </div>


    );
};

export default Navbar