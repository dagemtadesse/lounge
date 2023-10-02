import { Box, Stack } from "@mui/material";
import { Room } from "@prisma/client";
import { useEffect, useRef } from "react";
import { BubbleSkeleton } from "./Bubble";

export const MessageBoard = ({ room }: { room: Room | undefined | null }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current)
      container.current.scrollTo({ top: container.current.scrollHeight });
  }, []);

  return (
    <Stack
      sx={{
        flexGrow: 1,
        height: "100%",
        justifyContent: "end",
        overflow: "hidden",
      }}
    >
      <Stack
        gap={2}
        ref={container}
        sx={{
          px: 3,
          py: 2,
          width: "100%",
          minHeight: "auto",
          maxHeight: "100%",
          overflow: "scroll",
        }}
      >
        {Array(10)
          .fill(0)
          .map((item, index) => (
            <BubbleSkeleton
              fromOthers={index % 2 == 0}
              key={`message-bubble-${index}`}
            />
          ))}
      </Stack>
    </Stack>
  );
};
