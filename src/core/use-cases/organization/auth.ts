"use server";

import {
  ActionResponse,
  ActionResponseWithoutRepeatPassword,
} from "@/lib/types/formTypes";
import { z } from "zod";
import bcrypt from "bcrypt";

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
      credentials: "include",
    });

    const responseData: ActionResponse = await restLogin.json();

    if (responseData.success) {
      if (responseData.data?.accessToken) {
        localStorage.setItem("accessToken", responseData.data.accessToken);
      }

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
      message: responseData.message || "Login failed",
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
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
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

export const submitSignUpEnterprise = async (
  state: ActionResponse,
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const repeatPassword = formData.get("repeatPassword") as string | null;

    if (!name || !email || !password || !repeatPassword) {
      return {
        success: false,
        message: "All fields are required",
        error: {},
        input: {
          name: String(name || ""),
          email: String(email || ""),
          password: String(password || ""),
          repeatPassword: String(repeatPassword || ""),
        },
      };
    }

    const rawData = {
      name: name.toString(),
      email: email.toString(),
      password: password.toString(),
      repeatPassword: repeatPassword.toString(),
    };

    // Validate form fields
    const validatedFields = signUpEnterpriseSchema.safeParse(rawData);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation error",
        error: validatedFields.error.flatten().fieldErrors,
        input: rawData,
      };
    }

    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

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

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error desde backend:", res.status, errorText);

      return {
        success: false,
        message: "Login failed",
        error: {},
        input: rawData,
      };
    }

    const responseData: ApiResponse<UserData> = await res.json();

    console.log("Response data:", responseData);

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
      message: "Error creating organization",
      input: rawData,
      error: {},
    };
  } catch (error) {
    console.error("Error in submitLogin:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      input: state.input,
      error: {},
    };
  }
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
  isDefaultAdmin: boolean;
  userType: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
};
