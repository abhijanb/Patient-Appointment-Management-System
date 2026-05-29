import { prisma } from "../../lib/prisma";
import type { getSchedulesQueryType, createScheduleType } from "../../validations/admin/schedule.validation";

async function getSchedules(params: getSchedulesQueryType) {
    const { page = 1, limit = 10, doctorId, consultationType, status, dateFrom, dateTo } = params;

    const where: any = {
        ...(doctorId ? { doctorId } : {}),
        ...(consultationType ? { consultationType } : {}),
        ...(status ? { status } : {}),
        ...(dateFrom || dateTo ? {
            availableDate: {
                ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
                ...(dateTo ? { lte: new Date(dateTo) } : {}),
            }
        } : {}),
    };

    const [schedules, total] = await Promise.all([
        prisma.schedule.findMany({
            where,
            include: { doctor: true },
            orderBy: { availableDate: "asc" },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.schedule.count({ where }),
    ]);

    return { schedules, total, page, limit };
}

async function createSchedule(params: createScheduleType) {
    const schedule = await prisma.schedule.create({
        data: {
            doctorId: params.doctorId,
            availableDate: new Date(params.availableDate),
            timeSlot: params.timeSlot,
            consultationType: params.consultationType,
            status: "AVAILABLE",
        },
        include: { doctor: true },
    });
    return schedule;
}

async function deleteSchedule(id: number) {
    await prisma.schedule.delete({ where: { id } });
}

export { getSchedules, createSchedule, deleteSchedule };
