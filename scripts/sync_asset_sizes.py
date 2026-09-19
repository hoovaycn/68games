import os
from PIL import Image

def process_art():
    art_dir = 'assets/art'
    if not os.path.exists(art_dir):
        return
    for f in os.listdir(art_dir):
        if not f.endswith('.png'):
            continue
        filepath = os.path.join(art_dir, f)
        img = Image.open(filepath)
        w, h = img.size
        
        # If it's a 480x640 file named xxx.png without @2x
        if w == 480 and h == 640 and not f.endswith('@2x.png'):
            base = f[:-4]
            target_2x = os.path.join(art_dir, f'{base}@2x.png')
            if not os.path.exists(target_2x):
                img.save(target_2x)
                print(f'[Art] Copied {f} -> {base}@2x.png (480x640)')
            # Downsample to 240x320 for 1x
            img_1x = img.resize((240, 320), Image.Resampling.LANCZOS)
            img_1x.save(filepath)
            print(f'[Art] Resized {f} -> (240x320)')
            
        elif f.endswith('@2x.png') and w == 480 and h == 640:
            base = f[:-7]
            target_1x = os.path.join(art_dir, f'{base}.png')
            if not os.path.exists(target_1x):
                img_1x = img.resize((240, 320), Image.Resampling.LANCZOS)
                img_1x.save(target_1x)
                print(f'[Art] Created {base}.png (240x320) from {f}')

def process_portraits():
    port_dir = 'assets/portraits'
    art_dir = 'assets/art'
    if not os.path.exists(port_dir):
        return
    for f in os.listdir(port_dir):
        if not f.endswith('.png'):
            continue
        filepath = os.path.join(port_dir, f)
        img = Image.open(filepath)
        w, h = img.size
        
        if f.endswith('@2x.png') and w == 192 and h == 192:
            base = f[:-7]
            target_1x = os.path.join(port_dir, f'{base}.png')
            if not os.path.exists(target_1x):
                img_1x = img.resize((96, 96), Image.Resampling.LANCZOS)
                img_1x.save(target_1x)
                print(f'[Portraits] Created {base}.png (96x96) from {f}')
                
    # Also check if any art has 2x portrait but missing
    for f in os.listdir(art_dir):
        if f.endswith('@2x.png'):
            base = f[:-7]
            port_2x = os.path.join(port_dir, f'{base}@2x.png')
            port_1x = os.path.join(port_dir, f'{base}.png')
            art_path = os.path.join(art_dir, f)
            if not os.path.exists(port_2x):
                art_img = Image.open(art_path)
                # Crop head (top-middle 192x192 area or box)
                # Head center roughly x=240, top y=30~222
                box = (144, 20, 336, 212) # 192x192
                crop_img = art_img.crop(box)
                crop_img.save(port_2x)
                print(f'[Portraits] Cropped {base}@2x.png (192x192) from art')
                crop_1x = crop_img.resize((96, 96), Image.Resampling.LANCZOS)
                crop_1x.save(port_1x)
                print(f'[Portraits] Created {base}.png (96x96) from cropped portrait')

def process_backgrounds():
    bg_dir = 'assets/backgrounds'
    if not os.path.exists(bg_dir):
        return
    for f in os.listdir(bg_dir):
        if not f.endswith('.png'):
            continue
        filepath = os.path.join(bg_dir, f)
        img = Image.open(filepath)
        w, h = img.size
        
        if f.endswith('@2x.png') and w == 960 and h == 540:
            base = f[:-7]
            target_1x = os.path.join(bg_dir, f'{base}.png')
            if not os.path.exists(target_1x):
                img_1x = img.resize((480, 270), Image.Resampling.LANCZOS)
                img_1x.save(target_1x)
                print(f'[Backgrounds] Created {base}.png (480x270) from {f}')
        elif w == 960 and h == 540 and not f.endswith('@2x.png'):
            base = f[:-4]
            target_2x = os.path.join(bg_dir, f'{base}@2x.png')
            if not os.path.exists(target_2x):
                img.save(target_2x)
                print(f'[Backgrounds] Copied {f} -> {base}@2x.png (960x540)')
            img_1x = img.resize((480, 270), Image.Resampling.LANCZOS)
            img_1x.save(filepath)
            print(f'[Backgrounds] Resized {f} -> (480x270)')

if __name__ == '__main__':
    process_art()
    process_portraits()
    process_backgrounds()
