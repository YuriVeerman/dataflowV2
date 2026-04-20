import { createClient } from "@/app/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { id } = await searchParams;

    return (
        <div className="bg-brand-secondary h-full">
            <p>Space ID: {id}</p>
            <p>User ID: {user?.id}</p>
        </div>
    );
}