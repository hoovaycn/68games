import { GridSystem } from './systems/grid.js';
import { CombatSystem } from './systems/combat.js';
import { EnemyAI } from './systems/ai.js';
import { Renderer } from './ui/renderer.js';
import { DialogueSystem } from './systems/dialogue_system.js';
import { TitleScreen } from './ui/title_screen.js';
import { EpilogueScreen } from './ui/epilogue_screen.js';
import { VictoryModal } from './ui/components/victory_modal.js';
import { ItemModal } from './ui/components/item_modal.js';
import { sound } from './engine/sound.js';
import { PROLOGUE_STORY } from './data/story_prologue.js';
import { CH0_BATTLE1 } from './data/chapters/ch0_battle1.js';
import { CH0_BATTLE2 } from './data/chapters/ch0_battle2.js';
import { UNITS } from './data/units.js';
import { ENEMIES } from './data/enemies.js';
import { CLASSES } from './data/classes.js';
import { WEAPONS } from './data/weapons.js';
import { ITEMS } from './data/items.js';

class GameApp {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.topBar = document.getElementById('top-bar');
    this.chapterTitleEl = document.getElementById('chapter-title');
    this.turnCountEl = document.getElementById('turn-count');
    this.phaseIndicatorEl = document.getElementById('current-phase');

    this.tileSize = 48;
    this.renderer = new Renderer(this.canvas, this.tileSize);

    this.selectedRoute = 'male';
    this.activePlayerUnitId = 'zhangzixiao';

    this.titleScreen = new TitleScreen(this.canvas, (routeId) => this.onCharacterSelected(routeId));
    this.dialogueSystem = new DialogueSystem(this.canvas, (transition) => this.handleSceneTransition(transition));
    this.epilogueScreen = new EpilogueScreen(this.canvas, () => this.enterTitleScreen());

    this.stage = 'STAGE_TITLE';

    this.battleState = {
      chapter: null,
      gridSystem: null,
      units: [],
      turn: 1,
      phase: 'PLAYER_PHASE',
      mode: 'IDLE',
      cursor: { x: 2, y: 4 },
      selectedUnit: null,
      originalPos: null,
      reachableTiles: [],
      attackableTiles: [],
      currentPath: [],
      actionMenu: null,
      itemMenuIndex: 0,
      targetEnemies: [],
      targetIndex: 0,
      battlePreview: null,
      floatingTexts: [],
      itemRewardModal: null, // 战利品掉落弹窗模态框
      isAnimatingCombat: false, // 锁定输入，正在播放交战与受击震颤动画
      phaseBanner: null, // 回合切换横幅 (PLAYER_PHASE / ENEMY_PHASE)
      reinforcementNotice: null, // 援军出现提示
      pendingReinforcements: [], // 待触发的援军队列
      triggeredReinforcementTurns: new Set() // 已触发过的回合 (避免重复触发)
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.enterTitleScreen();
    this.loop();
  }

  enterTitleScreen() {
    this.stage = 'STAGE_TITLE';
    this.topBar.style.display = 'none';
    // 设计分辨率 960×540，由 index.html scaler 等比缩放
    this.canvas.width = 960;
    this.canvas.height = 540;
    // 调用 titleScreen.enter() 让其自主选择 OPENING 或 TITLE 子状态
    // (首次启动走 OPENING, 后续启动或 Esc 回标题直接进 TITLE)
    if (typeof this.titleScreen.enter === 'function') {
      this.titleScreen.enter();
    } else {
      // 兼容旧版 title_screen (无 enter 方法)
      sound.playBgm('bgm_suspense');
    }
  }

  onCharacterSelected(routeId) {
    this.selectedRoute = routeId;
    this.activePlayerUnitId = routeId === 'male' ? 'zhangzixiao' : 'shiyunuo';
    this.startStoryScene('scene_classroom');
  }

  startStoryScene(sceneKey) {
    this.stage = 'STAGE_STORY';
    this.topBar.style.display = 'none';

    this.canvas.width = 960;
    this.canvas.height = 540;

    const routeData = PROLOGUE_STORY[this.selectedRoute] || PROLOGUE_STORY.male;
    const sceneData = routeData[sceneKey];

    if (sceneData) {
      this.dialogueSystem.startScene(sceneData);
    }
  }

  handleSceneTransition(transition) {
    if (!transition) return;

    if (transition.isBattleTrigger || transition.battleId) {
      const bMap = transition.battleId === 'ch0_battle2' ? CH0_BATTLE2 : CH0_BATTLE1;
      this.enterBattleMap(bMap, bMap.nextStorySceneOnWin);
    } else if (transition.targetScene) {
      this.startStoryScene(transition.targetScene);
    } else if (transition.type === 'CHAPTER_CLEAR') {
      this.enterEpilogueScreen();
    }
  }

