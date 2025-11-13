import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { projectId, files } = await req.json();

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: "Falta el projectId" },
        { status: 400 }
      );
    }

    const fileArray = Array.isArray(files) ? files : [files];

    if (fileArray.length === 0) {
      return NextResponse.json(
        { success: false, error: "No se recibieron archivos" },
        { status: 400 }
      );
    }

    console.log(files);

    //     [
    //   {
    //     filename: 'InterativeGenome.zip',
    //     path: 'organization/org-123/workspace/ws-456/project/proj-789/input/1763037834168-InterativeGenome.zip',
    //     fileType: 'FASTQ',
    //     fileRole: 'input'
    //   }
    // ]

    console.log(
      "📂 Registrando archivos:",
      fileArray.length,
      "para proyecto:",
      projectId
    );

    // llamar service para guardar en BD
    // await saveFilesToDB(projectId, fileArray);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error al registrar archivos:", error);
    return NextResponse.json(
      { success: false, error: "DB error" },
      { status: 500 }
    );
  }
}
