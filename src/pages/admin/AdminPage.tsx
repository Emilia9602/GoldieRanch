import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../services/auth";
import { addProduct, deleteProduct, getProducts } from "../../services/productService";
import type { Product } from "../../types/product.types";

export default function AdminPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [latestProducts, setLatestProducts] = useState<Product[]>([]);

    const loadProducts = async () => {
        const data = await getProducts();

        const sortedProducts = data.sort((a, b) =>
            new Date(b.created_at ?? "").getTime() -
            new Date(a.created_at ?? "").getTime()
        );

        setLatestProducts(sortedProducts.slice(0, 3));
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addProduct({
                name, description, price: price ? Number(price) : null, image: image || null,
            });

            setName("");
            setDescription("");
            setPrice("");
            setImage("");

            await loadProducts();

            alert("Skapad");
        } catch (err) {
            console.log(err);
            alert("Gick fel")
        } finally {
            setLoading(false);
        }
    }

    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate("/login");
    };

    const handleDelete = async (id: number) => {
        const confirmed = confirm("Ta bort denna produkt?");
        if (!confirmed) return;

        try {
            await deleteProduct(id);

            await loadProducts();
        } catch (err) {
            console.log(err);
            alert("Kunde ej ta bort");
        }
    }

    return (
        <div className="min-h-screen bg-[#FAF6EE] p-6 pb-24 text-[#342D26]">
            <div className="max-w-xl mx-auto bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl p-6 shadow-sm">

                <h1 className="text-xl font-semibold mb-1">
                    Admin
                </h1>
                <p className="text-xs uppercase tracking-[0.25em] text-[#8C6843] mb-6">
                    Lägg till produkt
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="mb-3">
                        <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                            Produktnamn
                        </label>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Produktnamn"
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                            Beskrivning
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Beskrivning"
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                            Pris
                        </label>

                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Pris"
                            type="number"
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                            Bild
                        </label>

                        <input
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Bild URL"
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-3 py-3 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:bg-[#EAE4D9] disabled:text-[#A89F94] disabled:border-[#D9BE95]/30 disabled:cursor-not-allowed disabled:shadow-none">
                        {loading ? "Sparar..." : "Lägg till produkt"}
                    </button>
                </form>
            </div>

            <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
            >
                Logga ut
            </button>

            <div className="max-w-xl mx-auto bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl p-6 shadow-sm">
                <h2 className="text-sm uppercase tracking-wider text-[#8C6843] mb-3">
                    Senaste tillagda produkter
                </h2>

                <div className="space-y-3">
                    {latestProducts.map((p) => (
                        <div
                            key={p.id}
                            className="flex items-center justify-between p-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE]">
                            <div className="flex items-center gap-3">
                                {p.image && (
                                    <img
                                        src={p.image}
                                        className="w-12 h-12 object-cover rounded-lg"
                                    />
                                )}

                                <div>
                                    <p className="text-sm font-semibold">
                                        {p.name}
                                    </p>
                                    <p className="text-xs text-[#6B625A]">
                                        {p.price} kr
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/admin/products/${p.id}`)}
                                    className="text-xs px-3 py-1 rounded-lg bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C]">
                                    Redigera
                                </button>

                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="text-xs px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-100">
                                    Ta bort
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}