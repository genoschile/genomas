import { useCaseUser } from "@/core/instances";
import { use } from "react";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const idUser = (await params).id;

  try {
    const currentProjectsByUserId = await useCaseUser.currentProjectsByUserId(
      idUser
    );

    return new Response(
      JSON.stringify({
        data: currentProjectsByUserId,
        success: true,
        message: "Projects found successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching projects:", error);

    return new Response(
      JSON.stringify({
        message: "Error fetching projects",
        success: false,
      }),
      {
        status: 500,
      }
    );
  }
}
