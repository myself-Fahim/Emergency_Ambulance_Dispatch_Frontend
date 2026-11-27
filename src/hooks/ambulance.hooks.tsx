import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FetchError } from "ofetch";

import { createAmbulanceApi } from "@/api/ambulance.api";
import type { TCreateAmbulancePayload } from "@/types/ambulance.type";

export const useCreateAmbulance = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message?: string }, FetchError<{ message?: string }>, TCreateAmbulancePayload>({
    mutationFn: (payload: TCreateAmbulancePayload) => createAmbulanceApi(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ambulances"] }),
  });
};
