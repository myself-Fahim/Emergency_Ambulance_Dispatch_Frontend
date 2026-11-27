import z from "zod";

export const CreateBookingSchema = z.object({
  customerName: z.string().trim().min(2, "Name is required"),
  customerPhone: z.string().trim().regex(/^(?:\+?88)?01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),
  emergencyType: z.enum(["ACCIDENT", "CARDIAC", "PREGNANCY", "FIRE", "OTHER"], { error: "Select an emergency type" }),
  ambulanceType: z.string().min(1, "Ambulance type is required"),
  pickupAddress: z.string().trim().min(5, "Pickup address is required"),
});
