import { supabase } from "../lib/supabase";

export async function uploadImage(file: File) {
    const fileName = `${crypto.randomUUID()}-${file.name}`;

    const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

    return data.publicUrl;
}