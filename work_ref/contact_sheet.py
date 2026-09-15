#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""生成角色资产总览图（头像墙 + 立绘墙）供审稿。"""
from PIL import Image, ImageDraw, ImageFont

ROOT = "/Users/hoovay/Doubao/fx_game"
FONT = ImageFont.load_default()

PORTRAITS = ["zhangzixiao_default", "shiyunuo_default", "teacher_xu_default",
             "zhanghanyu_default", "chenpinxuan_default", "fanwenmo_default",
             "fanwenmo_corrupted", "heyanxi_default", "heyanxi_corrupted"]
BUSTS = PORTRAITS + ["vendor_default", "punk_default"]


def sheet(names, src_dir, cw, ch, cols, out, title):
    rows = (len(names) + cols - 1) // cols
    pad, label_h, head = 10, 16, 26
    W = cols * (cw + pad) + pad
    H = head + rows * (ch + label_h + pad) + pad
    canvas = Image.new("RGBA", (W, H), (245, 244, 238, 255))
    d = ImageDraw.Draw(canvas)
    d.text((pad, 6), title, fill=(30, 30, 30), font=FONT)
    for i, name in enumerate(names):
        r, c = divmod(i, cols)
        x = pad + c * (cw + pad)
        y = head + r * (ch + label_h + pad)
        im = Image.open(f"{ROOT}/{src_dir}/{name}@2x.png").convert("RGBA")
        im = im.resize((cw, ch), Image.LANCZOS)
        bg = Image.new("RGBA", (cw, ch), (225, 228, 235, 255))
        bg.alpha_composite(im)
        canvas.alpha_composite(bg, (x, y))
        d.text((x, y + ch + 2), name, fill=(40, 40, 40), font=FONT)
    canvas.save(out)
    print(out, canvas.size)


sheet(PORTRAITS, "assets/portraits", 160, 160, 3,
      f"{ROOT}/work_ref/sheet_portraits.png",
      "Portraits 96px (master @2x 192) - three-quarter view, solid #FF00FF bg")
sheet(BUSTS, "assets/art", 120, 160, 4,
      f"{ROOT}/work_ref/sheet_busts.png",
      "Busts 240x320 (master @2x 480x640) - solid #FF00FF bg")
