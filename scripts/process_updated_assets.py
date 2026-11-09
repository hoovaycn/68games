#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""处理三张更新的美术资源：
1. bg_ayao_golden_dissolve (背景)
2. cg_mask_100score (CG)
3. cg_grad_photo_2006 (CG)
自动剥离黑边、顶对齐裁切 16:9（消除水印）、256 色 MEDIANCUT + Floyd-Steinberg 量化。
"""
import os
import sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT_BG = os.path.join(ROOT, 'assets/backgrounds')
OUT_CG = os.path.join(ROOT, 'assets/art')
W, H = 1920, 1080

ITEMS = [
    {
        'src': 'High_resolution_32_bit_era_JRP_2026-11-09T13-02-05.png',
        'out_dir': OUT_BG,
        'out_name': 'bg_ayao_golden_dissolve',
        'desc': '阿瑶漫天金粉消散背景'
    },
    {
        'src': 'High_resolution_32_bit_era_JRP_2026-11-09T13-03-19.png',
        'out_dir': OUT_CG,
        'out_name': 'cg_mask_100score',
        'desc': '满分笑脸神经面具高清CG'
    },
    {
        'src': 'High_resolution_32_bit_era_JRP_2026-11-09T13-04-31.png',
        'out_dir': OUT_CG,
        'out_name': 'cg_grad_photo_2006',
        'desc': '2006年阿瑶与两位老师旧合照CG'
    }
]

def strip_black_bars(img, dark_thresh=35):
    w, h = img.size
    px = img.load()
    def col_dark(x):
        return all(sum(px[x, y]) < dark_thresh * 3 for y in range(0, h, max(1, h // 64)))
    def row_dark(y):
        return all(sum(px[x, y]) < dark_thresh * 3 for x in range(0, w, max(1, w // 64)))

    x0 = 0
    while x0 < w - 1 and col_dark(x0):
        x0 += 1
    x1 = w - 1
    while x1 > x0 and col_dark(x1):
        x1 -= 1
    x1 += 1

    y0 = 0
    while y0 < h - 1 and row_dark(y0):
        y0 += 1
    y1 = h - 1
    while y1 > y0 and row_dark(y1):
        y1 -= 1
    y1 += 1

    if (x1 - x0) < w * 0.95 or (y1 - y0) < h * 0.95:
        print(f"  Stripped black bars: x=[{x0}..{x1}], y=[{y0}..{y1}]")
        return img.crop((x0, y0, x1, y1))
    return img

def process_item(item):
    src_path = os.path.join(GEN, item['src'])
    out_dir = item['out_dir']
    out_name = item['out_name']
    print(f"Processing: {item['desc']} ({item['src']}) -> {out_name}")

    src = Image.open(src_path).convert('RGB')
    src = strip_black_bars(src)
    w, h = src.size

    # 裁成 16:9 (切除底部水印)
    crop_h = min(int(w * 9 / 16), h)
    cropped = src.crop((0, 0, w, crop_h)).resize((W, H), Image.LANCZOS)

    # 256 色量化
    pal_2x = cropped.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    out_2x_path = os.path.join(out_dir, f"{out_name}@2x.png")
    pal_2x.save(out_2x_path, optimize=True)

    # 1x 缩放并量化
    small = pal_2x.convert('RGB').resize((960, 540), Image.LANCZOS)
    pal_1x = small.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    out_1x_path = os.path.join(out_dir, f"{out_name}.png")
    pal_1x.save(out_1x_path, optimize=True)

    size_2x = os.path.getsize(out_2x_path) // 1024
    size_1x = os.path.getsize(out_1x_path) // 1024
    print(f"  -> {out_name}@2x.png: {size_2x} KB")
    print(f"  -> {out_name}.png: {size_1x} KB")

def main():
    for item in ITEMS:
        process_item(item)
    print("\nAll items processed successfully!")

if __name__ == '__main__':
    main()
