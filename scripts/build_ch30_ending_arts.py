#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""用最新拔高消散位置（粉尘蔓延至胸口与脸颊侧面）的图重新构建 3 款消散立绘"""
import os
import sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_act3_characters import content_bbox, magenta_ness, mag_layer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
ART = os.path.join(ROOT, 'assets/art')

JOBS = [
    ('High_resolution_32_bit_era_JRP_2026-11-08T14-38-13.png', 'ayao_adult_dissolve'),
    ('High_resolution_32_bit_era_JRP_2026-11-08T14-39-08.png', 'lin_zexu_dissolve'),
    ('High_resolution_32_bit_era_JRP_2026-11-08T14-40-06.png', 'militia_instructor_dissolve'),
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
        print('Rebuilding', art_name, '<-', gen_name)
        im = prepare(src)

        art2x = fit_solid_bottom(im, 480, 640)
        art1x = fit_solid_bottom(im, 240, 320)

        p2x = os.path.join(ART, art_name + '@2x.png')
        p1x = os.path.join(ART, art_name + '.png')

        pal2x = art2x.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
        pal2x.save(p2x, optimize=True)

        pal1x = art1x.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
        pal1x.save(p1x, optimize=True)

        print('  Saved: {} (@2x={}KB, 1x={}KB)'.format(
            art_name, os.path.getsize(p2x) // 1024, os.path.getsize(p1x) // 1024))


if __name__ == '__main__':
    main()
