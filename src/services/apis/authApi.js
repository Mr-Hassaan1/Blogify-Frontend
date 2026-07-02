import { api } from "@/services/axios";

export const getCurrentUser = () => {
  return api.get("/user/me");
};

export const loginUser = (userData) => {
    return api.post("/user/login", userData);
};

export const signupUser = (userData) => {
    return api.post("/user/register", userData);
}

export const logoutUser = async () => {
  const { data } = await api.get("/user/logout");
  return data;
};