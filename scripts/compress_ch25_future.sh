#!/usr/bin/env bash
# 顺序（非并发）压缩第二十五章未来场景背景；单张失败只记录 output url，不反复重试
set -u
KEY="Ql1RT8dcJlDGfnC2ngmlSpZL0tQnNkg2"
cd "$(dirname "$0")/.." || exit 1
TMP="work_ref/tiny"
mkdir -p "$TMP"

FILES="bg_future_exam_city.png bg_future_exam_city@2x.png bg_timegate_case_send.png bg_timegate_case_send@2x.png"

for f in $FILES; do
  p="assets/backgrounds/$f"
  echo "=== $f ==="
  curl -s -m 120 -u "api:$KEY" --data-binary @"$p" -H "Content-Type: application/octet-stream" \
       https://api.tinify.com/shrink -o "$TMP/resp.json" -w "  upload_http=%{http_code}\n"
  URL=$(python -c "import json;print(json.load(open('$TMP/resp.json'))['output']['url'])" 2>/dev/null)
  OUTSIZE=$(python -c "import json;print(json.load(open('$TMP/resp.json'))['output']['size'])" 2>/dev/null)
  if [ -z "${URL:-}" ]; then echo "  ✗ 上传失败，保留原图"; continue; fi
  echo "  target=${OUTSIZE}B url=$URL"
  curl -s -m 90 -u "api:$KEY" "$URL" -o "$TMP/dl.png" -w "  dl_http=%{http_code} got=%{size_download}\n"
  GOT=$(stat -c %s "$TMP/dl.png" 2>/dev/null || echo 0)
  if [ "$GOT" = "$OUTSIZE" ]; then
    mv "$TMP/dl.png" "$p"
    echo "  ✓ 已替换 $(stat -c %s "$p")B"
  else
    echo "  ✗ 下载不完整（$GOT / $OUTSIZE），保留原图；手动下载链接见上"
  fi
  rm -f "$TMP/dl.png"
done
echo "DONE"
