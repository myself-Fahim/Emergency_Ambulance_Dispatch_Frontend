import z from "zod"

const eligibleFileType = ["application/pdf", "image/jpeg", "application/msword", "image/png", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

export const Max_File_Size = (fileSize: number) => {
    return fileSize <= 5 * 1024 * 1024
}

export const Eligible_File_Type = (fileType: string) => {

    return eligibleFileType.includes(fileType)

}

const BD_PHONE_REGEX = /^(?:\+?88)?01[3-9]\d{8}$/

export const ApplciationDriverSchema = z.object({
    name: z.string().min(3, "Name should contain atleast 3 character"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password should contain atleast 6 character"),
    phone: z
        .string({ error: "Phone number is required" })
        .trim()
        .regex(BD_PHONE_REGEX, "Enter a valid Bangladeshi phone number")
        .transform((v) => v.replace(/^\+?88/, "")),
    license: z
        .file()
        .max(5 * 1024 * 1024, "File must be 5 MB or smaller")
        .mime(
            ["application/pdf", "image/jpeg", "image/png",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            "Only PDF, DOC, DOCX, JPEG or PNG allowed",
        )
        .nullable()
        .refine((f) => f !== null, "License file is required"),
})