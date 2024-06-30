import * as httpRequest from "../utils/httpRequest";

export const getProductList = async () => {
  const res = await httpRequest.get("/api/product/list");
  return res;
};

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

// get all product by admin
export const getProductListByAdmin = async () => {
  const res = await httpRequest.get("/api/admin/product/list");
  return res;
};

// create new product by admin
export const createProduct = async (payload) => {
  const res = await httpRequest.post("/api/admin/product/create", payload);
  return res;
};

// Delete product by admin
export const deleteProduct = async (productId) => {
  const res = await httpRequest.deleteRequest(
    "/api/admin/product/delete/" + productId
  );
  return res;
};

// Update product by admin
export const updateProduct = async (payload) => {
  const res = await httpRequest.updateRequest(
    "/api/admin/product/update",
    payload
  );
  return res;
};

// public product by admin
export const setPublicProduct = async (productId) => {
  const res = await httpRequest.updateRequest(
    "/api/admin/product/public/" + productId
  );
  return res;
};

// set sold out product by admin
export const setSoldOutProduct = async (productId) => {
  const res = await httpRequest.updateRequest(
    "/api/admin/product/setSoldOut/" + productId
  );
  return res;
};

// set on Sale product by admin
export const setOnSaleProduct = async (productId) => {
  console.log(productId);
  const res = await httpRequest.updateRequest(
    "/api/admin/product/onSale/" + productId
  );
  return res;
};

// Band product by admin
export const bandProduct = async (productId) => {
  const res = await httpRequest.updateRequest(
    "/api/admin/product/offProduct/" + productId
  );
  return res;
};
