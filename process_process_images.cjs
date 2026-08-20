const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'process');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  {
    src: 'C:\\Users\\Kariy\\.gemini\\antigravity-ide\\brain\\f8982d22-9b7b-499f-8704-389c4545062f\\discovery_process_visual_1787219190590.jpg',
    out: '01-discovery.webp'
  },
  {
    src: 'C:\\Users\\Kariy\\.gemini\\antigravity-ide\\brain\\f8982d22-9b7b-499f-8704-389c4545062f\\planning_process_visual_1787219219518.jpg',
    out: '02-planning.webp'
  },
  {
    src: 'C:\\Users\\Kariy\\.gemini\\antigravity-ide\\brain\\f8982d22-9b7b-499f-8704-389c4545062f\\design_process_visual_1787219249733.jpg',
    out: '03-design.webp'
  },
  {
    src: 'C:\\Users\\Kariy\\.gemini\\antigravity-ide\\brain\\f8982d22-9b7b-499f-8704-389c4545062f\\development_process_visual_1787219281122.jpg',
    out: '04-development.webp'
  },
  {
    src: 'C:\\Users\\Kariy\\.gemini\\antigravity-ide\\brain\\f8982d22-9b7b-499f-8704-389c4545062f\\launch_process_visual_1787219321837.jpg',
    out: '05-launch.webp'
  }
];

async function convert() {
  for (const img of images) {
    const dest = path.join(targetDir, img.out);
    await sharp(img.src)
      .resize(1280, 720, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(dest);
    console.log(`Saved ${img.out}`);
  }
}

convert().catch(console.error);
