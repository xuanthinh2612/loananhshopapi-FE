import * as httpRequest from "../utils/httpRequest";

// export const getBlogList = async () => {
//   const res = await httpRequest.get("/api/admin/article/list");
//   return res;
// };

// export const createClass = async (classPayload) => {
//     const res = await httpRequest.post('/class/create', classPayload);
//     return res;
// };

// export const updateClass = async (classPayload) => {
//     const res = await httpRequest.post('/class/update', classPayload);
//     return res;
// };

// export const getClassById = async (id) => {
//     const res = await httpRequest.get(`/class/getClass/${id}`);
//     return res;
// };

export const deleteBlog = async (id) => {
  const res = await httpRequest.deleteRequest(`/class/delete/${id}`);
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
