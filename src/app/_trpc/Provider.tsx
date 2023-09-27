"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./client";
import { httpBatchLink } from "@trpc/react-query";

let URL = "http://localhost:3000";
if (process.env.NEXT_PUBLIC_VERCEL_URL) URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export default function TRPCProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: `${URL}/api/trpc` })],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}