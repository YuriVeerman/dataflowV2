'use client';

import MainSideBar from "../ui/dashboard/MainSideBar";
import { Suspense } from "react";
import { Group, Panel, Separator, useDefaultLayout } from "react-resizable-panels";

const storage = typeof window !== "undefined" ? localStorage : {
  getItem: () => null,
  setItem: () => {},
};

export default function SpaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({ id: "spaces-layout" });

  return (
    <Group
      orientation="horizontal"
      className="h-screen"
      defaultLayout={defaultLayout}
      onLayoutChanged={onLayoutChanged}
    >
      <Panel defaultSize={350} minSize={250} maxSize={450}>
        <Suspense fallback={<div className="bg-sidebar-bg w-full h-full" />}>
          <MainSideBar />
        </Suspense>
      </Panel>

      <Separator className="w-1 bg-brand-secondary cursor-col-resize" />

      <Panel minSize={30}>
        {children}
      </Panel>
    </Group>
  );
}
