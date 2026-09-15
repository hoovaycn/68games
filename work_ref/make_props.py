#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""战棋地图散件：母版 -> 精确占格尺寸（#FF00FF 纯色底）+ @2x；地面 tile 整幅缩放。"""
import os
from PIL import Image
import numpy as np

ROOT = "/Users/hoovay/Doubao/fx_game"
RAW = os.path.join(ROOT, "work_ref/raw")
MAG = (255, 0, 255)

# (母版, 输出名, 基础宽, 基础高)  格子 48px
PROPS = [
    ("prop_snack_cart_raw.png", "prop_snack_cart", 96, 96),      # 2x2
    ("prop_trash_bin_raw.png", "prop_trash_bin", 48, 48),        # 1x1
    ("prop_bicycle_raw.png", "prop_bicycle", 48, 48),            # 1x1
    ("prop_streetlight_raw.png", "prop_streetlight", 48, 96),    # 1x2
    ("prop_school_gate_raw.png", "prop_school_gate", 144, 96),   # 3x2
]
TILES = [
    ("tile_pavement_raw.png", "tile_pavement"),
    ("tile_brick_raw.png", "tile_brick"),
]


def normalize_magenta(im, thr=58):
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    m = np.minimum(a[..., 0], a[..., 2]) - a[..., 1]
    out = np.asarray(im.convert("RGB")).copy()
    out[m > thr] = [255, 0, 255]
    return Image.fromarray(out)


def snap(im, thr=58):
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    m = np.minimum(a[..., 0], a[..., 2]) - a[..., 1]
    out = np.asarray(im.convert("RGB")).copy()
    out[m > thr] = [255, 0, 255]
    return Image.fromarray(out)


def bbox(im, pad=8):
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    m = np.minimum(a[..., 0], a[..., 2]) - a[..., 1]
    ys, xs = np.where(m < 60)
    return (max(xs.min() - pad, 0), max(ys.min() - pad, 0),
            min(xs.max() + pad, im.width), min(ys.max() + pad, im.height))


def fit(im, w, h, margin=0.94):
    im = normalize_magenta(im)
    im = im.crop(bbox(im))
    s = min(w / im.width, h / im.height) * margin
    nw, nh = max(1, round(im.width * s)), max(1, round(im.height * s))
    im = im.resize((nw, nh), Image.LANCZOS)
    canvas = Image.new("RGB", (w, h), MAG)
    canvas.paste(im, ((w - nw) // 2, (h - nh) // 2))
    return snap(canvas)


def main():
    pdir = os.path.join(ROOT, "assets/props")
    os.makedirs(pdir, exist_ok=True)
    for raw, name, w, h in PROPS:
        im = Image.open(os.path.join(RAW, raw))
        fit(im, w, h).save(os.path.join(pdir, f"{name}.png"))
        fit(im, w * 2, h * 2).save(os.path.join(pdir, f"{name}@2x.png"))
        print("prop", name, f"{w}x{h}")
    tdir = os.path.join(ROOT, "assets/tiles")
    os.makedirs(tdir, exist_ok=True)
    for raw, name in TILES:
        im = Image.open(os.path.join(RAW, raw)).convert("RGB")
        im.resize((48, 48), Image.LANCZOS).save(os.path.join(tdir, f"{name}.png"))
        im.resize((96, 96), Image.LANCZOS).save(os.path.join(tdir, f"{name}@2x.png"))
        print("tile", name)
    print("PROPS DONE")


if __name__ == "__main__":
    main()
