
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type {
    ProductVariant,
    ProductWithVariants,
} from "../../types/product.types";
import {
    addVariant,
    deleteVariant,
    getProductWithVariantsById,
    updateProduct,
    updateVariant,
} from "../../services/productService";
import AdminNav from "../../components/admin/AdminNav";
import { uploadImage } from "../../services/storageService";
import ProductVariantsEditor from "../../components/admin/ProductVariantsEditor";
import ProductCategorySelect from "../../components/admin/ProductCategorySelect";
import type { ModalAlertData } from "../../components/admin/ModalAlert";
import ModalAlert from "../../components/admin/ModalAlert";
import Loading from "../../components/loadingError/Loading";
import ErrorState from "../../components/loadingError/ErrorState";
import NotFound from "../../components/loadingError/NotFound";

type ProductImage = {
    id: string;
    url: string;
    file: File | null;
};

export default function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<ProductWithVariants | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const [images, setImages] = useState<ProductImage[]>([]);
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [deletedVariantIds, setDeletedVariantIds] = useState<number[]>([]);

    const [standardSku, setStandardSku] = useState("");
    const [standardStock, setStandardStock] = useState("0");

    const [modal, setModal] = useState<ModalAlertData | null>(null);

    const imagesRef = useRef<ProductImage[]>([]);

    // Hämta produkt och dess varianter
    useEffect(() => {
        const loadProduct = async () => {
            if (!id) {
                setLoadError(true);
                setFetching(false);
                return;
            }

            setFetching(true);
            setLoadError(false);

            try {
                const data = await getProductWithVariantsById(Number(id));

                if (!data) {
                    setProduct(null);
                    setVariants([]);
                    setImages([]);
                    return;
                }

                setProduct(data);

                const loadedVariants = data.product_variants ?? [];

                // Hitta eventuell standardvariant
                const standardVariant = loadedVariants.find(
                    (variant: ProductVariant) =>
                        !variant.color && !variant.size
                );

                // Visa endast riktiga varianter i variantredigeraren
                setVariants(
                    loadedVariants.filter(
                        (variant: ProductVariant) =>
                            variant.color || variant.size
                    )
                );

                setStandardSku(standardVariant?.sku ?? "");
                setStandardStock(String(standardVariant?.stock ?? 0));

                const imageUrls = [
                    data.image,
                    ...(data.images ?? []),
                ].filter((url): url is string => Boolean(url));

                setImages(
                    imageUrls.map((url) => ({
                        id: crypto.randomUUID(),
                        url,
                        file: null,
                    }))
                );
            } catch (err) {
                console.log(err);
                setLoadError(true);
            } finally {
                setFetching(false);
            }
        };

        void loadProduct();
    }, [id, retryCount]);

    // Håll koll på bilder för att kunna frigöra objekt-URL:er
    useEffect(() => {
        imagesRef.current = images;
    }, [images]);

    useEffect(() => {
        return () => {
            imagesRef.current.forEach((image) => {
                if (image.file) {
                    URL.revokeObjectURL(image.url);
                }
            });
        };
    }, []);

    // Lägg till en ny variant
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

        setVariants((current) => [newVariant, ...current]);
    };

    // Ta bort en variant
    const handleRemoveVariant = (variant: ProductVariant) => {
        if (variant.id > 0) {
            setDeletedVariantIds((current) =>
                current.includes(variant.id)
                    ? current
                    : [...current, variant.id]
            );
        }

        setVariants((current) =>
            current.filter((item) => item.id !== variant.id)
        );
    };

    // Ändra en variant
    const handleVariantChange = (
        variantId: number,
        field: keyof ProductVariant,
        value: string | number | null
    ) => {
        setVariants((current) =>
            current.map((variant) =>
                variant.id === variantId
                    ? { ...variant, [field]: value }
                    : variant
            )
        );
    };

    // Spara produkt och varianter
    const handleSave = async () => {
        if (!product) return;

        // Kontrollera att alla SKU är ifyllda
        if (variants.length > 0) {
            const missingSku = variants.some(
                (variant) => !variant.sku?.trim()
            );

            if (missingSku) {
                setModal({
                    type: "error",
                    title: "SKU saknas",
                    message: "Alla produktvarianter måste ha ett SKU innan du kan spara.",
                });
                return;
            }
        } else if (!standardSku.trim()) {
            setModal({
                type: "error",
                title: "SKU saknas",
                message: "Produkten måste ha ett SKU innan du kan spara.",
            });
            return;
        }

        setLoading(true);

        try {
            const imageUrls = await Promise.all(
                images.map((image) =>
                    image.file
                        ? uploadImage(image.file)
                        : Promise.resolve(image.url)
                )
            );

            await updateProduct(product.id, {
                name: product.name,
                description: product.description,
                price: product.price,
                image: imageUrls[0] ?? null,
                images: imageUrls.slice(1),
                category_id: product.category_id,
            });

            // Ta bort borttagna varianter
            for (const variantId of deletedVariantIds) {
                await deleteVariant(variantId);
            }

            // Spara riktiga varianter
            for (const variant of variants) {
                const variantData = {
                    color: variant.color,
                    size: variant.size,
                    price: variant.price,
                    sku: variant.sku?.trim() ?? "",
                    stock: variant.stock,
                };

                if (variant.id < 0) {
                    await addVariant({
                        product_id: product.id,
                        ...variantData,
                    });
                } else {
                    await updateVariant(variant.id, variantData);
                }
            }

            // Hantera standardvariant
            const currentData = await getProductWithVariantsById(product.id);

            if (!currentData) {
                throw new Error(
                    "Produkten kunde inte hämtas efter uppdateringen."
                );
            }

            const currentStandardVariant = (
                currentData.product_variants ?? []
            ).find(
                (variant: ProductVariant) =>
                    !variant.color && !variant.size
            );

            if (variants.length > 0) {
                // En produkt med riktiga varianter ska inte ha en standardvariant
                if (currentStandardVariant) {
                    await deleteVariant(currentStandardVariant.id);
                }
            } else {
                // En produkt utan riktiga varianter ska ha en standardvariant
                const standardVariantData = {
                    color: "",
                    size: "",
                    price: product.price,
                    sku: standardSku.trim(),
                    stock: Number(standardStock),
                };

                if (currentStandardVariant) {
                    await updateVariant(
                        currentStandardVariant.id,
                        standardVariantData
                    );
                } else {
                    await addVariant({
                        product_id: product.id,
                        ...standardVariantData,
                    });
                }
            }

            // Hämta den uppdaterade produkten
            const updatedData = await getProductWithVariantsById(product.id);

            if (!updatedData) {
                throw new Error(
                    "Produkten kunde inte hämtas efter uppdateringen."
                );
            }

            images.forEach((image) => {
                if (image.file) {
                    URL.revokeObjectURL(image.url);
                }
            });

            setProduct(updatedData);

            const updatedVariants = updatedData.product_variants ?? [];

            const updatedStandardVariant = updatedVariants.find(
                (variant: ProductVariant) =>
                    !variant.color && !variant.size
            );

            setVariants(
                updatedVariants.filter(
                    (variant: ProductVariant) =>
                        variant.color || variant.size
                )
            );

            setStandardSku(updatedStandardVariant?.sku ?? "");
            setStandardStock(String(updatedStandardVariant?.stock ?? 0));

            const updatedImageUrls = [
                updatedData.image,
                ...(updatedData.images ?? []),
            ].filter((url): url is string => Boolean(url));

            setImages(
                updatedImageUrls.map((url) => ({
                    id: crypto.randomUUID(),
                    url,
                    file: null,
                }))
            );

            setDeletedVariantIds([]);

            setModal({
                type: "success",
                title: "Produkten har uppdaterats!",
                message: "Dina ändringar har sparats.",
            });
        } catch (err) {
            console.log(err);

            setModal({
                type: "error",
                title: "Kunde inte spara",
                message:
                    "Något gick fel när produkten skulle uppdateras. Försök igen.",
            });
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <Loading message="Laddar produkt..." />;
    }

    if (loadError) {
        return (
            <ErrorState
                message="Vi kunde inte hämta produkten just nu. Försök igen."
                onRetry={() => {
                    setRetryCount((current) => current + 1);
                }}
                isRetrying={fetching}
            />
        );
    }

    if (!product) {
        return (
            <NotFound
                title="Produkten hittades inte"
                message="Produkten kanske har tagits bort eller så är länken felaktig."
                actionLabel="Till alla produkter"
                onAction={() => navigate("/admin")}
            />
        );
    }

    const hasVariants = variants.length > 0;

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

                {/* Produktnamn */}
                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Produktnamn
                    </label>

                    <input
                        value={product.name ?? ""}
                        disabled={loading}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                name: e.target.value,
                            })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        placeholder="Namn"
                    />
                </div>

                {/* Beskrivning */}
                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Beskrivning
                    </label>

                    <textarea
                        value={product.description ?? ""}
                        disabled={loading}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                description: e.target.value,
                            })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        placeholder="Beskrivning"
                    />
                </div>

                {/* Pris */}
                <div className="mb-3">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Pris
                    </label>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={product.price ?? ""}
                        disabled={loading}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                price:
                                    e.target.value === ""
                                        ? null
                                        : Number(e.target.value),
                            })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        placeholder="Pris"
                    />
                </div>

                {/* Kategori */}
                <ProductCategorySelect
                    value={product.category_id ?? null}
                    onChange={(categoryId) =>
                        setProduct({
                            ...product,
                            category_id: categoryId,
                        })
                    }
                    disabled={loading}
                />

                {/* Produktbilder */}
                <div className="mb-3 mt-4">
                    <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                        Produktbilder
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        id="file-upload"
                        multiple
                        disabled={loading}
                        onChange={(e) => {
                            const files = Array.from(
                                e.target.files ?? []
                            );

                            const newImages = files.map((file) => ({
                                id: crypto.randomUUID(),
                                url: URL.createObjectURL(file),
                                file,
                            }));

                            setImages((current) => [
                                ...current,
                                ...newImages,
                            ]);

                            e.target.value = "";
                        }}
                        className="hidden"
                    />

                    <label
                        htmlFor="file-upload"
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl transition cursor-pointer
                        ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F3EBDD]"}
                        ${images.length > 0 ? "border-[#CFB58C]" : "border-[#D9BE95]/60 bg-[#FAF6EE]"}`}
                    >
                        <span className="text-sm font-semibold text-[#8C6843]">
                            {images.length > 0
                                ? "Lägg till fler bilder"
                                : "Ladda upp produktbilder"}
                        </span>

                        <span className="text-xs text-[#A89F94] mt-1">
                            PNG, JPG
                        </span>
                    </label>

                    {images.length > 0 && (
                        <div className="mt-3">
                            <p className="text-xs text-[#8C6843] uppercase tracking-wider text-center mb-3">
                                Produktbilder
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {images.map((image, index) => (
                                    <div
                                        key={image.id}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <img
                                            src={image.url}
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
                                                    setImages((current) => {
                                                        const selected =
                                                            current[index];

                                                        if (!selected) {
                                                            return current;
                                                        }

                                                        return [
                                                            selected,
                                                            ...current.filter(
                                                                (_, i) =>
                                                                    i !== index
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
                                                if (image.file) {
                                                    URL.revokeObjectURL(
                                                        image.url
                                                    );
                                                }

                                                setImages((current) =>
                                                    current.filter(
                                                        (item) =>
                                                            item.id !== image.id
                                                    )
                                                );
                                            }}
                                            className="text-xs px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-100"
                                        >
                                            Ta bort
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Standardvariant: SKU och lager */}
                {!hasVariants && (
                    <div className="mt-8 pt-6 border-t border-[#D9BE95]/40">
                        <h2 className="text-sm font-semibold text-[#342D26] mb-1">
                            Lager och SKU
                        </h2>

                        <p className="text-xs text-[#8C6843] mb-4">
                            Produkten har inga valbara varianter. Ange SKU
                            och lagersaldo här.
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-[#8C6843] mb-2">
                                    Lager
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={standardStock}
                                    disabled={loading}
                                    onChange={(e) =>
                                        setStandardStock(e.target.value)
                                    }
                                    className="w-full px-3 py-2.5 rounded-lg border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                                    placeholder="0"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-[#8C6843] mb-2">
                                    SKU *
                                </label>

                                <input
                                    value={standardSku}
                                    required
                                    disabled={loading}
                                    onChange={(e) =>
                                        setStandardSku(e.target.value)
                                    }
                                    className="w-full px-3 py-2.5 rounded-lg border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                                    placeholder="GR-PRODUKT-001"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Riktiga varianter */}
                <ProductVariantsEditor
                    variants={variants}
                    loading={loading}
                    onAdd={handleAddVariant}
                    onRemove={handleRemoveVariant}
                    onChange={handleVariantChange}
                />

                {/* Spara */}
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleSave}
                    className="w-full mt-3 py-3 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:bg-[#EAE4D9] disabled:text-[#A89F94] disabled:border-[#D9BE95]/30 disabled:cursor-not-allowed disabled:shadow-none"
                >
                    {loading ? "Sparar..." : "Spara ändringar"}
                </button>
            </div>

            <ModalAlert
                modal={modal}
                onClose={() => setModal(null)}
            />
        </div>
    );
}
