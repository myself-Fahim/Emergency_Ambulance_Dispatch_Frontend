import ofetchClient from "@/lib/ofetch";

export type TCheckoutResponse = {
  success: boolean;
  statusCode: number;
  message?: string;
  data: {
    bookingId: string;
    checkoutUrl: string;
    sessionId: string;
  };
};

export const createCheckoutApi = (bookingId: string) =>
  ofetchClient<TCheckoutResponse>(`/payments/checkout/${bookingId}`, {
    method: "POST",
  });
