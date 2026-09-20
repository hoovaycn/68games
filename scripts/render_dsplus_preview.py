#!/usr/bin/env python3
"""渲染 dsplus 示例地图预览，验证 gid 切图坐标是否正确。
用法: python3 scripts/render_dsplus_preview.py
输出: work_ref/preview_demo_dsplus_street.png
"""
import json
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAP_PATH = os.path.join(ROOT, 'assets/maps/demo_dsplus_street.json')
ATLAS_DIR = os.path.join(ROOT, 'assets/tiles/dsplus')
OUT_PATH = os.path.join(ROOT, 'work_ref/preview_demo_dsplus_street.png')


def main():
    with open(MAP_PATH, encoding='utf-8') as f:
        m = json.load(f)

    t = m['tileSize']
    cols, rows = m['width'], m['height']

    # 加载图集（这个 demo 只用了 a5_modern_exterior, firstgid=1）
    ts = m['tilesets'][0]
    # image 路径相对于 map 文件所在目录
    atlas_path = os.path.normpath(os.path.join(os.path.dirname(MAP_PATH), ts['image']))
    atlas = Image.open(atlas_path).convert('RGBA')
    atlas_cols = ts['tilewidth'] and atlas.width // ts['tilewidth']
    firstgid = ts['firstgid']

    canvas = Image.new('RGBA', (cols * t, rows * t), (128, 128, 128, 255))

    layer = next(l for l in m['layers'] if l['name'] == 'ground')
    for y, row in enumerate(layer['data']):
        for x, gid in enumerate(row):
            if gid == 0:
                continue
            # gid -> atlas 内 col,row（本 demo 单图集，firstgid=1）
            idx = gid - firstgid
            ac = idx % atlas_cols
            ar = idx // atlas_cols
            tile = atlas.crop((ac * t, ar * t, (ac + 1) * t, (ar + 1) * t))
            canvas.paste(tile, (x * t, y * t), tile)

    canvas.save(OUT_PATH)
    print(f"rendered: {OUT_PATH} ({cols}x{rows} tiles, {cols*t}x{rows*t}px)")


if __name__ == '__main__':
    main()
