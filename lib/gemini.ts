const GEMINI_MODEL = "gemini-2.5-flash-image";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export const COLORING_PROMPT =
  "Transform this photo into a clean black and white coloring book page for children. White background, black outlines only. Preserve the child's face clearly. No shading, no gray areas, just clean outlines suitable for coloring with crayons.";

export interface GeminiImageResponse {
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
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["IMAGE"],
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini error ${response.status}: ${errorText}`);
  }

  const result = await response.json();

  const candidates = result.candidates?.[0]?.content?.parts;
  if (!candidates) {
    console.error("Gemini full response:", JSON.stringify(result, null, 2).slice(0, 500));
    throw new Error("No candidates in Gemini response");
  }

  // Gemini usa camelCase (inlineData) na resposta
  const imagePart = candidates.find(
    (part: { inlineData?: { mimeType: string; data: string } }) =>
      part.inlineData?.mimeType?.startsWith("image/")
  );

  if (!imagePart?.inlineData) {
    console.error("Gemini parts:", JSON.stringify(candidates.map((p: Record<string, unknown>) => Object.keys(p))));
    throw new Error("No image in Gemini response");
  }

  return {
    mimeType: imagePart.inlineData.mimeType,
    base64: imagePart.inlineData.data,
  };
}
