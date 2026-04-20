/**
 * PopUpMenu Component
 * A generic modal interface that provides a centered container with a backdrop.
 */

/*

/**
 * Renders children inside a centered modal with a darkened backdrop.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @param {Function} props.onClose - Callback triggered when the backdrop is clicked.
 */
export default function PopUpMenu({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
    return (
        /* The Backdrop: Fixed, full screen, dimmed, and a centring flex container */
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center font-sans tracking-tight" onClick={onClose}>
            <div className="w-100 h-fit bg-gray-800 shadow-xl rounded-2xl overflow-hidden p-6 text-white" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}