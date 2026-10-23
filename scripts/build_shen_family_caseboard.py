"""
第十四章《照片上的人》案卷背景合成
=================================================================
底图 : generated-images/Push_the_camera_in_close_on_th_2026-10-23T13-35-12.png
       安全屋照片墙特写（图生图产出），1536x1024 -> 裁 16:9 -> 1920x1080
人物 : 直接取自游戏现有立绘，品红底用「边缘泛洪 + 去色溢出」精确抠除，
       保证三个人物形象完全还原
版式 : 三张照片水平居中；下方留空给对话框（1x 坐标 y>=336 / 2x y>=672）
输出 : assets/backgrounds/bg_shen_family_caseboard@2x.png (1920x1080)
       assets/backgrounds/bg_shen_family_caseboard.png   (960x540)
"""
import os
from collections import deque
from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

BASE = os.path.join(ROOT, 'generated-images',
                    'Push_the_camera_in_close_on_th_2026-10-23T13-35-12.png')
OUT_2X = os.path.join(ROOT, 'assets/backgrounds/bg_shen_family_caseboard@2x.png')
OUT_1X = os.path.join(ROOT, 'assets/backgrounds/bg_shen_family_caseboard.png')

W, H = 1920, 1080

# --------------------------------------------------------------- 版式参数
CARD_W, CARD_H = 320, 412          # 相片纸（含白边）
BORDER = 17                        # 白边
INNER_W = CARD_W - BORDER * 2      # 286
INNER_H = CARD_H - BORDER * 2      # 378
GAP = 28
CARD_TOP = 266
TARGET_HEAD_W = 236                # 三张照片统一的「头部宽度」
HEAD_MARGIN = 12                   # 头顶离照片上沿留白

TOTAL_W = CARD_W * 3 + GAP * 2
START_X = (W - TOTAL_W) // 2       # 452

# 立绘头部框（art 坐标，已用 alpha 逐行跨度核对）
CHARACTERS = [
    dict(key='son', art='assets/art/mystery_man_corrupted@2x.png',
         head=(142, 38, 336, 168), bust=(100, 26, 380, 640), grade='archive'),
    dict(key='young', art='assets/art/mystery_man_default@2x.png',
         head=(155, 38, 338, 186), bust=(60, 26, 390, 640), grade='old'),
    dict(key='old', art='assets/art/shen_wanting_old@2x.png',
         head=(163, 48, 334, 186), bust=(0, 40, 400, 640), grade='surveillance'),
]


# --------------------------------------------------------------- 抠图
def magenta_candidate(r, g, b):
    """泛洪用的宽松品红候选判定（仅决定「能不能连通到边界」）。"""
    return r > 110 and b > 100 and g < 175 and (r - g) > 22 and (b - g) > 12


def magenta_contaminated(r, g, b):
    """被品红底污染的像素（含 1px 抗锯齿边缘和发丝里的孤立杂点）。

    品红底是 (255,0,255)：越靠近纯品红 r/b 越接近 1。
    老人的紫袍实测 (159,61,183) -> r/b = 0.87，据此把阈值定在 0.93，避免误伤。
    """
    if r <= 120 or b <= 80 or g >= 90:
        return False
    if (r - g) <= 70 or (b - g) <= 45:
        return False
    return (float(r) / float(b)) > 0.93


