import os
import sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_act3_characters import clean, content_bbox, magenta_ness, mag_layer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
ART = os.path.join(ROOT, 'assets/art')
POR = os.path.join(ROOT, 'assets/portraits')

JOBS = [
    ('Redraw_this_exact_character_in_2026-11-06T13-48-13.png', 'qinruiyi_default', True),
    ('Keep_the_exact_same_character__2026-11-06T13-49-24.png', 'qinruiyi_crying', False),
    ('Keep_the_exact_same_character__2026-11-06T13-50-18.png', 'qinruiyi_relieved', False),
    ('Keep_the_exact_same_character__2026-11-06T13-51-37.png', 'qinruiyi_resolute', True),
    ('Keep_the_exact_same_character__2026-11-06T13-53-58.png', 'qinruiyi_corrupted', True),
]

def fit_solid_bottom(im, w, h):
    x0, y0, x1, y1 = content_bbox(im)
    cropped = im.crop((x0, y0, x1, y1))
    scale = min(w / cropped.width, h / cropped.height)
    nw, nh = max(1, round(cropped.width * scale)), max(1, round(cropped.height * scale))
    resized = cropped.resize((nw, nh), Image.LANCZOS)
    canvas = mag_layer((w, h)).copy()
    canvas.paste(resized, ((w - nw) // 2, h - nh))
    mask = magenta_ness(canvas).point(lambda v: 255 if v > 58 else 0)
    canvas.paste(mag_layer((w, h)), (0, 0), mask)
    return canvas

def portrait_from(art2x, size):
    x0, y0, x1, y1 = content_bbox(art2x)
    ch = y1 - y0
    band_h = max(int(ch * 0.22), 1)
    band = art2x.crop((0, y0, art2x.width, y0 + band_h))
    mask = magenta_ness(band).point(lambda v: 255 if v < 60 else 0)
    proj = mask.resize((band.width, 1), Image.BOX)
    px = proj.load()
    cols = [x for x in range(band.width) if px[x, 0] > 12]
    if cols:
        hx0, hx1 = cols[0], cols[-1]
    else:
        hx0, hx1 = x0, x1
    hcx = (hx0 + hx1) // 2
    head_w = max(hx1 - hx0, 1)
    side = int(head_w * 1.35)
    side = max(side, 150)
    side = min(side, int(ch * 0.55), art2x.width)
    top = max(y0 - int(side * 0.04), 0)
    left = max(0, min(hcx - side // 2, art2x.width - side))
    crop = art2x.crop((left, top, left + side, min(top + side, art2x.height)))
    canvas = mag_layer((side, side)).copy()
    canvas.paste(crop, (0, 0))
    return canvas.resize((size, size), Image.LANCZOS)

def main():
    for gen_name, out_name, has_portrait in JOBS:
        src_path = os.path.join(GEN, gen_name)
        print(f"Processing {out_name} from {gen_name}...")
        im = clean(Image.open(src_path))
        art2x = fit_solid_bottom(im, 480, 640)
        art1x = fit_solid_bottom(im, 240, 320)
        
        p_art2x = os.path.join(ART, f"{out_name}@2x.png")
        p_art1x = os.path.join(ART, f"{out_name}.png")
        art2x.save(p_art2x)
        art1x.save(p_art1x)
        print(f"  Saved Art: {p_art2x} ({art2x.size}), {p_art1x} ({art1x.size})")

        if has_portrait:
            por2x = portrait_from(art2x, 192)
            por1x = portrait_from(art2x, 96)
            p_por2x = os.path.join(POR, f"{out_name}@2x.png")
            p_por1x = os.path.join(POR, f"{out_name}.png")
            por2x.save(p_por2x)
            por1x.save(p_por1x)
            print(f"  Saved Portrait: {p_por2x} ({por2x.size}), {p_por1x} ({por1x.size})")

if __name__ == '__main__':
    main()
