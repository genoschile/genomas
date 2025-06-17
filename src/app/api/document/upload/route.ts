import { NextResponse } from "next/server";
import fs, { rm } from "fs/promises";
import path from "path";
import os from "os";

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

    // Reconstruir el path temporal del job
    const tempDir = path.join(os.tmpdir(), jobId);

    // Leer los archivos en el directorio temporal
    let filesInTemp: string[] = [];
    try {
      filesInTemp = await fs.readdir(tempDir);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "El jobId no es válido o el directorio no existe.",
        },
        { status: 400 }
      );
    }

    if (filesInTemp.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No se encontraron archivos en el directorio temporal.",
        },
        { status: 400 }
      );
    }

    // Crear el directorio final de uploads
    const uploadFolder = path.join(process.cwd(), "uploads");
    await fs.mkdir(uploadFolder, { recursive: true });

    const savedFiles: string[] = [];

    // Copiar los archivos del temp al destino final
    for (const fileName of filesInTemp) {
      const tempPath = path.join(tempDir, fileName);
      const destPath = path.join(uploadFolder, fileName);

      await fs.copyFile(tempPath, destPath);
      savedFiles.push(destPath);
    }

    // Limpieza opcional del directorio temporal
    await rm(tempDir, { recursive: true, force: true }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Archivos guardados en el servidor",
      files: savedFiles,
      data: {
        files: savedFiles.map((filePath) => ({
          name: path.basename(filePath),
          path: filePath,
        })),
      },
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, message: "Error al procesar los archivos" },
      { status: 500 }
    );
  }
}
