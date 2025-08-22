#!/usr/bin/env python3
import base64

# Einfache PNG-Platzhalter (1x1 schwarze Pixel als Base64)
simple_png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAFCVH7GnQAAAABJRU5ErkJggg=="

sizes = [
    (16, "icon-16x16.png"),
    (32, "icon-32x32.png"), 
    (57, "apple-touch-icon-57x57.png"),
    (60, "apple-touch-icon-60x60.png"),
    (72, "apple-touch-icon-72x72.png"),
    (76, "apple-touch-icon-76x76.png"),
    (114, "apple-touch-icon-114x114.png"),
    (120, "apple-touch-icon-120x120.png"),
    (144, "apple-touch-icon-144x144.png"),
    (152, "apple-touch-icon-152x152.png"),
    (180, "apple-touch-icon.png"),
    (192, "icon-192x192.png"),
    (512, "icon-512x512.png")
]

for size, filename in sizes:
    with open(filename, 'wb') as f:
        f.write(base64.b64decode(simple_png))
    print(f"Created {filename}")

print("\nEinfache Platzhalter-Icons erstellt!")
print("Öffnen Sie generate-icons.html im Browser für echte Icons.")
