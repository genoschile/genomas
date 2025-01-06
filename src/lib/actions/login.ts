"use server";

import { z } from "zod";
import bcrypt from "bcrypt";

/* types */
import type { ActionResponse } from "@lib/types/formTypes";

/* actions */
import { createSession } from "@lib/actions/session";
import prisma from "@lib/actions/prisma";

const loginSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" }),
        repeatPassword: z
            .string()
            .min(6, {
                message: "Repeat password must be at least 6 characters long",
            }),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords must match",
        path: ["repeatPassword"],
    });

export async function submitLogin(
    _: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {
    try {
        const rawData = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            repeatPassword: formData.get("repeatPassword") as string,
        };

        const validatedData = loginSchema.safeParse(rawData);

        if (!validatedData.success) {
            return {
                success: false,
                message: "Validation error",
                error: validatedData.error.flatten().fieldErrors,
                input: rawData,
            };
        }

        const { email, password } = validatedData.data;

        // Generar hash de contraseña
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario en la base de datos
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: "", 
            },
        });

        // Crear sesión para el usuario
        const route = await createSession(newUser.id);

        return {
            success: true,
            message: "Login successful",
        };
        
    } catch (error) {
        console.error("Error in submitLogin:", error);
        return {
            success: false,
            message: "An unexpected error occurred",
        };
    }
}
