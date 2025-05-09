"use server";

import {
  ActionResponse,
  ActionResponseWithoutRepeatPassword,
} from "@/lib/types/formTypes";
import { z } from "zod";
import bcrypt from "bcrypt";

const loginEnterpriseSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// : Promise<ActionResponseWithoutRepeatPassword>

export const submitLoginEnterprise = async (
  _: ActionResponseWithoutRepeatPassword | null,
  formData: FormData
) => {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validatedData = loginEnterpriseSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Validation error",
        error: validatedData.error.flatten().fieldErrors,
        input: rawData,
      };
    }

    const { email, password } = validatedData.data;

    console.log({ email, password });

    return {
      success: false,
      message: "Enterprise does not exist",
      input: rawData,
    };
  } catch (error) {
    console.error("Error in submitLogin:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const signUpEnterpriseSchema = z
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

    const validatedData = signUpEnterpriseSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Validation error",
        error: validatedData.error.flatten().fieldErrors,
        input: rawData,
      };
    }

    const { email, password } = validatedData.data;

    // const isExistUser = await prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });

    // console.log(isExistUser);

    // if (isExistUser) {
    //   return {
    //     success: false,
    //     message: "User already exists in the database",
    //     input: rawData,
    //   };
    // }

    // Generar hash de contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // // Crear usuario en la base de datos
    // const newUser = await prisma.user.create({
    //     data: {
    //         email,
    //         password: hashedPassword,
    //         name: "",

    //     },
    // });

    // console.log(newUser)

    // Crear sesión para el usuario
    // const route = await createSession(newUser.id);

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
