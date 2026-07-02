import { api } from "@/services/axios";

export const getTotalComments = () => {
  return api.get("/comment/my-blogs/comments");
};

export const getBlogComments = (blogId) => {
  return api.get(`/comment/${blogId}/comment/all`);
};

export const createBlogComment = (blogId, data) => {
  return api.post(`/comment/${blogId}/create`, data);
};

export const deleteBlogComment = (commentId) => {
  return api.delete(`/comment/${commentId}/delete`);
};

export const updateBlogComment = (commentId, data) => {
  return api.put(`/comment/${commentId}/edit`, data);
};

export const likeBlogComment = (commentId) => {
  return api.get(`/comment/${commentId}/like`);
};