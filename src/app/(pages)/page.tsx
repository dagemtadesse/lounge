import { AuthGuard } from "@/components/AuthGuard";
import { Box } from "@mui/material";
import { SideBar } from "@/components/chat/SideBar";
import { CreateChatRoomModal } from "@/components/modals/CreateChatRoomModal";

export default function Home() {
  return (
    <AuthGuard require="loggedIn">
      <Box>
        <SideBar></SideBar>
      </Box>
      <CreateChatRoomModal />
    </AuthGuard>
  );
}
