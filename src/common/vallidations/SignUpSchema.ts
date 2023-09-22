import { object, string } from "zod";

export const SignUpSchema = object({
  email: string({ required_error: "Please provide your email" }).email(),
  password: string({ required_error: "Please provide your Password" })
    .min(8)
    .max(50),
});
