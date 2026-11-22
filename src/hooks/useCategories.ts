import { useQuery } from "@tanstack/react-query";
import type { Category } from "../types/product.types";
import {
    getCategories,
    getCategoryProductCounts,
} from "../services/productService";

export function useCategories() {
    return useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
}

export function useCategoryProductCounts() {
    return useQuery<Record<number, number>>({
        queryKey: ["categoryProductCounts"],
        queryFn: getCategoryProductCounts,
    });
}