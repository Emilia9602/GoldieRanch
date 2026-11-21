import { useState } from "react";
import { updateCategory, deleteCategory } from "../../services/productService";
import type { Category } from "../../types/product.types";
import type { ModalAlertData } from "./ModalAlert";
import ModalAlert from "./ModalAlert";
import { useCategoryProductCounts } from "../../hooks/useCategories";
import CategoryItem from "./categories/CategoryItem";
import SubcategoryItem from "./categories/SubcategoryItem";
import CategoryEditForm from "./categories/CategoryEditForm";

type Props = {
    categories: Category[];
    onChanged: () => Promise<unknown>;
};

export default function CategoryList({ categories, onChanged }: Props) {
    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");
    const [editParentId, setEditParentId] = useState<number | null>(null);
    const [editSortOrder, setEditSortOrder] = useState("0");
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState<ModalAlertData | null>(null);

    const {
        data: productCounts = {},
        refetch: refetchProductCounts,
    } = useCategoryProductCounts();

    const parentCategories = categories.filter(
        (category) => category.parent_id === null
    );

    function getProductCount(categoryId: number) {
        return productCounts[categoryId] ?? 0;
    }

    function getTotalProductCount(category: Category) {
        const children = categories.filter(
            (child) => child.parent_id === category.id
        );

        return (
            getProductCount(category.id) +
            children.reduce(
                (total, child) => total + getProductCount(child.id),
                0
            )
        );
    }

    function toggleCategory(id: number) {
        setExpandedCategories((current) =>
            current.includes(id)
                ? current.filter((categoryId) => categoryId !== id)
                : [...current, id]
        );
    }

    function startEditingCategory(category: Category) {
        setEditingCategoryId(category.id);
        setEditName(category.name);
        setEditParentId(category.parent_id);
        setEditSortOrder(String(category.sort_order ?? 0));

        if (category.parent_id !== null) {
            setExpandedCategories((current) =>
                current.includes(category.parent_id!)
                    ? current
                    : [...current, category.parent_id!]
            );
        } else {
            setExpandedCategories((current) =>
                current.includes(category.id)
                    ? current
                    : [...current, category.id]
            );
        }
    }

    function cancelEditingCategory() {
        setEditingCategoryId(null);
        setEditName("");
        setEditParentId(null);
        setEditSortOrder("0");
    }

    async function handleUpdateCategory(
        category: Category,
        isSubcategory: boolean
    ) {
        if (!editName.trim()) {
            setModal({
                type: "info",
                title: "Ange ett kategorinamn",
                message: "Kategorinamnet får inte vara tomt.",
            });

            return;
        }

        if (
            isSubcategory &&
            (editParentId === null ||
                !parentCategories.some(
                    (parent) => parent.id === editParentId
                ))
        ) {
            setModal({
                type: "info",
                title: "Välj en huvudkategori",
                message:
                    "Du måste välja en giltig huvudkategori för underkategorin.",
            });

            return;
        }

        const sortOrder = Number(editSortOrder);

        if (!Number.isInteger(sortOrder) || sortOrder < 0) {
            setModal({
                type: "info",
                title: "Ogiltig sorteringsordning",
                message:
                    "Sorteringsordningen måste vara ett heltal som är 0 eller högre.",
            });

            return;
        }

        setLoading(true);

        try {
            await updateCategory(category.id, {
                name: editName.trim(),
                sort_order: sortOrder,
                ...(isSubcategory
                    ? { parent_id: editParentId }
                    : {}),
            });

            cancelEditingCategory();
            await onChanged();

            setModal({
                type: "success",
                title: isSubcategory
                    ? "Underkategorin har uppdaterats!"
                    : "Huvudkategorin har uppdaterats!",
                message: "Dina ändringar har sparats.",
            });
        } catch (error) {
            console.error("Kunde inte uppdatera kategori:", error);

            setModal({
                type: "error",
                title: "Kunde inte uppdatera kategorin",
                message:
                    "Kontrollera att ändringen är giltig och försök igen.",
            });
        } finally {
            setLoading(false);
        }
    }

    async function confirmDeleteCategory(category: Category) {
        setLoading(true);

        setModal((current) =>
            current ? { ...current, isLoading: true } : current
        );

        try {
            await deleteCategory(category.id);
            await onChanged();
            await refetchProductCounts();

            if (editingCategoryId === category.id) {
                cancelEditingCategory();
            }

            setModal({
                type: "success",
                title:
                    category.parent_id === null
                        ? "Huvudkategorin har tagits bort!"
                        : "Underkategorin har tagits bort!",
                message: `"${category.name}" har tagits bort.`,
            });
        } catch (error) {
            console.error("Kunde inte ta bort kategori:", error);

            setModal({
                type: "error",
                title: "Kunde inte ta bort kategorin",
                message:
                    "Något gick fel när kategorin skulle tas bort. Kontrollera om produkter eller underkategorier fortfarande använder den.",
            });
        } finally {
            setLoading(false);
        }
    }

    function handleDeleteCategory(category: Category) {
        const children = categories.filter(
            (child) => child.parent_id === category.id
        );

        const productCount = getTotalProductCount(category);
        const reasons: string[] = [];

        if (productCount > 0) {
            reasons.push(
                `"${category.name}" har ${productCount} ${productCount === 1 ? "produkt" : "produkter"
                } kopplade till sig eller sina underkategorier. Flytta produkterna till en annan kategori först.`
            );
        }

        if (children.length > 0) {
            reasons.push(
                `Kategorin har ${children.length} ${children.length === 1
                    ? "underkategori"
                    : "underkategorier"
                }. Ta bort eller flytta underkategorierna först.`
            );
        }

        if (reasons.length > 0) {
            setModal({
                type: "info",
                title: "Kategorin kan inte tas bort",
                message: reasons.join("\n\n"),
            });

            return;
        }

        const isSubcategory = category.parent_id !== null;

        setModal({
            type: "confirm",
            title: isSubcategory
                ? "Ta bort underkategorin?"
                : "Ta bort huvudkategorin?",
            message: `Vill du verkligen ta bort ${isSubcategory ? "underkategorin" : "huvudkategorin"
                } "${category.name}"?`,
            confirmText: "Ta bort",
            onConfirm: () => {
                void confirmDeleteCategory(category);
            },
        });
    }

    return (
        <div className="max-w-xl mx-auto bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl p-6 mt-6 shadow-sm">
            <h2 className="text-sm uppercase tracking-wider text-[#8C6843] mb-4">
                Befintliga kategorier
            </h2>

            {parentCategories.length > 0 ? (
                <div className="space-y-3">
                    {parentCategories.map((category) => {
                        const children = categories.filter(
                            (child) => child.parent_id === category.id
                        );

                        const isExpanded = expandedCategories.includes(
                            category.id
                        );

                        const isEditing =
                            editingCategoryId === category.id;

                        return (
                            <CategoryItem
                                key={category.id}
                                category={category}
                                productCount={getTotalProductCount(category)}
                                isExpanded={isExpanded}
                                loading={loading}
                                onToggle={() =>
                                    toggleCategory(category.id)
                                }
                                onEdit={() =>
                                    startEditingCategory(category)
                                }
                                onDelete={() =>
                                    handleDeleteCategory(category)
                                }
                            >
                                {isEditing && (
                                    <CategoryEditForm
                                        category={category}
                                        isSubcategory={false}
                                        parentCategories={parentCategories}
                                        name={editName}
                                        parentId={editParentId}
                                        sortOrder={editSortOrder}
                                        loading={loading}
                                        onNameChange={setEditName}
                                        onParentChange={setEditParentId}
                                        onSortOrderChange={setEditSortOrder}
                                        onSave={() => {
                                            void handleUpdateCategory(
                                                category,
                                                false
                                            );
                                        }}
                                        onCancel={cancelEditingCategory}
                                    />
                                )}

                                <p className="text-xs text-[#8C6843]">
                                    Slug: {category.slug}
                                </p>

                                {children.length > 0 ? (
                                    children.map((child) => {
                                        const isEditingChild =
                                            editingCategoryId === child.id;

                                        return (
                                            <SubcategoryItem
                                                key={child.id}
                                                category={child}
                                                productCount={getProductCount(
                                                    child.id
                                                )}
                                                loading={loading}
                                                onEdit={() =>
                                                    startEditingCategory(child)
                                                }
                                                onDelete={() =>
                                                    handleDeleteCategory(child)
                                                }
                                            >
                                                {isEditingChild && (
                                                    <CategoryEditForm
                                                        category={child}
                                                        isSubcategory={true}
                                                        parentCategories={parentCategories}
                                                        name={editName}
                                                        parentId={editParentId}
                                                        sortOrder={editSortOrder}
                                                        loading={loading}
                                                        onNameChange={setEditName}
                                                        onParentChange={setEditParentId}
                                                        onSortOrderChange={setEditSortOrder}
                                                        onSave={() => {
                                                            void handleUpdateCategory(
                                                                child,
                                                                true
                                                            );
                                                        }}
                                                        onCancel={cancelEditingCategory}
                                                    />
                                                )}
                                            </SubcategoryItem>
                                        );
                                    })
                                ) : (
                                    <p className="text-xs text-[#8C6843]">
                                        Inga underkategorier ännu.
                                    </p>
                                )}
                            </CategoryItem>
                        );
                    })}
                </div>
            ) : (
                <p className="text-sm text-[#8C6843]">
                    Inga kategorier ännu.
                </p>
            )}

            <ModalAlert
                modal={modal}
                onClose={() => setModal(null)}
            />
        </div>
    );
}
