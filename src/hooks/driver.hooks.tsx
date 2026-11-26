import { driverApplicationApi, driverEmailVerify, getDriverApplicationApi } from "@/api/driver.api"
import { LoginError, LoginResponse } from "@/types/auth.types"
import { TDriverApplication, TDriverEmailVerify } from "@/types/driver.type"
import { useMutation, useQuery } from "@tanstack/react-query"
import { FetchError } from "ofetch"

export const useDriverApplication = () => {
  return useMutation<LoginResponse, FetchError<LoginError>, TDriverApplication>({
    mutationFn: driverApplicationApi
  })
}
export const useVerifyDriver = () => {
  return useMutation<LoginResponse, FetchError<LoginError>, TDriverEmailVerify>({
    mutationFn: driverEmailVerify
  })
}
export const useEmailVerify = () => {
  return useMutation<LoginResponse, FetchError<LoginError>, TDriverEmailVerify>({
    mutationFn: driverEmailVerify
  })
}
export const useGetDriverApplication = () => {
  return useQuery({
    queryKey: ['driver-applications'],
    queryFn: getDriverApplicationApi

  })
}


