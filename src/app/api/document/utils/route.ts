
"use server";

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readdir, stat, rm } from "fs/promises"; 
import path from "path";
import os from "os";
import AdmZip from "adm-zip";
import * as tar from "tar";

// --- 1. Centralización de Interfaces y Configuración ---

// Interfaz para el estado de cada archivo procesado
interface FileProcessStatus {
  name: string;
  accepted: boolean;
  message: string;
  type: string;
  size?: number; // Hacemos 'size' opcional porque no siempre se puede obtener fácilmente de archivos internos de un zip/tar.gz
}

// Objeto de configuración centralizada
const config = {
  // Extensiones de archivos comprimidos soportados
  supportedArchiveExtensions: ["zip", "tar.gz"],
  // Tipos de archivos individuales soportados dentro de los archivos comprimidos
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
  ], // Ejemplo: ampliado
  // Límite de tamaño para archivos individuales (ej. 10MB)
  maxIndividualFileSize: 10 * 1024 * 1024, // en bytes
  // Límite de tamaño para archivos comprimidos (ej. 50MB)
  maxArchiveFileSize: 50 * 1024 * 1024, // en bytes
  // Número máximo de archivos dentro de un archivo comprimido
  maxFilesInArchive: 1000,
};

// --- 2. Funciones de Validación ---

// Valida si la extensión del archivo original (el que se sube) es soportada
function isSupportedArchive(filename: string): boolean {
  const ext = filename.toLowerCase().endsWith(".tar.gz")
    ? "tar.gz"
    : path.extname(filename).replace(".", "").toLowerCase();
  return config.supportedArchiveExtensions.includes(ext);
}

// Valida si un archivo descomprimido es aceptable por su extensión
function isSupportedFileExtension(filename: string): boolean {
  const ext = path.extname(filename).replace(".", "").toLowerCase();
  return config.supportedFileTypes.includes(ext);
}

// --- 3. Funciones de Procesamiento de Archivos Comprimidos ---

// Procesa archivo ZIP y devuelve los archivos extraídos con su estado
function processZipFile(zipPath: string): FileProcessStatus[] {
  const zip = new AdmZip(zipPath);
  const filesStatus: FileProcessStatus[] = [];

  // Implementación de límite de archivos
  if (zip.getEntries().length > config.maxFilesInArchive) {
    filesStatus.push({
      name: path.basename(zipPath),
      accepted: false,
      message: `El archivo ZIP contiene demasiados archivos (máx. ${config.maxFilesInArchive})`,
      type: "zip",
      size: 0,
    });
    return filesStatus;
  }

  for (const entry of zip.getEntries()) {
    if (entry.isDirectory) continue;

    const fileType =
      path.extname(entry.entryName).replace(".", "") || "unknown";
    const accepted = isSupportedFileExtension(entry.entryName);
    const message = accepted
      ? "Archivo extraído correctamente"
      : "Formato no soportado";

    // --- CORRECCIÓN AQUÍ ---
    // Afirmación de tipo para decirle a TypeScript que entry tiene 'uncompressedSize'
    const entryWithSizes = entry as typeof entry & { uncompressedSize: number };
    const entrySize = entryWithSizes.uncompressedSize; // Ahora TypeScript lo acepta

    filesStatus.push({
      name: entry.entryName,
      accepted,
      message,
      type: fileType,
      size: entrySize,
    });
  }

  return filesStatus;
}

