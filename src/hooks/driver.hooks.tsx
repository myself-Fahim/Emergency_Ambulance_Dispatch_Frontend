import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FetchError } from "ofetch";
import {
  approveDriverApplicationApi,
  driverApplicationApi,
  driverEmailVerify,
  getDriverApplicationApi,
  getDriversApi,
  rejectDriverApplicationApi,
} from "@/api/driver.api";
import type { LoginError, LoginResponse } from "@/types/auth.types";
import type {
  TDriverApplication,
  TDriverEmailVerify,
} from "@/types/driver.type";

export const useDriverApplication = () => {
  return useMutation<LoginResponse, FetchError<LoginError>, TDriverApplication>(
    {
      mutationFn: driverApplicationApi,
    },
  );
};
export const useVerifyDriver = () => {
  return useMutation<LoginResponse, FetchError<LoginError>, TDriverEmailVerify>(
    {
      mutationFn: driverEmailVerify,
    },
  );
};
export const useEmailVerify = () => {
  return useMutation<LoginResponse, FetchError<LoginError>, TDriverEmailVerify>(
    {
      mutationFn: driverEmailVerify,
    },
  );
};
export const useGetDriverApplication = () => {
  return useQuery({
    queryKey: ["driver-applications"],
    queryFn: getDriverApplicationApi,
  });
};

export const useGetDrivers = () =>
  useQuery({
    queryKey: ["drivers"],
    queryFn: getDriversApi,
  });

export const useApproveDriverApplication = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, FetchError<LoginError>, string>({
    mutationFn: approveDriverApplicationApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["driver-applications"],
      });
    },
  });
};

export const useRejectDriverApplication = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, FetchError<LoginError>, string>({
    mutationFn: rejectDriverApplicationApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["driver-applications"],
      });
    },
  });
};
