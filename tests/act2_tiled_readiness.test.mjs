import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import xml2js from 'xml2js';
import { GridSystem } from '../src/systems/grid.js';
import { createPlayerUnit, createChapterEnemyUnit, computeStatsAtLevel } from '../src/systems/growth.js';
import { CombatSystem } from '../src/systems/combat.js';
import { tiledManager } from '../src/systems/tiled_map.js';
import { CH19_BATTLE1 } from '../src/data/chapters/ch19_battle1.js';
import { CH12_BATTLE1 } from '../src/data/chapters/ch12_battle1.js';

const require = createRequire(import.meta.url);
const { syncTmx, CHAPTER_CONFIGS } = require('../tools/sync_tmx_levels.cjs');
const root = fileURLToPath(new URL('../', import.meta.url));
const act2 = CHAPTER_CONFIGS.filter(({ id }) => /^ch(?:1[0-9]|15b)_battle1$/.test(id));
const parser = new xml2js.Parser({ explicitArray: false });
const list = value => value == null ? [] : Array.isArray(value) ? value : [value];

test('第二幕 TMX 图集、图层、部署数量和通路均已就绪', async () => {
  assert.equal(act2.length, 11);
  for (const cfg of act2) {
    const chapter = (await import(new URL(`../${cfg.js}`, import.meta.url)))[cfg.id.toUpperCase()];
    assert.ok(chapter, `${cfg.id}: 关卡配置缺失`);
    const mapPath = path.join(root, cfg.tmx);
    const map = (await parser.parseStringPromise(readFileSync(mapPath, 'utf8'))).map;
    const w = Number(map.$.width), h = Number(map.$.height);
    assert.equal(Number(map.$.tilewidth), 48, cfg.id);
    assert.equal(Number(map.$.tileheight), 48, cfg.id);
    assert.equal(w, chapter.mapWidth, cfg.id);
    assert.equal(h, chapter.mapHeight, cfg.id);
    assert.ok(w >= 16 && h >= 10 && w * h >=
      (chapter.playerDeploy.length + chapter.enemyDeploy.length) * 8, `${cfg.id}: 战场过于拥挤`);
    for (const ref of list(map.tileset)) {
      const tsxPath = ref.$.source && path.resolve(path.dirname(mapPath), ref.$.source);
      assert.ok(!tsxPath || existsSync(tsxPath), `${cfg.id}: 图集 ${ref.$.source} 不存在`);
      const tsx = !tsxPath ? ref : tsxPath.endsWith('.tsj')
        ? JSON.parse(readFileSync(tsxPath, 'utf8'))
        : (await parser.parseStringPromise(readFileSync(tsxPath, 'utf8'))).tileset;
      const imageSource = tsx.image?.$?.source || tsx.image;
      assert.ok(existsSync(path.resolve(path.dirname(tsxPath || mapPath), imageSource)),
        `${cfg.id}: 图集图片 ${imageSource} 不存在`);
    }
    assert.equal(chapter.tiledData.tilesets.length, list(map.tileset).length, cfg.id);
    for (const gid of [...chapter.tiledData.bgGrid.flat(), ...chapter.tiledData.decGrid.flat()]) {
      if (!gid) continue;
      const tile = tiledManager.getTileInfo(gid, chapter.tiledData.tilesets);
      assert.ok(tile, `${cfg.id}: GID ${gid} 无法渲染`);
      const raw = (gid & 0x1fffffff) >>> 0;
      const set = chapter.tiledData.tilesets.findLast(ts => raw >= ts.firstgid);
      assert.ok(existsSync(path.join(root, set.src)), `${cfg.id}: 图片 ${set.src} 不存在`);
    }
    for (const name of ['Background', 'Decoration']) {
      const layer = list(map.layer).find(item => item.$.name === name);
      assert.ok(layer, `${cfg.id}: 缺少 ${name}`);
      assert.equal(String(layer.data._ || layer.data).trim().split(',').length, w * h, cfg.id);
    }
    const groups = list(map.objectgroup);
    const spawns = list(groups.find(g => g.$.name === 'Spawns')?.object);
    assert.equal(spawns.length, cfg.playerUnits.length + cfg.enemyUnits.length, cfg.id);
    assert.equal(chapter.playerDeploy.length, cfg.playerUnits.length, cfg.id);
    assert.equal(chapter.enemyDeploy.length, cfg.enemyUnits.length, cfg.id);
    const grid = new GridSystem(chapter);
    const seen = new Set();
    for (const [index, obj] of spawns.entries()) {
      const x = Number(obj.$.x) / 48, y = Number(obj.$.y) / 48;
      const deployed = index < cfg.playerUnits.length
        ? chapter.playerDeploy[index] : chapter.enemyDeploy[index - cfg.playerUnits.length];
      assert.deepEqual({ x, y }, { x: deployed.x, y: deployed.y }, `${cfg.id}: 出生点 ${index + 1}`);
      assert.ok(Number.isInteger(x) && Number.isInteger(y) && grid.isValid(x, y), cfg.id);
      assert.ok(!grid.isBlockedTerrain(x, y), `${cfg.id}: 出生点被堵住`);
      assert.ok(!seen.has(`${x},${y}`), `${cfg.id}: 出生点重叠`);
      seen.add(`${x},${y}`);
    }
    const a = chapter.playerDeploy[0], b = chapter.enemyDeploy[0];
    assert.ok(grid.findPath(a.x, a.y, b.x, b.y, 'player', []).length > 0,
      `${cfg.id}: 我方无法接近敌人`);
  }
});

