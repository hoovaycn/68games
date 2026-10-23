"""交付自检 + 验收：确认画面上的四个字确实是「浩然正气」。

排版参数直接复用 build_humen_righteous_staff.compute_layout()，
保证掩膜与成品像素严格对齐；再比较「笔画亮度」与「木面亮度」，
验证四个字既完整清晰、又没有被姓名牌/对话框压住。
"""
import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from PIL import Image
from build_humen_righteous_staff import (
    SRC, OUT_1X, OUT_2X, W, H, compute_layout)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---- 1. 尺寸 / 完整性 ----
ok = True
for path, want in ((OUT_2X, (1920, 1080)), (OUT_1X, (960, 540))):
    if not os.path.exists(path):
        print('MISSING', path); ok = False; continue
    im = Image.open(path); im.load()
    good = im.size == want
    ok = ok and good
    print('{:56} {:>10}  {}  {} KB'.format(
        os.path.relpath(path, ROOT), '{}x{}'.format(*im.size),
        'OK' if good else 'SIZE MISMATCH', os.path.getsize(path) // 1024))

# ---- 2. 标准掩膜（与合成共用同一套排版） ----
lay = compute_layout(Image.open(SRC).convert('RGB'))
row, ROW_X, ROW_Y = lay['row'], lay['px'], lay['py']
expect = Image.new('L', (W, H), 0)
expect.paste(row, (ROW_X, ROW_Y))
print('\n刻字排版: 字体高度 {}  整行 {}x{}  位置 ({},{})  底边 {}'.format(
    lay['glyph_h'], *row.size, ROW_X, ROW_Y, ROW_Y + row.size[1]))

# ---- 3. 笔画亮度对比：笔画应显著亮于木面 ----
out = Image.open(OUT_2X).convert('RGB')
px = out.load()
expect_px = expect.load()
stroke_luma, wood_luma = [], []
for y in range(max(0, ROW_Y - 60), min(H, ROW_Y + row.size[1] + 60)):
    for x in range(max(0, ROW_X - 60), min(W, ROW_X + row.size[0] + 60)):
        r, g, b = px[x, y]
        luma = 0.299 * r + 0.587 * g + 0.114 * b
        if expect_px[x, y] > 127:
            stroke_luma.append(luma)
        else:
            wood_luma.append(luma)

s_mean = sum(stroke_luma) / len(stroke_luma)
w_mean = sum(wood_luma) / len(wood_luma)
# 刻字上缘是刻意压暗的凹槽壁，所以阈值放低一点
BRIGHT = 120
coverage = sum(1 for l in stroke_luma if l > BRIGHT) / float(len(stroke_luma))
contrast = s_mean / max(1.0, w_mean)

print('\n笔画区平均亮度 = %.1f   木面平均亮度 = %.1f' % (s_mean, w_mean))
print('笔画区亮像素占比 = %.3f   明暗对比 = %.2f' % (coverage, contrast))
verdict = 'PASS' if (coverage > 0.62 and contrast > 2.0) else 'FAIL'
print('字形/可读性   :', verdict)

# ---- 4. 刻字区不被姓名牌 / 对话框压住 ----
npt = lay['name_plate_top']
cleared = (ROW_Y + row.size[1]) <= npt
print('刻字区底边 %d  姓名牌顶边 %d  -> %s'
      % (ROW_Y + row.size[1], npt, '不遮挡' if cleared else '会被遮挡'))

# ---- 5. 裁出刻字区供肉眼复核 ----
crop = out.crop((ROW_X - 10, ROW_Y - 10, ROW_X + row.size[0] + 10,
                 ROW_Y + row.size[1] + 10))
crop = crop.resize((crop.size[0] // 2, crop.size[1] // 2), Image.LANCZOS)
prev = os.path.join(ROOT, 'generated-images', '_staff_text_check.png')
crop.save(prev)
print('字区截图:', prev)

print('\nRESULT:', 'PASS' if (ok and verdict == 'PASS' and cleared) else 'FAIL')
