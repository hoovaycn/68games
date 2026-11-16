#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""重新生成 7 张剧情 CG（去 32bit 术语，纯像素风 + 高密度网格 + 下方留白）后处理。
源图 1536x1024 -> 顶部对齐裁 16:9 -> 1920x1080 @2x + 960x540 1x，256 色量化（NEAREST 保像素边）
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT = os.path.join(ROOT, 'assets/art')
W, H = 1920, 1080

# (生图源文件, 输出资源名)
JOBS = [
    ('High_resolution_pixel_art_styl_2026-11-09T09-33-22.png', 'cg_blood_warning_note'),
    ('High_resolution_pixel_art_styl_2026-11-09T09-33-37.png', 'cg_mask_100score'),
    ('High_resolution_pixel_art_styl_2026-11-09T09-33-48.png', 'cg_ayao_broken_pen'),
    ('High_resolution_pixel_art_styl_2026-11-09T09-34-04.png', 'cg_folding_shovel'),
    ('High_resolution_pixel_art_styl_2026-11-09T09-34-22.png', 'cg_snack_crushed'),
    ('High_resolution_pixel_art_styl_2026-11-09T09-34-34.png', 'cg_grad_photo_2006'),
    ('High_resolution_pixel_art_styl_2026-11-09T09-34-49.png', 'cg_repaired_humen_jar'),
]

def build(src_name, out_name):
    src = Image.open(os.path.join(GEN, src_name)).convert('RGB')
    w, h = src.size
    crop_h = min(int(w * 9 / 16), h)
    img = src.crop((0, 0, w, crop_h))

    # @2x: 源分辨率量化(无抖动保硬像素边) + NEAREST 放大
    pal = img.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.NONE)
    up = pal.convert('RGB').resize((W, H), Image.NEAREST)
    out_2x = os.path.join(OUT, out_name + '@2x.png')
    up.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.NONE).save(out_2x, optimize=True)

    # 1x: LANCZOS 缩到 960x540 再量化
    small = img.resize((960, 540), Image.LANCZOS)
    out_1x = os.path.join(OUT, out_name + '.png')
    small.quantize(colors=256, method=Image.MEDIANCUT,
                   dither=Image.FLOYDSTEINBERG).save(out_1x, optimize=True)

    print('Built {}: @2x={}KB, 1x={}KB'.format(
        out_name, os.path.getsize(out_2x) // 1024, os.path.getsize(out_1x) // 1024))

if __name__ == '__main__':
    for src, name in JOBS:
        build(src, name)
    print('DONE')
