import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/product.types";
import { getProductById, updateProduct } from "../services/productService";

export default function EditProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;
            const data = await getProductById(Number(id));
            setProduct(data);
        };

        loadProduct();
    }, [id]);

    const handleSave = async () => {
        if (!product) return;

        await updateProduct(product.id!, product);
        alert("Uppdaterad");
    }

    if (!product) return <p>Laddar...</p>

    return (
        <div className="min-h-screen bg-[#FAF6EE] p-6">
            <div className="max-w-xl mx-auto bg-[#FAF7F2] p-6 rounded-2xl border border-[#D9BE95]/50">

                <h1 className="text-lg font-semibold mb-4">
                    Redigera produkt
                </h1>

                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Produktnamn
                    </label>

                    <input
                        value={product.name ?? ""}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="w-full mb-3 px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE]"
                        placeholder="Namn"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Beskrivning
                    </label>

                    <textarea
                        value={product.description ?? ""}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        className="w-full mb-3 px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE]"
                        placeholder="Beskrivning"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Pris
                    </label>

                    <input
                        value={product.price ?? ""}
                        onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                        className="w-full mb-3 px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE]"
                        placeholder="Pris"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Bild
                    </label>

                    <input
                        value={product.image ?? ""}
                        onChange={(e) => setProduct({ ...product, image: e.target.value })}
                        className="w-full mb-4 px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE]"
                        placeholder="Bild URL"
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="w-full py-3 rounded-xl bg-[#D9BE95] font-semibold">
                    Spara ändringar
                </button>
            </div>
        </div>
    )
}