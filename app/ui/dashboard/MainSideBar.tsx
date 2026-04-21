/**
 * MainSideBar Component
 * The primary sidebar of the application containing space navigation and other utility panels.
 */

import SpacesList from "./SpacesList";
import UserMenu from "./userMenu";
import SpaceNav from "./SpaceNav";

/**
 * Renders the main sidebar container.
 */
export default function MainSideBar() {
    return (
        <aside className="bg-brand-primary flex flex-col h-full">
            <div className="flex-1 *:overflow-y-auto *:no-scrollbar overflow-hidden flex-row flex">
                <SpacesList />
                <div className="flex-1 border-l border-brand-tertiary p-1">
                    <SpaceNav />
                </div>
            </div>

            <div className="bottom-0 border-t border-brand-tertiary">
                <UserMenu/>
            </div>
        </aside>
    );
}