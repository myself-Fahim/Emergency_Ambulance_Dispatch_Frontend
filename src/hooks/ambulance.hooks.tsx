import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FetchError } from "ofetch";

import { createAmbulanceApi, getAmbulanceApi, getAmbulancesApi } from "@/api/ambulance.api";
import type { TCreateAmbulancePayload } from "@/types/ambulance.type";

export const useCreateAmbulance = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message?: string }, FetchError<{ message?: string }>, TCreateAmbulancePayload>({
    mutationFn: (payload: TCreateAmbulancePayload) => createAmbulanceApi(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ambulances"] }),
  });
};

export const useGetAmbulances = () =>
  useQuery({ queryKey: ["ambulances"], queryFn: getAmbulancesApi });

export const useGetAmbulance = (ambulanceId?: string) =>
  useQuery({
    queryKey: ["ambulances", ambulanceId],
    queryFn: () => getAmbulanceApi(ambulanceId as string),
    enabled: Boolean(ambulanceId),
  });
