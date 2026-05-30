import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/error";
import type { addDoctorType, getDoctorsQueryType, updateDoctorType } from "../../validations/admin/manageDoctor.validation";

async function getAllDoctor(params: getDoctorsQueryType) {
    const { page = 1, limit = 10, search = "", specialization = "", hospitalBranch = "", minRating = 0, sortBy = "createdAt", sortOrder = "desc" } = params;

    const where = {
        ...(search && {
            OR: [
                { name: { contains: search, mode: "insensitive" as const } },
                { specialization: { contains: search, mode: "insensitive" as const } },
            ]
        }),
        ...(specialization && { specialization: { equals: specialization } }),
        ...(hospitalBranch && { hospitalBranch: { equals: hospitalBranch } }),
        ...(minRating && { averageRating: { gte: minRating } }),
    };

    const [doctors, total] = await Promise.all([
        prisma.doctor.findMany({
            where,
            orderBy: { [sortBy]: sortOrder },
            ...(limit ? { skip: (page - 1) * limit, take: limit } : {}),
        }),
        prisma.doctor.count({ where }),
    ]);

    return { doctors, total };
}

async function addDoctor(params: addDoctorType & { imageUrl: string }) {
    const { hospitalBranch, name, specialization, imageUrl, averageRating } = params;
    const doctor = await prisma.doctor.create({
        data: {
            name,
            specialization,
            hospitalBranch,
            imageUrl,
            averageRating,
        }
    });
    return doctor;
}

async function updateDoctor(params: updateDoctorType & { id: number, imageUrl?: string }) {
    const { name, specialization, hospitalBranch, id, imageUrl } = params;
    const doctor = await prisma.doctor.update({
        where: {
            id: id,
        },
        data: {
            ...(name && { name }),
            ...(specialization && { specialization }),
            ...(hospitalBranch && { hospitalBranch }),
            ...(imageUrl && { imageUrl }),
        }
    });
    return doctor;
}

async function deleteDoctor(id: number) {
    const existing = await prisma.doctor.findUnique({ where: { id } });
    if (!existing) {
        throw new ApiError("Doctor not found", 404);
    }

    await prisma.doctor.delete({ where: { id } });
}

async function getDoctorById(id: number) {
    const doctor = await prisma.doctor.findUnique({ where: { id } });
    if (!doctor) throw new ApiError("Doctor not found", 404);
    return doctor;
}

export { getAllDoctor, getDoctorById, addDoctor, updateDoctor, deleteDoctor };