/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client"
import React, { useEffect, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEmailVerify } from '@/hooks/auth.hooks';
import { toast } from '../ui/toast';
import { Spinner } from '../ui/spinner';
import { useVerifyDriver } from '@/hooks/driver.hooks';


const defaultResendTime = 120
const Verify_Otp_Form = ({ mode }: { mode: "driver" | "user" }) => {
    const otpSlotClass = 'size-12 border-1 border-rose-400 data-[active=true]:border-rose-400'
    const { mutate: UserVerify, isPending: UserVerifyPending } = useEmailVerify()
    const { mutate: DriverVerify, isPending: DriverVerifyPending } = useVerifyDriver()
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || ""
    const [isInValid, setInvalid] = useState(false)
    const router = useRouter()
    const [otp, setOtp] = useState("")
    const [isResend, setIsResend] = useState(defaultResendTime)




    const verify = mode === "driver" ? DriverVerify : UserVerify


    useEffect(() => {

        if (!email) {
            router.push("/")
            return
        }
    }, [email])


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isResend <= 0) {
                return
            }
            setIsResend(prev => prev - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [isResend])

    const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if (otp.length !== 6) {
            setInvalid(true)
            return
        }


        const payload = {
            email,
            otp
        }


        verify(payload, {
            onSuccess: (res) => {
                console.log(res);
                toast.add({
                    title: "Verification Success",
                    description: res.message ?? "Email Successfully verified",
                    type: "success"
                })



            },
            onError: (err) => {
                console.log(err);
                toast.add({
                    title: "Verification Error",
                    description: err.data?.message ?? "Something went wrong , Try again",
                    type: "error"
                })
                setOtp("")
            }

        })


    }



    return (

        <div>

            <div className="mb-6 flex flex-col justify-center items-center gap-2 sm:gap-3">
                <form id='otp-form' onSubmit={handleOtpSubmit}>
                    <InputOTP required
                        maxLength={6}
                        value={otp}
                        pattern={REGEXP_ONLY_DIGITS}
                        onChange={(value) => {
                            setOtp(value)
                            if (isInValid) {
                                setInvalid(false)
                            }

                        }} >
                        <InputOTPGroup>
                            <InputOTPSlot className={otpSlotClass} index={0} />
                            <InputOTPSlot className={otpSlotClass} index={1} />
                            <InputOTPSlot className={otpSlotClass} index={2} />
                            <InputOTPSlot className={otpSlotClass} index={3} />
                            <InputOTPSlot className={otpSlotClass} index={4} />
                            <InputOTPSlot className={otpSlotClass} index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </form>


                {isInValid && <p className='text-rose-500 text-sm '>OTP is invalid !</p>}
            </div>

            <button
                disabled={UserVerifyPending || DriverVerifyPending}
                type="submit"
                form='otp-form'
                className="h-11 w-full rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
                {
                   UserVerifyPending || DriverVerifyPending ? <div className="flex justify-center">
                        <Spinner className="size-5 text-white font-bold"></Spinner>
                    </div> : "Verify account"
                }

            </button>

            {isResend > 0 && (
                <div className='flex justify-center'>

                    <span className="text-[12px] mt-3 text-rose-500">Resend OTP in {isResend} s</span>
                </div>
            )}

            <p className="mt-3  text-center text-sm text-muted-foreground">
                Didn&apos;t receive the code?{" "}
                <button
                    disabled={isResend > 0}
                    type="button"
                    className={`${isResend && "text-gray-600!"} font-semibold text-primary underline-offset-4 hover:underline`}
                >
                    Resend OTP
                </button>

            </p>

        </div>
    );
};

export default Verify_Otp_Form;
