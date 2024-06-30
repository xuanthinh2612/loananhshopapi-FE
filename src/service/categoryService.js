import * as httpRequest from "../utils/httpRequest";

export const getCategoryList = async () => {
  const res = await httpRequest.get("/api/admin/category/list");
  return res;
};
