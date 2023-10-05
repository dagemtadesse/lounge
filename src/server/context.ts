import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "./db";

export const createContext = async () => {
  const session = await getServerSession(authOptions);
  return { prisma, session };
};
