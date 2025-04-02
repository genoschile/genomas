"use server";

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readdir } from "fs/promises";
import path from "path";
import os from "os";
import AdmZip from "adm-zip";
import * as tar from "tar";

export async function POST(req: NextRequest) {
  console.log("✅ Recibiendo archivos...");

  try {
    const formData = await req.formData();
    const tempDir = os.tmpdir();
    const uploadDir = path.join(tempDir, `uploads_${Date.now()}`);
    await mkdir(uploadDir, { recursive: true });

    const extractedFiles: { name: string; type: string }[] = [];

    for (const entry of formData.entries()) {
      const file = entry[1];
      if (!(file instanceof File)) continue;

      const filePath = path.join(uploadDir, file.name);
      await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

      if (file.name.endsWith(".zip")) {
        console.log(`📦 Descomprimiendo ZIP: ${file.name}`);
        const zip = new AdmZip(filePath);
        zip.getEntries().forEach((entry) => {
          if (!entry.isDirectory) {
            extractedFiles.push({
              name: entry.entryName,
              type: path.extname(entry.entryName).replace(".", "") || "unknown",
            });
          }
        });
      } else if (file.name.endsWith(".tar.gz")) {
        console.log(`📦 Descomprimiendo TAR.GZ: ${file.name}`);
        const extractDir = path.join(tempDir, `extract_${Date.now()}`);
        await mkdir(extractDir, { recursive: true });
        await tar.x({ file: filePath, cwd: extractDir });

        const filesInDir = await readdir(extractDir);
        filesInDir.forEach((name) => {
          extractedFiles.push({
            name,
            type: path.extname(name).replace(".", "") || "unknown",
          });
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Archivos procesados correctamente",
        data: { files: extractedFiles },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("⚠️ Error en la API:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
