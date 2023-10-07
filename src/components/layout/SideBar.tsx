"use client";

import { trpc } from "@/app/_trpc/client";
import { useAppSelector } from "@/store";
import { Stack } from "@mui/material";
import { RoomList } from "../room/RoomList";
import { RecentChats } from "../room/RecentRooms";
import { SearchBar } from "../chat/SearchBar";
import { RoomItemContextMenu } from "../room/RoomItemContextMenu";
import { useState } from "react";
import { Room } from "@prisma/client";

export const SideBar = () => {
  const { query } = useAppSelector((state) => state.chatRoom);

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    data?: Room;
  } | null>(null);

  const handleClose = () => {
    setContextMenu(null);
  };

  const filteredRooms = trpc.chatRoom.searchRoom.useQuery(query);
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
        <RecentChats
          data={filteredRooms.data}
          setContextMenu={setContextMenu}
        />
        <RoomList setContextMenu={setContextMenu} />

        <RoomItemContextMenu
          handleClose={handleClose}
          contextMenu={contextMenu}
        />
      </Stack>
    </>
  );
};
