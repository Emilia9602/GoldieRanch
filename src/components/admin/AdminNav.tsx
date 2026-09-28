import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "../../services/auth";

export default function AdminNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const handleLogout = async () => {
        await signOut();
        navigate("/login");
    };

    const base =
        "px-4 py-2 rounded-xl text-sm font-semibold border transition";

    const active =
        "bg-[#D9BE95] text-[#342D26] border-[#D9BE95]";

    const inactive =
        "bg-[#F8F4EC] border-[#D9BE95]/40 text-[#342D26] hover:bg-[#E8D8C0]";

    return (
        <div className="max-w-xl mx-auto mb-6 flex gap-2">
            <div className="max-w-xl mx-auto flex gap-2 p-2 bg-[#EFE4D2] border border-[#D9BE95]/40 rounded-2xl shadow-sm">
                <button
                    onClick={() => navigate("/admin")}
                    className={`${base} ${isActive("/admin") ? active : inactive}`}
                >
                    Lägg till
                </button>

                <button
                    onClick={() => navigate("/admin/products")}
                    className={`${base} ${isActive("/admin/products") ? active : inactive}`}
                >
                    Alla produkter
                </button>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl text-sm font-semibold border border-[#E7B4B4] text-[#B85C5C] bg-[#F8F4EC] hover:bg-[#F4DADA] transition-all duration-150"
                >
                    Logga ut
                </button>
            </div>
        </div>
    );
}