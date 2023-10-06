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
          data: {
            ...input,
            createdById: userId,
            memberships: { create: { userId } },
          },
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

  createPersonalRoom: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: otherUserId }) => {
      const userId = ctx.session!.userId;

      const personalRoom = await ctx.prisma.room.findFirst({
        include: { memberships: true },
        where: {
          isPersonal: true,
          AND: [
            { memberships: { some: { userId } } },
            { memberships: { some: { userId: otherUserId } } },
          ],
        },
      });

      if (personalRoom) throw new TRPCError({ code: "CONFLICT" });

      return await ctx.prisma.room.create({
        data: {
          isPersonal: true,
          createdById: userId,
          name: ``,
          memberships: { create: [{ userId }, { userId: otherUserId }] },
        },
      });
    }),

  searchRoom: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: query }) => {
      const rooms = await ctx.prisma.room.findMany({
        where: {
          isPublic: true,
          OR: [{ handle: { contains: query } }, { name: { contains: query } }],
        },
      });

      return rooms;
    }),

  join: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.userId;
      const membership = await ctx.prisma.roomMembership.create({
        data: { userId, roomId: input },
      });

      return membership;
    }),

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userId = ctx.session!.userId;

      return ctx.prisma.room.findFirst({
        where: { id: input },
        include: {
          memberships: {
            where: { userId: userId },
          },
        },
      });
    }),

  getMyRooms: protectedProcedure
    .input(z.object({ isPersonal: z.boolean() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session!.userId;
      return ctx.prisma.room.findMany({
        include: {
          memberships: {
            where: { userId: { not: userId } },
            include: { user: true },
          },
          messages: {
            take: 1,
            orderBy: { createdAt: "desc" },
          },
        },
        where: {
          isPersonal: input.isPersonal,
          memberships: { some: { userId } },
        },
      });
    }),
});
