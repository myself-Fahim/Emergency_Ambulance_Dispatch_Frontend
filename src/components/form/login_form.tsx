/** biome-ignore-all lint/performance/noImgElement: <explanation> */
"use client"

import { cn } from "cn"
import { Eye, EyeOff, LockKeyhole } from "lucide-react"
import { useForm } from "@tanstack/react-form"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "../ui/input"

import { FieldError, FieldLabel } from "../ui/field"
import { LoginSchema } from "@/validation/auth.validation"
import { useState } from "react"
import { Button } from "@base-ui/react"
import { useLogin } from "@/hooks/auth.hooks"
import Link from "next/link"
import { toast } from "../ui/toast"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const { mutate, isPending } = useLogin()
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onChange: LoginSchema
        },
        onSubmit: ({ value }) => {
            const payload = {
                email: value.email,
                password: value.password
            }
            mutate(payload, {

                onSuccess:(res)=>{
                    toast.add({
                        positionerProps:{
                            side:"top",
                            align:"center",
                            
                        },
                        type:"success",
                        title:"Login Success",
                        description:res.message ?? "User login successful"
                    })
               
                },
               
                onError: (err) => {
                      toast.add({
                        positionerProps:{
                            side:"top",
                            align:"center",
                            
                        },
                        type:"error",
                        title:"Login failure",
                        description:err.data?.message ?? "Something went wrong"
                    })
                    
                }
            })
        },
    })

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden border-border bg-card p-0 shadow-lg">
                <CardContent className="grid p-0 md:grid-cols-2">
                    {/* ---------- Form side ---------- */}
                    <form
                        className="flex flex-col justify-center px-6 py-10 md:px-10"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        {/* Header */}
                        <div className="mb-8 flex flex-col items-center gap-2 text-center">
                            <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <LockKeyhole className="size-6" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-card-foreground">
                                Welcome back
                            </h1>
                            <p className="text-balance text-sm text-muted-foreground">
                                Login to your account
                            </p>
                        </div>

                        {/* Email */}
                        <form.Field name="email">
                            {(field) => {
                                const isValid = field.state.meta.isTouched && !field.state.meta.isValid && field.state.value.length > 0
                                return (
                                    <div className="mb-5 flex flex-col gap-2">
                                        <FieldLabel
                                            htmlFor={field.name}
                                            className="text-sm font-medium text-foreground"
                                        >
                                            Email
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            className="h-11 border-input bg-background focus-visible:border-primary focus-visible:ring-primary/30"
                                            name={field.name}
                                            placeholder="you@example.com"
                                            value={field.state.value}
                                            autoComplete="nope"
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            required
                                        />

                                        {isValid && <FieldError errors={field.state.meta.errors}></FieldError>}
                                    </div>


                                )
                            }}
                        </form.Field>

                        {/* Password */}
                        <form.Field name="password">
                            {(field) => {

                                const isValid = field.state.meta.isTouched && !field.state.meta.isValid && field.state.value.length > 0
                                return (
                                    <div className="mb-5 relative">

                                        <div className=" flex flex-col gap-2 ">
                                            <FieldLabel
                                                htmlFor={field.name}
                                                className="text-sm font-medium text-foreground"
                                            >
                                                Password
                                            </FieldLabel>
                                            <Input
                                                id={field.name}
                                                className="h-11 border-input bg-background focus-visible:border-primary focus-visible:ring-primary/30"
                                                name={field.name}
                                                placeholder="Your Password"
                                                value={field.state.value}
                                                autoComplete="new-password"
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                type={showPassword ? 'text' : "password"}
                                                required
                                            />
                                            {isValid && <FieldError errors={field.state.meta.errors}></FieldError>}
                                        </div>

                                        <Button className="absolute right-3 top-10 text-rose-600 size-5" type="button" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff className="w-full"></EyeOff> : <Eye className="w-full"></Eye>}
                                        </Button>
                                    </div>
                                )

                            }}
                        </form.Field>

                        {/* Submit */}
                        <Button
                            className="h-11 w-full bg-primary font-semibold text-primary-foreground shadow-sm transition-opacity hover:bg-primary/90"
                            type="submit"
                        >
                            {isPending ? "Login..." : "Login"}
                        </Button>

                        <span className="text-center mt-5 text-[12px]">Don't have any account? <Link className="underline" href="/register">Register Now</Link></span>
                    </form>


                    {/* ---------- Brand panel ---------- */}
                    <div className="relative hidden overflow-hidden bg-primary md:block">
                        <img
                            src="/ambulance-dispatch.svg"
                            // biome-ignore lint/a11y/noRedundantAlt: <explanation>
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover opacity-50 "
                        />

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
