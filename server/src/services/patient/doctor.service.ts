import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/error";
import type { $Enums } from "../../../generated/prisma/client";
import type { listDoctorsQueryType } from "../../validations/patient/patient.validation";

async function listDoctors(params: listDoctorsQueryType) {
    const { search, specialization, hospitalBranch, consultationType, page = 1, limit = 10 } = params;
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
                consultationType: consultationType as $Enums.ConsultationType,
                status: "AVAILABLE",
            },
        };
    }

    const [doctors, total] = await Promise.all([
        prisma.doctor.findMany({
            where,
            orderBy: { name: "asc" },
            ...(limit ? { skip: (page - 1) * limit, take: limit } : {}),
        }),
        prisma.doctor.count({ where }),
    ]);

    return { doctors, total };
}

async function getDoctorWithSchedules(doctorId: number, date?: string, consultationType?: string) {
    const where: any = { doctorId, status: "AVAILABLE" };
    if (date) {
        const start = new Date(date + "T00:00:00.000Z");
        const end = new Date(date + "T23:59:59.999Z");
        where.availableDate = { gte: start, lte: end };
    }
    if (consultationType) {
        where.consultationType = consultationType as $Enums.ConsultationType;
    }

    const schedules = await prisma.schedule.findMany({
        where,
        orderBy: { timeSlot: "asc" },
    });

    return schedules;
}

async function bookAppointment(patientId: number, scheduleId: number) {
    const activeAppointments = await prisma.appointment.count({
        where: { patientId, status: "UPCOMING" },
    });
    if (activeAppointments >= 2) {
        throw new ApiError("You cannot have more than 2 active appointments at a time", 400);
    }

    return prisma.$transaction(async (tx) => {
        const { count } = await tx.schedule.updateMany({
            where: { id: scheduleId, status: "AVAILABLE" },
            data: { status: "BOOKED" },
        });

        if (count === 0) {
            throw new ApiError("Schedule slot is not available", 400);
        }

        await tx.appointment.deleteMany({
            where: { scheduleId, status: "CANCELLED" },
        });

        const appointment = await tx.appointment.create({
            data: {
                patientId,
                scheduleId,
                status: "UPCOMING",
            },
            include: {
                schedule: { include: { doctor: true } },
            },
        });

        return appointment;
    });
}

export { listDoctors, getDoctorWithSchedules, bookAppointment };
