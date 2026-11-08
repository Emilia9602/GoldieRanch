import AdminNav from "../../components/admin/AdminNav";
import CategoryForm from "../../components/admin/CategoryForm";
import CategoryList from "../../components/admin/CategoryList";
import ErrorState from "../../components/loadingError/ErrorState";
import Loading from "../../components/loadingError/Loading";

import { useCategories } from "../../hooks/useCategories";

export default function AdminCategoriesPage() {
    const { data: categories, isLoading, isError, isFetching, refetch } = useCategories();

    const allCategories = categories ?? [];

    const parentCategories = allCategories.filter(
        (category) => category.parent_id === null
    );

    if (isLoading) {
        <Loading message="Laddar kategorier..." />
    }

    if (isError && !categories) {
        return (
            <ErrorState
                message="Vi kunde inte hämta kategorierna just nu. Försök igen."
                onRetry={() => {
                    void refetch();
                }}
                isRetrying={isFetching}
            />
        );
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