  /**
   * 在当前战场上生成援军 (基于 pendingReinforcementConfig 中的 units 配置)
   * 移除已触发的援军配置，避免后续误判为 pending
   */
  spawnReinforcements() {
    const bs = this.battleState;
    const config = bs.pendingReinforcementConfig;
    if (!config || !config.units) return;

    for (const ru of config.units) {
      const template = ENEMIES[ru.enemyId];
      if (!template) continue;
      const cls = CLASSES[template.classId];

      const newUnit = {
        id: ru.instanceId,
        name: template.name,
        faction: 'enemy',
        x: ru.x,
        y: ru.y,
        level: template.level,
        classId: template.classId,
        equippedWeapon: template.equippedWeapon,
        walkSprite: template.walkSprite,
        portrait: `assets/portraits/${template.id}_default.png`,
        facing: 'left',
        ai: template.ai,
        drops: template.drops,
        stats: {
          maxHp: cls.base.hp,
          str: cls.base.str,
          mag: cls.base.mag,
          skl: cls.base.skl,
          spd: cls.base.spd,
          luk: cls.base.luk,
          def: cls.base.def,
          res: cls.base.res,
          mov: cls.base.mov
        },
        currentHp: cls.base.hp,
        isAlive: true,
        hasActed: false,
        animOffsetX: 0,
        animOffsetY: 0,
        isFlashing: false
      };
      bs.units.push(newUnit);
      this.addFloatingText('援军!', ru.x, ru.y, '#ef4444');
    }

    // 援军提示横幅
    bs.reinforcementNotice = {
      text: config.bannerText || '敌方援军出现!',
      startTime: Date.now(),
      duration: 1800
    };

    if (config.sfx) sound.playSfx(config.sfx);

    // 从 pendingReinforcements 队列移除
    bs.pendingReinforcements = bs.pendingReinforcements.filter(r => r !== config);

    // 关键重置：援军登场后重置玩家行动，交还玩家回合开展第二阶段战斗
    bs.units.forEach(u => {
      if (u.faction === 'player') u.hasActed = false;
    });
    bs.phase = 'PLAYER_PHASE';
    this.showPhaseBanner('PLAYER_PHASE', bs.turn);
  }

  enterEpilogueScreen() {
    this.stage = 'STAGE_EPILOGUE';
    this.topBar.style.display = 'none';
    this.canvas.width = 960;
    this.canvas.height = 540;
    this.epilogueScreen.show(this.selectedRoute);
  }

  enterBattleMap(chapterData, nextStoryScene) {
    this.stage = 'STAGE_BATTLE';
    this.topBar.style.display = 'flex';
    this.nextStorySceneOnWin = nextStoryScene;

    // ★ 战斗画面统一为 960×540 设计分辨率，与标题/对话/结算画面一致
    // renderer.resize 不再设置 canvas 尺寸，只更新内部地图偏移
    this.canvas.width = 960;
    this.canvas.height = 540;

    this.chapterTitleEl.textContent = chapterData.name;
    this.initBattle(chapterData);

    sound.playBgm('bgm_battle_normal');
    sound.playSfx('sfx_confirm');
  }

  initBattle(chapter) {
    this.battleState.chapter = chapter;
    this.battleState.gridSystem = new GridSystem(chapter);
    const mapW = chapter.mapWidth || chapter.width || 12;
    const mapH = chapter.mapHeight || chapter.height || 9;
    this.renderer.resize(mapW, mapH);

    const units = [];

    const playerTpl = UNITS[this.activePlayerUnitId];
    const pCls = CLASSES[playerTpl.classId];
    const deployPos = chapter.playerDeploy[0] || { x: 2, y: 4 };

    units.push({
      id: playerTpl.id,
      name: playerTpl.name,
      faction: 'player',
      x: deployPos.x,
      y: deployPos.y,
      level: playerTpl.level,
      exp: playerTpl.exp,
      classId: playerTpl.classId,
      equippedWeapon: playerTpl.equippedWeapon,
      walkSprite: playerTpl.walkSprite,
      inventory: JSON.parse(JSON.stringify(playerTpl.inventory || [])),
      portrait: `assets/portraits/${playerTpl.id}_default.png`,
      facing: 'right',
      stats: {
        maxHp: pCls.base.hp,
        str: pCls.base.str,
        mag: pCls.base.mag,
        skl: pCls.base.skl,
        spd: pCls.base.spd,
        luk: pCls.base.luk,
        def: pCls.base.def,
        res: pCls.base.res,
        mov: pCls.base.mov
      },
      currentHp: pCls.base.hp,
      isAlive: true,
      hasActed: false,
      animOffsetX: 0,
      animOffsetY: 0,
      isFlashing: false
    });

    for (const e of chapter.enemyDeploy) {
      const template = ENEMIES[e.enemyId];
      const cls = CLASSES[template.classId];
      units.push({
        id: e.instanceId,
        name: template.name,
        faction: 'enemy',
        x: e.x,
        y: e.y,
        level: template.level,
        classId: template.classId,
        equippedWeapon: template.equippedWeapon,
        walkSprite: template.walkSprite,
        portrait: `assets/portraits/${template.id}_default.png`,
        facing: 'left',
        ai: template.ai,
        drops: template.drops,
        stats: {
          maxHp: cls.base.hp,
          str: cls.base.str,
          mag: cls.base.mag,
          skl: cls.base.skl,
          spd: cls.base.spd,
          luk: cls.base.luk,
          def: cls.base.def,
          res: cls.base.res,
          mov: cls.base.mov
        },
        currentHp: cls.base.hp,
        isAlive: true,
        hasActed: false,
        animOffsetX: 0,
        animOffsetY: 0,
        isFlashing: false
      });
    }

    this.battleState.units = units;
    this.battleState.turn = 1;
    this.battleState.phase = 'PLAYER_PHASE';
    this.battleState.mode = 'IDLE';
    this.battleState.selectedUnit = null;
    this.battleState.originalPos = null;
    this.battleState.reachableTiles = [];
    this.battleState.attackableTiles = [];
    this.battleState.currentPath = [];
    this.battleState.actionMenu = null;
    this.battleState.battlePreview = null;
    this.battleState.isAnimatingCombat = false;
    this.battleState.cursor = { x: deployPos.x, y: deployPos.y };

    // ★ 关键重置：清空上一场战斗残留的胜利/战利品模态框状态
    // (否则第二场战斗 checkBattleEnd 会因 victoryModalShown 残留而永不弹窗，回合无限空转)
    this.battleState.victoryModal = null;
    this.battleState.victoryModalShown = false;
    this.battleState.itemRewardModal = null;
    this.battleState.phaseBanner = null;
    this.battleState.reinforcementNotice = null;

    // 初始化援军配置
    this.battleState.pendingReinforcements = (chapter.reinforcements || []).slice();
    this.battleState.triggeredReinforcementTurns = new Set();

    // 初始化回合阶段横幅：第1回合 PLAYER_PHASE 开场展示 (包含一级【第1回合】)
    this.showPhaseBanner('PLAYER_PHASE', 1, true);

    this.updateHUD();
  }

