/**
 * ModalContext
 * Provides a global context for managing and displaying pop-up modal dialogs.
 */

"use client";
import React, { createContext, useContext, useState } from "react";
import PopUpMenu from "../ui/menu's/PopUpMenu";

/**
 * Context type definition for the Modal system.
 */
type ModalContextType = {
    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

/**
 * ModalProvider Component
 * Wraps the application to provide modal/pop-up window capabilities.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 */
export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    /**
     * Opens a modal with the provided React content.
     *
     * @param {React.ReactNode} content - The component or element to display inside the modal.
     */
    const openModal = (content: React.ReactNode) => setModalContent(content);

    /**
     * Closes the currently open modal.
     */
    const closeModal = () => setModalContent(null);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalContent && (
                <PopUpMenu onClose={closeModal}>
                    {modalContent}
                </PopUpMenu>
            )}
        </ModalContext.Provider>
    );
}

/**
 * Custom hook to access the modal system API.
 *
 * @throws {Error} If used outside of a ModalProvider.
 * @returns {ModalContextType} The modal context value.
 */
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within a ModalProvider");
    return context;
};
