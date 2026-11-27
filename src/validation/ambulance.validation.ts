import z from "zod";

import { ambulanceTypes } from "@/types/ambulance.type";

const BD_PHONE_REGEX = /^(?:\+?88)?01[3-9]\d{8}$/;

export const CreateAmbulanceSchema = z.object({
  name: z.string().trim().min(3, "Provider name should contain at least 3 characters"),
  email: z.email("Enter a valid email address"),
  phone: z
    .string({ error: "Phone number is required" })
    .trim()
    .regex(BD_PHONE_REGEX, "Enter a valid Bangladeshi phone number"),
  ambulance: z.object({
    registrationNumber: z.string().trim().min(3, "Registration number is required"),
    type: z.enum(ambulanceTypes, { error: "Select an ambulance type" }),
  }),
});
