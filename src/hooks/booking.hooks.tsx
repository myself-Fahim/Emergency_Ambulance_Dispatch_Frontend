import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignBookingApi,
  acceptBookingApi,
  cancelBookingApi,
  completeBookingApi,
  getBookingApi,
  getMyBookingsApi,
  createBookingApi,
  getMyAssignedBookingsApi,
  startBookingApi,
} from "@/api/booking.api";
import type { TCreateBookingPayload } from "@/api/booking.api";

export const useGetBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBookingApi,
  });
};

export const useGetMyBookings = () =>
  useQuery({ queryKey: ["my-bookings"], queryFn: getMyBookingsApi });

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TCreateBookingPayload) => createBookingApi(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-bookings"] }),
  });
};

export const useGetMyAssignedBookings = (driverId?: string) =>
  useQuery({
    queryKey: ["my-assigned-bookings", driverId],
    queryFn: () => getMyAssignedBookingsApi(driverId as string),
    enabled: Boolean(driverId),
  });

export const useAssignBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookingId, driverId, ambulanceId }: { bookingId: string; driverId: string; ambulanceId: string }) =>
      assignBookingApi(bookingId, { driverId, ambulanceId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });
};

export const useAcceptBooking = () => useBookingStatusMutation(acceptBookingApi);

const useBookingStatusMutation = (mutationFn: (bookingId: string) => Promise<unknown>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["bookings"] }),
        queryClient.invalidateQueries({ queryKey: ["my-assigned-bookings"] }),
      ]);
    },
  });
};

export const useStartBooking = () => useBookingStatusMutation(startBookingApi);
export const useCompleteBooking = () => useBookingStatusMutation(completeBookingApi);
export const useCancelBooking = () => useBookingStatusMutation(cancelBookingApi);
