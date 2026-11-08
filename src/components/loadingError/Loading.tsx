type Props = {
    message?: string;
};

export default function Loading({
    message = "Laddar...",
}: Props) {
    return (
        <div
            role="status"
            className="min-h-[calc(100dvh-125px)] md:min-h-[calc(100dvh-65px)] flex flex-col items-center justify-center bg-[#FAF6EE] px-4"
        >
            <div
                className="w-8 h-8 rounded-full border-[3px] border-[#D9BE95]/40 border-t-[#8C6843] animate-spin"
                aria-hidden="true"
            />

            <p className="mt-4 text-sm sm:text-base font-medium text-[#8C6843] tracking-wide">
                {message}
            </p>
        </div>
    );
}