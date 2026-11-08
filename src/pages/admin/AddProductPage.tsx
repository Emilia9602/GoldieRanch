import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, addVariant, deleteProduct, getProductsWithVariants } from "../../services/productService";
import type { ProductVariant, ProductWithVariants } from "../../types/product.types";
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

        const sortedProducts = data.sort((a, b) =>
            new Date(b.created_at ?? "").getTime() -
            new Date(a.created_at ?? "").getTime()
        );

        setLatestProducts(sortedProducts.slice(0, 3));
    };

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

    const handleRemoveVariant = (variant: ProductVariant) => {
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

    useEffect(() => {
        loadProducts();
    }, []);

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

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
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
                        message: "En eller flera bilder kunde inte laddas upp. Försök igen.",
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

            for (const variant of variants) {
                await addVariant({
                    product_id: product.id,
                    color: variant.color,
                    size: variant.size,
                    price: variant.price,
                    sku: variant.sku,
                    stock: variant.stock,
                });
            }

            previews.forEach((preview) => {
                URL.revokeObjectURL(preview);
            });

            setName("");
            setDescription("");
            setPrice("");
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

                    <div className="mb-3">
                        <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                            Produktnamn
                        </label>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Produktnamn"
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                            Beskrivning
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Beskrivning"
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                            Pris
                        </label>

                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Pris"
                            type="number"
                            className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] placeholder:text-[#8C6843] outline-none focus:border-[#D9BE95] text-sm"
                        />
                    </div>

                    <ProductCategorySelect
                        value={categoryId}
                        onChange={setCategoryId}
                        disabled={loading}
                    />

                    <div className="mb-3">
                        <label className="block text-xs uppercase tracking-wider text-[#8C6843] mb-2">
                            Bild
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            id="file-upload"
                            disabled={loading}
                            onChange={(e) => {
                                const files = Array.from(e.target.files ?? []);

                                const newPreviews = files.map((file) =>
                                    URL.createObjectURL(file)
                                );

                                setImageFiles((current) => [...current, ...files]);
                                setPreviews((current) => [...current, ...newPreviews]);

                                e.target.value = "";
                            }}
                            className="hidden"
                            placeholder="Image of product"
                        />

                        <label
                            htmlFor="file-upload"
                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl transition cursor-pointer
                                        ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F3EBDD]"}
                                        ${previews.length > 0 ? "border-[#CFB58C]" : "border-[#D9BE95]/60 bg-[#FAF6EE]"}`}
                        >
                            <span className="text-sm font-semibold text-[#8C6843]">
                                {previews.length > 0 ? "Lägg till fler bilder" : "Ladda upp produktbilder"}
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
                                                                ...current.filter((_, i) => i !== index),
                                                            ];
                                                        });

                                                        setPreviews((current) => {
                                                            const selected = current[index];

                                                            if (!selected) return current;

                                                            return [
                                                                selected,
                                                                ...current.filter((_, i) => i !== index),
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
                                                onClick={() => {
                                                    URL.revokeObjectURL(preview);

                                                    setImageFiles((current) =>
                                                        current.filter((_, i) => i !== index)
                                                    );

                                                    setPreviews((current) =>
                                                        current.filter((_, i) => i !== index)
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
                        type="submit"
                        disabled={loading}
                        className="w-full mt-3 py-3 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] disabled:bg-[#EAE4D9] disabled:text-[#A89F94] disabled:border-[#D9BE95]/30 disabled:cursor-not-allowed disabled:shadow-none">
                        {loading ? "Sparar..." : "Lägg till produkt"}
                    </button>
                </form>
            </div>

            <div className="max-w-xl mx-auto bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl p-6 mt-6 shadow-sm">
                <h2 className="text-sm uppercase tracking-wider text-[#8C6843] mb-3">
                    Senaste tillagda produkter
                </h2>

                <div className="space-y-3">
                    {latestProducts.map((p) => (
                        <div
                            key={p.id}
                            className="flex items-center justify-between p-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE]">
                            <div className="flex items-center gap-3">
                                {p.image && (
                                    <img
                                        src={p.image}
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
                                    <p className="text-xs text-[#6B625A]">
                                        {p.product_variants.length === 0
                                            ? "Inga varianter"
                                            : p.product_variants.length === 1
                                                ? "1 variant"
                                                : `${p.product_variants.length} varianter`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/admin/products/${p.id}`)}
                                    className="text-xs px-3 py-1 rounded-lg bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C]">
                                    Redigera
                                </button>

                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="text-xs px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-100">
                                    Ta bort
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ModalAlert
                modal={modal}
                onClose={() => setModal(null)}
            />
        </div>
    )
}