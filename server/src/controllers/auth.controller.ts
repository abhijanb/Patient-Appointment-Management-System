import type { Request, Response } from "express";
import validateOrThrow from "../utils/validateOrThrow";
import { loginInputSchema, registerInputSchema, updateProfileInputSchema, changePasswordInputSchema } from "../validations/auth.validation";
import * as authService from "../services/auth.service"
import { successResponse } from "../utils/response";

async function register(req: Request, res: Response) {
    const payload = validateOrThrow(req.body, registerInputSchema);
    const user = await authService.register(payload);
    successResponse(res, user, 200, "User registered successfully");
}

async function login(req: Request, res: Response) {
    const payload = validateOrThrow(req.body, loginInputSchema);
    const user = await authService.login(payload);
    if (user.token) {
        res.cookie("accessToken", user.token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
    }
    const { token: _, ...userWithoutToken } = user;
    successResponse(res, userWithoutToken, 200, "User logged in successfully");
}

async function me(req: Request, res: Response) {
    const { passwordHash: _, ...user } = req.user!;
    successResponse(res, user, 200, "User fetched successfully");
}

async function updateProfile(req: Request, res: Response) {
    const payload = validateOrThrow(req.body, updateProfileInputSchema);
    const user = await authService.updateProfile(req.user!.id, payload);
    successResponse(res, user, 200, "Profile updated successfully");
}

async function changePassword(req: Request, res: Response) {
    const payload = validateOrThrow(req.body, changePasswordInputSchema);
    await authService.changePassword(req.user!.id, payload);
    successResponse(res, null, 200, "Password changed successfully");
}

async function deactivateAccount(req: Request, res: Response) {
    await authService.deactivateAccount(req.user!.id);
    res.clearCookie("accessToken");
    successResponse(res, null, 200, "Account deactivated successfully");
}

export { register, login, me, updateProfile, changePassword, deactivateAccount }