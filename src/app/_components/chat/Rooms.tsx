"use client";

import {
  Stack,
  Typography,
  Button,
  Avatar,
  Collapse,
  Skeleton,
} from "@mui/material";
import { useState } from "react";

export const Rooms = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const chatRooms = "abcdef".split("");

  return (
    <Stack gap={1}>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="bottom"
        px={1.5}
      >
        <Typography variant="subtitle2">Chat Rooms</Typography>
        <Button
          color="secondary"
          size="small"
          onClick={() => setIsExpanded((val) => !val)}
        >
          <Typography
            variant="body2"
            sx={{ textTransform: "none" }}
            color="grey.500"
          >
            {isExpanded ? "Hide" : "Show"}
          </Typography>
        </Button>
      </Stack>
      <Collapse in={isExpanded}>
        <Stack
          direction={"row"}
          gap={2}
          sx={{ width: "100%" }}
          flexWrap={"wrap"}
          px={1.5}
        >
          {chatRooms.map((room, index) => (
            // <ChatRoomButton key={`Rooms_` + index} room={room} />
            <ChatRoomButtonSkeleton key={`Rooms_` + index} />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export const ChatRoomButton = ({ room }: { room: string }) => {
  return (
    <Button
      color="secondary"
      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Avatar sx={{ height: 56, aspectRatio: 1, width: 56 }}>
        {room.toUpperCase()}
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
        Chat Room #1
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