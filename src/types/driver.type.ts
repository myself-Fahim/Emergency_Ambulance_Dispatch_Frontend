export type TDriverApplication = {
    payload : {
    name: string,
    email: string,
    password: string,
    phone: string,
}
license: File
}
export type TDriverEmailVerify = {
    email : string,
    otp:string
}