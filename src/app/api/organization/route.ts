import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { OrgDTO } from "@/core/interfaces/IOrganization";
import { useCaseOrganization } from "@/core/instances";
import { z } from "zod";

// Schema Zod compartido
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

// Tipo de respuesta unificada
type ApiResponse<T = undefined> = {
  status: number;
  success: boolean;
  message: string;
  data?: T;
};

/**
 * POST /api/organization/signup
 * Crea una organización
 */
export async function POST(request: Request) {
  const body = await request.json();

  try {
    console.log("📥 Request body recibido:", body);

    const validated = signUpEnterpriseSchema.safeParse(body);

    if (!validated.success) {
      console.warn(
        "❌ Error de validación:",
        z.treeifyError(validated.error).properties
      );

      return NextResponse.json<ApiResponse>(
        {
          status: 400,
          success: false,
          message: "Validation failed",
          data: z.treeifyError(validated.error).properties as any,
        },
        { status: 400 }
      );
    }

    const { name, email, password } = validated.data;

    // already exists?
    const existingOrg = await useCaseOrganization.organizationByEmail(email);

    if (existingOrg) {
      console.warn("⚠️ Organization already exists:", email);

      return NextResponse.json<ApiResponse>(
        {
          status: 400,
          success: false,
          message: "Organization already exists with this email",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const org: OrgDTO = await useCaseOrganization.execute({
      name,
      email,
      password: hashedPassword,
    });

    if (!org) {
      return NextResponse.json<ApiResponse>(
        {
          status: 400,
          success: false,
          message: "Organization not created",
        },
        { status: 400 }
      );
    }

    console.log("✅ Organization created:", org);

    return NextResponse.json<ApiResponse<OrgDTO>>(
      {
        status: 200,
        success: true,
        message: "Organization created successfully",
        data: org,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Unexpected error:", error);

    return NextResponse.json<ApiResponse>(
      {
        status: 500,
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const organizations = await useCaseOrganization.getAllOrganizations();

  if (!organizations) {
    return NextResponse.json({
      success: false,
      message: "No organizations found",
      data: null,
    });
  }

  return NextResponse.json({
    success: true,
    message: "GET method on /api/organization works!",
    data: organizations,
  });
}
