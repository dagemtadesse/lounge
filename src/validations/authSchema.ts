import z from "zod";

export const SignUpSchema = z
  .object({
    email: z.string({ required_error: "Email is required." }).email(),
    password: z
      .string({ required_error: "Password is required." })
      .min(8, "Password must not be lessthan 8 characters.")
      .max(20, "Password must not exceed 20 characters."),
    confirmPassword: z.string({
      required_error: "Confirm Password is required.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword != password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
      });
    }
  });
