// Einfaches Icon-Generierungsskript für Node.js
const fs = require('fs');

const sizes = [16, 32, 57, 60, 72, 76, 114, 120, 144, 152, 180, 192, 512];

// Erstelle einfache SVG-Icons und speichere sie als Platzhalter
sizes.forEach(size => {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#000000"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/5}" fill="none" stroke="#ffffff" stroke-width="${Math.max(2, size/64)}"/>
  <text x="${size/2}" y="${size/2 + size/8}" text-anchor="middle" font-family="monospace" font-size="${size/4}" font-weight="bold" fill="#ffffff">1</text>
</svg>`;

    let filename;
    if (size === 16) filename = 'icon-16x16.svg';
    else if (size === 32) filename = 'icon-32x32.svg';
    else if (size === 192) filename = 'icon-192x192.svg';
    else if (size === 512) filename = 'icon-512x512.svg';
    else if (size === 180) filename = 'apple-touch-icon.svg';
    else filename = `apple-touch-icon-${size}x${size}.svg`;
    
    fs.writeFileSync(filename, svg);
    console.log(`Created ${filename}`);
});

console.log('\\nAlle Icons erstellt! Für Produktion sollten diese in PNG konvertiert werden.');
console.log('Verwenden Sie einen Online-Converter oder ImageMagick/Sharp für die Konvertierung.');
