import {
  Paper,
  Toolbar,
  Stack,
  Avatar,
  Typography,
  Skeleton,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Room } from "@prisma/client";
import { useAppDispatch } from "@/store";
import { setRoomDetail } from "@/store/reducers/app";

export function ChatWindowToolbar({ room }: { room?: Room | null }) {
  const dispatch = useAppDispatch();

  return (
    <Paper elevation={0} sx={{}}>
      <Toolbar variant="dense" sx={{ p: 1.5, px: 1 }}>
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
          sx={{ width: "100%" }}
        >
          <Stack direction={"row"} alignItems="center" gap={1.5}>
            {Boolean(room) ? (
              <>
                <Avatar
                  sx={{
                    fontSize: Boolean(room?.emojiIcon) ? 40 : 24,
                    background: Boolean(room?.emojiIcon)
                      ? "transparent"
                      : "grey.100",
                  }}
                >
                  {room?.emojiIcon || room?.name.at(0)}
                </Avatar>
                <Typography
                  variant="subtitle1"
                  ml={2}
                  onClick={() => dispatch(setRoomDetail(room!))}
                  sx={{ cursor: "pointer" }}
                >
                  {room?.name}
                </Typography>
              </>
            ) : (
              <>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={100}
                />
              </>
            )}
          </Stack>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </Paper>
  );
}
