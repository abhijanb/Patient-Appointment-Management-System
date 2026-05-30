import env from "../config/env";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/error";
import type { loginInputType, registerInputType, updateProfileInputType, changePasswordInputType } from "../validations/auth.validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function register(registerInput:registerInputType) {
    const {email,password,name} = registerInput;

    const userExists = await prisma.user.findUnique({where:{email}});
    if(userExists) throw new ApiError("User already exists",400);

    const hashedPassword = await bcrypt.hash(password,12);

    const user = await prisma.user.create({
        data:{
            email,
            name,
            passwordHash:hashedPassword,
        }
    });

    const {passwordHash:_,...userWithoutPassword} = user;
    
    return userWithoutPassword;
}

async function login(loginInput:loginInputType) {
    const {email,password} = loginInput;
    const user = await prisma.user.findUnique({where:{email}});
    if(!user) throw new ApiError("User not found",404);

    const isPasswordValid = await bcrypt.compare(password,user.passwordHash);
    if(!isPasswordValid) throw new ApiError("Invalid password",401);
    
    const token = jwt.sign({id:user.id,role:user.role},env.accessTokenSecret,{
        expiresIn:env.accessTokenExpiry
    } as Parameters<typeof jwt.sign>[2]);

    const {passwordHash:_,...userWithoutPassword} = user;
    
    return {user:userWithoutPassword,token};
}

async function updateProfile(userId: number, input: updateProfileInputType) {
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) throw new ApiError("User not found", 404);

    if (input.email) {
        const existing = await prisma.user.findFirst({
            where: { email: input.email, id: { not: userId } },
        });
        if (existing) throw new ApiError("Email is already in use", 400);
    }

    const data: Record<string, string> = {};
    if (input.name !== undefined) data.name = input.name;
    if (input.email !== undefined) data.email = input.email;

    const user = await prisma.user.update({
        where: { id: userId },
        data,
    });

    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

async function changePassword(userId: number, input: changePasswordInputType) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ApiError("User not found", 404);

    const isCurrentPasswordValid = await bcrypt.compare(input.currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) throw new ApiError("Current password is incorrect", 401);

    const hashedPassword = await bcrypt.hash(input.newPassword, 12);

    await prisma.user.update({
        where: { id: userId },
        data: { passwordHash: hashedPassword },
    });
}

export {register, login, updateProfile, changePassword};