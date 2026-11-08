#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""第二十五章 未来死城 / 时空门 背景（彩色版 -> 怀旧黑白老照片风）
1536x1024 -> 顶部对齐裁 16:9 -> 1920x1080 @2x + 960x540 1x，256 色量化
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT = os.path.join(ROOT, 'assets/backgrounds')
W, H = 1920, 1080

JOBS = [
    ('Repaint_this_exact_same_compos_2026-11-06T16-07-40.png', 'bg_future_exam_city'),
    ('Repaint_this_exact_same_compos_2026-11-06T16-07-58.png', 'bg_timegate_case_send'),
]


def build(src_name, out_name):
    src = Image.open(os.path.join(GEN, src_name)).convert('RGB')
    w, h = src.size
    crop_h = min(int(w * 9 / 16), h)
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
