#!/usr/bin/env python3
"""
Generiert echte PNG-Icons für die EINS PWA
Benötigt: pip install pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import io
    import base64
except ImportError:
    print("Pillow nicht installiert. Installiere mit: pip install pillow")
    exit(1)

def create_icon(size):
    """Erstellt ein Icon im EINS-Design"""
    # Erstelle ein schwarzes Bild
    img = Image.new('RGB', (size, size), color='black')
    draw = ImageDraw.Draw(img)
    
    # Zeichne weißen Kreis
    circle_radius = size // 5
    center = size // 2
    circle_box = [
        center - circle_radius, 
        center - circle_radius,
        center + circle_radius, 
        center + circle_radius
    ]
    draw.ellipse(circle_box, outline='white', width=max(2, size // 64))
    
    # Versuche eine monospace Schrift zu laden, sonst default
    try:
        # Verschiedene Monospace-Schriften versuchen
        font_size = size // 4
        font_paths = [
            '/System/Library/Fonts/Courier.ttc',  # macOS
            '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf',  # Linux
            'C:/Windows/Fonts/consola.ttf',  # Windows
        ]
        
        font = None
        for font_path in font_paths:
            try:
                font = ImageFont.truetype(font_path, font_size)
                break
            except:
                continue
        
        if font is None:
            # Fallback zur Default-Schrift
            font = ImageFont.load_default()
            
    except:
        font = ImageFont.load_default()
    
    # Zeichne die "1" in der Mitte
    text = "1"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2
    
    draw.text((text_x, text_y), text, font=font, fill='white')
    
    return img

def main():
    """Generiert alle notwendigen Icons"""
    sizes_and_names = [
        (16, 'icon-16x16.png'),
        (32, 'icon-32x32.png'),
        (57, 'apple-touch-icon-57x57.png'),
        (60, 'apple-touch-icon-60x60.png'),
        (72, 'apple-touch-icon-72x72.png'),
        (76, 'apple-touch-icon-76x76.png'),
        (114, 'apple-touch-icon-114x114.png'),
        (120, 'apple-touch-icon-120x120.png'),
        (144, 'apple-touch-icon-144x144.png'),
        (152, 'apple-touch-icon-152x152.png'),
        (180, 'apple-touch-icon.png'),
        (192, 'icon-192x192.png'),
        (512, 'icon-512x512.png'),
    ]
    
    print("Generiere EINS PWA Icons...")
    
    for size, filename in sizes_and_names:
        icon = create_icon(size)
        icon.save(filename, 'PNG')
        print(f"✓ {filename} erstellt ({size}x{size})")
    
    print(f"\n🎉 Alle {len(sizes_and_names)} Icons erfolgreich erstellt!")
    print("Die Icons sind jetzt bereit für Ihre PWA.")

if __name__ == "__main__":
    main()
