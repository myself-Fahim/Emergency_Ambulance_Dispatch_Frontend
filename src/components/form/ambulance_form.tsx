"use client";

import { useForm } from "@tanstack/react-form";
import { Ambulance, Mail, Phone, Plus, UserRound } from "lucide-react";

import { useCreateAmbulance } from "@/hooks/ambulance.hooks";
import { ambulanceTypes } from "@/types/ambulance.type";
import { CreateAmbulanceSchema } from "@/validation/ambulance.validation";
import { Button } from "@/components/ui/button";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

const AmbulanceForm = () => {
  const { mutate, isPending } = useCreateAmbulance();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      ambulance: {
        registrationNumber: "",
        type: "" as (typeof ambulanceTypes)[number] | "",
      },
    },
    validators: { onChange: CreateAmbulanceSchema },
    onSubmit: ({ value }) => {
      mutate(
        {
          name: value.name.trim(),
          email: value.email.trim(),
          phone: value.phone.trim(),
          ambulance: {
            registrationNumber: value.ambulance.registrationNumber.trim(),
            type: value.ambulance.type as (typeof ambulanceTypes)[number],
          },
        },
        {
          onSuccess: (response) => {
            toast.add({
              type: "success",
              title: "Ambulance created",
              description: response?.message ?? "Ambulance provider created successfully.",
            });
            form.reset();
          },
          onError: (error) => {
            toast.add({
              type: "error",
              title: "Ambulance creation failed",
              description: error.data?.message ?? "Unable to create ambulance.",
            });
          },
        },
      );
    },
  });

  return (
    <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); form.handleSubmit(); }}>
      <div className="grid gap-5 sm:grid-cols-2">
        <form.Field name="name">
          {(field) => <FormInput field={field} label="Provider name" icon={<UserRound />} placeholder="DHAKA Emergency Ambulance Service" />}
        </form.Field>
        <form.Field name="phone">
          {(field) => <FormInput field={field} label="Phone number" icon={<Phone />} placeholder="01711213344" type="tel" />}
        </form.Field>
      </div>

      <form.Field name="email">
        {(field) => <FormInput field={field} label="Email address" icon={<Mail />} placeholder="provider@example.com" type="email" />}
      </form.Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <form.Field name="ambulance.registrationNumber">
          {(field) => <FormInput field={field} label="Registration number" icon={<Ambulance />} placeholder="DHA-1120" />}
        </form.Field>
        <form.Field name="ambulance.type">
          {(field) => (
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor={field.name}>Ambulance type</FieldLabel>
              <select id={field.name} name={field.name} value={field.state.value} onChange={(event) => field.handleChange(event.target.value as (typeof ambulanceTypes)[number])} onBlur={field.handleBlur} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                <option value="">Select ambulance type</option>
                {ambulanceTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
              {field.state.meta.isTouched && !field.state.meta.isValid && <FieldError errors={field.state.meta.errors} />}
            </div>
          )}
        </form.Field>
      </div>

      <Button type="submit" className="h-11 w-full gap-2 text-base font-semibold" disabled={isPending}>
        {isPending ? <Spinner className="size-5" /> : <><Plus className="size-4" />Create ambulance</>}
      </Button>
    </form>
  );
};

function FormInput({ field, label, icon, placeholder, type = "text" }: { field: any; label: string; icon: React.ReactNode; placeholder: string; type?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4">{icon}</span>
        <Input id={field.name} name={field.name} type={type} value={field.state.value} placeholder={placeholder} className="h-11 pl-10" onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} required />
      </div>
      {field.state.meta.isTouched && !field.state.meta.isValid && <FieldError errors={field.state.meta.errors} />}
    </div>
  );
}

export default AmbulanceForm;
