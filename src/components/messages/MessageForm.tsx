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
import { useEffect } from "react";

export const MessageForm = ({ room }: { room: Room }) => {
  const utils = trpc.useContext();

  const { mutateAsync } = trpc.messages.create.useMutation();
  const { mutateAsync: editMessage } = trpc.messages.edit.useMutation({
    onSuccess: () => {
      utils.messages.getByRoomId.invalidate();
    },
  });

  const { mutateAsync: reply } = trpc.messages.reply.useMutation({
    onSuccess: () => {
      utils.messages.getByRoomId.invalidate();
    },
  });

  const dispatch = useAppDispatch();
  const { activeMessage } = useAppSelector((state) => state.chatRoom);

  const handleClose = () => {
    dispatch(setActiveMessage(undefined));
  };

  const { handleChange, handleSubmit, values, setValues } = useFormik({
    initialValues: { message: "" },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (activeMessage) {
          if (activeMessage.action == "edit") {
            await editMessage({
              id: activeMessage.data.id,
              content: values.message,
            });
          } else if (activeMessage.action == "reply") {
            await reply({
              content: values.message,
              roomId: room.id,
              parentId: activeMessage.data.id,
            });
          }
        } else {
          await mutateAsync({ roomId: room!.id, content: values.message });
        }
        resetForm();
        handleClose();
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (activeMessage && activeMessage.action == "edit") {
      setValues({ message: activeMessage.data.content });
    }
  }, [activeMessage, setValues]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" gap={2} sx={{ py: 1 }} alignItems="end">
        <Stack
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            overflow: "hidden",
            position: "relative",
            borderRadius: 3,
          }}
        >
          <ActiveMessagePaper />

          <Paper
            sx={{
              bgcolor: "background.paper",
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
          sx={{ bgcolor: "background.paper", p: 1.5 }}
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
              ? activeMessage?.data.author?.email || "You"
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
