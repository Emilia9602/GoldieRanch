import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <main className="flex min-h-[calc(100dvh-125px)] md:min-h-[calc(100dvh-65px)] items-center justify-center bg-[#FAF7F2] px-6 py-16">
            <div className="w-full max-w-xl text-center">

                <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#8C6843]">
                    Fel 404
                </p>

                <h1 className="mb-5 font-serif text-4xl font-semibold text-[#342D26] sm:text-5xl">
                    Hoppsan!
                </h1>

                <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-[#6F6255]">
                    Sidan du letar efter verkar inte finnas. Den kan ha flyttats,
                    tagits bort eller så har adressen blivit fel.
                </p>

                <Link
                    to="/shop"
                    className="inline-flex items-center justify-center rounded-full border border-[#D9BE95]/50 bg-[#D9BE95] px-8 py-3 text-sm font-medium text-[#342D26] transition-colors hover:bg-[#CFB58C]"                >
                    Till shoppen
                </Link>

                <div className="mt-6">
                    <Link
                        to="/"
                        className="text-sm text-[#8C6843] underline underline-offset-4 transition-colors hover:text-[#342D26]"
                    >
                        Till startsidan
                    </Link>
                </div>

            </div>
        </main>
    );
}

export default NotFoundPage;