def chroma_key(img):
    """1) 泛洪抠掉连通背景；2) 清掉孤立品红杂点并补色；3) 边缘去溢出。"""
    img = img.convert('RGBA')
    w, h = img.size
    src = list(img.getdata())

    cand = bytearray(w * h)
    for i, (r, g, b, _) in enumerate(src):
        if magenta_candidate(r, g, b):
            cand[i] = 1

    # BFS 泛洪
    bg = bytearray(w * h)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            i = y * w + x
            if cand[i] and not bg[i]:
                bg[i] = 1
                q.append(i)
    for y in range(h):
        for x in (0, w - 1):
            i = y * w + x
            if cand[i] and not bg[i]:
                bg[i] = 1
                q.append(i)
    while q:
        i = q.popleft()
        y, x = divmod(i, w)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h:
                j = ny * w + nx
                if cand[j] and not bg[j]:
                    bg[j] = 1
                    q.append(j)

    alpha = bytearray(w * h)
    contam = bytearray(w * h)
    for i in range(w * h):
        r, g, b, _ = src[i]
        if bg[i]:
            alpha[i] = 0
        elif magenta_contaminated(r, g, b):
            contam[i] = 1
            alpha[i] = 255
        else:
            alpha[i] = src[i][3]

    # 轮廓上的污染像素：紧贴背景的直接抠掉（变成照片底色）
    for y in range(h):
        for x in range(w):
            i = y * w + x
            if not contam[i]:
                continue
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h and bg[ny * w + nx]:
                        alpha[i] = 0
                        contam[i] = 0
                        break
                if alpha[i] == 0:
                    break

    out = list(src)
    # 内部的孤立污染点：向外找最近的「干净且不偏品红」的像素来补色
    for y in range(h):
        for x in range(w):
            i = y * w + x
            if not contam[i]:
                continue
            found = None
            for rad in range(1, 9):
                for dy in range(-rad, rad + 1):
                    for dx in range(-rad, rad + 1):
                        if max(abs(dx), abs(dy)) != rad:
                            continue
                        nx, ny = x + dx, y + dy
                        if not (0 <= nx < w and 0 <= ny < h):
                            continue
                        j = ny * w + nx
                        if alpha[j] != 255 or contam[j]:
                            continue
                        r, g, b, _ = src[j]
                        if r > 80 and b > 60 and g < 120 and (r - g) > 25 \
                                and (b - g) > 20 and (float(r) / float(b)) > 0.93:
                            continue                      # 仍然是品红污染，跳过
                        found = j
                        break
                    if found is not None:
                        break
                if found is not None:
                    break
            if found is not None:
                r, g, b, _ = src[found]
                out[i] = (r, g, b, 255)
            else:
                alpha[i] = 0                           # 实在找不到就抠掉

    # 去溢出：半透明边缘像素用最近的实心邻居颜色覆盖
    for y in range(h):
        for x in range(w):
            i = y * w + x
            if alpha[i] == 0 or alpha[i] == 255:
                continue
            found = None
            for rad in range(1, 7):
                for dy in range(-rad, rad + 1):
                    for dx in range(-rad, rad + 1):
                        if max(abs(dx), abs(dy)) != rad:
                            continue
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < w and 0 <= ny < h and alpha[ny * w + nx] >= 250:
                            found = ny * w + nx
                            break
                    if found is not None:
                        break
                if found is not None:
                    break
            if found is not None:
                r, g, b, _ = src[found]
                out[i] = (r, g, b, alpha[i])

    final = []
    for i in range(w * h):
        a = alpha[i]
        if a == 0:
            final.append((0, 0, 0, 0))
        else:
            r, g, b, _ = out[i]
            final.append((r, g, b, a))
    return Image.frombytes('RGBA', (w, h), b''.join(bytes(p) for p in final))


