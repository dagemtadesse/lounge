import { PrismaClient } from "@prisma/client";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const prisma = new PrismaClient();

export const createContext = async (ops: FetchCreateContextFnOptions) => {
  return { prisma };
};