test('同步时保持对象顺序；缺点位或站位冲突时拒绝覆写 JS', async () => {
  const cfg = act2.find(({ id }) => id === 'ch18_battle1');
  const sourceXml = readFileSync(path.join(root, cfg.tmx), 'utf8');
  const sourceJs = readFileSync(path.join(root, cfg.js), 'utf8');
  const dir = mkdtempSync(path.join(tmpdir(), 'fx-act2-tmx-'));
  const tmx = path.join(dir, 'map.tmx'), js = path.join(dir, 'battle.js');
  const sandbox = { ...cfg, tmx, js };
  const firstSpawn = /(<object id="1" )x="\d+" y="\d+"/;
  const secondSpawn = sourceXml.match(/<object id="2" x="(\d+)" y="(\d+)"/);
  assert.ok(firstSpawn.test(sourceXml) && secondSpawn);
  try {
    writeFileSync(js, sourceJs);
    const localXml = sourceXml.replace(/(<tileset[^>]+source=")([^"]+)(")/g,
      (_, start, source, end) => `${start}${path.resolve(path.dirname(path.join(root, cfg.tmx)), source).replaceAll('\\', '/')}${end}`);
    writeFileSync(tmx, localXml.replace(firstSpawn, '$1x="48" y="96"'));
    await syncTmx(sandbox);
    assert.match(readFileSync(js, 'utf8'), /unitId: 'zhangzixiao', x: 1, y: 2/);
    assert.match(readFileSync(js, 'utf8'),
      new RegExp(`unitId: 'zhanghanyu', x: ${Number(secondSpawn[1]) / 48}, y: ${Number(secondSpawn[2]) / 48}`));

    const validJs = readFileSync(js, 'utf8');
    writeFileSync(tmx, localXml.replace(/  <object id="11"[^>]*\/>\r?\n/, ''));
    await assert.rejects(syncTmx(sandbox), /出生点应为/);
    assert.equal(readFileSync(js, 'utf8'), validJs);
    writeFileSync(tmx, localXml.replace(firstSpawn,
      `$1x="${secondSpawn[1]}" y="${secondSpawn[2]}"`));
    await assert.rejects(syncTmx(sandbox), /重叠/);
    assert.equal(readFileSync(js, 'utf8'), validJs);
    writeFileSync(tmx, localXml.replace('<objectgroup id="4" name="Collisions">',
      '<objectgroup id="4" name="Collisions"><object id="90" x="96" y="144" width="48" height="48"/>'));
    await assert.rejects(syncTmx(sandbox), /阻挡/);
    assert.equal(readFileSync(js, 'utf8'), validJs);
    writeFileSync(tmx, localXml.replace('<objectgroup id="4" name="Collisions">',
      '<objectgroup id="4" name="Collisions"><object id="90" x="336" y="0" width="48" height="480"/>'));
    await assert.rejects(syncTmx(sandbox), /隔断/);
    assert.equal(readFileSync(js, 'utf8'), validJs);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('终战巨魔保留磨血空间，但相邻反击不会轻易秒杀主角', () => {
  const player = createPlayerUnit('zhangzixiao');
  const baseline = computeStatsAtLevel(player.classId, player.level);
  const grown = computeStatsAtLevel(player.classId, 9);
  for (const stat of Object.keys(grown)) player.stats[stat] += grown[stat] - baseline[stat];
  player.level = 9;
  player.x = 1; player.y = 1;
  const boss = createChapterEnemyUnit(CH19_BATTLE1, CH19_BATTLE1.enemyDeploy[0]);
  boss.x = 2; boss.y = 1;
  const preview = CombatSystem.predictBattle(player, boss, null, null);
  assert.ok(preview.defender.damage <= 15);
  assert.equal(preview.defender.crit, 0);
  assert.ok(boss.stats.maxHp >= 150);
  assert.ok(preview.attacker.damage > 0);
  const heavy = createChapterEnemyUnit(CH12_BATTLE1,
    CH12_BATTLE1.enemyDeploy.find(d => d.instanceId === 'heavy_a'));
  heavy.x = 2; heavy.y = 1;
  const threat = CombatSystem.predictBattle(heavy, player, null, null);
  assert.ok(threat.attacker.damage <= 15);
  assert.equal(threat.attacker.crit, 0);
});
