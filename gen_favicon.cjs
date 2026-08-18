const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const pub = path.join(__dirname, 'public');

async function run() {
  const sym = path.join(pub, 'logo-symbol.png');
  await sharp(sym).resize(64, 64).png().toFile(path.join(pub, 'favicon.png'));
  await sharp(sym).resize(180, 180).png().toFile(path.join(pub, 'apple-touch-icon.png'));

  const b64 = fs.readFileSync(sym).toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <image href="data:image/png;base64,${b64}" width="300" height="300" />
</svg>`;

  fs.writeFileSync(path.join(pub, 'favicon.svg'), svg);
  console.log('Favicons generated successfully');
}

run().catch(console.error);
