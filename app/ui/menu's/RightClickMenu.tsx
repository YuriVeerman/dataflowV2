/**
 * RightClickMenu Component
 * Renders a context menu at specific coordinates using a React Portal.
 */

"use client";
import { createPortal } from "react-dom";
import { useSyncExternalStore } from "react";

type RightClickMenuProps = {
    x: number;
    y: number;
    onClose: () => void;
    children: React.ReactNode;
};

const emptySubscribe = () => () => {};

/**
 * A portal-based component that renders a menu at the provided (x, y) coordinates.
 *
 * @param {Object} props - The component props.
 * @param {number} props.x - The horizontal position in pixels.
 * @param {number} props.y - The vertical position in pixels.
 * @param {Function} props.onClose - Callback to close the menu.
 * @param {React.ReactNode} props.children - The menu items (usually buttons).
 */
export default function RightClickMenu({ x, y, onClose, children }: RightClickMenuProps) {
    const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

    if (!isClient) return null;

    return createPortal(
        <div className="fixed inset-0 z-10000" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }}>
            <div
                className="fixed w-40 bg-gray-800 border border-gray-700 shadow-xl rounded-md overflow-hidden flex flex-col"
                style={{top: y, left: x}}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}