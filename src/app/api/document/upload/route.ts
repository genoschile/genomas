import { NextResponse } from "next/server";
import fs, { rm } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const filesRaw = formData.get("files");

    const jobId = formData.get("jobId");

    if (!filesRaw) {
      return NextResponse.json(
        { success: false, message: "No se encontraron archivos para subir." },
        { status: 400 }
      );
    }

    //  metadata
    const filesMeta: Array<{ name: string; tempPath: string }> = JSON.parse(
      filesRaw.toString()
    );

    const uploadFolder = path.join(process.cwd(), "uploads");
    await fs.mkdir(uploadFolder, { recursive: true });

    const savedFiles: string[] = [];

    for (const fileMeta of filesMeta) {
      const { name, tempPath } = fileMeta;

      // Validar que el archivo existe en el tempPath
      try {
        await fs.access(tempPath);
      } catch {
        console.warn(`Archivo no encontrado en tempPath: ${tempPath}`);
        continue; // Saltar si el archivo no existe
      }

      const destPath = path.join(uploadFolder, name);
      await fs.copyFile(tempPath, destPath);
      savedFiles.push(destPath);
    }

    if (savedFiles.length === 0) {
      console.error("Ningún archivo válido encontrado en los tempPath.");
      return NextResponse.json(
        {
          success: false,
          message:
            "Error interno: Ninguno de los archivos existe en el servidor temporal.",
        },
        { status: 500 }
      );
    }

    // await rm({ jobId }, { recursive: true, force: true }).catch(() => {});

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
      {
        success: false,
        message: "Error al procesar los archivos",
      },
      { status: 500 }
    );
  }
}
