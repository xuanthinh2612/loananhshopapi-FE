import * as httpRequest from "../utils/httpRequest";

export const getProductList = async () => {
  const res = await httpRequest.get("/api/product/list");
  return res;
};

// export const createClass = async (classPayload) => {
//     const res = await httpRequest.post('/class/create', classPayload);
//     return res;
// };

// export const updateClass = async (classPayload) => {
//     const res = await httpRequest.post('/class/update', classPayload);
//     return res;
// };

export const getProductById = async (id) => {
  const res = await httpRequest.get(`/api/product/show/${id}`);
  return res;
};

// export const deleteClassById = async (id) => {
//     const res = await httpRequest.deleteRequest(`/class/delete/${id}`);
//     return res;
// };

//=======================ADMIN=========================================

export const getProductListByAdmin = async () => {
  console.log("call api admin");
  const res = await httpRequest.get("/api/admin/product/list");
  return res;
};
