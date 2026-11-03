#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""第三幕剧情 CG 特写批量后处理。

需求文档规定路径为 assets/art/cg_*@2x.png，但引擎里 CG 是当 bgImg 全屏铺的
（参见 story_chapter1.js 的 cg_pickup_bottle 用法），所以按 16:9 出图：
    assets/art/cg_xxx@2x.png  1920x1080
    assets/art/cg_xxx.png      960x540

用法： python scripts/build_act3_cg.py
"""
import os
import sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_act3_backgrounds import strip_black_bars  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT = os.path.join(ROOT, 'assets/art')
W, H = 1920, 1080

JOBS = [
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-54-10.png', 'cg_future_badge'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-54-20.png', 'cg_blood_warning_note'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-54-31.png', 'cg_mask_100score'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-54-42.png', 'cg_ayao_broken_pen'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-55-07.png', 'cg_folding_shovel'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-55-19.png', 'cg_snack_crushed'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-55-30.png', 'cg_grad_photo_2006'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-55-41.png', 'cg_repaired_humen_jar'),
]


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
    print('  ', out_name, os.path.getsize(os.path.join(OUT, out_name + '@2x.png')) // 1024, 'KB')


def sheet():
    cols, tw, th = 4, 480, 270
    rows = (len(JOBS) + cols - 1) // cols
    s = Image.new('RGB', (cols * tw, rows * th), (20, 20, 20))
    for i, (_, n) in enumerate(JOBS):
        im = Image.open(os.path.join(OUT, n + '.png')).convert('RGB').resize((tw, th), Image.LANCZOS)
        s.paste(im, ((i % cols) * tw, (i // cols) * th))
    p = os.path.join(GEN, '_act3_cg_contact.png')
    s.save(p)
    print('contact ->', p, s.size)


if __name__ == '__main__':
    for s_, o in JOBS:
        build(s_, o)
    sheet()
    print('DONE')
