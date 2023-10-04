import { Button, Skeleton, Stack } from "@mui/material";

export const ContactItem = () => {
  return <></>;
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
