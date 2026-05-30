import { Router } from "express";
import authRouter from "./auth";
import adminRouter from "./admin/admin.route";
import patientRoute from "./patient/patient.route";

const apiRoute: Router = Router();

apiRoute.use("/auth", authRouter);
apiRoute.use("/admin", adminRouter);
apiRoute.use("/patient", patientRoute);

export default apiRoute;