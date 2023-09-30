import { AuthGuard } from "@/app/_components/AuthGuard";
import { Box } from "@mui/material";
import { SideBar } from "../_components/chat/SideBar";

export default function Home() {
  return (
    <AuthGuard require="loggedIn">
      <Box>
        <SideBar></SideBar>
      </Box>
    </AuthGuard>
  );
}
