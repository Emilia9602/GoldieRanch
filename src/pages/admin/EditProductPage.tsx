import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import type { ProductVariant, ProductWithVariants } from "../../types/product.types";
import { addVariant, deleteVariant, getProductWithVariantsById, updateProduct, updateVariant } from "../../services/productService";
import AdminNav from "../../components/admin/AdminNav";
import { uploadImage } from "../../services/storageService";
import ProductVariantsEditor from "../../components/admin/ProductVariantsEditor";
import ProductCategorySelect from "../../components/admin/ProductCategorySelect";
import type { ModalAlertData } from "../../components/admin/ModalAlert";
import ModalAlert from "../../components/admin/ModalAlert";

type ProductImage = {
    id: string;
    url: string;
    file: File | null;
};

export default function EditProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductWithVariants | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [images, setImages] = useState<ProductImage[]>([]);
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [deletedVariantIds, setDeletedVariantIds] = useState<number[]>([]);
    const [modal, setModal] = useState<ModalAlertData | null>(null);

    const imagesRef = useRef<ProductImage[]>([]);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;

            setFetching(true);

            try {
                const data = await getProductWithVariantsById(Number(id));
                setProduct(data);
                setVariants(data.product_variants ?? []);

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

                setModal({
                    type: "error",
                    title: "Kunde inte hämta produkten",
                    message: "Något gick fel när produkten skulle hämtas. Försök igen.",
                });
            } finally {
                setFetching(false);
            }
        };

        loadProduct();
    }, [id]);

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

    const handleRemoveVariant = (variant: ProductVariant) => {
        if (variant.id > 0) {
            setDeletedVariantIds((current) => [...current, variant.id]);
        }

        setVariants((current) =>
            current.filter((item) => item.id !== variant.id)
        );
    };

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

    const handleSave = async () => {
        if (!product) return;

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

            const updatedData = await getProductWithVariantsById(product.id);

            images.forEach((image) => {
                if (image.file) {
                    URL.revokeObjectURL(image.url);
                }
            });

            setProduct(updatedData);
            setVariants(updatedData.product_variants ?? []);
            setDeletedVariantIds([]);

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
                message: "Något gick fel när produkten skulle uppdateras. Försök igen.",
            });
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF6EE]">
                <p className="text-sm text-red-500">
                    Produkt hittades inte
                </p>

                <ModalAlert
                    modal={modal}
                    onClose={() => setModal(null)}
                />
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

                <ProductCategorySelect
                    value={product.category_id ?? null}
                    onChange={(categoryId) =>
                        setProduct({ ...product, category_id: categoryId })
                    }
                    disabled={loading}
                />

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
                            const files = Array.from(e.target.files ?? []);

                            const newImages = files.map((file) => ({
                                id: crypto.randomUUID(),
                                url: URL.createObjectURL(file),
                                file,
                            }));

                            setImages((current) => [...current, ...newImages]);

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
                                                if (image.file) {
                                                    URL.revokeObjectURL(image.url);
                                                }

                                                setImages((current) =>
                                                    current.filter(
                                                        (item) => item.id !== image.id
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

                <ProductVariantsEditor
                    variants={variants}
                    loading={loading}
                    onAdd={handleAddVariant}
                    onRemove={handleRemoveVariant}
                    onChange={handleVariantChange}
                />

                <button
                    disabled={loading}
                    onClick={handleSave}
                    className="w-full mt-3 py-3 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:bg-[#EAE4D9] disabled:text-[#A89F94] disabled:border-[#D9BE95]/30 disabled:cursor-not-allowed disabled:shadow-none">
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