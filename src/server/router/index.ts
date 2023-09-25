import { prisma } from "../context";
import { router } from "../trpc";
import { authRouter } from "./authentication";

export const appRouter = router({
  auth: authRouter,
});

export type AppRouter = typeof appRouter;

export const caller = appRouter.createCaller({ prisma });
