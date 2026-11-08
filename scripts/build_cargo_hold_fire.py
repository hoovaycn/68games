#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""三号船底舱烈火走廊 bg_cargo_hold_fire（32-bit 高密度重制版）
1536x1024 -> 顶部对齐裁 16:9 -> 1920x1080 @2x + 960x540 1x，256 色量化
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT = os.path.join(ROOT, 'assets/backgrounds')
W, H = 1920, 1080

JOBS = [
    ('Repaint_this_exact_same_scene__2026-11-07T00-46-23.png', 'bg_cargo_hold_fire'),
]


def build(src_name, out_name):
    src = Image.open(os.path.join(GEN, src_name)).convert('RGB')
    w, h = src.size
    crop_h = min(int(w * 9 / 16), h)
    # 顶部对齐裁成 16:9，同时裁掉右下角水印
    img = src.crop((0, 0, w, crop_h)).resize((W, H), Image.LANCZOS)

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
