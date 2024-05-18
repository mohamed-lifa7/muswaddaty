"use client";

import { type ReactNode } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import Loader from "@/components/Loader";

export function Room({
  children,
  docId,
}: {
  children: ReactNode;
  docId: string;
}) {
  return (
    <RoomProvider
      id={`liveblocks:muswaddaty:${docId}`}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