# --------------------------------------------------------------- 调色
def grade(img, mode):
    """把立绘配色拉向「案卷照片」：暖光、泛旧、颗粒。"""
    img = img.convert('RGB')
    if mode == 'old':                        # 二十年前的旧照：泛黄、褪色
        lum = img.convert('L').convert('RGB')
        lum = ImageEnhance.Contrast(lum).enhance(1.14)
        r, g, b = lum.split()
        r = r.point(lambda v: min(255, int(v * 1.14 + 20)))
        g = g.point(lambda v: min(255, int(v * 1.02 + 10)))
        b = b.point(lambda v: min(255, int(v * 0.78)))
        img = Image.merge('RGB', (r, g, b))
    elif mode == 'surveillance':             # 近期偷拍：偏冷、对比强
        img = ImageEnhance.Color(img).enhance(0.72)
        img = ImageEnhance.Contrast(img).enhance(1.22)
        r, g, b = img.split()
        r = r.point(lambda v: min(255, int(v * 0.94)))
        g = g.point(lambda v: min(255, int(v * 1.00)))
        b = b.point(lambda v: min(255, int(v * 1.10)))
        img = Image.merge('RGB', (r, g, b))
    else:                                    # 档案照：中性偏冷
        img = ImageEnhance.Contrast(img).enhance(1.03)
    # 统一到安全屋的琥珀色灯光
    r, g, b = img.split()
    if mode == 'surveillance':               # 偷拍照片偏冷，不吃琥珀光
        r = r.point(lambda v: min(255, int(v * 0.97)))
        g = g.point(lambda v: min(255, int(v * 0.99)))
        b = b.point(lambda v: min(255, int(v * 1.02)))
    else:
        r = r.point(lambda v: min(255, int(v * 1.05)))
        g = g.point(lambda v: min(255, int(v * 0.985)))
        b = b.point(lambda v: min(255, int(v * 0.90)))
    return Image.merge('RGB', (r, g, b))


# --------------------------------------------------------------- 相片
def resize_rgba_premultiplied(img, size, resample=Image.LANCZOS):
    """预乘 alpha 后再重采样。

    Pillow 直接对 RGBA 做 LANCZOS 会把透明像素的 RGB 残留放大成品红色环，
    这里先做预乘再滤波，并返回「预乘色 + alpha 掩膜」，直接 paste 即可正确合成。
    """
    r, g, b, a = img.split()
    rp = ImageChops.multiply(r, a)
    gp = ImageChops.multiply(g, a)
    bp = ImageChops.multiply(b, a)
    rp = rp.resize(size, resample)
    gp = gp.resize(size, resample)
    bp = bp.resize(size, resample)
    am = a.resize(size, resample)
    return Image.merge('RGB', (rp, gp, bp)), am


def make_photo(char):
    art = chroma_key(Image.open(os.path.join(ROOT, char['art'])))
    bx0, by0, bx1, by1 = char['bust']
    hx0, hy0, hx1, hy1 = char['head']

    head_w = hx1 - hx0
    scale = TARGET_HEAD_W / float(head_w)
    head_cx_art = (hx0 + hx1) / 2.0

    crop = art.crop((bx0, by0, bx1, by1))
    premul, amask = resize_rgba_premultiplied(
        crop, (max(1, int(round((bx1 - bx0) * scale))),
               max(1, int(round((by1 - by0) * scale)))))

    # 头部居中、头顶留白；身体向下延伸并被照片下沿裁掉（真实证件照构图）
    px = int(round(INNER_W / 2.0 - (head_cx_art - bx0) * scale))
    py = int(round(HEAD_MARGIN - (hy0 - by0) * scale))

    # 照片底：档案室灰蓝渐层
    inner = Image.new('RGB', (INNER_W, INNER_H), (96, 92, 88))
    d = ImageDraw.Draw(inner)
    for y in range(INNER_H):
        t = y / float(INNER_H - 1)
        v = int(126 - 52 * t)
        d.line([(0, y), (INNER_W, y)], fill=(v, int(v * 0.97), int(v * 0.93)))
    inner.paste(premul, (px, py), amask)

    # 照片配色（暖光 / 泛旧 / 偏冷）
    inner = grade(inner, char['grade']).convert('RGBA')
    inner = Image.alpha_composite(
        inner, Image.new('RGBA', (INNER_W, INNER_H), (255, 176, 84, 44)))

    card = Image.new('RGBA', (CARD_W, CARD_H), (243, 237, 224, 255))
    card.paste(inner, (BORDER, BORDER))
    d = ImageDraw.Draw(card)
    d.rectangle([0, 0, CARD_W - 1, CARD_H - 1], outline=(198, 186, 163, 255), width=2)
    d.rectangle([BORDER - 2, BORDER - 2, CARD_W - BORDER + 1, CARD_H - BORDER + 1],
                outline=(116, 104, 88, 180), width=2)
    return card


