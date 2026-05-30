import { Router } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import * as doctorManageController from "../../controllers/admin/manage-doctor.controller";
import upload from "../../lib/multer";

const multerUpload = upload("doctor/", ["image/jpeg", "image/png", "image/gif", "image/webp"], 5 * 1024 * 1024);
const multerMiddlewareSingle = multerUpload.single("doctor");

const manageDoctorRoute: Router = Router();

manageDoctorRoute.get("/", asyncHandler(doctorManageController.doctorList));
manageDoctorRoute.get("/:id", asyncHandler(doctorManageController.getDoctorById));
manageDoctorRoute.post("/", multerMiddlewareSingle, asyncHandler(doctorManageController.addDoctor));
manageDoctorRoute.patch("/:id", multerMiddlewareSingle, asyncHandler(doctorManageController.updateDoctor));
manageDoctorRoute.delete("/:id", asyncHandler(doctorManageController.deleteDoctor));
export default manageDoctorRoute;