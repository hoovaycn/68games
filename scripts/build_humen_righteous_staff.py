"""
第十六章《浩然正气》权杖特写 CG
==================================================================
底图 : generated-images/Extreme_macro_close_up_story_C_2026-10-23T14-11-07.png
       （虎门海滩木杖大特写，图生图产出，1536x1024）
刻字 : 「浩然正气」用 Windows 楷体 simkai.ttf 程序化渲染后刻进木头
       —— 保证四个汉字绝对正确，绝不会出现模型乱写的笔画
输出 : assets/backgrounds/bg_humen_righteous_staff@2x.png (1920x1080)
       assets/backgrounds/bg_humen_righteous_staff.png   (960x540)
"""
import math
import os
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'generated-images',
                   'Extreme_macro_close_up_story_C_2026-10-23T14-11-07.png')
OUT_2X = os.path.join(ROOT, 'assets/backgrounds/bg_humen_righteous_staff@2x.png')
OUT_1X = os.path.join(ROOT, 'assets/backgrounds/bg_humen_righteous_staff.png')

W, H = 1920, 1080
FONT_PATH = r'C:\Windows\Fonts\simkai.ttf'
TEXT = '浩然正气'
CROP = (0, 60, 1536, 924)            # 源图 1536x1024 -> 1536x864 (16:9)


# --------------------------------------------------------------- 量杖
def is_wood(r, g, b):
    """红棕色木头：排除蓝天、青海、白烟、米黄沙地、肤色手掌。

    杖身纵向结构 = 深棕上沿 -> 粉白高光带 -> 深红棕主体 -> 暗底沿，
    所以不能用单一阈值，要用「偏红且不偏绿」的判据。
    """
    return (r > 22 and (r - g) > 18 and (r - b) > 10 and g < r * 0.80)


