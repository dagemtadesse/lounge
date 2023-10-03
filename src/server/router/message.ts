import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const messageRouter = router({
  create: protectedProcedure
    .input(z.object({ content: z.string(), roomId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session!.userId;
      const { content, roomId } = input;

      return await ctx.prisma.message.create({
        data: {
          authorId,
          content,
          roomId,
        },
      });
    }),

  getByRoomId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userId = ctx.session!.userId;

      return await ctx.prisma.message.findMany({
        where: { roomId: input },
        include: {
          author: {
            where: { NOT: { id: userId } },
          },
        },
      });
    }),
});
