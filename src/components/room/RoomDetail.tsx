import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "@/store";
import { setRoomDetail } from "@/store/reducers/app";
import { useDispatch } from "react-redux";
import { RoomMemberList } from "./RoomMemberList";
import { useContext, useState } from "react";
import { CustomAvatar } from "../CustomAvatar";
import { RoomWithMembers } from "./RecentRooms";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { confirmationContext } from "../modals/ConfirmationDialog";
import { trpc } from "@/app/_trpc/client";

export const RoomDetails = ({
  room,
}: {
  room: RoomWithMembers | undefined | null;
}) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const handleClose = () => dispatch(setRoomDetail(false));
  const { roomDetail: isOpened } = useAppSelector((state) => state.app);

  const [value, setValue] = useState(0);

  const roomDetail = room;
  let roomName: string | null | undefined = roomDetail?.name;
  if (roomDetail?.isPersonal)
    roomName = roomDetail.memberships?.[0].user?.email;

  const confirmationCtx = useContext(confirmationContext);
  const utils = trpc.useContext();

  const { mutateAsync: deleteRoom } = trpc.chatRoom.delete.useMutation({
    onSuccess: () => {
      utils.chatRoom.recent.invalidate();
    },
  });

  const handleDeleteRoom = async () => {
    confirmationCtx.openModal({
      title: "Delete Room",
      actionName: "Delete",
      description: "Are you sure you want to delete the chat room?",
      callback: async () => {
        try {
          if (room?.id) await deleteRoom(room.id);
        } catch (error) {}
      },
    });
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        borderLeft: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create(["left", "width"]),
        bgcolor: "background.paper",
        position: { xs: "absolute", lg: "static" },
        width: { xs: "100%", lg: isOpened ? "26vw" : 0 },
        top: 0,
        left: isOpened ? 0 : "100%",
        bottom: 0,
        zIndex: 200,
      }}
    >
      <Stack
        sx={{
          position: "relative",
          marginRight: isOpened ? 0 : -500,
          overflow: "hidden",
          height: "100%",
        }}
      >
        <Toolbar sx={{ px: { xs: 1 } }}>
          <Stack direction={"row"} alignItems="center" gap={2}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="subtitle1" fontWeight={"medium"}>
              Chat Room Info
            </Typography>
          </Stack>
        </Toolbar>

        <Box sx={{ overflow: "scroll", flexGrow: 1, px: 1 }}>
          {roomDetail && (
            <>
              <Box
                sx={{
                  background:
                    "linear-gradient(0deg,rgba(209,225,255,.08),rgba(209,225,255,.08)),#1f1f1f",
                  p: 2,
                  borderRadius: 2.5,
                }}
              >
                <Stack direction="row" gap={1.5} alignItems="center">
                  <CustomAvatar size={56} room={roomDetail} />
                  <Stack sx={{ mb: 0.25 }}>
                    <Typography
                      variant="body1"
                      sx={{ color: "grey.300" }}
                      fontWeight="medium"
                    >
                      {roomName}
                    </Typography>
                    {roomDetail?.handle && (
                      <Typography variant="body2" sx={{ color: "grey.500" }}>
                        @{roomDetail?.handle}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
                <Stack direction={"row"} gap={2.5} mt={2.5}>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 100 }}
                    startIcon={<EditIcon />}
                  >
                    Update
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 100 }}
                    startIcon={<DeleteOutlineIcon />}
                    color="error"
                    onClick={handleDeleteRoom}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>

              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  px: 1,
                  position: "sticky",
                  top: 0,
                }}
              >
                <Tabs value={value} aria-label="basic tabs example">
                  <Tab
                    label={<Typography variant="subtitle2">Members</Typography>}
                  />
                </Tabs>
              </Box>

              <RoomMemberList room={roomDetail} />
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
