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

  contacts: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session!.userId;

    const contacts = await ctx.prisma.user.findMany({
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
    });

    return contacts;
  }),
});
