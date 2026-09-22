import type { Session, User } from "@supabase/supabase-js"
import { createContext } from "react";

type AuthContextType = {
    user: User | null;
    session: Session | null;
    loading: boolean;
    role: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);