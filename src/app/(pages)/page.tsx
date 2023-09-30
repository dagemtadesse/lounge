import { AuthGuard } from "@/app/_components/AuthGuard";
import { Box } from "@mui/material";
import { SideBar } from "../_components/chat/SideBar";
import { CreateChatRoomModal } from "../_components/modals/CreateChatRoomModal";

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
