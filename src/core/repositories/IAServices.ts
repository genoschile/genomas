import { GoogleGenAI } from "@google/genai";
import { IAResponse, IAService } from "../interfaces/IA/IAService";
import { GOOGLE_API_KEY } from "@/lib/config/env";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

const model = "gemini-2.0-flash";

export class OpenAIService implements IAService {
  async suggestGroups(prompt: string): Promise<IAResponse> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        // Simulación de la llamada a la API (descomenta tu código real cuando lo necesites)
        // const response = await ai.models.generateContent({
        //   model: model,
        //   contents: `${prompt}`,
        // });

        // if (response.text === undefined) {
        //   console.error("Error:", response);
        //   resolve({
        //     success: false,
        //     error:
        //       "No se pudo procesar la consulta o no se encontró información relevante.",
        //   });
        //   return;
        // }

        // console.log("Response:", { response });

        // const groups = response.text
        //   .split("\n")
        //   .map((s) => s.trim())
        //   .filter((s) => s !== "");

        const simulatedResponse: IAResponse = { ...resType, success: true };
        resolve(simulatedResponse);
      }, 2000);
    });
  }
}

export const resType = {
  usuario: ["Soldado", "Cabo", "Sargento", "Suboficial", "Oficial"],
  grupos: ["Infantería", "Artillería", "Ingenieros"],
  acceso: ["Limitado", "Restringido", "Total"],
  message: "Consultas procesadas correctamente",
};
