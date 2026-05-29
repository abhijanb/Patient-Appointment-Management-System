import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import env from "../config/env";
import bcrypt from "bcryptjs";

async function seed(req: Request, res: Response) {
    const user = await prisma.user.upsert({
        where: {
            email: env.adminEmail!
        },
        update: {
            passwordHash: bcrypt.hashSync(env.adminPassword!, 10),
            role: "ADMIN"
        },
        create: {
            email: env.adminEmail!,
            passwordHash: bcrypt.hashSync(env.adminPassword!, 10),
            name: "Admin",
            role: "ADMIN"
        }
    })
    res.json(user);
}

export default seed