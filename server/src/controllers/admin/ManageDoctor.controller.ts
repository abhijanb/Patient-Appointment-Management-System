import type { Response, Request } from "express";
import * as manageDoctorService from "../../services/admin/manageDoctor.service"
import validateOrThrow from "../../utils/validateOrThrow";
import { successResponse } from "../../utils/response";
import { addDoctorSchema, getDoctorsQuerySchema, updateDoctorSchema, doctorIdParamSchema } from "../../validations/admin/manageDoctor.validation";
import { ApiError } from "../../utils/error";
async function doctorList(req: Request, res: Response) {
    const query = validateOrThrow(req.query, getDoctorsQuerySchema)
    const doctors = await manageDoctorService.getAllDoctor(query);
    successResponse(res, doctors, 200, "Doctors fetched successfully");
}

async function addDoctor(req: Request, res: Response) {
    const payload = validateOrThrow(req.body, addDoctorSchema)
    const imageUrl = req.file?.path;
    if (!imageUrl) {
        throw new ApiError("Image is required", 400);
    }
    const doctor = await manageDoctorService.addDoctor({ ...payload, imageUrl });
    successResponse(res, doctor, 200, "Doctor added successfully");
}

async function updateDoctor(req: Request, res: Response) {
    const { id, name, specialization, hospitalBranch } = validateOrThrow(req.body, updateDoctorSchema);

    const imageUrl = req.file?.path;

    const updateParams: {
        id: number;
        name?: string;
        specialization?: string;
        hospitalBranch?: string;
        imageUrl?: string;
    } = { id };

    if (imageUrl) updateParams.imageUrl = imageUrl;
    if (name) updateParams.name = name;
    if (specialization) updateParams.specialization = specialization;
    if (hospitalBranch) updateParams.hospitalBranch = hospitalBranch;

    const doctor = await manageDoctorService.updateDoctor(updateParams);

    successResponse(res, doctor, 200, "Doctor updated successfully");
}

async function deleteDoctor(req: Request, res: Response) {
    const { id } = validateOrThrow(req.params, doctorIdParamSchema)
    await manageDoctorService.deleteDoctor(id);
    successResponse(res, null, 200, "Doctor deleted successfully");
}

async function getDoctorById(req: Request, res: Response) {
    const { id } = validateOrThrow(req.params, doctorIdParamSchema)
    const doctor = await manageDoctorService.getDoctorById(id);
    successResponse(res, doctor, 200, "Doctor fetched successfully");
}

export { doctorList, getDoctorById, addDoctor, updateDoctor, deleteDoctor }

