import os
from PIL import Image

# Exact 1:1 original crop coordinates mapped from default character art
exact_mapping = {
    'zhangzixiao_corrupted': (177, 15),
    'shiyunuo_corrupted': (161, 15),
    'zhanghanyu_corrupted': (138, 14),
    'chenpinxuan_corrupted': (111, 16),
    'qinruiyi_corrupted': (5, 8),
    'grade1_student_default': (140, 15)
}

def apply_exact_crops():
    art_dir = 'assets/art'
    port_dir = 'assets/portraits'
    
    for name, (x1, y1) in exact_mapping.items():
        art_path = os.path.join(art_dir, f'{name}@2x.png')
        if not os.path.exists(art_path):
            print(f"Missing art for {name}")
            continue
            
        art_img = Image.open(art_path)
        crop_box = (x1, y1, x1 + 192, y1 + 192)
        
        # 2x portrait (192x192)
        port_2x = art_img.crop(crop_box)
        port_2x_path = os.path.join(port_dir, f'{name}@2x.png')
        port_2x.save(port_2x_path)
        
        # 1x portrait (96x96)
        port_1x = port_2x.resize((96, 96), Image.Resampling.LANCZOS)
        port_1x_path = os.path.join(port_dir, f'{name}.png')
        port_1x.save(port_1x_path)
        
        print(f"[{name}] Applied 1:1 exact mapping box {crop_box}")

if __name__ == '__main__':
    apply_exact_crops()
