'use client';
import { useUser } from "@/app/context/UserContext";

export default function UserMenu() {
    const { user, isLoading } = useUser();

    if (isLoading) {
        return <div className="bg-brand-tertiary h-12 m-2 p-1 rounded-md animate-pulse" />;
    }

    return (
        <div className="bg-brand-tertiary h-12 m-2 p-1 rounded-md">
            {user?.email || 'Guest'}
        </div>
    );
}