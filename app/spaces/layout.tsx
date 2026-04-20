import MainSideBar from "../ui/dashboard/MainSideBar";

export default function SpaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
            <div className="flex h-screen flex-row">
              <div className="w-[18%] shrink-0">
                <MainSideBar />
              </div>
              <div className="w-full h-screen shrink-0">
                {children}
              </div>
            </div>
  );
}
