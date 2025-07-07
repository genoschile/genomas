import { GoogleGenAI } from "@google/genai";
import { IAResponse, IAService } from "../interfaces/IA/IAService";
import { GOOGLE_API_KEY } from "@/lib/config/env";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

const model = "gemini-2.0-flash";

export class OpenAIService implements IAService {
  async suggestGroups(prompt: string): Promise<IAResponse> {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error("No se recibió texto de respuesta de Gemini.");
    }

    const promptSuggestions = text
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    return {
      success: true,
      message: "Consulta procesada correctamente",
      prompt: promptSuggestions,
    };
  }
}
