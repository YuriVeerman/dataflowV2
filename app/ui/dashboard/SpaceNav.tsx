"use client";

import { useSearchParams } from "next/navigation";

export default function SpaceNav() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    return (
        <div className="p-1">
            <p>Space Navigation</p>
            {id && <p>Current Space ID: {id}</p>}
        </div>
    );
}