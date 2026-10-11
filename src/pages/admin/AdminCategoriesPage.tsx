import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { addCategory } from "../../services/productService";
import AdminNav from "../../components/admin/AdminNav";
import type { Category } from "../../types/product.types";

//Bättre att ha isLoading från denna funktionen?
export default function AdminCategoriesPage() {
    const { data: categories, refetch } = useCategories();

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [parentId, setParentId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!name || !slug) return;

        setLoading(true);

        try {
            await addCategory({
                name: name,
                slug: slug,
                parent_id: parentId,
            });

            setName("");
            setSlug("");
            setParentId(null);

            await refetch();
            alert("Kategori skapad");
        } catch (err) {
            console.log(err);
            alert("Kunde inte skapas");
        } finally {
            setLoading(false);
        }
    };

    const parentCategories = categories?.filter(
        (category) => category.parent_id === null
    ) ?? [];

    if (loading) {
        return <p className="p-6">Laddar...</p>;
    }

    return (
        <div className="min-h-screen bg-[#FAF6EE] p-6 pb-24 text-[#342D26]">

            <AdminNav />

            <div className="max-w-xl mx-auto bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl p-6 shadow-sm">
                <h1 className="text-xl font-semibold mb-1">
                    Kategorier
                </h1>
                <p className="text-xs uppercase tracking-[0.25em] text-[#8C6843] mb-6">
                    Lägg till kategori
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="mb-3">
                        <label
                            htmlFor="category-name"
                            className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2"
                        >
                            Namn
                        </label>

                        <input
                            id="category-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Kategori"
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="category-slug"
                            className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2"
                        >
                            Slug
                        </label>

                        <input
                            id="category-slug"
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="kategori"
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="category-parent"
                            className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2"
                        >
                            Huvudkategori
                        </label>

                        <select
                            id="category-parent"
                            value={parentId ?? ""}
                            onChange={(e) => setParentId(e.target.value
                                ? Number(e.target.value)
                                : null
                            )}
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        >
                            <option value="">
                                Ingen
                            </option>

                            {parentCategories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-3 py-3 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:bg-[#EAE4D9] disabled:text-[#A89F94] disabled:border-[#D9BE95]/30 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        {loading ? "Sparar..." : "Lägg till kategori"}
                    </button>
                </form>

                <div className="max-w-xl mx-auto bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl p-6 mt-6 shadow-sm">
                    <h2 className="text-sm uppercase tracking-wider text-[#8C6843] mb-3">
                        Befintliga kategorier
                    </h2>

                    <div className="space-y-3">
                        {categories?.map((category: Category) => (
                            <div
                                key={category.id}
                                className="flex items-center justify-between p-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE]"
                            >
                                <div className="text-sm font-semibold">
                                    {category.name}
                                </div>

                                <div className="text-xs text-[#6B625A]">
                                    {category.slug}
                                </div>
                            </div>
                        ))}

                        {categories?.length === 0 && (
                            <p className="text-sm text-[#6B625A]">
                                Inga kategorier ännu.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}