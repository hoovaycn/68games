"""交付前自检：尺寸、格式、完整性、留白与脸部可读性。"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = [
    ('assets/backgrounds/bg_shen_family_caseboard@2x.png', (1920, 1080)),
    ('assets/backgrounds/bg_shen_family_caseboard.png', (960, 540)),
]
ok = True
for rel, want in OUT:
    p = os.path.join(ROOT, rel)
    if not os.path.exists(p):
        print('MISSING', rel); ok = False; continue
    im = Image.open(p)
    im.load()                      # 触发解码，验证文件完整
    size_ok = im.size == want
    print('{:<52} {:>10}  format={}  {}  {} KB'.format(
        rel, '{}x{}'.format(*im.size), im.format,
        'OK' if size_ok else 'SIZE MISMATCH want {}'.format(want),
        os.path.getsize(p) // 1024))
    ok = ok and size_ok

# 1x 版本脸部区域亮度抽查（不能是死黑）
im = Image.open(os.path.join(ROOT, OUT[0][0])).convert('RGB')
px = im.load()
for name, cx in (('son', 612), ('young', 960), ('old', 1308)):
    vals = [sum(px[cx + dx, 360 + dy]) / 3.0
            for dx in range(-60, 60, 6) for dy in range(-40, 40, 6)]
    print('  face {} @2x ({},360) mean brightness = {:.1f}'.format(name, cx, sum(vals) / len(vals)))

# 底部留白区平均亮度（应明显暗于脸部）
bot = [sum(px[x, y]) / 3.0 for x in range(0, 1920, 40) for y in range(700, 1080, 40)]
top = [sum(px[x, y]) / 3.0 for x in range(0, 1920, 40) for y in range(0, 600, 40)]
print('  bottom strip mean = {:.1f}   upper area mean = {:.1f}'.format(
    sum(bot) / len(bot), sum(top) / len(top)))
print('RESULT:', 'PASS' if ok else 'FAIL')
