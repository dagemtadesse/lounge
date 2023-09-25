import { initTRPC } from "@trpc/server";
import { isAuthed } from "./router/authentication";
import { createContext, prisma } from "./context";
import { appRouter } from "./router";

export const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

export const protectedProcedure = t.procedure.use(isAuthed);

export const caller = appRouter.createCaller({ prisma });
