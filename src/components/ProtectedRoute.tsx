import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../services/auth";
import type { User } from "@supabase/supabase-js";

type Props = {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getUser()
            .then(setUser)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="p-6">Laddar...</p>
    }

    if (!user) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}