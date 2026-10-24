import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GameApp } from '../src/main.js';
import { sound } from '../src/engine/sound.js';

function makeApp(stage = 'STAGE_STORY') {
  const app = Object.create(GameApp.prototype);
  const canvasEvents = {};
  const buttonEvents = {};
  const classes = new Set();
  const button = {
    hidden: true,
    addEventListener: (type, fn) => { buttonEvents[type] = fn; },
    setAttribute() {},
    classList: {
      contains: (name) => classes.has(name),
      toggle: (name, enabled) => {
        if (enabled) classes.add(name);
        else classes.delete(name);
      },
    },
  };
  app.canvas = {
    addEventListener: (type, fn) => { canvasEvents[type] = fn; },
  };
  app.stage = stage;
  app.dialogueSystem = { loading: false };
  app.joinPartyModal = { isOpen: false };
  app.battleState = {
    mode: 'IDLE',
    phase: 'PLAYER_PHASE',
    isAnimatingCombat: false,
    units: [
      { faction: 'player', isAlive: true, hasActed: false },
      { faction: 'enemy', isAlive: true, hasActed: false },
    ],
  };
  app.touchAction = button;
  return { app, button, canvasEvents, buttonEvents };
}

test('触屏按钮仅在允许操作的剧情、战斗和存档状态出现', () => {
  const { app, button } = makeApp();
  assert.equal(app.getTouchAction(), '存档');
  app.updateTouchAction();
  assert.equal(button.hidden, false);
  assert.equal(button.textContent, '存档');

  app.saveMenuModal = {};
  assert.equal(app.getTouchAction(), '关闭');
  app.saveMenuModal = null;
  app.chapterBanner = {};
  assert.equal(app.getTouchAction(), null);
  app.chapterBanner = null;
  app.joinPartyModal.isOpen = true;
  assert.equal(app.getTouchAction(), null);
  app.joinPartyModal.isOpen = false;

  app.stage = 'STAGE_BATTLE';
  assert.equal(app.getTouchAction(), '结束回合');
  app.updateTouchAction();
  assert.equal(button.textContent, '结束回合');
  app.battleState.phaseBanner = {};
  assert.equal(app.getTouchAction(), null);
  app.battleState.phaseBanner = null;
  app.battleState.units[0].isAlive = false;
  assert.equal(app.getTouchAction(), null);
  app.battleState.units[0].isAlive = true;
  for (const mode of ['UNIT_SELECTED', 'ACTION_MENU', 'SKILL_MENU', 'TARGET_SELECT']) {
    app.battleState.mode = mode;
    assert.equal(app.getTouchAction(), '返回');
  }
  app.updateTouchAction();
  assert.equal(button.classList.contains('battle'), true);
  app.battleState.phase = 'ENEMY_PHASE';
  assert.equal(app.getTouchAction(), null);
  app.battleState.phase = 'PLAYER_PHASE';

  for (const popup of ['tutorialModal', 'inventoryModal', 'victoryModal']) {
    app.battleState[popup] = {};
    app.updateTouchAction();
    assert.equal(button.hidden, false);
    assert.equal(button.classList.contains('battle'), false, `${popup} 不应占用信息栏`);
    app.battleState[popup] = null;
  }
  app.updateTouchAction();
  assert.equal(button.classList.contains('battle'), true);

  app.battleState.isAnimatingCombat = true;
  assert.equal(app.getTouchAction(), null);
  app.updateTouchAction();
  assert.equal(button.hidden, true);
});

