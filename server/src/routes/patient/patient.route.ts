import { Router } from "express";
import authenticate from "../../middleware/authenticate";
import { authorize, Role } from "../../middleware/authorize";
import asyncHandler from "../../middleware/asyncHandler";
import { appointmentMutationLimiter } from "../../middleware/rateLimiter";
import * as doctorController from "../../controllers/patient/doctor.controller";
import * as appointmentController from "../../controllers/patient/appointment.controller";

const patientRouter: Router = Router();

patientRouter.use(asyncHandler(authenticate));
patientRouter.use(authorize(Role.PATIENT));

patientRouter.get("/doctors", asyncHandler(doctorController.listDoctors));
patientRouter.get("/doctors/:id/schedules", asyncHandler(doctorController.getDoctorSchedules));
patientRouter.post("/appointments/book", asyncHandler(doctorController.bookAppointment));
patientRouter.get("/appointments", asyncHandler(appointmentController.getPatientAppointments));
patientRouter.get("/appointments/upcoming", asyncHandler(appointmentController.getUpcomingAppointments));
patientRouter.post("/appointments/:id/rate", appointmentMutationLimiter, asyncHandler(appointmentController.rateAppointment));
patientRouter.patch("/appointments/:id/cancel", appointmentMutationLimiter, asyncHandler(appointmentController.cancelAppointment));

export default patientRouter;
