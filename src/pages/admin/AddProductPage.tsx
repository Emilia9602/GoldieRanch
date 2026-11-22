
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
    addProduct,
    addVariant,
    deleteProduct,
    getProductsWithVariants,
} from "../../services/productService";
import type {
    ProductVariant,
    ProductWithVariants,
} from "../../types/product.types";
import AdminNav from "../../components/admin/AdminNav";
import { uploadImage } from "../../services/storageService";
import ProductVariantsEditor from "../../components/admin/ProductVariantsEditor";
import ProductCategorySelect from "../../components/admin/ProductCategorySelect";
import type { ModalAlertData } from "../../components/admin/ModalAlert";
import ModalAlert from "../../components/admin/ModalAlert";

export default function AddProductPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [sku, setSku] = useState("");
    const [stock, setStock] = useState("0");
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [latestProducts, setLatestProducts] = useState<ProductWithVariants[]>([]);
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [modal, setModal] = useState<ModalAlertData | null>(null);

    const previewsRef = useRef<string[]>([]);

    const navigate = useNavigate();

    const loadProducts = async () => {
        const data = await getProductsWithVariants();

        const sortedProducts = data.sort(
            (a, b) =>
                new Date(b.created_at ?? "").getTime() -
                new Date(a.created_at ?? "").getTime()
        );

        setLatestProducts(sortedProducts.slice(0, 3));
    };

    // Lägg till en ny variant
    const handleAddVariant = () => {
        const newVariant: ProductVariant = {
            id: -Date.now(),
            product_id: 0,
            color: "",
            size: "",
            price: price ? Number(price) : null,
            sku: "",
            stock: 0,
        };

        setVariants((current) => [newVariant, ...current]);
    };

    // Ta bort en variant
    const handleRemoveVariant = (variant: ProductVariant) => {
        setVariants((current) =>
            current.filter((item) => item.id !== variant.id)
        );
    };

    // Ändra en variant
    const handleVariantChange = (
        id: number,
        field: keyof ProductVariant,
        value: string | number | null
    ) => {
        setVariants((current) =>
            current.map((variant) =>
                variant.id === id
                    ? { ...variant, [field]: value }
                    : variant
            )
        );
    };

    // Hämta senaste produkterna
    useEffect(() => {
        void loadProducts();
    }, []);

    // Håll koll på förhandsvisningar för att kunna frigöra objekt-URL:er
    useEffect(() => {
        previewsRef.current = previews;
    }, [previews]);

    useEffect(() => {
        return () => {
            previewsRef.current.forEach((preview) => {
                URL.revokeObjectURL(preview);
            });
        };
    }, []);

    // Skapa produkt
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Kontrollera att alla varianter har SKU
        if (variants.length > 0) {
            const missingSku = variants.some(
                (variant) => !variant.sku?.trim()
            );

            if (missingSku) {
                setModal({
                    type: "error",
                    title: "SKU saknas",
                    message:
                        "Alla produktvarianter måste ha ett SKU innan du kan skapa produkten.",
                });
                return;
            }
        } else if (!sku.trim()) {
            setModal({
                type: "error",
                title: "SKU saknas",
                message: "Produkten måste ha ett SKU innan du kan skapa den.",
            });
            return;
        }

        setLoading(true);

        try {
            let imageUrls: string[] = [];

            if (imageFiles.length > 0) {
                try {
                    imageUrls = await Promise.all(
                        imageFiles.map((file) => uploadImage(file))
                    );
                } catch (err) {
                    console.log(err);

                    setModal({
                        type: "error",
                        title: "Bilderna kunde inte laddas upp",
                        message:
                            "En eller flera bilder kunde inte laddas upp. Försök igen.",
                    });
                    return;
                }
            }

            const product = await addProduct({
                name,
                description,
                price: price ? Number(price) : null,
                image: imageUrls[0] ?? null,
                images: imageUrls.slice(1),
                category_id: categoryId,
            });

            // Spara riktiga varianter
            if (variants.length > 0) {
                for (const variant of variants) {
                    await addVariant({
                        product_id: product.id,
                        color: variant.color,
                        size: variant.size,
                        price: variant.price,
                        sku: variant.sku?.trim() ?? "",
                        stock: variant.stock,
                    });
                }
            } else {
                // Skapa standardvariant för produkter utan valbara varianter
                await addVariant({
                    product_id: product.id,
                    color: "",
                    size: "",
                    price: price ? Number(price) : null,
                    sku: sku.trim(),
                    stock: Number(stock),
                });
            }

            // Frigör förhandsvisningarnas objekt-URL:er
            previews.forEach((preview) => {
                URL.revokeObjectURL(preview);
            });

            // Töm formuläret
            setName("");
            setDescription("");
            setPrice("");
            setSku("");
            setStock("0");
            setCategoryId(null);
            setImageFiles([]);
            setPreviews([]);
            setVariants([]);

            await loadProducts();

            setModal({
                type: "success",
                title: "Produkten har skapats!",
                message: "Din nya produkt har sparats.",
            });
        } catch (err) {
            console.log(err);

            setModal({
                type: "error",
                title: "Något gick fel",
                message: "Produkten kunde inte sparas. Försök igen.",
            });
        } finally {
            setLoading(false);
        }
    };

    // Ta bort produkt
    const confirmDelete = async (id: number) => {
        setModal(null);

        try {
            await deleteProduct(id);
            await loadProducts();

            setModal({
                type: "success",
                title: "Produkten har tagits bort",
                message: "Produkten har tagits bort från sortimentet.",
            });
        } catch (err) {
            console.log(err);

            setModal({
                type: "error",
                title: "Kunde inte ta bort produkten",
                message: "Något gick fel när produkten skulle tas bort.",
            });
        }
    };

    const handleDelete = (id: number) => {
        setModal({
            type: "confirm",
            title: "Ta bort produkten?",
            message: "Är du säker på att du vill ta bort denna produkt?",
            confirmText: "Ta bort",
            onConfirm: () => {
                void confirmDelete(id);
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#FAF6EE] p-6 pb-24 text-[#342D26]">
            <AdminNav />

            <div className="max-w-xl mx-auto bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl p-6 shadow-sm">
                <h1 className="text-xl font-semibold mb-1">
                    Admin
                </h1>

                <p className="text-xs uppercase tracking-[0.25em] text-[#8C6843] mb-6">
                    Lägg till produkt
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Produktnamn */}
                    <div className="mb-3">
                        <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                            Produktnamn
                        </label>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Produktnamn"
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        />
                    </div>

                    {/* Beskrivning */}
                    <div className="mb-3">
                        <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                            Beskrivning
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Beskrivning"
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        />
                    </div>

                    {/* Pris */}
                    <div className="mb-3">
                        <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                            Pris
                        </label>

                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Pris"
                            type="number"
                            min="0"
                            step="0.01"
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        />
                    </div>

                    {/* Standardprodukt: SKU */}
                    {variants.length === 0 && (
                        <div className="mb-3">
                            <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                                SKU *
                            </label>

                            <input
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                placeholder="Exempelvis GR-001"
                                disabled={loading}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                            />

                            <p className="text-xs text-[#8C6843] mt-1">
                                Ange ett unikt SKU för produkten.
                            </p>
                        </div>
                    )}

                    {/* Standardprodukt: Lager */}
                    {variants.length === 0 && (
                        <div className="mb-3">
                            <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                                Antal i lager
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                disabled={loading}
                                className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] outline-none focus:border-[#D9BE95] text-sm"
                            />
                        </div>
                    )}

                    {/* Kategori */}
                    <ProductCategorySelect
                        value={categoryId}
                        onChange={setCategoryId}
                        disabled={loading}
                    />

                    {/* Produktbilder */}
                    <div className="mb-3">
                        <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                            Bilder
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            id="file-upload"
                            disabled={loading}
                            onChange={(e) => {
                                const files = Array.from(
                                    e.target.files ?? []
                                );

                                const newPreviews = files.map((file) =>
                                    URL.createObjectURL(file)
                                );

                                setImageFiles((current) => [
                                    ...current,
                                    ...files,
                                ]);

                                setPreviews((current) => [
                                    ...current,
                                    ...newPreviews,
                                ]);

                                e.target.value = "";
                            }}
                            className="hidden"
                        />

                        <label
                            htmlFor="file-upload"
                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl transition cursor-pointer
                            ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F3EBDD]"}
                            ${previews.length > 0 ? "border-[#CFB58C]" : "border-[#D9BE95]/60 bg-[#FAF6EE]"}`}
                        >
                            <span className="text-sm font-semibold text-[#8C6843]">
                                {previews.length > 0
                                    ? "Lägg till fler bilder"
                                    : "Ladda upp produktbilder"}
                            </span>

                            <span className="text-xs text-[#A89F94] mt-1">
                                PNG, JPG
                            </span>
                        </label>

                        {previews.length > 0 && (
                            <div className="mt-3">
                                <p className="text-xs text-[#8C6843] uppercase tracking-wider text-center mb-3">
                                    Förhandsvisning
                                </p>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {previews.map((preview, index) => (
                                        <div
                                            key={preview}
                                            className="flex flex-col items-center gap-2"
                                        >
                                            <img
                                                src={preview}
                                                alt={`Produktbild ${index + 1}`}
                                                className="w-full aspect-square object-cover rounded-lg border border-[#D9BE95]/50"
                                            />

                                            <p className="text-xs text-[#8C6843]">
                                                {index === 0
                                                    ? "Huvudbild"
                                                    : `Bild ${index + 1}`}
                                            </p>

                                            {index !== 0 && (
                                                <button
                                                    type="button"
                                                    disabled={loading}
                                                    onClick={() => {
                                                        setImageFiles((current) => {
                                                            const selected = current[index];

                                                            if (!selected) return current;

                                                            return [
                                                                selected,
                                                                ...current.filter(
                                                                    (_, i) => i !== index
                                                                ),
                                                            ];
                                                        });

                                                        setPreviews((current) => {
                                                            const selected = current[index];

                                                            if (!selected) return current;

                                                            return [
                                                                selected,
                                                                ...current.filter(
                                                                    (_, i) => i !== index
                                                                ),
                                                            ];
                                                        });
                                                    }}
                                                    className="text-xs px-2 py-1 rounded-lg border border-[#8C6843]/40 text-[#8C6843] hover:bg-[#EFE4D2]"
                                                >
                                                    Gör till huvudbild
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                disabled={loading}
                                                onClick={() => {
                                                    URL.revokeObjectURL(preview);

                                                    setImageFiles((current) =>
                                                        current.filter(
                                                            (_, i) => i !== index
                                                        )
                                                    );

                                                    setPreviews((current) =>
                                                        current.filter(
                                                            (_, i) => i !== index
                                                        )
                                                    );
                                                }}
                                                className="text-xs px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-100 disabled:opacity-50"
                                            >
                                                Ta bort
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Valbara varianter */}
                    <ProductVariantsEditor
                        variants={variants}
                        loading={loading}
                        onAdd={handleAddVariant}
                        onRemove={handleRemoveVariant}
                        onChange={handleVariantChange}
                    />

                    {/* Skapa produkt */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-3 py-3 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:bg-[#EAE4D9] disabled:text-[#A89F94] disabled:border-[#D9BE95]/30 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        {loading ? "Sparar..." : "Lägg till produkt"}
                    </button>
                </form>
            </div>

            {/* Senaste tillagda produkter */}
            <div className="max-w-xl mx-auto bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl p-6 mt-6 shadow-sm">
                <h2 className="text-sm uppercase tracking-wider text-[#8C6843] mb-3">
                    Senaste tillagda produkter
                </h2>

                <div className="space-y-3">
                    {latestProducts.map((p) => {
                        const standardVariant = p.product_variants.find(
                            (variant: ProductVariant) =>
                                !variant.color && !variant.size
                        );

                        const realVariants = p.product_variants.filter(
                            (variant: ProductVariant) =>
                                variant.color || variant.size
                        );

                        return (
                            <div
                                key={p.id}
                                className="flex items-center justify-between p-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE]"
                            >
                                <div className="flex items-center gap-3">
                                    {p.image && (
                                        <img
                                            src={p.image}
                                            alt={`Produktbild av ${p.name}`}
                                            className="w-12 h-12 object-cover rounded-lg"
                                        />
                                    )}

                                    <div>
                                        <p className="text-sm font-semibold">
                                            {p.name}
                                        </p>

                                        <p className="text-xs text-[#6B625A]">
                                            {p.price} kr
                                        </p>

                                        {realVariants.length === 0 ? (
                                            <p className="text-xs text-[#6B625A]">
                                                SKU: {standardVariant?.sku ?? "Saknas"}
                                            </p>
                                        ) : (
                                            <p className="text-xs text-[#6B625A]">
                                                {realVariants.length === 1
                                                    ? "1 variant"
                                                    : `${realVariants.length} varianter`}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(`/admin/products/${p.id}`)
                                        }
                                        className="text-xs px-3 py-1 rounded-lg bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C]"
                                    >
                                        Redigera
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(p.id)}
                                        className="text-xs px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-100"
                                    >
                                        Ta bort
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {latestProducts.length === 0 && (
                    <p className="text-sm text-[#8C6843]">
                        Inga produkter ännu
                    </p>
                )}
            </div>

            <ModalAlert
                modal={modal}
                onClose={() => setModal(null)}
            />
        </div>
    );
}
