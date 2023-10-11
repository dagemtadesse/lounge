import { trpc } from "@/app/_trpc/client";
import {
  Avatar,
  Box,
  IconButton,
  List,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Room, User } from "@prisma/client";
import RemoveIcon from "@mui/icons-material/Remove";
import { Fragment } from "react";

export const RoomMemberList = ({ room }: { room: Room }) => {
  const { data: members } = trpc.chatRoom.members.useInfiniteQuery(
    {
      roomId: room.id,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  console.log(members);
  return (
    <Box>
      {!members &&
        Array(7)
          .fill(0)
          .map((_, index) => (
            <RoomMemberItemSkeleton key={"room-memeber-list$" + index} />
          ))}
      <List sx={{ width: "100%" }}>
        {members &&
          members.pages.map((page, index) => (
            <Fragment key={"room-member" + index}>
              {page.items.map((user, index) => (
                <RoomMemberItem member={user} key={user.id} />
              ))}
            </Fragment>
          ))}
      </List>
    </Box>
  );
};

export const RoomMemberItem = ({ member }: { member: User }) => {
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      sx={{
        width: "100%",
        gap: 2,
        p: 1.5,
        borderRadius: 3,
        cursor: "pointer",
        ":hover": { bgcolor: "rgba(255,255,255,0.05)" },
      }}
    >
      <Avatar sx={{ width: 36, height: 36 }}></Avatar>

      <Typography variant="body2" sx={{ color: "grey.300" }}>
        {member.email}
      </Typography>
      <IconButton
        edge="end"
        aria-label="delete"
        color="error"
        sx={{ ml: "auto" }}
      >
        <RemoveIcon />
      </IconButton>
    </Stack>
  );
};

export const RoomMemberItemSkeleton = () => {
  return (
    <Stack
      sx={{ px: 2, py: 1.5, gap: 2, alignItems: "center" }}
      direction="row"
    >
      <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
      <Skeleton variant="text" sx={{ fontSize: "1em", width: "80%" }} />
    </Stack>
  );
};
