import os
from PIL import Image

gen_bg = r'e:\WorkBuddy\fx_game\generated-images\日系像素风横版场景背景_16_bit___32_bit_JR_2026-09-19T01-16-10.png'
bg_dir = 'assets/backgrounds'

if os.path.exists(gen_bg):
    img = Image.open(gen_bg)
    
    # 2x background (960x540)
    bg_2x = img.resize((960, 540), Image.Resampling.LANCZOS)
    bg_2x_path = os.path.join(bg_dir, 'bg_parent_meeting_eerie@2x.png')
    bg_2x.save(bg_2x_path)
    print(f'Saved {bg_2x_path} (960x540)')
    
    # 1x background (480x270)
    bg_1x = bg_2x.resize((480, 270), Image.Resampling.LANCZOS)
    bg_1x_path = os.path.join(bg_dir, 'bg_parent_meeting_eerie.png')
    bg_1x.save(bg_1x_path)
    print(f'Saved {bg_1x_path} (480x270)')
else:
    print('Generated image not found!')
