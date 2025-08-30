import { NextResponse } from "next/server";
import { openApiDoc } from "@/lib/openapi";

export function GET() {
  return NextResponse.json(openApiDoc);
}
