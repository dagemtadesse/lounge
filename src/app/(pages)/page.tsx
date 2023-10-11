"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { Paper, Slide, Stack, useMediaQuery, useTheme } from "@mui/material";
import { SideBar } from "@/components/layout/SideBar";
import { CreateChatRoomModal } from "@/components/modals/CreateChatRoomModal";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ContactsModal } from "@/components/contact/ContactModal";
import { useSearchParams } from "next/navigation";
import { RoomDetails } from "@/components/room/RoomDetail";

export default function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const params = useSearchParams();
  const roomId = params.get("roomId");

  const open = !roomId || matches;

  return (
    <AuthGuard require="loggedIn">
      <Stack
        sx={{ flexGrow: 1, position: "relative", overflow: "hidden" }}
        direction="row"
      >
        <Slide in={open} direction="right">
          <Stack
            sx={{
              overflow: "hidden",
              height: "100%",
              width: { xs: "100vw", sm: "calc(100vw * 2 / 5)", md: 384 },
              position: { xs: "absolute", sm: "relative" },
              bgcolor: "background.paper",
              zIndex: 150,
              flexShrink: 0,
            }}
          >
            <SideBar />
          </Stack>
        </Slide>

        <Stack
          direction={"row"}
          sx={{
            p: 0,
            height: "100%",
            flexGrow: 1,
            overflow: "hidden",
            bgcolor: "background.default",
            position: "relative"
          }}
        >
          <ChatWindow />
          <RoomDetails />
        </Stack>
      </Stack>

      <CreateChatRoomModal />
      <ContactsModal />
    </AuthGuard>
  );
}
