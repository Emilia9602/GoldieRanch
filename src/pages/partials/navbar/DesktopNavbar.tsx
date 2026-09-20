import { Link } from "react-router-dom";

export default function DesktopNavbar() {
    const linkStyle =
        "relative text-[12px] uppercase tracking-[o.2em] font-semibold text-[#6B625A] hover:text-[#6F4E2E] transition after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-[#6F4E2E] after:transition-all hover:after:w-full hover:-translate-y-[1px]";

    return (
        <nav className="w-full border-b border-[#E5DFD5] bg-[#FAF7F2]/80 backdrop-blur-md sticky top-0 z-50">
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

                    <Link to="/" className={linkStyle}>
                        Hem
                    </Link>

                    <Link to="/shop" className={linkStyle}>
                        Shop
                    </Link>

                    <Link to="/contact" className={linkStyle}>
                        Kontakt
                    </Link>
                </div>
            </div>
        </nav>
    )
}