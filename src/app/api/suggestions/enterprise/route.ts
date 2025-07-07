import { useCaseSuggestions } from "@/core/instances";
import { NextRequest, NextResponse } from "next/server";

const prompt = (
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
  try {
    const body = await req.json();
    const messages = body.messages;

    if (!messages) {
      return NextResponse.json(
        { error: "Missing or invalid messages" },
        { status: 400 }
      );
    }

    const { role, content } = messages;

    const suggestions = await useCaseSuggestions.execute(role, prompt(content));

    const { success, message, prompt: responsePrompt, error } = suggestions;

    if (!suggestions) {
      return NextResponse.json(
        { success: false, error: "No suggestions found" },
        { status: 404 }
      );
    }

    if (!suggestions.success) {
      console.error("Error in suggestions:", suggestions.error);
      return NextResponse.json(
        {
          success: false,
          error: suggestions.error || "Failed to process the request",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Consulta procesada correctamente",
      prompt: responsePrompt,
    });
  } catch (err) {
    console.error("Internal server error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
