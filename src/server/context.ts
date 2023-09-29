import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth";

export const prisma = new PrismaClient();

export const createContext = async (ops: FetchCreateContextFnOptions) => {
  const session = await getServerSession(authOptions);
  return { prisma, session };
};
