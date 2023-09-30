import { prisma } from "../context";
import { router } from "../trpc";
import { authRouter } from "./authentication";
import { chatRoomRouter } from "./chatRoom";

export const appRouter = router({
  auth: authRouter,
  chatRoom: chatRoomRouter
});

export type AppRouter = typeof appRouter;

export const caller = appRouter.createCaller({ prisma, session: null });
