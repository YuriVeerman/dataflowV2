"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

export default function SpaceNav() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [name, setName] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        async function fetchName() {
            if (!id) return;
            const { data, error } = await supabase
                .from('spaces')
                .select('name')
                .eq('id', id)
                .single();

            if (data) setName(data.name);
        }
        fetchName();
    }, [id, supabase]);

    return (
        <div className="p-1">
            <h1>{name}</h1>
        </div>
    );
}