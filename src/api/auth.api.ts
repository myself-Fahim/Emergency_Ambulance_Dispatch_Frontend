import ofetchClient from "@/lib/ofetch"
import { LoginPayload, LoginResponse, RegisterPayload, verifyEmailPayload } from "@/types/auth.types"

export const loginApi = (payload: LoginPayload) => {
    return ofetchClient<LoginResponse>("/auth/login", {
        method: "POST",
        body: payload
    })
}

export const registerApi = (payload : RegisterPayload) =>{

    return ofetchClient("/auth/register",{
        method:"POST",
        body:payload
    })
}


export const logoutApi = () =>{
    return ofetchClient("/auth/logout",{
        method:"POST"
    })
}

export const googleLoginApi = (payload : {idToken : string}) =>{
    return ofetchClient("/auth/google",{
        method:"POST",
        body:payload
    })
}


export const verifyRegistrationOtp = (payload : verifyEmailPayload) =>{
    return ofetchClient("/auth/verify-email",{
        method:"POST",
        body:payload
    })
}

export const forgotPasswordApi = (payload : {email:string}) =>{
    return ofetchClient("/auth/forget-password",{
        method:"POST",
        body:payload
    })
}



export const getMeApi = () =>{
    return ofetchClient("/auth/me")
}