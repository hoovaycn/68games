#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""处理第一二幕老角色新表情立绘（输出 480x640 @2x 与 240x320 1x 到 assets/art/）。"""
import os
import sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_act3_characters import clean, content_bbox, magenta_ness, mag_layer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
ART = os.path.join(ROOT, 'assets/art')

def fit_solid_bottom(im, w, h):
    """等比缩放贴底对齐，保留纯洋红背景"""
    x0, y0, x1, y1 = content_bbox(im)
    cropped = im.crop((x0, y0, x1, y1))
    scale = min(w / cropped.width, h / cropped.height)
    nw, nh = max(1, round(cropped.width * scale)), max(1, round(cropped.height * scale))
    resized = cropped.resize((nw, nh), Image.LANCZOS)
    canvas = mag_layer((w, h)).copy()
    canvas.paste(resized, ((w - nw) // 2, h - nh))
    mask = magenta_ness(canvas).point(lambda v: 255 if v > 58 else 0)
    canvas.paste(mag_layer((w, h)), (0, 0), mask)
    return canvas

def build_single(gen_filename, output_name):
    src_p = os.path.join(GEN, gen_filename)
    if not os.path.exists(src_p):
        print(f"Error: {src_p} does not exist!")
        return False
    im = clean(Image.open(src_p))
    art2x = fit_solid_bottom(im, 480, 640)
    art1x = fit_solid_bottom(im, 240, 320)
    p2x = os.path.join(ART, f"{output_name}@2x.png")
    p1x = os.path.join(ART, f"{output_name}.png")
    art2x.save(p2x)
    art1x.save(p1x)
    print(f"Built {output_name}: 2x ({art2x.size}) -> {p2x}, 1x ({art1x.size}) -> {p1x}")
    return True

if __name__ == '__main__':
    if len(sys.argv) == 3:
        build_single(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python build_act1_act2_expressions.py <gen_file> <output_name>")
