import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import LogoutButton from "../../../components/admin/LogoutButton";

export default function MobileNavigation() {
    const [open, setOpen] = useState(false);

    const { role } = useAuth();

    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const quickLinkClass = (path: string) =>
        `flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border transition-colors ${isActive(path)
            ? "bg-[#D9BE95] border-[#C8A97E] text-[#342D26] shadow-sm"
            : "bg-[#FAF7F2] border-[#E5DFD5] text-[#342D26] hover:bg-[#D9BE95]/30"
        }`;

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    const closeMenu = () => {
        setOpen(false);
    };

    return (
        <>
            <header className="md:hidden sticky top-0 z-40 w-full border-b border-[#D9BE95]/60 bg-[#FAF7F2]/90 backdrop-blur-md">
                <div className="px-4 py-3 flex items-center gap-3">

                    <Link
                        to="/"
                        className="flex items-center gap-2 shrink-0 group"
                    >
                        <img
                            src="/images/Logga.png"
                            alt="Goldie Ranch logga"
                            className="w-9 h-9 object-contain rounded-full"
                        />

                        <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#6F5D48] group-hover:text-[#6F4E2E] transition-colors">
                            GOLDIE RANCH
                        </span>
                    </Link>

                    <div className="flex-1 flex items-center gap-2 h-9 px-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] text-[#6B625A]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 shrink-0"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.043 6.043a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>

                        <input
                            type="search"
                            placeholder="Sök"
                            className="w-full bg-transparent outline-none text-xs text-[#342D26] placeholder:text-[#8C6843]"
                        />
                    </div>
                </div>
            </header>

            <div
                className={`md:hidden fixed inset-0 z-40 bg-[#342D26]/50 backdrop-blur-sm transition-opacity duration-300 ${open
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeMenu}
            />

            <div
                className={`md:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="max-w-md mx-auto bg-[#FAF6EE] rounded-t-[28px] border border-[#E5DFD5] shadow-[0_-10px_35px_rgba(44,36,28,0.18)] overflow-hidden">

                    <div className="pt-3 pb-2 flex justify-center">
                        <div className="w-12 h-1.5 bg-[#D8C7A8] rounded-full" />
                    </div>

                    <div className="px-5 pb-3 flex items-center justify-between border-b border-[#E5DFD5]">

                        <div className="flex items-center gap-2.5">
                            <img
                                src="/images/Logga.png"
                                alt="Goldie Ranch"
                                className="w-9 h-9 rounded-full object-contain"
                            />

                            <div className="flex flex-col">
                                <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6843]">
                                    Goldie Ranch
                                </span>

                                <span className="text-[11px] uppercase tracking-wider font-medium text-[#342D26]">
                                    Utforska
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={closeMenu}
                            aria-label="Stäng meny"
                            className="w-9 h-9 rounded-full bg-[#EAE4D9] text-[#342D26] flex items-center justify-center"
                        >
                            <span className="text-lg leading-none">
                                ×
                            </span>
                        </button>
                    </div>

                    <div className="px-5 py-5">
                        <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#8C6843]">
                            Snabbval
                        </span>

                        <div className="grid grid-cols-3 gap-2 mt-3">

                            <Link
                                to="/shop"
                                onClick={closeMenu}
                                className={quickLinkClass("/shop")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 7.5h12l1.125 13.125H4.875L6 7.5Zm2.25 0V6a3.75 3.75 0 0 1 7.5 0v1.5"
                                    />
                                </svg>

                                <span className="text-[11px] uppercase tracking-wider font-semibold">
                                    Shop
                                </span>
                            </Link>

                            <Link
                                to="/treatments"
                                onClick={closeMenu}
                                className={quickLinkClass("/treatments")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3.75 14.25 9.75 20.25 12 14.25 14.25 12 20.25 9.75 14.25 3.75 12 9.75 9.75 12 3.75Z"
                                    />
                                </svg>

                                <span className="text-[11px] uppercase tracking-wider font-semibold">
                                    Behandlingar
                                </span>
                            </Link>

                            <Link
                                to="/sale"
                                onClick={closeMenu}
                                className={quickLinkClass("/sale")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m9 4.5 10.5 10.5-5.25 5.25L3.75 9.75V4.5H9Z"
                                    />
                                    <circle cx="7.125" cy="7.125" r=".75" fill="currentColor" />
                                </svg>

                                <span className="text-[11px] uppercase tracking-wider font-semibold">
                                    Rea
                                </span>
                            </Link>

                            {role === "admin" && (
                                <Link
                                    to="/admin"
                                    onClick={closeMenu}
                                    className={quickLinkClass("/admin")}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.5 2.25h3l.5 2.25a7.75 7.75 0 0 1 2.1.87l1.95-1.2 2.12 2.12-1.2 1.95c.37.65.66 1.35.87 2.1l2.25.5v3l-2.25.5a7.75 7.75 0 0 1-.87 2.1l1.2 1.95-2.12 2.12-1.95-1.2a7.75 7.75 0 0 1-2.1.87l-.5 2.25h-3l-.5-2.25a7.75 7.75 0 0 1-2.1-.87l-1.95 1.2-2.12-2.12 1.2-1.95a7.75 7.75 0 0 1-.87-2.1l-2.25-.5v-3l2.25-.5c.2-.75.5-1.45.87-2.1l-1.2-1.95L5.95 4.17l1.95 1.2a7.75 7.75 0 0 1 2.1-.87l.5-2.25Z"
                                        />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>

                                    <span className="text-[10px] uppercase tracking-wider font-semibold">
                                        Admin
                                    </span>
                                </Link>
                            )}

                        </div>

                        <div className="mt-5 rounded-xl bg-[#FAF7F2] border border-[#E5DFD5] overflow-hidden">

                            <div className="px-3.5 py-2 bg-[#D9BE95]/40 border-b border-[#E5DFD5]">
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#342D26]">
                                    Produktkategorier
                                </span>
                            </div>

                            <div className="p-3.5">
                                <Link
                                    to="/shop"
                                    onClick={closeMenu}
                                    className="block text-sm font-semibold text-[#6F5D48] hover:text-[#342D26] transition-colors"
                                >
                                    Alla produkter
                                </Link>

                                <p className="mt-2 text-sm text-[#8C6843]">
                                    Kategorier kommer här när sortimentet är uppbyggt.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl bg-[#FAF7F2] border border-[#E5DFD5] overflow-hidden">

                            <div className="px-3.5 py-2 bg-[#D9BE95]/40 border-b border-[#E5DFD5]">
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#342D26]">
                                    Information
                                </span>
                            </div>

                            <div className="divide-y divide-[#E5DFD5]">

                                <Link
                                    to="/about-us"
                                    onClick={closeMenu}
                                    className="block px-3.5 py-3 text-sm text-[#6F5D48] hover:bg-[#D9BE95]/15 hover:text-[#342D26] transition-colors"
                                >
                                    Om oss
                                </Link>

                                <Link
                                    to="/contact"
                                    onClick={closeMenu}
                                    className="block px-3.5 py-3 text-sm text-[#6F5D48] hover:bg-[#D9BE95]/15 hover:text-[#342D26] transition-colors"
                                >
                                    Kontakta oss
                                </Link>

                                <Link
                                    to="/returns"
                                    onClick={closeMenu}
                                    className="block px-3.5 py-3 text-sm text-[#6F5D48] hover:bg-[#D9BE95]/15 hover:text-[#342D26] transition-colors"
                                >
                                    Retur & reklamation
                                </Link>

                            </div>
                        </div>

                        {role === "admin" && (
                            <div className="mt-4 pt-4 border-t border-[#E5DFD5]">
                                <LogoutButton
                                    onRequestLogout={closeMenu}
                                    className="w-full min-h-11 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-[#E7B4B4] bg-[#FAF7F2] text-sm font-semibold text-[#9B6257] transition-colors hover:bg-[#F4DADA]"
                                />
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={closeMenu}
                            className="w-full mt-4 py-3 rounded-xl bg-[#D9BE95] text-[#342D26] text-xs uppercase tracking-[0.18em] font-semibold border border-[#C8A97E]"
                        >
                            Stäng meny
                        </button>
                    </div>
                </div>
            </div>

            <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-xl border-t border-[#E5DFD5] shadow-[0_-4px_20px_rgba(44,36,28,0.06)]">
                <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-around">

                    <Link
                        to="/"
                        className="flex flex-col items-center justify-center min-w-[44px] text-[#6B625A] hover:text-[#342D26] transition-colors"
                    >
                        <span className="text-[11px] uppercase font-semibold tracking-wider mt-1">
                            Hem
                        </span>

                        <div
                            className={`mt-1 h-[2px] w-5 rounded-full transition-all duration-300 ${isActive("/") ? "bg-[#D9BE95]" : "bg-transparent"
                                }`}
                        />
                    </Link>

                    <Link
                        to="/shop"
                        className="flex flex-col items-center justify-center min-w-[44px] text-[#6B625A] hover:text-[#342D26] transition-colors"
                    >
                        <span className="text-[11px] uppercase font-semibold tracking-wider mt-1">
                            Shop
                        </span>

                        <div
                            className={`mt-1 h-[2px] w-5 rounded-full transition-all duration-300 ${isActive("/shop") ? "bg-[#D9BE95]" : "bg-transparent"
                                }`}
                        />
                    </Link>

                    <Link
                        to="/contact"
                        className="flex flex-col items-center justify-center min-w-[44px] text-[#6B625A] hover:text-[#342D26] transition-colors"
                    >
                        <span className="text-[11px] uppercase font-semibold tracking-wider mt-1">
                            Kontakt
                        </span>

                        <div
                            className={`mt-1 h-[2px] w-5 rounded-full transition-all duration-300 ${isActive("/contact") ? "bg-[#D9BE95]" : "bg-transparent"
                                }`}
                        />
                    </Link>

                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="flex flex-col items-center justify-center min-w-[44px] text-[#342D26]"
                    >
                        <div className="w-7 h-7 rounded-lg bg-[#D9BE95]/50 border border-[#C8A97E] flex items-center justify-center">
                            <span className="text-base leading-none">☰</span>
                        </div>

                        <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
                            Meny
                        </span>
                    </button>

                </div>
            </nav>
        </>
    );
}