import z from "zod";

export const LoginSchema = z.object({
    email : z.email("Invalid email"),
    password : z.string().min(6,"Password should contain atleast 6 character")
})
export const RegisterSchema = z.object({
    name : z.string().min(3,"Name should contain atleast 3 character"),
    email : z.email("Invalid email"),
    password : z.string().min(6,"Password should contain atleast 6 character")
})