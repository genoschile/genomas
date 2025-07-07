"use server";

import { z } from "zod";

/* types */
import type { ActionResponseWithoutRepeatPassword } from "@lib/types/formTypes";

/* actions */
import { routes } from "@/lib/api/routes";

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

    const response = await fetch(routes.login(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result: ActionResponseWithoutRepeatPassword = await response.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        error: result.error,
        input: rawData,
      };
    }

    // await createSession(isExistUser.id);

    return {
      success: true,
      message: "Login successful",
      data: result.data,
    };
  } catch (error) {
    console.error("Error in submitLogin:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
