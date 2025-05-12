import { GoogleGenAI } from "@google/genai";
import { IAResponse, IAService } from "../interfaces/IA/IAService";
import { GOOGLE_API_KEY } from "@/lib/config/env";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

const model = "gemini-2.0-flash";

export class OpenAIService implements IAService {
  async suggestGroups(prompt: string): Promise<IAResponse> {
    // const response = await ai.models.generateContent({
    //   model: model,
    //   contents: `${prompt}`,
    // });

    // if (response.text === undefined) {
    //   console.error("Error:", response);
    //   return {
    //     success: false,
    //     error:
    //       "No se pudo procesar la consulta o no se encontró información relevante.",
    //   };
    // }

    // console.log("Response:", { response });

    // const groups = response.text
    //   .split("\n")
    //   .map((s) => s.trim())
    //   .filter((s) => s !== "");

    return { ...resType, success: true };
  }
}

export const resType = {
  usuario: ["Soldado", "Cabo", "Sargento", "Suboficial", "Oficial"],
  grupos: ["Infantería", "Artillería", "Ingenieros"],
  acceso: ["Limitado", "Restringido", "Total"],
  message: "Consultas procesadas correctamente",
};
