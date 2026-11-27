import ofetchClient from "@/lib/ofetch";
import type { TCreateAmbulancePayload } from "@/types/ambulance.type";

export const getAmbulancesApi = () => ofetchClient("/ambulance");

export const createAmbulanceApi = (payload: TCreateAmbulancePayload) =>
  ofetchClient("/ambulance/provider/create", {
    method: "POST",
    body: payload,
  });
