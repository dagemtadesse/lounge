import { initTRPC, TRPCError } from "@trpc/server";
import { createContext } from "./context";

export const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

export const isAuthed = middleware(({ next, ctx }) => {
  if (ctx.session == null || !ctx.session.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next();
});

export const protectedProcedure = t.procedure.use(isAuthed);
