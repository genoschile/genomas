import { NextResponse } from "next/server";
import { openApiDoc } from "@/features/doc_api/openapi";

export function GET() {
  return NextResponse.json(openApiDoc);
}
