import ofetchClient from "@/lib/ofetch";
import type { TAmbulanceListResponse, TAmbulanceResponse, TCreateAmbulancePayload } from "@/types/ambulance.type";

export const getAmbulancesApi = () => ofetchClient<TAmbulanceListResponse>("/ambulance");

export const getAmbulanceApi = (ambulanceId: string) =>
  ofetchClient<TAmbulanceResponse>(`/ambulance/${ambulanceId}`);

export const createAmbulanceApi = (payload: TCreateAmbulancePayload) =>
  ofetchClient("/ambulance/provider/create", {
    method: "POST",
    body: payload,
  });
