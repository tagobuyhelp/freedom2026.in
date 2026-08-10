const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');

async function run() {
  const img = await loadImage('public/images/classic-india-style.png');
  const cvs = createCanvas(img.width, img.height);
  const ctx = cvs.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  const w = img.width;
  const h = img.height;
  
  const sample = (x, y) => {
    const p = ctx.getImageData(x, y, 1, 1).data;
    return `rgba(${p[0]}, ${p[1]}, ${p[2]}, ${p[3]})`;
  };
  
  console.log('Top Center:', sample(w/2, 10));
  console.log('Mid-Left:', sample(10, h/2));
  console.log('Mid-Right:', sample(w-10, h/2));
  console.log('Bottom-Left:', sample(10, h-10));
  console.log('Bottom-Right:', sample(w-10, h-10));
  console.log('Center-Bottom:', sample(w/2, h-10));
  
  // scan down the center
  for(let y = 300; y < h; y+=100) {
    console.log(`Center Y=${y}:`, sample(w/2, y));
  }
}

run().catch(console.error);
