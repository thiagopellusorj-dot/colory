const KIE_API_URL = "https://api.kie.ai/api/v1/jobs/createTask";

export const KIE_PROMPT =
  "Transform this photo into a clean black and white coloring book page for children. White background, black outlines only. Preserve the child's face clearly.";

export interface KieCreateTaskResponse {
  code: number;
  msg: string;
  data: {
    task_id: string;
  } | null;
}

export async function createKieTask(
  imageUrl: string,
  callbackUrl: string
): Promise<KieCreateTaskResponse> {
  const apiKey = process.env.KIE_API_KEY;
  if (!apiKey) {
    throw new Error("KIE_API_KEY not configured");
  }

  const response = await fetch(KIE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "nano-banana-2",
      callBackUrl: callbackUrl,
      input: {
        prompt: KIE_PROMPT,
        image_input: [imageUrl],
        aspect_ratio: "1:1",
        resolution: "1K",
        output_format: "png",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Kie.ai error ${response.status}: ${errorText}`);
  }

  return response.json();
}
