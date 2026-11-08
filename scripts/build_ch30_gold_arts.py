#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""构建第30章正派「金光/光芒万丈」立绘（6 张，各出 1x 与 @2x）：
  1. lin_zexu_gold (@2x: 480x640, 1x: 240x320)
  2. militia_instructor_gold
  3. mc_adult_zixiao_gold
  4. mc_adult_yunuo_gold
  5. fanwenmo_adult_gold
  6. heyanxi_adult_gold

需求规范：
  - 角色全身覆盖柔和耀眼的纯阳金光、金色气芒流转
  - 继承原型的面部、发型、服装特征
  - 贴底对齐，纯洋红底 (255, 0, 255)（兼容引擎色键抠像）
  - 右下角水印剪裁防缺口处理
  - 256 色量化
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
    ('Pixel_art__16_bit_retro_JRPG_c_2026-11-08T06-19-08.png', 'lin_zexu_gold'),
    ('Pixel_art__16_bit_retro_JRPG_c_2026-11-08T06-20-00.png', 'militia_instructor_gold'),
    ('Pixel_art__16_bit_retro_JRPG_c_2026-11-08T06-21-10.png', 'mc_adult_zixiao_gold'),
    ('Pixel_art__16_bit_retro_JRPG_c_2026-11-08T06-24-38.png', 'mc_adult_yunuo_gold'),
    ('Pixel_art__16_bit_retro_JRPG_c_2026-11-08T06-25-37.png', 'fanwenmo_adult_gold'),
    ('Pixel_art__16_bit_retro_JRPG_c_2026-11-08T06-26-29.png', 'heyanxi_adult_gold'),
]


def prepare(src_path):
    """裁掉右下角带水印的底边 7.5%，再将近洋红归一化为纯洋红"""
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
        print('Building', art_name, '<-', gen_name)
        im = prepare(src)

        art2x = fit_solid_bottom(im, 480, 640)
        art1x = fit_solid_bottom(im, 240, 320)

        # 256 色量化并保存
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
