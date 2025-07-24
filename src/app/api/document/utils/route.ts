// src/app/api/document/extract/route.ts
"use server";

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readdir, stat } from "fs/promises";
import path from "path";
import os from "os";
import AdmZip from "adm-zip";
import * as tar from "tar";

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
  return (
    filename.toLowerCase().endsWith(".tar.gz") ||
    filename.toLowerCase().endsWith(".zip")
  );
}

function isSupportedFileExtension(filename: string): boolean {
  return config.supportedFileTypes.includes(
    path.extname(filename).replace(".", "").toLowerCase()
  );
}

async function processZipFile(zipPath: string, extractDir: string) {
  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();
  if (entries.length > config.maxFilesInArchive) {
    return [];
  }

  zip.extractAllTo(extractDir, true);
  return entries
    .filter((e) => !e.isDirectory)
    .map((entry) => ({
      name: entry.entryName,
      accepted: isSupportedFileExtension(entry.entryName),
    }));
}

async function processTarGzFile(tarPath: string, extractDir: string) {
  await tar.x({ file: tarPath, cwd: extractDir });
  const files = await readdir(extractDir);
  return await Promise.all(
    files.map(async (file) => ({
      name: file,
      accepted: isSupportedFileExtension(file),
    }))
  );
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const jobId = `extract_${Date.now()}`;
    const extractDir = path.join(process.cwd(), "tmp-extracted", jobId);
    await mkdir(extractDir, { recursive: true });

    const fileStatuses = [];

    for (const entry of formData.entries()) {
      const file = entry[1];
      if (!(file instanceof File)) continue;

      const filename = file.name;
      if (!isSupportedArchive(filename)) continue;

      const tempUploadPath = path.join(extractDir, filename);
      await writeFile(tempUploadPath, Buffer.from(await file.arrayBuffer()));

      const extracted = filename.endsWith(".zip")
        ? await processZipFile(tempUploadPath, extractDir)
        : await processTarGzFile(tempUploadPath, extractDir);

      fileStatuses.push(...extracted);
    }

    return NextResponse.json({
      success: true,
      message: "Archivos procesados correctamente",
      data: {
        jobId,
        files: fileStatuses,
      },
    });
  } catch (err) {
    console.error("Error al procesar archivo:", err);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
