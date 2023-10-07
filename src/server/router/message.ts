import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { eventEmitter, protectedProcedure, router } from "../trpc";

export const messageRouter = router({
  create: protectedProcedure
    .input(z.object({ content: z.string(), roomId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session!.userId;
      const { content, roomId } = input;

      const message = await ctx.prisma.message.create({
        data: {
          authorId,
          content,
          roomId,
          messageStatus: { create: [{ viewed: true, userId: authorId }] },
        },
      });

      await ctx.prisma.room.update({
        where: { id: roomId },
        data: { updatedAt: new Date() },
      });

      eventEmitter.emit(roomId, message);

      return message;
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

  delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const userId = ctx.session!.userId;

    const deletedMessage = await ctx.prisma.message.delete({
      where: {
        authorId: userId,
        id: input,
      },
    });

    return deletedMessage;
  }),

  // new: protectedProcedure
  //   .input(z.string())
  //   .subscription(({ ctx, input: roomId }) => {
  //     return observable<Message>((emit) => {
  //       const onAdd = (data: Message) => {
  //         emit.next(data);
  //       };

  //       eventEmitter.on(roomId, onAdd);

  //       return () => {
  //         eventEmitter.off(roomId, onAdd);
  //       };
  //     });
  //   }),
});