  updateHUD() {
    this.turnCountEl.textContent = this.battleState.turn;
    if (this.battleState.phase === 'PLAYER_PHASE') {
      this.phaseIndicatorEl.textContent = '我方回合';
      this.phaseIndicatorEl.className = 'badge badge-player';
    } else {
      this.phaseIndicatorEl.textContent = '敌方回合';
      this.phaseIndicatorEl.className = 'badge badge-enemy';
    }
  }

  addFloatingText(text, x, y, color = '#facc15') {
    this.battleState.floatingTexts.push({
      text,
      x: x * this.tileSize + this.tileSize / 2,
      y: y * this.tileSize + this.tileSize / 2,
      color,
      startTime: Date.now(),
      duration: 1200
    });
  }

  // 头像受击高频震动 (Screen / Sprite Shake)
  shakeUnit(unit, intensity = 5, duration = 200) {
    const startTime = performance.now();
    unit.isFlashing = true;

    const doShake = () => {
      const elapsed = performance.now() - startTime;
      if (elapsed < duration) {
        const factor = 1 - (elapsed / duration);
        unit.animOffsetX = (Math.random() - 0.5) * intensity * 2 * factor;
        unit.animOffsetY = (Math.random() - 0.5) * intensity * 2 * factor;
        requestAnimationFrame(doShake);
      } else {
        unit.animOffsetX = 0;
        unit.animOffsetY = 0;
        unit.isFlashing = false;
      }
    };
    requestAnimationFrame(doShake);
  }

  // 攻击方突进位移冲撞动画
  lungeUnit(attacker, target, distance = 8, duration = 160) {
    return new Promise(resolve => {
      const dx = Math.sign(target.x - attacker.x);
      const dy = Math.sign(target.y - attacker.y);
      const startTime = performance.now();

      const doLunge = () => {
        const elapsed = performance.now() - startTime;
        if (elapsed < duration) {
          const progress = elapsed / duration;
          // 先出后收的位移曲线
          const offset = Math.sin(progress * Math.PI) * distance;
          attacker.animOffsetX = dx * offset;
          attacker.animOffsetY = dy * offset;
          requestAnimationFrame(doLunge);
        } else {
          attacker.animOffsetX = 0;
          attacker.animOffsetY = 0;
          resolve();
        }
      };
      requestAnimationFrame(doLunge);
    });
  }

  bindEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      if (this.battleState.isAnimatingCombat) return;

      const rect = this.canvas.getBoundingClientRect();
      const scaleX = rect.width ? (this.canvas.width / rect.width) : 1;
      const scaleY = rect.height ? (this.canvas.height / rect.height) : 1;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      if (this.stage === 'STAGE_TITLE') {
        this.titleScreen.handleMouseMove(mouseX, mouseY);
        return;
      }

      if (this.stage === 'STAGE_EPILOGUE') {
        this.epilogueScreen.handleMouseMove(mouseX, mouseY);
        return;
      }

      if (this.stage === 'STAGE_STORY') return;

      if (this.battleState.mode === 'ACTION_MENU') {
        const mRect = this.renderer.getActionMenuRect(this.battleState);
        if (mRect) {
          if (
            mouseX >= mRect.x && mouseX <= mRect.x + mRect.w &&
            mouseY >= mRect.y + 6 && mouseY <= mRect.y + mRect.h - 6
          ) {
            const hoverIndex = Math.floor((mouseY - (mRect.y + 6)) / mRect.itemH);
            if (
              hoverIndex >= 0 &&
              hoverIndex < this.battleState.actionMenu.items.length &&
              this.battleState.actionMenu.selectedIndex !== hoverIndex
            ) {
              this.battleState.actionMenu.selectedIndex = hoverIndex;
              sound.playSfx('sfx_cursor');
            }
          }
        }
        return;
      }

      if (this.battleState.mode === 'ITEM_MENU') {
        const iRect = this.renderer.getItemMenuRect(this.battleState);
        if (iRect) {
          if (
            mouseX >= iRect.x && mouseX <= iRect.x + iRect.w &&
            mouseY >= iRect.y + 24 && mouseY <= iRect.y + iRect.h - 6
          ) {
            const hoverIndex = Math.floor((mouseY - (iRect.y + 24)) / iRect.itemH);
            const items = this.battleState.selectedUnit.inventory || [];
            if (hoverIndex >= 0 && hoverIndex < items.length && this.battleState.itemMenuIndex !== hoverIndex) {
              this.battleState.itemMenuIndex = hoverIndex;
              sound.playSfx('sfx_cursor');
            }
          }
        }
        return;
      }

      const gx = Math.floor((mouseX - this.renderer.offsetX) / this.tileSize);
      const gy = Math.floor((mouseY - this.renderer.offsetY) / this.tileSize);

