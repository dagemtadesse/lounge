"use client";

import { trpc } from "@/app/_trpc/client";
import { useAppSelector } from "@/store";
import { Stack } from "@mui/material";
import { RoomList } from "../room/RoomList";
import { RecentChats } from "../room/RecentRooms";
import { SearchBar } from "../chat/SearchBar";
import zIndex from "@mui/material/styles/zIndex";

export const SideBar = () => {
  const { query } = useAppSelector((state) => state.chatRoom);

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
        <RecentChats data={filteredRooms.data} />
        <RoomList />
      </Stack>
    </>
  );
};
