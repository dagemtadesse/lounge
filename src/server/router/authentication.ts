import z from "zod";
import bcrypt from "bcrypt";
import { middleware, publicProcedure, router } from "../trpc";
import { SignUpSchema } from "@/vallidations/authSchema";

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (user) {
        const matches = await bcrypt.compare(
          input.password,
          user.hashedPassword
        );

        return matches ? { ...user, hashedPassword: undefined } : null;
      }
    }),

  register: publicProcedure
    .input(SignUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await ctx.prisma.user.create({
        data: { email, hashedPassword },
      });

      return { ...user, hashedPassword: undefined };
    }),
});

