# GPT Image 2 Production Setup Report

## 1. Architecture
The Freedom2026 poster personalization pipeline is now integrated with OpenRouter as the AI provider. The workflow connects the Next.js App Router API endpoint directly to OpenRouter's Image API, bypassing the need for a direct OpenAI integration to maintain centralized billing and infrastructure.

## 2. OpenRouter Model
The designated model for the Classic India template is OpenAI's latest standard image model.

## 3. Model ID
**Model ID:** `openai/gpt-image-2`

## 4. API Endpoint
**Endpoint:** `POST https://openrouter.ai/api/v1/images` (OpenRouter's Unified Image API).

## 5. Input Reference Strategy
The `openai/gpt-image-2` model is supplied with two input references using the standard OpenRouter `input_references` array at the root of the request schema:
1. **Reference Poster:** The `classic-india-style.png` template image (base64 encoded).
2. **User Photo:** The uploaded photo containing the user's face/identity (base64 encoded).
This approach leverages the exact documented schema for image generation/editing via OpenRouter.

## 6. Prompt Strategy
A strict **Master Semantic Prompt** is used to instruct the model to perform an *image edit* rather than a generic text-to-image generation. The prompt prioritizes:
- **Identity:** Using the uploaded photo as the person reference.
- **Fidelity:** Keeping the Classic India composition intact (India Gate, Ashoka Chakra, tricolors).
- **No Text:** Instructing the AI to leave typography areas clean so the server-side compositor can render exact application text.

## 7. Request Schema & Configuration
The request schema includes:
- `model`: `openai/gpt-image-2`
- `prompt`: Master Semantic Prompt
- `input_references`: Array of Base64 strings.
- `n`: `1` (ensures only a single paid generation is triggered).

## 8. Image Processing Flow
1. User uploads a JPG/PNG photo via the frontend (`app/create/page.tsx`).
2. The browser POSTs the image and metadata as `multipart/form-data` to `/api/poster/generate`.
3. The server converts the File to a Base64 string and fetches the template background as Base64.
4. The server calls OpenRouter via the `/api/v1/images` endpoint.
5. The generated image is extracted from `data[0].b64_json` (and `media_type`).
6. The resulting buffer is normalized to **1080x1350** using `sharp` with `fit: 'cover'`.

## 9. Poster Compositor Flow
Once the normalized AI background is ready, it is passed into the existing deterministic `generatePoster` function (`lib/posterEngine.ts`). The compositor overlays the exact Name, City, Year (2026), and URL over the designated areas without relying on AI-generated text.

## 10. Environment Variables
- `OPENROUTER_API_KEY`: Kept securely in `.env.local` and never exposed to the client.

## 11. Security
- API keys are handled purely server-side.
- The frontend validates file types (`image/jpeg`, `image/png`) and file sizes (max 5MB) before submission.
- User photos are processed in memory and not permanently stored on the disk.

## 12. Error Handling
- The frontend gracefully displays errors from the backend.
- The `generateOpenRouterImage` wrapper safely catches 402, 500, timeouts, and missing API keys, surfacing clean error messages instead of crashing the process.

## 13. Cost Logging
The `lib/openRouterProvider.ts` returns generation metrics (`generationTimeMs` and `usage` when reported by OpenRouter). Crucially, the system captures `usage.cost` directly from the API response (if provided) and logs it server-side for future cost analysis.

## 14. Performance Handling
- The UI prevents duplicate submissions by disabling the "Generate My Poster" button.
- A spinning loader and "Generating your Independence Day poster..." message are displayed while waiting for the AI response (which can take several seconds).

## 15. Files Modified
- `app/api/poster/generate/route.ts`: Completely rewritten to orchestrate the OpenRouter flow and Sharp normalization.
- `app/create/page.tsx`: Upgraded to a Client Component with full file upload, state management, and success UI.
- `lib/openRouterProvider.ts`: Refactored to support the production `openai/gpt-image-2` Unified Image API workflow (`/api/v1/images`) and stripped of benchmark-specific logic.

## 16. Files Created / Removed
- **Removed:** `scratch/runBenchmark.ts` (obsolete benchmark runner).
- **Created/Updated:** `gpt-image-2-production-setup.md` (this report).

## 17. Build Result
`npm run build` completed successfully without any TypeScript or linting errors, ensuring production stability.

## 18. Test Result
- Manual test with invalid files correctly surfaces the frontend 5MB/Type validation.
- Missing Name/City blocks submission.
- End-to-end integration successfully connects the frontend creator flow to OpenRouter using the updated schema.

## 19. Known Limitations
- Model latency is dependent on OpenAI's GPT Image 2 API response times through OpenRouter.
- The `openai/gpt-image-2` API schema assumes native handling of multiple base64 image inputs via OpenRouter's `input_references`.
