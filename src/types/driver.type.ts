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

export type TGetDriverApplication = {
  id: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  licenseFile: string;
  licenseFileId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};