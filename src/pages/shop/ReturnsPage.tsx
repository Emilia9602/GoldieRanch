
import { Link } from "react-router-dom";

function ReturnsPage() {
    const sectionClass =
        "bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-xl shadow-sm p-6 sm:p-8";

    const headingClass =
        "text-lg font-semibold text-[#342D26] mb-3";

    const textClass =
        "text-base leading-relaxed text-[#6B5D48]";

    const linkFocusClass =
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6843] rounded-sm";

    return (
        <main className="min-h-screen bg-[#FAF6EE] pt-10 pb-24 md:pb-10 text-[#342D26]">

            <div className="max-w-4xl mx-auto px-4">

                <section className="text-center max-w-2xl mx-auto mb-12">

                    <span className="block text-xs uppercase tracking-[0.25em] text-[#8C6843]">
                        Goldie Ranch
                    </span>

                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#342D26] mt-2">
                        Returer & reklamation
                    </h1>

                    <div className="w-20 h-[3px] mx-auto mt-4 mb-5 bg-gradient-to-r from-transparent via-[#D9BE95] to-transparent opacity-90 rounded-full" />

                    <p className={textClass}>
                        Vi vill att du ska känna dig trygg när du handlar hos
                        oss. Här hittar du information om returer, ångerrätt
                        och reklamationer.
                    </p>

                </section>

                <div className="space-y-5">

                    <section className={sectionClass}>
                        <h2 className={headingClass}>
                            Ångerrätt
                        </h2>

                        <p className={textClass}>
                            [Här fyller vi i information om ångerrätt,
                            tidsfrist och vilka villkor som gäller för att
                            returnera en vara.]
                        </p>
                    </section>

                    <section className={sectionClass}>
                        <h2 className={headingClass}>
                            Så gör du en retur
                        </h2>

                        <p className={`${textClass} mb-4`}>
                            [Här beskriver vi hur kunden går till väga
                            för att genomföra en retur.]
                        </p>

                        <ol className="list-decimal list-inside space-y-3 text-base leading-relaxed text-[#6B5D48]">
                            <li>
                                [Kontakta oss och meddela att du vill returnera en vara.]
                            </li>
                            <li>
                                [Invänta information om hur returen ska skickas.]
                            </li>
                            <li>
                                [Skicka tillbaka varan enligt våra instruktioner.]
                            </li>
                        </ol>
                    </section>

                    <section className={sectionClass}>
                        <h2 className={headingClass}>
                            Returkostnader
                        </h2>

                        <p className={textClass}>
                            [Här fyller vi i vem som står för returfrakten
                            och om det finns några andra kostnader vid retur.]
                        </p>
                    </section>

                    <section className={sectionClass}>
                        <h2 className={headingClass}>
                            Återbetalning
                        </h2>

                        <p className={textClass}>
                            [Här beskriver vi hur återbetalningen går till,
                            vilket betalningssätt som används och hur lång
                            tid kunden kan förvänta sig att det tar.]
                        </p>
                    </section>

                    <section className={sectionClass}>
                        <h2 className={headingClass}>
                            Reklamation
                        </h2>

                        <p className={textClass}>
                            Har du fått en vara som är skadad eller felaktig?
                            [Här fyller vi i hur kunden gör en reklamation
                            och vilken information eller dokumentation vi
                            behöver från kunden.]
                        </p>
                    </section>

                    <section className={sectionClass}>
                        <h2 className={headingClass}>
                            Undantag och särskilda villkor
                        </h2>

                        <p className={textClass}>
                            [Här fyller vi i om det finns särskilda villkor
                            för exempelvis specialbeställda eller
                            personligt anpassade produkter.]
                        </p>
                    </section>

                </div>

                <section className="mt-12 text-center max-w-2xl mx-auto">

                    <h2 className="text-lg font-semibold text-[#342D26] mb-3">
                        Har du frågor?
                    </h2>

                    <p className={`${textClass} mb-5`}>
                        Är du osäker på något eller behöver hjälp med en
                        retur? Tveka inte att kontakta oss så hjälper vi dig!
                    </p>

                    <Link
                        to="/contact"
                        className={`inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] transition-colors duration-300 ${linkFocusClass}`}
                    >
                        Kontakta oss
                    </Link>

                    <div className="mt-8">
                        <Link
                            to="/shop"
                            className={`text-base font-medium text-[#8C6843] hover:text-[#6F4E2E] hover:underline transition-colors duration-300 ${linkFocusClass}`}
                        >
                            ← Tillbaka till butiken
                        </Link>
                    </div>

                </section>

            </div>
        </main>
    );
}

export default ReturnsPage;
