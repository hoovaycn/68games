import os
from PIL import Image

def find_exact_original_crop(base_name):
    art_path = f'assets/art/{base_name}@2x.png'
    port_path = f'assets/portraits/{base_name}@2x.png'
    
    if not os.path.exists(art_path) or not os.path.exists(port_path):
        print(f"Missing original for {base_name}")
        return None
        
    art = Image.open(art_path).convert('RGB')
    port = Image.open(port_path).convert('RGB')
    
    pw, ph = port.size # 192, 192
    aw, ah = art.size   # 480, 640
    
    sample_pixels = []
    for sy in range(0, ph, 4):
        for sx in range(0, pw, 4):
            sample_pixels.append((sx, sy, port.getpixel((sx, sy))))
            
    best_diff = float('inf')
    best_pos = (0, 0)
    
    for y in range(0, ah - ph + 1, 1):
        for x in range(0, aw - pw + 1, 1):
            diff = 0
            for sx, sy, p_rgb in sample_pixels:
                a_rgb = art.getpixel((x + sx, y + sy))
                diff += abs(a_rgb[0] - p_rgb[0]) + abs(a_rgb[1] - p_rgb[1]) + abs(a_rgb[2] - p_rgb[2])
                if diff > best_diff:
                    break
            if diff < best_diff:
                best_diff = diff
                best_pos = (x, y)
                
    print(f"[{base_name}] Original exact crop box: x={best_pos[0]}, y={best_pos[1]} (diff={best_diff})")
    return best_pos

characters = [
    'zhangzixiao_default',
    'shiyunuo_default',
    'zhanghanyu_default',
    'chenpinxuan_default',
    'qinruiyi_default',
    'classmate_boy_default' # as reference for grade1_student
]

for char in characters:
    find_exact_original_crop(char)
