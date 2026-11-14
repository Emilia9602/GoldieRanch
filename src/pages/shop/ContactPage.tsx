
function ContactPage() {
    const contactEmail = "goldieranch96@gmail.com";

    const cardClass =
        "bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-xl shadow-md hover:shadow-md transition h-full flex flex-col p-6";

    const iconClass =
        "w-12 h-12 mx-auto mb-4 rounded-full bg-[#F3EFE7] flex items-center justify-center text-[#8C6843]";

    const linkFocusClass =
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6843] rounded-sm";

    return (
        <main className="min-h-screen bg-[#FAF6EE] pt-10 pb-24 md:pb-10 text-[#342D26]">

            <div className="max-w-5xl mx-auto px-4">

                <section className="text-center max-w-2xl mx-auto mb-12">

                    <span className="block text-xs uppercase tracking-[0.25em] text-[#8C6843]">
                        Goldie Ranch
                    </span>

                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#342D26] mt-2">
                        Kontakta oss
                    </h1>

                    <div className="w-20 h-[3px] mx-auto mt-4 mb-5 bg-gradient-to-r from-transparent via-[#D9BE95] to-transparent opacity-90 rounded-full" />

                    <p className="text-base leading-relaxed text-[#6B5D48]">
                        Har du frågor om våra produkter, beställningar eller
                        behandlingar? Vi hjälper dig gärna!
                        Hör av dig så ser vi till att du får hjälp av rätt person.
                    </p>

                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">

                    <div className={`${cardClass} items-center text-center`}>

                        <div className={iconClass}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                />
                            </svg>
                        </div>

                        <h2 className="text-lg font-semibold text-[#342D26] mb-2">
                            E-post
                        </h2>

                        <p className="text-base leading-relaxed text-[#6B5D48] mb-4">
                            Har du frågor eller funderingar? Skicka ett mejl
                            till oss, så hjälper vi dig gärna!
                        </p>

                        <a
                            href={`mailto:${contactEmail}`}
                            className={`text-base font-semibold text-[#8C6843] transition-all duration-300 hover:text-[#6F4E2E] hover:-translate-y-0.5 ${linkFocusClass}`}                        >
                            {contactEmail}
                        </a>

                    </div>

                    <div className={`${cardClass} items-center text-center`}>

                        <div className={iconClass}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18 21a8 8 0 0 0-16 0"
                                />
                                <circle cx="10" cy="8" r="5" />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M22 20c0-3.37-2-6.5-4-7.5"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 3.13a5 5 0 0 1 0 9.75"
                                />
                            </svg>
                        </div>

                        <h2 className="text-lg font-semibold text-[#342D26] mb-2">
                            Följ oss & hör av dig
                        </h2>

                        <p className="text-base leading-relaxed text-[#6B5D48] mb-5">
                            Vill du ställa en fråga eller komma i kontakt med oss?
                            Skicka gärna ett meddelande via Facebook.
                            Du hittar oss även på Instagram och TikTok!
                        </p>

                        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-base text-[#8C6843] mt-auto">

                            <a
                                href="https://www.facebook.com/profile.php?id=100093571345152"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Besök Goldie Ranch på Facebook för att skicka ett meddelande"
                                className={`flex items-center gap-2 font-semibold transition duration-300 hover:text-[#6F4E2E] hover:-translate-y-0.5 ${linkFocusClass}`}
                            >
                                <svg
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.43 23.1 10.23 24v-8.44H7.08v-3.49h3.15V9.41c0-3.1 1.84-4.82 4.66-4.82 1.35 0 2.76.24 2.76.24v3.04h-1.55c-1.53 0-2.01.96-2.01 1.94v2.33h3.42l-.55 3.49h-2.87V24C19.57 23.1 24 18.1 24 12.07z" />
                                </svg>

                                <span>Skicka meddelande</span>
                            </a>

                            <a
                                href="https://instagram.com/goldie.ranch/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Besök Goldie Ranch på Instagram"
                                className={`flex items-center gap-2 transition duration-300 hover:text-[#6F4E2E] hover:-translate-y-0.5 ${linkFocusClass}`}
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
                                href="https://tiktok.com/@goldieranch"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Besök Goldie Ranch på TikTok"
                                className={`flex items-center gap-2 transition duration-300 hover:text-[#6F4E2E] hover:-translate-y-0.5 ${linkFocusClass}`}
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

                </section>

                <section className="mt-14">

                    <div className="text-center mb-7 max-w-2xl mx-auto">

                        <span className="block text-xs uppercase tracking-[0.25em] text-[#8C6843]">
                            Vi hjälper dig gärna
                        </span>

                        <h2 className="text-2xl font-semibold text-[#342D26] mt-2">
                            Vem hjälper dig?
                        </h2>

                        <div className="w-20 h-[3px] mx-auto mt-4 mb-5 bg-gradient-to-r from-transparent via-[#D9BE95] to-transparent opacity-90 rounded-full" />

                        <p className="text-base leading-relaxed text-[#6B5D48]">
                            Vi hjälps åt med verksamheten, men har lite olika
                            ansvarsområden. Här hittar du vem du ska kontakta
                            beroende på vad din fråga gäller.
                        </p>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                        <div className={`${cardClass} text-center items-center`}>

                            <div className={iconClass}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 7.5h12l1.5 13h-15L6 7.5Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 7.5V6a3 3 0 0 1 6 0v1.5"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-lg font-semibold text-[#342D26] mb-3">
                                Hästprodukter
                            </h3>

                            <p className="text-base leading-relaxed text-[#6B5D48] mb-5">
                                Frågor om våra hästprodukter eller beställningar?
                                Vi hjälps åt och finns här för dig båda två.
                            </p>

                            <div className="mt-auto pt-4 flex flex-col items-center">
                                <span className="text-base font-semibold text-[#8C6843]">
                                    Emilia & Ellinor
                                </span>

                                <a
                                    href={`mailto:${contactEmail}`}
                                    className={`text-base font-semibold text-[#8C6843] transition-all duration-300 hover:text-[#6F4E2E] hover:-translate-y-0.5 ${linkFocusClass}`}                                >
                                    Mejla oss →
                                </a>
                            </div>

                        </div>

                        <div className={`${cardClass} text-center items-center`}>

                            <div className={iconClass}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3v2m0 0c-2.5 2.2-3 4.1-1.5 5.5S13 14 12 17m0-12c2.5 2.2 3 4.1 1.5 5.5S11 14 12 17m-5.5 4h11M8 21c-1-1-1.5-2.5-1.5-4.5 0-2.5 1.5-4 3.5-4.5m6 9c1-1 1.5-2.5 1.5-4.5 0-2.5-1.5-4-3.5-4.5"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-lg font-semibold text-[#342D26] mb-3">
                                Ljus & doftpinnar
                            </h3>

                            <p className="text-base leading-relaxed text-[#6B5D48] mb-5">
                                Frågor om ljus, dofter eller beställningar?
                                Skicka ett sms till Emilia som ansvarar för produkterna.
                            </p>

                            <div className="mt-auto pt-4 flex flex-col items-center">
                                <span className="text-base font-semibold text-[#8C6843]">
                                    Emilia
                                </span>

                                <a
                                    href="sms:+46738549554"
                                    className={`font-medium text-[#8C6843] hover:underline mt-2 ${linkFocusClass}`}
                                >
                                    073-854 95 54
                                </a>
                            </div>

                        </div>

                        <div className={`${cardClass} text-center items-center`}>

                            <div className={iconClass}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 21s-8.25-4.5-8.25-11.25A4.5 4.5 0 0 1 12 7.5a4.5 4.5 0 0 1 8.25 2.25C20.25 16.5 12 21 12 21Z"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-lg font-semibold text-[#342D26] mb-3">
                                Behandlingar
                            </h3>

                            <p className="text-base leading-relaxed text-[#6B5D48] mb-5">
                                Frågor om behandlingar eller bokning?
                                Skicka ett sms till Ellinor direkt för mer information.
                            </p>

                            <div className="mt-auto pt-4 flex flex-col items-center">
                                <span className="text-base font-semibold text-[#8C6843]">
                                    Ellinor
                                </span>

                                <a
                                    href="sms:+46738549555"
                                    className={`font-medium text-[#8C6843] hover:underline mt-2 ${linkFocusClass}`}
                                >
                                    073-854 95 55
                                </a>
                            </div>

                        </div>

                    </div>

                </section>

                <section className="mt-12 text-center max-w-2xl mx-auto">

                    <p className="text-base leading-relaxed text-[#6B5D48]">
                        Vi ser fram emot att höra från dig. Varmt välkommen till Goldie Ranch!
                    </p>

                    <div className="w-20 h-[3px] mx-auto mt-5 bg-gradient-to-r from-transparent via-[#D9BE95] to-transparent opacity-90 rounded-full" />

                </section>

            </div>
        </main>
    );
}

export default ContactPage;
