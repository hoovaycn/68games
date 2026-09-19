import os
from PIL import Image

def find_face_by_skin_tone(name):
    path = f'assets/art/{name}@2x.png'
    if not os.path.exists(path):
        return
    img = Image.open(path).convert('RGB')
    w, h = img.size
    
    skin_x = []
    skin_y = []
    
    # Face skin is usually in top half of image (y: 30..300)
    for y in range(30, 320):
        for x in range(50, 430):
            r, g, b = img.getpixel((x, y))
            # Check for skin-like color (pale/light/cyan-ish skin in corrupted)
            # Normal skin: r > g > b, r > 150
            # Corrupted skin: r>120, g>120, b>120 or cyan-tinted skin
            is_skin = (r > 140 and g > 110 and b > 90 and abs(r - g) < 70)
            if is_skin:
                skin_x.append(x)
                skin_y.append(y)
                
    if skin_x:
        min_x, max_x = min(skin_x), max(skin_x)
        min_y, max_y = min(skin_y), max(skin_y)
        face_cx = (min_x + max_x) // 2
        face_cy = (min_y + max_y) // 2
        print(f"[{name}] Face detected: cx={face_cx}, cy={face_cy}, y_span=[{min_y}..{max_y}], x_span=[{min_x}..{max_x}]")
    else:
        print(f"[{name}] Skin detection failed, using fallback")

targets = [
    'grade1_student_default',
    'zhangzixiao_corrupted',
    'shiyunuo_corrupted',
    'zhanghanyu_corrupted',
    'chenpinxuan_corrupted',
    'qinruiyi_corrupted'
]

for t in targets:
    find_face_area = find_face_by_skin_tone(t)
