import ofetchClient from "@/lib/ofetch";

export const getAmbulancesApi = () => ofetchClient("/ambulance");
