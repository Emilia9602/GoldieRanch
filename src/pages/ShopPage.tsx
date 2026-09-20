import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Shop() {
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return <p className="p-6">Laddar produkter...</p>;
    if (error) return <p className="p-6">Något gick fel</p>;

    return (
        <div className="min-h-screen bg-[#FAF7F2] p-6">
            <h1 className="text-3xl font-semibold text-[#3E3A36] mb-6">
                Goldie Ranch
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {products?.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    )
}