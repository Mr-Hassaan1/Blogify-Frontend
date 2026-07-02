import { api } from "@/services/axios";

export const updateProfile = (formData) => {
    return api.put("/user/profile/update", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};