#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""处理4张按最新反馈精确重制的美术资产：
1. bg_ayao_golden_dissolve: 阿瑶消散金粉背景（半身彻底化作粉尘，主体居中偏上，下方留白 1/3）
2. cg_mask_100score: 满分笑脸神经面具（纯正像素风，主体居中偏上，下方留白 1/3）
3. cg_grad_photo_2006: 2006年旧合照（阿瑶、刘老师、徐老师三人初中女学生合影，纯白空间感，下方留白 1/3）
4. bg_grand_finale_fin: 全剧终画卷（地面张子骁与石予诺仰视半身像，天空金粉阿瑶微笑守护，右上角【终】与【— Fin —】）

所有资源切除底部水印、16:9比例、256色量化（MEDIANCUT + Floyd-Steinberg）、输出 @2x (1920x1080) 与 1x (960x540)。
"""
import os
import sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
OUT_BG = os.path.join(ROOT, 'assets/backgrounds')
OUT_ART = os.path.join(ROOT, 'assets/art')
W, H = 1920, 1080

ITEMS = [
    {
        'src': 'High_resolution_32_bit_era_JRP_2026-11-09T13-56-28.png',
        'out_dir': OUT_BG,
        'out_name': 'bg_ayao_golden_dissolve',
        'desc': '阿瑶半身彻底化作金粉消散背景'
    },
    {
        'src': 'High_resolution_32_bit_era_JRP_2026-11-09T14-05-45.png',
        'out_dir': OUT_ART,
        'out_name': 'cg_mask_100score',
        'desc': '满分笑脸神经面具像素CG（下方留白1/3）'
    },
    {
        'src': 'High_resolution_32_bit_era_JRP_2026-11-09T14-07-56.png',
        'out_dir': OUT_ART,
        'out_name': 'cg_grad_photo_2006',
        'desc': '2006年三位初中女学生旧合照CG（下方留白1/3）'
    },
    {
        'src': 'High_resolution_32_bit_era_JRP_2026-11-09T14-09-59.png',
        'out_dir': OUT_BG,
        'out_name': 'bg_grand_finale_fin',
        'desc': '全剧终终幕画卷（双主角仰视+天际金粉阿瑶守护）'
    }
]

def process_item(item):
    src_path = os.path.join(GEN, item['src'])
    out_dir = item['out_dir']
    out_name = item['out_name']
    print(f"Processing: {item['desc']} ({item['src']}) -> {out_name}")

    src = Image.open(src_path).convert('RGB')
    w, h = src.size

    # 1536x1024 裁切为 16:9 (1536x864, 自动把右下角 160px 的水印截掉)
    crop_h = min(int(w * 9 / 16), h)
    cropped = src.crop((0, 0, w, crop_h)).resize((W, H), Image.LANCZOS)

    # 256 色量化
    pal_2x = cropped.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    out_2x_path = os.path.join(out_dir, f"{out_name}@2x.png")
    pal_2x.save(out_2x_path, optimize=True)

    # 1x 缩放并量化
    small = pal_2x.convert('RGB').resize((960, 540), Image.LANCZOS)
    pal_1x = small.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    out_1x_path = os.path.join(out_dir, f"{out_name}.png")
    pal_1x.save(out_1x_path, optimize=True)

    size_2x = os.path.getsize(out_2x_path) // 1024
    size_1x = os.path.getsize(out_1x_path) // 1024
    print(f"  -> {out_name}@2x.png: {size_2x} KB")
    print(f"  -> {out_name}.png: {size_1x} KB")

def main():
    for item in ITEMS:
        process_item(item)
    print("\nAll 4 items re-processed and saved successfully!")

if __name__ == '__main__':
    main()
