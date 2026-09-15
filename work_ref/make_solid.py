#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""统一纯色底（#FF00FF）终版：头像/立绘/道具全部直接从 1024 原始母版处理，
全程不经过透明通道（避免 LANCZOS 黑边），输出到 assets/ 对应目录。"""
import os
from collections import deque
from PIL import Image
import numpy as np

ROOT = "/Users/hoovay/Doubao/fx_game"
RAW = os.path.join(ROOT, "work_ref/raw")
MAG = (255, 0, 255)

PORTRAITS = [
    ("zhangzixiao_default_portrait.png", "zhangzixiao_default"),
    ("shiyunuo_default_portrait.png", "shiyunuo_default"),
    ("teacher_xu_default_portrait.png", "teacher_xu_default"),
    ("zhanghanyu_default_portrait.png", "zhanghanyu_default"),
    ("chenpinxuan_default_portrait.png", "chenpinxuan_default"),
    ("fanwenmo_default_portrait.png", "fanwenmo_default"),
    ("fanwenmo_corrupted_portrait.png", "fanwenmo_corrupted"),
    ("heyanxi_default_portrait.png", "heyanxi_default"),
    ("heyanxi_corrupted_portrait.png", "heyanxi_corrupted"),
]
BUSTS = [
    ("zhangzixiao_default_bust.png", "zhangzixiao_default"),
    ("shiyunuo_default_bust.png", "shiyunuo_default"),
    ("teacher_xu_default_bust.png", "teacher_xu_default"),
    ("zhanghanyu_default_bust.png", "zhanghanyu_default"),
    ("chenpinxuan_default_bust.png", "chenpinxuan_default"),
    ("fanwenmo_default_bust.png", "fanwenmo_default"),
    ("fanwenmo_corrupted_bust.png", "fanwenmo_corrupted"),
    ("heyanxi_default_bust.png", "heyanxi_default"),
    ("heyanxi_corrupted_bust.png", "heyanxi_corrupted"),
    ("vendor_default_bust.png", "vendor_default"),
    ("punk_default_bust.png", "punk_default"),
]
ITEMS = [
    ("sausage_raw.png", "sausage"),
    ("bastard_soda_raw.png", "bastard_soda"),
    ("suspicious_snack_raw.png", "suspicious_snack"),
    ("pencil_raw.png", "newbie_pencil"),
]


def flood_bg_rgb(arr, tol=42):
    """从四边泛洪，返回背景掩码（只换连通背景）。"""
    a = arr.astype(np.int16)
    h, w = a.shape[:2]
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    ref = np.median(border, axis=0)
    seen = np.zeros((h, w), bool)
    mask = np.zeros((h, w), bool)
    q = deque([(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)])
    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or seen[y, x]:
            continue
        seen[y, x] = True
        if np.max(np.abs(a[y, x] - ref)) > tol:
            continue
        mask[y, x] = True
        q.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])
    return mask


def normalize_magenta(im, thr=58):
    """把 AI 生成的'近似洋红'背景全部归一化为纯 #FF00FF（角色本身不含洋红，安全）。"""
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    m = np.minimum(a[..., 0], a[..., 2]) - a[..., 1]
    out = np.asarray(im.convert("RGB")).copy()
    out[m > thr] = [255, 0, 255]
    return Image.fromarray(out)


def remove_bg_flood(im, local_tol=34, hue_tol=38, sat_min=0.16):
    """脏杂色底专用：全分辨率从四边泛洪。双闸门——(1) 与已纳入背景的邻点色差小；
    (2) 像素色相必须接近背景洋红色相且有一定饱和度（灰夹克/蓝西装/棕背心/肤色
    色相不同，直接排除，抗锯齿软描边也爬不进去）。"""
    from collections import deque
    import colorsys
    full = np.asarray(im.convert("RGB")).copy()
    h, w = full.shape[:2]
    a = full.astype(np.int16)
    af = full.astype(np.float32) / 255.0
    maxc = af.max(2); minc = af.min(2); delta = (maxc - minc)
    sat = np.where(maxc > 1e-6, delta / np.maximum(maxc, 1e-6), 0.0)
    hue = np.zeros((h, w), np.float32)
    r, g, b = af[..., 0], af[..., 1], af[..., 2]
    mask_r = (maxc == r)
    mask_g = (maxc == g) & ~mask_r
    mask_b = ~mask_r & ~mask_g
    hue[mask_r] = 60 * (((g - b) / np.maximum(delta, 1e-6))[mask_r] % 6)
    hue[mask_g] = 60 * (((b - r) / np.maximum(delta, 1e-6))[mask_g] + 2)
    hue[mask_b] = 60 * (((r - g) / np.maximum(delta, 1e-6))[mask_b] + 4)
    border = np.concatenate([a[:24].reshape(-1, 3), a[-24:].reshape(-1, 3),
                             a[:, :24].reshape(-1, 3), a[:, -24:].reshape(-1, 3)])
    bgmed = np.median(border, axis=0)
    bg_hue = colorsys.rgb_to_hsv(*(bgmed / 255.0))[0] * 360

    def hue_ok(x, y):
        if sat[y, x] < sat_min:
            return False
        d = abs(hue[y, x] - bg_hue)
        return min(d, 360 - d) <= hue_tol

    seen = np.zeros((h, w), bool)
    msk = np.zeros((h, w), bool)
    q = deque()
    for x in range(w):
        q.append((x, 0)); q.append((x, h - 1))
    for y in range(h):
        q.append((0, y)); q.append((w - 1, y))
    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or seen[y, x]:
            continue
        seen[y, x] = True
        is_border = x < 24 or y < 24 or x >= w - 24 or y >= h - 24
        ok = is_border and hue_ok(x, y)
        if not ok:
            for px, py in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                if 0 <= px < w and 0 <= py < h and msk[py, px] and \
                        np.max(np.abs(a[y, x] - a[py, px])) <= local_tol and hue_ok(x, y):
                    ok = True; break
        if not ok:
            continue
        msk[y, x] = True
        q.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])
    full[msk] = [255, 0, 255]
    return Image.fromarray(full)


