import { trpc } from "@/app/_trpc/client";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Room, User } from "@prisma/client";
import RemoveIcon from "@mui/icons-material/Remove";
import { Fragment, useContext, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { confirmationContext } from "../modals/ConfirmationDialog";

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
                <RoomMemberItem member={user} room={room} key={user.id} />
              ))}
            </Fragment>
          ))}
      </List>
    </Box>
  );
};

export const RoomMemberItem = ({
  member,
  room,
}: {
  member: User;
  room: Room;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const utils = trpc.useContext();

  const { mutateAsync: removeUser } = trpc.members.remove.useMutation({
    onSuccess: () => {
      utils.chatRoom.members.invalidate();
    },
  });

  const confirmationCtx = useContext(confirmationContext);

  const handleRemoveMember = async () => {
    handleClose();
    confirmationCtx.openModal({
      title: "Remove member",
      actionName: "Remove",
      description: "Are you sure you want to remove the member form the chat?",
      callback: async () => {
        try {
          await removeUser({ memberId: member.id, roomId: room.id });
        } catch (error) {}
      },
    });
  };

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
        sx={{ ml: "auto" }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleRemoveMember}>
          <ListItemIcon>
            <RemoveIcon color="error" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2">Remove</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
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
