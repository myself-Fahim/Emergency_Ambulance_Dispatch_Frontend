import Verify_Otp_Form from "@/components/form/verify_otp_form";
import { ArrowLeft, KeyRound, MailCheck } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const VerifyRegOtp = () => {
    return (
        <main className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-4xl">
                <div className="overflow-hidden rounded-xl bg-card shadow-lg ring-1 ring-foreground/10 md:grid md:grid-cols-2">
                    <section className="flex flex-col justify-center px-6 py-10 md:px-10">
                        <div className="mb-8 flex flex-col items-center gap-2 text-center">
                            <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <KeyRound className="size-6" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-card-foreground">
                                Verify your email
                            </h1>
                            <p className="max-w-sm text-balance text-sm leading-6 text-muted-foreground">
                                We sent a six-digit verification code to your email address.
                                Enter it below to continue.
                            </p>
                        </div>

                        <div className="mb-6 rounded-lg border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-foreground">
                            <div className="flex items-center gap-3">
                                <MailCheck className="size-5 shrink-0 text-primary" />
                                <span>Check your inbox and spam folder for the OTP.</span>
                            </div>
                        </div>

                        <Suspense fallback={<p>Loading...</p>}>

                            <Verify_Otp_Form mode="driver"></Verify_Otp_Form>

                        </Suspense>



                        <Link
                            href="/register"
                            className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            <ArrowLeft className="size-4" />
                            Back to registration
                        </Link>
                    </section>

                    <div className="relative hidden min-h-[560px] overflow-hidden bg-primary md:block">
                        {/* biome-ignore lint/performance/noImgElement: SVG artwork is intentionally used as a background illustration. */}
                        <img
                            src="/ambulance-dispatch.svg"
                            alt="Ambulance dispatch illustration"
                            className="absolute inset-0 h-full w-full object-cover opacity-50"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default VerifyRegOtp;
