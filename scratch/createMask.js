const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');

async function createMask() {
  const width = 778;
  const height = 986;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill black (preserve)
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  // Draw white shape for person region (replace)
  ctx.fillStyle = '#ffffff';
  
  // Person head and body (x: ~220 to 560, y: ~280 to 900)
  ctx.beginPath();
  // Head
  ctx.arc(389, 360, 80, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.beginPath();
  ctx.moveTo(389 - 140, 900);
  ctx.quadraticCurveTo(389 - 160, 480, 389, 440);
  ctx.quadraticCurveTo(389 + 160, 480, 389 + 140, 900);
  ctx.closePath();
  ctx.fill();

  // Feathering to make the mask smoother
  // Wait, saving directly as PNG.
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('public/images/classic-india-mask.png', buffer);
  console.log('Mask created at public/images/classic-india-mask.png');
}

createMask().catch(console.error);
