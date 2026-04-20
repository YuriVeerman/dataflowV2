/**
 * AddSpaceMenu Component
 * Provides a user interface for creating a new workspace space.
 */

"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase/supabase";
import PopUpMenu from "../menu's/PopUpMenu";

/**
 * Renders a form to create a new space in the database.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - Callback to close the modal.
 * @param {Function} props.onSucceed - Callback triggered when the space is successfully created.
 */
export default function AddSpaceMenu({ onClose, onSucceed }: { onClose: () => void, onSucceed: () => void }) {
    const [name, setName] = useState("");

    /**
     * Handles the creation of a new space via Supabase.
     */
    async function handleCreate() {
        if (!name.trim()) return;
        const { error } = await supabase.from("spaces").insert({ name });
        if (!error) {
            onSucceed(); // Tell the list: 'Hey, I added a space! Refresh!'
            onClose(); // Close the menu
        }
    }

    return (
        <PopUpMenu onClose={onClose}>
            <div className="flex flex-col gap-4 text-white">
                <h2 className="text-xl font-bold">New Space Name</h2>
                <input
                    className="p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                    placeholder="e.g. Work"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleCreate} className="bg-blue-600 p-2 rounded-lg">Create</button>
            </div>
        </PopUpMenu>
    );
}