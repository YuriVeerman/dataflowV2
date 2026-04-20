import MainSideBar from "../ui/dashboard/MainSideBar";
import { Suspense } from "react";

export default function SpaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
            <div className="flex h-screen flex-row">
              <div className="w-[18%] shrink-0">
                <Suspense fallback={<div className="bg-sidebar-bg w-full h-full" />}>
                  <MainSideBar />
                </Suspense>
              </div>
              <div className="w-full h-screen shrink-0">
                {children}
              </div>
            </div>
  );
}
