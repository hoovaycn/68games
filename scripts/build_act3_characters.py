#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""第三幕（第21~30章）角色立绘 + 头像批量后处理（纯 PIL，无需 numpy）。

用法：
    python scripts/build_act3_characters.py

管线（对齐 work_ref/make_solid.py 的既定规范）：
 1. ImageGen 图生图原图 1024x1536，右下角带「AI生成 WORKBUDDY」水印
 2. 先把右下角水印区涂成 #FF00FF
 3. 近洋红像素归一化为纯 #FF00FF（角色主体本身不含洋红，安全）
 4. 按主体包围盒裁切 → 等比贴到 240x320 / 480x640 纯洋红画布
 5. 头像：从 @2x 立绘按「头部方块」裁出 96x96 / 192x192

输出目录：assets/art/、assets/portraits/
"""
import os
from PIL import Image, ImageChops

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
ART = os.path.join(ROOT, 'assets/art')
POR = os.path.join(ROOT, 'assets/portraits')
MAG = (255, 0, 255)
MAG_IMG_CACHE = {}


def magenta_ness(im):
    """min(R,B) - G，洋红处接近 255，正常颜色处接近 0。"""
    r, g, b = im.convert('RGB').split()
    return ImageChops.subtract(ImageChops.darker(r, b), g)


def mag_layer(size):
    if size not in MAG_IMG_CACHE:
        MAG_IMG_CACHE[size] = Image.new('RGB', size, MAG)
    return MAG_IMG_CACHE[size]


def clean(im):
    """涂掉右下角水印 + 近洋红归一化。"""
    im = im.convert('RGB')
    w, h = im.size
    im.paste(mag_layer((int(w * 0.16), int(h * 0.075))), (int(w * 0.84), int(h * 0.925)))
    mask = magenta_ness(im).point(lambda v: 255 if v > 58 else 0)
    im.paste(mag_layer(im.size), (0, 0), mask)
    return im


def content_bbox(im, pad=6):
    mask = magenta_ness(im).point(lambda v: 255 if v < 60 else 0)
    box = mask.getbbox()
    if not box:
        return (0, 0, im.width, im.height)
    x0, y0, x1, y1 = box
    return (max(x0 - pad, 0), max(y0 - pad, 0),
            min(x1 + pad, im.width), min(y1 + pad, im.height))


def fit_solid(im, w, h, margin=0.97):
    x0, y0, x1, y1 = content_bbox(im)
    im = im.crop((x0, y0, x1, y1))
    scale = min(w / im.width, h / im.height) * margin
    nw, nh = max(1, round(im.width * scale)), max(1, round(im.height * scale))
    im = im.resize((nw, nh), Image.LANCZOS)
    canvas = mag_layer((w, h)).copy()
    canvas.paste(im, ((w - nw) // 2, (h - nh) // 2))
    mask = magenta_ness(canvas).point(lambda v: 255 if v > 58 else 0)
    canvas.paste(mag_layer((w, h)), (0, 0), mask)
    return canvas


def portrait_from(art2x, size):
    """从 480x640 立绘裁头部方块：按「头部带」的列投影定位头心，避开粒子/武器干扰。"""
    x0, y0, x1, y1 = content_bbox(art2x)
    ch = y1 - y0
    band_h = max(int(ch * 0.22), 1)
    band = art2x.crop((0, y0, art2x.width, y0 + band_h))
    mask = magenta_ness(band).point(lambda v: 255 if v < 60 else 0)
    proj = mask.resize((band.width, 1), Image.BOX)   # 每列内容占比
    px = proj.load()
    cols = [x for x in range(band.width) if px[x, 0] > 12]
    if cols:
        hx0, hx1 = cols[0], cols[-1]
    else:
        hx0, hx1 = x0, x1
    hcx = (hx0 + hx1) // 2
    head_w = max(hx1 - hx0, 1)
    side = int(head_w * 1.32)
    side = max(side, 150)
    side = min(side, int(ch * 0.55), art2x.width)
    top = max(y0 - int(side * 0.03), 0)
    left = max(0, min(hcx - side // 2, art2x.width - side))
    crop = art2x.crop((left, top, left + side, min(top + side, art2x.height)))
    canvas = mag_layer((side, side)).copy()
    canvas.paste(crop, (0, 0))
    return canvas.resize((size, size), Image.LANCZOS)


JOBS = [
    ('Keep_the_exact_same_character__2026-10-31T03-40-11.png', 'su_wan_doctor_default'),
    ('Same_character__same_outfit__s_2026-10-31T03-42-34.png', 'su_wan_doctor_concerned'),
    ('Same_character__same_outfit__s_2026-10-31T03-42-47.png', 'su_wan_doctor_cold'),

    ('Keep_the_exact_same_character__2026-10-31T03-40-24.png', 'ayao_adult_default'),
    ('Same_character__same_loose_bro_2026-10-31T03-42-59.png', 'ayao_adult_tearful'),
    ('Same_character__same_loose_bro_2026-10-31T03-43-11.png', 'ayao_adult_smile'),

    ('Keep_the_exact_same_face_and_t_2026-10-31T03-41-17.png', 'ayao_corrupted_god_default'),
    ('Same_character__same_levitatin_2026-10-31T03-43-33.png', 'ayao_corrupted_god_machine'),

    ('Keep_the_exact_same_facial_str_2026-10-31T03-43-48.png', 'ayao_aged_2046_default'),
    ('Same_character__same_white_hai_2026-10-31T03-44-33.png', 'ayao_aged_2046_weeping'),

    ('Keep_the_exact_same_character__2026-10-31T03-38-38.png', 'mc_adult_zixiao_default'),
    ('Same_character__same_buzz_cut__2026-10-31T03-43-59.png', 'mc_adult_zixiao_gentle'),
    ('Same_character__same_buzz_cut__2026-10-31T03-44-12.png', 'mc_adult_zixiao_fury'),
    ('Same_character__same_face__sam_2026-10-31T03-44-44.png', 'mc_adult_zixiao_dissolve'),

    ('Keep_the_exact_same_character__2026-10-31T03-39-06.png', 'mc_adult_yunuo_default'),
    ('Same_character__same_short_bob_2026-10-31T03-44-56.png', 'mc_adult_yunuo_gentle'),
    ('Same_character__same_short_bob_2026-10-31T03-45-08.png', 'mc_adult_yunuo_charge'),
    ('Same_character__same_short_bob_2026-10-31T03-45-29.png', 'mc_adult_yunuo_dissolve'),

    ('Keep_the_exact_same_character__2026-10-31T03-39-18.png', 'fanwenmo_adult_default'),
    ('Same_character__same_tan_skin__2026-10-31T03-45-42.png', 'fanwenmo_adult_tearful'),
    ('Same_character__same_tan_skin__2026-10-31T03-45-55.png', 'fanwenmo_adult_dissolve'),

    ('Keep_the_exact_same_character__2026-10-31T03-39-30.png', 'heyanxi_adult_default'),
    ('Same_character__same_high_pony_2026-10-31T03-46-10.png', 'heyanxi_adult_aim'),
    ('Same_character__same_high_pony_2026-10-31T03-46-32.png', 'heyanxi_adult_hug'),
    ('Same_character__same_high_pony_2026-10-31T03-46-46.png', 'heyanxi_adult_dissolve'),

    ('Keep_the_exact_same_character__2026-10-31T03-40-52.png', 'haifeng_burnt_default'),
    ('Same_character__same_soot_cove_2026-10-31T03-47-00.png', 'haifeng_burnt_rage'),
    ('Same_character__same_soot_cove_2026-10-31T03-47-13.png', 'haifeng_burnt_tears'),

    ('Keep_the_exact_same_character__2026-10-31T03-41-44.png', 'teacher_xu_burnt_default'),
    ('Same_character__same_soot_smea_2026-10-31T03-47-36.png', 'teacher_xu_burnt_choke'),
    ('Same_character__same_soot_smea_2026-10-31T03-47-51.png', 'teacher_xu_burnt_hug'),

    ('Keep_the_exact_same_character__2026-10-31T03-41-56.png', 'teacher_liu_burnt_default'),
    ('Same_character__same_long_mess_2026-10-31T03-48-03.png', 'teacher_liu_burnt_choke'),
    ('Same_character__same_long_mess_2026-10-31T03-48-16.png', 'teacher_liu_burnt_hug'),

    ('Keep_the_exact_same_character__2026-10-31T03-40-35.png', 'teacher_xubox_stealth_default'),
    ('Same_character__same_dark_cap__2026-10-31T03-48-38.png', 'teacher_xubox_stealth_pale'),
    ('Same_character__same_dark_cap__2026-10-31T03-48-50.png', 'teacher_xubox_stealth_pain'),
]


def main():
    ok = 0
    for src, name in JOBS:
        p = os.path.join(GEN, src)
        if not os.path.exists(p):
            print('  MISSING', src)
            continue
        im = clean(Image.open(p))
        art1 = fit_solid(im, 240, 320)
        art2 = fit_solid(im, 480, 640)
        art1.save(os.path.join(ART, name + '.png'))
        art2.save(os.path.join(ART, name + '@2x.png'))
        portrait_from(art2, 96).save(os.path.join(POR, name + '.png'))
        portrait_from(art2, 192).save(os.path.join(POR, name + '@2x.png'))
        ok += 1
    print('DONE', ok, '/', len(JOBS))


if __name__ == '__main__':
    main()
