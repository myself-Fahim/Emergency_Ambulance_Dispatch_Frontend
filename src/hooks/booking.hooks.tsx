import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignBookingApi,
  cancelBookingApi,
  completeBookingApi,
  getBookingApi,
  startBookingApi,
} from "@/api/booking.api";

export const useGetBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBookingApi,
  });
};

export const useAssignBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookingId, driverId, ambulanceId }: { bookingId: string; driverId: string; ambulanceId: string }) =>
      assignBookingApi(bookingId, { driverId, ambulanceId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });
};

const useBookingStatusMutation = (mutationFn: (bookingId: string) => Promise<unknown>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });
};

export const useStartBooking = () => useBookingStatusMutation(startBookingApi);
export const useCompleteBooking = () => useBookingStatusMutation(completeBookingApi);
export const useCancelBooking = () => useBookingStatusMutation(cancelBookingApi);
