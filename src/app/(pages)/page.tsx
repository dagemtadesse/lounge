import { AuthGuard } from "@/app/_components/AuthGuard";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <AuthGuard require="loggedIn">
      <Box></Box>
    </AuthGuard>
  );
}
