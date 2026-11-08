import { useEffect, useState } from "react";
import { useCategories } from "../../hooks/useCategories";

type Props = {
    value: number | null;
    onChange: (categoryId: number | null) => void;
    disabled?: boolean;
}

export default function ProductCategorySelect({ value, onChange, disabled = false }: Props) {

    const { data: categories, isLoading } = useCategories();

    const allCategories = categories ?? [];

    const parentCategories = allCategories.filter(
        (category) => category.parent_id === null
    );

    const [parentId, setParentId] = useState("");
    const [subcategoryId, setSubcategoryId] = useState("");

    //Kolla denna
    useEffect(() => {
        if (value === null) {
            setParentId("");
            setSubcategoryId("");
            return;
        }

        const selectedCategory = allCategories.find(
            (category) => category.id === value
        );

        if (!selectedCategory) return;

        if (selectedCategory.parent_id === null) {
            setParentId(String(selectedCategory.id));
            setSubcategoryId("");
        } else {
            setParentId(String(selectedCategory.parent_id));
            setSubcategoryId(String(selectedCategory.id));
        }
    }, [value, categories]);

    const subcategories = allCategories.filter(
        (category) => category.parent_id === Number(parentId)
    );

    const handleParentChange = (newParentId: string) => {
        setParentId(newParentId);
        setSubcategoryId("");

        onChange(newParentId ? Number(newParentId) : null);
    };

    const handleSubcategoryChange = (newSubcategoryId: string) => {
        setSubcategoryId(newSubcategoryId);

        onChange(
            newSubcategoryId
                ? Number(newSubcategoryId)
                : parentId
                    ? Number(parentId)
                    : null
        );
    };

    return (
        <div className="space-y-3">
            <div>
                <label
                    htmlFor="product-category"
                    className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2"
                >
                    Huvudkategori
                </label>


                <div className="relative">
                    <select
                        id="product-category"
                        value={parentId}
                        disabled={disabled || isLoading}
                        onChange={(e) => handleParentChange(e.target.value)}
                        className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] text-sm text-[#342D26] outline-none focus:border-[#8C6843]"
                    >
                        <option value="">
                            {isLoading ? "Laddar kategorier..." : "Välj huvudkategori"}
                        </option>

                        {parentCategories.map((category) => (
                            <option key={category.id} value={category.id}>
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

            <div>
                <label
                    htmlFor="product-subcategory"
                    className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2"
                >
                    Underkategori (valfritt)
                </label>


                <div className="relative">
                    <select
                        id="product-subcategory"
                        value={subcategoryId}
                        disabled={disabled || !parentId || subcategories.length === 0}
                        onChange={(e) => handleSubcategoryChange(e.target.value)}
                        className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] text-sm text-[#342D26] outline-none focus:border-[#8C6843] disabled:opacity-50"
                    >
                        <option value="">Ingen underkategori</option>

                        {subcategories.map((category) => (
                            <option key={category.id} value={category.id}>
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
        </div>
    )
}