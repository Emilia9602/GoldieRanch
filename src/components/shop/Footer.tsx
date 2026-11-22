
import { Link } from "react-router-dom";

function Footer() {
    const currentYear = new Date().getFullYear();

    const linkClass =
        "text-sm text-[#6B5D48] hover:text-[#342D26] hover:font-semibold transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6843] rounded-sm";

    const socialLinkClass =
        "flex items-center gap-2 text-sm text-[#6B5D48] hover:text-[#6F4E2E] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6843] rounded-sm";

    return (
        <footer className="bg-[#FAF7F2] border-t border-[#D9BE95]/50">
            <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Goldie Ranch */}
                    <div className="text-center sm:text-left">
                        <h2 className="text-xl font-semibold tracking-wide text-[#342D26]">
                            Goldie Ranch
                        </h2>

                        <div className="w-20 h-[3px] mt-3 mb-4 mx-auto sm:mx-0 bg-gradient-to-r from-transparent via-[#D9BE95] to-transparent opacity-90 rounded-full" />
                        <p className="text-sm leading-relaxed text-[#6B5D48] max-w-xs mx-auto sm:mx-0">
                            Med omtanke och passion skapar vi produkter
                            och upplevelser med inspiration från livet på landet.
                        </p>
                    </div>

                    {/* Snabblänkar */}
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

                            {/* TODO: Lägg till en Om oss-sida när den är skapad. */}
                            {/* <li>
                                <Link to="/about" className={linkClass}>
                                    Om oss
                                </Link>
                            </li> */}
                        </ul>
                    </div>

                    {/* Kundinformation */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#342D26] mb-4">
                            Kundinformation
                        </h3>

                        <ul className="flex flex-col gap-3 items-center sm:items-start">
                            <li>
                                <Link to="/returns" className={linkClass}>
                                    Returer & reklamation
                                </Link>
                            </li>

                            <li>
                                <Link to="/privacy-policy" className={linkClass}>
                                    Integritetspolicy
                                </Link>
                            </li>

                            {/* TODO: Skapa köpvillkor när beställningsfunktionen är klar. */}
                            {/* <li>
                                <Link to="/terms" className={linkClass}>
                                    Köpvillkor
                                </Link>
                            </li> */}

                            {/* TODO: Lägg till FAQ om ni vill samla vanliga kundfrågor. */}
                        </ul>

                        <div className="mt-6">
                            <p className="text-sm font-semibold text-[#342D26] mb-2">
                                Leverans
                            </p>

                            <p className="text-sm leading-relaxed text-[#6B5D48]">
                                Vi skickar beställningar med PostNord inom Sverige.
                            </p>
                        </div>
                    </div>

                    {/* Följ oss */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#342D26] mb-4">
                            Följ oss
                        </h3>

                        <p className="text-sm leading-relaxed text-[#6B5D48] mb-4">
                            Följ vår vardag och ta del av nyheter från Goldie Ranch.
                        </p>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">

                            <a
                                href="https://instagram.com/goldie.ranch/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={socialLinkClass}
                            >
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    aria-hidden="true"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <path d="M16 11.37a4 4 0 1 1-7.9 1.26 4 4 0 0 1 7.9-1.26z" />
                                    <circle cx="17.5" cy="6.5" r="1.1" />
                                </svg>
                                <span>Instagram</span>
                            </a>

                            <a
                                href="https://www.facebook.com/profile.php?id=100093571345152"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={socialLinkClass}
                            >
                                <svg
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.43 23.1 10.23 24v-8.44H7.08v-3.49h3.15V9.41c0-3.1 1.84-4.82 4.66-4.82 1.35 0 2.76.24 2.76.24v3.04h-1.55c-1.53 0-2.01.96-2.01 1.94v2.33h3.42l-.55 3.49h-2.87V24C19.57 23.1 24 18.1 24 12.07z" />
                                </svg>
                                <span>Facebook</span>
                            </a>

                            <a
                                href="https://tiktok.com/@goldieranch"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={socialLinkClass}
                            >
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M12.52.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                </svg>
                                <span>TikTok</span>
                            </a>

                        </div>
                    </div>

                </div>

                {/* Företagsuppgifter */}
                <div className="border-t border-[#D9BE95]/50 mt-10 pt-6 text-center">

                    <p className="text-sm leading-relaxed text-[#6B5D48]">
                        <span className="font-semibold text-[#342D26]">
                            Emilia and Ellinor Showhorses HB
                        </span>

                        <span className="mx-2">|</span>

                        Org.nr 969785-0023
                    </p>

                    <p className="text-sm leading-relaxed text-[#6B5D48] mt-2">
                        Västerstad 7181, 242 97 Hörby, Sverige

                        <span className="mx-2">|</span>

                        <a
                            href="mailto:goldieranch96@gmail.com"
                            className="text-[#6B5D48] hover:text-[#342D26] underline underline-offset-4 decoration-[#D9BE95] decoration-1 hover:decoration-[#8C6843] transition-colors duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6843] rounded-sm"
                        >
                            goldieranch96@gmail.com
                        </a>
                    </p>

                    <div className="mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-[#6B5D48] text-center">
                            © {currentYear} Goldie Ranch. Alla rättigheter förbehållna.
                        </p>

                        <p className="text-xs text-[#8C6843]">
                            Skapat med omtanke 🤎
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
