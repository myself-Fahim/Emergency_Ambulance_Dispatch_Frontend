"use client"
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { useGetMe, useLogout } from '@/hooks/auth.hooks';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';


const Navbar = () => {


    const routes = [
        { name: 'Home', url: "/" },
        { name: 'About us', url: "/about" }
    ]

    const { mutate} = useLogout()

    const { data, isLoading } = useGetMe()


    const user = data?.data;

    const queryClient = useQueryClient()



    const handleLogout = () => {
        mutate(undefined, {
            onSuccess: (res) => {
                toast.add({
                    positionerProps: {
                        side: "top",
                        align: "center",

                    },
                    type: "success",
                    description: res.message ?? "User Logout successful"
                })
                queryClient.removeQueries({queryKey:["user"]})
            },
            onError: (err) => {
                toast.add({
                    type: "error",
                    description: err.message ?? "Something went wrong"
                })
            }
        })
    }
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


            {

                !user && !isLoading && <Button variant={'outline'} render={<Link href="/login">
                    Login
                </Link>} nativeButton={false} className="px-3 font-bold hover:bg-rose-400 hover:text-white">
                </Button>


            }

            {

                user && !isLoading && <Button onClick={handleLogout} variant={'outline'} 
                  className="px-3 font-bold hover:bg-rose-400 hover:text-white">
                    LogOut
                </Button>


            }




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