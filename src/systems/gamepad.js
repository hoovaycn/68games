/**
 * 手柄输入管理（Web Gamepad API）
 *
 * 思路：把手柄按键「翻译」成键盘事件，复用项目里已完备的 keydown 逻辑
 * （标题菜单、对话、战斗光标、各种模态框全部走 handleKeyDown）。
 *
 * - 方向：十字键 + 左摇杆 → ArrowUp/Down/Left/Right（带按住连发）
 * - A → Enter（确认）
 * - B → Escape（取消/返回）
 * - X → 空格（推进对话/通用确认）
 * - Y → Tab（切菜单视图）
 * - Start → F10（剧情存档；战斗空闲时结束我方回合）
 *
 * 零依赖：Electron 的 Chromium 原生支持 navigator.getGamepads()。
 */

const AXIS_THRESHOLD = 0.5;      // 左摇杆死区阈值
const REPEAT_DELAY = 400;        // 方向键按住后，首次连发前的等待(ms)
const REPEAT_INTERVAL = 120;     // 连发间隔(ms)

// 标准手柄按键索引（Xbox 布局）
const BTN = {
  A: 0, B: 1, X: 2, Y: 3,
  LB: 4, RB: 5, LT: 6, RT: 7,
  BACK: 8, START: 9,
  LS: 10, RS: 11,
  UP: 12, DOWN: 13, LEFT: 14, RIGHT: 15,
};

// 手柄按钮 → 键盘 key
const BUTTON_TO_KEY = {
  [BTN.A]: 'Enter',
  [BTN.B]: 'Escape',
  [BTN.X]: ' ',
  [BTN.Y]: 'Tab',
  [BTN.START]: 'F10',
};

// key → code（KeyboardEvent 需要，保证 e.code 判定（如 F 键）也不受影响）
const KEY_TO_CODE = {
  'ArrowUp': 'ArrowUp',
  'ArrowDown': 'ArrowDown',
  'ArrowLeft': 'ArrowLeft',
  'ArrowRight': 'ArrowRight',
  'Enter': 'Enter',
  'Escape': 'Escape',
  'F10': 'F10',
  ' ': 'Space',
  'Tab': 'Tab',
};

function dispatchKey(key) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new KeyboardEvent('keydown', {
    key,
    code: KEY_TO_CODE[key] || key,
    bubbles: true,
    cancelable: true,
  }));
}

class GamepadManager {
  constructor() {
    this.available = typeof navigator !== 'undefined' && typeof navigator.getGamepads === 'function';
    this.prevButtons = new Map();   // `${gpIndex}:${btnIndex}` -> pressed
    this.dirState = {};             // dir -> { heldSince, lastRepeat }
    this.connected = false;
  }

  /** 每帧调用（main.js loop 里） */
  poll() {
    if (!this.available) return;
    let gps;
    try {
      gps = navigator.getGamepads();
    } catch (e) {
      return;
    }
    const now = performance.now();
    let anyConnected = false;

    for (let gi = 0; gi < gps.length; gi++) {
      const gp = gps[gi];
      if (!gp || !gp.connected) continue;
      anyConnected = true;
      this._pollButtons(gi, gp);
      this._pollDirections(gi, gp, now);
    }

    if (!anyConnected) {
      this.prevButtons.clear();
      this.dirState = {};
    }
    if (anyConnected !== this.connected) {
      this.connected = anyConnected;
      console.info(`[gamepad] ${anyConnected ? '已连接' : '已断开'}`);
    }
  }

  _pollButtons(gi, gp) {
    for (let b = 0; b < gp.buttons.length; b++) {
      const pressed = !!gp.buttons[b] && gp.buttons[b].pressed;
      const key = `${gi}:${b}`;
      const was = !!this.prevButtons.get(key);
      if (pressed && !was) {
        const mapped = BUTTON_TO_KEY[b];
        if (mapped) dispatchKey(mapped);
      }
      this.prevButtons.set(key, pressed);
    }
  }

  _pollDirections(gi, gp, now) {
    const active = new Set();

    // 十字键
    if (gp.buttons[BTN.UP] && gp.buttons[BTN.UP].pressed) active.add('ArrowUp');
    if (gp.buttons[BTN.DOWN] && gp.buttons[BTN.DOWN].pressed) active.add('ArrowDown');
    if (gp.buttons[BTN.LEFT] && gp.buttons[BTN.LEFT].pressed) active.add('ArrowLeft');
    if (gp.buttons[BTN.RIGHT] && gp.buttons[BTN.RIGHT].pressed) active.add('ArrowRight');

    // 左摇杆（轴 0 左右，轴 1 上下）
    if (gp.axes && gp.axes.length >= 2) {
      if (gp.axes[0] < -AXIS_THRESHOLD) active.add('ArrowLeft');
      if (gp.axes[0] > AXIS_THRESHOLD) active.add('ArrowRight');
      if (gp.axes[1] < -AXIS_THRESHOLD) active.add('ArrowUp');
      if (gp.axes[1] > AXIS_THRESHOLD) active.add('ArrowDown');
    }

    for (const dir of active) {
      const st = this.dirState[dir];
      if (!st) {
        // 首次按下：立即触发一次
        dispatchKey(dir);
        this.dirState[dir] = { heldSince: now, lastRepeat: now };
        continue;
      }
      const heldFor = now - st.heldSince;
      if (heldFor < REPEAT_DELAY) continue;
      if (now - st.lastRepeat >= REPEAT_INTERVAL) {
        dispatchKey(dir);
        st.lastRepeat = now;
      }
    }

    // 清理已释放的方向
    for (const dir of Object.keys(this.dirState)) {
      if (!active.has(dir)) delete this.dirState[dir];
    }
  }
}

export const gamepadManager = new GamepadManager();
