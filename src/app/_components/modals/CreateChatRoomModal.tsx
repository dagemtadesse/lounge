"use client";

import { trpc } from "@/app/_trpc/client";
import { useAppDispatch, useAppSelector } from "@/store";
import { closeModal } from "@/store/reducers/modals";
import {
  Avatar,
  Box,
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
import EmojiPicker from "emoji-picker-react";
import { useFormik } from "formik";
import { useState } from "react";

export const CreateChatRoomModal = () => {
  const modalId = CreateChatRoomModal.name;

  const dispatch = useAppDispatch();
  const { activeModalId } = useAppSelector((state) => state.modals);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "emoji-popover" : undefined;

  const createRoom = trpc.chatRoom.createChatRoom.useMutation();

  const onCloseModal = () => dispatch(closeModal());

  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    onSubmit: async (values) => {
      try {
        await createRoom.mutateAsync(values);
        closeModal();
      } catch (error) {}
    },
    initialValues: {
      emojiIcon: "",
      name: "",
      isPublic: false,
      handle: undefined,
    },
  });

  return (
    <Modal open={modalId == activeModalId} onClose={onCloseModal}>
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
                      value={values.isPublic}
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
                    bgcolor: Boolean(values.emojiIcon)
                      ? "transparent"
                      : "grey.300",
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
                  helperText={touched.name ? errors.name : ""}
                  error={Boolean(errors.name)}
                  margin="dense"
                />

                <Collapse in={values.isPublic}>
                  <TextField
                    fullWidth
                    label="Handle"
                    name="handle"
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  onEmojiClick={(emoji) =>
                    setFieldValue("emojiIcon", emoji.emoji)
                  }
                ></EmojiPicker>
              </Popover>
            </Stack>

            <Stack direction="row" justifyContent={"end"}>
              <Button color="secondary" onClick={onCloseModal}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Modal>
  );
};
