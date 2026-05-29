import z from "zod";

const listDoctorsQuerySchema = z.object({
  search: z.string().optional(),
  specialization: z.string().optional(),
  hospitalBranch: z.string().optional(),
  consultationType: z.string().optional(),
});

const doctorIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const doctorSchedulesQuerySchema = z.object({
  date: z.string().optional(),
});

const bookAppointmentBodySchema = z.object({
  scheduleId: z.coerce.number().int().positive(),
});

const getPatientAppointmentsQuerySchema = z.object({
  status: z.string().optional(),
});

const rateAppointmentBodySchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
});

const appointmentIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

type listDoctorsQueryType = z.infer<typeof listDoctorsQuerySchema>;
type doctorIdParamType = z.infer<typeof doctorIdParamSchema>;
type doctorSchedulesQueryType = z.infer<typeof doctorSchedulesQuerySchema>;
type bookAppointmentBodyType = z.infer<typeof bookAppointmentBodySchema>;
type getPatientAppointmentsQueryType = z.infer<typeof getPatientAppointmentsQuerySchema>;
type rateAppointmentBodyType = z.infer<typeof rateAppointmentBodySchema>;
type appointmentIdParamType = z.infer<typeof appointmentIdParamSchema>;

export {
  listDoctorsQuerySchema,
  doctorIdParamSchema,
  doctorSchedulesQuerySchema,
  bookAppointmentBodySchema,
  getPatientAppointmentsQuerySchema,
  rateAppointmentBodySchema,
  appointmentIdParamSchema,
  type listDoctorsQueryType,
  type doctorIdParamType,
  type doctorSchedulesQueryType,
  type bookAppointmentBodyType,
  type getPatientAppointmentsQueryType,
  type rateAppointmentBodyType,
  type appointmentIdParamType,
};
