import { GoogleGenAI } from "@google/genai";
import { IAService } from "../interfaces/IA/IAService";
import { GOOGLE_API_KEY } from "@/lib/config/env";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

const model = "gemini-2.0-flash";

export class OpenAIService implements IAService {
  async suggestGroups(prompt: string): Promise<string[]> {
    const response = await ai.models.generateContent({
      model: model,
      contents: `${prompt}`,
    });

    if (response.text === undefined) {
      console.error("Error:", response);
      return [];
    }

    const groups = response.text
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    return groups;
  }
}
