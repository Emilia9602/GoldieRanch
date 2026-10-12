import AdminNav from "../../components/admin/AdminNav";
import CategoryForm from "../../components/admin/CategoryForm";
import CategoryList from "../../components/admin/CategoryList";

import { useCategories } from "../../hooks/useCategories";

export default function AdminCategoriesPage() {
    const { data: categories, isLoading, refetch } = useCategories();

    const allCategories = categories ?? [];

    const parentCategories = allCategories.filter(
        (category) => category.parent_id === null
    );

    if (isLoading) {
        return <p className="p-6">Laddar kategorier...</p>;
    }

    return (
        <div className="min-h-screen bg-[#FAF6EE] p-6 pb-24 text-[#342D26]">
            <AdminNav />

            <CategoryForm
                parentCategories={parentCategories}
                onCreated={refetch}
            />

            <CategoryList
                categories={allCategories}
                onChanged={refetch}
            />
        </div>
    );
}