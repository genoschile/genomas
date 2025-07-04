"use server";

import {
  ActionResponse,
  ActionResponseWithoutRepeatPassword,
} from "@/lib/types/formTypes";
import { z } from "zod";
import bcrypt from "bcrypt";
import { FormState, SignupFormSchema } from "./authType";
import { routes } from "@/lib/api/routes";

const loginEnterpriseSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const submitLoginEnterprise = async (
  prevState: ActionResponseWithoutRepeatPassword,
  formData: FormData
): Promise<ActionResponseWithoutRepeatPassword> => {
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

    const restLogin = await fetch(routes.loginEnterprise(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!restLogin.ok) {
      return {
        success: false,
        message: "Login failed",
        error: {},
        input: rawData,
      };
    }

    const responseData: ActionResponse = await restLogin.json();

    if (responseData.success) {
      return {
        success: true,
        message: "Login successful",
        input: rawData,
        error: {},
        data: responseData.data,
      };
    }

    return {
      success: false,
      message: "Enterprise does not exist",
      input: rawData,
      error: {},
    };
  } catch (error) {
    console.error("Error in submitLogin:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      input: prevState.input,
      error: {},
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

export const submitSignUpEnterprise = async (
  state: FormState,
  formData: FormData
) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database

  console.log({ message: "User created successfully!" });

  const res = await fetch(routes.signUpEnterprise(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password: hashedPassword,
    }),
  });

  console.log({ res });

  // Si falla la petición a nivel HTTP (404, 500, etc.)
  if (!res.ok) {
    const errorData: ApiResponse = await res.json();
    return {
      success: false,
      message: errorData.message || "Failed to create user.",
    };
  }

  // Si llega bien, parseamos el JSON
  const responseData: ApiResponse<UserData> = await res.json();

  if (!responseData.success) {
    return {
      success: false,
      message: responseData.message || "Something went wrong.",
    };
  }

  return {
    success: true,
    message: "User created successfully!",
    user: responseData.data,
  };
};
type ApiResponse<T = undefined> = {
  status: number;
  success: boolean;
  message: string;
  data?: T;
};

type UserData = {
  id: string;
  name: string;
  email: string;
};
