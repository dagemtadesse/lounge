import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import { trpc } from "@/app/_trpc/client";
import { Message } from "@prisma/client";

export const BubbleContextMenu = ({
  contextMenu,
  handleClose,
}: {
  contextMenu: {
    mouseX: number;
    mouseY: number;
    data: Message;
  } | null;
  handleClose: () => void;
}) => {
  const utils = trpc.useContext();

  const { mutateAsync: deleteMessage } = trpc.messages.delete.useMutation({
    onSuccess: () => {
      utils.messages.invalidate();
    },
  });

  const handleDelete = async () => {
    if (contextMenu?.data) {
      try {
        await deleteMessage(contextMenu.data.id);
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
      PaperProps={{ sx: { width: 160, maxWidth: "90%" } }}
    >
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ReplyIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Reply</Typography>
      </MenuItem>
      <MenuItem onClick={handleClose}>
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
