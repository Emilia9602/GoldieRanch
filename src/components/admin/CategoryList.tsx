import { useState } from "react";
import { updateCategory, deleteCategory } from "../../services/productService";
import type { Category } from "../../types/product.types";

type Props = {
    categories: Category[];
    onChanged: () => Promise<unknown>;
};

export default function CategoryList({ categories, onChanged }: Props) {
    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");
    const [editParentId, setEditParentId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const parentCategories = categories.filter(
        (category) => category.parent_id === null
    );

    function toggleCategory(id: number) {
        setExpandedCategories((current) =>
            current.includes(id)
                ? current.filter((categoryId) => categoryId !== id)
                : [...current, id]
        );
    }

    function startEditingCategory(category: Category) {
        setEditingCategoryId(category.id);
        setEditName(category.name);
        setEditParentId(category.parent_id);

        if (category.parent_id !== null) {
            setExpandedCategories((current) =>
                current.includes(category.parent_id!)
                    ? current
                    : [...current, category.parent_id!]);
        } else {
            setExpandedCategories((current) =>
                current.includes(category.id)
                    ? current
                    : [...current, category.id]);
        }
    }

    function cancelEditingCategory() {
        setEditingCategoryId(null);
        setEditName("");
        setEditParentId(null);
    }

    async function handleUpdateCategory(category: Category, isSubcategory: boolean) {

        if (
            isSubcategory &&
            (editParentId === null || !parentCategories.some(
                (parent) => parent.id === editParentId))
        ) {
            alert("Välj en giltig huvudkategori.");
            return;
        }

        setLoading(true);

        try {
            await updateCategory(category.id, {
                name: editName,
                ...(isSubcategory
                    ? { parent_id: editParentId }
                    : {}),
            });

            cancelEditingCategory();
            await onChanged();

            alert(
                isSubcategory
                    ? "Underkategorin har uppdaterats!"
                    : "Huvudkategorin har uppdaterats!"
            );
        } catch (error) {
            console.error("Kunde inte uppdatera kategori:", error);
            alert(
                "Kunde inte uppdatera kategorin. Kontrollera att ändringen är giltig."
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteCategory(id: number, categoryName: string) {
        const confirmed = window.confirm(
            `Vill du verkligen ta bort underkategorin "${categoryName}"?`
        );

        if (!confirmed) return;

        setLoading(true);

        try {
            await deleteCategory(id);
            await onChanged();

            if (editingCategoryId === id) {
                cancelEditingCategory();
            }

            alert("Underkategorin har tagits bort!");
        } catch (error) {
            console.error("Kunde inte ta bort kategori:", error);
            alert(
                "Kunde inte ta bort kategorin. Kontrollera om några produkter använder den."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl p-6 mt-6 shadow-sm">
            <h2 className="text-sm uppercase tracking-wider text-[#8C6843] mb-4">
                Befintliga kategorier
            </h2>

            {parentCategories.length > 0 ? (
                <div className="space-y-3">
                    {parentCategories.map((category) => {
                        const children = categories.filter(
                            (child) => child.parent_id === category.id
                        );

                        const isExpanded = expandedCategories.includes(
                            category.id
                        );

                        const isEditing =
                            editingCategoryId === category.id;

                        return (
                            <div
                                key={category.id}
                                className="rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] overflow-hidden"
                            >
                                <div className="flex items-center gap-2 p-3">
                                    <button
                                        type="button"
                                        onClick={() => toggleCategory(category.id)}
                                        className="flex-1 min-w-0 flex items-center gap-2 text-left"
                                    >
                                        <span className="text-[#8C6843]">
                                            {isExpanded ? "▾" : "▸"}
                                        </span>

                                        <span className="text-sm font-semibold">
                                            {category.name}
                                        </span>

                                        <span className="text-xs text-[#6B625A]">
                                            ({children.length})
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={() => startEditingCategory(category)}
                                        className="text-xs px-3 py-1 rounded-lg bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:opacity-50"
                                    >
                                        Redigera
                                    </button>
                                </div>

                                {isExpanded && (
                                    <div className="border-t border-[#D9BE95]/40 p-3 space-y-3">
                                        {isEditing && (
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    void handleUpdateCategory(
                                                        category,
                                                        false
                                                    );
                                                }}
                                                className="space-y-2"
                                            >
                                                <label
                                                    htmlFor={`edit-category-${category.id}`}
                                                    className="block text-xs uppercase tracking-wider text-[#8C6843]"
                                                >
                                                    Kategorinamn
                                                </label>

                                                <input
                                                    id={`edit-category-${category.id}`}
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    required
                                                    className="w-full px-3 py-2 rounded-lg border border-[#D9BE95]/50 bg-[#FAF7F2] text-sm outline-none focus:border-[#D9BE95]"
                                                />

                                                <p className="text-xs text-[#6B625A]">
                                                    Slug ändras inte:{" "}
                                                    {category.slug}
                                                </p>


                                                <div className="flex gap-2">
                                                    <button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="text-xs px-3 py-1 rounded-lg bg-[#D9BE95] text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:opacity-50"
                                                    >
                                                        {loading ? "Sparar..." : "Spara"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={cancelEditingCategory}
                                                        className="text-xs px-3 py-1 rounded-lg border border-[#D9BE95]/50 hover:bg-[#EAE4D9]"
                                                    >
                                                        Avbryt
                                                    </button>
                                                </div>
                                            </form>
                                        )}

                                        <p className="text-xs text-[#6B625A]">
                                            Slug: {category.slug}
                                        </p>

                                        {children.length > 0 ? (
                                            children.map((child) => {
                                                const isEditingChild = editingCategoryId === child.id;

                                                return (
                                                    <div
                                                        key={child.id}
                                                        className="pl-3 py-2 border-l-2 border-[#D9BE95]/60 space-y-3"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium">
                                                                    {child.name}
                                                                </p>

                                                                <p className="text-xs text-[#6B625A]">
                                                                    {child.slug}
                                                                </p>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                disabled={loading}
                                                                onClick={() => startEditingCategory(child)}
                                                                className="text-xs px-3 py-1 rounded-lg bg-[#D9BE95] text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:opacity-50"
                                                            >
                                                                Redigera
                                                            </button>

                                                            <button
                                                                type="button"
                                                                disabled={loading}
                                                                onClick={() => void handleDeleteCategory(child.id, child.name)}
                                                                className="text-xs px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-100 disabled:opacity-50"
                                                            >
                                                                Ta bort
                                                            </button>
                                                        </div>

                                                        {isEditingChild && (
                                                            <form
                                                                onSubmit={(e) => {
                                                                    e.preventDefault();
                                                                    void handleUpdateCategory(child, true);
                                                                }}
                                                                className="space-y-3 rounded-lg bg-[#FAF7F2] border border-[#D9BE95]/40 p-3"
                                                            >
                                                                <div>
                                                                    <label
                                                                        htmlFor={`edit-child-name-${child.id}`}
                                                                        className="block text-xs uppercase tracking-wider text-[#8C6843] mb-1"
                                                                    >
                                                                        Underkategorins namn
                                                                    </label>

                                                                    <input
                                                                        id={`edit-child-name-${child.id}`}
                                                                        value={editName}
                                                                        onChange={(e) => setEditName(e.target.value)}
                                                                        required
                                                                        className="w-full px-3 py-2 rounded-lg border border-[#D9BE95]/50 bg-white text-sm outline-none focus:border-[#D9BE95]"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label
                                                                        htmlFor={`edit-child-parent-${child.id}`}
                                                                        className="block text-xs uppercase tracking-wider text-[#8C6843] mb-1"
                                                                    >
                                                                        Huvudkategori
                                                                    </label>


                                                                    <div className="relative">
                                                                        <select
                                                                            id={`edit-child-parent-${child.id}`}
                                                                            value={editParentId ?? ""}
                                                                            onChange={(e) =>
                                                                                setEditParentId(
                                                                                    e.target.value ? Number(e.target.value) : null
                                                                                )
                                                                            }
                                                                            required
                                                                            className="w-full appearance-none px-3 py-2 pr-9 rounded-lg border border-[#D9BE95]/50 bg-white text-sm text-[#342D26] outline-none focus:border-[#8C6843]"
                                                                        >
                                                                            <option value="">
                                                                                Välj huvudkategori
                                                                            </option>

                                                                            {parentCategories.map((parent) => (
                                                                                <option
                                                                                    key={parent.id}
                                                                                    value={parent.id}
                                                                                >
                                                                                    {parent.name}
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

                                                                <p className="text-xs text-[#6B625A]">
                                                                    Slug ändras
                                                                    inte:{" "}
                                                                    {child.slug}
                                                                </p>

                                                                <div className="flex gap-2">
                                                                    <button
                                                                        type="submit"
                                                                        disabled={loading || editParentId === null}
                                                                        className="text-xs px-3 py-1 rounded-lg bg-[#D9BE95] text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:opacity-50"
                                                                    >
                                                                        {loading ? "Sparar..." : "Spara"}
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        disabled={loading}
                                                                        onClick={cancelEditingCategory}
                                                                        className="text-xs px-3 py-1 rounded-lg border border-[#D9BE95]/50 hover:bg-[#EAE4D9] disabled:opacity-50"
                                                                    >
                                                                        Avbryt
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p className="text-xs text-[#6B625A]">
                                                Inga underkategorier ännu.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-sm text-[#6B625A]">
                    Inga kategorier ännu.
                </p>
            )}
        </div>
    );
}