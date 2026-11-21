import { supabase } from "../lib/supabase";

export async function uploadImage(file: File) {
    const safeFileName = file.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, "-")
        .replace(/-+/g, "-");

    const fileName = `${crypto.randomUUID()}-${safeFileName}`;

    const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

    return data.publicUrl;
}