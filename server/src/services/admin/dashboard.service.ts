import { prisma } from "../../lib/prisma";

async function getDashboard() {
    const totalDoctors = await prisma.doctor.count();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todayAppointments = await prisma.schedule.count({
        where: {
            availableDate: { gte: todayStart, lte: todayEnd },
            appointment: { isNot: null },
        }
    });

    const pendingRequests = await prisma.appointment.count({
        where: { status: "UPCOMING" }
    });

    const recentDoctors = await prisma.doctor.findMany({
        orderBy: { createdAt: "desc" },
        take: 3,
        select: { id: true, name: true, imageUrl: true, specialization: true },
    });

    return {
        totalDoctors,
        todayAppointments,
        pendingRequests,
        recentDoctors,
    };
}

export { getDashboard };
