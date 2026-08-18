const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const pub = path.join(__dirname, 'public');
const inputPath = 'C:\\Users\\Kariy\\.gemini\\antigravity-ide\\brain\\7bfa53db-1ccb-4c95-ba2d-ddc6a7fe21ea\\media__1786979910307.jpg';

async function run() {
  const symbolPath = path.join(pub, 'logo-symbol.png');
  const darkLogoPath = path.join(pub, 'logo-dark.png');
  
  // Create a horizontal navbar logo (Symbol on left, "REACH O" on right)
  // Symbol is 298x295 in logo-symbol.png
  const symbolBuf = await sharp(symbolPath).resize(80, 80).toBuffer();
  
  // Construct clean SVG horizontal logo for navbar
  const navbarSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="260" height="60" viewBox="0 0 260 60">
    <image href="data:image/png;base64,${symbolBuf.toString('base64')}" x="0" y="5" width="50" height="50" />
    <text x="65" y="38" font-family="'Space Grotesk', system-ui, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" letter-spacing="-1px">RE<tspan fill="#22D3EE">Λ</tspan>CH O</text>
  </svg>`;

  fs.writeFileSync(path.join(pub, 'logo-navbar.svg'), navbarSvg);
  await sharp(Buffer.from(navbarSvg)).png().toFile(path.join(pub, 'logo-navbar.png'));

  console.log('All logo assets built successfully!');
}

run().catch(console.error);
