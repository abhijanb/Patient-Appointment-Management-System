import type { Response, Request } from "express";
import validateOrThrow from "../../utils/validateOrThrow";
import {
  listDoctorsQuerySchema,
  doctorIdParamSchema,
  doctorSchedulesQuerySchema,
  bookAppointmentBodySchema,
} from "../../validations/patient/patient.validation";
import * as doctorService from "../../services/patient/doctor.service";
import { successResponse } from "../../utils/response";

async function listDoctors(req: Request, res: Response) {
    const { search, specialization, hospitalBranch, consultationType } = validateOrThrow(req.query, listDoctorsQuerySchema);
    const doctors = await doctorService.listDoctors(search, specialization, hospitalBranch, consultationType);
    successResponse(res, doctors, 200, "Doctors fetched successfully");
}

async function getDoctorSchedules(req: Request, res: Response) {
    const { id: doctorId } = validateOrThrow(req.params, doctorIdParamSchema);
    const { date } = validateOrThrow(req.query, doctorSchedulesQuerySchema);
    const schedules = await doctorService.getDoctorWithSchedules(doctorId, date);
    successResponse(res, schedules, 200, "Schedules fetched successfully");
}

async function bookAppointment(req: Request, res: Response) {
    const patientId = req.user!.id;
    const { scheduleId } = validateOrThrow(req.body, bookAppointmentBodySchema);
    const appointment = await doctorService.bookAppointment(patientId, scheduleId);
    successResponse(res, appointment, 201, "Appointment booked successfully");
}

export { listDoctors, getDoctorSchedules, bookAppointment };
