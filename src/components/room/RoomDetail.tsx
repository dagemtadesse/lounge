import {
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "@/store";
import { setRoomDetail } from "@/store/reducers/app";
import { useDispatch } from "react-redux";
import { blue } from "@mui/material/colors";

export const RoomDetails = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { roomDetail } = useAppSelector((state) => state.app);

  const handleClose = () => dispatch(setRoomDetail(undefined));
  const isOpened = !!roomDetail;

  return (
    <Box
      sx={{
        flexShrink: 0,
        borderLeft: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create(["left", "width"]),
        bgcolor: "background.paper",
        position: { xs: "absolute", lg: "static" },
        width: { xs: "100%", lg: isOpened ? "25vw" : 0 },
        top: 0,
        left: isOpened ? 0 : "100%",
        bottom: 0,
        zIndex: 200,
      }}
    >
      <Box
        sx={{
          position: "relative",
          marginRight: isOpened ? 0 : -500,
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
        <Box sx={{ bgcolor: "background.default", height: 100 }}></Box>
      </Box>
    </Box>
  );
};
