import { supabase } from "../lib/supabase";
import type { Product, ProductInsert, ProductUpdate } from "../types/product.types";

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

export async function getProductById(id: number) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data;
}

export async function updateProduct(id: number, update: ProductUpdate) {
    const { data, error } = await supabase
        .from("products")
        .update(update)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}