import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { CH10_BATTLE1 } from '../src/data/chapters/ch10_battle1.js';
import { CH11_BATTLE1 } from '../src/data/chapters/ch11_battle1.js';
import { CH12_BATTLE1 } from '../src/data/chapters/ch12_battle1.js';
import { CH13_BATTLE1 } from '../src/data/chapters/ch13_battle1.js';
import { CH14_BATTLE1 } from '../src/data/chapters/ch14_battle1.js';
import { CH15_BATTLE1 } from '../src/data/chapters/ch15_battle1.js';
import { CH15B_BATTLE1 } from '../src/data/chapters/ch15b_battle1.js';
import { CH16_BATTLE1 } from '../src/data/chapters/ch16_battle1.js';
import { CH17_BATTLE1 } from '../src/data/chapters/ch17_battle1.js';
import { CH18_BATTLE1 } from '../src/data/chapters/ch18_battle1.js';
import { CH19_BATTLE1 } from '../src/data/chapters/ch19_battle1.js';
import { CONSUMABLES } from '../src/data/goods/consumables.js';
import { KEY_ITEMS } from '../src/data/goods/key_items.js';
import { createEnemyUnit, createChapterEnemyUnit } from '../src/systems/growth.js';
import { settleLoot } from '../src/systems/loot.js';

const chapters = [
  CH10_BATTLE1, CH11_BATTLE1, CH12_BATTLE1, CH13_BATTLE1, CH14_BATTLE1,
  CH15_BATTLE1, CH15B_BATTLE1, CH16_BATTLE1, CH17_BATTLE1, CH18_BATTLE1,
  CH19_BATTLE1
];
const spawn = (chapter, dep) => createChapterEnemyUnit(chapter, dep);
const restores = (drop, stat) => CONSUMABLES[drop.itemId]?.effects?.some(
  (effect) => effect.stat === stat && (effect.value === 'full' || effect.value > 0)
);

test('第二幕每战都有 HP/MP 补给，后半段有保底 MP 掉落', () => {
  for (const chapter of chapters) {
    const drops = chapter.enemyDeploy.flatMap((dep) => spawn(chapter, dep).drops);
    assert.ok(drops.some((drop) => restores(drop, 'hp')), `${chapter.id}: 无 HP 补给`);
    assert.ok(drops.some((drop) => restores(drop, 'mp')), `${chapter.id}: 无 MP 补给`);
    if (chapters.indexOf(chapter) >= 2) {
      assert.ok(drops.some((drop) => drop.chance === 1 && restores(drop, 'mp')),
        `${chapter.id}: 后半段缺少保底 MP 补给`);
    }
    assert.ok(drops.every((drop) => !KEY_ITEMS[drop.itemId]),
      `${chapter.id}: 不应重复掉落第一幕关键物证`);
    for (const drop of drops) {
      const item = CONSUMABLES[drop.itemId];
      assert.ok(item?.use_in_battle, `${chapter.id}: ${drop.itemId} 不可用于战斗`);
      assert.ok(existsSync(new URL(`../${item.icon || `assets/items/${item.id}@2x.png`}`, import.meta.url)),
        `${chapter.id}: ${item.id} 缺道具图标`);
    }
  }
});

test('复用第一幕敌人只在第二幕升级和改掉落，不影响原模板', () => {
  const athlete = spawn(CH10_BATTLE1, CH10_BATTLE1.enemyDeploy.find((dep) => dep.instanceId === 'push_a'));
  const garagePunk = spawn(CH11_BATTLE1, CH11_BATTLE1.enemyDeploy.find((dep) => dep.instanceId === 'punk_a'));
  const dockPunk = spawn(CH13_BATTLE1, CH13_BATTLE1.enemyDeploy.find((dep) => dep.instanceId === 'punk_a'));
  assert.equal(athlete.level, 8);
  assert.equal(garagePunk.level, 7);
  assert.equal(dockPunk.level, 9);
  assert.deepEqual(garagePunk.drops.map((drop) => drop.itemId),
    ['white_rabbit_candy', 'honey_tea']);
  assert.ok(createEnemyUnit('punk', { instanceId: 'first_act_punk' }).drops
    .some((drop) => drop.itemId === 'pe_teacher_brain'));
  const recipient = { inventory: [] };
  const { loots } = settleLoot(dockPunk, recipient, { rng: () => 0 });
  assert.deepEqual(loots.map((loot) => loot.itemId), ['white_rabbit_candy', 'honey_tea']);
  assert.deepEqual(recipient.inventory.map((slot) => slot.id),
    ['white_rabbit_candy', 'honey_tea']);
  assert.deepEqual(settleLoot(dockPunk, recipient).loots, [], '掉落只能结算一次');
});

test('Tiled 重写敌人出生点时不会覆盖独立的关卡平衡配置', () => {
  for (const id of ['10', '11', '13']) {
    const source = readFileSync(new URL(`../src/data/chapters/ch${id}_battle1.js`, import.meta.url), 'utf8');
    const rewritten = source.replace(/enemyDeploy:\s*\[[\s\S]*?\],/m, 'enemyDeploy: [],');
    assert.match(rewritten, /enemyDeploy:\s*\[\],\s*enemyTuning:\s*\{/);
  }
});

test('终战三名敌人的耐久随首领层级递增，不额外提高攻击', () => {
  const [colossus, father, son] = CH19_BATTLE1.enemyDeploy.map((dep) => spawn(CH19_BATTLE1, dep));
  assert.ok(colossus.stats.maxHp >= 150);
  assert.ok(father.stats.maxHp >= 60);
  assert.ok(son.stats.maxHp >= 50);
  assert.ok(colossus.stats.maxHp > father.stats.maxHp);
  assert.ok(father.stats.maxHp > son.stats.maxHp);
  assert.equal(colossus.stats.str, 17);
  assert.equal(colossus.currentHp, colossus.stats.maxHp);
});
