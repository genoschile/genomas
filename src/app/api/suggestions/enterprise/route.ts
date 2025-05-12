import { OpenAIService } from "@/core/repositories/IAServices";
import { SuggestGroupsUseCase } from "@/core/use-cases/suggestionsIA/suggestionsGroups";
import { NextRequest, NextResponse } from "next/server";

export const prompt = (
  userInput: string
) => `Quiero que la respuesta sea un objeto JSON con la siguiente estructura:

{
  "usuario": ["lista de nombres de usuario relacionados con la consulta"],
  "grupos": ["lista de nombres de grupos relevantes para la consulta"],
  "acceso": ["lista de permisos o niveles de acceso asociados a la consulta"]
}

Basándote en la siguiente entrada del usuario: "${userInput}"

**Instrucciones adicionales:**

* Analiza cuidadosamente la entrada del usuario para identificar usuarios, grupos y niveles de acceso relevantes.
* Si no encuentras información relevante para alguna de las categorías (usuario, grupos, acceso), el valor de esa clave en el JSON debe ser un array vacío \`[]\`.
* Si la entrada del usuario no tiene sentido o no se puede extraer información útil para ninguna de las categorías, devuelve un objeto JSON con el siguiente formato indicando un error:

    \`\`\`json
    {
      "error": "No se pudo procesar la consulta o no se encontró información relevante."
    }
    \`\`\`

* Asegúrate de que la respuesta sea **siempre** un objeto JSON válido y legible por una máquina. No incluyas texto adicional fuera del objeto JSON.
* Prioriza la precisión. Si no estás seguro de una respuesta, es preferible devolver un array vacío para esa categoría en lugar de información incorrecta.
`;

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("Received body:", body);

  const messages = body.messages;

  if (!messages) {
    return NextResponse.json(
      { error: "Missing or invalid messages" },
      { status: 400 }
    );
  }

  const { content } = messages;

  const iaService = new OpenAIService();
  const useCase = new SuggestGroupsUseCase(iaService);
  const suggestions = await useCase.execute(prompt(content));

  const { success, error, message } = suggestions;

  if (!success) {
    return NextResponse.json(
      { error: error || "An unknown error occurred" },
      { status: 500 }
    );
  }

  if (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
  if (message) {
    return NextResponse.json({ message: message }, { status: 200 });
  }
}
