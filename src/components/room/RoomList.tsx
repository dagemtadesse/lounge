"use client";

import { trpc } from "@/app/_trpc/client";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Room } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { RoomItem, RoomItemSkeleton } from "./RoomItem";

function a11yProps(index: number) {
  return {
    id: `contact-tab-${index}`,
    "aria-controls": `contact-tabpanel-${index}`,
  };
}

export const RoomList = ({
  setContextMenu,
}: {
  setContextMenu: Dispatch<
    SetStateAction<{ mouseX: number; mouseY: number; data?: Room } | null>
  >;
}) => {
  const [value, setValue] = useState(0);
  const contacts = Array(25).fill(5);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data: myRooms } = trpc.chatRoom.getMyRooms.useQuery({
    isPersonal: value == 0,
  });

  return (
    <Stack>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          position: "sticky",
          top: 0,
          bgcolor: "background.default",
          zIndex: 100,
          px: 1.5,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={<Typography variant="subtitle2">Direct messages</Typography>}
            {...a11yProps(0)}
          />
          <Tab
            label={<Typography variant="subtitle2">Chat rooms</Typography>}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      <Stack>
        {Boolean(myRooms)
          ? myRooms?.map((room, index) => (
              <RoomItem
                room={room}
                key={room.id}
                unreadMessages={room._count.messages}
                setContextMenu={setContextMenu}
                altName={
                  room.memberships[0]?.user?.name ??
                  room.memberships[0]?.user?.email
                }
              />
            ))
          : contacts.map((_, index) => (
              <RoomItemSkeleton key={`contact-` + index} />
            ))}
      </Stack>
    </Stack>
  );
};
