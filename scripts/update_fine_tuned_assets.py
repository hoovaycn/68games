import os
from PIL import Image

art_dir = 'assets/art'
port_dir = 'assets/portraits'
bg_dir = 'assets/backgrounds'

# 1. Characters
char_gen = {
    'senior_student_corrupted': r'e:\WorkBuddy\fx_game\generated-images\日系像素风角色立绘_16_bit___32_bit_JRPG_2026-09-19T14-53-50.png',
    'janitor_old': r'e:\WorkBuddy\fx_game\generated-images\日系像素风角色立绘_16_bit___32_bit_JRPG_2026-09-19T14-54-23.png'
}

for name, gen_path in char_gen.items():
    if not os.path.exists(gen_path):
        print(f"File missing: {gen_path}")
        continue
    img = Image.open(gen_path)
    
    # 2x Art (480x640)
    art_2x = img.resize((480, 640), Image.Resampling.LANCZOS)
    art_2x_path = os.path.join(art_dir, f'{name}@2x.png')
    art_2x.save(art_2x_path)
    
    # 1x Art (240x320)
    art_1x = art_2x.resize((240, 320), Image.Resampling.LANCZOS)
    art_1x_path = os.path.join(art_dir, f'{name}.png')
    art_1x.save(art_1x_path)
    
    print(f"Updated {name} art: 2x (480x640), 1x (240x320)")

# Crop head portraits individually (192x192)
# senior_student_corrupted: face centered at (236, 115)
# janitor_old: face centered at (236, 115)
char_crop_centers = {
    'senior_student_corrupted': (236, 115),
    'janitor_old': (236, 115)
}

for name, (cx, cy) in char_crop_centers.items():
    art_2x_path = os.path.join(art_dir, f'{name}@2x.png')
    art_img = Image.open(art_2x_path)
    w, h = art_img.size
    
    x1 = max(0, min(w - 192, cx - 96))
    y1 = max(0, min(h - 192, cy - 96))
    x2 = x1 + 192
    y2 = y1 + 192
    
    # 2x Portrait (192x192)
    port_2x = art_img.crop((x1, y1, x2, y2))
    port_2x_path = os.path.join(port_dir, f'{name}@2x.png')
    port_2x.save(port_2x_path)
    
    # 1x Portrait (96x96)
    port_1x = port_2x.resize((96, 96), Image.Resampling.LANCZOS)
    port_1x_path = os.path.join(port_dir, f'{name}.png')
    port_1x.save(port_1x_path)
    
    print(f"Updated {name} portrait box: ({x1},{y1},{x2},{y2})")

# 2. Backgrounds
bg_gen = {
    'bg_guard_room_old': r'e:\WorkBuddy\fx_game\generated-images\日系像素风横版场景背景_16_bit___32_bit_典型_2026-09-19T14-55-07.png',
    'bg_corridor_old_eerie': r'e:\WorkBuddy\fx_game\generated-images\日系像素风横版场景背景_16_bit___32_bit_典型_2026-09-19T14-55-47.png'
}

for name, gen_path in bg_gen.items():
    if not os.path.exists(gen_path):
        print(f"File missing: {gen_path}")
        continue
    img = Image.open(gen_path)
    
    # 2x Background (960x540)
    bg_2x = img.resize((960, 540), Image.Resampling.LANCZOS)
    bg_2x_path = os.path.join(bg_dir, f'{name}@2x.png')
    bg_2x.save(bg_2x_path)
    
    # 1x Background (480x270)
    bg_1x = bg_2x.resize((480, 270), Image.Resampling.LANCZOS)
    bg_1x_path = os.path.join(bg_dir, f'{name}.png')
    bg_1x.save(bg_1x_path)
    
    print(f"Updated {name} background: 2x (960x540), 1x (480x270)")
