import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_BUCKET_NAME,
  AWS_SECRET_ACCESS_KEY,
} from "@/config/env";

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const DATA = {
  organizationId: "org-123",
  workspaceId: "ws-456",
  projectId: "proj-789",
  fileRole: "input",
};

export async function POST(request: Request) {
  try {
    const { fileName, fileType, expireSeconds } = await request.json();

    const { organizationId, workspaceId, projectId, fileRole } = DATA;

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: "Missing file name or type" },
        { status: 400 }
      );
    }

    const expiresIn = Math.min(Number(expireSeconds) || 300, 3600); // máximo 1 hora

    const key = [
      "organization",
      organizationId,
      "workspace",
      workspaceId,
      "project",
      projectId,
      fileRole.toLowerCase(), // "input", "output", etc.
      `${Date.now()}-${fileName}`, // evita colisiones
    ].join("/");

    const command = new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn });

    return NextResponse.json({ url: signedUrl, key, expiresIn });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    return NextResponse.json(
      { error: "Error generating URL" },
      { status: 500 }
    );
  }
}
