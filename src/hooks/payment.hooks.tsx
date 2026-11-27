import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FetchError } from "ofetch";

import { createCheckoutApi, type TCheckoutResponse } from "@/api/payment.api";

export const useCreateCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation<TCheckoutResponse, FetchError<{ message?: string }>, string>({
    mutationFn: createCheckoutApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-bookings"] }),
  });
};
