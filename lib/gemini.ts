const GEMINI_MODEL = "gemini-3.1-flash-image-preview";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export const COLORING_PROMPT =
  "Transform this photo into a clean black and white coloring book page for children. White background, black outlines only. Preserve the child's face clearly. No shading, no gray areas, just clean outlines suitable for coloring with crayons.";

export interface GeminiImageResponse {
  url: string;
  mimeType: string;
  base64: string;
}

export async function generateColoringPage(
  imageBase64: string,
  mimeType: string = "image/jpeg"
): Promise<GeminiImageResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  // Remover prefixo data:image/...;base64, se existir
  const base64Data = imageBase64.includes(",")
    ? imageBase64.split(",")[1]
    : imageBase64;

  const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: COLORING_PROMPT },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini error ${response.status}: ${errorText}`);
  }

  const result = await response.json();

  // Encontrar a parte com imagem na resposta
  const candidates = result.candidates?.[0]?.content?.parts;
  if (!candidates) {
    throw new Error("No candidates in Gemini response");
  }

  const imagePart = candidates.find(
    (part: { inline_data?: { mime_type: string; data: string } }) =>
      part.inline_data?.mime_type?.startsWith("image/")
  );

  if (!imagePart?.inline_data) {
    throw new Error("No image in Gemini response");
  }

  return {
    url: "",
    mimeType: imagePart.inline_data.mime_type,
    base64: imagePart.inline_data.data,
  };
}
