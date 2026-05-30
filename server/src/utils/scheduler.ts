import cron from "node-cron";
import { prisma } from "../lib/prisma";

async function autoCompletePastAppointments() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pastCount = await prisma.appointment.count({
        where: {
            status: "UPCOMING",
            schedule: {
                availableDate: { lt: today },
            },
        },
    });

    if (pastCount === 0) return;

    await prisma.appointment.updateMany({
        where: {
            status: "UPCOMING",
            schedule: {
                availableDate: { lt: today },
            },
        },
        data: { status: "COMPLETED" },
    });
}

function startScheduler() {
    autoCompletePastAppointments().catch(() => {});
    cron.schedule("0 * * * *", () => {
        autoCompletePastAppointments().catch(() => {});
    });
}

export default startScheduler;
