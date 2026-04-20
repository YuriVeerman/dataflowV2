/**
 * SpacesList Component
 * Displays a list of available spaces and controls for adding or deleting them.
 */

"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/supabase";
import { useRCMenu } from "../../context/MenuContext";
import { useModal } from "../../context/ModalContext";
import { HomeIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
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

    /**
     * Fetches all spaces from the Supabase database.
     */
    const fetchSpaces = () => {
        supabase.from("spaces").select("*").then(({ data }) => {
            if (data) setSpaces(data);
        });
    };

    /**
     * Deletes a space by its ID.
     * @param {number} id - The ID of the space to delete.
     */
    const deleteSpace = async (id: number) => {
        const { error } = await supabase.from("spaces").delete().match({ id });
        if (!error) fetchSpaces();
    };

    useEffect(() => {
        fetchSpaces();
    }, []);

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

            {spaces?.map((space) => (
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
            ))}

            <button onClick={AddSpace} >
                <PlusIcon />
            </button>
        </div>
    );
}