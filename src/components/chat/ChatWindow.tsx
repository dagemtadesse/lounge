import { trpc } from "@/app/_trpc/client";
import { Button, Container, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { MessageBoard } from "../messages/MessageBoard";
import { MessageForm } from "../messages/MessageForm";
import { RoomWithMembers } from "../room/RecentRooms";
import { ChatWindowToolbar } from "./ChatWindowToolbar";

export const ChatWindow = ({
  room,
}: {
  room: RoomWithMembers | undefined | null;
}) => {
  const params = useSearchParams();

  const joinChatroom = trpc.chatRoom.join.useMutation();

  return (
    <Stack
      sx={{
        height: "100%",
        flexGrow: 1,
      }}
    >
      <ChatWindowToolbar room={room} />
      <Container
        sx={{
          flexGrow: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <MessageBoard room={room} />
        {!Boolean(room?.memberships.length) ? (
          <Stack p={1}>
            <Button
              variant="contained"
              onClick={() => joinChatroom.mutate(room?.id!)}
            >
              Join
            </Button>
          </Stack>
        ) : (
          <MessageForm room={room!} />
        )}
      </Container>
    </Stack>
  );
};
