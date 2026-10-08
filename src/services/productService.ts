import { supabase } from "../lib/supabase";
import type { Product, ProductInsert, ProductUpdate, ProductVariantInsert, ProductVariantUpdate } from "../types/product.types";

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

export async function deleteProduct(id: number) {
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) throw error;
}

export async function getProductWithVariantsById(id: number) {
    const { data, error } = await supabase
        .from("products")
        .select(`*, product_variants (*)`)
        .eq("id", id)
        .single();

    if (error) throw error;
    return data;
}

export async function getProductsWithVariants() {
    const { data, error } = await supabase
        .from("products")
        .select(`*, product_variants (*)`);

    if (error) throw error;

    return data ?? [];
}

export async function addVariant(variant: ProductVariantInsert) {
    const { data, error } = await supabase
        .from("product_variants")
        .insert(variant)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateVariant(id: number, update: ProductVariantUpdate) {
    const { data, error } = await supabase
        .from("product_variants")
        .update(update)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteVariant(id: number) {
    const { error } = await supabase
        .from("product_variants")
        .delete()
        .eq("id", id);

    if (error) throw error;
}