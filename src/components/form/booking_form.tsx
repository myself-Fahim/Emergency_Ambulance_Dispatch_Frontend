"use client";

import { useForm } from "@tanstack/react-form";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Ambulance, MapPin, Phone, Send, UserRound } from "lucide-react";

import { useGetMe } from "@/hooks/auth.hooks";
import { useGetAmbulance } from "@/hooks/ambulance.hooks";
import { useCreateBooking } from "@/hooks/booking.hooks";
import { CreateBookingSchema } from "@/validation/booking.validation";
import { Button } from "@/components/ui/button";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

export function BookingForm() {
  const router = useRouter();
  const ambulanceId = useSearchParams().get("ambulanceId") ?? undefined;
  const { data: userResponse } = useGetMe();
  const { data: ambulanceResponse, isPending: ambulancePending } = useGetAmbulance(ambulanceId);
  const { mutate, isPending } = useCreateBooking();
  const user = userResponse?.data;
  const ambulance = ambulanceResponse?.data;

  const form = useForm({
    defaultValues: { customerName: "", customerPhone: "", emergencyType: "" as "ACCIDENT" | "CARDIAC" | "PREGNANCY" | "FIRE" | "OTHER" | "", ambulanceType: "", pickupAddress: "" },
    validators: { onChange: CreateBookingSchema },
    onSubmit: ({ value }) => mutate({ ...value, emergencyType: value.emergencyType as "ACCIDENT" | "CARDIAC" | "PREGNANCY" | "FIRE" | "OTHER", ambulanceType: value.ambulanceType }, { onSuccess: () => { toast.add({ type: "success", title: "Booking created", description: "Your ambulance request has been submitted." }); router.push("/customer/my-bookings"); }, onError: (error) => toast.add({ type: "error", title: "Booking failed", description: error.message ?? "Unable to create booking." }) }),
  });

  useEffect(() => {
    if (user?.name) form.setFieldValue("customerName", user.name);
    const phone = user?.phone ?? user?.driver?.phone;
    if (phone) form.setFieldValue("customerPhone", phone);
    if (ambulance?.type) form.setFieldValue("ambulanceType", ambulance.type);
  }, [ambulance?.type, form, user?.driver?.phone, user?.name, user?.phone]);

  if (ambulancePending) return <div className="flex min-h-64 items-center justify-center"><Spinner className="size-6" /></div>;
  return <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); form.handleSubmit(); }}>
    <div className="rounded-lg bg-muted/45 p-4"><p className="text-xs text-muted-foreground">Selected ambulance</p><p className="mt-1 flex items-center gap-2 font-semibold"><Ambulance className="size-4 text-primary" />{ambulance ? `${ambulance.type} · ${ambulance.registrationNumber}` : "No ambulance selected"}</p></div>
    <div className="grid gap-5 sm:grid-cols-2">
      <form.Field name="customerName">{(field) => <InputField field={field} label="Customer name" icon={<UserRound />} value={field.state.value || user?.name || ""} placeholder="Your name" />}</form.Field>
      <form.Field name="customerPhone">{(field) => <InputField field={field} label="Phone number" icon={<Phone />} value={field.state.value || user?.phone || user?.driver?.phone || ""} placeholder="01711213344" type="tel" />}</form.Field>
    </div>
    <form.Field name="emergencyType">{(field) => <SelectField field={field} label="Emergency type" options={["ACCIDENT", "CARDIAC", "PREGNANCY", "FIRE", "OTHER"]} />}</form.Field>
    <form.Field name="pickupAddress">{(field) => <InputField field={field} label="Pickup address" icon={<MapPin />} value={field.state.value} placeholder="KHULSHI, Chattogram" />}</form.Field>
    <Button type="submit" disabled={isPending || !ambulance} className="h-11 w-full gap-2 text-base font-semibold">{isPending ? <Spinner /> : <><Send className="size-4" />Request ambulance</>}</Button>
  </form>;
}

function InputField({ field, label, icon, value, placeholder, type = "text" }: { field: any; label: string; icon: React.ReactNode; value: string; placeholder: string; type?: string }) { return <div className="flex flex-col gap-2"><FieldLabel htmlFor={field.name}>{label}</FieldLabel><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4">{icon}</span><Input id={field.name} name={field.name} type={type} value={value} placeholder={placeholder} className="h-11 pl-10" onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} required /></div>{field.state.meta.isTouched && !field.state.meta.isValid && <FieldError errors={field.state.meta.errors} />}</div>; }
function SelectField({ field, label, options }: { field: any; label: string; options: string[] }) { return <div className="flex flex-col gap-2"><FieldLabel htmlFor={field.name}>{label}</FieldLabel><select id={field.name} value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} className="h-11 rounded-lg border border-input bg-background px-3 text-sm"><option value="">Select type</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>{field.state.meta.isTouched && !field.state.meta.isValid && <FieldError errors={field.state.meta.errors} />}</div>; }
