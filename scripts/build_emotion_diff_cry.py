#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""全剧情绪差分（cry）立绘后处理：5 张哭脸差分。
管线对齐 build_act3_characters.py：
 1. 右下角水印涂成 #FF00FF
 2. 近洋红像素归一化纯 #FF00FF
 3. 主体包围盒裁切 -> 等比贴到 240x320 / 480x640 纯洋红画布
输出：assets/art/{base}.png + {base}@2x.png
"""
import os
import sys
from PIL import Image, ImageChops

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_act3_characters import clean, fit_solid  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
ART = os.path.join(ROOT, 'assets/art')

JOBS = [
    ('Keep_the_exact_same_character__2026-11-09T09-38-54.png', 'zhanghanyu_sad'),
    ('Keep_the_exact_same_character__2026-11-09T09-39-20.png', 'chenpinxuan_sad'),
    ('Keep_the_exact_same_character__2026-11-09T09-39-35.png', 'father_haifeng_police_tearful'),
    ('Keep_the_exact_same_character__2026-11-09T09-39-46.png', 'zhangxizhe_sad'),
    ('Keep_the_exact_same_character__2026-11-09T09-40-04.png', 'zhuyanze_sad'),
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
        p1 = os.path.join(ART, name + '.png')
        p2 = os.path.join(ART, name + '@2x.png')
        art1.save(p1, optimize=True)
        art2.save(p2, optimize=True)
        print('Built {}: 1x={}KB, @2x={}KB'.format(
            name, os.path.getsize(p1) // 1024, os.path.getsize(p2) // 1024))
        ok += 1
    print('DONE', ok, '/', len(JOBS))

if __name__ == '__main__':
    main()
