import ofetchClient from "@/lib/ofetch"
import { doctorApplication } from "@/types/doctor.type"

export const doctorApplicationApi = (data : doctorApplication) =>{
    const formData  = new FormData()
    formData.append("payload",JSON.stringify(data.payload))
    formData.append("license", data.license)

    return ofetchClient("/driver/application",{
        method:"POST",
        body:formData
    })

} 