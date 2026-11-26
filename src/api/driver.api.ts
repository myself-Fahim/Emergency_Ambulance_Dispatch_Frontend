import ofetchClient from "@/lib/ofetch"
import { TDriverApplication, TDriverEmailVerify } from "@/types/driver.type"


export const driverApplicationApi = (data :TDriverApplication ) =>{
    const formData  = new FormData()
    formData.append("payload",JSON.stringify(data.payload))
    formData.append("license", data.license)

    return ofetchClient("/driver/application",{
        method:"POST",
        body:formData
    })

} 

export const driverEmailVerify = (payload : TDriverEmailVerify) =>{
    return ofetchClient("driver/verify-application",{
        method:"POST",
        body:payload
    })

}
export const getDriverApplicationApi = () =>{
    return ofetchClient("/driver/application")

}

export const approveDriverApplicationApi = (applicationId: string) => {
    return ofetchClient(`/driver/application/approved/${applicationId}`, {
        method: "PATCH",
    })
}

export const rejectDriverApplicationApi = (applicationId: string) => {
    return ofetchClient(`/driver/application/reject/${applicationId}`, {
        method: "DELETE",
    })
}

