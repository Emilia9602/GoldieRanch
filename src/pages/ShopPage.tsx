import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Shop() {
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return <p className="p-6">Laddar produkter...</p>;
    if (error) return <p className="p-6">Något gick fel</p>;

    return (
        <div className="min-h-screen bg-[#FAF6EE] pt-10 pb-24 md:pb-10 text-[#342D26]">

            <div className="max-w-5xl mx-auto px-4">

                <div className="text-center mb-10">
                    <span className="block text-[10px] uppercase tracking-[0.35em] text-[#8C6843]">
                        Utforska sortimentet
                    </span>

                    <h2 className="text-2xl font-semibold text-[#342D26] mt-2">
                        Produkter
                    </h2>

                    <div className="mt-3 w-16 h-[2px] bg-[#D9BE95] rounded-full mx-auto" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products?.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>

            </div>
        </div>
    )
}