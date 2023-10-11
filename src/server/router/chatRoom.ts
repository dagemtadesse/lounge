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

  clear: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: roomId }) => {
      const userId = ctx.session!.userId;

      const room = await ctx.prisma.room.findUnique({
        where: {
          id: roomId,
          isPersonal: true,
          memberships: { some: { userId } },
        },
      });

      if (!room) throw new TRPCError({ code: "NOT_FOUND" });

      await ctx.prisma.message.deleteMany({ where: { roomId: room.id } });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: roomId }) => {
      const userId = ctx.session!.userId;

      return await ctx.prisma.room.delete({
        where: { createdById: userId, id: roomId },
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
            take: 1,
            where: { userId: { not: userId } },
            include: { user: true },
          },
        },
      });
    }),

  getMyRooms: protectedProcedure
    .input(
      z.object({
        isPersonal: z.boolean(),
        cursor: z.object({ id: z.string(), updatedAt: z.date() }).nullish(),
        size: z.number().nullish(),
        query: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session!.userId;

      const limit = input.size ?? 10;
      const dbCursor = input.cursor
        ? { updatedAt: input.cursor.updatedAt, id: input.cursor.id }
        : undefined;

      const query = input.query.trim();
      const isSearching = query != "";

      const personalChatRoomFilter: Prisma.RoomWhereInput = {
        memberships: {
          some: {
            userId: isSearching ? undefined : userId,
            user: isSearching ? { email: { contains: query } } : undefined,
          },
        },
      };

      const groupChatRoomFilter: Prisma.RoomWhereInput = {
        memberships: {
          some: isSearching ? undefined : { userId },
        },
        OR: isSearching
          ? [{ handle: { contains: query } }, { name: { contains: query } }]
          : undefined,
      };

      const filter: Prisma.RoomWhereInput = input.isPersonal
        ? personalChatRoomFilter
        : groupChatRoomFilter;

      const rooms = await ctx.prisma.room.findMany({
        take: limit + 1,
        cursor: dbCursor,
        include: {
          memberships: {
            where: { userId: { not: userId } },
            include: { user: true },
          },
          messages: {
            take: 1,
            orderBy: { createdAt: "desc" },
          },
          _count: {
            select: {
              messages: {
                where: {
                  NOT: {
                    messageStatus: {
                      some: { userId, viewed: true },
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          isPersonal: input.isPersonal,
          ...filter,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      let nextCursor;
      if (rooms.length > limit) {
        const lastItem = rooms.pop();
        nextCursor = { id: lastItem!.id, updatedAt: lastItem!.updatedAt };
      }

      return { items: rooms, nextCursor };
    }),

  recent: protectedProcedure
    .input(z.object({ size: z.number() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session!.userId;

      const myrooms = await ctx.prisma.room.findMany({
        take: input.size,
        where: {
          memberships: { some: { userId } },
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          memberships: {
            where: {
              userId: { not: userId },
            },
            include: { user: true },
            take: 1,
          },
        },
      });

      return myrooms;
    }),

  members: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        cursor: z.object({ email: z.string() }).nullish(),
        size: z.number().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const size = input.size ?? 10;

      const members = await ctx.prisma.user.findMany({
        take: size,
        where: {
          memberships: { some: { roomId: input.roomId } },
        },
      });

      let nextCursor;
      if (members.length > size) {
        const lastItem = members.pop();
        nextCursor = { email: lastItem!.email };
      }

      return { items: members, nextCursor };
    }),
});
