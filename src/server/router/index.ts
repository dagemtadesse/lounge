import { router } from "../trpc";
import { authRouter } from "./authentication";

export const appRouter = router({
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
