#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT = os.path.join(ROOT, 'assets/backgrounds')
W, H = 1920, 1080
DARK = 42

JOBS = [
    ('High_resolution_32_bit_era_JRP_2026-11-05T15-31-24.png', 'bg_metal_case'),
    ('High_resolution_32_bit_era_JRP_2026-11-05T15-32-20.png', 'bg_metal_case_open_badge')
]

def strip_black_bars(im):
    px = im.load()
    w, h = im.size

    def row_dark(y):
        return all(sum(px[x, y]) < DARK * 3 for x in range(0, w, 24))

    def col_dark(x):
        return all(sum(px[x, y]) < DARK * 3 for y in range(0, h, 24))

    top, bottom, left, right = 0, h - 1, 0, w - 1
    while top < h // 4 and row_dark(top):
        top += 1
    while bottom > h * 3 // 4 and row_dark(bottom):
        bottom -= 1
    while left < w // 4 and col_dark(left):
        left += 1
    while right > w * 3 // 4 and col_dark(right):
        right -= 1
    if (top, left, bottom, right) != (0, 0, h - 1, w - 1):
        print('    strip bars -> {}, {}, {}, {}'.format(left, top, right + 1, bottom + 1))
        im = im.crop((left, top, right + 1, bottom + 1))
    return im

def build(src_name, out_name):
    src = Image.open(os.path.join(GEN, src_name)).convert('RGB')
    src = strip_black_bars(src)
    w, h = src.size
    crop_h = min(int(w * 9 / 16), h)
    # 顶部对齐裁成 16:9，顺便裁掉右下角水印
    img = src.crop((0, 0, w, crop_h)).resize((W, H), Image.LANCZOS)

    # 2x 高清版 1920x1080 256色量化
    pal = img.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    out_2x = os.path.join(OUT, out_name + '@2x.png')
    pal.save(out_2x, optimize=True)

    # 1x 标清版 960x540 256色量化
    small = pal.convert('RGB').resize((960, 540), Image.LANCZOS)
    out_1x = os.path.join(OUT, out_name + '.png')
    small.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG).save(out_1x, optimize=True)

    print(f"Built {out_name}: @2x={os.path.getsize(out_2x)//1024}KB, 1x={os.path.getsize(out_1x)//1024}KB")

if __name__ == '__main__':
    for src, name in JOBS:
        build(src, name)
