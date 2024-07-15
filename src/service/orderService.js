import * as httpRequest from "../utils/httpRequest";

export const createOrder = async (payload) => {
  const res = await httpRequest.post("/api/order/create", payload);
  return res;
};
