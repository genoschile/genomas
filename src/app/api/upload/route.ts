import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_BUCKET_NAME,
  AWS_SECRET_ACCESS_KEY,
} from "@lib/config/env";

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const maxSizeMB = Number(process.env.MAX_FILE_SIZE_MB || 50);
  const sizeMB = file.size / (1024 * 1024);

  if (sizeMB > maxSizeMB) {
    return NextResponse.json(
      {
        error: `File too large (${sizeMB.toFixed(2)} MB). Max ${maxSizeMB} MB.`,
      },
      { status: 400 }
    );
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const key = `uploads/${Date.now()}-${file.name}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      })
    );

    return NextResponse.json({ success: true, key });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
