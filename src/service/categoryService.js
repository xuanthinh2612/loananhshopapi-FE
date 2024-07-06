import * as httpRequest from "../utils/httpRequest";

export const getCategoryList = async () => {
  const res = await httpRequest.get("/api/admin/category/list");
  return res;
};

export const saveCategory = async (payload) => {
  const res = await httpRequest.post("/api/admin/category/save", payload);
  return res;
};

export const deleteCategory = async (id) => {
  const res = await httpRequest.deleteRequest(
    `/api/admin/category/delete/${id}`
  );
  return res;
};

export const getCategoryById = async (id) => {
  const res = await httpRequest.get(`/api/admin/category/${id}`);
  return res;
};
