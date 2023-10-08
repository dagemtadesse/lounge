import { formatDate } from "@/utils/date";
import {
  alpha,
  Avatar,
  Box,
  Paper,
  Skeleton,
  Stack,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { Message, User } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";

type MessageWithAuthor = (Message & { author: User | null }) | null;

export const Bubble = ({
  message,
  nextMessageAuthrorId,
  setContextMenu,
}: {
  message: Message & { author: User | null; parentMessage: MessageWithAuthor };
  nextMessageAuthrorId?: string | null;
  setContextMenu: Dispatch<
    SetStateAction<{
      mouseX: number;
      mouseY: number;
      data: any;
    } | null>
  >;
}) => {
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu((contextMenu) =>
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
            data: message,
          }
        : null
    );
  };

  const fromOthers = message.author != null;

  const borderRadius: SxProps = { borderRadius: 6 };

  if (fromOthers) borderRadius.borderBottomLeftRadius = 8;
  else borderRadius.borderBottomRightRadius = 8;

  const theme = useTheme();
  const bgcolor = fromOthers ? "#434243" : alpha(theme.palette.primary.main, 1);

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

  //
  return (
    <Stack sx={{}}>
      <Stack
        direction={fromOthers ? "row" : "row-reverse"}
        gap={1}
        alignItems={"end"}
        sx={{ cursor: "pointer" }}
      >
        {fromOthers && nextMessageAuthrorId != message.authorId && (
          <Box sx={{ position: "relative", zIndex: 110 }}>
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </Box>
        )}

        <Box
          sx={{
            width: "auto",
            maxWidth: { xs: "90%", md: "75", lg: "60%" },
            position: "relative",
            ml:
              nextMessageAuthrorId == message.authorId && fromOthers
                ? "40px"
                : 0,
          }}
        >
          <Stack
            sx={{
              bgcolor,
              color: fromOthers ? "white" : "black",
              position: "relative",
              py: 1,
              px: 2,
              zIndex: 100,
              ...borderRadius,
            }}
            gap={1}
            alignItems={"start"}
            onContextMenu={handleContextMenu}
          >
            {message.parentMessage && (
              <ReplyBanner
                message={message.parentMessage}
                fromOther={fromOthers}
              />
            )}
            <Typography variant="body2">{message.content}</Typography>

            {fromOthers && nextMessageAuthrorId != message.authorId && tail}
          </Stack>
          <Typography
            variant="caption"
            component="div"
            mt={1}
            sx={{
              color: "grey.500",
              position: "absolute",
              whiteSpace: "nowrap",
              right: fromOthers ? "auto" : "0",
            }}
          >
            {formatDate(message.updatedAt)}
            {message.isEdited && " (Edited)"}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export const ReplyBanner = ({
  message,
  fromOther,
}: {
  message: Message & { author: User | null };
  fromOther: boolean;
}) => {
  return (
    <Stack
      sx={{
        borderLeft: 3,
        borderColor: fromOther ? "white" : "black",
        width: "100%",
        px: 1,
        py: 0.5,
      }}
      gap={1}
    >
      <Typography
        variant="subtitle2"
        sx={{
          lineHeight: 1,
          fontWeight: "medium",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {message?.author?.email}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          lineHeight: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {message?.content}
      </Typography>
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
