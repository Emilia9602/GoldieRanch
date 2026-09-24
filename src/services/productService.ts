import { supabase } from "../lib/supabase";
import type { Product, ProductInsert } from "../types/product.types";

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*");

    if (error) throw error;

    return data ?? [];
}

export async function addProduct(product: ProductInsert) {
    const { data, error } = await supabase
        .from("products")
        .insert(product)
        .select()
        .single();

    if (error) throw error;

    return data;
}