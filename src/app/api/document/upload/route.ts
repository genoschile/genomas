import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { useCaseProject } from "@/core/instances";

/* Los archivos con el mismo nombre se sobrescriben */

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const jobId = formData.get("jobId")?.toString();
    const organizationId = formData.get("organizationId")?.toString();
    const workspaceId = formData.get("workspaceId")?.toString();
    const projectId = formData.get("projectId")?.toString();

    if (!jobId || !organizationId || !workspaceId || !projectId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Faltan datos: jobId, organizationId, workspaceId o projectId.",
        },
        { status: 400 }
      );
    }

    const extractDir = path.join(process.cwd(), "tmp-extracted", jobId);

    let filesInDir: string[];
    try {
      filesInDir = await fs.readdir(extractDir);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "El jobId no es válido o el directorio no existe.",
        },
        { status: 400 }
      );
    }

    if (filesInDir.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No se encontraron archivos en el directorio temporal.",
        },
        { status: 400 }
      );
    }

    const uploadFolder = path.join(
      process.cwd(),
      "uploads",
      organizationId,
      workspaceId,
      projectId
    );

    await fs.mkdir(uploadFolder, { recursive: true });

    const savedFiles = [];

    for (const fileName of filesInDir) {
      const srcPath = path.join(extractDir, fileName);
      const stats = await fs.stat(srcPath);

      if (stats.isDirectory()) {
        console.warn(`Omitiendo directorio: ${fileName}`);
        continue;
      }

      const destPath = path.join(uploadFolder, fileName);
      await fs.copyFile(srcPath, destPath);

      const extension = path.extname(fileName).replace(".", "").toLowerCase();
      const mimeType =
        extension === "pdf"
          ? "application/pdf"
          : extension === "txt"
          ? "text/plain"
          : extension === "csv"
          ? "text/csv"
          : "application/octet-stream";

      savedFiles.push({
        name: fileName,
        extension,
        mimeType,
        size: stats.size,
        url: `/uploads/${organizationId}/${workspaceId}/${projectId}/${fileName}`,
        projectId,
        workspaceId,
        organizationId,
        createdAt: new Date().toISOString(),
      });
    }

    const projectFiles = await useCaseProject.addFilesToProject(
      projectId,
      savedFiles
    );

    /* 🧹 */
    await fs.rm(extractDir, { recursive: true, force: true });

    if (!projectFiles) {
      return NextResponse.json(
        { success: false, message: "Error al guardar los archivos en el proyecto." },
        { status: 500 }
      );
    }
    if (projectFiles.length === 0) {
      return NextResponse.json(
        { success: false, message: "No se guardaron archivos en el proyecto." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${savedFiles.length} archivos guardados correctamente.`,
      data: {
        files: savedFiles,
      },
    });


  } catch (err) {
    console.error("Error al guardar archivos:", err);
    return NextResponse.json(
      { success: false, message: "Error al procesar los archivos" },
      { status: 500 }
    );
  }
}
