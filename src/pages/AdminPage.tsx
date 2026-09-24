import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../services/auth";
import { addProduct } from "../services/productService";

export default function AdminPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

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

    return (
        <div className="min-h-screen bg-[#FAF6EE] p-6 text-[#342D26]">
            <div className="max-w-xl mx-auto bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl p-6 shadow-sm">

                <h1 className="text-xl font-semibold mb-1">Admin</h1>
                <p className="text-xs uppercase tracking-[0.25em] text-[#8C6843] mb-6">
                    Lägg till produkt
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Produktnamn"
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] text-sm"
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Beskrivning"
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] text-sm"
                    />

                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Pris"
                        type="number"
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] text-sm"
                    />

                    <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Bild URL"
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] text-sm"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#E5DFD5]">
                        {loading ? "Sparar" : "Lägg till produkt"}
                    </button>
                </form>
            </div>

            <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
            >
                Logga ut
            </button>
        </div>
    )
}