import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product.types";
import { getProducts } from "../services/productService";

export function useProducts() {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts,
    })
}