/**
 * SpacesList Component
 * Displays a list of available spaces and controls for adding or deleting them.
 */

"use client";
import { useEffect, useState, useCallback } from "react";
import { useRCMenu } from "../../context/MenuContext";
import { useModal } from "../../context/ModalContext";
import { useUser } from "../../context/UserContext";
import { HomeIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/app/lib/supabase/client";
import Link from "next/link";
import AddSpaceMenu from "./AddSpaceMenu";

type Space = {
    id: number;
    name: string;
};

/**
 * Main component to fetch and display the user's spaces.
 */
export default function SpacesList() {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const { openMenu } = useRCMenu();
    const { openModal, closeModal } = useModal();
    const { user, isLoading: userLoading } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    // Re-fetch spaces whenever the authenticated user ID or refresh trigger changes
    useEffect(() => {
        let isMounted = true;
        async function loadData() {
            if (userLoading) return; // Wait for user to load
            if (!user) {
                if (isMounted) setIsLoading(false);
                return;
            }
            const { data, error } = await supabase.from("spaces").select("*").eq('owner_id', user.id);
            if (isMounted) {
                if (data && !error) setSpaces(data);
                setIsLoading(false);
            }
        }
        loadData();
        return () => { isMounted = false; };
    }, [user, userLoading, supabase]);

    /**
     * Fetches all spaces from the Supabase database manually.
     */
    const fetchSpaces = useCallback(async () => {
        if (!user) return;
        const { data, error } = await supabase.from("spaces").select("*").eq('owner_id', user.id);
        if (data && !error) {
            setSpaces(data);
        }
        setIsLoading(false);
    }, [user, supabase]);

    /**
     * Deletes a space by its ID.
     * @param {number} id - The ID of the space to delete.
     */
    const deleteSpace = async (id: number) => {
        const { error } = await supabase.from("spaces").delete().match({ id });
        if (!error) fetchSpaces();
    };

    /**
     * Opens the modal to add a new space.
     */
    function AddSpace() {
        openModal(
            <AddSpaceMenu
                onClose={closeModal}
                onSucceed={() => fetchSpaces()}
            />
        );
    }

    return (
        <div className="
        w-15 flex flex-col mx-3 my-2
        *:hover:bg-hover-1 *:shrink-0 *:w-full *:aspect-square *:my-1.5 *:rounded-xl *:p-2 *:bg-gray-500 *:cursor-pointer"
        >
            <Link
                href="/spaces"
                className="flex items-center justify-center"
            >
                <HomeIcon />
            </Link>

            {isLoading ? (
                <div className="flex animate-pulse items-center justify-center text-xs text-white opacity-50">...</div>
            ) : (
                spaces?.map((space) => (
                    <Link
                        key={space.id}
                        className="truncate flex items-center justify-center text-xs text-white"
                        href={`/spaces/space?id=${space.id}`}

                        onContextMenu={(e) => openMenu(e, [
                            { label: "Delete Space", onClick: () => deleteSpace(space.id) },
                            { label: "Log ID", onClick: () => console.log(space.id) }
                        ])}
                    >
                        {space.name}
                    </Link>
                ))
            )}

            <button onClick={AddSpace} >
                <PlusIcon />
            </button>
        </div>
    );
}