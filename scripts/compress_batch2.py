import os
import sys
import json
import base64
import urllib.request
import urllib.error
import shutil
import time

# 密钥不入库：优先取命令行参数，其次环境变量
API_KEY = sys.argv[1] if len(sys.argv) > 1 else os.environ.get('TINYPNG_API_KEY', '')
if not API_KEY:
    sys.exit('缺少 TinyPNG API Key：请通过参数传入或设置环境变量 TINYPNG_API_KEY')
BACKUP_DIR = '.backup_assets_tinypng'
LOG_FILE = 'tinypng_compress_log.json'

auth_header = 'Basic ' + base64.b64encode(f'api:{API_KEY}'.encode('ascii')).decode('ascii')

history = []
if os.path.exists(LOG_FILE):
    try:
        with open(LOG_FILE, 'r', encoding='utf-8') as f:
            history = json.load(f)
    except:
        pass

already_done = {item['file'] for item in history if item.get('status') == 'success'}

# 收集目标：
# 1. docs/发布素材包/ >= 300KB
# 2. assets/ 下剩余 >= 200KB 的所有未压缩图片
targets = []

for r, _, fs in os.walk('docs/发布素材包'):
    for f in fs:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            fp = os.path.join(r, f)
            sz = os.path.getsize(fp)
            if sz >= 300 * 1024 and fp not in already_done:
                targets.append((fp, sz))

for r, _, fs in os.walk('assets'):
    if 'backup' in r:
        continue
    for f in fs:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            fp = os.path.join(r, f)
            sz = os.path.getsize(fp)
            if sz >= 200 * 1024 and fp not in already_done:
                targets.append((fp, sz))

targets.sort(key=lambda x: x[1], reverse=True)

print(f"待压缩大图数量: {len(targets)}")
print(f"待压缩总体积: {sum(x[1] for x in targets)/1024/1024:.2f} MB")

def shrink_file(file_path):
    backup_path = os.path.join(BACKUP_DIR, file_path)
    os.makedirs(os.path.dirname(backup_path), exist_ok=True)
    if not os.path.exists(backup_path):
        shutil.copy2(file_path, backup_path)
    
    orig_size = os.path.getsize(file_path)
    
    with open(file_path, 'rb') as f:
        data = f.read()

    req = urllib.request.Request(
        'https://api.tinify.com/shrink',
        headers={'Authorization': auth_header},
        data=data
    )

    try:
        with urllib.request.urlopen(req, timeout=40) as resp:
            resp_data = json.loads(resp.read().decode('utf-8'))
            output_url = resp_data['output']['url']
            compressed_size = resp_data['output']['size']
            compression_count = resp.headers.get('Compression-Count')

        req_download = urllib.request.Request(
            output_url,
            headers={'Authorization': auth_header}
        )
        with urllib.request.urlopen(req_download, timeout=40) as resp_down:
            new_data = resp_down.read()

        with open(file_path, 'wb') as f:
            f.write(new_data)

        savings = (1 - compressed_size / orig_size) * 100
        return {
            'status': 'success',
            'file': file_path,
            'orig_size': orig_size,
            'compressed_size': compressed_size,
            'savings_pct': savings,
            'compression_count': compression_count
        }

    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8', errors='ignore')
        return {
            'status': 'error',
            'file': file_path,
            'code': e.code,
            'error': err_body,
            'compression_count': e.headers.get('Compression-Count')
        }
    except Exception as e:
        return {
            'status': 'error',
            'file': file_path,
            'error': str(e)
        }

success_count = 0

for idx, (fp, sz) in enumerate(targets, 1):
    print(f"[{idx}/{len(targets)}] 正在压缩: {fp} ({sz/1024:.1f} KB)... ", end="", flush=True)
    res = shrink_file(fp)
    history.append(res)
    with open(LOG_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2, ensure_ascii=False)

    if res['status'] == 'success':
        success_count += 1
        print(f"成功 -> {res['compressed_size']/1024:.1f} KB (-{res['savings_pct']:.1f}%) | 新Key已用: {res['compression_count']}")
    else:
        print(f"失败: {res.get('code')} {res.get('error')}")
    time.sleep(0.2)

print(f"\n执行结束: 成功压缩 {success_count} 个大文件")
