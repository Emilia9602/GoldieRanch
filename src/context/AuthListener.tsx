import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AuthListener() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (loading) return;

        if (user && location.pathname === "/login") {
            navigate("/admin", { replace: true });
        }

    }, [user, loading, location.pathname, navigate]);

    return null;
}