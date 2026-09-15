#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kenney Roguelike Modern City（CC0）精选切片 -> 项目 assets。
16px 基格 ×3 对齐项目 48px 战棋网格；地砖 48×48，街具按占格输出。"""
import os, shutil
from PIL import Image, ImageDraw

ROOT = "/Users/hoovay/Doubao/fx_game"
SRC = os.path.join(ROOT, "work_ref/ext_pack/kenney_city/Spritesheet/roguelikeCity_magenta.png")
TILES = os.path.join(ROOT, "assets/tiles/kenney")
PROPS = os.path.join(ROOT, "assets/props/kenney")
os.makedirs(TILES, exist_ok=True)
os.makedirs(PROPS, exist_ok=True)
S = 17
K = 3  # 16px -> 48px

# 地砖：(名, c, r)
TILE_PICKS = [
    ("kc_asphalt", 10, 21),    # 纯柏油路面
    ("kc_sidewalk", 8, 20),    # 灰色砖人行道
    ("kc_brick_red", 2, 1),    # 红色铺装
    ("kc_grass", 1, 26),       # 草地
    ("kc_crosswalk", 10, 22),  # 斑马线片段
]
# 街具：(名, c, r, 跨列, 跨行)
PROP_PICKS = [
    ("kc_streetlight", 8, 16, 1, 2),    # 路灯 1×2
    ("kc_trafficlight", 2, 14, 1, 2),   # 信号灯杆 1×2
    ("kc_hydrant", 15, 14, 1, 1),       # 消防栓 1×1
    ("kc_trashbag", 13, 14, 1, 1),      # 垃圾袋 1×1
    ("kc_crate", 14, 16, 1, 1),         # 木箱 1×1
    ("kc_dumpster_green", 23, 26, 1, 2),# 绿色垃圾箱 1×2
    ("kc_tree_dark", 34, 11, 1, 2),     # 深绿树 1×2
    ("kc_barrier_stripe", 24, 11, 1, 3),# 绿白护栏 1×3
    ("kc_bollard", 4, 17, 1, 1),        # 隔离柱 1×1
]


def slice_sheet(sheet, c, r, w, h):
    return sheet.crop((c * S, r * S, c * S + 16 * w, r * S + 16 * h))


def main():
    sheet = Image.open(SRC).convert("RGBA")
    cells = []
    for name, c, r in TILE_PICKS:
        t = slice_sheet(sheet, c, r, 1, 1).resize((48, 48), Image.NEAREST)
        t.save(os.path.join(TILES, f"{name}.png"))
        t2 = t.resize((96, 96), Image.NEAREST)
        t2.save(os.path.join(TILES, f"{name}@2x.png"))
        cells.append((name, t))
    for name, c, r, w, h in PROP_PICKS:
        t = slice_sheet(sheet, c, r, w, h).resize((16 * w * K, 16 * h * K), Image.NEAREST)
        t.save(os.path.join(PROPS, f"{name}.png"))
        t.resize((32 * w * K, 32 * h * K), Image.NEAREST).save(
            os.path.join(PROPS, f"{name}@2x.png"))
        cells.append((name, t))
    # 预览
    cols, ch = 5, 120
    rows = (len(cells) + cols - 1) // cols
    preview = Image.new("RGB", (cols * 110, rows * ch), (40, 40, 55))
    d = ImageDraw.Draw(preview)
    for i, (name, t) in enumerate(cells):
        x, y = (i % cols) * 110 + 10, (i // cols) * ch + 8
        bg = Image.new("RGBA", t.size, (90, 90, 110, 255)); bg.alpha_composite(t)
        preview.paste(bg.convert("RGB"), (x, y))
        d.text((x, y + t.height + 4), name, fill=(255, 230, 120))
    preview.save(os.path.join(ROOT, "work_ref/ext_pack/final_extract.png"))
    # 原始整表与授权一并交付，研发可在 Tiled 里直接按 16+1 切
    shutil.copy(SRC, os.path.join(TILES, "roguelikeCity_full_transparent.png"))
    shutil.copy(os.path.join(ROOT, "work_ref/ext_pack/kenney_city/Spritesheet/spritesheetInfo.txt"),
                os.path.join(TILES, "spritesheetInfo.txt"))
    print("tiles:", len(TILE_PICKS), "props:", len(PROP_PICKS))


if __name__ == "__main__":
    main()
