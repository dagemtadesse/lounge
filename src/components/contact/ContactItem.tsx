import { Avatar, Button, Skeleton, Stack, Typography } from "@mui/material";
import { User } from "@prisma/client";

export const ContactItem = ({
  user,
  onClick,
}: {
  user: User;
  onClick: () => void;
}) => {
  return (
    <Button
      sx={{ width: "100%", px: 3, py: 1.5 }}
      color="secondary"
      onClick={onClick}
    >
      <Stack direction="row" gap={2} width="100%">
        <Avatar></Avatar>
        <Stack flexGrow={1} sx={{ textAlign: "start" }} justifyContent="center">
          <Typography>{user.name}</Typography>
          <Typography variant="body2" color="grey.300">
            {user.email}
          </Typography>
        </Stack>
      </Stack>
    </Button>
  );
};

export const ContactItemSkeleton = () => {
  return (
    <Button sx={{ width: "100%", px: 3, py: 1.5 }} color="secondary">
      <Stack direction="row" gap={2} width="100%">
        <Skeleton variant="circular" sx={{ width: "40px", height: "40px" }} />
        <Stack flexGrow={1}>
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "90%" }} />
          <Skeleton variant="text" sx={{ fontSize: "0.5rem", width: "30%" }} />
        </Stack>
      </Stack>
    </Button>
  );
};
