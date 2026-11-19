import { KeyRound } from "lucide-react";
import Link from "next/link";
import ForgotPasswordForm from "@/components/form/forgot_password";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";

const Forgot_Password = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <Card className="overflow-hidden border-border bg-card p-0 shadow-lg">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <div className="flex flex-col justify-center px-6 py-10 md:px-10">
                            <div className="mb-8 flex flex-col items-center gap-2 text-center">
                                <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <KeyRound className="size-6" />
                                </div>
                                <h1 className="text-2xl font-bold tracking-tight text-card-foreground">
                                    Reset your password
                                </h1>
                                <p className="text-balance text-sm text-muted-foreground">
                                    Enter the OTP sent to your email and choose a new password.
                                </p>
                            </div>

                            <Suspense fallback={<p>Loading...</p>}>
                                <ForgotPasswordForm />
                            </Suspense>


                            <Link
                                href="/login"
                                className="mt-5 text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
                            >
                                Back to login
                            </Link>
                        </div>

                        <div className="relative hidden overflow-hidden bg-primary md:block">
                            {/* biome-ignore lint/performance/noImgElement: the existing SVG artwork is a static background illustration */}
                            <img
                                src="/ambulance-dispatch.svg"
                                alt="Ambulance dispatch illustration"
                                className="absolute inset-0 h-full w-full object-cover opacity-50"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Forgot_Password;
