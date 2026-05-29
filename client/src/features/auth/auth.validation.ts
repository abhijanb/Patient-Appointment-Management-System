import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  passwordHash: z.string().min(1, "Password is required"),
  remember: z.boolean(),
})

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  passwordHash: z.string().min(6, "Password must be at least 6 characters"),
  terms: z.literal(true, { message: "You must accept the terms" }),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
