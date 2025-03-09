import { useQuery } from "@tanstack/react-query";
import CategoryApi from "../services/category.api";
import { Category } from "../types/Category";

const useCategories = () => {
    const getCategories = () =>
        useQuery<Category[]>({
            queryKey: ["categories"],
            queryFn: CategoryApi.get,
            staleTime: 60000
        });

    return {
        getCategories
    };
}

export default useCategories;