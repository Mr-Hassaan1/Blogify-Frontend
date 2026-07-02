import { api } from "@/services/axios";

export const getPublishedBlogs = () => {
    return api.get("/blog/get-published-blogs");
};

export const getOwnBlogs = () => {
    return api.get("/blog/get-own-blogs");
};

export const getBlogById = (id) => {
    return api.get(`/blog/${id}`);
};

export const createBlog = (formData) => {
    return api.post("/blog/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateBlog = (id, formData) => {
    return api.put(`/blog/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const togglePublishBlog = (id, isPublished) => {
    return api.patch(`/blog/${id}?isPublished=${isPublished}`);
};

export const deleteBlogById = (id) => {
    return api.delete(`/blog/delete/${id}`);
};

export const getTotalLikes = () => {
    return api.get("/blog/my-blogs/likes");
};

export const likeOrDislikeBlog = (id, action) => {
  return api.get(`/blog/${id}/${action}`);
};