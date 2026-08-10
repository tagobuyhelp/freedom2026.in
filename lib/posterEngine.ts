import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import path from 'path';
import { TEMPLATES } from '@/data/templates';
import sharp from 'sharp';

// Helper to draw text that fits within a max width
function drawFittedText(
  ctx: any,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  defaultSize: number,
  fontFace: string,
  color: string
) {
  let size = defaultSize;
  ctx.font = `bold ${size}px ${fontFace}`;
  while (ctx.measureText(text).width > maxWidth && size > 16) {
    size -= 2;
    ctx.font = `bold ${size}px ${fontFace}`;
  }
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

export async function generatePoster(
  templateId: string,
  name: string,
  city: string,
  aiBackgroundBuffer: Buffer
): Promise<Buffer> {
  const template = TEMPLATES.find((t) => t.id === templateId);
  if (!template || !template.canvasConfig) {
    throw new Error(`Template ${templateId} not found or missing canvasConfig`);
  }

  // The AI generated image will be dynamically provided, and we must ensure it matches our target dimensions.
  const { width, height, personArea } = template.canvasConfig;

  // 1. Process the AI generated background to strictly enforce output resolution.
  const processedBg = await sharp(aiBackgroundBuffer)
    .resize(width, height, { fit: 'cover' })
    .toBuffer();

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 2. Load and draw the AI background template
  const bgImage = await loadImage(processedBg);
  ctx.drawImage(bgImage, 0, 0, width, height);

  // 3. Draw name plate background for text visibility
  // Using a clean white/slate card design
  ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
  ctx.shadowBlur = 30;
  ctx.beginPath();
  const plateWidth = 840;
  const plateHeight = 220;
  const plateX = (width - plateWidth) / 2;
  const plateY = personArea.y + personArea.radius + 50; 
  
  const radius = 32;
  ctx.moveTo(plateX + radius, plateY);
  ctx.lineTo(plateX + plateWidth - radius, plateY);
  ctx.quadraticCurveTo(plateX + plateWidth, plateY, plateX + plateWidth, plateY + radius);
  ctx.lineTo(plateX + plateWidth, plateY + plateHeight - radius);
  ctx.quadraticCurveTo(plateX + plateWidth, plateY + plateHeight, plateX + plateWidth - radius, plateY + plateHeight);
  ctx.lineTo(plateX + radius, plateY + plateHeight);
  ctx.quadraticCurveTo(plateX, plateY + plateHeight, plateX, plateY + plateHeight - radius);
  ctx.lineTo(plateX, plateY + radius);
  ctx.quadraticCurveTo(plateX, plateY, plateX + radius, plateY);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;

  // 4. Draw dynamic text layers with text fitting
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const maxTextWidth = plateWidth - 80;

  // Draw Name
  drawFittedText(
    ctx,
    name.toUpperCase(),
    width / 2,
    plateY + 80,
    maxTextWidth,
    64,
    "sans-serif",
    "#0f172a"
  );

  // Draw City
  drawFittedText(
    ctx,
    (city || "INDIA").toUpperCase(),
    width / 2,
    plateY + 150,
    maxTextWidth,
    42,
    "sans-serif",
    "#ea580c"
  );

  // 5. Draw single website footer
  // Draw dark bar to ensure contrast for footer
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, height - 100, width, 100);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('freedom2026.in', width / 2, height - 50);

  // Export as PNG buffer
  return canvas.toBuffer('image/png');
}
