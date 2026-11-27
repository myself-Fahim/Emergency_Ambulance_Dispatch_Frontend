export const ambulanceTypes = ["ICU", "CARDIAC", "NEONATAL", "BASIC"] as const;

export type TAmbulanceType = (typeof ambulanceTypes)[number];

export type TCreateAmbulancePayload = {
  name: string;
  email: string;
  phone: string;
  ambulance: {
    registrationNumber: string;
    type: TAmbulanceType;
  };
};

export type TAmbulance = {
  id: string;
  registrationNumber: string;
  providerId: string;
  type: TAmbulanceType | string;
  status: "AVAILABLE" | "BUSY" | "MAINTAINANCE" | "UNAVAILABLE" | string;
  provider?: { id: string; name: string; phone: string; email: string; address: string | null };
};

export type TAmbulanceListResponse = { data: TAmbulance[]; message?: string };
export type TAmbulanceResponse = { data: TAmbulance; message?: string };
