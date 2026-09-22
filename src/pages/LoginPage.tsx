import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/auth";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && user) {
            navigate("/admin");
        }
    }, [user, authLoading, navigate]);

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signIn(email, password);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Någit gick fel");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-start justify-center bg-[#FAF6EE] px-4 pt-20 overflow-hidden">
            <div className="w-full max-w-md bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-2xl shadow-md p-6">

                <div className="text-center mb-6">
                    <h1 className="text-xl font-semibold text-[#342D26]">
                        Goldie Ranch
                    </h1>

                    <p className="text-xs uppercase tracking-[0.25em] text-[#8C6843] mt-2">
                        Admin login
                    </p>

                    <div className="mt-3 w-10 h-[2px] bg-[#D9BE95] mx-auto rounded-full" />
                </div>

                <form onSubmit={handleLogin} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] text-[#342D26] placeholder:text-[#8C6843] text-sm outline-none focus:border-[#D9BE95]"
                    />

                    <input
                        type="password"
                        placeholder="Lösenord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#D9BE95]/50 bg-[#FAF6EE] text-[#342D26] placeholder:text-[#8C6843] text-sm outline-none focus:border-[#D9BE95]"
                    />

                    {error && (
                        <p className="text-xs text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-xl bg-[#D9BE95] text-[#342D26] font-semibold text-sm uppercase tracking-wider border border-[#C8A97E] hover:bg-[#CFB58C] transition cursor-pointer ${loading ? "opacity-60 pointer-events-none" : "hover:bg-[#CFB58C]"
                            }`}
                    >
                        {loading ? "Loggar in..." : "Logga in"}
                    </button>
                </form>
            </div>
        </div>
    )
}