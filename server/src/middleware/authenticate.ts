import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/error";

interface JwtPayload {
  id: number;
  role: string;
}

async function authenticate(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new ApiError("Authentication required", 401);
  }

  const decoded = jwt.verify(token, env.accessTokenSecrect!) as JwtPayload;
  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  req.user = user;
  next();
}

export default authenticate;
