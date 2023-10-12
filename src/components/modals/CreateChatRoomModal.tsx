"use client";

import { trpc } from "@/app/_trpc/client";
import { useAppDispatch, useAppSelector } from "@/store";
import { closeModal, setActiveRoom, setAlert } from "@/store/reducers/app";
import { ChatRoomSchema } from "@/validations/chatRoomSchema";
import {
  Avatar,
  Button,
  Collapse,
  FormControlLabel,
  FormGroup,
  IconButton,
  Modal,
  Paper,
  Popover,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Room } from "@prisma/client";
import EmojiPicker from "emoji-picker-react";
import { useFormik } from "formik";
import { useState } from "react";
import { util } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const CreateChatRoomModal = () => {
  const dispatch = useAppDispatch();

  const { activeRoom } = useAppSelector((state) => state.app);

  const onCloseModal = () => {
    dispatch(setActiveRoom(undefined));
  };

  return (
    <Modal
      open={activeRoom !== undefined}
      onClose={onCloseModal}
      keepMounted={false}
    >
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 600,
          p: 2,
        }}
      >
        <CreateChatRoomForm closeModal={onCloseModal} room={activeRoom!} />
      </Paper>
    </Modal>
  );
};

const CreateChatRoomForm = ({
  closeModal,
  room,
}: {
  closeModal: () => void;
  room: Room | undefined;
}) => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "emoji-popover" : undefined;

  const utils = trpc.useContext();

  const createRoom = trpc.chatRoom.createChatRoom.useMutation({
    onSuccess: () => {
      utils.chatRoom.recent.invalidate();
      utils.chatRoom.getMyRooms.invalidate();
      utils.chatRoom.getById.invalidate();
    },
  });
  const { mutateAsync: updateRoom } = trpc.chatRoom.update.useMutation();

  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    onSubmit: async (values, { setErrors }) => {
      try {
        if (room) {
          await updateRoom({
            ...values,
            id: room.id,
            handle: values.isPublic ? values.handle : undefined,
          });
        } else {
          await createRoom.mutateAsync({
            ...values,
            handle: values.isPublic ? values.handle : undefined,
          });
          dispatch(
            setAlert({
              message: "Successfuly created a chat room.",
              type: "success",
            })
          );
        }
        closeModal();
      } catch (error) {}
    },
    initialValues: {
      emojiIcon: room?.emojiIcon || "",
      name: room?.name || "",
      isPublic: room?.isPublic || false,
      handle: room?.handle || "",
    },
    validationSchema: toFormikValidationSchema(ChatRoomSchema),
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={3}>
        <Stack
          alignItems={"center"}
          justifyContent="space-between"
          direction={"row"}
        >
          <Typography variant="h5">Create Chat Room</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={values.isPublic}
                  name="isPublic"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              }
              label="Public"
            />
          </FormGroup>
        </Stack>

        <Stack gap={2.5} direction="row" alignItems="start">
          <IconButton onClick={handleClick} sx={{ m: 0 }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                fontSize: Boolean(values.emojiIcon) ? "56px" : "32px",
                bgcolor: Boolean(values.emojiIcon) ? "transparent" : "grey.300",
              }}
            >
              {values.emojiIcon || "C"}
            </Avatar>
          </IconButton>

          <Stack gap={2.5} sx={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              label="Chat room name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              helperText={touched.name ? errors.name : ""}
              error={Boolean(errors.name)}
              margin="dense"
            />

            <Collapse in={values.isPublic}>
              <TextField
                fullWidth
                label="Handle"
                name="handle"
                value={values.handle}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.handle ? errors.handle : ""}
                error={Boolean(errors.handle)}
                margin="dense"
              />
            </Collapse>
          </Stack>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <EmojiPicker
              onEmojiClick={(emoji) => setFieldValue("emojiIcon", emoji.emoji)}
            ></EmojiPicker>
          </Popover>
        </Stack>

        <Stack direction="row" justifyContent={"end"}>
          <Button color="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit">{room ? "Update" : "Create"}</Button>
        </Stack>
      </Stack>
    </form>
  );
};
