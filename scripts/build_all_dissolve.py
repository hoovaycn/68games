#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""按用户确认的一套图，统一产出 7 张「金光消散」立绘（@2x + 1x）。

流程与既有立绘一致：
1. 裁掉底部 7.5% 水印带
2. 洋红纯净化为 #FF00FF
3. 取内容外框等比压入 240x320 / 480x640，底部对齐
4. 256 色量化输出
"""
import os
import sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_act3_characters import content_bbox, magenta_ness, mag_layer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
ART = os.path.join(ROOT, 'assets/art')

JOBS = [
    ('Image_to_image__Keep_the_chara_2026-11-08T15-19-35.png', 'ayao_adult_dissolve'),
    ('Image_to_image__Keep_the_exact_2026-11-08T15-20-36.png', 'fanwenmo_adult_dissolve'),
    ('Image_to_image__Keep_the_exact_2026-11-08T15-20-47.png', 'heyanxi_adult_dissolve'),
    ('Image_to_image__Keep_the_exact_2026-11-08T15-21-00.png', 'mc_adult_yunuo_dissolve'),
    ('Image_to_image__Keep_the_exact_2026-11-08T15-21-20.png', 'mc_adult_zixiao_dissolve'),
    ('Image_to_image__Keep_the_exact_2026-11-08T15-21-32.png', 'lin_zexu_dissolve'),
    ('Image_to_image__Keep_the_exact_2026-11-08T15-21-43.png', 'militia_instructor_dissolve'),
]


def prepare(src_path):
    im = Image.open(src_path).convert('RGB')
    w, h = im.size
    im = im.crop((0, 0, w, int(round(h * 0.925))))
    mask = magenta_ness(im).point(lambda v: 255 if v > 58 else 0)
    im.paste(mag_layer(im.size), (0, 0), mask)
    return im


def fit_solid_bottom(im, w, h):
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


def main():
    for gen_name, art_name in JOBS:
        src = os.path.join(GEN, gen_name)
        if not os.path.exists(src):
            print('MISSING', gen_name)
            continue
        im = prepare(src)
        p2x = os.path.join(ART, art_name + '@2x.png')
        p1x = os.path.join(ART, art_name + '.png')
        fit_solid_bottom(im, 480, 640).quantize(
            colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG).save(p2x, optimize=True)
        fit_solid_bottom(im, 240, 320).quantize(
            colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG).save(p1x, optimize=True)
        print('  {} -> @2x {}KB / 1x {}KB'.format(
            art_name, os.path.getsize(p2x) // 1024, os.path.getsize(p1x) // 1024))


if __name__ == '__main__':
    main()
