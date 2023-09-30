import { ChatRoomSchema } from "@/validations/chatRoomSchema";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const chatRoomRouter = router({
  createChatRoom: protectedProcedure
    .input(ChatRoomSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session!.userId;
        const room = await ctx.prisma.room.create({
          data: { ...input, createdById: userId },
        });

        return room;
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Handle already taken.",
          });
        }

        throw e;
      }
    }),
});
