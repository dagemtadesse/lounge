import { useFormik } from "formik";
import {
  Box,
  IconButton,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Room } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { useAppDispatch, useAppSelector } from "@/store";
import { setActiveMessage } from "@/store/reducers/chatRoom";
import { relative } from "path";

export const MessageForm = ({ room }: { room: Room }) => {
  const { mutateAsync } = trpc.messages.create.useMutation();

  const { handleChange, handleSubmit, handleReset, values } = useFormik({
    initialValues: { message: "" },
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutateAsync({ roomId: room!.id, content: values.message });
        resetForm();
      } catch (err) {}
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" gap={2} sx={{ py: 1 }} alignItems="end">
        <Stack
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            overflow: "hidden",
            position: "relative",
            borderRadius: 3,
            gap: 1,
          }}
        >
          <ActiveMessagePaper />

          <Paper
            sx={{
              bgcolor: "background.default",
              p: 1.5,
              zIndex: 120,
              position: "relative",
            }}
            elevation={0}
          >
            <TextField
              fullWidth
              multiline
              margin="none"
              placeholder="Write a message..."
              size="small"
              name={"message"}
              onChange={handleChange}
              value={values.message}
            />
          </Paper>
        </Stack>
        <IconButton
          type="submit"
          sx={{ bgcolor: "background.default", p: 1.5 }}
        >
          <SendRoundedIcon color="primary" />
        </IconButton>
      </Stack>
    </form>
  );
};

export const ActiveMessagePaper = () => {
  const dispatch = useAppDispatch();

  const { activeMessage } = useAppSelector((state) => state.chatRoom);

  const remove = () => {
    dispatch(setActiveMessage(undefined));
  };

  return (
    <Slide
      direction="up"
      in={Boolean(activeMessage)}
      mountOnEnter
      unmountOnExit
    >
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          p: 1.5,
          pb: 0,
        }}
        alignItems={"center"}
        gap={1}
      >
        {activeMessage?.action == "reply" && <ReplyIcon color="primary" />}
        {activeMessage?.action == "edit" && (
          <EditOutlinedIcon color="primary" />
        )}

        <Stack
          sx={{
            borderLeft: 2,
            borderColor: "primary.main",
            p: 0.5,
            pl: 2,
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {activeMessage?.action == "reply"
              ? activeMessage?.data.content
              : "Edit Message"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              mt: 0.25,
            }}
          >
            {activeMessage?.data.content}
          </Typography>
        </Stack>

        <IconButton onClick={remove} sx={{ ml: "auto" }}>
          <CloseOutlinedIcon />
        </IconButton>
      </Stack>
    </Slide>
  );
};
