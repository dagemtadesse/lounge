import { Avatar } from "@mui/material";
import { Room, User } from "@prisma/client";

export const CustomAvatar = ({
  size,
  room,
  user,
}: {
  size: number;
  room?: Room;
  user?: User;
}) => {
  const letterIcon = room?.name?.[0] ?? user?.email?.[0];
  const emojiIcon = room?.emojiIcon;

  const id = room?.id || user?.id;

  console.log(letterIcon, emojiIcon)

  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        fontSize: emojiIcon ? size : size * 0.6,
        background: emojiIcon ? "transparent" : "grey.100",
      }}
    >
      {emojiIcon || letterIcon}
    </Avatar>
  );
};
