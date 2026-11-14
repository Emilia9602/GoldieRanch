
import { Link } from "react-router-dom";

function Footer() {
    const currentYear = new Date().getFullYear();

    const linkClass =
        "text-sm text-[#6B5D48] hover:text-[#8C6843] transition-all duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6843] rounded-sm";

    const socialLinkClass =
        "text-sm text-[#6B5D48] hover:text-[#8C6843] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6843] rounded-sm";

    return (
        <footer className="bg-[#FAF7F2] border-t border-[#D9BE95]/50">
            <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    <div className="text-center sm:text-left">
                        <h2 className="text-xl font-semibold tracking-wide text-[#342D26]">
                            Goldie Ranch
                        </h2>

                        <div className="w-12 h-[2px] bg-[#D9BE95] mt-3 mb-4 mx-auto sm:mx-0 rounded-full" />

                        <p className="text-sm leading-relaxed text-[#6B5D48] max-w-xs mx-auto sm:mx-0">
                            Med omtanke och passion skapar vi produkter
                            och upplevelser med inspiration från livet på landet.
                        </p>
                    </div>

                    <div className="text-center sm:text-left">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#342D26] mb-4">
                            Snabblänkar
                        </h3>

                        <ul className="flex flex-col gap-3 items-center sm:items-start">
                            <li>
                                <Link to="/" className={linkClass}>
                                    Hem
                                </Link>
                            </li>

                            <li>
                                <Link to="/shop" className={linkClass}>
                                    Shop
                                </Link>
                            </li>

                            <li>
                                <Link to="/contact" className={linkClass}>
                                    Kontakta oss
                                </Link>
                            </li>

                            <li>
                                <Link to="/returns" className={linkClass}>
                                    Returer & reklamation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center sm:text-left">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#342D26] mb-4">
                            Följ oss
                        </h3>

                        <p className="text-sm leading-relaxed text-[#6B5D48] mb-4">
                            Följ vår vardag och ta del av nyheter från Goldie Ranch.
                        </p>

                        <div className="flex justify-center sm:justify-start gap-5">
                            <a
                                href="https://www.facebook.com/profile.php?id=100093571345152"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Goldie Ranch på Facebook"
                                className={socialLinkClass}
                            >
                                Facebook
                            </a>

                            <a
                                href="https://instagram.com/goldie.ranch/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Goldie Ranch på Instagram"
                                className={socialLinkClass}
                            >
                                Instagram
                            </a>

                            <a
                                href="https://tiktok.com/@goldieranch"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Goldie Ranch på TikTok"
                                className={socialLinkClass}
                            >
                                TikTok
                            </a>
                        </div>
                    </div>

                </div>

                <div className="border-t border-[#D9BE95]/50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-[#6B5D48] text-center">
                        © {currentYear} Goldie Ranch. Alla rättigheter förbehållna.
                    </p>

                    <p className="text-xs text-[#8C6843]">
                        Skapat med omtanke 🤎
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
