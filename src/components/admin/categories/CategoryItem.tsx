import type { ReactNode } from "react";
import type { Category } from "../../../types/product.types";

type Props = {
    category: Category;
    productCount: number;
    isExpanded: boolean;
    loading: boolean;
    onToggle: () => void;
    onEdit: () => void;
    onDelete: () => void;
    children: ReactNode;
};

export default function CategoryItem({
    category,
    productCount,
    isExpanded,
    loading,
    onToggle,
    onEdit,
    onDelete,
    children,
}: Props) {
    return (
        <div className="rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] overflow-hidden">
            <div className="flex items-center gap-2 p-3">
                <button
                    type="button"
                    onClick={onToggle}
                    aria-expanded={isExpanded}
                    className="flex-1 min-w-0 flex items-center gap-2 text-left"
                >
                    <span className="text-[#8C6843]">
                        {isExpanded ? "▾" : "▸"}
                    </span>

                    <span className="text-sm font-semibold">
                        {category.name}
                    </span>

                    <span className="text-xs text-[#8C6843]">
                        ({productCount}{" "}
                        {productCount === 1 ? "produkt" : "produkter"})
                    </span>
                </button>

                <button
                    type="button"
                    disabled={loading}
                    onClick={onEdit}
                    className="text-xs px-3 py-1 rounded-lg bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:opacity-50"
                >
                    Redigera
                </button>

                <button
                    type="button"
                    disabled={loading}
                    onClick={onDelete}
                    className="text-xs px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-100 disabled:opacity-50"
                >
                    Ta bort
                </button>
            </div>

            {isExpanded && (
                <div className="border-t border-[#D9BE95]/40 p-3 space-y-3">
                    {children}
                </div>
            )}
        </div>
    );
}
