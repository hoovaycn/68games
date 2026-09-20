import os, json
from PIL import Image

OUTPUT_DIR = "docs/map/layouts"
assets = [
    {"name": "Modern_Base_1", "path": "docs/map/Modern tiles_Free/Old/Tileset_48x48_1.png"},
    {"name": "Modern_Base_2", "path": "docs/map/Modern tiles_Free/Old/Tileset_48x48_2.png"},
    {"name": "Modern_Base_3", "path": "docs/map/Modern tiles_Free/Old/Tileset_48x48_3.png"},
    {"name": "Modern_Props_9", "path": "docs/map/Modern tiles_Free/Old/Tileset_48x48_9.png"},
    {"name": "Modern_Props_16", "path": "docs/map/Modern tiles_Free/Old/Tileset_48x48_16.png"},
    {"name": "Interiors", "path": "docs/map/Modern tiles_Free/Interiors_free/48x48/Interiors_free_48x48.png"},
    {"name": "Room_Builder", "path": "docs/map/Modern tiles_Free/Interiors_free/48x48/Room_Builder_free_48x48.png"}
]

tilesets_data = []
current_firstgid = 1

for asset in assets:
    img = Image.open(asset["path"])
    w, h = img.size
    columns = w // 48
    tilecount = (w // 48) * (h // 48)
    
    # Create TSJ
    tsj_filename = f"{asset['name']}.tsj"
    rel_image_path = os.path.relpath(asset['path'], OUTPUT_DIR)
    
    tsj = {
        "columns": columns,
        "image": rel_image_path,
        "imageheight": h,
        "imagewidth": w,
        "margin": 0,
        "name": asset["name"].replace("_", " "),
        "spacing": 0,
        "tilecount": tilecount,
        "tiledversion": "1.10.2",
        "tileheight": 48,
        "tilewidth": 48,
        "type": "tileset",
        "version": "1.10"
    }
    with open(os.path.join(OUTPUT_DIR, tsj_filename), "w") as f:
        json.dump(tsj, f, indent=2, ensure_ascii=False)
        
    tilesets_data.append({
        "firstgid": current_firstgid,
        "source": tsj_filename
    })
    current_firstgid += tilecount

# Update all TMJ files
for filename in os.listdir(OUTPUT_DIR):
    if filename.endswith(".tmj"):
        filepath = os.path.join(OUTPUT_DIR, filename)
        with open(filepath, "r") as f:
            tmj = json.load(f)
        
        tmj["tilesets"] = tilesets_data
        
        with open(filepath, "w") as f:
            json.dump(tmj, f, indent=2, ensure_ascii=False)

print("Successfully generated all tilesets and linked them to the map files.")
