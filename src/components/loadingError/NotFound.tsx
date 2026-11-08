type Props = {
    title?: string;
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
};

export default function NotFound({
    title = "Inget hittades",
    message = "Det vi letar efter kunde inte hittas.",
    actionLabel,
    onAction,
}: Props) {
    return (
        <div className="min-h-[calc(100dvh-125px)] md:min-h-[calc(100dvh-65px)] flex flex-col items-center justify-center bg-[#FAF6EE] px-4 text-center">

            <div className="w-12 h-12 rounded-full bg-[#EFE4D2] text-[#8C6843] flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m16 16 4 4" />
                    <path d="M8 11h6" />
                </svg>
            </div>

            <h1 className="mt-4 text-lg font-semibold text-[#342D26]">
                {title}
            </h1>

            <p className="mt-2 max-w-sm text-sm text-[#6B625A] leading-relaxed">
                {message}
            </p>

            {actionLabel && onAction && (
                <button
                    type="button"
                    onClick={onAction}
                    className="mt-5 px-5 py-2.5 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-sm font-semibold text-[#342D26] hover:bg-[#CFB58C] transition-colors"
                >
                    {actionLabel}
                </button>
            )}

        </div>
    );
}