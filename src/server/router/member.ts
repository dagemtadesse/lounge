import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const memberRouter = router({
  remove: protectedProcedure
    .input(z.object({ roomId: z.string(), memberId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.userId;
      const room = ctx.prisma.room.findUnique({
        where: { createdById: userId, id: input.roomId },
      });

      if (!room) throw new TRPCError({ code: "PRECONDITION_FAILED" });

      return await ctx.prisma.roomMembership.delete({
        where: {
          roomId_userId: { userId: input.memberId, roomId: input.roomId },
        },
      });
    }),
});
