import os
from PIL import Image

def analyze_and_crop_individual():
    art_dir = 'assets/art'
    port_dir = 'assets/portraits'
    
    # Analyze all 2x art files in assets/art
    art_files = sorted([f for f in os.listdir(art_dir) if f.endswith('@2x.png')])
    
    print(f"Found {len(art_files)} art files. Processing individual head crops...")
    
    for f in art_files:
        name = f[:-7] # strip @2x.png
        art_path = os.path.join(art_dir, f)
        img = Image.open(art_path)
        w, h = img.size # 480, 640
        img_rgb = img.convert('RGB')
        
        # 1. Scan for character bounding box (non-magenta)
        non_bg_y = []
        non_bg_x = []
        
        for y in range(h):
            for x in range(w):
                r, g, b = img_rgb.getpixel((x, y))
                # Check if not magenta background (#FF00FF)
                if not (r > 220 and g < 40 and b > 220):
                    non_bg_y.append(y)
                    non_bg_x.append(x)
                    
        if not non_bg_y:
            print(f"[{name}] Warning: Empty/magenta image!")
            continue
            
        top_y = min(non_bg_y)
        bottom_y = max(non_bg_y)
        left_x = min(non_bg_x)
        right_x = max(non_bg_x)
        
        center_x = (left_x + right_x) // 2
        
        # 2. Individual crop calculation:
        # We want 192x192 crop.
        # Top of crop (y1) should leave ~15px margin above top_y so hair top is nicely framed.
        crop_w, crop_h = 192, 192
        
        y1 = max(0, top_y - 15)
        # Ensure y1 + 192 does not exceed h
        if y1 + crop_h > h:
            y1 = h - crop_h
            
        x1 = max(0, center_x - crop_w // 2)
        if x1 + crop_w > w:
            x1 = w - crop_w
            
        box = (x1, y1, x1 + crop_w, y1 + crop_h)
        print(f"[{name}] top_y={top_y}, center_x={center_x} -> Crop box: {box}")
        
        # Save 2x portrait (192x192)
        port_2x = img.crop(box)
        port_2x_path = os.path.join(port_dir, f'{name}@2x.png')
        port_2x.save(port_2x_path)
        
        # Save 1x portrait (96x96)
        port_1x = port_2x.resize((96, 96), Image.Resampling.LANCZOS)
        port_1x_path = os.path.join(port_dir, f'{name}.png')
        port_1x.save(port_1x_path)

if __name__ == '__main__':
    analyze_and_crop_individual()