def measure(img):
    """返回杖身上沿、下沿、倾角、左右端（源图坐标）。"""
    px = img.load()
    w, h = img.size
    segs = {}
    for x in range(0, w, 8):
        ys = [y for y in range(h) if is_wood(*px[x, y])]
        if len(ys) < 20:
            continue
        best = (ys[0], ys[0])
        start = prev = ys[0]
        for y in ys[1:]:
            if y - prev > 10:
                if prev - start > best[1] - best[0]:
                    best = (start, prev)
                start = y
            prev = y
        if prev - start > best[1] - best[0]:
            best = (start, prev)
        segs[x] = best

    if len(segs) < 8:
        raise RuntimeError('staff not found')
    lens = sorted(b[1] - b[0] for b in segs.values())
    med = lens[len(lens) // 2]
    # 只保留长度接近中位数的列（排除手、旗杆等干扰）
    cols = {x: s for x, s in segs.items() if 0.65 * med <= (s[1] - s[0]) <= 1.35 * med}
    xs = sorted(cols)
    tops = [cols[x][0] for x in xs]
    bots = [cols[x][1] for x in xs]
    n = len(xs)
    mx = sum(xs) / n
    mt = sum(tops) / n
    mb = sum(bots) / n
    st = sum((xs[i] - mx) * (tops[i] - mt) for i in range(n)) / sum((xs[i] - mx) ** 2 for i in range(n))
    sb = sum((xs[i] - mx) * (bots[i] - mb) for i in range(n)) / sum((xs[i] - mx) ** 2 for i in range(n))
    thick = sum(bots[i] - tops[i] for i in range(n)) / n
    print('  measured columns {}  median thickness {}'.format(n, med))
    return dict(x0=xs[0], x1=xs[-1], top=mt, bot=mb, thick=thick,
                angle=math.degrees(math.atan((sb - st) / 2.0)))


# --------------------------------------------------------------- 刻字
def glyph_masks(font_size):
    font = ImageFont.truetype(FONT_PATH, font_size)
    out = []
    for ch in TEXT:
        m = Image.new('L', (font_size * 2, font_size * 2), 0)
        d = ImageDraw.Draw(m)
        bb = d.textbbox((0, 0), ch, font=font)
        d.text(((font_size * 2 - (bb[2] - bb[0])) / 2 - bb[0],
                (font_size * 2 - (bb[3] - bb[1])) / 2 - bb[1]),
               ch, font=font, fill=255)
        out.append(m.crop(m.getbbox()))
    return out


def build_row(glyph_h):
    masks = glyph_masks(int(glyph_h * 1.7))
    scaled = []
    for m in masks:
        s = glyph_h / float(m.size[1])
        scaled.append(m.resize((max(1, int(round(m.size[0] * s))), glyph_h),
                                Image.LANCZOS))
    gap = int(glyph_h * 0.30)
    row_w = sum(g.size[0] for g in scaled) + gap * (len(scaled) - 1)
    row = Image.new('L', (row_w, glyph_h), 0)
    cx = 0
    for g in scaled:
        row.paste(g, (cx, glyph_h - g.size[1]))
        cx += g.size[0] + gap
    return row


def engrave(base, row, px, py):
    """把字刻进木头：凹槽暗壁 + 金属内壁明暗 + 金色本体 + 暖光外溢。"""
    w, h = row.size

    # 1px 外扩 / 3px 内缩
    outer = row.filter(ImageFilter.MaxFilter(3))
    inner = row.filter(ImageFilter.MinFilter(7))

    # ---- 凹槽外缘：刻痕落在木头上的一圈深色 ----
    edge = ImageChops.subtract(outer, inner)
    dark = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    dark.paste(Image.new('RGBA', (w, h), (38, 12, 8, 255)), (px - 2, py - 3), edge)
    dark = dark.filter(ImageFilter.GaussianBlur(2))
    base.alpha_composite(dark)

    # ---- 金色本体：按圆柱高光做竖向金属渐变 ----
    gold = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(gold)
    stops = [(0.00, (188, 112, 22)),
             (0.16, (250, 206, 96)),
             (0.34, (255, 242, 168)),
             (0.48, (255, 226, 110)),
             (0.70, (236, 158, 32)),
             (1.00, (146, 72, 12))]
    for y in range(h):
        t = y / float(max(1, h - 1))
        c = stops[-1][1]
        for i in range(len(stops) - 1):
            t0, c0 = stops[i]
            t1, c1 = stops[i + 1]
            if t0 <= t <= t1:
                u = (t - t0) / (t1 - t0)
                c = tuple(int(c0[k] + (c1[k] - c0[k]) * u) for k in range(3))
                break
        gd.line([(0, y), (w, y)], fill=c + (255,))
    gold.putalpha(row)

    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    layer.paste(gold, (px, py), gold)

    # ---- 内壁明暗：上缘受阴影、下缘吃光 ----
    m_dn = ImageChops.offset(row, 2, 2)      # 往下右移
    m_ul = ImageChops.offset(row, -2, -2)    # 往上左移
    band_dark = ImageChops.subtract(row, m_dn)     # 笔画左上缘
    band_light = ImageChops.subtract(row, m_ul)    # 笔画右下缘

    sh = Image.new('RGBA', (w, h), (122, 58, 8, 255))
    sh.putalpha(band_dark)
    layer.alpha_composite(sh, (px, py))

    lt = Image.new('RGBA', (w, h), (255, 252, 214, 255))
    lt.putalpha(band_light)
    layer.alpha_composite(lt, (px, py))

    # ---- 笔芯高光：细一点，只在笔画中段 ----
    core = Image.new('RGBA', (w, h), (255, 248, 196, 255))
    core.putalpha(ImageChops.subtract(inner, row.filter(ImageFilter.MinFilter(3))))
    layer.alpha_composite(core, (px + 1, py + 1))

    base.alpha_composite(layer)

    # ---- 金光外溢 ----
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    glow.paste(Image.new('RGBA', (w, h), (255, 172, 40, 255)), (px, py), row)
    glow = glow.filter(ImageFilter.GaussianBlur(38))
    screen = ImageChops.screen(base.convert('RGB'),
                               Image.merge('RGB', glow.split()[:3]))
    halo = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    halo.paste(Image.new('RGBA', (w, h), (255, 150, 30, 255)), (px, py), row)
    halo = halo.filter(ImageFilter.GaussianBlur(80))
    screen = ImageChops.screen(screen, Image.merge('RGB', halo.split()[:3]))
    mask = Image.new('L', (W, H), 0)
    ImageDraw.Draw(mask).ellipse([px - 340, py - 260, px + w + 340, py + h + 260],
                                  fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(160))
    return Image.composite(screen.convert('RGBA'), base, mask)


def compute_layout(src):
    """量出杖身位置并算好刻字排版，供合成与自检共用。"""
    info = measure(src)
    sx = W / float(CROP[2] - CROP[0])
    sy = H / float(CROP[3] - CROP[1])
    staff_top = (info['top'] - CROP[1]) * sy
    staff_bot = (info['bot'] - CROP[1]) * sy
    staff_h = staff_bot - staff_top

    glyph_h = int(staff_h * 0.76)
    row = build_row(glyph_h).rotate(info['angle'], resample=Image.BICUBIC, expand=True)

    # 水平居中：干净木面（去掉圆头端和手）
    wood_x0 = (info['x0'] + 90) * sx
    wood_x1 = (info['x1'] - 120) * sx
    px = int(round((wood_x0 + wood_x1) / 2.0 - row.size[0] / 2.0))

    # 纵向：整行字必须高于「姓名牌」顶边（2x y=624，对应 1x y=312），
    # 否则左下角的姓名牌会压住第一个字；同时不能高过杖身上沿。
    name_plate_top = 624
    py = min(name_plate_top - row.size[1] - 14, int(staff_top + staff_h * 0.09))
    py = max(py, int(staff_top) + 8)

    return dict(info=info, staff_top=staff_top, staff_bot=staff_bot, staff_h=staff_h,
                glyph_h=glyph_h, row=row, px=px, py=py, sx=sx, sy=sy,
                name_plate_top=name_plate_top)


def main():
    src = Image.open(SRC).convert('RGB')
    lay = compute_layout(src)
    info = lay['info']
    print('staff: x={}..{} top={:.0f} bot={:.0f} thick={:.0f} angle={:.2f}deg'.format(
        info['x0'], info['x1'], info['top'], info['bot'], info['thick'], info['angle']))
    print('final staff band y = {:.0f}..{:.0f}  ({:.0f} px)'.format(
        lay['staff_top'], lay['staff_bot'], lay['staff_h']))
    print('glyph row {}x{} at ({},{})  -> bottom {} (name plate top {})'.format(
        *lay['row'].size, lay['px'], lay['py'],
        lay['py'] + lay['row'].size[1], lay['name_plate_top']))

    base = src.crop(CROP).resize((W, H), Image.LANCZOS).convert('RGBA')
    base = engrave(base, lay['row'], lay['px'], lay['py'])

    # 底部压暗，留给对话框
    shade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shade)
    for y in range(640, H):
        t = (y - 640) / float(H - 640)
        sd.line([(0, y), (W, y)], fill=(6, 10, 20, int(160 * t * t)))
    base.alpha_composite(shade)

    base = base.convert('RGB')
    base.save(OUT_2X)
    base.resize((960, 540), Image.LANCZOS).save(OUT_1X)
    for p in (OUT_2X, OUT_1X):
        print('saved {}  ({} KB)'.format(p, os.path.getsize(p) // 1024))


if __name__ == '__main__':
    main()
