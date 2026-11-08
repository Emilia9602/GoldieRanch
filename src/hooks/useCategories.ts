import { useQuery } from "@tanstack/react-query";
import type { Category } from "../types/product.types";
import { getCategories } from "../services/productService";

export function useCategories() {
    return useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
}