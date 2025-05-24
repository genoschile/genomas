import { NextRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "Hello from test API!" });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    return NextResponse.json(
      { fileName: file.name, success: true, message: "File received" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error: ${error}`,
        success: false,
      },
      { status: 500 }
    );
  }

  // console.log('File:', file);

  // if (!file) {
  //   return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  // }

  // const buffer = Buffer.from(await file.arrayBuffer());
  // const jobId = "job-";

  // const vpsUploadEndpoint = 'http://IP_DEL_VPS:PORT/submit-job';
  // const vpsFormData = new FormData();

  // vpsFormData.append('file', new Blob([buffer]), file.name);
  // vpsFormData.append('jobId', jobId);

  // const response = await fetch(vpsUploadEndpoint, {
  //   method: 'POST',
  //   body: vpsFormData,
  // });

  // if (!response.ok) {
  //   return NextResponse.json({ error: 'VPS error' }, { status: 500 });
  // }

  // return NextResponse.json({ jobId });
}
