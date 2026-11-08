#!/usr/bin/env bash
# 顺序（非并发）压缩指定 PNG；单张下载失败只留 output url，不反复重试
# 用法: bash scripts/compress_seq.sh assets/backgrounds/a.png assets/backgrounds/b.png
set -u
KEY="Ql1RT8dcJlDGfnC2ngmlSpZL0tQnNkg2"
cd "$(dirname "$0")/.." || exit 1
TMP="work_ref/tiny"
mkdir -p "$TMP"

if [ "$#" -eq 0 ]; then echo "no files"; exit 1; fi

for p in "$@"; do
  f=$(basename "$p")
  echo "=== $f ==="
  curl -s -m 120 -u "api:$KEY" --data-binary @"$p" -H "Content-Type: application/octet-stream" \
       https://api.tinify.com/shrink -o "$TMP/resp.json" -w "  upload_http=%{http_code}\n"
  URL=$(python -c "import json;print(json.load(open('$TMP/resp.json'))['output']['url'])" 2>/dev/null)
  OUTSIZE=$(python -c "import json;print(json.load(open('$TMP/resp.json'))['output']['size'])" 2>/dev/null)
  if [ -z "${URL:-}" ]; then echo "  ✗ 上传失败，保留原图"; continue; fi
  echo "  target=${OUTSIZE}B"
  curl -s -m 90 -u "api:$KEY" "$URL" -o "$TMP/dl.png" -w "  dl_http=%{http_code} got=%{size_download}\n"
  GOT=$(stat -c %s "$TMP/dl.png" 2>/dev/null || echo 0)
  if [ "$GOT" = "$OUTSIZE" ]; then
    mv "$TMP/dl.png" "$p"
    echo "  ✓ 已替换 $(stat -c %s "$p")B"
  else
    echo "  ✗ 下载不完整（$GOT / $OUTSIZE），保留原图"
    echo "  NEED_MANUAL: $f -> $URL"
  fi
  rm -f "$TMP/dl.png"
done
echo "DONE"
