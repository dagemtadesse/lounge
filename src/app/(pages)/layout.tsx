import "../../styles/globals.css";
import type { Metadata } from "next";
import { CustomThemeProvider } from "@/app/_components/Theme";

import { getServerSession } from "next-auth";
import SessionProvider from "@/app/_components/SessionProvider";
import TRPCProvider from "../_trpc/Provider";
import { Header } from "../_components/Header";
import { Stack } from "@mui/material";

export const metadata: Metadata = {
  title: "Lounge",
  description: "Chat Room",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <TRPCProvider>
            <CustomThemeProvider>
              <Stack direction={{ xs: "column", md: "row" }}>
                <Header />
                {children}
              </Stack>
            </CustomThemeProvider>
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
