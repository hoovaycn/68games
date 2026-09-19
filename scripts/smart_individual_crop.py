import os
from PIL import Image

def find_true_head_bounds(img_rgb):
    w, h = img_rgb.size
    
    # 1. Find true top_y of hair/head
    top_y = 25
    for y in range(h):
        count = 0
        for x in range(w):
            r, g, b = img_rgb.getpixel((x, y))
            if not (r > 220 and g < 50 and b > 220):
                count += 1
        if count >= 8:
            top_y = y
            break
            
    # 2. Find center_x around the head area (top_y to top_y + 80)
    head_x_coords = []
    for y in range(top_y, min(top_y + 80, h)):
        for x in range(w):
            r, g, b = img_rgb.getpixel((x, y))
            if not (r > 220 and g < 50 and b > 220):
                head_x_coords.append(x)
                
    if head_x_coords:
        center_x = (min(head_x_coords) + max(head_x_coords)) // 2
    else:
        center_x = 240
        
    return top_y, center_x

def smart_crop_all():
    art_dir = 'assets/art'
    port_dir = 'assets/portraits'
    
    art_files = sorted([f for f in os.listdir(art_dir) if f.endswith('@2x.png')])
    print(f"Scanning {len(art_files)} art files with head-region detection...")
    
    for f in art_files:
        name = f[:-7]
        art_path = os.path.join(art_dir, f)
        img = Image.open(art_path)
        w, h = img.size
        img_rgb = img.convert('RGB')
        
        top_y, center_x = find_true_head_bounds(img_rgb)
        
        crop_w, crop_h = 192, 192
        
        # Margin above head top: 12px
        y1 = max(0, top_y - 12)
        if y1 + crop_h > h:
            y1 = h - crop_h
            
        x1 = max(0, center_x - crop_w // 2)
        if x1 + crop_w > w:
            x1 = w - crop_w
            
        box = (x1, y1, x1 + crop_w, y1 + crop_h)
        print(f"[{name}] top_y={top_y}, head_center_x={center_x} -> Box: {box}")
        
        # Save 2x portrait (192x192)
        port_2x = img.crop(box)
        port_2x_path = os.path.join(port_dir, f'{name}@2x.png')
        port_2x.save(port_2x_path)
        
        # Save 1x portrait (96x96)
        port_1x = port_2x.resize((96, 96), Image.Resampling.LANCZOS)
        port_1x_path = os.path.join(port_dir, f'{name}.png')
        port_1x.save(port_1x_path)

if __name__ == '__main__':
    smart_crop_all()
