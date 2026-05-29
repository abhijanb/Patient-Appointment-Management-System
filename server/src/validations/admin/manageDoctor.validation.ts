import z from "zod";

const getDoctorsQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().min(0).max(100).optional(),
    search: z.string().optional(),
    specialization: z.string().optional(),
    hospitalBranch: z.string().optional(),
    minRating: z.coerce.number().min(0).max(5).optional(),
    sortBy: z.enum(["name", "specialization", "hospitalBranch", "averageRating", "createdAt"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
})

const addDoctorSchema = z.object({
    name: z.string().min(1),
    specialization: z.string().min(1),
    averageRating:z.coerce.number().min(0).max(5),
    hospitalBranch: z.string().min(1),
})

const updateDoctorSchema = z.object({
    id: z.coerce.number().int().positive(),
    name: z.string().min(1).optional(),
    specialization: z.string().min(1).optional(),
    hospitalBranch: z.string().min(1).optional(),
    imageUrl: z.string().optional(),
})

const doctorIdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
})

type getDoctorsQueryType = z.infer<typeof getDoctorsQuerySchema>
type addDoctorType = z.infer<typeof addDoctorSchema>
type updateDoctorType = z.infer<typeof updateDoctorSchema>
type doctorIdParamType = z.infer<typeof doctorIdParamSchema>

export {
    getDoctorsQuerySchema,
    addDoctorSchema,
    updateDoctorSchema,
    doctorIdParamSchema,
    type getDoctorsQueryType,
    type addDoctorType,
    type updateDoctorType,
    type doctorIdParamType,
}
