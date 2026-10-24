import { test } from 'node:test';
import assert from 'node:assert';

// ── mock 浏览器环境（须在动态 import 前就绪） ──
const dispatched = [];
let currentPads = [];
Object.defineProperty(globalThis, 'window', {
  value: { dispatchEvent: (e) => dispatched.push(e) },
  configurable: true,
  writable: true,
});
Object.defineProperty(globalThis, 'navigator', {
  value: { getGamepads: () => currentPads },
  configurable: true,
  writable: true,
});
// Node 无 KeyboardEvent，mock 一个只存关键字段的类
globalThis.KeyboardEvent = class {
  constructor(type, init = {}) {
    this.type = type;
    this.key = init.key;
    this.code = init.code;
    this.bubbles = init.bubbles;
    this.cancelable = init.cancelable;
  }
};

const { gamepadManager } = await import('../src/systems/gamepad.js');

// 构造 mock 手柄：btnTrue 为按下按钮索引集合；axes 为摇杆轴数组
function pad(btnTrue = [], axes = [0, 0, 0, 0]) {
  const buttons = Array.from({ length: 16 }, (_, i) => ({
    pressed: btnTrue.includes(i),
    value: btnTrue.includes(i) ? 1 : 0,
  }));
  return { connected: true, buttons, axes };
}

function reset() {
  gamepadManager.prevButtons.clear();
  gamepadManager.dirState = {};
  dispatched.length = 0;
}

test('A 键(0)按下映射为 Enter，B 键(1)映射为 Escape', () => {
  reset();
  currentPads = [pad([0])]; // A 按下
  gamepadManager.poll();
  assert.ok(dispatched.some((e) => e.key === 'Enter'), 'A 应派发 Enter');

  reset();
  currentPads = [pad([1])]; // B 按下
  gamepadManager.poll();
  assert.ok(dispatched.some((e) => e.key === 'Escape'), 'B 应派发 Escape');
});

test('Start 呼出剧情存档专用 F10，不会在战斗中误触取消', () => {
  reset();
  currentPads = [pad([9])];
  gamepadManager.poll();
  assert.deepEqual(dispatched.map((e) => e.key), ['F10']);
});

test('按钮边沿检测：按住不重复派发', () => {
  reset();
  currentPads = [pad([0])]; // A 按下
  gamepadManager.poll();
  assert.equal(dispatched.filter((e) => e.key === 'Enter').length, 1, '首次按下派发一次');

  dispatched.length = 0;
  currentPads = [pad([0])]; // 仍按住
  gamepadManager.poll();
  assert.equal(dispatched.length, 0, '按住期间不应重复派发');

  // 松开再按，应再次触发
  currentPads = [pad([])];
  gamepadManager.poll();
  dispatched.length = 0;
  currentPads = [pad([0])];
  gamepadManager.poll();
  assert.equal(dispatched.filter((e) => e.key === 'Enter').length, 1, '松开再按应再次派发');
});

test('十字键方向映射', () => {
  reset();
  currentPads = [pad([12])]; // dpad up
  gamepadManager.poll();
  assert.ok(dispatched.some((e) => e.key === 'ArrowUp'), '十字键上应派发 ArrowUp');

  reset();
  currentPads = [pad([14])]; // dpad left
  gamepadManager.poll();
  assert.ok(dispatched.some((e) => e.key === 'ArrowLeft'), '十字键左应派发 ArrowLeft');
});

test('左摇杆映射 + 死区', () => {
  reset();
  // 轴 0 右推（> 阈值 0.5）
  currentPads = [pad([], [0.8, 0, 0, 0])];
  gamepadManager.poll();
  assert.ok(dispatched.some((e) => e.key === 'ArrowRight'), '摇杆右推应派发 ArrowRight');

  reset();
  // 轴 1 上推（< -阈值）
  currentPads = [pad([], [0, -0.9, 0, 0])];
  gamepadManager.poll();
  assert.ok(dispatched.some((e) => e.key === 'ArrowUp'), '摇杆上推应派发 ArrowUp');

  reset();
  // 死区内（< 阈值）不应触发
  currentPads = [pad([], [0.3, 0.2, 0, 0])];
  gamepadManager.poll();
  assert.equal(dispatched.length, 0, '死区内不应触发方向');
});

test('无手柄时不报错、不派发', () => {
  reset();
  currentPads = [null, null]; // getGamepads 返回空
  gamepadManager.poll();
  assert.equal(dispatched.length, 0, '无手柄不应派发任何事件');
});

test('手柄断开后重连时按钮能再次触发', () => {
  reset();
  currentPads = [pad([1])];
  gamepadManager.poll();
  currentPads = [];
  gamepadManager.poll();
  currentPads = [pad([1])];
  gamepadManager.poll();
  assert.equal(dispatched.filter((e) => e.key === 'Escape').length, 2);
});
