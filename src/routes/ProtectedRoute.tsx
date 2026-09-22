import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const { user, loading } = useAuth();

    if (loading) {
        return <p className="p-6">Laddar...</p>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}