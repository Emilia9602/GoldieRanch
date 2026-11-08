export type ModalAlertData = {
    type: "success" | "error" | "info" | "confirm";
    title: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => void;
    isLoading?: boolean;
};

type Props = {
    modal: ModalAlertData | null;
    onClose: () => void;
};

export default function ModalAlert({ modal, onClose }: Props) {
    if (!modal) return null;

    const isConfirm = modal.type === "confirm";

    const iconStyle =
        modal.type === "success"
            ? "bg-[#E7ECDD] text-[#687B5A]"
            : modal.type === "error"
                ? "bg-[#F4DADA] text-[#9B6257]"
                : modal.type === "confirm"
                    ? "bg-[#EFE4D2] text-[#8C6843]"
                    : "bg-[#EFE4D2] text-[#8C6843]";

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#342D26]/50 backdrop-blur-sm p-4"
            onClick={(e) => {
                if (
                    e.target === e.currentTarget &&
                    !modal.isLoading
                ) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="admin-modal-title"
                aria-describedby="admin-modal-description"
                className="w-full max-w-sm rounded-2xl border border-[#D9BE95]/50 bg-[#FAF6EE] p-6 shadow-2xl"
            >
                <div className="flex items-start gap-3">

                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold ${iconStyle}`}>
                        {modal.type === "success"
                            ? "✓"
                            : modal.type === "error"
                                ? "!"
                                : modal.type === "confirm"
                                    ? "?"
                                    : "i"}
                    </div>

                    <div>
                        <h2
                            id="admin-modal-title"
                            className="text-lg font-semibold text-[#342D26]"
                        >
                            {modal.title}
                        </h2>

                        <p
                            id="admin-modal-description"
                            className="mt-2 text-sm leading-relaxed text-[#6B625A]"
                        >
                            {modal.message}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                    {isConfirm && (
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={modal.isLoading}
                            className="min-h-11 rounded-xl border border-[#D9BE95]/60 bg-white px-4 py-2 text-sm font-semibold text-[#342D26] transition-colors hover:bg-[#EFE4D2] disabled:opacity-50"
                        >
                            Avbryt
                        </button>
                    )}

                    {isConfirm ? (
                        <button
                            type="button"
                            onClick={modal.onConfirm}
                            disabled={modal.isLoading || !modal.onConfirm}
                            className="min-h-11 rounded-xl border border-[#B85C5C] bg-[#B85C5C] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#9F4B4B] disabled:opacity-60"
                        >
                            {modal.isLoading
                                ? "Arbetar..."
                                : modal.confirmText ?? "Bekräfta"}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onClose}
                            className="min-h-11 rounded-xl border border-[#D9BE95]/50 bg-[#D9BE95] px-5 py-2 text-sm font-semibold text-[#342D26] transition-colors hover:bg-[#CFB58C]"
                        >
                            Okej
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}