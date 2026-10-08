import type { ProductVariant } from "../../types/product.types";

type Props = {
    variants: ProductVariant[];
    loading: boolean;
    onAdd: () => void;
    onRemove: (variant: ProductVariant) => void;
    onChange: (
        id: number,
        field: keyof ProductVariant,
        value: string | number | null
    ) => void;
};

export default function ProductVariantsEditor({
    variants, loading, onAdd, onRemove, onChange,
}: Props) {
    return (
        <div className="mt-8 pt-6 border-t border-[#D9BE95]/40">

            <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-semibold text-[#342D26]">
                    Varianter
                </h2>

                <button
                    type="button"
                    disabled={loading}
                    onClick={onAdd}
                    className="text-xs px-3 py-1 rounded-lg bg-[#D9BE95] border border-[#D9BE95]/50 font-semibold hover:bg-[#CFB58C]"
                >
                    + Lägg till variant
                </button>
            </div>

            <p className="text-xs text-[#8C6843] mb-4">
                Lägg till färg, storlek, pris, lager och SKU.
            </p>

            {variants.length > 0 && (
                <div className="space-y-4">
                    {variants.map((variant) => (
                        <div
                            key={variant.id}
                            className="rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] p-4"
                        >
                            <div className="flex items-center justify-between mb-4">

                                <p className="text-xs uppercase tracking-wider text-[#8C6843]">
                                    Variant
                                </p>

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => onRemove(variant)}
                                    className="text-xs px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-100"
                                >
                                    Ta bort
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">

                                <div>
                                    <label className="block text-xs text-[#8C6843] mb-2">
                                        Färg
                                    </label>

                                    <input
                                        value={variant.color ?? ""}
                                        disabled={loading}
                                        onChange={(e) =>
                                            onChange(
                                                variant.id,
                                                "color",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2.5 rounded-lg border border-[#D9BE95]/50 bg-[#FAF7F2] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                                        placeholder="Svart"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-[#8C6843] mb-2">
                                        Storlek
                                    </label>

                                    <input
                                        value={variant.size ?? ""}
                                        disabled={loading}
                                        onChange={(e) =>
                                            onChange(
                                                variant.id,
                                                "size",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2.5 rounded-lg border border-[#D9BE95]/50 bg-[#FAF7F2] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                                        placeholder="M"
                                    />
                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-3">

                                <div>
                                    <label className="block text-xs text-[#8C6843] mb-2">
                                        Pris
                                    </label>

                                    <input
                                        type="number"
                                        value={variant.price ?? ""}
                                        disabled={loading}
                                        onChange={(e) =>
                                            onChange(
                                                variant.id,
                                                "price",
                                                e.target.value === ""
                                                    ? null
                                                    : Number(e.target.value)
                                            )
                                        }
                                        className="w-full px-3 py-2.5 rounded-lg border border-[#D9BE95]/50 bg-[#FAF7F2] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                                        placeholder="499"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-[#8C6843] mb-2">
                                        Lager
                                    </label>

                                    <input
                                        type="number"
                                        value={variant.stock ?? ""}
                                        disabled={loading}
                                        onChange={(e) =>
                                            onChange(
                                                variant.id,
                                                "stock",
                                                e.target.value === ""
                                                    ? null
                                                    : Number(e.target.value)
                                            )
                                        }
                                        className="w-full px-3 py-2.5 rounded-lg border border-[#D9BE95]/50 bg-[#FAF7F2] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                                        placeholder="10"
                                    />
                                </div>

                            </div>

                            <div className="mt-3">

                                <label className="block text-xs text-[#8C6843] mb-2">
                                    SKU
                                </label>

                                <input
                                    value={variant.sku ?? ""}
                                    disabled={loading}
                                    onChange={(e) =>
                                        onChange(
                                            variant.id,
                                            "sku",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2.5 rounded-lg border border-[#D9BE95]/50 bg-[#FAF7F2] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                                    placeholder="GR-HOODIE-BLK-M"
                                />

                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}