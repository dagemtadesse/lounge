"use client";

import { trpc } from "@/app/_trpc/client";
import { useAppSelector } from "@/store";
import { Box, Stack } from "@mui/material";
import { Contacts } from "./Contacts";
import { RecentChats } from "./Rooms";
import { SearchBar } from "./SearchBar";

export const SideBar = () => {
  const { query } = useAppSelector((state) => state.chatRoom);

  const filteredRooms = trpc.chatRoom.searchRoom.useQuery(query);

  return (
    <Box
      sx={{
        borderRight: 1,
        borderColor: "divider",
        width: { xs: "100%", md: "384px" },
        maxHeight: "100vh",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <Stack gap={3}>
        <SearchBar />
        <RecentChats data={filteredRooms.data}/>
        <Contacts />
      </Stack>
    </Box>
  );
};
