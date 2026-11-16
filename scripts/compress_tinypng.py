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
MAX_COUNT = int(sys.argv[2]) if len(sys.argv) > 2 else 170
BACKUP_DIR = '.backup_assets_tinypng'
LOG_FILE = 'tinypng_compress_log.json'

auth_header = 'Basic ' + base64.b64encode(f'api:{API_KEY}'.encode('ascii')).decode('ascii')

# 1. 扫描候选文件
candidates = []
for r, _, fs in os.walk('assets/backgrounds'):
    for f in fs:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            fp = os.path.join(r, f)
            candidates.append((fp, os.path.getsize(fp)))

for r, _, fs in os.walk('assets/art'):
    if 'backup' in r:
        continue
    for f in fs:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            fp = os.path.join(r, f)
            candidates.append((fp, os.path.getsize(fp)))

# 按文件大小从大到小排序
candidates.sort(key=lambda x: x[1], reverse=True)
target_list = candidates[:MAX_COUNT]

print(f"准备压缩目标数量: {len(target_list)}")
print(f"目标原始总大小: {sum(x[1] for x in target_list)/1024/1024:.2f} MB")

history = []
if os.path.exists(LOG_FILE):
    try:
        with open(LOG_FILE, 'r', encoding='utf-8') as f:
            history = json.load(f)
    except:
        pass

already_done = {item['file'] for item in history if item.get('status') == 'success'}

def shrink_file(file_path):
    # 备份原文件
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
        with urllib.request.urlopen(req, timeout=30) as resp:
            resp_data = json.loads(resp.read().decode('utf-8'))
            output_url = resp_data['output']['url']
            compressed_size = resp_data['output']['size']
            compression_count = resp.headers.get('Compression-Count')

        # 下载压缩后的文件并覆盖
        req_download = urllib.request.Request(
            output_url,
            headers={'Authorization': auth_header}
        )
        with urllib.request.urlopen(req_download, timeout=30) as resp_down:
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

processed = 0
success_count = 0
quota_exceeded = False

for idx, (fp, sz) in enumerate(target_list, 1):
    if fp in already_done:
        print(f"[{idx}/{len(target_list)}] 跳过已压缩: {fp}")
        continue

    print(f"[{idx}/{len(target_list)}] 正在压缩: {fp} ({sz/1024:.1f} KB)... ", end="", flush=True)
    res = shrink_file(fp)
    history.append(res)
    with open(LOG_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2, ensure_ascii=False)

    if res['status'] == 'success':
        success_count += 1
        processed += 1
        print(f"成功 -> {res['compressed_size']/1024:.1f} KB (-{res['savings_pct']:.1f}%) | 本月已用: {res['compression_count']}")
    else:
        print(f"失败: {res.get('code')} {res.get('error')}")
        if res.get('code') in (429, 401, 402) or 'quota' in str(res.get('error')).lower():
            print("=== 额度已用完或凭证受限，停止运行 ===")
            quota_exceeded = True
            break
    time.sleep(0.1)

print(f"\n执行结束: 成功压缩 {success_count} 个文件")
if quota_exceeded:
    print("STATUS: QUOTA_EXCEEDED")
else:
    print("STATUS: COMPLETED")
