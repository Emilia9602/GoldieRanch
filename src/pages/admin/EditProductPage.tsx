import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product, ProductVariant } from "../../types/product.types";
import { addVariant, deleteVariant, getProductWithVariants, updateProduct, updateVariant } from "../../services/productService";
import AdminNav from "../../components/admin/AdminNav";
import { uploadImage } from "../../services/storageService";

export default function EditProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [deletedVariantIds, setDeletedVariantIds] = useState<number[]>([]);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;

            setFetching(true);

            try {
                const data = await getProductWithVariants(Number(id));
                setProduct(data);
                setVariants(data.product_variants ?? []);
                setPreview(data.image ?? null);
            } catch (err) {
                console.log(err);
                alert("Kunde ej hämta produkt");
            } finally {
                setFetching(false);
            }
        };

        loadProduct();
    }, [id]);

    //Om pris inte är samma för varje varint i produkten
    const handleAddVariant = () => {
        if (!product) return;

        const newVariant: ProductVariant = {
            id: -Date.now(),
            product_id: product.id,
            color: "",
            size: "",
            price: product.price,
            sku: "",
            stock: 0,
        };

        setVariants((current) => [...current, newVariant]);
    };

    const handleRemoveVariant = (variant: ProductVariant) => {
        if (variant.id > 0) {
            setDeletedVariantIds((current) => [...current, variant.id]);
        }

        setVariants((current) =>
            current.filter((item) => item.id !== variant.id)
        );
    };

    const handleSave = async () => {
        if (!product) return;

        setLoading(true);

        try {
            let imageUrl = product.image;

            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            await updateProduct(product.id, {
                name: product.name,
                description: product.description,
                price: product.price,
                image: imageUrl,
            });

            for (const variantId of deletedVariantIds) {
                await deleteVariant(variantId);
            }

            for (const variant of variants) {
                if (variant.id < 0) {
                    await addVariant({
                        product_id: product.id,
                        color: variant.color,
                        size: variant.size,
                        price: variant.price,
                        sku: variant.sku,
                        stock: variant.stock,
                    });
                } else {
                    await updateVariant(variant.id, {
                        color: variant.color,
                        size: variant.size,
                        price: variant.price,
                        sku: variant.sku,
                        stock: variant.stock,
                    });
                }
            }

            setDeletedVariantIds([]);

            alert("Uppdaterad");
        } catch (err) {
            console.log(err);
            alert("Kunde ej spara");
        } finally {
            setLoading(false);
        }
    }

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF6EE]">
                <p className="text-sm text-[#8C6843]">Laddar produkt...</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF6EE]">
                <p className="text-sm text-red-500">Produkt hittades inte</p>
            </div>
        );
    }

    return (
        <div className="pb-24 bg-[#FAF6EE] p-6">

            <AdminNav />

            <div className="max-w-xl mx-auto bg-[#FAF7F2] p-6 rounded-2xl border border-[#D9BE95]/50">

                <h1 className="text-lg font-semibold mb-1">
                    Admin
                </h1>
                <p className="text-xs uppercase tracking-[0.25em] text-[#8C6843] mb-6">
                    Redigera produkt
                </p>

                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Produktnamn
                    </label>

                    <input
                        value={product.name ?? ""}
                        disabled={loading}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        placeholder="Namn"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Beskrivning
                    </label>

                    <textarea
                        value={product.description ?? ""}
                        disabled={loading}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        placeholder="Beskrivning"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Pris
                    </label>

                    <input
                        type="number"
                        value={product.price ?? ""}
                        disabled={loading}
                        onChange={(e) => setProduct({ ...product, price: e.target.value === "" ? null : Number(e.target.value), })}
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        placeholder="Pris"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Bild
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        id="file-upload"
                        disabled={loading}
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setImageFile(file);

                            if (file) {
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                        className="hidden"
                        placeholder="Image of product"
                    />

                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#D9BE95]/60 rounded-xl bg-[#FAF6EE] cursor-pointer hover:bg-[#F3EBDD] transition">
                        <span className="text-sm font-semibold text-[#8C6843]">
                            {preview ? "Byt bild" : "Ladda upp bild"}
                        </span>

                        <span
                            className="text-xs text-[#A89F94] mt-1">
                            PNG, JPG
                        </span>
                    </label>

                    {preview && (
                        <div className="mt-3">
                            <p className="text-xs text-[#8C6843] mb-2 uppercase tracking-wider">
                                Förhandsvisning
                            </p>

                            <img
                                src={preview}
                                className="w-32 h-32 object-cover rounded-lg border border-[#D9BE95]/50"
                            />
                        </div>
                    )}

                    {imageFile && (
                        <p className="text-xs text-[#6B625A] mt-2">
                            {imageFile.name}
                        </p>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-[#D9BE95]/40">

                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-sm font-semibold text-[#342D26]">
                            Varianter
                        </h2>

                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleAddVariant}
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
                                            onClick={() => handleRemoveVariant(variant)}
                                            className="text-xs px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-100"
                                        >
                                            Ta bort
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">

                                        <div>
                                            <label className="block text-xs text-[#8C6843] mb-1">
                                                Färg
                                            </label>

                                            <input
                                                value={variant.color ?? ""}
                                                disabled={loading}
                                                onChange={(e) =>
                                                    setVariants((current) =>
                                                        current.map((item) =>
                                                            item.id === variant.id
                                                                ? {
                                                                    ...item,
                                                                    color: e.target.value,
                                                                }
                                                                : item
                                                        )
                                                    )
                                                }
                                                className="w-full px-3 py-2.5 rounded-lg border border-[#D9BE95]/50 bg-[#FAF7F2] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                                                placeholder="Svart"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs text-[#8C6843] mb-1">
                                                Storlek
                                            </label>

                                            <input
                                                value={variant.size ?? ""}
                                                disabled={loading}
                                                onChange={(e) =>
                                                    setVariants((current) =>
                                                        current.map((item) =>
                                                            item.id === variant.id
                                                                ? {
                                                                    ...item,
                                                                    size: e.target.value,
                                                                }
                                                                : item
                                                        )
                                                    )
                                                }
                                                className="w-full px-3 py-2.5 rounded-lg border border-[#D9BE95]/50 bg-[#FAF7F2] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                                                placeholder="M"
                                            />
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-3">

                                        <div>
                                            <label className="block text-xs text-[#8C6843] mb-1">
                                                Pris
                                            </label>

                                            <input
                                                type="number"
                                                value={variant.price ?? ""}
                                                disabled={loading}
                                                onChange={(e) =>
                                                    setVariants((current) =>
                                                        current.map((item) =>
                                                            item.id === variant.id
                                                                ? {
                                                                    ...item,
                                                                    price:
                                                                        e.target.value === ""
                                                                            ? null
                                                                            : Number(e.target.value),
                                                                }
                                                                : item
                                                        )
                                                    )
                                                }
                                                className="w-full px-3 py-2.5 rounded-lg border border-[#D9BE95]/50 bg-[#FAF7F2] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                                                placeholder="499"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs text-[#8C6843] mb-1">
                                                Lager
                                            </label>

                                            <input
                                                type="number"
                                                value={variant.stock ?? ""}
                                                disabled={loading}
                                                onChange={(e) =>
                                                    setVariants((current) =>
                                                        current.map((item) =>
                                                            item.id === variant.id
                                                                ? {
                                                                    ...item,
                                                                    stock:
                                                                        e.target.value === ""
                                                                            ? null
                                                                            : Number(e.target.value),
                                                                }
                                                                : item
                                                        )
                                                    )
                                                }
                                                className="w-full px-3 py-2.5 rounded-lg border border-[#D9BE95]/50 bg-[#FAF7F2] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                                                placeholder="10"
                                            />
                                        </div>

                                    </div>

                                    <div className="mt-3">

                                        <label className="block text-xs text-[#8C6843] mb-1">
                                            SKU
                                        </label>

                                        <input
                                            value={variant.sku ?? ""}
                                            disabled={loading}
                                            onChange={(e) =>
                                                setVariants((current) =>
                                                    current.map((item) =>
                                                        item.id === variant.id
                                                            ? {
                                                                ...item,
                                                                sku: e.target.value,
                                                            }
                                                            : item
                                                    )
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

                <button
                    disabled={loading}
                    onClick={handleSave}
                    className="w-full mt-3 py-3 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:bg-[#EAE4D9] disabled:text-[#A89F94] disabled:border-[#D9BE95]/30 disabled:cursor-not-allowed disabled:shadow-none">
                    {loading ? "Sparar..." : "Spara ändringar"}
                </button>
            </div>
        </div >
    )
}