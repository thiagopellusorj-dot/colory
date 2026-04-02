const GEMINI_MODEL = "gemini-2.5-flash-image";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const BASE_INSTRUCTIONS = "The output image MUST be in vertical portrait orientation (3:4 aspect ratio, taller than wide, like an A4 page). Preserve ALL people, pets, and elements visible in the photo — not just the child. White background. Leave some white margin around the edges for printing.";

export const STYLE_PROMPTS: Record<string, string> = {
  simple: `Transform this photo into a simple black and white coloring book page for young children. Use clean, thick outlines with minimal detail. Few lines, large areas to color, very kid-friendly. No shading, no gray areas. ${BASE_INSTRUCTIONS}`,
  detailed: `Transform this photo into a detailed black and white coloring book page. Include background elements and scenery (toys, nature, room elements). Rich in details but still suitable for coloring. Black outlines only, no shading. ${BASE_INSTRUCTIONS}`,
  minimalist: `Transform this photo into a minimalist line art drawing. Use very few elegant lines to capture the essence of the scene and all subjects. Artistic and clean, like a modern illustration. Thin delicate lines, lots of white space. No shading. ${BASE_INSTRUCTIONS}`,
  ink: `Transform this photo into a bold ink-style illustration. Use strong, confident brush-like strokes with varying line weights. High contrast black lines on white, resembling traditional ink drawing or woodcut print style. Artistic and expressive. ${BASE_INSTRUCTIONS}`,
};

export const COLORING_PROMPT = STYLE_PROMPTS.simple;

export interface GeminiImageResponse {
  mimeType: string;
  base64: string;
}

export async function generateColoringPage(
  imageBase64: string,
  mimeType: string = "image/jpeg",
  estilo: string = "simple"
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
            { text: STYLE_PROMPTS[estilo] || STYLE_PROMPTS.simple },
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
