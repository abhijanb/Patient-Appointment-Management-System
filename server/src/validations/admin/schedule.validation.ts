import z from "zod";

const getSchedulesQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    doctorId: z.coerce.number().int().positive().optional(),
    consultationType: z.enum(["IN_PERSON", "TELEHEALTH"]).optional(),
    status: z.enum(["AVAILABLE", "BOOKED"]).optional(),
    dateFrom: z.string().pipe(z.coerce.date()).optional(),
    dateTo: z.string().pipe(z.coerce.date()).optional(),
});

const createScheduleSchema = z.object({
    doctorId: z.coerce.number().int().positive(),
    availableDate: z.string().min(1),
    timeSlot: z.string().min(1),
    consultationType: z.enum(["IN_PERSON", "TELEHEALTH"]),
});

const scheduleIdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

type getSchedulesQueryType = z.infer<typeof getSchedulesQuerySchema>;
type createScheduleType = z.infer<typeof createScheduleSchema>;
type scheduleIdParamType = z.infer<typeof scheduleIdParamSchema>;

export {
    getSchedulesQuerySchema,
    createScheduleSchema,
    scheduleIdParamSchema,
    type getSchedulesQueryType,
    type createScheduleType,
    type scheduleIdParamType,
};
