export type TBookingStatus =
  | "PENDING"
  | "ASSIGNED"
  | "ACCEPTED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED";

export type TBookingPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type TEmergencyType = "ACCIDENT" | "FIRE" | "MEDICAL" | "OTHER";

export type TPaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type TBookingPayment = {
  id: string;
  bookingId: string;
  amount: string;
  currency: string;
  status: TPaymentStatus;
  transactionId: string | null;
  paymentUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TBooking = {
  id: string;
  customerId: string;
  driverId: string | null;
  ambulanceId: string | null;
  emergencyType: TEmergencyType;
  priority: TBookingPriority;
  ambulanceType: string;
  status: TBookingStatus;
  CustomerName: string;
  CustomerPhone: string;
  pickupAddress: string;
  destinationAddress: string | null;
  estimatedFare: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  payment: TBookingPayment | null;
};

export type TGetBookingResponse = {
  data: TBooking[];
  message?: string;
};
