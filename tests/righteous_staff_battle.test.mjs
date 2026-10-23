import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { CH19_BATTLE1 } from '../src/data/chapters/ch19_battle1.js';
import { KEY_ITEMS } from '../src/data/goods/key_items.js';
import { GameApp } from '../src/main.js';
import { CombatSystem } from '../src/systems/combat.js';
import { useRighteousStaffInBattle, RIGHTEOUS_STAFF_DAMAGE } from '../src/systems/righteous_staff_battle.js';
import { InventoryPanelModal } from '../src/ui/components/inventory_panel.js';

const makeBattle = (chapterId = 'ch19_battle1') => {
  const hero = {
    id: 'zhangzixiao', faction: 'player', x: 1, y: 2, hasActed: false,
    inventory: [{ id: 'righteous_staff', count: 1 }]
  };
  const boss = { id: 'boss_colossus', faction: 'enemy', x: 3, y: 2, currentHp: 157, isAlive: true };
  const battle = { chapter: { id: chapterId }, phase: 'PLAYER_PHASE', staffUsed: false, units: [hero, boss] };
  return { battle, hero, boss };
};

test('终战主角可用浩然正气杖重创巨魔一次，但仍须正常击败巨魔', () => {
  const { battle, hero, boss } = makeBattle();
  assert.equal(KEY_ITEMS.righteous_staff.kind, 'key_item');
  assert.equal(CH19_BATTLE1.tutorial.steps.length, 1);
  assert.match(CH19_BATTLE1.tutorial.steps[0].body, /道具.*重要.*浩然正气杖.*对巨魔使用/);

  const result = useRighteousStaffInBattle(battle, hero, hero.id);
  assert.equal(result.success, true);
  assert.equal(result.damage, RIGHTEOUS_STAFF_DAMAGE);
  assert.equal(boss.currentHp, 157 - RIGHTEOUS_STAFF_DAMAGE);
  assert.equal(boss.isAlive, true);
  assert.equal(battle.staffUsed, true);
  assert.deepEqual(hero.inventory, [{ id: 'righteous_staff', count: 1 }], '杖留到战后剧情才碎');
  assert.equal(useRighteousStaffInBattle(battle, hero, hero.id).success, false, '同场不可重复使用');
  assert.equal(boss.currentHp, 157 - RIGHTEOUS_STAFF_DAMAGE);
});

test('第二幕关卡生成器重生终战配置时仍保留用杖教学', () => {
  const scriptUrl = new URL('../tools/build_act2_battles.cjs', import.meta.url);
  let generated = '';
  runInNewContext(readFileSync(scriptUrl, 'utf8'), {
    __dirname: path.dirname(fileURLToPath(scriptUrl)),
    require: (name) => name === 'fs'
      ? {
          mkdirSync() {},
          writeFileSync(file, content) {
            if (file.endsWith('ch19_battle1.js')) generated = content;
          }
        }
      : path,
    console: { log() {} }
  });
  assert.match(generated, /tutorial:\s*\{/);
  assert.match(generated, /对巨魔使用/);
  assert.match(generated, /不用杖也能靠普通攻击获胜/);
});

test('非终战、非主角、缺杖、距离太远或轮次不对均不扣血和行动', () => {
  const { battle, hero, boss } = makeBattle();
  assert.equal(useRighteousStaffInBattle({ ...battle, chapter: { id: 'ch17_battle1' } }, hero, hero.id).success, false);
  assert.equal(useRighteousStaffInBattle(battle, hero, 'someone_else').success, false);
  hero.inventory = [];
  assert.equal(useRighteousStaffInBattle(battle, hero, hero.id).success, false);
  hero.inventory = [{ id: 'righteous_staff', count: 1 }];
  hero.x = 0;
  hero.y = 0;
  assert.match(useRighteousStaffInBattle(battle, hero, hero.id).msg, /靠近巨魔/);
  hero.x = 1;
  hero.y = 2;
  battle.phase = 'ENEMY_PHASE';
  assert.equal(useRighteousStaffInBattle(battle, hero, hero.id).success, false);
  battle.phase = 'PLAYER_PHASE';
  hero.hasActed = true;
  assert.equal(useRighteousStaffInBattle(battle, hero, hero.id).success, false);
  assert.equal(boss.currentHp, 157);
  assert.equal(battle.staffUsed, false);
});

test('低血量巨魔仍留一击，普通消耗品逻辑不能误吞剧情杖', () => {
  const { battle, hero, boss } = makeBattle();
  boss.currentHp = 20;
  const result = useRighteousStaffInBattle(battle, hero, hero.id);
  assert.equal(result.damage, 19);
  assert.equal(boss.currentHp, 1);
  assert.equal(CombatSystem.useItem(hero, 'righteous_staff').success, false);
  assert.deepEqual(hero.inventory, [{ id: 'righteous_staff', count: 1 }]);
});

test('道具面板仅终战给杖显示专属操作；距离不足有反馈，不会提前耗回合', () => {
  const { battle, hero, boss } = makeBattle();
  hero.x = 0;
  hero.y = 0;
  let ended = 0;
  const canvas = { width: 960, height: 540, getContext: () => ({}) };
  const modal = new InventoryPanelModal(canvas, {
    unit: hero,
    onUseKeyItem: (unit) => useRighteousStaffInBattle(battle, unit, hero.id),
    isStoryItemUsed: () => battle.staffUsed,
    onBattleItemUsed: () => { ended++; }
  }, () => {});
  modal._setKind('key_item');
  modal._openActionMenu();
  assert.deepEqual(modal.activeMenu.actions.map((action) => action.id), ['use_key_item', 'cancel']);
  modal._executeMenuAction('use_key_item');
  assert.match(modal.feedback.text, /靠近巨魔/);
  assert.equal(ended, 0);
  assert.equal(boss.currentHp, 157);

  hero.x = 1;
  hero.y = 2;
  modal._openActionMenu();
  modal._executeMenuAction('use_key_item');
  assert.equal(ended, 1);
  assert.equal(boss.currentHp, 157 - RIGHTEOUS_STAFF_DAMAGE);
  const otherModal = new InventoryPanelModal(canvas, { unit: hero }, () => {});
  otherModal._setKind('key_item');
  otherModal._openActionMenu();
  assert.deepEqual(otherModal.activeMenu.actions.map((action) => action.id), ['cancel']);
});

test('游戏行动菜单可打开主角背包对巨魔用杖，随后才结束行动', () => {
  const { battle, hero, boss } = makeBattle();
  const app = Object.create(GameApp.prototype);
  app.canvas = { width: 960, height: 540, getContext: () => ({}) };
  app.gameState = { leadUnitId: hero.id };
  app.battleState = { ...battle, selectedUnit: hero, stash: { items: [] }, actionMenu: {} };
  let ended = 0;
  const floats = [];
  app.addFloatingText = (...args) => floats.push(args);
  app.endUnitTurn = () => { ended++; hero.hasActed = true; };

  app.handleActionMenuSelect('item');
  const modal = app.battleState.inventoryModal;
  assert.ok(modal instanceof InventoryPanelModal);
  modal._setKind('key_item');
  modal._openActionMenu();
  modal._executeMenuAction('use_key_item');
  assert.equal(app.battleState.inventoryModal, null);
  assert.equal(boss.currentHp, 157 - RIGHTEOUS_STAFF_DAMAGE);
  assert.equal(floats.length, 1);
  assert.match(floats[0][0], /浩然正气 -90/);
  assert.equal(ended, 1);
  assert.deepEqual(hero.inventory, [{ id: 'righteous_staff', count: 1 }]);
});
