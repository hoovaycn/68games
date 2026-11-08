#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""构建第30章新增的两张场景背景图：
  1. bg_cargo_top_divine_light (正派召唤 · 金光普照天台)
  2. bg_cargo_top_aftermath (第二形态崩解 · 战后残骸)
1536x1024 -> 顶部对齐裁 16:9 (1536x864) 去除底部水印 -> 输出 1920x1080 (@2x) 与 960x540 (1x)
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT = os.path.join(ROOT, 'assets/backgrounds')
W, H = 1920, 1080

JOBS = [
    ('Pixel_art_JRPG_background__16__2026-11-08T06-13-20.png', 'bg_cargo_top_divine_light'),
    ('Pixel_art_JRPG_background__16__2026-11-08T06-14-09.png', 'bg_cargo_top_aftermath'),
]


def build_bg(src_name, out_name):
    src = Image.open(os.path.join(GEN, src_name)).convert('RGB')
    w, h = src.size
    crop_h = min(int(w * 9 / 16), h)  # 864
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
        build_bg(src, name)
