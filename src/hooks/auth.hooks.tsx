
import { loginApi, registerApi } from "@/api/auth.api"
import { LoginError, LoginPayload, LoginResponse, RegisterPayload } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import type { FetchError } from "ofetch"



export const useLogin = () => {
  return useMutation<LoginResponse, FetchError<LoginError>, LoginPayload>({
    mutationFn: loginApi,
  })
}


export const useRegister = () =>{
  return useMutation<LoginResponse, FetchError<LoginError>, RegisterPayload>({
    mutationFn:registerApi
  })
}