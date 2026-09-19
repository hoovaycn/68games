import os
from PIL import Image

gen_map = {
    'zhangzixiao_corrupted': r'e:\WorkBuddy\fx_game\generated-images\日系像素风角色立绘_16_bit___32_bit_JRPG_2026-09-18T17-16-52.png',
    'shiyunuo_corrupted': r'e:\WorkBuddy\fx_game\generated-images\日系像素风角色立绘_16_bit___32_bit_JRPG_2026-09-18T17-17-17.png',
    'zhanghanyu_corrupted': r'e:\WorkBuddy\fx_game\generated-images\日系像素风角色立绘_16_bit___32_bit_JRPG_2026-09-18T17-17-48.png',
    'chenpinxuan_corrupted': r'e:\WorkBuddy\fx_game\generated-images\日系像素风角色立绘_16_bit___32_bit_JRPG_2026-09-18T17-18-12.png',
    'qinruiyi_corrupted': r'e:\WorkBuddy\fx_game\generated-images\日系像素风角色立绘_16_bit___32_bit_JRPG_2026-09-18T17-18-42.png',
}

bg_path = r'e:\WorkBuddy\fx_game\generated-images\日系像素风横版场景背景_16_bit___32_bit_JR_2026-09-18T17-19-20.png'

art_dir = 'assets/art'
port_dir = 'assets/portraits'
bg_dir = 'assets/backgrounds'

# 1. Process character art & portraits
for name, path in gen_map.items():
    if not os.path.exists(path):
        print(f'Error: file not found {path}')
        continue
    img = Image.open(path)
    
    # Resize image to 480x640 for 2x art
    art_2x = img.resize((480, 640), Image.Resampling.LANCZOS)
    art_2x_path = os.path.join(art_dir, f'{name}@2x.png')
    art_2x.save(art_2x_path)
    print(f'Saved {art_2x_path} (480x640)')
    
    # 1x art (240x320)
    art_1x = art_2x.resize((240, 320), Image.Resampling.LANCZOS)
    art_1x_path = os.path.join(art_dir, f'{name}.png')
    art_1x.save(art_1x_path)
    print(f'Saved {art_1x_path} (240x320)')
    
    # Crop head for portrait 2x (192x192)
    # Box centered around top-middle (144, 20, 336, 212)
    head_box = (144, 20, 336, 212)
    port_2x_img = art_2x.crop(head_box)
    port_2x_path = os.path.join(port_dir, f'{name}@2x.png')
    port_2x_img.save(port_2x_path)
    print(f'Saved {port_2x_path} (192x192)')
    
    # 1x portrait (96x96)
    port_1x_img = port_2x_img.resize((96, 96), Image.Resampling.LANCZOS)
    port_1x_path = os.path.join(port_dir, f'{name}.png')
    port_1x_img.save(port_1x_path)
    print(f'Saved {port_1x_path} (96x96)')

# 2. Process background
if os.path.exists(bg_path):
    bg_img = Image.open(bg_path)
    bg_2x = bg_img.resize((960, 540), Image.Resampling.LANCZOS)
    bg_2x_path = os.path.join(bg_dir, 'bg_field_relief@2x.png')
    bg_2x.save(bg_2x_path)
    print(f'Saved {bg_2x_path} (960x540)')
    
    bg_1x = bg_2x.resize((480, 270), Image.Resampling.LANCZOS)
    bg_1x_path = os.path.join(bg_dir, 'bg_field_relief.png')
    bg_1x.save(bg_1x_path)
    print(f'Saved {bg_1x_path} (480x270)')
