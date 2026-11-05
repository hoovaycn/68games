import fs from 'fs';
import path from 'path';

/**
 * 应用表情升级方案：将 emotion_plan.json 中提炼出的战前/情绪节点表情，
 * 精准替换回对应剧本源文件（仅改 leftPortrait / rightPortrait 字段，其余内容保持原样）。
 * 基于源文件行结构定位到 (branch, scene, id) 的具体对白，避免误伤同名字段。
 */

const plan = JSON.parse(fs.readFileSync('scripts/emotion_plan.json', 'utf8'));

// 按文件分组
const byFile = {};
for (const e of plan) {
  (byFile[e.file] ||= []).push(e);
}

/**
 * 扫描源文件行，建立 "branch.scene.id" -> { left, right } 的行号索引。
 * - prologue 双线文件含 male/female 分支；线性章节 branch 恒为 shared。
 * - 通过分支键、场景键、对白 id 精确定位每条对白的 leftPortrait/rightPortrait 行。
 */
function indexDialogues(lines) {
  const positions = new Map();
  let branch = 'shared';
  let scene = null;
  let dialogId = null;
  let pendingLeft = null;
  let pendingRight = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 分支（仅 prologue 有）
    const branchMatch = line.match(/^\s*(male|female):\s*\{/);
    if (branchMatch) {
      branch = branchMatch[1];
      scene = null;
      dialogId = null;
      pendingLeft = pendingRight = null;
      continue;
    }

    // 场景 / 其它对象键
    const sceneMatch = line.match(/^\s*([a-zA-Z0-9_]+):\s*\{/);
    if (sceneMatch) {
      const key = sceneMatch[1];
      if (key === 'transition' || key === 'dialogues') {
        continue;
      }
      scene = key;
      dialogId = null;
      pendingLeft = pendingRight = null;
      continue;
    }

    // 对白 id（数字）
    const idMatch = line.match(/^\s*id:\s*(\d+),?/);
    if (idMatch && scene) {
      dialogId = idMatch[1];
      pendingLeft = pendingRight = null;
      continue;
    }

    // leftPortrait / rightPortrait
    if (line.match(/^\s*leftPortrait:/)) {
      if (scene && dialogId != null) pendingLeft = i;
      continue;
    }
    if (line.match(/^\s*rightPortrait:/)) {
      if (scene && dialogId != null) pendingRight = i;
      continue;
    }

    // 对白字段结束（activeSide/text/sfx 均在 left/right 之后）
    if ((line.includes('activeSide:') || line.includes('text:') || line.includes('sfx:')) && scene && dialogId != null) {
      const key = `${branch}.${scene}.${dialogId}`;
      if (pendingLeft != null || pendingRight != null) {
        positions.set(key, { left: pendingLeft, right: pendingRight });
      }
      dialogId = null;
      pendingLeft = pendingRight = null;
    }
  }

  return positions;
}

function branchOf(sceneKey) {
  const parts = sceneKey.split('.');
  return parts.length > 1 ? parts[0] : 'shared';
}
function rawKeyOf(sceneKey) {
  return sceneKey.split('.').pop();
}

let totalApplied = 0;
const notFound = [];

for (const [file, entries] of Object.entries(byFile)) {
  const filePath = path.resolve('src/data', file);
  const original = fs.readFileSync(filePath, 'utf8');
  const lines = original.split('\n');
  const positions = indexDialogues(lines);

  let fileChanges = 0;
  for (const e of entries) {
    const branch = branchOf(e.sceneKey);
    const rawKey = rawKeyOf(e.sceneKey);
    const key = `${branch}.${rawKey}.${e.id}`;
    const pos = positions.get(key);

    if (!pos) {
      notFound.push(`${file} :: ${e.sceneKey} #${e.id} [${e.speaker}]`);
      continue;
    }

    if (e.newLeft !== e.oldLeft && pos.left != null) {
      const before = lines[pos.left];
      const after = before.replace(e.oldLeft, e.newLeft);
      if (after !== before) {
        lines[pos.left] = after;
        fileChanges++;
      } else {
        notFound.push(`${file} :: ${e.sceneKey} #${e.id} [${e.speaker}] LEFT 未命中`);
      }
    }

    if (e.newRight !== e.oldRight && pos.right != null) {
      const before = lines[pos.right];
      const after = before.replace(e.oldRight, e.newRight);
      if (after !== before) {
        lines[pos.right] = after;
        fileChanges++;
      } else {
        notFound.push(`${file} :: ${e.sceneKey} #${e.id} [${e.speaker}] RIGHT 未命中`);
      }
    }
  }

  const next = lines.join('\n');
  if (next !== original) {
    fs.writeFileSync(filePath, next, 'utf8');
  }
  totalApplied += fileChanges;
  console.log(`[${file}] 应用 ${fileChanges} 处表情替换`);
}

console.log(`\n共应用 ${totalApplied} 处表情替换`);
if (notFound.length) {
  console.log(`\n警告：以下 ${notFound.length} 处未找到/未命中（请人工核对）：`);
  for (const n of notFound) console.log('  - ' + n);
} else {
  console.log('全部表情替换节点均已精准命中。');
}
