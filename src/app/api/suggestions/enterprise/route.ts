import { OpenAIService } from "@/core/repositories/IAServices";
import { SuggestGroupsUseCase } from "@/core/use-cases/suggestionsIA/suggestionsGroups";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const prompt = body.prompt;

  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  const iaService = new OpenAIService();
  const useCase = new SuggestGroupsUseCase(iaService);

  const suggestions = await useCase.execute(prompt);

  return NextResponse.json({ suggestions });
}