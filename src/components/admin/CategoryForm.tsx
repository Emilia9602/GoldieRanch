import { useState } from "react";
import { addCategory } from "../../services/productService";
import type { Category } from "../../types/product.types";

type Props = {
    parentCategories: Category[];
    onCreated: () => Promise<unknown>;
};

export default function CategoryForm({ parentCategories, onCreated }: Props) {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [parentId, setParentId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.SubmitEvent) {
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

            await onCreated();
            alert("Kategori skapad!");
        } catch (error) {
            console.error("Kunde inte skapa kategori:", error);
            alert(
                "Kunde inte skapa kategorin. Kontrollera att sluggen är unik."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl p-6 shadow-sm">
            <h1 className="text-xl font-semibold mb-1">
                Kategorier
            </h1>

            <p className="text-xs uppercase tracking-[0.25em] text-[#8C6843] mb-6">
                Lägg till kategori
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
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
                        required
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
                        required
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


                    <div className="relative">
                        <select
                            id="category-parent"
                            value={parentId ?? ""}
                            onChange={(e) =>
                                setParentId(
                                    e.target.value
                                        ? Number(e.target.value)
                                        : null
                                )
                            }
                            className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] text-sm text-[#342D26] outline-none focus:border-[#8C6843]"
                        >
                            <option value="">Ingen</option>

                            {parentCategories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#8C6843]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </span>
                    </div>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-3 py-3 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:bg-[#EAE4D9] disabled:text-[#A89F94] disabled:border-[#D9BE95]/30 disabled:cursor-not-allowed"
                >
                    {loading ? "Sparar..." : "Lägg till kategori"}
                </button>
            </form>
        </div>
    );
}