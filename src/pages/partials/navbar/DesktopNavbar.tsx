import { Link, useLocation } from "react-router-dom";

export default function DesktopNavbar() {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const base =
        "relative text-[12px] uppercase tracking-[0.2em] font-semibold text-[#6B625A] transition-all duration-200 hover:text-[#342D26] hover:scale-105 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#D9BE95] after:transition-all";

    const linkStyle = (active: boolean) =>
        `${base} ${active
            ? "text-[#342D26] after:w-full"
            : "text-[#6B625A] hover:text-[#342D26] after:w-0 hover:after:w-full"
        }`;

    return (
        <nav className="w-full border-b border-[#D9BE95]/60 bg-[#FAF7F2]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                <Link to="/" className="flex items-center gap-3 group relative">
                    <img
                        src="/images/Logga.png"
                        alt="Goldie Ranch logga"
                        className="w-10 h-10 object-contain rounded-full transition-transform duration-300"
                    />

                    <span className="relative inline-blocktext-[12px] uppercase tracking-[0.3em] font-semibold text-[#3E3A36] transition-colors duration-300 group-hover:text-[#6F4E2E] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-[#6F4E2E] after:transition-all hover:after:w-full hover:-translate-y-[1px]">
                        GOLDIE RANCH
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-6 text-sm text-[#6B625A]">

                    <Link to="/" className={linkStyle(isActive("/"))}>
                        Hem
                    </Link>

                    <Link to="/shop" className={linkStyle(isActive("/shop"))}>
                        Shop
                    </Link>

                    <Link to="/contact" className={linkStyle(isActive("/contact"))}>
                        Kontakt
                    </Link>
                </div>
            </div>
        </nav>
    )
}