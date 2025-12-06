import { z } from "zod";

export const organizationSignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(100, { message: "Name must be less than 100 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Invalid email address",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    repeatPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type OrganizationSignUpInput = z.infer<typeof organizationSignUpSchema>;
