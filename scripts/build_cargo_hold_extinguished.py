#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""三号船底舱 · 火已扑灭（bg_cargo_hold_extinguished）
与 bg_cargo_hold_fire 同机位同构图，仅状态与色调变化：
1536x1024 -> 顶部对齐裁 16:9 -> 1920x1080 @2x + 960x540 1x，256 色量化
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT = os.path.join(ROOT, 'assets/backgrounds')
W, H = 1920, 1080
TOP_OFFSET = 40  # 只切掉顶部暗天花板，其余整幅缩放

JOBS = [
    ('Repaint_this_exact_same_scene__2026-11-07T01-13-41.png', 'bg_cargo_hold_extinguished'),
]


def clear_watermark(img):
    """右下角 'AI生成 WORKBUDDY' 水印：用同一行左侧的地面镜像过来盖掉，不动构图"""
    w, h = img.size
    x0, y0 = int(w * 0.875), int(h * 0.855)
    pw = w - x0
    patch = img.crop((x0 - pw, y0, x0, h)).transpose(Image.FLIP_LEFT_RIGHT)
    img.paste(patch, (x0, y0))
    return img


def build(src_name, out_name):
    src = Image.open(os.path.join(GEN, src_name)).convert('RGB')
    w, h = src.size
    crop_h = min(int(w * 9 / 16), h)
    # 整幅缩放进 16:9（只裁掉顶部 TOP_OFFSET 的暗天花板），保住铲刃与干粉地面
    box = src.crop((0, TOP_OFFSET, w, h)).resize((w, crop_h), Image.LANCZOS)
    img = box.resize((W, H), Image.LANCZOS)
    img = clear_watermark(img)

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
    for src, name in JOBS:
        build(src, name)
