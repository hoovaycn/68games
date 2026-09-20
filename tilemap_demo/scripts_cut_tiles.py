#!/usr/bin/env python3
"""把 dsplus 5 张图集按 32px 网格切成独立瓦片 PNG，输出到 tiles/<atlas_name>/gid_<NNN>.png。
同时生成 tileset_manifest.json 记录每个 gid 的图集坐标与像素范围。
"""
import json, os
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'tiles')
OUT = os.path.join(SRC, '_cut')
TILE = 32

ATLASES = [
    ('a5_modern_exterior', 1,  8),
    ('a5_sewer',         129, 8),
    ('a5_valley',        257, 8),
    ('b_interior',       385, 16),
    ('c_interior',       641, 16),
]

os.makedirs(OUT, exist_ok=True)
manifest = {
    'tileSize': TILE,
    'margin': 0,
    'spacing': 0,
    '_gid_formula': 'col = (gid - firstgid) % columns; row = floor((gid - firstgid) / columns); sx = col*32; sy = row*32',
    'atlases': [],
}

for name, firstgid, cols in ATLASES:
    src_path = os.path.join(SRC, f'{name}.png')
    im = Image.open(src_path).convert('RGBA')
    w, h = im.size
    rows = h // TILE
    out_dir = os.path.join(OUT, name)
    os.makedirs(out_dir, exist_ok=True)

    tiles = []
    for r in range(rows):
        for c in range(cols):
            gid = firstgid + r * cols + c
            tile = im.crop((c*TILE, r*TILE, (c+1)*TILE, (r+1)*TILE))
            # 跳过全透明瓦片（空槽位）
            bbox = tile.getbbox()
            is_empty = bbox is None
            if not is_empty:
                tile.save(os.path.join(out_dir, f'gid_{gid:03d}.png'))
            tiles.append({
                'gid': gid, 'col': c, 'row': r,
                'sx': c*TILE, 'sy': r*TILE,
                'empty': is_empty,
            })
    manifest['atlases'].append({
        'name': name,
        'image': f'{name}.png',
        'firstgid': firstgid,
        'columns': cols,
        'rows': rows,
        'tilecount': cols * rows,
        'nonEmptyTiles': sum(1 for t in tiles if not t['empty']),
    })
    print(f"{name}: {cols}x{rows}={cols*rows} slots, non-empty={sum(1 for t in tiles if not t['empty'])}")

with open(os.path.join(SRC, 'tileset_manifest.json'), 'w', encoding='utf-8') as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)
print(f"\nwrote {os.path.join(SRC, 'tileset_manifest.json')}")
print(f"cut tiles -> {OUT}/<atlas>/gid_NNN.png")
