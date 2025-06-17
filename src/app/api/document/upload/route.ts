// src/app/api/document/upload/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const jobId = formData.get("jobId")?.toString();

    if (!jobId) {
      return NextResponse.json(
        { success: false, message: "No se proporcionó jobId." },
        { status: 400 }
      );
    }

    // 👇 Asegúrate que este path es donde se guardaron los archivos descomprimidos
    const extractDir = path.join(process.cwd(), "tmp-extracted", jobId);

    let filesInDir: string[];
    try {
      filesInDir = await fs.readdir(extractDir);
    } catch {
      return NextResponse.json(
        { success: false, message: "El jobId no es válido o el directorio no existe." },
        { status: 400 }
      );
    }

    if (filesInDir.length === 0) {
      return NextResponse.json(
        { success: false, message: "No se encontraron archivos en el directorio temporal." },
        { status: 400 }
      );
    }

    const uploadFolder = path.join(process.cwd(), "uploads");
    await fs.mkdir(uploadFolder, { recursive: true });

    const savedFiles: { name: string; path: string }[] = [];

    for (const fileName of filesInDir) {
      const srcPath = path.join(extractDir, fileName);
      const stats = await fs.stat(srcPath);

      if (stats.isDirectory()) {
        console.warn(`Omitiendo directorio: ${fileName}`);
        continue;
      }

      const destPath = path.join(uploadFolder, fileName);
      await fs.copyFile(srcPath, destPath);
      savedFiles.push({
        name: fileName,
        path: destPath,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        files: savedFiles,
      },
      message: "Archivos guardados en el servidor",
    });
  } catch (err) {
    console.error("Error al guardar archivos:", err);
    return NextResponse.json(
      { success: false, message: "Error al procesar los archivos" },
      { status: 500 }
    );
  }
}
