import { useEffect, useState } from "react";
import type { Product } from "../../types/product.types";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../../services/productService";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();

            const sorted = data.sort(
                (a, b) =>
                    new Date(b.created_at ?? "").getTime() -
                    new Date(a.created_at ?? "").getTime()
            );

            setProducts(sorted);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = confirm("Ta bort denna produkt?");
        if (!confirmed) return;

        try {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.log(err);
            alert("Kunde inte ta bort produkt");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF6EE]">
                <p className="text-sm text-[#8C6843]">Laddar produkter...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF6EE] p-6 pb-24 text-[#342D26]">
            <div className="max-w-xl mx-auto">
                <h1 className="text-xl font-semibold mb-1">
                    Alla produkter
                </h1>
                <p className="text-xs uppercase tracking-[0.25em] text-[#8C6843] mb-6">
                    Admin översikt
                </p>

                <div className="space-y-3">
                    {products.map((p) => (
                        <div
                            key={p.id}
                            className="flex items-center justify-between p-4 rounded-2xl border border-[#D9BE95]/50 bg-[#FAF7F2]"
                        >
                            <div className="flex items-center gap-3">
                                {p.image && (
                                    <img
                                        src={p.image}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                )}

                                <div>
                                    <p className="font-semibold text-sm">
                                        {p.name}
                                    </p>
                                    <p className="text-xs text-[#6B625A]">
                                        {p.price} kr
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        navigate(`/admin/products/${p.id}`)
                                    }
                                    className="text-xs px-3 py-1 rounded-lg bg-[#D9BE95] border border-[#D9BE95]/50 font-semibold hover:bg-[#CFB58C]"
                                >
                                    Redigera
                                </button>

                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="text-xs px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-100"
                                >
                                    Ta bort
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {products.length === 0 && (
                    <p className="text-sm text-[#8C6843] mt-6">
                        Inga produkter ännu
                    </p>
                )}
            </div>
        </div>
    );
}