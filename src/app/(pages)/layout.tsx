import "../../styles/globals.css";
import { Box, Stack } from "@mui/material";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { CustomThemeProvider } from "@/components/Theme";
import SessionProvider from "@/components/SessionProvider";
import TRPCProvider from "../_trpc/Provider";
import { Header } from "@/components/layout/Header";
import { ReduxProvider } from "@/store/Provider";
import { SnackbarProvider } from "@/components/modals/SnackbarProvider";
import { blue } from "@mui/material/colors";

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
            <ReduxProvider>
              <CustomThemeProvider>
                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  sx={{ position: "fixed", inset: 0 }}
                >
                  <Header />
                  {children}
                  <SnackbarProvider />
                </Stack>
              </CustomThemeProvider>
            </ReduxProvider>
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
