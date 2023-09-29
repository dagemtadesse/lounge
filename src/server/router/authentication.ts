import z from "zod";
import bcrypt from "bcrypt";
import { publicProcedure, router } from "../trpc";
import { SignUpSchema } from "@/validations/authSchema";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      let matches = false;

      if (user)
        matches = await bcrypt.compare(input.password, user.hashedPassword);

      if (user == null || !matches)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Password and email do not match.",
        });

      return { ...user, hashedPassword: undefined };
    }),

  register: publicProcedure
    .input(SignUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const existingUser = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (existingUser != null)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email address already taken.",
        });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await ctx.prisma.user.create({
        data: { email, hashedPassword },
      });

      return { ...user, hashedPassword: undefined };
    }),
});
