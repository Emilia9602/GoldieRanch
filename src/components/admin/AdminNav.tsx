import { useNavigate, useLocation } from "react-router-dom";

export default function AdminNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === "/admin") {
            return (
                location.pathname === "/admin" ||
                location.pathname.startsWith("/admin/products/")
            );
        }

        return location.pathname === path;
    };

    const base =
        "min-w-0 min-h-12 flex items-center justify-center px-2 sm:px-3 py-2 rounded-xl text-[11px] sm:text-sm leading-tight font-semibold border transition-colors text-center";

    const active =
        "bg-[#D9BE95] text-[#342D26] border-[#C8A97E] shadow-sm";

    const inactive =
        "bg-[#F8F4EC] border-[#D9BE95]/40 text-[#342D26] hover:bg-[#E8D8C0]";

    return (
        <nav
            aria-label="Adminnavigering"
            className="w-full max-w-xl mx-auto mb-6"
        >
            <div className="grid grid-cols-3 gap-2 p-2 bg-[#EFE4D2] border border-[#D9BE95]/40 rounded-2xl shadow-sm">

                <button
                    type="button"
                    onClick={() => navigate("/admin")}
                    aria-current={isActive("/admin") ? "page" : undefined}
                    className={`${base} ${isActive("/admin") ? active : inactive}`}
                >
                    Alla produkter
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/admin/add/product")}
                    aria-current={
                        isActive("/admin/add/product") ? "page" : undefined
                    }
                    className={`${base} ${isActive("/admin/add/product") ? active : inactive}`}
                >
                    Lägg till
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/admin/categories")}
                    aria-current={
                        isActive("/admin/categories") ? "page" : undefined
                    }
                    className={`${base} ${isActive("/admin/categories") ? active : inactive}`}
                >
                    Kategorier
                </button>

            </div>
        </nav>
    );
}