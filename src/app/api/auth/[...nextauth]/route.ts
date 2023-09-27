import { caller } from "@/server/router";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (!credentials) return null;

        try {
          return await caller.auth.login({
            email: credentials.email,
            password: credentials.password,
          });
        } catch (error) {
          throw new Error(
            error instanceof TRPCError ? error.message : "Something went wrong."
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV == "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
