import os
from PIL import Image

def analyze_crop(name):
    art_path = f'assets/art/{name}@2x.png'
    port_path = f'assets/portraits/{name}@2x.png'
    
    if not os.path.exists(art_path) or not os.path.exists(port_path):
        print(f"Missing {name}")
        return
        
    art = Image.open(art_path).convert('RGB')
    port = Image.open(port_path).convert('RGB')
    
    pw, ph = port.size # 192, 192
    aw, ah = art.size   # 480, 640
    
    best_diff = float('inf')
    best_pos = (0, 0)
    
    # Take sample pixels (e.g. 16x16 grid) for fast search
    sample_pixels = []
    for sy in range(0, ph, 12):
        for sx in range(0, pw, 12):
            sample_pixels.append((sx, sy, port.getpixel((sx, sy))))
            
    for y in range(0, ah - ph + 1, 4):
        for x in range(0, aw - pw + 1, 4):
            diff = 0
            for sx, sy, p_rgb in sample_pixels:
                a_rgb = art.getpixel((x + sx, y + sy))
                diff += abs(a_rgb[0] - p_rgb[0]) + abs(a_rgb[1] - p_rgb[1]) + abs(a_rgb[2] - p_rgb[2])
            if diff < best_diff:
                best_diff = diff
                best_pos = (x, y)
                
    print(f"[{name}] Best crop pos in 480x640: x={best_pos[0]}, y={best_pos[1]} (diff={best_diff})")

for char in ['zhangzixiao_default', 'shiyunuo_default', 'zhanghanyu_default', 'chenpinxuan_default', 'teacher_xu_default', 'fanwenmo_default']:
    analyze_crop(char)
