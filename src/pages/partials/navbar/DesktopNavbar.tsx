import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import LogoutButton from "../../../components/admin/LogoutButton";

export default function DesktopNavbar() {
    const location = useLocation();
    const { role } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const isShopActive =
        location.pathname.startsWith("/shop") ||
        location.pathname === "/sale";

    const base =
        "relative text-[12px] uppercase tracking-[0.2em] font-semibold text-[#6B625A] transition-all duration-200 hover:text-[#342D26] hover:scale-105 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-[#D9BE95] after:transition-all";

    const linkStyle = (active: boolean) =>
        `${base} ${active
            ? "text-[#342D26] after:w-full"
            : "text-[#6B625A] hover:text-[#342D26] after:w-0 hover:after:w-full"
        }`;

    const dropdownLinkStyle = (active: boolean) =>
        `block rounded-lg px-4 py-2.5 text-[11px] uppercase tracking-wider font-semibold transition-colors ${active
            ? "bg-[#D9BE95]/30 text-[#342D26]"
            : "text-[#6B625A] hover:bg-[#D9BE95]/20 hover:text-[#342D26]"
        }`;

    return (
        <nav className="w-full border-b border-[#D9BE95]/60 bg-[#FAF7F2]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                <Link to="/" className="flex items-center gap-3 group relative shrink-0">
                    <img
                        src="/images/Logga.png"
                        alt="Goldie Ranch logga"
                        className="w-10 h-10 object-contain rounded-full transition-transform duration-300"
                    />

                    <span className="relative inline-block text-[12px] uppercase tracking-[0.3em] font-semibold text-[#6F5D48] transition-colors duration-300 group-hover:text-[#6F4E2E] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-[#D9BE95] after:transition-all after:duration-300 hover:after:w-full hover:-translate-y-[1px]">
                        GOLDIE RANCH
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-6 text-sm text-[#6B625A]">

                    <Link to="/" className={linkStyle(isActive("/"))}>
                        Hem
                    </Link>

                    <div className="relative group flex items-center">

                        <Link
                            to="/shop"
                            className={`${linkStyle(isShopActive)} inline-flex items-center gap-1.5`}
                        >
                            Shop

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </Link>

                        <div className="absolute left-0 top-full z-50 invisible pointer-events-none opacity-0 translate-y-1 pt-3 w-56 transition-all duration-200 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">

                            <div className="rounded-xl border border-[#D9BE95]/50 bg-[#FAF7F2] p-2 shadow-lg">

                                <Link
                                    to="/shop"
                                    className={dropdownLinkStyle(
                                        location.pathname === "/shop"
                                    )}
                                >
                                    Alla produkter
                                </Link>

                                <Link
                                    to="/sale"
                                    className={dropdownLinkStyle(
                                        location.pathname === "/sale"
                                    )}
                                >
                                    Rea
                                </Link>

                            </div>
                        </div>
                    </div>

                    <Link
                        to="/treatments"
                        className={linkStyle(isActive("/treatments"))}
                    >
                        Behandlingar
                    </Link>

                    <Link
                        to="/about-us"
                        className={linkStyle(isActive("/about-us"))}
                    >
                        Om oss
                    </Link>

                    <Link
                        to="/contact"
                        className={linkStyle(isActive("/contact"))}
                    >
                        Kontakt
                    </Link>

                    {role === "admin" && (
                        <>
                            <Link
                                to="/admin"
                                className={linkStyle(
                                    location.pathname.startsWith("/admin")
                                )}
                            >
                                Admin
                            </Link>

                            <LogoutButton
                                className="relative inline-flex items-center gap-2 cursor-pointer text-[11px] lg:text-[12px] uppercase tracking-[0.15em] lg:tracking-[0.2em] font-semibold text-[#9B6257] transition-all duration-200 hover:text-[#B85C5C] hover:scale-105 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-[#B85C5C] after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap"
                            />
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}