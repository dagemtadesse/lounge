import { caller } from "@/server/router";
import { TRPCError } from "@trpc/server";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
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
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) token.userId = user.id;
      return token;
    },
    session: ({ session, token }) => {
      if (token) session.userId = token.userId as any;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV == "development",
};
