
import { forgotPasswordApi, getMeApi, googleLoginApi, loginApi, logoutApi, registerApi, resetPasswordApi, verifyRegistrationOtp } from "@/api/auth.api"
import { LoginError, LoginPayload, LoginResponse, RegisterPayload, ResetPasswordPayload, verifyEmailPayload } from "@/types/auth.types"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { FetchError } from "ofetch"



export const useLogin = () => {
  return useMutation<LoginResponse, FetchError<LoginError>, LoginPayload>({
    mutationFn: loginApi,
  
  })
}


export const useRegister = () => {
  return useMutation<LoginResponse, FetchError<LoginError>, RegisterPayload>({
    mutationFn: registerApi
  })
}


export const useLogout = () => {
  return useMutation({
    mutationFn: logoutApi,
   
  })
}
export const useForgotPassword = () => {
  return useMutation<LoginResponse, FetchError<LoginError>, {email:string}>({
    mutationFn: forgotPasswordApi,
   
  })
}


export const useResetPassword = () => {
  return useMutation<LoginResponse, FetchError<LoginError>, ResetPasswordPayload>({
    mutationFn: resetPasswordApi,
   
  })
}


export const useEmailVerify = () =>{
  return useMutation<LoginResponse, FetchError<LoginError>, verifyEmailPayload>({
    mutationFn:verifyRegistrationOtp
  })
}


export const useGoogleLogin = () =>{
  const queryClient = useQueryClient()
  return useMutation<LoginResponse, FetchError<LoginError>, {idToken:string}>({
    mutationFn:googleLoginApi,
    onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ["user"],
      type: "active",
    })
  },
  })
}

export const useGetMe = () => {
  {
    return useQuery({
      queryKey: ['user'],
      queryFn: getMeApi,
      retry:false,
      refetchOnMount:"always"
    })
  }
}