import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import { Room } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { useContext } from "react";
import { confirmationContext } from "../modals/ConfirmationDialog";

export const RoomItemContextMenu = ({
  contextMenu,
  handleClose,
}: {
  contextMenu: {
    mouseX: number;
    mouseY: number;
    data?: Room;
  } | null;
  handleClose: () => void;
}) => {
  const utils = trpc.useContext();
  const confirmationCtx = useContext(confirmationContext);

  const { mutateAsync: clearHistory } = trpc.chatRoom.clear.useMutation();
  const { mutateAsync: deleteChat } = trpc.chatRoom.delete.useMutation();
  const { mutateAsync: markAllAsRead } =
    trpc.messages.markAllAsRead.useMutation();

  const onSuccess = () => {
    utils.messages.getByRoomId.invalidate();
    utils.chatRoom.getMyRooms.invalidate();
  };

  const handleClearHistory = () => {
    handleClose();
    confirmationCtx.openModal({
      title: "Clear chat history",
      actionName: "Clear history",
      description: "Are you sure you want to clear chat history?",
      callback: async () => {
        if (contextMenu?.data) {
          try {
            await clearHistory(contextMenu.data.id, { onSuccess });
          } catch (error) {}
        }
      },
    });
  };

  const handleDeleteChat = async () => {
    handleClose();
    confirmationCtx.openModal({
      title: "Delete chat",
      actionName: "Delete chat",
      description: "Are you sure you want to delete the chat?",
      callback: async () => {
        if (contextMenu?.data) {
          try {
            await deleteChat(contextMenu.data.id, { onSuccess });
          } catch (error) {}
        }
      },
    });
  };

  const handleMarkAllAsRead = async () => {
    if (contextMenu?.data) {
      try {
        await markAllAsRead(contextMenu.data.id, { onSuccess });
      } catch (error) {}
      handleClose();
    }
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
      PaperProps={{ sx: { width: 200, maxWidth: "90%" } }}
    >
      <MenuItem onClick={handleMarkAllAsRead}>
        <ListItemIcon>
          <VisibilityOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Mark all as Read</Typography>
      </MenuItem>
      <MenuItem onClick={handleClearHistory}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" color="error" />
        </ListItemIcon>
        <Typography variant="body2" color="error.main">
          Clear History
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleDeleteChat} color="">
        <ListItemIcon>
          <RemoveCircleOutlineIcon fontSize="small" color="error" />
        </ListItemIcon>
        <Typography variant="body2" color="error.main">
          Delete Chat
        </Typography>
      </MenuItem>
    </Menu>
  );
};
