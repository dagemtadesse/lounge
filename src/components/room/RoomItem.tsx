import {
  Card,
  CardHeader,
  Avatar,
  Skeleton,
  Button,
  Typography,
  Stack,
  SxProps,
  Badge,
} from "@mui/material";
import { Message, Room } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

export const RoomItem = ({
  room,
  altName,
}: {
  room: Room & { messages: Message[] };
  altName: string | null;
}) => {
  const router = useRouter();
  const path = usePathname();

  const lastmessage = room.messages?.[0];

  const roomIcon = room.emojiIcon || room.name?.[0];

  let IconStyle: SxProps = {};

  if (room.emojiIcon) {
    IconStyle = { bgcolor: "transparent", fontSize: "40px" };
  }

  return (
    <Button
      sx={{ display: "block", textAlign: "start" }}
      color="secondary"
      onClick={() => router.push(`${path}?roomId=${room.id}`)}
    >
      <Stack
        direction={"row"}
        gap={2}
        alignItems="center"
        sx={{ overflow: "hidden", py: 1, px: 1.5 }}
      >
        <Avatar sx={IconStyle} aria-label="recipe">
          {roomIcon}
        </Avatar>

        <Stack
          alignItems={"start"}
          gap={0.5}
          sx={{ width: "100%", overflow: "hidden" }}
        >
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="body2">{room.name || altName}</Typography>
            {lastmessage && (
              <Typography variant="caption">
                {Intl.DateTimeFormat("en-US", {
                  dateStyle: undefined,
                  timeStyle: "short",
                }).format(lastmessage.createdAt)}
              </Typography>
            )}
          </Stack>
          {Boolean(lastmessage) && (
            <Stack
              direction="row"
              justifyContent={"space-between"}
              sx={{ width: "100%", gap: 1 }}
            >
              <Typography
                variant="caption"
                sx={{
                  flexGrow: 1,
                  color: "grey.500",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {lastmessage?.content}
              </Typography>
              <Badge
                badgeContent={400}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    position: "relative",
                    transform: "none",
                  },
                }}
              ></Badge>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Button>
  );
};

export const RoomItemSkeleton = () => {
  return (
    <Card
      sx={{
        bgcolor: "transparent",
        backgroundImage: "none",
        px: 1.5,
        py: 1,
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

// px: 1.5,
//           py: 1,
//           borderRadius: 0,
//           boxShadow: 0,
//           width: "100%",
//           bgcolor: "transparent",
//           overflow: 'hidden'
