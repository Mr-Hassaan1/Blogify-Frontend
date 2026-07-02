import { api } from "@/services/axios";

export const getAllUsers = () => {
    return api.get("/user/all-users");
};