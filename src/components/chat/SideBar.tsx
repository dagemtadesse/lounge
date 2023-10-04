"use client";

import { trpc } from "@/app/_trpc/client";
import { useAppSelector } from "@/store";
import { Box, Stack } from "@mui/material";
import { red } from "@mui/material/colors";
import { Contacts } from "../contacts/Contacts";
import { RecentChats } from "./Rooms";
import { SearchBar } from "./SearchBar";

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
        gap={3}
        sx={{
          width: '100%',
          flexGrow: 1, 
          overflow: "scroll",
        }}
      >
        <RecentChats data={filteredRooms.data} />
        <Contacts />
      </Stack>
    </Stack>
  );
};
