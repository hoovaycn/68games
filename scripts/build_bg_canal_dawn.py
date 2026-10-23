"""
第二幕结局背景：古运河破晓
==================================================================
用法： python scripts/build_bg_canal_dawn.py <生图源文件>
把 1536x1024 的生图裁成 16:9，缩放到 1920x1080 / 960x540，
并做一层轻微的「晨光」调色（提亮 + 提暖 + 微微提饱和）。
"""
import os
import sys
from PIL import Image, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_2X = os.path.join(ROOT, 'assets/backgrounds/bg_canal_dawn@2x.png')
OUT_1X = os.path.join(ROOT, 'assets/backgrounds/bg_canal_dawn.png')

W, H = 1920, 1080
CROP_H = 864                      # 1536x1024 -> 1536x864 (16:9)，切掉底部黑边与水印


def grade(img):
    """晨光调色：整体提亮、暖调高光、轻微提饱和，保留上方一点冷色。"""
    img = img.convert('RGB')
    img = ImageEnhance.Brightness(img).enhance(1.06)
    img = ImageEnhance.Color(img).enhance(1.14)
    img = ImageEnhance.Contrast(img).enhance(1.03)
    r, g, b = img.split()
    # 亮部往暖金走，暗部留住一点夜色冷蓝
    r = r.point(lambda v: min(255, int(v * 1.035 + 4)))
    g = g.point(lambda v: min(255, int(v * 0.995 + 1)))
    b = b.point(lambda v: min(255, int(v * 0.955)))
    img = Image.merge('RGB', (r, g, b))
    return img


def build(src_path, out_2x=OUT_2X, out_1x=OUT_1X):
    src = Image.open(src_path).convert('RGB')
    w, h = src.size
    # 自动去掉模型加的左右黑边
    px = src.load()
    def col_dark(x):
        return all(sum(px[x, y]) < 40 for y in range(0, h, 8))
    x0 = 0
    while x0 < w - 1 and col_dark(x0):
        x0 += 1
    x1 = w - 1
    while x1 > x0 and col_dark(x1):
        x1 -= 1
    x1 += 1
    if x1 - x0 < w * 0.9:
        print('  detected black side bars {}..{} -> cropping'.format(x0, x1))

    crop_h = int((x1 - x0) * 9 / 16)
    crop_h = min(crop_h, h)
    top = 0
    img = src.crop((x0, top, x1, top + crop_h)).resize((W, H), Image.LANCZOS)
    img = grade(img)

    # 量化成 256 色调色板：与项目其它背景一致，且能把体积压到 1MB 上下
    # （ Floyd-Steinberg 抖动可避免天空/水面渐变出现色带）
    pal = img.quantize(colors=256, method=Image.MEDIANCUT,
                       dither=Image.FLOYDSTEINBERG)
    pal.save(out_2x, optimize=True)
    small = pal.convert('RGB').resize((960, 540), Image.LANCZOS)
    small.quantize(colors=256, method=Image.MEDIANCUT,
                   dither=Image.FLOYDSTEINBERG).save(out_1x, optimize=True)
    for p in (out_2x, out_1x):
        print('  saved {}  ({} KB)'.format(p, os.path.getsize(p) // 1024))
    return pal


if __name__ == '__main__':
    src = sys.argv[1]
    print('building from', os.path.basename(src))
    build(src)
