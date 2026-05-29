import { Router } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import * as doctorManageController from "../../controllers/admin/ManageDoctor.controller"
import upload from "../../lib/multer";

const multerUpload = upload("doctor/");
const multerMiddlewareSingle = multerUpload.single('doctor');

const manageDoctorRoute: Router = Router();

manageDoctorRoute.get('/list-doctors', asyncHandler(doctorManageController.doctorList));
manageDoctorRoute.get('/:id', asyncHandler(doctorManageController.getDoctorById));
manageDoctorRoute.post('/add-doctor', multerMiddlewareSingle, asyncHandler(doctorManageController.addDoctor));
manageDoctorRoute.put('/update-doctor', multerMiddlewareSingle, asyncHandler(doctorManageController.updateDoctor));
manageDoctorRoute.delete('/delete-doctor/:id', asyncHandler(doctorManageController.deleteDoctor));
export default manageDoctorRoute;