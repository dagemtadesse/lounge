import "../styles/globals.css";
import type { Metadata } from "next";
import { CustomProvider } from "@/components/Theme";

import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

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
          <CustomProvider>{children}</CustomProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
