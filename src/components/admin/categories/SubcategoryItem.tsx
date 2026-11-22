
import type { ReactNode } from "react";
import type { Category } from "../../../types/product.types";

type Props = {
    category: Category;
    productCount: number;
    loading: boolean;
    onEdit: () => void;
    onDelete: () => void;
    children?: ReactNode;
};

export default function SubcategoryItem({
    category,
    productCount,
    loading,
    onEdit,
    onDelete,
    children,
}: Props) {
    return (
        <div className="pl-3 py-2 border-l-2 border-[#D9BE95]/60 space-y-3">
            <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                    <p>
                        <span className="text-sm font-semibold">
                            {category.name}
                        </span>{" "}

                        <span className="text-xs text-[#8C6843]">
                            ({productCount}{" "}
                            {productCount === 1 ? "produkt" : "produkter"})
                        </span>
                    </p>

                    <p className="text-xs text-[#8C6843]">
                        {category.slug}
                    </p>
                </div>

                <button
                    type="button"
                    disabled={loading}
                    onClick={onEdit}
                    className="text-xs px-3 py-1 rounded-lg bg-[#D9BE95] text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:opacity-50"
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

            {children}
        </div>
    );
}
