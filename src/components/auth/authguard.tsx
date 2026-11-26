/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client"
import { useGetMe } from '@/hooks/auth.hooks';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import AuthLoading from './authLoading';

const AuthGuard = ({ children }: { children: ReactNode }) => {

    const { data, isPending, isError } = useGetMe()

    const router = useRouter()
    const user = data?.data;

    useEffect(() => {
        if (isPending) {
            return
        }
        if (!user || isError) {
            router.replace("/login")
        }
    }, [user, isPending, isError])


    if (isPending) {
        return <AuthLoading label='Verifying Account'></AuthLoading>
    }

    if(!user || isError){
        return <AuthLoading label='Redirecting'></AuthLoading>
    }

    return <>{children}</>





};

export default AuthGuard;