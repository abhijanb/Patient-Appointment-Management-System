import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/error";

async function listDoctors(search?: string, specialization?: string, hospitalBranch?: string, consultationType?: string) {
    const where: any = {};
    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { specialization: { contains: search, mode: "insensitive" } },
        ];
    }
    if (specialization) {
        where.specialization = { equals: specialization };
    }
    if (hospitalBranch) {
        where.hospitalBranch = { equals: hospitalBranch };
    }
    if (consultationType) {
        where.schedules = {
            some: {
                consultationType: consultationType as any,
                status: "AVAILABLE",
            },
        };
    }

    return prisma.doctor.findMany({
        where,
        orderBy: { name: "asc" },
    });
}

async function getDoctorWithSchedules(doctorId: number, date?: string) {
    const where: any = { doctorId, status: "AVAILABLE" };
    if (date) {
        const start = new Date(date + "T00:00:00.000Z")
        const end = new Date(date + "T23:59:59.999Z")
        where.availableDate = { gte: start, lte: end }
    }

    const schedules = await prisma.schedule.findMany({
        where,
        orderBy: { timeSlot: "asc" },
    });

    return schedules;
}

async function bookAppointment(patientId: number, scheduleId: number) {
    const schedule = await prisma.schedule.findUnique({ where: { id: scheduleId } });
    if (!schedule || schedule.status !== "AVAILABLE") {

        throw new ApiError("Schedule slot is not available", 400);
    }

    const activeAppointments = await prisma.appointment.count({
        where: { patientId, status: "UPCOMING" },
    });
    if (activeAppointments >= 2) {
        throw new ApiError("You cannot have more than 2 active appointments at a time", 400);
    }

    try {
        const [appointment] = await prisma.$transaction([
            prisma.appointment.create({
                data: {
                    patientId,
                    scheduleId,
                    status: "UPCOMING",
                },
                include: {
                    schedule: { include: { doctor: true } },
                },
            }),
            prisma.schedule.update({
                where: { id: scheduleId },
                data: { status: "BOOKED" },
            }),
        ]);

        return appointment;
    } catch (error){
        console.log(error);
        throw new ApiError("Schedule slot is not available", 400);
    }
}

export { listDoctors, getDoctorWithSchedules, bookAppointment };