// Procesa archivo TAR.GZ y devuelve los archivos extraídos con su estado
async function processTarGzFile(
  tarPath: string,
  tempDir: string
): Promise<FileProcessStatus[]> {
  const extractDir = path.join(tempDir, `extract_${Date.now()}`);
  await mkdir(extractDir, { recursive: true });

  try {
    await tar.x({ file: tarPath, cwd: extractDir });
  } catch (tarError) {
    console.error(`Error extrayendo tar.gz ${tarPath}:`, tarError);
    try {
        const stats = await stat(extractDir);
        if (stats.isDirectory()) {
            const files = await readdir(extractDir);
            // La limpieza de archivos debe ser con unlink o rm.
            // path.join solo construye la ruta, no borra el archivo.
            // Si el objetivo es borrar el directorio, es mejor usar rm.
            // Para una limpieza simple de archivos que no pudieron ser extraídos completamente:
            for (const file of files) {
                await stat(path.join(extractDir, file)).then(s => {
                    if (s.isFile()) {
                        // Opcional: rm(path.join(extractDir, file)) // si quieres borrar archivos individuales
                    }
                }).catch(() => {}); // Maneja errores si el archivo desaparece, etc.
            }
            await rm(extractDir, { recursive: true, force: true }).catch(() => {}); // Borra el directorio, no solo sus contenidos
        }
    } catch (cleanupError) {
        console.warn(`Error durante la limpieza después de un fallo de extracción:`, cleanupError);
    }
    return [
      {
        name: path.basename(tarPath),
        accepted: false,
        message: `Error al extraer el archivo .tar.gz: ${tarError}`,
        type: "tar.gz",
      },
    ];
  }

  const filesInDir = await readdir(extractDir);
  const filesStatus: FileProcessStatus[] = [];
  let fileCount = 0;

  for (const name of filesInDir) {
    if (fileCount >= config.maxFilesInArchive) {
      filesStatus.push({
        name: path.basename(tarPath),
        accepted: false,
        message: `El archivo .tar.gz contiene demasiados archivos (máx. ${config.maxFilesInArchive})`,
        type: "tar.gz",
        size: 0,
      });
      break; // Salir del bucle si se supera el límite
    }

    const filePath = path.join(extractDir, name);
    let fileSize: number | undefined;
    try {
      const stats = await stat(filePath);
      if (stats.isFile()) {
        // Asegurarse de que es un archivo y no un directorio
        fileSize = stats.size;
        // Opcional: Validar tamaño individual aquí también
        if (fileSize > config.maxIndividualFileSize) {
          filesStatus.push({
            name: name,
            accepted: false,
            message: `Archivo excede el tamaño máximo permitido (${(
              config.maxIndividualFileSize /
              (1024 * 1024)
            ).toFixed(1)}MB)`,
            type: path.extname(name).replace(".", "") || "unknown",
            size: fileSize,
          });
          continue; // Saltar este archivo
        }
      } else {
        // Ignorar directorios o manejar de otra forma
        continue;
      }
    } catch (err) {
      console.warn(`No se pudo obtener el tamaño de ${filePath}:`, err);
      // Continúa sin el tamaño si hay un error
    }

    const fileType = path.extname(name).replace(".", "") || "unknown";
    const accepted = isSupportedFileExtension(name);

    filesStatus.push({
      name,
      accepted,
      message: accepted
        ? "Archivo extraído correctamente"
        : "Formato no soportado",
      type: fileType,
      size: fileSize, // Añadimos el tamaño obtenido
    });
    fileCount++;
  }

  // Opcional: Limpiar el directorio extraído después de procesar
  // Aunque es temporal, es buena práctica para evitar acumulaciones
  // rm(extractDir, { recursive: true, force: true });

  return filesStatus;
}

// --- 4. La Ruta API POST ---

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const tempDir = os.tmpdir();
    const uploadDir = path.join(tempDir, `uploads_${Date.now()}`); // Directorio para los archivos subidos (no extraídos)

    await mkdir(uploadDir, { recursive: true });

    const filesStatus: FileProcessStatus[] = [];

    for (const entry of formData.entries()) {
      const file = entry[1];

      // Asegurarse de que el elemento es una instancia de File (para TypeScript)
      if (!(file instanceof File)) continue;

      const filename = file.name;

      // Validar tamaño del archivo original antes de escribirlo
      if (file.size > config.maxArchiveFileSize) {
        filesStatus.push({
          name: filename,
          accepted: false,
          message: `Archivo excede el tamaño máximo permitido (${(
            config.maxArchiveFileSize /
            (1024 * 1024)
          ).toFixed(1)}MB)`,
          type: path.extname(filename).replace(".", "") || "unknown",
          size: file.size,
        });
        continue; // Saltar este archivo y pasar al siguiente
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
        const zipFiles = processZipFile(filePath);
        filesStatus.push(...zipFiles);
      } else if (filename.toLowerCase().endsWith(".tar.gz")) {
        const tarFiles = await processTarGzFile(filePath, tempDir); // tempDir es el lugar para extraer
        filesStatus.push(...tarFiles);
      }
    }

    // todo: Limpiar el directorio 
    // rm(uploadDir, { recursive: true, force: true }); 

    return NextResponse.json(
      {
        success: true,
        message: "Archivos procesados correctamente",
        data: { files: filesStatus },
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
