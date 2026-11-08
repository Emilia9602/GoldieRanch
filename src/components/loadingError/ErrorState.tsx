type Props = {
    message?: string;
    onRetry?: () => void;
    isRetrying?: boolean;
};

export default function ErrorState({
    message = "Något gick fel. Försök igen.",
    onRetry,
    isRetrying = false,
}: Props) {
    return (
        <div
            role="alert"
            className="min-h-[calc(100dvh-125px)] md:min-h-[calc(100dvh-65px)] flex flex-col items-center justify-center bg-[#FAF6EE] px-4 text-center"
        >
            <div className="w-12 h-12 rounded-full bg-[#F4DADA] text-[#9B6257] flex items-center justify-center">
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
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                </svg>
            </div>

            <h1 className="mt-4 text-lg font-semibold text-[#342D26]">
                Något gick fel
            </h1>

            <p className="mt-2 max-w-sm text-sm text-[#6B625A] leading-relaxed">
                {message}
            </p>

            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    disabled={isRetrying}
                    className="mt-5 px-5 py-2.5 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-sm font-semibold text-[#342D26] hover:bg-[#CFB58C] transition-colors disabled:opacity-60"
                >
                    {isRetrying ? "Försöker igen..." : "Försök igen"}
                </button>
            )}
        </div>
    );
}