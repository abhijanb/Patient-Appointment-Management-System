import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/error";

export enum Role {
  ADMIN = "ADMIN",
  PATIENT = "PATIENT",
}

export function authorize(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError("Authentication required", 401);
    }

    if (!allowedRoles.includes(req.user.role as Role)) {
      throw new ApiError("Forbidden: insufficient permissions", 403);
    }

    next();
  };
}
