import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../../types/product.types";
import { getProductById, updateProduct } from "../../services/productService";
import AdminNav from "../../components/admin/AdminNav";

export default function EditProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;

            setFetching(true);

            try {
                const data = await getProductById(Number(id));
                setProduct(data);
            } catch (err) {
                console.log(err);
                alert("Kunde ej hämta produkt");
            } finally {
                setFetching(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleSave = async () => {
        if (!product) return;

        setLoading(true);

        try {
            await updateProduct(product.id!, {
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
            });
            alert("Uppdaterad");
        } catch (err) {
            console.log(err);
            alert("Kunde ej spara");
        } finally {
            setLoading(false);
        }
    }

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF6EE]">
                <p className="text-sm text-[#8C6843]">Laddar produkt...</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF6EE]">
                <p className="text-sm text-red-500">Produkt hittades inte</p>
            </div>
        );
    }

    return (
        <div className="pb-24 bg-[#FAF6EE] p-6">

            <AdminNav />

            <div className="max-w-xl mx-auto bg-[#FAF7F2] p-6 rounded-2xl border border-[#D9BE95]/50">

                <h1 className="text-lg font-semibold mb-1">
                    Admin
                </h1>
                <p className="text-xs uppercase tracking-[0.25em] text-[#8C6843] mb-6">
                    Redigera produkt
                </p>

                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Produktnamn
                    </label>

                    <input
                        value={product.name ?? ""}
                        disabled={loading}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        placeholder="Namn"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Beskrivning
                    </label>

                    <textarea
                        value={product.description ?? ""}
                        disabled={loading}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        placeholder="Beskrivning"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Pris
                    </label>

                    <input
                        type="number"
                        value={product.price ?? ""}
                        disabled={loading}
                        onChange={(e) => setProduct({ ...product, price: e.target.value === "" ? null : Number(e.target.value), })}
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        placeholder="Pris"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Bild
                    </label>

                    <input
                        value={product.image ?? ""}
                        disabled={loading}
                        onChange={(e) => setProduct({ ...product, image: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        placeholder="Bild URL"
                    />
                </div>

                <button
                    disabled={loading}
                    onClick={handleSave}
                    className="w-full mt-3 py-3 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:bg-[#EAE4D9] disabled:text-[#A89F94] disabled:border-[#D9BE95]/30 disabled:cursor-not-allowed disabled:shadow-none">
                    {loading ? "Sparar..." : "Spara ändringar"}
                </button>
            </div>
        </div>
    )
}