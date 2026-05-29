import asyncHandler from "../middleware/asyncHandler";
import * as authController from "../controllers/auth.controller"
import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { authorize, Role } from "../middleware/authorize";

const authRouter:Router = Router();

authRouter.post('/register', asyncHandler(authController.register));
authRouter.post('/login', asyncHandler(authController.login));
authRouter.get('/me', asyncHandler(authenticate), asyncHandler(authorize(Role.ADMIN, Role.PATIENT)), asyncHandler(authController.me));
authRouter.patch('/profile', asyncHandler(authenticate), asyncHandler(authorize(Role.ADMIN, Role.PATIENT)), asyncHandler(authController.updateProfile));
authRouter.post('/change-password', asyncHandler(authenticate), asyncHandler(authorize(Role.ADMIN, Role.PATIENT)), asyncHandler(authController.changePassword));
authRouter.delete('/account', asyncHandler(authenticate), asyncHandler(authorize(Role.ADMIN, Role.PATIENT)), asyncHandler(authController.deactivateAccount));

export default authRouter;
