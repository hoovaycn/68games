#!/usr/bin/env python3
"""根据 tileset_annotated.json 的 props 列表，从对应图集裁出独立 PNG 到 props/。
同时输出 props_index.json（文件名 -> cells 碰撞格）。
"""
import json, os
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(ROOT, 'tileset_annotated.json'), encoding='utf-8') as f:
    meta = json.load(f)

PROPS_DIR = os.path.join(ROOT, 'props')
os.makedirs(PROPS_DIR, exist_ok=True)

atlas_cache = {}
index = []
for p in meta['props']:
    atlas_file = meta['atlases'][p['atlas']]['file']
    if atlas_file not in atlas_cache:
        atlas_cache[atlas_file] = Image.open(os.path.join(ROOT, 'tiles', atlas_file)).convert('RGBA')
    im = atlas_cache[atlas_file]
    piece = im.crop((p['sx'], p['sy'], p['sx']+p['sw'], p['sy']+p['sh']))
    out_name = f"{p['name']}.png"
    piece.save(os.path.join(PROPS_DIR, out_name))
    index.append({
        'name': p['name'],
        'file': f'props/{out_name}',
        'w': p['sw'], 'h': p['sh'],
        'cells': p['cells'],
        'desc': p.get('desc', '')
    })
    print(f"  {out_name}: {p['sw']}x{p['sh']}, cells={len(p['cells'])}")

with open(os.path.join(ROOT, 'props_index.json'), 'w', encoding='utf-8') as f:
    json.dump(index, f, ensure_ascii=False, indent=2)
print(f"\nwrote {len(index)} props -> {PROPS_DIR}/")
print(f"wrote props_index.json")
