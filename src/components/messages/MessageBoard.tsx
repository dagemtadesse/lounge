import { trpc } from "@/app/_trpc/client";
import { LastPage, Pages } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { Message, Room, User } from "@prisma/client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Bubble, BubbleSkeleton } from "./Bubble";
import { BubbleContextMenu } from "./BubbleContextMenu";

export const MessageBoard = ({ room }: { room: Room | undefined | null }) => {
  const container = useRef<HTMLDivElement>(null);

  const { data: messages, fetchNextPage: fetchNextMessage } =
    trpc.messages.getByRoomId.useInfiniteQuery(
      {
        roomId: room?.id as string,
      },
      {
        getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
        enabled: !!room,
      }
    );

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    data: Message & { author: User | null };
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
          overflow: "hidden",
          height: "auto",
          justifyContent: "end",
        }}
      >
        <Stack
          ref={container}
          gap={4}
          direction={"column-reverse"}
          sx={{
            px: 3,
            py: 4,
            width: "100%",
            overflowY: "scroll",
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
            : messages?.pages.map((page, index) => (
                <Fragment key={"message-page" + index}>
                  {page.items.map((message, msgIndex) => (
                    <Bubble
                      key={message.id}
                      message={message}
                      setContextMenu={setContextMenu}
                      nextMessageAuthrorId={page.items?.[index + 1]?.authorId}
                      lastItem={
                        msgIndex + 1 == page.items.length &&
                        index + 1 == messages.pages.length
                      }
                      fetcher={() => fetchNextMessage()}
                    />
                  ))}
                </Fragment>
              ))}
        </Stack>
      </Stack>
      <BubbleContextMenu handleClose={handleClose} contextMenu={contextMenu} />
    </>
  );
};
