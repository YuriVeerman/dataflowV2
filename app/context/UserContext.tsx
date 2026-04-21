"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { User } from "@supabase/supabase-js";

type UserContextType = {
    user: User | null;
    isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        let isMounted = true;

        async function fetchUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (isMounted) {
                setUser(user);
                setIsLoading(false);
            }
        }

        fetchUser();

        // Listen for auth state changes (login, logout, session expiration)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (isMounted) {
                    setUser(session?.user ?? null);
                    setIsLoading(false);
                }
            }
        );

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, [supabase]);

    return (
        <UserContext.Provider value={{ user, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

/**
 * Custom hook to consume the UserContext.
 * Returns the current authenticated user and loading state.
 */
export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
