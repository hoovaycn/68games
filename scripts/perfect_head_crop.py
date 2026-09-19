import os
from PIL import Image

# Exact portrait crop box for 480x640 art images
# Traditional JRPG head crops center around the eyes & mouth (y=100~292)
# Standard center_x is ~240, w=192 -> x1=144, x2=336
# Standard y1 is ~100..120 -> y2=292..312

def crop_perfect_head(name, y_offset=105):
    art_path = f'assets/art/{name}@2x.png'
    port_2x_path = f'assets/portraits/{name}@2x.png'
    port_1x_path = f'assets/portraits/{name}.png'
    
    if not os.path.exists(art_path):
        print(f"File not found: {art_path}")
        return
        
    art_img = Image.open(art_path)
    w, h = art_img.size # 480, 640
    
    # Calculate crop box (192x192)
    crop_w, crop_h = 192, 192
    x1 = (w - crop_w) // 2 # 144
    y1 = y_offset
    x2 = x1 + crop_w      # 336
    y2 = y1 + crop_h      # y_offset + 192
    
    crop_box = (x1, y1, x2, y2)
    port_2x = art_img.crop(crop_box)
    port_2x.save(port_2x_path)
    
    port_1x = port_2x.resize((96, 96), Image.Resampling.LANCZOS)
    port_1x.save(port_1x_path)
    
    print(f"[{name}] Cropped portrait (192x192) box: {crop_box}")

def process_all():
    # Recrop all portraits that were missing or updated
    targets = {
        'grade1_student_default': 90,
        'zhangzixiao_corrupted': 110,
        'shiyunuo_corrupted': 105,
        'zhanghanyu_corrupted': 105,
        'chenpinxuan_corrupted': 105,
        'qinruiyi_corrupted': 105,
        # Also clean up any other historical default/corrupted portraits
        'adult_liu_default': 110,
        'ayuan_corrupted': 105,
        'ayuan_default': 105,
        'coach_corrupted': 105,
        'coach_default': 105,
        'coach_sad': 105,
        'mystery_man_corrupted': 110,
        'mystery_man_default': 110,
        'parent_rep_default': 110,
        'senior_athlete_leader_corrupted': 105,
        'vendor_sad': 105,
        'young_liu_default': 105,
        'young_xu_default': 105,
        'zhangxizhe_corrupted': 105
    }
    
    for name, y_off in targets.items():
        crop_perfect_head(name, y_off)

if __name__ == '__main__':
    process_all()
