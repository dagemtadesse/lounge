import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import { trpc } from "@/app/_trpc/client";
import { Message, User } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/store";
import { setActiveMessage } from "@/store/reducers/chatRoom";
import { useContext } from "react";
import { confirmationContext } from "../modals/ConfirmationDialog";

export const BubbleContextMenu = ({
  contextMenu,
  handleClose,
}: {
  contextMenu: {
    mouseX: number;
    mouseY: number;
    data: Message & { author: User | null };
  } | null;
  handleClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const confirmationCtx = useContext(confirmationContext);

  const utils = trpc.useContext();

  const { mutateAsync: deleteMessage } = trpc.messages.delete.useMutation({
    onSuccess: () => {
      utils.messages.invalidate();
    },
  });

  const handleDelete = async () => {
    handleClose();
    confirmationCtx.openModal({
      title: "Delete",
      actionName: 'Delete message',
      description: "Are you sure you want to delete the message?",
      callback: async () => {
        if (!contextMenu?.data) return;
        try {
          await deleteMessage(contextMenu.data.id);
        } catch (error) {}
      },
    });
  };

  const handleEdit = () => {
    dispatch(setActiveMessage({ data: contextMenu!.data, action: "edit" }));
    handleClose();
  };

  const handleReply = () => {
    dispatch(setActiveMessage({ data: contextMenu!.data, action: "reply" }));
    handleClose();
  };

  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
      PaperProps={{ sx: { width: 160, maxWidth: "90%" } }}
    >
      <MenuItem onClick={handleReply}>
        <ListItemIcon>
          <ReplyIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Reply</Typography>
      </MenuItem>
      <MenuItem onClick={handleEdit}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Edit</Typography>
      </MenuItem>
      <MenuItem onClick={handleDelete} color="">
        <ListItemIcon>
          <DeleteIcon fontSize="small" color="error" />
        </ListItemIcon>
        <Typography variant="body2" color="error.main">
          Delete
        </Typography>
      </MenuItem>
    </Menu>
  );
};
