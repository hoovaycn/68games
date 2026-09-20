import os
import re
import json

CHAPTERS_DIR = "src/data/chapters"
OUTPUT_DIR = "docs/map/layouts"

# --- 1. 创建图集 (Tileset) 引用 ---
tileset_data = {
  "columns": 10,
  "image": "../Modern tiles_Free/Old/Tileset_48x48_1.png",
  "imageheight": 480,
  "imagewidth": 480,
  "margin": 0,
  "name": "Modern Base 1",
  "spacing": 0,
  "tilecount": 100,
  "tiledversion": "1.10.2",
  "tileheight": 48,
  "tilewidth": 48,
  "type": "tileset",
  "version": "1.10"
}
with open(os.path.join(OUTPUT_DIR, "modern_tiles.tsj"), "w") as f:
    json.dump(tileset_data, f, indent=2, ensure_ascii=False)


# --- 2. 扫描并生成 TMJ (Tiled Map JSON) ---
for filename in os.listdir(CHAPTERS_DIR):
    if not filename.endswith(".js"): continue
    
    with open(os.path.join(CHAPTERS_DIR, filename), "r") as f:
        content = f.read()
        
        # 提取基础信息
        match_id = re.search(r"id:\s*'([^']+)'", content)
        match_name = re.search(r"name:\s*'([^']+)'", content)
        match_w = re.search(r"mapWidth:\s*(\d+)", content)
        match_h = re.search(r"mapHeight:\s*(\d+)", content)
        
        if not (match_id and match_w and match_h):
            continue
            
        chap_id = match_id.group(1)
        chap_name = match_name.group(1) if match_name else chap_id
        width = int(match_w.group(1))
        height = int(match_h.group(1))
        
        # 计算人数
        player_count = len(re.findall(r"unitId:", content))
        enemy_count = len(re.findall(r"enemyId:", content))
        
        # 构造空地图数据
        # Layer 1: 底板 (路面, ID: 1, 用瓦片 1(其实是 0，Tiled里要+1))
        bg_data = [11] * (width * height) # 用灰色路面(x=0,y=1 => 10+0+1=11)
        
        # Layer 2: 物件 (空)
        obj_data = [0] * (width * height)
        
        tmj = {
          "compressionlevel": -1,
          "height": height,
          "infinite": False,
          "layers": [
            {
              "data": bg_data,
              "height": height,
              "id": 1,
              "name": "地砖层 (底图)",
              "opacity": 1,
              "type": "tilelayer",
              "visible": True,
              "width": width,
              "x": 0,
              "y": 0
            },
            {
              "data": obj_data,
              "height": height,
              "id": 2,
              "name": "装饰与碰撞物件层",
              "opacity": 1,
              "type": "tilelayer",
              "visible": True,
              "width": width,
              "x": 0,
              "y": 0
            }
          ],
          "nextlayerid": 3,
          "nextobjectid": 1,
          "orientation": "orthogonal",
          "renderorder": "right-down",
          "tiledversion": "1.10.2",
          "tileheight": 48,
          "tilesets": [
            {
              "firstgid": 1,
              "source": "modern_tiles.tsj"
            }
          ],
          "tilewidth": 48,
          "type": "map",
          "version": "1.10",
          "width": width,
          "properties": [
            {
              "name": "ChapterName",
              "type": "string",
              "value": chap_name
            },
            {
              "name": "PlayerCount",
              "type": "int",
              "value": player_count
            },
            {
              "name": "EnemyCount",
              "type": "int",
              "value": enemy_count
            }
          ]
        }
        
        output_path = os.path.join(OUTPUT_DIR, f"{chap_id}.tmj")
        with open(output_path, "w") as f:
            json.dump(tmj, f, indent=2, ensure_ascii=False)
        print(f"Generated {chap_id}.tmj ({width}x{height}) - {chap_name}")
