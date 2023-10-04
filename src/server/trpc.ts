import { initTRPC, TRPCError } from "@trpc/server";
import { EventEmitter } from "stream";
import superjson from "superjson";
import { createContext } from "./context";

export const eventEmitter = new EventEmitter();

export const t = initTRPC
  .context<typeof createContext>()
  .create({ transformer: superjson });

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
