"use client";

import { useAppSelector } from "@/store";
import {
  Stack,
  Typography,
  Button,
  Avatar,
  Collapse,
  Skeleton,
  Box,
} from "@mui/material";
import { Room, RoomMembership, User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type RoomWithMembers = Room & {
  memberships: (RoomMembership & { user: User })[];
};

export const RecentChats = ({
  data,
  setContextMenu,
}: {
  data?: RoomWithMembers[];
  setContextMenu: Dispatch<
    SetStateAction<{ mouseX: number; mouseY: number; data?: Room } | null>
  >;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { query } = useAppSelector((state) => state.chatRoom);

  useEffect(() => {
    setIsExpanded(query.trim() == "");
  }, [query]);
  
  return (
    <Stack
      sx={{
        px: 1.5,
        py: 1,
        alignItems: "start",
      }}
    >
      <Button sx={{ px: 2 }} onClick={() => setIsExpanded((val) => !val)}>
        <Typography variant="subtitle2">Recent Chats</Typography>
      </Button>

      <Collapse in={isExpanded} sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            py: 0.5,
            gap: 1,
            mt: 1,
          }}
        >
          {data?.map((room, index) => (
            <RecentChatButton
              room={room}
              key={room.id}
              setContextMenu={setContextMenu}
            />
          ))}
          {!data &&
            Array(6)
              .fill(0)
              .map((_, index) => (
                <RecentChatButtonSkeleton key={`recent-chatroom-${index}`} />
              ))}
        </Box>
      </Collapse>
    </Stack>
  );
};

export const RecentChatButton = ({
  room,
  setContextMenu,
}: {
  room: RoomWithMembers;
  setContextMenu: Dispatch<
    SetStateAction<{ mouseX: number; mouseY: number; data?: Room } | null>
  >;
}) => {
  const router = useRouter();
  const path = usePathname();

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu((contextMenu) =>
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
            data: room,
          }
        : null
    );
  };

  let recipient: User | undefined;
  if (room.isPersonal) recipient = room.memberships?.[0].user;

  return (
    <Button
      color="secondary"
      sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}
      onClick={() => router.push(`${path}?roomId=${room.id}`)}
      onContextMenu={handleContextMenu}
    >
      <Avatar
        sx={{
          height: 56,
          width: 56,
          fontSize: Boolean(room.emojiIcon) ? "56px" : "32px",
          bgcolor: Boolean(room.emojiIcon) ? "transparent" : "grey.300",
        }}
      >
        {room.emojiIcon || room.name[0]?.toUpperCase()}
      </Avatar>
      <Typography
        variant="caption"
        component={"p"}
        sx={{
          textOverflow: "ellipsis",
          textTransform: "none",
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {recipient ? recipient.email ?? "Chat Room" : room.name}
      </Typography>
    </Button>
  );
};

export const RecentChatButtonSkeleton = () => {
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
