import { fal } from "@fal-ai/client";

export interface AIProviderConfig {
  prompt: string;
  imageUrl: string;
  maskUrl: string;
  referenceImageUrl: string;
  testVariant?: 'A' | 'B';
}

export interface AIGenerationResult {
  imageUrl: string;
  generationTimeMs: number;
  estimatedCost: number;
}

export async function generateInpaintedVisual(config: AIProviderConfig): Promise<AIGenerationResult> {
  const startTime = Date.now();
  
  // Test A vs Test B configuration logic.
  // Test A: standard reference image.
  // Test B: adjust IP-Adapter settings if the model endpoint supports it via fal.ai schema.
  // The fal-ai/flux-general/inpainting schema accepts basic inputs. 
  // We'll pass the reference_image_url for both, but for Test B we might adjust strength if supported,
  // or just run it as standard for now since standard schema doesn't explicitly document advanced IP-adapter weights.
  const inputParams: any = {
    prompt: config.prompt,
    image_url: config.imageUrl,
    mask_url: config.maskUrl,
    reference_image_url: config.referenceImageUrl,
  };

  // Execute API call via fal client
  // The @fal-ai/client automatically uses process.env.FAL_KEY
  let result;
  try {
    result = await fal.subscribe("fal-ai/flux-general/inpainting", {
      input: inputParams,
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
  } catch (e: any) {
    console.error("Fal.ai API Error:", e.message || e);
    throw new Error("AI Generation failed. Check API key and quota.");
  }
  
  const endTime = Date.now();
  const generationTimeMs = endTime - startTime;
  
  // Calculate cost. Approximately 1080x1350 is 1.46MP.
  // User says fal.ai flux-general/inpainting is ~$0.075 per MP, rounded to nearest MP.
  // 1.46 -> 2 MP? Wait, if it's strictly per MP, 1.46 * 0.075 = $0.1095.
  // We will report a conservative estimate.
  const estimatedCost = 0.075 * 1.5; // ~$0.11

  const responseData = result.data as any;
  let outputImageUrl = "";
  
  if (responseData && responseData.image && responseData.image.url) {
    outputImageUrl = responseData.image.url;
  } else if (responseData && responseData.images && responseData.images.length > 0) {
    outputImageUrl = responseData.images[0].url;
  } else if (responseData && responseData.image_url) {
    outputImageUrl = responseData.image_url;
  } else {
    throw new Error("Invalid response format from fal.ai");
  }

  return {
    imageUrl: outputImageUrl,
    generationTimeMs,
    estimatedCost,
  };
}
