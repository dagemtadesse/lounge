import "../styles/globals.css";
import type { Metadata } from "next";
import { CustomProvider } from "@/components/Theme";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Lounge",
  description: "Chat Room",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  );
}
