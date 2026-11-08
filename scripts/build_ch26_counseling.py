#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""第二十六章 2026 心理咨询室脑波仪（黑白做旧版）
以彩色 bg_counseling_room_machine 为构图参考的图生图结果作为源：
裁掉上方做旧照片边框 -> 16:9 (1536x864) -> 分区重映射（内容区轻压缩、地面区展开）
-> 1920x1080 @2x + 960x540 1x，256 色量化
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT = os.path.join(ROOT, 'assets/backgrounds')
W2X, H2X = 1920, 1080

SRC = 'Repaint_this_exact_same_scene__2026-11-06T16-40-38.png'
NAME = 'bg_counseling_machine_flashback'

TOP_TRIM = 60      # 裁掉顶部做旧边框 + 多余天花板
BOTTOM_TRIM = 920  # 裁掉底部做旧边框 + 右下角 AI 水印
CONTENT_END = 780  # 源图里器械/杂物结束的行（以下是空地面）
DEST_H = 864       # 16:9 画布高度（宽度沿用源宽 1536）
CONTENT_DEST = 620  # 内容在成品中的结束行 -> 下方留出约 28% 空地
FEATHER = 70       # 接缝羽化像素


def remap(img):
    """把 [TOP_TRIM, CONTENT_END] 压到 [0, CONTENT_DEST]，[CONTENT_END, BOTTOM_TRIM] 展开到底部"""
    w = img.size[0]
    top = img.crop((0, TOP_TRIM, w, CONTENT_END))
    floor = img.crop((0, CONTENT_END, w, BOTTOM_TRIM))

    top_h = CONTENT_DEST
    floor_h = DEST_H - CONTENT_DEST

    top = top.resize((w, top_h), Image.LANCZOS)
    floor = floor.resize((w, floor_h), Image.LANCZOS)

    canvas = Image.new('RGB', (w, DEST_H))
    canvas.paste(top, (0, 0))

    # 羽化遮罩：地面区顶部 FEATHER 行渐入，避免出现硬接缝
    mask = Image.new('L', (w, floor_h), 255)
    px = mask.load()
    for y in range(min(FEATHER, floor_h)):
        v = int(255 * y / FEATHER)
        for x in range(w):
            px[x, y] = v
    canvas.paste(floor, (0, top_h), mask)
    return canvas


def main():
    src = Image.open(os.path.join(GEN, SRC)).convert('RGB')
    canvas = remap(src).resize((W2X, H2X), Image.LANCZOS)

    pal = canvas.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    out_2x = os.path.join(OUT, NAME + '@2x.png')
    pal.save(out_2x, optimize=True)

    small = pal.convert('RGB').resize((960, 540), Image.LANCZOS)
    out_1x = os.path.join(OUT, NAME + '.png')
    small.quantize(colors=256, method=Image.MEDIANCUT,
                   dither=Image.FLOYDSTEINBERG).save(out_1x, optimize=True)

    print('Built {}: @2x={}KB, 1x={}KB'.format(
        NAME, os.path.getsize(out_2x) // 1024, os.path.getsize(out_1x) // 1024))


if __name__ == '__main__':
    main()
