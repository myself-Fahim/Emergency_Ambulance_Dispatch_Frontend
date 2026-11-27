import ofetchClient from "@/lib/ofetch";
import type { TGetBookingResponse } from "@/types/booking.type";

export const getBookingApi = () =>
  ofetchClient<TGetBookingResponse>("/bookings");

export const getMyAssignedBookingsApi = (driverId: string) =>
  ofetchClient<TGetBookingResponse>(`/bookings/my-assign/${driverId}`);

export const acceptBookingApi = (bookingId: string) =>
  ofetchClient(`/bookings/accept/${bookingId}`, { method: "PATCH" });

export const assignBookingApi = (bookingId: string, payload: { driverId: string; ambulanceId: string }) =>
  ofetchClient(`/bookings/assign/${bookingId}`, {
    method: "POST",
    body: payload,
  });

export const startBookingApi = (bookingId: string) =>
  ofetchClient(`/bookings/start/${bookingId}`, { method: "PATCH" });

export const completeBookingApi = (bookingId: string) =>
  ofetchClient(`/bookings/complete/${bookingId}`, { method: "PATCH" });

export const cancelBookingApi = (bookingId: string) =>
  ofetchClient(`/bookings/cancel/${bookingId}`, { method: "PATCH" });
