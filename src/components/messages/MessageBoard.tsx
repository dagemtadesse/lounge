import { trpc } from "@/app/_trpc/client";
import { Stack } from "@mui/material";
import { Message, Room } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { Bubble, BubbleSkeleton } from "./Bubble";
import { BubbleContextMenu } from "./BubbleContextMenu";

export const MessageBoard = ({ room }: { room: Room | undefined | null }) => {
  const container = useRef<HTMLDivElement>(null);

  const { data: messages } = trpc.messages.getByRoomId.useQuery(
    room?.id as any,
    {
      enabled: !!room,
    }
  );

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    data: Message;
  } | null>(null);

  const handleClose = () => {
    setContextMenu(null);
  };

  useEffect(() => {
    if (container.current)
      container.current.scrollTo({ top: container.current.scrollHeight });
  }, []);

  return (
    <>
      <Stack
        sx={{
          flexGrow: 1,
          overflow: "scroll",
          height: "auto",
          justifyContent: 'end'
        }}
        ref={container}
      >
        <Stack
          gap={4}
          sx={{
            px: 3,
            py: 2,
            width: "100%",
          }}
        >
          {!messages
            ? Array(10)
                .fill(0)
                .map((item, index) => (
                  <BubbleSkeleton
                    fromOthers={index % 2 == 0}
                    key={`message-bubble-${index}`}
                  />
                ))
            : messages?.map((message, index) => (
                <Bubble
                  key={message.id}
                  message={message}
                  setContextMenu={setContextMenu}
                  nextMessageAuthrorId={messages?.[index + 1]?.authorId}
                />
              ))}
        </Stack>
      </Stack>
      <BubbleContextMenu handleClose={handleClose} contextMenu={contextMenu} />
    </>
  );
};
