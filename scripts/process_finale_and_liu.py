#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""处理两张新交付的美术资源：
1. bg_grand_finale_fin: 16:9 终幕画卷（1920x1080 @2x, 960x540 1x, 256色量化）
2. adult_liu_crying: 刘老师哭泣表情（立绘 480x640 @2x, 240x320 1x; 头像 192x192 @2x, 96x96 1x，洋红纯底 #FF00FF）
"""
import os
import sys
from PIL import Image, ImageChops

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT_BG = os.path.join(ROOT, 'assets/backgrounds')
OUT_ART = os.path.join(ROOT, 'assets/art')
OUT_POR = os.path.join(ROOT, 'assets/portraits')

MAG = (255, 0, 255)

def magenta_ness(im):
    r, g, b = im.convert('RGB').split()
    return ImageChops.subtract(ImageChops.darker(r, b), g)

def mag_layer(size):
    return Image.new('RGB', size, MAG)

def clean_mag(im):
    im = im.convert('RGB')
    w, h = im.size
    # 盖住右下角水印
    im.paste(mag_layer((int(w * 0.16), int(h * 0.075))), (int(w * 0.84), int(h * 0.925)))
    mask = magenta_ness(im).point(lambda v: 255 if v > 58 else 0)
    im.paste(mag_layer(im.size), (0, 0), mask)
    return im

def content_bbox(im, pad=6):
    mask = magenta_ness(im).point(lambda v: 255 if v < 60 else 0)
    box = mask.getbbox()
    if not box:
        return (0, 0, im.width, im.height)
    x0, y0, x1, y1 = box
    return (max(x0 - pad, 0), max(y0 - pad, 0),
            min(x1 + pad, im.width), min(y1 + pad, im.height))

def fit_solid(im, w, h, margin=0.97):
    x0, y0, x1, y1 = content_bbox(im)
    im = im.crop((x0, y0, x1, y1))
    scale = min(w / im.width, h / im.height) * margin
    nw, nh = max(1, round(im.width * scale)), max(1, round(im.height * scale))
    im = im.resize((nw, nh), Image.LANCZOS)
    canvas = mag_layer((w, h))
    canvas.paste(im, ((w - nw) // 2, (h - nh) // 2))
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
    top = max(y0 - int(side * 0.03), 0)
    left = max(0, min(hcx - side // 2, art2x.width - side))
    crop = art2x.crop((left, top, left + side, min(top + side, art2x.height)))
    canvas = mag_layer((side, side))
    canvas.paste(crop, (0, 0))
    return canvas.resize((size, size), Image.LANCZOS)

def process_grand_finale():
    src_file = os.path.join(GEN, 'High_resolution_32_bit_era_JRP_2026-11-09T13-45-44.png')
    print("Processing Grand Finale Background...")
    im = Image.open(src_file).convert('RGB')
    w, h = im.size
    crop_h = min(int(w * 9 / 16), h) # 1536x864, 切掉底部水印
    cropped = im.crop((0, 0, w, crop_h)).resize((1920, 1080), Image.LANCZOS)

    # 256 色量化
    pal_2x = cropped.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    out_2x = os.path.join(OUT_BG, 'bg_grand_finale_fin@2x.png')
    pal_2x.save(out_2x, optimize=True)

    small = pal_2x.convert('RGB').resize((960, 540), Image.LANCZOS)
    pal_1x = small.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    out_1x = os.path.join(OUT_BG, 'bg_grand_finale_fin.png')
    pal_1x.save(out_1x, optimize=True)

    print(f"  -> {out_2x}: {os.path.getsize(out_2x) // 1024} KB")
    print(f"  -> {out_1x}: {os.path.getsize(out_1x) // 1024} KB")

def process_liu_crying():
    src_file = os.path.join(GEN, 'Keep_the_exact_same_character__2026-11-09T13-48-44.png')
    print("Processing Teacher Liu Crying Emotion...")
    im = Image.open(src_file).convert('RGB')
    cleaned = clean_mag(im)

    # 生成 480x640 @2x 立绘
    art_2x = fit_solid(cleaned, 480, 640, margin=0.96)
    out_art_2x = os.path.join(OUT_ART, 'adult_liu_crying@2x.png')
    art_2x.save(out_art_2x, optimize=True)

    # 生成 240x320 1x 立绘
    art_1x = art_2x.resize((240, 320), Image.LANCZOS)
    out_art_1x = os.path.join(OUT_ART, 'adult_liu_crying.png')
    art_1x.save(out_art_1x, optimize=True)

    # 生成 192x192 @2x 头像
    por_2x = portrait_from(art_2x, 192)
    out_por_2x = os.path.join(OUT_POR, 'adult_liu_crying@2x.png')
    por_2x.save(out_por_2x, optimize=True)

    # 生成 96x96 1x 头像
    por_1x = por_2x.resize((96, 96), Image.LANCZOS)
    out_por_1x = os.path.join(OUT_POR, 'adult_liu_crying.png')
    por_1x.save(out_por_1x, optimize=True)

    print(f"  -> Art 2x: {out_art_2x} ({os.path.getsize(out_art_2x) // 1024} KB)")
    print(f"  -> Art 1x: {out_art_1x} ({os.path.getsize(out_art_1x) // 1024} KB)")
    print(f"  -> Por 2x: {out_por_2x} ({os.path.getsize(out_por_2x) // 1024} KB)")
    print(f"  -> Por 1x: {out_por_1x} ({os.path.getsize(out_por_1x) // 1024} KB)")

if __name__ == '__main__':
    process_grand_finale()
    process_liu_crying()
    print("\nAll done!")
