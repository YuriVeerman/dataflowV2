/**
 * MenuContext
 * Provides a global context for managing and displaying right-click (context) menus.
 */

"use client";
import React, { createContext, useContext, useState } from "react";
import RightClickMenu from "../ui/menu's/RightClickMenu";

/**
 * Defines the structure for a single menu option.
 */
export type MenuOption = {
    label: string;
    onClick: () => void;
};

/**
 * Context type definition for the Menu system.
 */
type MenuContextType = {
    openMenu: (e: React.MouseEvent, options: MenuOption[]) => void;
};

const MenuContext = createContext<MenuContextType | null>(null);

/**
 * MenuProvider Component
 * Wraps the application to provide context menu capabilities.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 */
export function MenuProvider({ children }: { children: React.ReactNode }) {
    const [menu, setMenu] = useState<{ x: number; y: number; options: MenuOption[] } | null>(null);

    /**
     * Opens the context menu at the mouse position.
     * 
     * @param {React.MouseEvent} e - The mouse event.
     * @param {MenuOption[]} options - Array of options to display in the menu.
     */
    const openMenu = (e: React.MouseEvent, options: MenuOption[]) => {
        e.preventDefault();
        setMenu({ x: e.clientX, y: e.clientY, options });
    };

    /**
     * Closes the currently open menu.
     */
    const closeMenu = () => setMenu(null);

    return (
        <MenuContext.Provider value={{ openMenu }}>
            {children}
            {menu && (
                <RightClickMenu x={menu.x} y={menu.y} onClose={closeMenu}>
                    {menu.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => { opt.onClick(); closeMenu(); }}
                            className="w-full text-left p-2 hover:bg-gray-700 text-white text-xs whitespace-nowrap"
                        >
                            {opt.label}
                        </button>
                    ))}
                </RightClickMenu>
            )}
        </MenuContext.Provider>
    );
}

/**
 * Custom hook to access the context menu API.
 * 
 * @throws {Error} If used outside of a MenuProvider.
 * @returns {MenuContextType} The menu context value.
 */
export const useRCMenu = () => {
    const context = useContext(MenuContext);
    if (!context) throw new Error("useRCMenu must be used within a MenuProvider");
    return context;
};
