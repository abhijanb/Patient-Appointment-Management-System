import type { Response, Request } from "express";
import validateOrThrow from "../../utils/validateOrThrow";
import {
  getPatientAppointmentsQuerySchema,
  rateAppointmentBodySchema,
  appointmentIdParamSchema,
} from "../../validations/patient/patient.validation";
import * as appointmentService from "../../services/patient/appointment.service";
import { successResponse } from "../../utils/response";

async function getPatientAppointments(req: Request, res: Response) {
    const patientId = req.user!.id;
    const { status } = validateOrThrow(req.query, getPatientAppointmentsQuerySchema);
    const appointments = await appointmentService.getPatientAppointments(patientId, status);
    successResponse(res, appointments, 200, "Appointments fetched successfully");
}

async function getUpcomingAppointments(req: Request, res: Response) {
    const patientId = req.user!.id;
    const appointments = await appointmentService.getUpcomingAppointments(patientId);
    successResponse(res, appointments, 200, "Upcoming appointments fetched successfully");
}

async function rateAppointment(req: Request, res: Response) {
    const patientId = req.user!.id;
    const { id: appointmentId } = validateOrThrow(req.params, appointmentIdParamSchema);
    const { rating } = validateOrThrow(req.body, rateAppointmentBodySchema);
    const appointment = await appointmentService.rateAppointment(appointmentId, patientId, rating);
    successResponse(res, appointment, 200, "Rating submitted successfully");
}

async function cancelAppointment(req: Request, res: Response) {
    const patientId = req.user!.id;
    const { id: appointmentId } = validateOrThrow(req.params, appointmentIdParamSchema);
    const appointment = await appointmentService.cancelAppointment(appointmentId, patientId);
    successResponse(res, appointment, 200, "Appointment cancelled successfully");
}

export { getPatientAppointments, getUpcomingAppointments, rateAppointment, cancelAppointment };
