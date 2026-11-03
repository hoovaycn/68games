#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""第三幕（第21~30章）场景背景批量后处理。

用法：
    python scripts/build_act3_backgrounds.py

流程（对齐 scripts/build_bg_canal_dawn.py 的既定管线）：
 1. ImageGen 原图 1536x1024
 2. 自动剥掉模型加的纯黑边（左右/上下）
 3. 顶对齐裁成 16:9（1536x864），同时把右下角「AI生成 WORKBUDDY」水印裁掉
 4. 放大到 1920x1080 → 256 色量化（MEDIANCUT + Floyd-Steinberg）→ @2x
 5. 缩到 960x540 → 再量化 → 1x
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT = os.path.join(ROOT, 'assets/backgrounds')
W, H = 1920, 1080
DARK = 42          # 判定「纯黑边」的亮度阈值

# (生图源文件, 输出资源名)
JOBS = [
    ('Hard_edged_16_bit_pixel_art_JR_2026-10-31T03-10-56.png', 'bg_counseling_room'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-15-57.png', 'bg_street_night_rain'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-16-47.png', 'bg_pier_night_rain'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-17-05.png', 'bg_future_city_ruins'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-19-49.png', 'bg_future_square_monument'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-17-37.png', 'bg_resistance_bunker'),
    ('Hard_edged_16_bit_pixel_art_JR_2026-10-31T03-12-55.png', 'bg_sky_exam_core'),
    ('Hard_edged_16_bit_pixel_art_JR_2026-10-31T03-13-12.png', 'bg_ayao_stasis_chamber'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-18-38.png', 'bg_reactor_core'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-16-13.png', 'bg_pier_sunset_cargo'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-18-06.png', 'bg_cargo_hold_fire'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-18-26.png', 'bg_cargo_top_throne'),
]


def strip_black_bars(im):
    """剥掉四边纯黑条（模型的 letterbox / pillarbox）。"""
    px = im.load()
    w, h = im.size

    def row_dark(y):
        return all(sum(px[x, y]) < DARK * 3 for x in range(0, w, 24))

    def col_dark(x):
        return all(sum(px[x, y]) < DARK * 3 for y in range(0, h, 24))

    top, bottom, left, right = 0, h - 1, 0, w - 1
    while top < h // 4 and row_dark(top):
        top += 1
    while bottom > h * 3 // 4 and row_dark(bottom):
        bottom -= 1
    while left < w // 4 and col_dark(left):
        left += 1
    while right > w * 3 // 4 and col_dark(right):
        right -= 1
    if (top, left, bottom, right) != (0, 0, h - 1, w - 1):
        print('    strip bars -> {}, {}, {}, {}'.format(left, top, right + 1, bottom + 1))
        im = im.crop((left, top, right + 1, bottom + 1))
    return im


def build(src_name, out_name):
    src = Image.open(os.path.join(GEN, src_name)).convert('RGB')
    src = strip_black_bars(src)
    w, h = src.size
    crop_h = min(int(w * 9 / 16), h)
    img = src.crop((0, 0, w, crop_h)).resize((W, H), Image.LANCZOS)

    pal = img.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    pal.save(os.path.join(OUT, out_name + '@2x.png'), optimize=True)

    small = pal.convert('RGB').resize((960, 540), Image.LANCZOS)
    small.quantize(colors=256, method=Image.MEDIANCUT,
                   dither=Image.FLOYDSTEINBERG).save(os.path.join(OUT, out_name + '.png'),
                                                      optimize=True)
    for suf in ('@2x.png', '.png'):
        p = os.path.join(OUT, out_name + suf)
        print('    {}  {} KB'.format(out_name + suf, os.path.getsize(p) // 1024))


def contact_sheet():
    """12 张拼 3x4 总览图，方便一眼过稿。"""
    cols, rows, tw, th = 3, 4, 640, 360
    sheet = Image.new('RGB', (cols * tw, rows * th), (24, 24, 24))
    for i, (_, out_name) in enumerate(JOBS):
        im = Image.open(os.path.join(OUT, out_name + '.png')).convert('RGB')
        im = im.resize((tw, th), Image.LANCZOS)
        sheet.paste(im, ((i % cols) * tw, (i // cols) * th))
    p = os.path.join(GEN, '_act3_bg_contact.png')
    sheet.save(p)
    print('contact sheet ->', p, sheet.size)


if __name__ == '__main__':
    for s, o in JOBS:
        print('build', o)
        build(s, o)
    contact_sheet()
    print('DONE')
