#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""处理严格对齐三位女学生原型立绘的 2006 年旧合照：
- 中间：年轻阿瑶 (ayao_default@2x.png)
- 左边：年轻刘老师 (young_liu_default@2x.png)
- 右边：年轻徐老师 (young_xu_default@2x.png)

裁切为 16:9 (1920x1080 @2x, 960x540 1x)，下方严格保留 1/3 纯白空间，256 色量化。
"""
import os
import sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'generated-images/High_resolution_32_bit_era_JRP_2026-11-09T14-32-53.png')
OUT_DIR = os.path.join(ROOT, 'assets/art')
OUT_2X = os.path.join(OUT_DIR, 'cg_grad_photo_2006@2x.png')
OUT_1X = os.path.join(OUT_DIR, 'cg_grad_photo_2006.png')

W, H = 1920, 1080

def build():
    print(f"Loading {SRC}...")
    src = Image.open(SRC).convert('RGB')
    w, h = src.size

    # 1536x1024 裁成 16:9 (1536x864)，自动裁除右下角水印
    crop_h = min(int(w * 9 / 16), h)
    cropped = src.crop((0, 0, w, crop_h)).resize((W, H), Image.LANCZOS)

    # 256 色量化
    pal_2x = cropped.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    pal_2x.save(OUT_2X, optimize=True)

    # 1x 960x540
    small = pal_2x.convert('RGB').resize((960, 540), Image.LANCZOS)
    pal_1x = small.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    pal_1x.save(OUT_1X, optimize=True)

    print(f"Saved 2x: {OUT_2X} ({os.path.getsize(OUT_2X) // 1024} KB)")
    print(f"Saved 1x: {OUT_1X} ({os.path.getsize(OUT_1X) // 1024} KB)")

if __name__ == '__main__':
    build()
