#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""第三十章最终决战：阿瑶第二形态 + 沈崇礼之魂 + 沈万廷之魂

交付：
  assets/art/ayao_final_form_default(@2x).png      480x640 / 240x320
  assets/portraits/ayao_final_form_default(@2x).png 192 / 96
  assets/art/shen_chongli_soul_default(@2x).png
  assets/portraits/shen_chongli_soul(@2x).png
  assets/art/shen_wanting_soul_default(@2x).png
  assets/portraits/shen_wanting_soul(@2x).png
"""
import os
import sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_act3_characters import clean, content_bbox, magenta_ness, mag_layer, portrait_from

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
ART = os.path.join(ROOT, 'assets/art')
POR = os.path.join(ROOT, 'assets/portraits')

# (生成图, 立绘名, 头像名)
JOBS = [
    ('Pixel_art__JRPG_FINAL_BOSS_PHA_2026-11-07T07-41-42.png',
     'ayao_final_form_default', 'ayao_final_form_default'),
    ('Repaint_this_exact_same_man_as_2026-11-07T04-52-43.png',
     'shen_chongli_soul_default', 'shen_chongli_soul'),
    ('Repaint_this_exact_same_old_ma_2026-11-07T04-52-06.png',
     'shen_wanting_soul_default', 'shen_wanting_soul'),
]


def prepare(src_path):
    """裁掉右下角水印所在的底边（避免 clean() 涂洋红在人物上留缺口），再归一化近洋红。"""
    im = Image.open(src_path).convert('RGB')
    w, h = im.size
    im = im.crop((0, 0, w, int(round(h * 0.918))))
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
    for gen_name, art_name, por_name in JOBS:
        src = os.path.join(GEN, gen_name)
        print('Processing', art_name, '<-', gen_name)
        im = prepare(src)

        art2x = fit_solid_bottom(im, 480, 640)
        art1x = fit_solid_bottom(im, 240, 320)
        art2x.save(os.path.join(ART, art_name + '@2x.png'))
        art1x.save(os.path.join(ART, art_name + '.png'))

        por2x = portrait_from(art2x, 192)
        por1x = portrait_from(art2x, 96)
        por2x.save(os.path.join(POR, por_name + '@2x.png'))
        por1x.save(os.path.join(POR, por_name + '.png'))

        print('  art 480x640 / 240x320 | portrait 192 / 96  OK')


if __name__ == '__main__':
    main()
