import z from "zod";

const registerInputSchema = z.object({
    name:z.string(),
    email:z.string().email(),
    passwordHash:z.string(),
})

const loginInputSchema = z.object({
    email:z.string().email(),
    password:z.string(),
})

const updateProfileInputSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid email").optional(),
})

const changePasswordInputSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
})

type registerInputType = z.infer<typeof registerInputSchema>
type loginInputType = z.infer<typeof loginInputSchema>
type updateProfileInputType = z.infer<typeof updateProfileInputSchema>
type changePasswordInputType = z.infer<typeof changePasswordInputSchema>

export { 
    registerInputSchema,
    type registerInputType,
    loginInputSchema,
    type loginInputType,
    updateProfileInputSchema,
    type updateProfileInputType,
    changePasswordInputSchema,
    type changePasswordInputType
}