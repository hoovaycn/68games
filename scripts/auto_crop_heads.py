import os
from PIL import Image

def find_head_crop_box(art_img, target_size=(192, 192)):
    # art_img is 480x640
    w, h = art_img.size
    img_rgb = art_img.convert('RGB')
    
    # 1. Find bounding box of non-magenta pixels (#FF00FF)
    # Magenta threshold: R > 200, G < 50, B > 200
    non_bg_y = []
    non_bg_x = []
    
    for y in range(h):
        for x in range(w):
            r, g, b = img_rgb.getpixel((x, y))
            # Check if not magenta background
            if not (r > 220 and g < 40 and b > 220):
                non_bg_y.append(y)
                non_bg_x.append(x)
                
    if not non_bg_y:
        return (144, 100, 336, 292) # default fallback
        
    top_y = min(non_bg_y)
    bottom_y = max(non_bg_y)
    left_x = min(non_bg_x)
    right_x = max(non_bg_x)
    
    char_center_x = (left_x + right_x) // 2
    
    # Face usually starts slightly below top_y (hair top)
    # Target height is 192. We want head/face centered.
    # Start y around top_y + 10 or 20, but ensure 192 height fits.
    crop_w, crop_h = target_size
    
    # Position y so that top_y is roughly 15-20px inside the crop top edge
    crop_y1 = max(0, top_y - 10)
    if crop_y1 + crop_h > h:
        crop_y1 = h - crop_h
        
    crop_x1 = max(0, char_center_x - crop_w // 2)
    if crop_x1 + crop_w > w:
        crop_x1 = w - crop_w
        
    return (crop_x1, crop_y1, crop_x1 + crop_w, crop_y1 + crop_h)

def recrop_portraits():
    art_dir = 'assets/art'
    port_dir = 'assets/portraits'
    
    # List of updated corrupted assets & grade1
    targets = [
        'grade1_student_default',
        'zhangzixiao_corrupted',
        'shiyunuo_corrupted',
        'zhanghanyu_corrupted',
        'chenpinxuan_corrupted',
        'qinruiyi_corrupted'
    ]
    
    for name in targets:
        art_2x_path = os.path.join(art_dir, f'{name}@2x.png')
        if not os.path.exists(art_2x_path):
            print(f"Skipping {name}, missing art")
            continue
            
        art_2x = Image.open(art_2x_path)
        box = find_head_crop_box(art_2x, (192, 192))
        print(f"[{name}] Auto head crop box: {box}")
        
        port_2x_img = art_2x.crop(box)
        port_2x_path = os.path.join(port_dir, f'{name}@2x.png')
        port_2x_img.save(port_2x_path)
        
        port_1x_img = port_2x_img.resize((96, 96), Image.Resampling.LANCZOS)
        port_1x_path = os.path.join(port_dir, f'{name}.png')
        port_1x_img.save(port_1x_path)
        print(f"Re-cropped {name} portrait 2x (192x192) and 1x (96x96)")

if __name__ == '__main__':
    recrop_portraits()
