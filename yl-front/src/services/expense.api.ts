import axios from "axios";
import { Expense } from "../types/Expense";
import { Filter } from "../types/Filter";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: `${import.meta.env.VITE_BACK_HOST}:${import.meta.env.VITE_BACK_PORT}`
});

const ExpenseApi = {
  create: async ({ description, amount, categoryId }: Expense & { categoryId: number | null }) => {
    const response = await apiClient.post(`/expenses`, {
      description, amount, categoryId
    });
    return response.data;
  },
  get: async ({ signal, filter }: { signal?: AbortSignal, filter: Filter }) => {
    const response = await apiClient.get<Expense[]>(`/expenses`, {
      signal,
      params: filter
    });
    return response.data;
  },
  update: async ({ id, description, amount, categoryId }: Expense & { categoryId: number | null }) => {
    const response = await apiClient.patch(`/expenses/${id}`, {
      id, description, amount, categoryId
    });
    return response.data;
  },
  delete: async (id: Expense['id']) => {
    const response = await apiClient.delete(`/expenses/${id}`);
    return response.data;
  },
  download: async ({ signal, filter }: { signal?: AbortSignal, filter: Filter }) => {
    const response = await apiClient.get(`/expenses/download`, {
      headers: {
        Accept: 'text/csv',
      },
      signal,
      params: filter,
      responseType: 'blob'
    });
    return response.data;
  },
};

export default ExpenseApi;
