import type { Database } from "./supabase";

export type Product =
    Database["public"]["Tables"]["products"]["Row"];

export type ProductInsert =
    Database["public"]["Tables"]["products"]["Insert"];

export type ProductUpdate =
    Database["public"]["Tables"]["products"]["Update"];

export type ProductVariant =
    Database["public"]["Tables"]["product_variants"]["Row"];

export type ProductVariantInsert =
    Database["public"]["Tables"]["product_variants"]["Insert"];

export type ProductVariantUpdate =
    Database["public"]["Tables"]["product_variants"]["Update"];