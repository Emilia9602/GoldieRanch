import type { SubmitEvent } from "react";
import type { Category } from "../../../types/product.types";

type Props = {
    category: Category;
    isSubcategory: boolean;
    parentCategories: Category[];
    name: string;
    parentId: number | null;
    sortOrder: string;
    loading: boolean;
    onNameChange: (value: string) => void;
    onParentChange: (value: number | null) => void;
    onSortOrderChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
};

export default function CategoryEditForm({
    category,
    isSubcategory,
    parentCategories,
    name,
    parentId,
    sortOrder,
    loading,
    onNameChange,
    onParentChange,
    onSortOrderChange,
    onSave,
    onCancel,
}: Props) {
    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        onSave();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={
                isSubcategory
                    ? "space-y-3 rounded-lg bg-[#FAF7F2] border border-[#D9BE95]/40 p-3"
                    : "space-y-3"
            }
        >
            <div>
                <label
                    htmlFor={`edit-category-name-${category.id}`}
                    className="block text-xs uppercase tracking-wider text-[#8C6843] mb-1"
                >
                    {isSubcategory ? "Underkategorins namn" : "Kategorinamn"}
                </label>

                <input
                    id={`edit-category-name-${category.id}`}
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    disabled={loading}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-[#D9BE95]/50 bg-[#FDFBF8] text-sm outline-none focus:border-[#D9BE95] disabled:opacity-50"
                />
            </div>

            {isSubcategory && (
                <div>
                    <label
                        htmlFor={`edit-category-parent-${category.id}`}
                        className="block text-xs uppercase tracking-wider text-[#8C6843] mb-1"
                    >
                        Huvudkategori
                    </label>

                    <div className="relative">
                        <select
                            id={`edit-category-parent-${category.id}`}
                            value={parentId ?? ""}
                            onChange={(e) =>
                                onParentChange(
                                    e.target.value
                                        ? Number(e.target.value)
                                        : null
                                )
                            }
                            disabled={loading}
                            required
                            className="w-full appearance-none px-3 py-2 pr-9 rounded-lg border border-[#D9BE95]/50 bg-[#FDFBF8] text-sm text-[#342D26] outline-none focus:border-[#8C6843] disabled:opacity-50"
                        >
                            <option value="">Välj huvudkategori</option>

                            {parentCategories.map((parent) => (
                                <option key={parent.id} value={parent.id}>
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
            )}

            <p className="text-xs text-[#8C6843]">
                Slug ändras inte: {category.slug}
            </p>

            <div>
                <label
                    htmlFor={`edit-category-sort-order-${category.id}`}
                    className="block text-xs uppercase tracking-wider text-[#8C6843] mb-1"
                >
                    Sorteringsordning
                </label>

                <input
                    id={`edit-category-sort-order-${category.id}`}
                    type="number"
                    min="0"
                    step="1"
                    value={sortOrder}
                    onChange={(e) => onSortOrderChange(e.target.value)}
                    disabled={loading}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-[#D9BE95]/50 bg-[#FDFBF8] text-sm outline-none focus:border-[#D9BE95] disabled:opacity-50"
                />

                <p className="text-xs text-[#8C6843] mt-1">
                    Lägre nummer visas före högre nummer.
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading || (isSubcategory && parentId === null)}
                    className="text-xs px-3 py-1 rounded-lg bg-[#D9BE95] text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:opacity-50"
                >
                    {loading ? "Sparar..." : "Spara"}
                </button>

                <button
                    type="button"
                    disabled={loading}
                    onClick={onCancel}
                    className="text-xs px-3 py-1 rounded-lg border border-[#D9BE95]/50 hover:bg-[#EAE4D9] disabled:opacity-50"
                >
                    Avbryt
                </button>
            </div>
        </form>
    );
}
