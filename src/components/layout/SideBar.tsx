"use client";

import { trpc } from "@/app/_trpc/client";
import { Stack } from "@mui/material";
import { RoomList } from "../room/RoomList";
import { RecentChats } from "../room/RecentRooms";
import { SearchBar } from "../chat/SearchBar";
import { RoomItemContextMenu } from "../room/RoomItemContextMenu";
import { useState } from "react";
import { Room } from "@prisma/client";

export const SideBar = () => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    data?: Room;
  } | null>(null);

  const handleClose = () => {
    setContextMenu(null);
  };

  const { data: recentRooms } = trpc.chatRoom.recent.useQuery({ size: 6 });
  return (
    <>
      <SearchBar />
      <Stack
        sx={{
          width: "100%",
          flexGrow: 1,
          overflow: "scroll",
        }}
      >
        <RecentChats data={recentRooms} setContextMenu={setContextMenu} />
        <RoomList setContextMenu={setContextMenu} />

        <RoomItemContextMenu
          handleClose={handleClose}
          contextMenu={contextMenu}
        />
      </Stack>
    </>
  );
};
