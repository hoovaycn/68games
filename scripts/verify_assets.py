import os
from PIL import Image

required_files = {
    'assets/art': [
        'grade1_student_default.png', 'grade1_student_default@2x.png',
        'zhangzixiao_corrupted.png', 'zhangzixiao_corrupted@2x.png',
        'shiyunuo_corrupted.png', 'shiyunuo_corrupted@2x.png',
        'zhanghanyu_corrupted.png', 'zhanghanyu_corrupted@2x.png',
        'chenpinxuan_corrupted.png', 'chenpinxuan_corrupted@2x.png',
        'qinruiyi_corrupted.png', 'qinruiyi_corrupted@2x.png'
    ],
    'assets/portraits': [
        'grade1_student_default.png', 'grade1_student_default@2x.png',
        'zhangzixiao_corrupted.png', 'zhangzixiao_corrupted@2x.png',
        'shiyunuo_corrupted.png', 'shiyunuo_corrupted@2x.png',
        'zhanghanyu_corrupted.png', 'zhanghanyu_corrupted@2x.png',
        'chenpinxuan_corrupted.png', 'chenpinxuan_corrupted@2x.png',
        'qinruiyi_corrupted.png', 'qinruiyi_corrupted@2x.png'
    ],
    'assets/backgrounds': [
        'bg_field_relief.png', 'bg_field_relief@2x.png'
    ]
}

expected_sizes = {
    'assets/art': {
        '1x': (240, 320),
        '2x': (480, 640)
    },
    'assets/portraits': {
        '1x': (96, 96),
        '2x': (192, 192)
    },
    'assets/backgrounds': {
        '1x': (480, 270),
        '2x': (960, 540)
    }
}

all_ok = True

print("=== Checking art_asset_generation_list.md Required Assets ===")
for folder, files in required_files.items():
    for f in files:
        filepath = os.path.join(folder, f)
        if not os.path.exists(filepath):
            print(f"❌ Missing: {filepath}")
            all_ok = False
        else:
            img = Image.open(filepath)
            is_2x = f.endswith('@2x.png')
            exp_size = expected_sizes[folder]['2x'] if is_2x else expected_sizes[folder]['1x']
            if img.size != exp_size:
                print(f"⚠️ Size Mismatch: {filepath} is {img.size}, expected {exp_size}")
                all_ok = False
            else:
                print(f"✅ OK: {filepath} ({img.size[0]}x{img.size[1]})")

print("\n=== Checking Entire Assets Directory Consistency ===")
for folder in ['assets/art', 'assets/portraits', 'assets/backgrounds']:
    for f in os.listdir(folder):
        if not f.endswith('.png'):
            continue
        filepath = os.path.join(folder, f)
        img = Image.open(filepath)
        is_2x = f.endswith('@2x.png')
        exp_size = expected_sizes[folder]['2x'] if is_2x else expected_sizes[folder]['1x']
        if img.size != exp_size:
            print(f"⚠️ Non-standard File Found: {filepath} is {img.size}, expected {exp_size}")
            all_ok = False

if all_ok:
    print("\n🎉 ALL ASSETS ARE PERFECTLY GENERATED, RESIZED AND VERIFIED!")
else:
    print("\n❌ SOME ISSUES WERE FOUND.")
