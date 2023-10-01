"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { Stack } from "@mui/material";
import { SideBar } from "@/components/chat/SideBar";
import { CreateChatRoomModal } from "@/components/modals/CreateChatRoomModal";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default function Home() {
  return (
    <AuthGuard require="loggedIn">
      <Stack sx={{ width: "100%" }} direction="row">
        <SideBar></SideBar>
        <ChatWindow />
      </Stack>
      <CreateChatRoomModal />
    </AuthGuard>
  );
}
