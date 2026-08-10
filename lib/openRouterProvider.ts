export interface OpenRouterProductionConfig {
  model: string;
  referenceImageBase64: string; // The Classic India poster
  userImageBase64: string;      // User test photo
  prompt: string;
}

export interface OpenRouterResult {
  imageUrl: string | null;
  generationTimeMs: number;
  reportedCost?: number;
  estimatedCost?: number;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    cost?: number;
  };
  error?: string;
  imageBuffer?: Buffer;
}

export async function generateOpenRouterImage(config: OpenRouterProductionConfig): Promise<OpenRouterResult> {
  const startTime = Date.now();
  let result: OpenRouterResult = {
    imageUrl: null,
    generationTimeMs: 0
  };

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is missing from environment variables.");
    }

    // Using the Unified OpenRouter Image API as required
    const endpoint = 'https://openrouter.ai/api/v1/images';
    
    const requestBody = {
      model: config.model,
      prompt: config.prompt,
      n: 1,
      // Pass the images natively as supported by the OpenRouter schema
      input_references: [
        { type: "image_url", image_url: { url: config.referenceImageBase64 } },
        { type: "image_url", image_url: { url: config.userImageBase64 } }
      ]
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://freedom2026.in',
        'X-Title': 'Freedom2026 AI'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter API error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    result.generationTimeMs = Date.now() - startTime;

    if (data.data && data.data[0]) {
      if (data.data[0].url) {
        result.imageUrl = data.data[0].url;
      } else if (data.data[0].b64_json) {
        const mimeType = data.data[0].media_type || 'image/png';
        result.imageUrl = `data:${mimeType};base64,${data.data[0].b64_json}`;
      }
    }

    if (!result.imageUrl) {
      throw new Error("Could not find image in OpenRouter response: " + JSON.stringify(data).substring(0, 200));
    }

    // Save actual buffer
    if (result.imageUrl.startsWith('data:')) {
      const b64 = result.imageUrl.split(',')[1];
      result.imageBuffer = Buffer.from(b64, 'base64');
    } else {
      const imgRes = await fetch(result.imageUrl);
      if (!imgRes.ok) {
        throw new Error(`Failed to download generated image from URL: ${result.imageUrl}`);
      }
      result.imageBuffer = Buffer.from(await imgRes.arrayBuffer());
    }

    // For cost logging (OpenRouter sometimes provides usage info on images)
    if (data.usage) {
      result.usage = data.usage;
      if (data.usage.cost !== undefined) {
        result.reportedCost = data.usage.cost;
      }
    }

  } catch (err: any) {
    result.generationTimeMs = Date.now() - startTime;
    result.error = err.message;
  }

  return result;
}
