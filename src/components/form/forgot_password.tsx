"use client";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "@tanstack/react-form";
import { forgotPasswordSchema } from "@/validation/auth.validation";

const ForgotPasswordForm = () => {
  
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        defaultValues: {
            otp: "",
            newPassword: ""
        },

        validators:{
            onChange:forgotPasswordSchema
        },

        onSubmit: ({ value }) => {
            console.log(value);
        }
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}>




            <form.Field name="otp">
                {
                    (field) => {

                        const isValid = field.state.meta.isTouched && !field.state.meta.isValid && field.state.value.length > 0

                        return (
                            <div className="mb-5 flex flex-col items-center gap-2">
                                <FieldLabel
                                    htmlFor={field.name}
                                    className="w-full text-sm font-medium text-foreground"
                                >
                                    Verification code
                                </FieldLabel>
                                <InputOTP
                                    id={field.name}
                                    maxLength={6}
                                    pattern={REGEXP_ONLY_DIGITS}
                                    value={field.state.value}
                                    onChange={(e) => {
                                        field.handleChange(e)
                                    }}
                                    required
                                >
                                    <InputOTPGroup className="w-full justify-between">
                                        <InputOTPSlot
                                            index={0}
                                            className="size-11 border-rose-400 data-[active=true]:border-rose-400 sm:size-12"
                                        />
                                        <InputOTPSlot
                                            index={1}
                                            className="size-11 border-rose-400 data-[active=true]:border-rose-400 sm:size-12"
                                        />
                                        <InputOTPSlot
                                            index={2}
                                            className="size-11 border-rose-400 data-[active=true]:border-rose-400 sm:size-12"
                                        />
                                        <InputOTPSlot
                                            index={3}
                                            className="size-11 border-rose-400 data-[active=true]:border-rose-400 sm:size-12"
                                        />
                                        <InputOTPSlot
                                            index={4}
                                            className="size-11 border-rose-400 data-[active=true]:border-rose-400 sm:size-12"
                                        />
                                        <InputOTPSlot
                                            index={5}
                                            className="size-11 border-rose-400 data-[active=true]:border-rose-400 sm:size-12"
                                        />
                                    </InputOTPGroup>
                                </InputOTP>

                                {isValid && <FieldError errors={field.state.meta.errors}></FieldError>}

                            </div>




                        )
                    }
                }


            </form.Field>



            <form.Field name="newPassword">
                {
                    (field) => {
                          const isValid = field.state.meta.isTouched && !field.state.meta.isValid && field.state.value.length > 0
                        return (
                            <div className="relative mb-6 flex flex-col gap-2">
                                <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm font-medium text-foreground"
                                >
                                    New password
                                </FieldLabel>
                                <Input
                                    id={field.name}
                                    type={showPassword ? "text" : "password"}
                                    value={field.state.value}
                                    onChange={(e) => {
                                        field.handleChange(e.target.value)
                                    }}
                                    placeholder="Enter new password"
                                    autoComplete="new-password"
                                    className="h-11 border-input bg-background pr-10 focus-visible:border-primary focus-visible:ring-primary/30"
                                  
                                    required
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    onClick={() => setShowPassword((visible) => !visible)}
                                    className="absolute right-3 top-10 text-muted-foreground"
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5" />
                                    ) : (
                                        <Eye className="size-5" />
                                    )}
                                </button>
                                 {isValid && <FieldError errors={field.state.meta.errors}></FieldError>}
                            </div>

                        )
                    }
                }
            </form.Field>

            <button
                type="submit"
                className="h-11 w-full rounded-md bg-primary font-semibold text-primary-foreground shadow-sm transition-opacity hover:bg-primary/90"
            >
                Reset password
            </button>
        </form>
    );
};

export default ForgotPasswordForm;
