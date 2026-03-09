import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
console.log("Resolved API URL:", API_URL);

const api = axios.create({
    baseURL: API_URL,
});

export const monitorService = {
    getAll: async () => {
        const response = await api.get("/monitors");
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get(`/monitors/${id}`);
        return response.data;
    },
    create: async (data: { name: string; url: string; interval: number }) => {
        const response = await api.post("/monitors", data);
        return response.data;
    },
    triggerCheck: async (id: string) => {
        const response = await api.post(`/monitors/${id}/check`);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await api.delete(`/monitors/${id}`);
        return response.data;
    },
};
