import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";

export const RoomItemContextMenu = ({
  contextMenu,
  handleClose,
}: {
  contextMenu: {
    mouseX: number;
    mouseY: number;
  } | null;
  handleClose: () => void;
}) => {
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
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ReplyIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Mark all as Read</Typography>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Clear History</Typography>
      </MenuItem>
      <MenuItem onClick={handleClose} color="">
        <ListItemIcon>
          <DeleteIcon fontSize="small" color="error" />
        </ListItemIcon>
        <Typography variant="body2" color="error.main">
          Delete Chat
        </Typography>
      </MenuItem>
    </Menu>
  );
};
