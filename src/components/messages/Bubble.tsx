import {
  Avatar,
  Box,
  Paper,
  Skeleton,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { Message, User } from "@prisma/client";

export const Bubble = ({
  message,
  nextMessageAuthrorId,
}: {
  message: Message & { author: User | null };
  nextMessageAuthrorId?: string | null;
}) => {
  const fromOthers = message.author != null;

  const borderRadius: SxProps = { borderRadius: 6 };

  if (fromOthers) borderRadius.borderBottomLeftRadius = 8;
  else borderRadius.borderBottomRightRadius = 8;

  const bgcolor = fromOthers ? "#434243" : "primary.main";

  const tail = (
    <Box
      sx={{
        position: "absolute",
        height: 20,
        width: 32,
        bgcolor,
        transform: "translateX(-50%)",
        left: 0,
        bottom: 0,
      }}
    >
      <Paper
        sx={{
          position: "aboslute",
          height: "100%",
          width: 16,
          borderRadius: 0,
          borderBottomRightRadius: "70%",
        }}
        elevation={0}
      ></Paper>
    </Box>
  );

  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent={fromOthers ? "start" : "end"}
      alignItems={"end"}
    >
      {fromOthers && nextMessageAuthrorId != message.authorId && (
        <Box sx={{ position: "relative", zIndex: 100 }}>
          <Avatar sx={{ width: 32, height: 32 }}></Avatar>
        </Box>
      )}
      <Stack
        sx={{
          width: "auto",
          maxWidth: { xs: "90%", md: "50%" },
          bgcolor,
          color: fromOthers ? "white" : "black",
          ml: nextMessageAuthrorId == message.authorId ? "40px" : 0,
          position: "relative",
          py: 1,
          px: 2,
          ...borderRadius,
        }}
        gap={1}
        alignItems={fromOthers ? "start" : "end"}
      >
        <Box sx={{ position: "relative", zIndex: 100 }}>
          <Typography variant="body2">{message.content}</Typography>
        </Box>

        {fromOthers && nextMessageAuthrorId != message.authorId && tail}
      </Stack>
    </Stack>
  );
};

export const BubbleSkeleton = ({ fromOthers }: { fromOthers?: boolean }) => {
  const messages = 2;

  const borderRadius: SxProps = { borderRadius: 6 };

  if (fromOthers) borderRadius.borderBottomLeftRadius = 8;
  else borderRadius.borderBottomRightRadius = 8;

  return (
    <Stack
      direction="row"
      gap={2}
      justifyContent={fromOthers ? "start" : "end"}
    >
      {fromOthers && (
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ alignSelf: "end" }}
        />
      )}
      <Stack
        sx={{ width: "100%", maxWidth: "50%" }}
        gap={1}
        alignItems={fromOthers ? "start" : "end"}
      >
        {Array(messages)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              variant="rounded"
              width={index % 2 == 0 ? "60%" : "80%"}
              height={40}
              key={"message-bubble" + index}
              sx={borderRadius}
            />
          ))}
      </Stack>
    </Stack>
  );
};
