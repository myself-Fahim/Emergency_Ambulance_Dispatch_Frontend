export type TDispatchDriver = {
  id: string;
  name?: string;
  email?: string;
  status?: "ACTIVE" | "INACTIVE" | string;
  driver?: {
    id: string;
    phone?: string;
    availability?: "AVAILABLE" | "BUSY" | "OFFLINE" | string;
  };
  [key: string]: unknown;
};

export type TDispatchAmbulance = {
  id: string;
  name?: string;
  registrationNumber?: string;
  vehicleNumber?: string;
  type?: string;
  ambulanceType?: string;
  status?: "AVAILABLE" | "BUSY" | "MAINTAINANCE" | "UNAVAILABLE" | string;
  availabilityStatus?: string;
  isAvailable?: boolean;
  [key: string]: unknown;
};
