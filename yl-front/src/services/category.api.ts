import axios from "axios";
import { Category } from "../types/Category";

const apiClient = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: `${import.meta.env.VITE_BACK_HOST}:${import.meta.env.VITE_BACK_PORT}`
});

const CategoryApi = {
    get: async ({ signal }: { signal?: AbortSignal }) => {
        const response = await apiClient.get<Category[]>(`/categories`, {
            signal,
        });
        return response.data;
    },
}

export default CategoryApi;
