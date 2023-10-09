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
    .input(
      z.object({
        cursor: z.object({ id: z.string(), createdAt: z.date() }).nullish(),
        roomId: z.string(),
        size: z.number().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session!.userId;
      const limit = input.size ?? 10;

      const dbCursor = input.cursor
        ? { createdAt: input.cursor.createdAt, id: input.cursor.id }
        : undefined;

      const items = await ctx.prisma.message.findMany({
        where: { roomId: input.roomId },
        take: limit + 1,
        cursor: dbCursor,
        include: {
          parentMessage: { include: { author: true } },
          author: {
            where: { NOT: { id: userId } },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor;
      if (items.length > limit) {
        const lastItem = items.pop();
        nextCursor = { id: lastItem!.id, createdAt: lastItem!.createdAt };
      }

      return { items, nextCursor };
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.userId;

      const deletedMessage = await ctx.prisma.message.delete({
        where: {
          authorId: userId,
          id: input,
        },
      });

      return deletedMessage;
    }),

  markAllAsRead: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: roomId }) => {
      const userId = ctx.session!.userId;

      const unreadMessages = await ctx.prisma.message.findMany({
        where: {
          roomId: roomId,
          NOT: {
            messageStatus: {
              some: { userId, viewed: true },
            },
          },
        },
      });

      await ctx.prisma.messageStatus.updateMany({
        where: { message: { roomId }, userId },
        data: { viewed: true },
      });

      return await ctx.prisma.messageStatus.createMany({
        data: unreadMessages.map((msg) => {
          return { messageId: msg.id, userId, viewed: true };
        }),
      });
    }),

  edit: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.userId;

      return await ctx.prisma.message.update({
        where: { authorId: userId, id: input.id },
        data: { content: input.content, isEdited: true },
      });
    }),

  reply: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        roomId: z.string(),
        parentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session!.userId;
      const { content, roomId, parentId } = input;

      await ctx.prisma.message.create({
        data: {
          authorId,
          content,
          roomId,
          parentId,
          messageStatus: { create: [{ viewed: true, userId: authorId }] },
        },
      });
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
