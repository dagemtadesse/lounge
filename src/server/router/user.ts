import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const useRouter = router({
  search: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: query }) => {
      const userId = ctx.session!.userId;

      return await ctx.prisma.user.findMany({
        include: {
          memberships: {
            where: {
              room: { isPersonal: true, memberships: { some: { userId } } },
            },
          },
        },
        where: { email: { contains: query }, id: { not: userId } },
      });
    }),

  contacts: protectedProcedure
    .input(
      z.object({
        cursor: z.object({ email: z.string() }).nullish(),
        query: z.string(),
        size: z.number().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session!.userId;

      const limit = input.size ?? 10;
      const dbCursor = input.cursor ? { email: input.cursor.email } : undefined;

      const query = {
        take: limit + 1,
        cursor: dbCursor,
      };
      let items = [];

      if (input.query.trim() !== "") {
        items = await ctx.prisma.user.findMany({
          ...query,
          include: {
            memberships: {
              where: {
                room: { isPersonal: true, memberships: { some: { userId } } },
              },
            },
          },
          where: { email: { contains: input.query }, id: { not: userId } },
          orderBy: { email: "asc" },
        });
      } else {
        items = await ctx.prisma.user.findMany({
          ...query,
          include: {
            memberships: {
              where: {
                room: { isPersonal: true, memberships: { some: { userId } } },
              },
            },
          },
          where: {
            id: { not: userId },
            memberships: {
              some: {
                room: { isPersonal: true, memberships: { some: { userId } } },
              },
            },
          },
          orderBy: { email: "asc" },
        });
      }

      let nextCursor;
      if (items.length > limit) {
        const lastItem = items.pop();
        nextCursor = { email: lastItem!.email };
      }

      return { items, nextCursor };
    }),
});
