import {
  Box,
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
import { useState } from "react";
import { CustomAvatar } from "../CustomAvatar";
import { RoomWithMembers } from "./RecentRooms";

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
              <Stack
                direction="row"
                gap={1.5}
                alignItems="center"
                sx={{
                  background:
                    "linear-gradient(0deg,rgba(209,225,255,.08),rgba(209,225,255,.08)),#1f1f1f",
                  p: 2, borderRadius: 2.5
                }}
              >
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
