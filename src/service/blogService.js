import * as httpRequest from "../utils/httpRequest";

//==========ADMIN===============================

export const saveBlog = async (payload) => {
  const res = await httpRequest.post("/api/admin/blogs/save", payload);
  return res;
};

export const deleteBlog = async (id) => {
  const res = await httpRequest.deleteRequest(`/api/admin/blogs/delete/${id}`);
  return res;
};

export const getBlogListByAdmin = async () => {
  const res = await httpRequest.get("/api/admin/blogs");
  return res;
};

export const adminGetBlogById = async (id) => {
  const res = await httpRequest.get(`/api/admin/blogs/${id}`);
  return res;
};

//=============Nomal User====================

export const getBlogList = async () => {
  const res = await httpRequest.get("/api/blogs");
  return res;
};

export const getMainBlog = async () => {
  const res = await httpRequest.get("/api/blogs/main-blog");
  return res;
};

export const getBlogById = async (id) => {
  const res = await httpRequest.get(`/api/blogs/${id}`);
  return res;
};

//===========COMMON-USE=========================