test('空闲时直接结束我方回合，未行动队员待机，其他状态禁止跳过', () => {
  const { app } = makeApp('STAGE_BATTLE');
  const player = { faction: 'player', isAlive: true, hasActed: false };
  const defeated = { faction: 'player', isAlive: false, hasActed: false };
  const enemy = { faction: 'enemy', isAlive: true, hasActed: false };
  app.battleState.units = [player, defeated, enemy];
  let enemyPhases = 0;
  app.startEnemyPhase = () => { enemyPhases++; app.battleState.phase = 'ENEMY_PHASE'; };
  const playSfx = sound.playSfx;
  try {
    sound.playSfx = () => {};
    app.battleState.mode = 'ACTION_MENU';
    app.finishPlayerTurn();
    assert.equal(enemyPhases, 0);
    app.battleState.mode = 'IDLE';
    app.battleState.tutorialModal = {};
    app.finishPlayerTurn();
    assert.equal(enemyPhases, 0);
    app.battleState.tutorialModal = null;
    enemy.isAlive = false;
    app.finishPlayerTurn();
    assert.equal(enemyPhases, 0);
    enemy.isAlive = true;
    app.finishPlayerTurn();
    assert.equal(enemyPhases, 1);
    assert.equal(player.hasActed, true);
    assert.equal(defeated.hasActed, false);
    assert.equal(enemy.hasActed, false);
    app.finishPlayerTurn();
    assert.equal(enemyPhases, 1);
  } finally {
    sound.playSfx = playSfx;
  }
});

test('触屏存档和返回经统一按键路由，手柄 Start 不撤销战斗', () => {
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  const previousKeyboardEvent = globalThis.KeyboardEvent;
  const unlock = sound.unlock;
  const playSfx = sound.playSfx;
  const windowEvents = {};
  const { app, button, buttonEvents, canvasEvents } = makeApp();
  let opened = 0;
  let canceled = 0;
  let skillCanceled = 0;
  let ended = 0;
  app.openSaveMenu = () => {
    opened++;
    app.saveMenuModal = {
      close() { app.saveMenuModal = null; },
      handleKeyDown(e) { if (e.key === 'Escape') this.close(); },
    };
  };
  app.handleBattleCancel = () => { canceled++; };
  try {
    sound.unlock = () => {};
    sound.playSfx = () => {};
    globalThis.document = { getElementById: () => button };
    globalThis.KeyboardEvent = class {
      constructor(type, opts) { this.type = type; Object.assign(this, opts); }
      preventDefault() {}
    };
    globalThis.window = {
      addEventListener: (type, fn) => { windowEvents[type] = fn; },
      dispatchEvent: (event) => windowEvents[event.type](event),
    };
    app.bindEvents();

    buttonEvents.click({ preventDefault() {}, stopPropagation() {} });
    assert.equal(opened, 1);
    assert.equal(app.getTouchAction(), '关闭');
    buttonEvents.click({ preventDefault() {}, stopPropagation() {} });
    assert.equal(app.saveMenuModal, null);

    app.stage = 'STAGE_BATTLE';
    app.startEnemyPhase = () => { ended++; app.battleState.phase = 'ENEMY_PHASE'; };
    app.battleState.units = [
      { faction: 'player', isAlive: true, hasActed: false },
      { faction: 'enemy', isAlive: true, hasActed: false },
    ];
    buttonEvents.click({ preventDefault() {}, stopPropagation() {} });
    assert.equal(ended, 1);
    assert.equal(app.battleState.units[0].hasActed, true);
    app.battleState.phase = 'PLAYER_PHASE';
    app.battleState.mode = 'ACTION_MENU';
    app.battleState.actionMenu = { handleKeyDown: (e) => {
      if (e.key === 'Escape') canceled++;
    } };
    buttonEvents.click({ preventDefault() {}, stopPropagation() {} });
    assert.equal(canceled, 1);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'F10' }));
    assert.equal(opened, 1);
    assert.equal(canceled, 1);
    assert.equal(ended, 1);

    app.battleState.mode = 'SKILL_MENU';
    app.battleState.skillMenu = { handleKeyDown: (e) => {
      if (e.key === 'Escape') skillCanceled++;
    } };
    canvasEvents.contextmenu({ preventDefault() {} });
    assert.equal(skillCanceled, 1);
  } finally {
    globalThis.window = previousWindow;
    globalThis.document = previousDocument;
    globalThis.KeyboardEvent = previousKeyboardEvent;
    sound.unlock = unlock;
    sound.playSfx = playSfx;
  }
});
