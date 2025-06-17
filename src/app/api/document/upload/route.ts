import { NextResponse } from "next/server";
import formidable, { Files } from "formidable";
import { IncomingMessage } from "http";
import fs from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseForm(
  req: IncomingMessage
): Promise<{ fields: any; files: Files }> {
  const form = formidable({
    multiples: true,
    maxFileSize: 2 * 1024 * 1024 * 1024, // 2GB
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(req: Request) {
  try {
    // TypeScript no sabe que req es IncomingMessage
    // @ts-ignore
    const { fields, files } = await parseForm(req);

    console.log("📝 Campos:", fields);
    console.log("📁 Archivos:", files);

    const uploadFolder = path.join(process.cwd(), "uploads");
    await fs.mkdir(uploadFolder, { recursive: true });

    const savedFiles: string[] = [];

    for (const key of Object.keys(files)) {
      const fileData = files[key];
      if (!fileData) continue;
      const fileArray = Array.isArray(fileData) ? fileData : [fileData];

      for (const file of fileArray) {
        const destPath = path.join(
          uploadFolder,
          file.originalFilename || file.newFilename
        );
        await fs.copyFile(file.filepath, destPath);
        savedFiles.push(destPath);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Archivos guardados en el servidor",
      files: savedFiles,
    });
  } catch (err) {
    console.error("❌ Upload error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Error al procesar el archivo",
      },
      { status: 500 }
    );
  }
}
