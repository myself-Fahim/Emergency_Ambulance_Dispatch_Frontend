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
