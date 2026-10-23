"""
第二幕尾声：安全屋无线电特写
==================================================================
底图 : generated-images/Keep_this_EXACT_same_radio__th_2026-10-23T15-05-54.png
       （图生图：安全屋铁皮桌特写，1536x1024）
后期 : 定位电台顶那颗红色指示灯并加辉光（"刚亮起"）
       压暗四角 + 暗部偏冷，做出"平静之下一点不安"
版式 : 电台/证物袋/登记表都在画面中上部，下方三分之一留给对话框
输出 : assets/backgrounds/bg_safahouse_radio@2x.png (1920x1080)
       assets/backgrounds/bg_safahouse_radio.png   (960x540)
"""
import os
from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'generated-images',
                   'Keep_this_EXACT_same_radio__th_2026-10-23T15-05-54.png')
OUT_2X = os.path.join(ROOT, 'assets/backgrounds/bg_safahouse_radio@2x.png')
OUT_1X = os.path.join(ROOT, 'assets/backgrounds/bg_safahouse_radio.png')

W, H = 1920, 1080
CROP = (0, 0, 1536, 864)          # 1536x1024 -> 16:9，同时切掉右下角水印


def find_indicator(img):
    """在电台顶板区域找最纯的那颗红色指示灯，返回中心点。"""
    px = img.load()
    best = None
    best_score = -1
    for y in range(280, 620):
        for x in range(620, 1500):
            r, g, b = px[x, y]
            if r < 150:
                continue
            score = (r - g) + (r - b) * 0.6
            if score > best_score:
                best_score = score
                best = (x, y, (r, g, b))
    if best is None:
        raise RuntimeError('indicator light not found')
    lx, ly, rgb = best
    # 取最强红点周围 6px 内仍是红色的像素做质心，避免定位到单个噪点
    acc = []
    for y in range(ly - 7, ly + 8):
        for x in range(lx - 7, lx + 8):
            r, g, b = px[x, y]
            if r > 130 and (r - g) > 60 and (r - b) > 40:
                acc.append((x, y))
    if acc:
        lx = sum(a[0] for a in acc) // len(acc)
        ly = sum(a[1] for a in acc) // len(acc)
    return lx, ly, best_score


def add_glow(img, lx, ly):
    """指示灯辉光：核心过曝 + 外围暖红光晕。"""
    # 核心
    core = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(core).ellipse([lx - 4, ly - 4, lx + 4, ly + 4],
                                 fill=(255, 226, 198, 255))
    core = core.filter(ImageFilter.GaussianBlur(2))
    img = Image.alpha_composite(img, core)

    # 光晕（暖红 -> 橙色）
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    steps = [(110, (255, 96, 48), 40), (72, (255, 120, 56), 62),
             (42, (255, 150, 70), 92), (22, (255, 186, 110), 150)]
    for rad, col, a in steps:
        gd.ellipse([lx - rad, ly - rad, lx + rad, ly + rad], fill=col + (a,))
    glow = glow.filter(ImageFilter.GaussianBlur(16))

    # screen 叠加，让灯光真的"照"在桌面上
    screen = ImageChops.screen(img.convert('RGB'), Image.merge('RGB', glow.split()[:3]))
    # 只在灯附近生效
    mask = Image.new('L', (W, H), 0)
    ImageDraw.Draw(mask).ellipse([lx - 260, ly - 260, lx + 260, ly + 260], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(90))
    img = Image.composite(screen.convert('RGBA'), img, mask)

    # 灯本体再提亮一点
    lamp = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(lamp).ellipse([lx - 5, ly - 5, lx + 5, ly + 5],
                                 fill=(255, 120, 90, 220))
    lamp = lamp.filter(ImageFilter.GaussianBlur(3))
    return Image.alpha_composite(img, lamp)


def mood(img):
    """平静 -> 一点不安。

    不安主要靠那颗孤零零亮着的红灯和四周压暗来表达；
    暗部只做很轻的偏冷，不能把安全屋的暖琥珀色调改掉，
    否则和 bg_safahouse_shelter 就不像同一间屋子了。
    """
    lum = img.convert('L')
    # 只影响很暗的区域，且权重很低
    dark = lum.point(lambda v: max(0, min(255, int((95 - v) * 1.3))))
    cool = Image.new('RGBA', (W, H), (46, 62, 96, 255))
    cool.putalpha(dark)
    img = Image.alpha_composite(img, cool)

    # 四角轻压暗，把注意力收到电台和红灯上
    vig = Image.new('L', (W, H), 0)
    ImageDraw.Draw(vig).ellipse([-220, -170, W + 220, H + 180], fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(200))
    dim = Image.new('RGBA', (W, H), (10, 7, 6, 255))
    return Image.composite(img, dim, vig)


def main():
    src = Image.open(SRC).convert('RGBA')
    base = src.crop(CROP).resize((W, H), Image.LANCZOS)

    lx, ly, score = find_indicator(base.convert('RGB'))
    print('indicator light at ({},{}) score={:.0f}'.format(lx, ly, score))

    base = add_glow(base, lx, ly)
    base = mood(base)

    out = base.convert('RGB')
    out.save(OUT_2X)
    out.resize((960, 540), Image.LANCZOS).save(OUT_1X)
    for p in (OUT_2X, OUT_1X):
        print('saved {}  ({} KB)'.format(p, os.path.getsize(p) // 1024))

    # 对话框顶 2x y=672；电台底与证物袋/登记表的屏幕坐标供人工核对
    print('dialogue box top = 672 ; light at y = {}'.format(ly))


if __name__ == '__main__':
    main()
