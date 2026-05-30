import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
})

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[0-9])/, "Password must contain at least one number"),
  terms: z.literal(true, { message: "You must accept the terms" }),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