def paste_shadowed(base, card, x, y):
    sh = Image.new('RGBA', base.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).rectangle(
        [x + 9, y + 13, x + CARD_W + 11, y + CARD_H + 15], fill=(30, 17, 8, 170))
    base.alpha_composite(sh.filter(ImageFilter.GaussianBlur(10)))
    base.alpha_composite(card, (x, y))


def draw_pin(base, cx, cy, color=(198, 56, 46)):
    d = ImageDraw.Draw(base)
    d.ellipse([cx - 12, cy - 8, cx + 12, cy + 14], fill=(40, 20, 14, 160))
    d.ellipse([cx - 10, cy - 11, cx + 10, cy + 9], fill=color + (255,))
    d.ellipse([cx - 6, cy - 8, cx - 1, cy - 3], fill=(255, 195, 175, 225))


def bezier(p0, p1, p2, n=80):
    out = []
    for i in range(n + 1):
        t = i / float(n)
        u = 1 - t
        out.append((u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
                    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]))
    return out


def draw_string(base, p0, p1, p2):
    """案卷红线：深色描边 + 亮红芯 + 高光。"""
    pts = bezier(p0, p1, p2)
    layer = Image.new('RGBA', base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.line(pts, fill=(92, 18, 14, 255), width=8, joint='curve')
    d.line(pts, fill=(196, 48, 36, 255), width=5, joint='curve')
    d.line([(x, y - 1.5) for x, y in pts], fill=(236, 110, 90, 200), width=2,
           joint='curve')
    base.alpha_composite(layer)


# --------------------------------------------------------------- 主流程
def main():
    base = Image.open(BASE).convert('RGBA')
    base = base.crop((0, 0, 1536, 864)).resize((W, H), Image.LANCZOS).convert('RGBA')

    # 四角压暗，让三张照片成为视觉焦点
    vig = Image.new('L', (W, H), 0)
    ImageDraw.Draw(vig).ellipse([-320, -260, W + 320, H + 240], fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(190))
    base = Image.composite(base, Image.new('RGBA', (W, H), (8, 5, 3, 255)), vig)

    # 底部（对话框区）压暗
    shade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shade)
    for y in range(540, H):
        t = (y - 540) / float(H - 540)
        sd.line([(0, y), (W, y)], fill=(10, 6, 4, int(165 * t * t)))
    base.alpha_composite(shade)

    pins = []
    for i, char in enumerate(CHARACTERS):
        x = START_X + i * (CARD_W + GAP)
        paste_shadowed(base, make_photo(char), x, CARD_TOP)
        pins.append((x + CARD_W // 2, CARD_TOP + 12))

    # 红线：儿子 -> 父亲（二十年前）、儿子 -> 父亲（现在）
    draw_string(base, pins[0], (pins[0][0] + 60, pins[0][1] - 92), pins[1])
    draw_string(base, pins[0], (pins[0][0] + 150, pins[0][1] - 150), pins[2])
    for cx, cy in pins:
        draw_pin(base, cx, cy)

    base = base.convert('RGB')
    base.save(OUT_2X)
    base.resize((960, 540), Image.LANCZOS).save(OUT_1X)

    for p in (OUT_2X, OUT_1X):
        print('saved {}  ({} KB)'.format(p, os.path.getsize(p) // 1024))
    print('cards x={}..{}  w={} gap={}  top={} bottom={}'.format(
        START_X, START_X + TOTAL_W, CARD_W, GAP, CARD_TOP, CARD_TOP + CARD_H))
    print('face band 2x y={}..{}   (name plate 624 / dialogue top 672)'.format(
        CARD_TOP + BORDER + HEAD_MARGIN, CARD_TOP + BORDER + HEAD_MARGIN + 180))


if __name__ == '__main__':
    main()
