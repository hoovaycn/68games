import os
from PIL import Image

def find_face_area(name):
    path = f'assets/art/{name}@2x.png'
    if not os.path.exists(path):
        print(f"Missing {name}")
        return
    img = Image.open(path).convert('RGB')
    w, h = img.size # 480, 640
    
    # Scan for non-magenta bounding box
    non_bg_y = []
    non_bg_x = []
    for y in range(h):
        for x in range(w):
            r, g, b = img.getpixel((x, y))
            if not (r > 220 and g < 40 and b > 220):
                non_bg_y.append(y)
                non_bg_x.append(x)
                
    top_y = min(non_bg_y)
    bottom_y = max(non_bg_y)
    left_x = min(non_bg_x)
    right_x = max(non_bg_x)
    
    print(f"[{name}] Full char bounds: x=[{left_x}..{right_x}], y=[{top_y}..{bottom_y}]")

targets = [
    'grade1_student_default',
    'zhangzixiao_corrupted',
    'shiyunuo_corrupted',
    'zhanghanyu_corrupted',
    'chenpinxuan_corrupted',
    'qinruiyi_corrupted'
]

for t in targets:
    find_face_area(t)
