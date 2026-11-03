import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { signOut } from "../../services/auth";

type Props = {
    className: string;
    onRequestLogout?: () => void;
};

export default function LogoutButton({
    className,
    onRequestLogout,
}: Props) {
    const navigate = useNavigate();

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);

        try {
            await signOut();
            setShowLogoutConfirm(false);
            navigate("/login");
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    onRequestLogout?.();
                    setShowLogoutConfirm(true);
                }}
                disabled={isLoggingOut}
                className={className}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M10 17l5-5-5-5" />
                    <path d="M15 12H3" />
                    <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                </svg>

                Logga ut
            </button>

            {showLogoutConfirm &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#342D26]/50 backdrop-blur-sm p-4"
                        onClick={(e) => {
                            if (
                                e.target === e.currentTarget &&
                                !isLoggingOut
                            ) {
                                setShowLogoutConfirm(false);
                            }
                        }}
                    >
                        <div className="w-full max-w-sm rounded-2xl border border-[#D9BE95]/50 bg-[#FAF6EE] p-6 shadow-2xl">

                            <h2 className="text-lg font-semibold text-[#342D26]">
                                Vill du logga ut?
                            </h2>

                            <p className="mt-2 text-sm text-[#6B625A]">
                                Är du säker på att du vill logga ut från
                                Goldie Ranch Admin?
                            </p>

                            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={() => setShowLogoutConfirm(false)}
                                    disabled={isLoggingOut}
                                    className="min-h-11 rounded-xl border border-[#D9BE95]/60 bg-white px-4 py-2 text-sm font-semibold text-[#342D26] hover:bg-[#EFE4D2] disabled:opacity-50"
                                >
                                    Avbryt
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="min-h-11 rounded-xl border border-[#B85C5C] bg-[#B85C5C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9F4B4B] disabled:opacity-60"
                                >
                                    {isLoggingOut ? "Loggar ut..." : "Logga ut"}
                                </button>

                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}