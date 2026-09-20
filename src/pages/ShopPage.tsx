import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Shop() {
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return <p className="p-6">Laddar produkter...</p>;
    if (error) return <p className="p-6">Något gick fel</p>;

    return (
        <div className="min-h-screen bg-[#FAF6EE] p-6 pb-24 md:pb-6 text-[#342D26]">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-semibold text-[#342D26] mb-6">
                    Produkter
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {products?.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>

            </div>
        </div>
    )
}