"use server";

import { z } from "zod";
import bcrypt from "bcrypt";

/* types */
import type {
  ActionResponse,
  ActionResponseWithoutRepeatPassword,
} from "@lib/types/formTypes";

/* actions */
import { createSession } from "@lib/actions/session";
import prisma from "@lib/actions/prisma";

const signUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    repeatPassword: z.string().min(6, {
      message: "Repeat password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  });

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export async function submitLogin(
  _: ActionResponseWithoutRepeatPassword | null,
  formData: FormData
): Promise<ActionResponseWithoutRepeatPassword> {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
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

    const isExistUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!isExistUser) {
      return {
        success: false,
        message: "User does not exist",
        input: rawData,
      };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isExistUser.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
        input: rawData,
      };
    }

    await createSession(isExistUser.id);

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

export async function submitSignUp(
  _: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      repeatPassword: formData.get("repeatPassword") as string,
    };

    const validatedData = signUpSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Validation error",
        error: validatedData.error.flatten().fieldErrors,
        input: rawData,
      };
    }

    const { email, password } = validatedData.data;

    const isExistUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log(isExistUser);

    if (isExistUser) {
      return {
        success: false,
        message: "User already exists in the database",
        input: rawData,
      };
    }

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

    console.log(newUser);

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
