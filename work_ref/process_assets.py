#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""资产后处理：头像缩放 / 立绘与道具抠洋红底转透明，按研发规范落盘。"""
import os
from PIL import Image
import numpy as np

ROOT = "/Users/hoovay/Doubao/fx_game"
RAW = os.path.join(ROOT, "work_ref/raw")
P = os.path.join(ROOT, "assets/portraits")
A = os.path.join(ROOT, "assets/art")
I = os.path.join(ROOT, "assets/items")


def key_magenta(img):
    """洋红 #FF00FF 色键转透明：magenta-ness = min(R,B)-G，边缘平滑。"""
    img = img.convert("RGBA")
    a = np.asarray(img).astype(np.int16)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = np.minimum(r, b) - g  # 洋红处大，正常颜色处小或负
    alpha = np.clip((m - 25) * (255.0 / 70.0), 0, 255)  # 25..95 平滑带
    alpha = 255 - alpha
    # 边缘去洋红污染：半透明像素把 R/B 向 G 拉
    af = alpha / 255.0
    pull = (1 - af) * 0.85
    a[..., 0] = np.clip(r * (1 - pull) + g * pull, 0, 255)
    a[..., 2] = np.clip(b * (1 - pull) + g * pull, 0, 255)
    a[..., 3] = alpha
    out = Image.fromarray(a.astype(np.uint8), "RGBA")
    return crop_to_content(out)


def crop_to_content(img, pad=8):
    a = np.asarray(img)[..., 3]
    ys, xs = np.where(a > 12)
    if len(xs) == 0:
        return img
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, img.width)
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, img.height)
    return img.crop((x0, y0, x1, y1))


def fit_canvas(img, w, h):
    """等比缩放进 w×h 画布（高度优先），居中透明画布。"""
    scale = min(w / img.width, h / img.height)
    nw, nh = max(1, round(img.width * scale)), max(1, round(img.height * scale))
    img = img.resize((nw, nh), Image.LANCZOS)
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    canvas.paste(img, ((w - nw) // 2, (h - nh) // 2), img)
    return canvas


def portrait(src, name):
    img = Image.open(os.path.join(RAW, src)).convert("RGBA")
    for size, suffix in ((96, ""), (192, "@2x")):
        img.resize((size, size), Image.LANCZOS).save(
            os.path.join(P, f"{name}{suffix}.png"))
    print("portrait", name)


def bust(src, name):
    img = key_magenta(Image.open(os.path.join(RAW, src)))
    fit_canvas(img, 240, 320).save(os.path.join(A, f"{name}.png"))
    fit_canvas(img, 480, 640).save(os.path.join(A, f"{name}@2x.png"))
    print("bust", name)


def item(src, name):
    img = key_magenta(Image.open(os.path.join(RAW, src)))
    # 道具先裁成正方形画布再缩放
    s = max(img.size)
    sq = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    sq.paste(img, ((s - img.width) // 2, (s - img.height) // 2), img)
    for size, suffix in ((16, ""), (32, "@2x")):
        sq.resize((size, size), Image.LANCZOS).save(
            os.path.join(I, f"{name}{suffix}.png"))
    print("item", name)


PORTRAITS = [
    ("zhangzixiao_default_portrait.png", "zhangzixiao_default"),
    ("shiyunuo_default_portrait.png", "shiyunuo_default"),
    ("teacher_xu_default_portrait.png", "teacher_xu_default"),
    ("zhanghanyu_default_portrait.png", "zhanghanyu_default"),
    ("chenpinxuan_default_portrait.png", "chenpinxuan_default"),
    ("fanwenmo_corrupted_portrait.png", "fanwenmo_corrupted"),
    ("fanwenmo_default_portrait.png", "fanwenmo_default"),
    ("heyanxi_corrupted_portrait.png", "heyanxi_corrupted"),
    ("heyanxi_default_portrait.png", "heyanxi_default"),
]
BUSTS = [
    ("zhangzixiao_default_bust.png", "zhangzixiao_default"),
    ("shiyunuo_default_bust.png", "shiyunuo_default"),
    ("teacher_xu_default_bust.png", "teacher_xu_default"),
    ("zhanghanyu_default_bust.png", "zhanghanyu_default"),
    ("chenpinxuan_default_bust.png", "chenpinxuan_default"),
    ("fanwenmo_corrupted_bust.png", "fanwenmo_corrupted"),
    ("fanwenmo_default_bust.png", "fanwenmo_default"),
    ("heyanxi_corrupted_bust.png", "heyanxi_corrupted"),
    ("heyanxi_default_bust.png", "heyanxi_default"),
    ("vendor_default_bust.png", "vendor_default"),
    ("punk_default_bust.png", "punk_default"),
]
ITEMS = [
    ("sausage_raw.png", "sausage"),
    ("bastard_soda_raw.png", "bastard_soda"),
    ("suspicious_snack_raw.png", "suspicious_snack"),
    ("pencil_raw.png", "newbie_pencil"),
]

for s, n in PORTRAITS:
    portrait(s, n)
for s, n in BUSTS:
    bust(s, n)
for s, n in ITEMS:
    item(s, n)
print("DONE")
