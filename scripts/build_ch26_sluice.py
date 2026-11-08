#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""第二十六章 2006 地下水闸地下室背景（怀旧黑白老照片风）
1536x1024 -> 顶部对齐裁 16:9 -> 轻微提亮中间调 -> 1920x1080 @2x + 960x540 1x，256 色量化
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT = os.path.join(ROOT, 'assets/backgrounds')
W, H = 1920, 1080
GAMMA = 1.14  # 略微提亮中间调，避免暗部糊成一片

JOBS = [
    ('Pixel_art_background__2006_dim_2026-11-06T16-37-18.png', 'bg_sluice_basement_2006'),
]


def lift(im, gamma):
    lut = [min(255, int(round(255 * ((i / 255) ** (1.0 / gamma))))) for i in range(256)]
    return im.point(lut * 3)


def build(src_name, out_name):
    src = Image.open(os.path.join(GEN, src_name)).convert('RGB')
    w, h = src.size
    crop_h = min(int(w * 9 / 16), h)
    img = src.crop((0, 0, w, crop_h)).resize((W, H), Image.LANCZOS)
    img = lift(img, GAMMA)

    pal = img.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    out_2x = os.path.join(OUT, out_name + '@2x.png')
    pal.save(out_2x, optimize=True)

    small = pal.convert('RGB').resize((960, 540), Image.LANCZOS)
    out_1x = os.path.join(OUT, out_name + '.png')
    small.quantize(colors=256, method=Image.MEDIANCUT,
                   dither=Image.FLOYDSTEINBERG).save(out_1x, optimize=True)

    print('Built {}: @2x={}KB, 1x={}KB'.format(
        out_name, os.path.getsize(out_2x) // 1024, os.path.getsize(out_1x) // 1024))


if __name__ == '__main__':
    for src, name in JOBS:
        build(src, name)
