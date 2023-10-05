import { prisma } from "../db";
import { router } from "../trpc";
import { authRouter } from "./authentication";
import { chatRoomRouter } from "./chatRoom";
import { messageRouter } from "./message";
import { useRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  chatRoom: chatRoomRouter,
  messages: messageRouter,
  users: useRouter,
});

export type AppRouter = typeof appRouter;

export const caller = appRouter.createCaller({ prisma, session: null });
