#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""构建第30章结局背景图：
  1. bg_school_gate_afternoon (初中校门口 · 秋日午后)
  2. bg_watergate_renewed (翻新后的老水闸)
  3. bg_ending_dawn (走下三号船 · 破晓)

管线（针对「像素不够细 / 发糊」的反馈调整过）：
  1536x1024 -> 顶部对齐裁 16:9 (1536x864) 去水印
  -> 在源分辨率上做 256 色量化（无抖动，保留硬像素边）
  -> NEAREST 放大到 1920x1080 (@2x)，避免 LANCZOS 二次模糊 + 抖动噪点
  -> 1x 用 LANCZOS 从源缩到 960x540 再量化
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT = os.path.join(ROOT, 'assets/backgrounds')
W, H = 1920, 1080

JOBS = [
    ('High_resolution_32_bit_era_JRP_2026-11-08T15-35-55.png', 'bg_school_gate_afternoon'),
    ('IMAGE_1_controls_the_LAYOUT_ON_2026-11-08T15-42-37.png', 'bg_watergate_renewed'),
    ('IMAGE_1_controls_the_LAYOUT_ON_2026-11-08T15-44-51.png', 'bg_ending_dawn'),
]


def build_bg(src_name, out_name):
    src = Image.open(os.path.join(GEN, src_name)).convert('RGB')
    w, h = src.size
    crop_h = min(int(w * 9 / 16), h)  # 864
    img = src.crop((0, 0, w, crop_h))

    # 源分辨率量化：保留硬像素边，不带抖动噪点
    pal = img.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.NONE)
    up = pal.convert('RGB').resize((W, H), Image.NEAREST)
    out_2x = os.path.join(OUT, out_name + '@2x.png')
    up.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.NONE).save(out_2x, optimize=True)

    small = img.resize((960, 540), Image.LANCZOS)
    out_1x = os.path.join(OUT, out_name + '.png')
    small.quantize(colors=256, method=Image.MEDIANCUT,
                   dither=Image.FLOYDSTEINBERG).save(out_1x, optimize=True)

    print('Built {}: @2x={}KB, 1x={}KB'.format(
        out_name, os.path.getsize(out_2x) // 1024, os.path.getsize(out_1x) // 1024))


if __name__ == '__main__':
    for src, name in JOBS:
        build_bg(src, name)
