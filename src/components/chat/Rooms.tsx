"use client";

import {
  Stack,
  Typography,
  Button,
  Avatar,
  Collapse,
  Skeleton,
} from "@mui/material";
import { Room } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const RecentChats = ({ data }: { data?: Room[] }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Stack gap={1}>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="bottom"
        px={1.5}
      >
        <Button
          sx={{ px: 2 }}
          onClick={() => setIsExpanded((val) => !val)}
          color="secondary"
        >
          <Typography variant="subtitle2">Recent Chats</Typography>
        </Button>
      </Stack>
      <Collapse in={isExpanded}>
        <Stack
          direction={"row"}
          gap={2}
          sx={{
            width: "100%",
            bgcolor: "rgba(255,255,255,0.05)",
            px: 1.5,
            py: 2,
          }}
          flexWrap={"wrap"}
        >
          {data?.map((room, index) => (
            <ChatRoomButton key={`Rooms_` + index} room={room} />
            // <ChatRoomButtonSkeleton key={`Rooms_` + index} />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export const ChatRoomButton = ({ room }: { room: Room }) => {
  const router = useRouter();
  const path = usePathname();

  return (
    <Button
      color="secondary"
      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      onClick={() => router.push(`${path}?roomId=${room.id}`)}
    >
      <Avatar
        sx={{
          height: 56,
          width: 56,
          fontSize: Boolean(room.emojiIcon) ? "56px" : "32px",
          bgcolor: Boolean(room.emojiIcon) ? "transparent" : "grey.300",
        }}
      >
        {room.emojiIcon || room.name[0].toUpperCase()}
      </Avatar>
      <Typography
        variant="body2"
        component={"p"}
        sx={{
          textOverflow: "ellipsis",
          textTransform: "none",
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {room.name}
      </Typography>
    </Button>
  );
};

export const ChatRoomButtonSkeleton = () => {
  return (
    <Button
      color="secondary"
      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Skeleton variant="circular" width={56} height={56} />
      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
    </Button>
  );
};
