"use client"
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Eye, EyeOff, Key, LockKeyhole } from 'lucide-react';
import { FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

import { useForm } from '@tanstack/react-form';
import {  RegisterSchema } from '@/validation/auth.validation';
import { cn } from 'cn';
import { Button } from '@base-ui/react';

const Register_Form = ({
    className,
    ...props
}: React.ComponentProps<"div">) => {

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        validators: {
            onChange: RegisterSchema
        },
        onSubmit: ({value}) => {
            console.log(value)
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
                                <Key className="size-6" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-card-foreground">
                                Welcome To The Ambulancia
                            </h1>
                            <p className="text-balance text-sm text-muted-foreground">
                                Register to your account
                            </p>
                        </div>

                        <form.Field name="name">
                            {(field) => {
                                const isValid = field.state.meta.isTouched && !field.state.meta.isValid && field.state.value.length > 0
                                return (
                                    <div className="mb-5 flex flex-col gap-2">
                                        <FieldLabel
                                            htmlFor={field.name}
                                            className="text-sm font-medium text-foreground"
                                        >
                                            Name
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            className="h-11 border-input bg-background focus-visible:border-primary focus-visible:ring-primary/30"
                                            name={field.name}
                                            placeholder="Your Name"
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
                            Register
                        </Button>
                    </form>


                    {/* ---------- Brand panel ---------- */}
                    <div className="relative hidden overflow-hidden bg-primary md:block">
                        {/** biome-ignore lint/performance/noImgElement: <explanation> */}
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
};

export default Register_Form;