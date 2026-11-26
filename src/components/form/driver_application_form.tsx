"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  IdCard,
  Mail,
  Phone,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "../ui/toast";
import { Label } from "../ui/label";
import { ApplciationDriverSchema } from "../../validation/driver.application";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { useDriverApplication } from "@/hooks/driver.hooks";


const Driver_Application_Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useDriverApplication()

  const router = useRouter()


  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      license: null as File | null,
    },

    validators: {
      onChange: ApplciationDriverSchema
    },

    onSubmit: ({ value }) => {


      const data = {
        payload: {
          name: value.name.trim(),
          email: value.email.trim(),
          password: value.password.trim(),
          phone: value.phone.trim()
        },
        license: value.license as File
      }
      mutate(data, {
        onSuccess: (res) => {
          toast.add({
            type: "success",
            title: "Application submitted",
            description: res.message ?? "Application created and email sent",
          });
          const params = new URLSearchParams({email:data.payload.email})
          form.reset();
          router.push(`/driver_application/verify-otp?${params}`)

        },
        onError: (err) => {
          toast.add({
            type: "error",
            title: "Application submition failed",
            description: err.data?.message ?? "Failed to create driver application",
          });
          form.reset();

        }

      })
    },
  });

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <form.Field name="name">
          {(field) => (
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Your Name"
                  className="h-11 pl-10"
                  onChange={(event) => field.handleChange(event.target.value)}
                  required
                />
              </div>
              {field.state.meta.isTouched && !field.state.meta.isValid && field.state.value.length > 0 && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="phone">
          {(field) => (
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id={field.name}
                  name={field.name}
                  type="tel"
                  value={field.state.value}
                  placeholder="Your Phone"
                  className="h-11 pl-10"
                  onChange={(event) => field.handleChange(event.target.value)}
                  required
                />
              </div>
              {field.state.meta.isTouched && !field.state.meta.isValid && field.state.value.length > 0 && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="email">
        {(field) => (
          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id={field.name}
                name={field.name}
                autoComplete="nope"
                type="email"
                value={field.state.value}
                placeholder="example@gmail.com"
                className="h-11 pl-10"
                onChange={(event) => field.handleChange(event.target.value)}
                required
              />
            </div>
            {field.state.meta.isTouched && !field.state.meta.isValid && field.state.value.length > 0 && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor={field.name}>Create password</FieldLabel>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id={field.name}
                autoComplete="new-password"
                name={field.name}
                type={showPassword ? "text" : "password"}
                value={field.state.value}
                placeholder="At least 6 characters"
                className="h-11 pl-10 pr-11"
                onChange={(event) => field.handleChange(event.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            {field.state.meta.isTouched && !field.state.meta.isValid && field.state.value.length > 0 &&  (
              <FieldError errors={field.state.meta.errors} />
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="license">
        {(field) => (
          <div className="flex flex-col gap-2">
            <FieldLabel>License</FieldLabel>
            <div className="relative">
              <Input
                id="license-file"
                aria-required
                autoComplete="new-password"
                name={field.name}
                type="file"
                placeholder="Upload File"
                className="absolute h-px w-px overflow-hidden border-0 p-0 opacity-0"
                onChange={(e) => {
                  const file = e.target?.files?.[0] ?? null;
                  // const fileSize = file && file?.size;
                  // const fileType = file && file?.type;

                  // if (
                  //   (fileSize && !Max_File_Size(fileSize)) ||
                  //   (fileType && !Eligible_File_Type(fileType))
                  // ) {
                  //   field.handleBlur();
                  //   return;
                  // }

                  field.handleChange(file);

                }}
                required
              />
              <Label
                htmlFor="license-file"
                className="flex h-11 cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-input bg-background pl-10 pr-11 text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5"
              >
                {field.state.value ? (
                  <span className="min-w-0 truncate text-sm font-medium text-foreground">
                    {field.state.value.name}
                  </span>
                ) : (
                  <>
                    <span className="shrink-0 text-sm font-semibold text-foreground">
                      Upload file
                    </span>
                    <span className="min-w-0 truncate text-right text-[10px] font-normal tracking-tight text-muted-foreground">
                      Supported: .pdf, .doc, .docx, .jpeg, .png (5 MB)
                    </span>
                  </>
                )}
              </Label>
              {field.state.value && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Remove selected license file"
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-muted-foreground hover:text-destructive"
                  onClick={() => {
                    field.handleChange(null);
                  }}
                >
                  <X />
                </Button>
              )}
            </div>
            {field.state.meta.isTouched && !field.state.meta.isValid && field.state.value &&(
              <FieldError errors={field.state.meta.errors} />
            )}
          </div>
        )}
      </form.Field>

      <Button
        type="submit"
        className="h-11 w-full gap-2 text-base font-semibold"
      >
        {
          isPending ? <div className="flex justify-center">
            <Spinner className="size-5 text-white font-bold"></Spinner>
          </div> : <div className="flex items-center gap-2">Submit application <ArrowRight className="size-4" /></div>
        }

      </Button>
      <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <CheckCircle2 className="size-4 text-primary" /> Your information is
        kept secure and confidential.
      </p>
    </form>
  );
};

export default Driver_Application_Form;
