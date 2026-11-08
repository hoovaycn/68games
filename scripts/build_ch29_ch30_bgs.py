#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""构建第29/30章天台场景背景图：
  1. bg_cargo_top_shattered (死锁崩解残骸)
  2. bg_cargo_top_second_form (净化主宰第二形态降临)

处理流程：
  - 1536x1024 裁切成 16:9 比例 (1536x864)
  - 对 bg_cargo_top_shattered：因在 y=799 处模型误画了一条对话框线，向上裁切 (0, 0, 1536, 796)，缩放到 1920x1080 与 960x540
  - 对 bg_cargo_top_second_form：顶部对齐裁 (0, 0, 1536, 864)（同时抹除右下角 AI 水印）
  - 256 色量化 (MEDIANCUT + FLOYDSTEINBERG)
  - 输出 1x (960x540) 与 2x (1920x1080)
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT = os.path.join(ROOT, 'assets/backgrounds')
W, H = 1920, 1080


def build_shattered(src_name, out_name):
    src = Image.open(os.path.join(GEN, src_name)).convert('RGB')
    w, h = src.size
    # y=798 以上是完美完整的甲板残骸，避开 y=799 的误画横线
    crop_h = 796
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


def build_second_form(src_name, out_name):
    src = Image.open(os.path.join(GEN, src_name)).convert('RGB')
    w, h = src.size
    crop_h = min(int(w * 9 / 16), h)  # 864
    # 顶部对齐裁 16:9，自动剔除底部的 160px 水印区
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
    build_shattered('High_resolution_32_bit_era_JRP_2026-11-07T15-38-36.png', 'bg_cargo_top_shattered')
    build_second_form('High_resolution_32_bit_era_JRP_2026-11-07T15-40-17.png', 'bg_cargo_top_second_form')
