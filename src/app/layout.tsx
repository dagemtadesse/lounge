import "../styles/globals.css";
import type { Metadata } from "next";
import { CustomProvider } from "@/app/_components/Theme";

import { getServerSession } from "next-auth";
import SessionProvider from "@/app/_components/SessionProvider";
import TRPCProvider from "./_trpc/Provider";

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
            <CustomProvider>{children}</CustomProvider>
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