      if (this.battleState.gridSystem && this.battleState.gridSystem.isValid(gx, gy)) {
        if (this.battleState.cursor.x !== gx || this.battleState.cursor.y !== gy) {
          this.battleState.cursor.x = gx;
          this.battleState.cursor.y = gy;
          this.onCursorMove();
        }
      }
    });

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (this.stage !== 'STAGE_BATTLE' || this.battleState.isAnimatingCombat) return;

      if (this.battleState.mode === 'ACTION_MENU') {
        const menu = this.battleState.actionMenu;
        if (e.deltaY > 0) {
          menu.selectedIndex = (menu.selectedIndex + 1) % menu.items.length;
        } else {
          menu.selectedIndex = (menu.selectedIndex - 1 + menu.items.length) % menu.items.length;
        }
        sound.playSfx('sfx_cursor');
      } else if (this.battleState.mode === 'ITEM_MENU') {
        const items = this.battleState.selectedUnit.inventory || [];
        if (items.length > 0) {
          if (e.deltaY > 0) {
            this.battleState.itemMenuIndex = (this.battleState.itemMenuIndex + 1) % items.length;
          } else {
            this.battleState.itemMenuIndex = (this.battleState.itemMenuIndex - 1 + items.length) % items.length;
          }
          sound.playSfx('sfx_cursor');
        }
      }
    }, { passive: false });

    this.canvas.addEventListener('click', (e) => {
      sound.unlock();
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = rect.width ? (this.canvas.width / rect.width) : 1;
      const scaleY = rect.height ? (this.canvas.height / rect.height) : 1;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      // ★ 胜利结算模态框组件捕获
      if (this.battleState.victoryModal) {
        this.battleState.victoryModal.handleClick(clickX, clickY);
        return;
      }

      // ★ 战利品弹窗组件捕获
      if (this.battleState.itemRewardModal) {
        this.battleState.itemRewardModal.handleClick(clickX, clickY);
        return;
      }

      // ★ isAnimatingCombat 锁只在战斗地图阶段生效
      // 中段剧情 (STAGE_STORY) 阶段必须放行，否则商贩被击败后切到 scene_punk_intro
      // 用户按键/点击推进对话会被锁拦截，导致"卡住不动"
      if (this.stage === 'STAGE_BATTLE' && this.battleState.isAnimatingCombat) return;

      if (this.stage === 'STAGE_TITLE') {
        this.titleScreen.handleClick(clickX, clickY);
        return;
      }

      if (this.stage === 'STAGE_EPILOGUE') {
        this.epilogueScreen.handleClick(clickX, clickY);
        return;
      }

      if (this.stage === 'STAGE_STORY') {
        if (this.dialogueSystem.showingChoice && this.dialogueSystem.choiceButtonRect) {
          const btn = this.dialogueSystem.choiceButtonRect;
          if (
            clickX >= btn.x && clickX <= btn.x + btn.w &&
            clickY >= btn.y && clickY <= btn.y + btn.h
          ) {
            sound.playSfx('sfx_confirm');
            this.dialogueSystem.next();
            return;
          }
        }
        this.dialogueSystem.next();
        return;
      }

      this.handleBattleConfirm(clickX, clickY);
    });

    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (this.stage === 'STAGE_BATTLE' && !this.battleState.isAnimatingCombat) {
        this.handleBattleCancel();
      }
    });

    window.addEventListener('keydown', (e) => {
      sound.unlock();

      // ★ 胜利结算模态框按键捕获 (回车/空格/Esc)
      if (this.battleState.victoryModal) {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
          this.battleState.victoryModal.handleKeyDown(e);
        }
        return;
      }

      // ★ 战利品弹窗期间无视输入锁，按空格/回车/ESC 关闭弹窗
      if (this.battleState.itemRewardModal) {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
          this.battleState.itemRewardModal.handleKeyDown(e);
        }
        return;
      }

      // ★ isAnimatingCombat 锁只在战斗地图阶段生效
      // 中段剧情 (STAGE_STORY) 阶段必须放行，否则商贩被击败后切到 scene_punk_intro
      // 用户按键推进对话会被锁拦截，导致"卡住不动"
      if (this.stage === 'STAGE_BATTLE' && this.battleState.isAnimatingCombat) return;

      if (this.stage === 'STAGE_TITLE') {
        if (this.titleScreen.handleKeyDown) {
          this.titleScreen.handleKeyDown(e);
        }
        return;
      }

      if (this.stage === 'STAGE_EPILOGUE') {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
          sound.playSfx('sfx_confirm');
          this.enterTitleScreen();
        }
        return;
      }

      if (this.stage === 'STAGE_STORY') {
        if (e.key === ' ' || e.key === 'Enter') {
          this.dialogueSystem.next();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (this.battleState.mode === 'ACTION_MENU') {
            const m = this.battleState.actionMenu;
            m.selectedIndex = (m.selectedIndex - 1 + m.items.length) % m.items.length;
            sound.playSfx('sfx_cursor');
          } else {
            this.moveCursor(0, -1);
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (this.battleState.mode === 'ACTION_MENU') {
            const m = this.battleState.actionMenu;
            m.selectedIndex = (m.selectedIndex + 1) % m.items.length;
            sound.playSfx('sfx_cursor');
          } else {
            this.moveCursor(0, 1);
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          this.moveCursor(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          this.moveCursor(1, 0);
          break;
        case 'Enter':
        case ' ':
          this.handleBattleConfirm();
          break;
        case 'Escape':
        case 'Backspace':
          this.handleBattleCancel();
          break;
      }
    });
  }

  moveCursor(dx, dy) {
    const nx = this.battleState.cursor.x + dx;
    const ny = this.battleState.cursor.y + dy;
    if (this.battleState.gridSystem.isValid(nx, ny)) {
      this.battleState.cursor.x = nx;
      this.battleState.cursor.y = ny;
      sound.playSfx('sfx_cursor');
      this.onCursorMove();
    }
  }

  onCursorMove() {
    if (this.battleState.mode === 'UNIT_SELECTED') {
      const u = this.battleState.selectedUnit;
      const isReachable = this.battleState.reachableTiles.some(
        t => t.x === this.battleState.cursor.x && t.y === this.battleState.cursor.y
      );
      if (isReachable) {
        this.battleState.currentPath = this.battleState.gridSystem.findPath(
          u.x,
          u.y,
          this.battleState.cursor.x,
          this.battleState.cursor.y,
          u.faction,
          this.battleState.units
        );
      } else {
        this.battleState.currentPath = [];
      }
    }
  }

  handleBattleConfirm(clickX, clickY) {
    const bs = this.battleState;

    if (bs.mode === 'IDLE') {
      const unit = bs.units.find(
        u => u.isAlive && u.x === bs.cursor.x && u.y === bs.cursor.y
      );

      if (unit && unit.faction === 'player' && !unit.hasActed) {
        bs.selectedUnit = unit;
        bs.originalPos = { x: unit.x, y: unit.y };
        bs.reachableTiles = bs.gridSystem.getReachableTiles(
          unit.x,
          unit.y,
          unit.stats.mov,
          unit.faction,
          bs.units
        );
        bs.mode = 'UNIT_SELECTED';
        sound.playSfx('sfx_confirm');
      }
      return;
    }

    if (bs.mode === 'UNIT_SELECTED') {
      const isValidTile = bs.reachableTiles.some(
        t => t.x === bs.cursor.x && t.y === bs.cursor.y
      );

      if (isValidTile) {
        const u = bs.selectedUnit;
        const oldX = u.x;
        const oldY = u.y;
        u.x = bs.cursor.x;
        u.y = bs.cursor.y;
        // 根据移动方向更新 facing
        const dx = u.x - oldX;
        const dy = u.y - oldY;
        if (Math.abs(dx) >= Math.abs(dy)) {
          if (dx !== 0) u.facing = dx > 0 ? 'right' : 'left';
        } else {
          u.facing = dy > 0 ? 'down' : 'up';
        }
        bs.reachableTiles = [];
        bs.currentPath = [];

        sound.playSfx('sfx_step');
        this.openActionMenu();
      } else {
        this.handleBattleCancel();
      }
      return;
    }

    if (bs.mode === 'ACTION_MENU') {
      const mRect = this.renderer.getActionMenuRect(bs);
      if (clickX !== undefined && mRect) {
        const insideMenu = (
          clickX >= mRect.x && clickX <= mRect.x + mRect.w &&
          clickY >= mRect.y && clickY <= mRect.y + mRect.h
        );
        if (!insideMenu) {
          this.handleBattleCancel();
          return;
        }
      }

      const curItem = bs.actionMenu.items[bs.actionMenu.selectedIndex];
      if (curItem.id === 'attack') {
        this.enterTargetSelect();
      } else if (curItem.id === 'item') {
        bs.mode = 'ITEM_MENU';
        bs.itemMenuIndex = 0;
        sound.playSfx('sfx_menu_open');
      } else if (curItem.id === 'wait') {
        this.endUnitTurn();
      }
      return;
    }

    if (bs.mode === 'ITEM_MENU') {
      const u = bs.selectedUnit;
      const itemEntry = u.inventory[bs.itemMenuIndex];
      if (itemEntry) {
        const res = CombatSystem.useItem(u, itemEntry.id);
        if (res.success) {
          sound.playSfx('sfx_item_use');
          this.addFloatingText(res.msg, u.x, u.y, '#4ade80');
          this.endUnitTurn();
        } else {
          sound.playSfx('sfx_cancel');
        }
      }
      return;
    }

    if (bs.mode === 'TARGET_SELECT') {
      const target = bs.targetEnemies[bs.targetIndex];
      if (target) {
        this.executeCombatSequence(bs.selectedUnit, target);
      }
      return;
    }
  }

  handleBattleCancel() {
    const bs = this.battleState;

    if (bs.mode === 'UNIT_SELECTED') {
      bs.selectedUnit = null;
      bs.originalPos = null;
      bs.reachableTiles = [];
      bs.currentPath = [];
      bs.mode = 'IDLE';
      sound.playSfx('sfx_cancel');
      return;
    }

    if (bs.mode === 'ACTION_MENU') {
      const u = bs.selectedUnit;
      if (bs.originalPos) {
        u.x = bs.originalPos.x;
        u.y = bs.originalPos.y;
        bs.cursor.x = u.x;
        bs.cursor.y = u.y;
      }

      bs.reachableTiles = bs.gridSystem.getReachableTiles(
        u.x,
        u.y,
        u.stats.mov,
        u.faction,
        bs.units
      );
      bs.actionMenu = null;
      bs.mode = 'UNIT_SELECTED';
      sound.playSfx('sfx_cancel');
      return;
    }

    if (bs.mode === 'ITEM_MENU' || bs.mode === 'TARGET_SELECT') {
      bs.battlePreview = null;
      bs.attackableTiles = [];
      bs.mode = 'ACTION_MENU';
      sound.playSfx('sfx_cancel');
      return;
    }
  }

  openActionMenu() {
    const u = this.battleState.selectedUnit;
    const weapon = WEAPONS[u.equippedWeapon] || WEAPONS.pencil;

    const atkRangeTiles = this.battleState.gridSystem.getAttackableTiles(
      u.x,
      u.y,
      weapon.range[0],
      weapon.range[1]
    );

    const enemiesInRange = this.battleState.units.filter(
      enemy => enemy.isAlive && enemy.faction === 'enemy' && atkRangeTiles.some(t => t.x === enemy.x && t.y === enemy.y)
    );

    const hasItems = u.inventory && u.inventory.length > 0;

    const items = [];
    if (enemiesInRange.length > 0) {
      items.push({ id: 'attack', label: '攻击', enabled: true });
    }
    if (hasItems) {
      items.push({ id: 'item', label: '道具', enabled: true });
    }
    items.push({ id: 'wait', label: '待机', enabled: true });

    this.battleState.actionMenu = {
      items,
      selectedIndex: 0
    };
    this.battleState.mode = 'ACTION_MENU';
    sound.playSfx('sfx_menu_open');
  }

  enterTargetSelect() {
    const u = this.battleState.selectedUnit;
    const weapon = WEAPONS[u.equippedWeapon] || WEAPONS.pencil;
    const atkRangeTiles = this.battleState.gridSystem.getAttackableTiles(
      u.x,
      u.y,
      weapon.range[0],
      weapon.range[1]
    );

    this.battleState.attackableTiles = atkRangeTiles;
    this.battleState.targetEnemies = this.battleState.units.filter(
      enemy => enemy.isAlive && enemy.faction === 'enemy' && atkRangeTiles.some(t => t.x === enemy.x && t.y === enemy.y)
    );

    if (this.battleState.targetEnemies.length > 0) {
      this.battleState.targetIndex = 0;
      this.updateBattlePreview();
      this.battleState.mode = 'TARGET_SELECT';
      sound.playSfx('sfx_confirm');
    }
  }

  updateBattlePreview() {
    const attacker = this.battleState.selectedUnit;
    const defender = this.battleState.targetEnemies[this.battleState.targetIndex];
    if (defender) {
      this.battleState.cursor.x = defender.x;
      this.battleState.cursor.y = defender.y;
      this.battleState.battlePreview = CombatSystem.predictBattle(
        attacker,
        defender,
        this.battleState.gridSystem.getTerrain(attacker.x, attacker.y),
        this.battleState.gridSystem.getTerrain(defender.x, defender.y)
      );
    }
  }

  /**
   * 核心重构：分步攻击、反击与追击动画序列（每击精准同步头像震颤与扣血）
   */
  async executeCombatSequence(attacker, defender) {
    this.battleState.isAnimatingCombat = true;
    this.battleState.battlePreview = null;
    this.battleState.attackableTiles = [];

    // 攻击发起前根据目标位置更新朝向
    if (attacker.faction === 'player') {
      const dx = defender.x - attacker.x;
      const dy = defender.y - attacker.y;
      if (Math.abs(dx) >= Math.abs(dy)) {
        if (dx !== 0) attacker.facing = dx > 0 ? 'right' : 'left';
      } else {
        attacker.facing = dy > 0 ? 'down' : 'up';
      }
    }

    const preview = CombatSystem.predictBattle(
      attacker,
      defender,
      this.battleState.gridSystem.getTerrain(attacker.x, attacker.y),
      this.battleState.gridSystem.getTerrain(defender.x, defender.y)
    );

    // 单步击打函数：执行单次命中/未命中判定，并立即同步震动与血量
    const playSingleStrike = async (src, dst, statPred, strikeLabel) => {
      // 1. 攻击者突进冲撞
      await this.lungeUnit(src, dst, 8, 140);

      // 2. 计算命中与伤害
      const isHit = (Math.random() * 100) < statPred.hit;
      if (isHit) {
        const isCrit = (Math.random() * 100) < statPred.crit;
        const damage = isCrit ? statPred.damage * 3 : statPred.damage;

        // 真实且同步扣减血量！
        dst.currentHp = Math.max(0, dst.currentHp - damage);

        // 播放打击音效与受击高频剧烈抖动
        sound.playSfx(isCrit ? 'sfx_hit_crit' : 'sfx_hit_normal');
        this.shakeUnit(dst, isCrit ? 8 : 5, isCrit ? 280 : 200);

        const label = strikeLabel ? `【${strikeLabel}】` : '';
        this.addFloatingText(
          `${label}${isCrit ? '暴击! ' : ''}-${damage}`,
          dst.x,
          dst.y,
          isCrit ? '#ef4444' : '#facc15'
        );
      } else {
        // 落空 MISS
        sound.playSfx('sfx_miss');
        this.shakeUnit(dst, 2, 100); // 轻微躲闪
        this.addFloatingText(
          `${strikeLabel ? `【${strikeLabel}】` : ''}MISS`,
          dst.x,
          dst.y,
          '#94a3b8'
        );
      }

      // 等待 380ms 停顿观察，让玩家看清每次血条变化
      await new Promise(r => setTimeout(r, 380));
    };

    // 1. 攻方先手攻击
    await playSingleStrike(attacker, defender, preview.attacker, '先手');

    // 2. 守方防守反击 (前提：守方存活且射程允许)
    if (defender.currentHp > 0 && preview.defender.canCounter) {
      await playSingleStrike(defender, attacker, preview.defender, '反击');
    }

    // 3. 攻方二次追击 (前提：双方均存活且攻速差 >= 5)
    if (attacker.currentHp > 0 && defender.currentHp > 0 && preview.attacker.isDouble) {
      await playSingleStrike(attacker, defender, preview.attacker, '追击');
    }

    // 4. 守方二次追击 (若守方攻速优势极大且均存活)
    if (attacker.currentHp > 0 && defender.currentHp > 0 && preview.defender.isDouble) {
      await playSingleStrike(defender, attacker, preview.defender, '反击追击');
    }

    // 5. 存活判定与结算
    if (attacker.currentHp <= 0) attacker.isAlive = false;
    if (defender.currentHp <= 0) defender.isAlive = false;

    // ★ 统一击杀结算：本次交战中阵亡的敌方单位，无论它是守方（被我方主动攻击击杀）
    //   还是攻方（敌方回合扑向我方时被我方反击击杀），都必须一致地结算经验、掉落与弹窗。
    //   修复 Bug：旧代码只检查 defender 位 —— 敌方作为攻方被反击击杀时（典型如男主线
    //   混混战：张子骁首击 11 伤打不死 14 HP 混混，残血 3 HP 混混在敌方回合扑上来被我方
    //   11 伤反击击杀），零经验、零掉落、零弹窗；而石予诺双击 9×2 在自己回合以守方位
    //   阵亡，正常弹窗 —— 两条线由此产生 UI 不一致。
    const slainUnit = !defender.isAlive ? defender : (!attacker.isAlive ? attacker : null);
    const playerSide = (attacker.faction === 'player')
      ? attacker
      : (defender.faction === 'player' ? defender : null);

    // 经验与升级（我方单位参与本次交战时）
    if (playerSide) {
      // 击杀经验：阵亡者为敌方（含反击击杀）；我方主动攻击未击杀保留参与经验 12
      let expGained = 0;
      if (slainUnit && slainUnit.faction === 'enemy') {
        expGained = 35;
      } else if (attacker === playerSide) {
        expGained = 12;
      }
      if (expGained > 0) {
        playerSide.exp += expGained;
        if (playerSide.exp >= 100) {
          playerSide.exp -= 100;
          playerSide.level += 1;
          sound.playSfx('sfx_level_up');
          this.addFloatingText('LEVEL UP! 等级提升!', playerSide.x, playerSide.y, '#f59e0b');
          await new Promise(r => setTimeout(r, 350));
        }
      }
    }

    // 掉落结算 (真正弹出获得道具模态框) —— 以"阵亡者"为准，不再只看守方
    if (slainUnit && slainUnit.faction === 'enemy' && slainUnit.drops && slainUnit.drops.length > 0) {
      for (const drop of slainUnit.drops) {
        if (Math.random() <= drop.chance) {
          const itm = ITEMS[drop.itemId] || { name: drop.itemId, desc: '战利品道具。' };
          const iconPath = `assets/items/${drop.itemId}.png`;
          sound.playSfx('sfx_item_get');

          // 将道具收入玩家背包（playerSide：本次交战中的我方单位，反击击杀同样能拾取）
          if (playerSide && playerSide.inventory) {
            const exist = playerSide.inventory.find(i => i.id === drop.itemId);
            if (exist) exist.count += 1;
            else playerSide.inventory.push({ id: drop.itemId, count: 1 });
          }

          // 弹出真正的战利品弹窗组件，等待玩家确认后继续
          await new Promise((resolve) => {
            this.battleState.itemRewardModal = new ItemModal(
              this.canvas,
              {
                enemyName: slainUnit.name,
                itemName: itm.name,
                desc: itm.desc,
                icon: iconPath
              },
              () => {
                this.battleState.itemRewardModal = null;
                resolve();
              }
            );
          });
        }
      }
    }

    this.battleState.isAnimatingCombat = false;

    // ★ 战斗结束检查前置：敌方全灭时立即弹胜利结算并 return，
    //   绝不触发 endUnitTurn / startEnemyPhase，避免回合空转
    this.checkBattleEnd();
    if (this.battleState.victoryModal || this.battleState.victoryModalShown) {
      return;
    }

    // 仅玩家单位攻击结束后才结束该单位的回合；敌方单位由敌方阶段循环自行调度
    if (attacker.faction === 'player') {
      this.endUnitTurn();
    }
  }

  endUnitTurn() {
    // ★ 防御：胜利结算已弹出时不再进入任何回合流转
    if (this.battleState.victoryModal || this.battleState.victoryModalShown) return;

    if (this.battleState.selectedUnit) {
      this.battleState.selectedUnit.hasActed = true;
    }
    this.battleState.selectedUnit = null;
    this.battleState.originalPos = null;
    this.battleState.reachableTiles = [];
    this.battleState.attackableTiles = [];
    this.battleState.currentPath = [];
    this.battleState.actionMenu = null;
    this.battleState.battlePreview = null;
    this.battleState.mode = 'IDLE';

    sound.playSfx('sfx_confirm');

    const playerUnits = this.battleState.units.filter(u => u.isAlive && u.faction === 'player');
    const allActed = playerUnits.every(u => u.hasActed);

    if (allActed) {
      this.startEnemyPhase();
    }
  }

  startEnemyPhase() {
    this.battleState.phase = 'ENEMY_PHASE';
    this.battleState.isAnimatingCombat = true; // 锁定玩家操作
    this.updateHUD();

    // 显示敌方回合横幅 (只出二级标题【敌方行动】)
    this.showPhaseBanner('ENEMY_PHASE', this.battleState.turn, false);

    const enemyUnits = this.battleState.units.filter(u => u.isAlive && u.faction === 'enemy');
    const playerUnits = this.battleState.units.filter(u => u.isAlive && u.faction === 'player');

    // 横幅展示 950ms 后再开始敌人行动
    let sequence = new Promise(resolve => setTimeout(resolve, 950));

    enemyUnits.forEach(enemy => {
      sequence = sequence.then(() => {
        return new Promise(async (resolve) => {
          // ★ 胜利/失败结算已弹出：中止剩余敌方行动
          if (this.battleState.victoryModal || this.battleState.victoryModalShown) return resolve();
          if (this.stage !== 'STAGE_BATTLE') return resolve();
          if (!enemy.isAlive) return resolve();

          const decision = EnemyAI.decide(
            enemy,
            playerUnits,
            this.battleState.gridSystem,
            this.battleState.units
          );

          // 光标锁定当前行动敌方
          this.battleState.cursor.x = enemy.x;
          this.battleState.cursor.y = enemy.y;
          this.updateHUD();

          // 移动后更新 facing 朝向最近玩家
          enemy.x = decision.targetTile.x;
          enemy.y = decision.targetTile.y;
          const nearest = EnemyAI.findNearestPlayer(enemy, playerUnits);
          if (nearest) {
            if (Math.abs(nearest.x - enemy.x) >= Math.abs(nearest.y - enemy.y)) {
              enemy.facing = nearest.x > enemy.x ? 'right' : 'left';
            } else {
              enemy.facing = nearest.y > enemy.y ? 'down' : 'up';
            }
          }
          this.battleState.cursor.x = enemy.x;
          this.battleState.cursor.y = enemy.y;

          if (decision.action === 'attack' && decision.attackTarget) {
            const target = decision.attackTarget;
            await this.executeCombatSequence(enemy, target);
            resolve();
          } else {
            // 敌人仅移动时停顿 600ms，让玩家清晰看到敌人的路线与动作
            setTimeout(resolve, 600);
          }
        });
      });
    });

    sequence.then(() => {
      setTimeout(() => {
        // ★ 阶段收尾前再次检查战斗是否已结束，避免胜利后仍切回玩家回合
        if (this.battleState.victoryModal || this.battleState.victoryModalShown) return;
        if (this.stage !== 'STAGE_BATTLE') return;
        this.battleState.isAnimatingCombat = false;
        this.startPlayerPhase();
      }, 400);
    });
  }

  startPlayerPhase(isTurnIncrement = true) {
    if (isTurnIncrement) {
      this.battleState.turn += 1;
    }
    this.battleState.phase = 'PLAYER_PHASE';

    this.battleState.units.forEach(u => {
      u.hasActed = false;
      if (u.tempBuffs && u.tempBuffs.spd) {
        u.stats.spd -= u.tempBuffs.spd;
        u.tempBuffs.spd = 0;
      }
    });

    // 显示我方回合横幅 (若包含回合增加，先出一级【第 X 回合】，再出二级【我方行动】)
    this.showPhaseBanner('PLAYER_PHASE', this.battleState.turn, isTurnIncrement);

    this.updateHUD();
    this.checkBattleEnd();
  }

  /**
   * 显示全屏回合阶段横幅 (支持一级/二级两段式呈现)
   */
  showPhaseBanner(phase, turn, showTurn = false) {
    const text = phase === 'PLAYER_PHASE' ? '我方行动' : '敌方行动';
    const duration = (showTurn ? 750 : 0) + 850 + 100;
    this.battleState.phaseBanner = {
      phase,
      turn,
      text,
      showTurn,
      duration,
      startTime: Date.now()
    };
  }

  /**
   * 兼容旧接口：基于回合数触发援军 (本期不再使用，改为 on_enemy_defeated 触发)
   * 保留方法签名避免调用方报错
   */
  checkReinforcements() {
    // 本期所有援军通过 on_enemy_defeated + 中段剧情场景触发，不再使用回合数判断
  }

  checkBattleEnd() {
    const bs = this.battleState;
    if (bs.victoryModalShown) return;

    const aliveEnemies = bs.units.filter(u => u.isAlive && u.faction === 'enemy');
    const alivePlayers = bs.units.filter(u => u.isAlive && u.faction === 'player');

    if (aliveEnemies.length === 0) {
      bs.victoryModalShown = true;
      const enemyUnit = bs.units.find(u => u.faction === 'enemy');
      const enemyName = enemyUnit ? enemyUnit.name : '敌方目标';

      // ★ 战利品文案实时取自敌人掉落表：多个掉落时全列 (顿号分隔)，杜绝硬编码
      let lootName = null;
      if (enemyUnit && enemyUnit.drops && enemyUnit.drops.length > 0) {
        lootName = enemyUnit.drops
          .map(d => (ITEMS[d.itemId] ? ITEMS[d.itemId].name : d.itemId))
          .join('、');
      }

      // 弹出胜利结算面板组件 VictoryModal
      bs.victoryModal = new VictoryModal(
        this.canvas,
        {
          turns: bs.turn,
          objectiveText: bs.chapter.objective ? bs.chapter.objective.text : '击败目标敌方单位',
          enemyName: enemyName,
          lootName: lootName,
          buttonText: '▶ 确认并继续剧情'
        },
        () => {
          bs.victoryModal = null;
          if (this.nextStorySceneOnWin) {
            this.startStoryScene(this.nextStorySceneOnWin);
          } else {
            this.enterTitleScreen();
          }
        }
      );
    } else if (alivePlayers.length === 0) {
      sound.playSfx('sfx_shock_sting');
      setTimeout(() => {
        alert('战斗失利，退回校内！');
        this.enterTitleScreen();
      }, 500);
    }
  }

  loop() {
    if (this.stage === 'STAGE_TITLE') {
      this.titleScreen.render();
    } else if (this.stage === 'STAGE_STORY') {
      this.dialogueSystem.render();
    } else if (this.stage === 'STAGE_EPILOGUE') {
      this.epilogueScreen.render();
    } else {
      // 清理过期阶段横幅
      if (this.battleState.phaseBanner) {
        const elapsed = Date.now() - this.battleState.phaseBanner.startTime;
        if (elapsed > this.battleState.phaseBanner.duration) {
          this.battleState.phaseBanner = null;
        }
      }
      // 清理过期援军提示
      if (this.battleState.reinforcementNotice) {
        const elapsed = Date.now() - this.battleState.reinforcementNotice.startTime;
        if (elapsed > this.battleState.reinforcementNotice.duration) {
          this.battleState.reinforcementNotice = null;
        }
      }
      this.renderer.render(this.battleState);
      // 渲染战利品模态框组件
      if (this.battleState.itemRewardModal && typeof this.battleState.itemRewardModal.render === 'function') {
        this.battleState.itemRewardModal.render();
      }
      // 渲染胜利结算模态框组件
      if (this.battleState.victoryModal && typeof this.battleState.victoryModal.render === 'function') {
        this.battleState.victoryModal.render();
      }
    }
    requestAnimationFrame(() => this.loop());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new GameApp();
});
