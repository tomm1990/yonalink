import { useQuery } from "@tanstack/react-query";
import CategoryApi from "../services/category.api";
import { Category } from "../types/Category";

const useCategories = () => {
    const GetCategories = () =>
        useQuery<Category[]>({
            queryKey: ["categories"],
            queryFn: CategoryApi.get,
            staleTime: 60000
        });

    return {
        GetCategories
    };
}

export default useCategories;