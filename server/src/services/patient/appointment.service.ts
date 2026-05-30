import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/error";

async function getPatientAppointments(patientId: number, status?: string) {
    const where: any = { patientId };
    if (status) where.status = status;

    const appointments = await prisma.appointment.findMany({
        where,
        include: {
            schedule: {
                include: { doctor: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return appointments;
}

async function getUpcomingAppointments(patientId: number) {
    return getPatientAppointments(patientId, "UPCOMING");
}

async function rateAppointment(appointmentId: number, patientId: number, rating: number) {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        throw new ApiError("Rating must be an integer between 1 and 5", 400);
    }

    const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: { schedule: true },
    });

    if (!appointment || appointment.patientId !== patientId) {
        throw new ApiError("Appointment not found", 404);
    }

    if (appointment.status !== "COMPLETED") {
        throw new ApiError("Only completed appointments can be rated", 400);
    }

    if (appointment.rating !== null) {
        throw new ApiError("Appointment has already been rated", 400);
    }

    const doctorId = appointment.schedule.doctorId;

    const [updated, avgResult] = await prisma.$transaction([
        prisma.appointment.update({
            where: { id: appointmentId },
            data: { rating, ratedAt: new Date() },
            include: {
                schedule: { include: { doctor: true } },
            },
        }),
        prisma.appointment.aggregate({
            where: {
                schedule: { doctorId },
                rating: { not: null },
            },
            _avg: { rating: true },
        }),
    ]);

    const newAverage = avgResult._avg.rating ?? 0;

    await prisma.doctor.update({
        where: { id: doctorId },
        data: { averageRating: Math.round(newAverage * 100) / 100 },
    });

    return updated;
}

async function cancelAppointment(appointmentId: number, patientId: number) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!appointment || appointment.patientId !== patientId) {
    throw new ApiError("Appointment not found", 404);
  }

  if (appointment.status !== "UPCOMING") {
    throw new ApiError("Only upcoming appointments can be cancelled", 400);
  }

  const [cancelled] = await prisma.$transaction([
    prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "CANCELLED" },
      include: {
        schedule: { include: { doctor: true } },
      },
    }),
    prisma.schedule.update({
      where: { id: appointment.scheduleId },
      data: { status: "AVAILABLE" },
    }),
  ]);

  return cancelled;
}

export { getPatientAppointments, getUpcomingAppointments, rateAppointment, cancelAppointment };
