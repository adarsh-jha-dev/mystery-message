import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters long")
  .max(20, "Username must be atmost 20 characters long")
  .regex(
    /^[a-zA-Z0-9_]*$/,
    "Username can only contain letters, numbers, and underscores"
  );

export const SignUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email("Please use a valid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
  confirmPassword: z.string().optional(),
});
