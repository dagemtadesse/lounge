import { caller } from "@/server/router";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
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

        const user = await caller.auth.login({
          email: credentials.email,
          password: credentials.password,
        });

        return user ?? null;
      },
    }),
    CredentialsProvider({
      id: "signin-credentials",
      credentials: {
        email: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
        confirmPassword: { label: "password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (!credentials) return null;

        const user = await caller.auth.register({
          email: credentials.email,
          password: credentials.password,
          confirmPassword: credentials.confirmPassword,
        });

        return user ?? null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV == "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
