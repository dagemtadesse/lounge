"use client";

import { trpc } from "@/app/_trpc/client";
import { useAppSelector } from "@/store";
import { Stack } from "@mui/material";
import { RoomList } from "../room/RoomList";
import { RecentChats } from "../room/RecentRooms";
import { SearchBar } from "../chat/SearchBar";

export const SideBar = () => {
  const { query } = useAppSelector((state) => state.chatRoom);

  const filteredRooms = trpc.chatRoom.searchRoom.useQuery(query);

  return (
    <Stack
      sx={{
        borderRight: 1,
        borderColor: "divider",
        width: { xs: "100%", md: "384px" },
        maxHeight: "100vh",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <SearchBar />
      <Stack
        sx={{
          width: "100%",
          flexGrow: 1,
          overflow: "scroll",
        }}
      >
        <RecentChats data={filteredRooms.data} />
        <RoomList />
      </Stack>
    </Stack>
  );
};