def clean_bust(im):
    """干净洋红底走快速归一化；脏杂色底自动改走全分辨率泛洪。"""
    test = normalize_magenta(im)
    a = np.asarray(test).astype(int)
    h, w = a.shape[:2]
    ring = np.concatenate([a[:24].reshape(-1, 3), a[-24:].reshape(-1, 3),
                           a[:, :24].reshape(-1, 3), a[:, -24:].reshape(-1, 3)])
    pure = ((ring[:, 0] == 255) & (ring[:, 1] == 0) & (ring[:, 2] == 255)).mean()
    return test if pure > 0.97 else remove_bg_flood(im)


def content_bbox_rgb(im, pad=10):
    """洋红底图：按 magenta-ness 找主体包围盒。"""
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    m = np.minimum(a[..., 0], a[..., 2]) - a[..., 1]
    content = m < 60
    ys, xs = np.where(content)
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, im.width)
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, im.height)
    return x0, y0, x1, y1


def snap_magenta(im, thr=58):
    """缩放后把轮廓处近洋红抗锯齿像素吸附为纯 #FF00FF（角色粉/红色 m 值均 <60，不误伤）。"""
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    m = np.minimum(a[..., 0], a[..., 2]) - a[..., 1]
    out = np.asarray(im.convert("RGB")).copy()
    out[m > thr] = [255, 0, 255]
    return Image.fromarray(out)


def fit_solid(im, w, h, margin=0.9):
    """等比缩放（留 10% 洋红边距，保证主体不贴边）后贴到纯洋红画布。"""
    scale = min(w / im.width, h / im.height) * margin
    nw, nh = max(1, round(im.width * scale)), max(1, round(im.height * scale))
    im = im.resize((nw, nh), Image.LANCZOS).convert("RGB")
    canvas = Image.new("RGB", (w, h), MAG)
    canvas.paste(im, ((w - nw) // 2, (h - nh) // 2))
    return snap_magenta(canvas)


def square_solid(im, size, fill=0.76):
    x0, y0, x1, y1 = content_bbox_rgb(im)
    im = im.crop((x0, y0, x1, y1)).convert("RGB")
    s = max(im.size)
    canvas0 = Image.new("RGB", (s, s), MAG)
    canvas0.paste(im, ((s - im.width) // 2, (s - im.height) // 2))
    # 再整体缩进，四周留出纯洋红边
    inner = max(1, round(size * fill))
    canvas0 = canvas0.resize((inner, inner), Image.LANCZOS)
    out = Image.new("RGB", (size, size), MAG)
    out.paste(canvas0, ((size - inner) // 2, (size - inner) // 2))
    return snap_magenta(out)


def main():
    # 头像：泛洪换底后出 96 / 192
    pdir = os.path.join(ROOT, "assets/portraits")
    for raw, name in PORTRAITS:
        im = Image.open(os.path.join(RAW, raw)).convert("RGB")
        mask = flood_bg_rgb(np.asarray(im))
        arr = np.asarray(im).copy()
        arr[mask] = MAG
        im = Image.fromarray(arr)
        for size, sfx in ((96, ""), (192, "@2x")):
            snap_magenta(im.resize((size, size), Image.LANCZOS)).save(
                os.path.join(pdir, f"{name}{sfx}.png"))
        print("portrait", name, f"bg={mask.mean():.0%}")

    # 立绘：裁主体 -> 贴纯洋红画布 240x320 / 480x640
    adir = os.path.join(ROOT, "assets/art")
    for raw, name in BUSTS:
        im = normalize_magenta(Image.open(os.path.join(RAW, raw)))  # 基线：快速归一化（泛洪实验已停用，杂色底由人工处理）
        x0, y0, x1, y1 = content_bbox_rgb(im)
        im = im.crop((x0, y0, x1, y1))
        fit_solid(im, 240, 320).save(os.path.join(adir, f"{name}.png"))
        fit_solid(im, 480, 640).save(os.path.join(adir, f"{name}@2x.png"))
        print("bust", name)

    # 道具：正方形洋红底 16 / 32
    idir = os.path.join(ROOT, "assets/items")
    for raw, name in ITEMS:
        im = normalize_magenta(Image.open(os.path.join(RAW, raw)))
        square_solid(im, 16).save(os.path.join(idir, f"{name}.png"))
        square_solid(im, 32).save(os.path.join(idir, f"{name}@2x.png"))
        print("item", name)
    print("SOLID DONE")


if __name__ == "__main__":
    main()
