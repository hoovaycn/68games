#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""使用 TinyPNG API 稳定全量压缩第三幕美术资源，支持重试与断点续传。

用法：
    python scripts/compress_act3_assets.py
"""
import os
import re
import sys
import time
import base64
import json
import ssl
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TINY_KEY = 'Ql1RT8dcJlDGfnC2ngmlSpZL0tQnNkg2'
MD_PATH = os.path.join(ROOT, 'docs', 'act3_assets_compression_list.md')

AUTH_HEADER = 'Basic ' + base64.b64encode(f'api:{TINY_KEY}'.encode('ascii')).decode('ascii')
SSL_CTX = ssl.create_default_context()

def get_target_files():
    with open(MD_PATH, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    files = []
    for line in lines:
        if line.strip().startswith('|') and '`assets/' in line:
            m = re.search(r'`(assets/[^`]+)`', line)
            if m:
                files.append(m.group(1))
    return files

def download_data(url, expected_size, max_retries=12):
    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(
                url,
                headers={
                    'Authorization': AUTH_HEADER,
                    'User-Agent': 'Mozilla/5.0'
                }
            )
            chunks = []
            with urllib.request.urlopen(req, context=SSL_CTX, timeout=30) as resp:
                while True:
                    chunk = resp.read(32768)
                    if not chunk:
                        break
                    chunks.append(chunk)
            data = b''.join(chunks)
            if len(data) == expected_size:
                return data
        except Exception:
            pass
        time.sleep(1.5)
    raise RuntimeError(f'Failed to download {expected_size} bytes after {max_retries} attempts')

def compress_single(rel_path):
    abs_path = os.path.join(ROOT, rel_path)
    if not os.path.exists(abs_path):
        return {'path': rel_path, 'status': 'missing'}

    orig_size = os.path.getsize(abs_path)
    try:
        with Image.open(abs_path) as orig_img:
            orig_w, orig_h = orig_img.size
    except Exception as e:
        return {'path': rel_path, 'status': 'error', 'msg': f'read error: {e}'}

    with open(abs_path, 'rb') as f:
        img_bytes = f.read()

    req = urllib.request.Request(
        'https://api.tinify.com/shrink',
        data=img_bytes,
        headers={
            'Authorization': AUTH_HEADER,
            'Content-Type': 'application/octet-stream'
        }
    )

    download_url = None
    expected_size = None
    monthly_count = None

    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, context=SSL_CTX, timeout=35) as resp:
                res = json.loads(resp.read().decode('utf-8'))
                download_url = res['output']['url']
                expected_size = res['output']['size']
                monthly_count = resp.headers.get('Compression-Count')
                break
        except Exception as e:
            if attempt == 4:
                return {'path': rel_path, 'status': 'error', 'msg': f'shrink failed: {e}'}
            time.sleep(2)

    try:
        compressed_bytes = download_data(download_url, expected_size)
    except Exception as e:
        return {'path': rel_path, 'status': 'error', 'msg': f'download failed: {e}'}

    tmp_path = abs_path + '.tmp'
    with open(tmp_path, 'wb') as f:
        f.write(compressed_bytes)

    try:
        with Image.open(tmp_path) as comp_img:
            comp_w, comp_h = comp_img.size
        if (comp_w, comp_h) != (orig_w, orig_h):
            os.remove(tmp_path)
            return {
                'path': rel_path,
                'status': 'error',
                'msg': f'Dimension mismatch: orig ({orig_w}x{orig_h}) != comp ({comp_w}x{comp_h})'
            }
    except Exception as e:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        return {'path': rel_path, 'status': 'error', 'msg': f'verify error: {e}'}

    os.replace(tmp_path, abs_path)
    new_size = len(compressed_bytes)
    ratio = (orig_size - new_size) / orig_size * 100.0

    return {
        'path': rel_path,
        'status': 'ok',
        'orig_size': orig_size,
        'new_size': new_size,
        'ratio': ratio,
        'count': monthly_count
    }

def update_markdown_checklist(results):
    res_map = {r['path']: r for r in results if r['status'] == 'ok'}
    with open(MD_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    for path, info in res_map.items():
        new_kb = f"{info['new_size'] / 1024:.1f} KB"
        pattern = rf"(\| \d+ \| `{re.escape(path)}` \| [^|]+ \| [^|]+ \| )\[ \] 待压缩"
        replacement = rf"\1[x] 已压缩 ({new_kb})"
        content = re.sub(pattern, replacement, content)

    with open(MD_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    files = get_target_files()
    total = len(files)
    print(f"开始批量压缩清单中的 {total} 个文件，双线程并发稳定执行 ...", flush=True)

    results = []
    start_time = time.time()
    finished = 0

    with ThreadPoolExecutor(max_workers=2) as executor:
        future_to_file = {executor.submit(compress_single, f): f for f in files}
        for future in as_completed(future_to_file):
            finished += 1
            res = future.result()
            results.append(res)
            if res['status'] == 'ok':
                print(f"[{finished}/{total}] 完成: {res['path']} "
                      f"({res['orig_size']/1024:.1f}KB -> {res['new_size']/1024:.1f}KB, -{res['ratio']:.1f}%)", flush=True)
            else:
                print(f"[{finished}/{total}] 失败: {res['path']}, 原因: {res.get('msg')}", flush=True)

    total_orig = sum(r['orig_size'] for r in results if r['status'] == 'ok')
    total_new = sum(r['new_size'] for r in results if r['status'] == 'ok')
    saved = (total_orig - total_new) / (1024 * 1024)
    ratio = (total_orig - total_new) / total_orig * 100.0 if total_orig > 0 else 0

    print("=" * 60, flush=True)
    print(f"全部压缩完毕！耗时: {time.time() - start_time:.1f}秒", flush=True)
    print(f"成功: {len([r for r in results if r['status'] == 'ok'])}/{total}", flush=True)
    print(f"原总体积: {total_orig / (1024*1024):.2f} MB", flush=True)
    print(f"压缩后总体积: {total_new / (1024*1024):.2f} MB", flush=True)
    print(f"节省空间: {saved:.2f} MB (总体缩减 -{ratio:.1f}%)", flush=True)

    update_markdown_checklist(results)
    print("已同步更新 docs/act3_assets_compression_list.md 状态标记。", flush=True)

if __name__ == '__main__':
    main()
