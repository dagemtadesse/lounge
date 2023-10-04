import {
  Card,
  CardHeader,
  Avatar,
  Skeleton,
  Button,
  Typography,
  Stack,
  SxProps,
} from "@mui/material";
import { Message, Room } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

export const RoomItem = ({
  room,
}: {
  room: Room & { messages: Message[] };
}) => {
  const router = useRouter();
  const path = usePathname();

  const lastmessage = room.messages?.[0]?.content;

  const roomIcon = room.emojiIcon || room.name?.[0];

  let IconStyle: SxProps = {};

  if (room.emojiIcon) {
    IconStyle = { bgcolor: "transparent", fontSize: '40px' };
  }

  return (
    <Button
      sx={{ display: "block" }}
      color="secondary"
      onClick={() => router.push(`${path}?roomId=${room.id}`)}
    >
      <Card
        sx={{
          px: 1.5,
          py: 1,
          borderRadius: 0,
          boxShadow: 0,
          width: "100%",
          bgcolor: "transparent",
        }}
        elevation={0}
      >
        <Stack direction={"row"} gap={2} alignItems="center">
          <Avatar sx={IconStyle} aria-label="recipe">
            {roomIcon}
          </Avatar>
          <Stack alignItems={"start"} gap={0.5}>
            <Typography variant="body2">{room.name}</Typography>
            {Boolean(lastmessage) && (
              <Typography variant="body2" sx={{ color: "grey.500" }}>
                {lastmessage}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Card>
    </Button>
  );
};

export const RoomItemSkeleton = () => {
  return (
    <Card
      sx={{
        bgcolor: "transparent",
        backgroundImage: "none",
        p: 0,
        boxShadow: 0,
      }}
    >
      <CardHeader
        sx={{ px: 0, alignItems: "center", bgcolor: "transparent" }}
        avatar={
          <Skeleton variant="circular" sx={{ width: "40px", height: "40px" }} />
        }
        title={
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "90%" }} />
        }
        subheader={
          <Skeleton variant="text" sx={{ fontSize: "0.75rem", width: "50%" }} />
        }
      ></CardHeader>
    </Card>
  );
};
