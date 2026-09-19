import os
from PIL import Image, ImageDraw

# Individual customized center coordinates (cx, cy) for each generated image in 480x640:
# Checked carefully to align face, eyes, mouth and hair top perfectly.

individual_centers = {
    'grade1_student_default': (236, 110),
    'zhangzixiao_corrupted': (236, 115),
    'shiyunuo_corrupted': (240, 115),
    'zhanghanyu_corrupted': (236, 115),
    'chenpinxuan_corrupted': (236, 115),
    'qinruiyi_corrupted': (105, 105) # Character stands on the left side of 480x640
}

def apply_individual_head_crops():
    art_dir = 'assets/art'
    port_dir = 'assets/portraits'
    
    for name, (cx, cy) in individual_centers.items():
        art_path = os.path.join(art_dir, f'{name}@2x.png')
        if not os.path.exists(art_path):
            print(f"Skipping {name}, missing file")
            continue
            
        img = Image.open(art_path).convert('RGB')
        w, h = img.size
        
        # Calculate 192x192 crop box
        x1 = max(0, min(w - 192, cx - 96))
        y1 = max(0, min(h - 192, cy - 96))
        x2 = x1 + 192
        y2 = y1 + 192
        
        box = (x1, y1, x2, y2)
        
        # Save 2x portrait
        port_2x = img.crop(box)
        port_2x.save(os.path.join(port_dir, f'{name}@2x.png'))
        
        # Save 1x portrait
        port_1x = port_2x.resize((96, 96), Image.Resampling.LANCZOS)
        port_1x.save(os.path.join(port_dir, f'{name}.png'))
        
        print(f"[{name}] Applied individual crop box {box} (center: {cx}, {cy})")

if __name__ == '__main__':
    apply_individual_head_crops()
