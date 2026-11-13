import ofetchClient from "@/lib/ofetch"
import { LoginPayload, LoginResponse, RegisterPayload } from "@/types/auth.types"

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