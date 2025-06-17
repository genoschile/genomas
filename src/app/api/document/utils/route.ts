"use server";

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readdir, stat, rm } from "fs/promises";
import path from "path";
import os from "os";
import AdmZip from "adm-zip";
import * as tar from "tar";

interface FileProcessStatus {
  name: string;
  accepted: boolean;
  message: string;
  type: string;
  size?: number;
  tempPath?: string;
}

const config = {
  supportedArchiveExtensions: ["zip", "tar.gz"],
  supportedFileTypes: [
    "txt",
    "jpg",
    "jpeg",
    "png",
    "gif",
    "json",
    "csv",
    "xml",
    "pdf",
    "docx",
    "xlsx",
  ],
  maxIndividualFileSize: 10 * 1024 * 1024,
  maxArchiveFileSize: 50 * 1024 * 1024,
  maxFilesInArchive: 1000,
};

function isSupportedArchive(filename: string): boolean {
  const ext = filename.toLowerCase().endsWith(".tar.gz")
    ? "tar.gz"
    : path.extname(filename).replace(".", "").toLowerCase();
  return config.supportedArchiveExtensions.includes(ext);
}

function isSupportedFileExtension(filename: string): boolean {
  const ext = path.extname(filename).replace(".", "").toLowerCase();
  return config.supportedFileTypes.includes(ext);
}

function processZipFile(
  zipPath: string,
  extractDir: string
): FileProcessStatus[] {
  const zip = new AdmZip(zipPath);
  const filesStatus: FileProcessStatus[] = [];

  if (zip.getEntries().length > config.maxFilesInArchive) {
    return [
      {
        name: path.basename(zipPath),
        accepted: false,
        message: `El archivo ZIP contiene demasiados archivos (máx. ${config.maxFilesInArchive})`,
        type: "zip",
        size: 0,
      },
    ];
  }

  zip.extractAllTo(extractDir, true);

  for (const entry of zip.getEntries()) {
    if (entry.isDirectory) continue;

    const fileType =
      path.extname(entry.entryName).replace(".", "") || "unknown";
    const accepted = isSupportedFileExtension(entry.entryName);
    const message = accepted
      ? "Archivo extraído correctamente"
      : "Formato no soportado";
    const entryWithSizes = entry as typeof entry & { uncompressedSize: number };

    filesStatus.push({
      name: entry.entryName,
      accepted,
      message,
      type: fileType,
      size: entryWithSizes.uncompressedSize,
      tempPath: path.join(extractDir, entry.entryName),
    });
  }

  return filesStatus;
}

async function processTarGzFile(
  tarPath: string,
  extractDir: string
): Promise<FileProcessStatus[]> {
  try {
    await tar.x({ file: tarPath, cwd: extractDir });
  } catch (tarError) {
    console.error(`Error extrayendo tar.gz ${tarPath}:`, tarError);
    return [
      {
        name: path.basename(tarPath),
        accepted: false,
        message: `Error al extraer el archivo .tar.gz: ${tarError}`,
        type: "tar.gz",
      },
    ];
  }

  const files = await readdir(extractDir, { withFileTypes: true });
  const filesStatus: FileProcessStatus[] = [];
  let fileCount = 0;

  for (const file of files) {
    if (!file.isFile()) continue;
    if (fileCount >= config.maxFilesInArchive) {
      filesStatus.push({
        name: path.basename(tarPath),
        accepted: false,
        message: `El archivo .tar.gz contiene demasiados archivos (máx. ${config.maxFilesInArchive})`,
        type: "tar.gz",
        size: 0,
      });
      break;
    }

    const filePath = path.join(extractDir, file.name);
    const stats = await stat(filePath);
    const fileSize = stats.size;

    if (fileSize > config.maxIndividualFileSize) {
      filesStatus.push({
        name: file.name,
        accepted: false,
        message: `Archivo excede el tamaño máximo permitido (${(
          config.maxIndividualFileSize /
          1024 /
          1024
        ).toFixed(1)}MB)`,
        type: path.extname(file.name).replace(".", "") || "unknown",
        size: fileSize,
      });
      continue;
    }

    const fileType = path.extname(file.name).replace(".", "") || "unknown";
    const accepted = isSupportedFileExtension(file.name);

    filesStatus.push({
      name: file.name,
      accepted,
      message: accepted
        ? "Archivo extraído correctamente"
        : "Formato no soportado",
      type: fileType,
      size: fileSize,
      tempPath: filePath,
    });

    fileCount++;
  }

  return filesStatus;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const tempDir = os.tmpdir();
    const uploadDir = path.join(tempDir, `uploads_${Date.now()}`);
    const extractDir = path.join(tempDir, `extract_${Date.now()}`);

    await mkdir(uploadDir, { recursive: true });
    await mkdir(extractDir, { recursive: true });

    const filesStatus: FileProcessStatus[] = [];

    for (const entry of formData.entries()) {
      const file = entry[1];
      if (!(file instanceof File)) continue;

      const filename = file.name;

      if (file.size > config.maxArchiveFileSize) {
        filesStatus.push({
          name: filename,
          accepted: false,
          message: `Archivo excede el tamaño máximo permitido (${(
            config.maxArchiveFileSize /
            1024 /
            1024
          ).toFixed(1)}MB)`,
          type: path.extname(filename).replace(".", "") || "unknown",
          size: file.size,
        });
        continue;
      }

      if (!isSupportedArchive(filename)) {
        filesStatus.push({
          name: filename,
          accepted: false,
          message: "Formato de archivo comprimido no soportado",
          type: path.extname(filename).replace(".", "") || "unknown",
          size: file.size,
        });
        continue;
      }

      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

      if (filename.toLowerCase().endsWith(".zip")) {
        const zipFiles = processZipFile(filePath, extractDir);
        filesStatus.push(...zipFiles);
      } else if (filename.toLowerCase().endsWith(".tar.gz")) {
        const tarFiles = await processTarGzFile(filePath, extractDir);
        filesStatus.push(...tarFiles);
      }
    }

    // Limpieza opcional de directorios
    await rm(uploadDir, { recursive: true, force: true }).catch(() => {});
    // await rm(extractDir, { recursive: true, force: true }).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        message: "Archivos procesados correctamente",
        data: { files: filesStatus, jobId: extractDir },
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
