import os
from PIL import Image

new_path = r'e:\WorkBuddy\fx_game\generated-images\日系像素风角色立绘_16_bit___32_bit_JRPG_2026-09-18T17-31-50.png'
art_dir = 'assets/art'
port_dir = 'assets/portraits'

if os.path.exists(new_path):
    img = Image.open(new_path)
    
    # 2x art (480x640)
    art_2x = img.resize((480, 640), Image.Resampling.LANCZOS)
    art_2x_path = os.path.join(art_dir, 'qinruiyi_corrupted@2x.png')
    art_2x.save(art_2x_path)
    print(f'Updated {art_2x_path} (480x640)')
    
    # 1x art (240x320)
    art_1x = art_2x.resize((240, 320), Image.Resampling.LANCZOS)
    art_1x_path = os.path.join(art_dir, 'qinruiyi_corrupted.png')
    art_1x.save(art_1x_path)
    print(f'Updated {art_1x_path} (240x320)')
    
    # Crop head for 2x portrait (192x192)
    # Head position around (144, 20, 336, 212)
    head_box = (144, 20, 336, 212)
    port_2x_img = art_2x.crop(head_box)
    port_2x_path = os.path.join(port_dir, 'qinruiyi_corrupted@2x.png')
    port_2x_img.save(port_2x_path)
    print(f'Updated {port_2x_path} (192x192)')
    
    # 1x portrait (96x96)
    port_1x_img = port_2x_img.resize((96, 96), Image.Resampling.LANCZOS)
    port_1x_path = os.path.join(port_dir, 'qinruiyi_corrupted.png')
    port_1x_img.save(port_1x_path)
    print(f'Updated {port_1x_path} (96x96)')
else:
    print('File not found!')
