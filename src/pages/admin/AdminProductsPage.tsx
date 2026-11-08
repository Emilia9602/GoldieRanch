import { useEffect, useState } from "react";
import type { ProductWithVariants } from "../../types/product.types";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProductsWithVariants } from "../../services/productService";
import AdminNav from "../../components/admin/AdminNav";
import type { ModalAlertData } from "../../components/admin/ModalAlert";
import ModalAlert from "../../components/admin/ModalAlert";
import Loading from "../../components/loadingError/Loading";
import ErrorState from "../../components/loadingError/ErrorState";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<ProductWithVariants[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [modal, setModal] = useState<ModalAlertData | null>(null);

    const navigate = useNavigate();

    const loadProducts = async () => {
        try {
            setLoading(true);
            setLoadError(false);
            const data = await getProductsWithVariants();

            const sorted = data.sort(
                (a, b) =>
                    new Date(b.created_at ?? "").getTime() -
                    new Date(a.created_at ?? "").getTime()
            );

            setProducts(sorted);
        } catch (err) {
            console.log(err);
            setLoadError(true);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const confirmDelete = async (id: number) => {
        setModal((current) =>
            current ? { ...current, isLoading: true } : current
        );

        try {
            await deleteProduct(id);

            setProducts((prev) =>
                prev.filter((p) => p.id !== id)
            );

            setModal({
                type: "success",
                title: "Produkten har tagits bort!",
                message: "Produkten har tagits bort från sortimentet.",
            });

        } catch (err) {
            console.log(err);

            setModal({
                type: "error",
                title: "Kunde inte ta bort produkten",
                message: "Något gick fel när produkten skulle tas bort. Försök igen.",
            });
        }
    };

    const handleDelete = (id: number) => {
        setModal({
            type: "confirm",
            title: "Ta bort produkten?",
            message: "Är du säker på att du vill ta bort denna produkt?",
            confirmText: "Ta bort",
            onConfirm: () => {
                void confirmDelete(id);
            },
        });
    };

    if (loading) {
        return <Loading message="Laddar produkter..." />;
    }

    if (loadError) {
        return (
            <ErrorState
                message="Vi kunde inte hämta produkterna just nu. Försök igen."
                onRetry={() => {
                    void loadProducts();
                }}
            />
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF6EE] p-6 pb-24 text-[#342D26]">

            <AdminNav />

            <div className="max-w-xl mx-auto bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl p-6 shadow-sm">
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
                                className="flex items-center justify-between p-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE]"
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
                                        <p className="text-xs text-[#6B625A]">
                                            {p.product_variants.length === 0
                                                ? "Inga varianter"
                                                : p.product_variants.length === 1
                                                    ? "1 variant"
                                                    : `${p.product_variants.length} varianter`}
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

            <ModalAlert
                modal={modal}
                onClose={() => setModal(null)}
            />
        </div>
    );
}