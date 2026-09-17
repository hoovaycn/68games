import { GridSystem } from './systems/grid.js';
import { CombatSystem } from './systems/combat.js';
import { EnemyAI } from './systems/ai.js';
import { Renderer } from './ui/renderer.js';
import { DialogueSystem } from './systems/dialogue_system.js';
import { TitleScreen } from './ui/title_screen.js';
import { EpilogueScreen } from './ui/epilogue_screen.js';
import { VictoryModal } from './ui/components/victory_modal.js';
import { GameOverModal } from './ui/components/game_over_modal.js';
import { ItemModal } from './ui/components/item_modal.js';
import { JoinPartyModal } from './ui/components/join_party_modal.js';
import { CombatExchange } from './ui/components/combat_exchange.js';
import { LevelUpModal, snapshotGrowthStats } from './ui/components/level_up.js';
import { ActionMenu, planActionMenuItems } from './ui/components/action_menu.js';
import { TutorialPanelModal } from './ui/components/tutorial_panel.js';
import { UnitDetailModal } from './ui/components/unit_detail.js';
import { InventoryPanelModal } from './ui/components/inventory_panel.js';
import { SaveMenuModal } from './ui/components/save_menu_modal.js';
import { gainExp, expForKill, expForAction, createEnemyUnit } from './systems/growth.js';
import { createStash } from './systems/stash.js';
import { settleLoot, summarizeLoots } from './systems/loot.js';
import {
  createNewGame, getPartyUnit, commitRuntimeUnit,
  advanceTo, markChapterCleared, tickPlaytime, joinParty
} from './systems/game_state.js';
import { createSaveManager } from './systems/save_manager.js';
import { sound } from './engine/sound.js';
import { PROLOGUE_STORY } from './data/story_prologue.js';
import { CHAPTER1_STORY } from './data/story_chapter1.js';
import { CHAPTER2_STORY } from './data/story_chapter2.js';
import { CH0_BATTLE1 } from './data/chapters/ch0_battle1.js';
import { CH0_BATTLE2 } from './data/chapters/ch0_battle2.js';
import { CH0_BATTLE3 } from './data/chapters/ch0_battle3.js';
import { CH1_BATTLE1 } from './data/chapters/ch1_battle1.js';
import { CH2_BATTLE1 } from './data/chapters/ch2_battle1.js';
import { WEAPONS } from './data/weapons.js';
import { UNITS } from './data/units.js';

// 章节注册表：id → 章节配置（加新章节 = 在 src/data/chapters 建文件 + 这里映射一行）
const CHAPTERS = {
  ch0_battle1: CH0_BATTLE1,
  ch0_battle2: CH0_BATTLE2,
  ch0_battle3: CH0_BATTLE3,
  ch1_battle1: CH1_BATTLE1,
  ch2_battle1: CH2_BATTLE1
};

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
    // 游戏进度（gameState = 存档唯一载体）与存档管理器（3+1 槽 localStorage）
    this.gameState = null;
    this.saveManager = createSaveManager();
    this.saveMenuModal = null; // 存档界面模态（标题页「存档管理」/ 剧情内 Esc 呼出）
    this.joinPartyModal = new JoinPartyModal(this.canvas); // 剧情环节新伙伴入队弹窗模态

    // D5 标题主菜单：continue → 读最新档续玩；manage → 存档管理界面
    // （'new' 由 TitleScreen 内部白幕转场处理，不经过这里）
    this.titleScreen = new TitleScreen(
      this.canvas,
      (routeId) => this.onCharacterSelected(routeId),
      (action) => this.handleTitleMenuAction(action)
    );
    this.dialogueSystem = new DialogueSystem(this.canvas, (transition) => this.handleSceneTransition(transition));
    this.epilogueScreen = new EpilogueScreen(this.canvas, () => this.enterTitleScreen());

    this.stage = 'STAGE_TITLE';

    // 章节标题覆盖层（跨标题/剧情/战斗阶段全屏展示，进入章节剧情前显示【序章】等）
    this.chapterBanner = null;       // { label, title, startTime, duration }
    this.chapterBannerOnDone = null; // 章节标题展示结束后的回调（如：真正开始剧情）

    // 游玩时长节流累计：每满一整秒才 tickPlaytime 一次（STATE_SCHEMA playtimeSec）
    this._playtimeAccumMs = 0;
    this._lastLoopTs =
      typeof performance !== 'undefined' ? performance.now() : Date.now();

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
      targetEnemies: [],
      targetIndex: 0,
      battlePreview: null,
      floatingTexts: [],
      itemRewardModal: null, // 战利品掉落弹窗模态框
      combatExchangeModal: null, // 交战演出弹层（HP掉血/反击/经验条时间轴）
      levelUpModal: null, // 升级明细弹层（九维条形增长 + 文字 +1）
      unitDetailModal: null, // 人物详情弹层（行动菜单「详情」项，关闭回菜单）
      inventoryModal: null, // 道具·仓库弹层（行动菜单「道具」项，关闭回菜单）
      tutorialModal: null, // 新手教学弹层（首关 tutorial 配置驱动，开场弹出）
      stash: null, // 全队共享仓库（InventoryPanelModal 双视图的另一侧）
      collectedLoots: [], // 本场战斗实得掉落累计（胜利结算 lootName 用 summarizeLoots 汇总）
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
    // 回标题刷新「继续游戏」可用性（打过一仗 / 删过档 / 导入档都可能变化）
    if (typeof this.titleScreen.setContinueAvailable === 'function') {
      this.titleScreen.setContinueAvailable(this.saveManager.hasAnySave());
    }
  }

  /** T5/D5 标题主菜单分发（TitleScreen onMenuAction 回调入口） */
  handleTitleMenuAction(action) {
    if (action === 'continue') {
      this.loadMostRecentAndResume();
    } else if (action === 'manage') {
      this.openSaveMenu('load');
    }
  }

  /** 「继续游戏」：取所有槽（含自动档）里最新的一档恢复现场 */
  loadMostRecentAndResume() {
    const recent = this.saveManager.mostRecentSave();
    if (!recent || !recent.state) {
      // 兜底：无档时「继续游戏」置灰不可点，万一进来直接给存档界面
      this.openSaveMenu('load');
      return;
    }
    this.gameState = recent.state;
    this.resumeFromGameState();
  }

  /**
   * 打开存档界面模态：
   *  mode 'load' —— 标题页「存档管理」：槽位 [auto,1,2,3]，读档即恢复现场
   *  mode 'save' —— 剧情场景 Esc 呼出：槽位 [1,2,3]，把当前进度写入手动槽
   * 打开期间独占全部输入（bindEvents 三链最前端拦截），关闭后回原场景。
   */
  openSaveMenu(mode) {
    this.saveMenuModal = new SaveMenuModal(this.canvas, {
      mode,
      saveManager: this.saveManager,
      getState: () => this.gameState,
      describeAnchor: (meta) => this.describeSaveAnchor(meta),
      onLoaded: (state) => {
        this.saveMenuModal = null; // 先关面板再切场景，防止旧模态再吃一帧渲染
        this.gameState = state;
        this.resumeFromGameState();
      },
      onSaved: () => {
        // 存入成功只提示不关界面，可继续存其它槽（提示逻辑在组件内部）
      },
      onClosed: () => {
        this.saveMenuModal = null;
        // 删档回标题时同步「继续游戏」可用性（把全部存档删光后应置灰）
        if (this.stage === 'STAGE_TITLE'
            && typeof this.titleScreen.setContinueAvailable === 'function') {
          this.titleScreen.setContinueAvailable(this.saveManager.hasAnySave());
        }
      }
    });
  }

  /** 存档行锚点中文描述：战斗章名 / 剧情场景标题（SaveMenuModal 行内显示） */
  describeSaveAnchor(meta) {
    if (!meta) return '';
    if (meta.chapterId && CHAPTERS[meta.chapterId]) {
      return `战斗 · ${CHAPTERS[meta.chapterId].name}`;
    }
    if (meta.sceneId) {
      const scene = (PROLOGUE_STORY[meta.route] || PROLOGUE_STORY.male)[meta.sceneId];
      if (scene && scene.title) return `剧情 · ${scene.title}`;
    }
    return '';
  }

  onCharacterSelected(routeId) {
    this.selectedRoute = routeId === 'female' ? 'female' : 'male';
    this.activePlayerUnitId = this.selectedRoute === 'male' ? 'zhangzixiao' : 'shiyunuo';
    // 新开局：服务层创建完整游戏进度（roster 档案 / flags / stash / 剧情锚点）
    // 之后所有战斗、剧情、仓库读写都作用在这份 gameState 上
    this.gameState = createNewGame({ route: this.selectedRoute });

    // 进入序章剧情前，先全屏展示【序章】章节标题，展示结束再开始讲故事
    const chapterTitle = PROLOGUE_STORY.chapterTitle || '序章';
    const colon = chapterTitle.indexOf('：');
    const label = colon > 0 ? chapterTitle.slice(0, colon) : chapterTitle;
    const title = colon > 0 ? chapterTitle.slice(colon + 1) : '';
    this.showChapterBanner(label, title, () => {
      this.startStoryScene('scene_classroom');
    });
  }

  /**
   * 显示全屏章节标题覆盖层（进入章节剧情前展示【序章】/【第一章】等），
   * 展示结束后触发 onDone 回调（如：真正开始该章节的第一段剧情）。
   */
  showChapterBanner(label, title, onDone, duration = 2200) {
    this.chapterBanner = {
      label: label || '章节',
      title: title || '',
      startTime: Date.now(),
      duration
    };
    this.chapterBannerOnDone = onDone || null;
  }

  startStoryScene(sceneKey) {
    this.stage = 'STAGE_STORY';
    this.topBar.style.display = 'none';

    this.canvas.width = 960;
    this.canvas.height = 540;

    // A2 锚点推进：进入剧情场景即脱离战斗，读档从此处恢复；随剧情节流自动存档
    // （此时若有战斗结算，roster 已由 checkBattleEnd 的 commit 写回，存档即最新）
    if (this.gameState) {
      advanceTo(this.gameState, { sceneId: sceneKey, chapterId: null });
      this.saveManager.autosave(this.gameState);
    }

    // 动态适配全三章场景：PROLOGUE_STORY / CHAPTER1_STORY / CHAPTER2_STORY
    const routeData = PROLOGUE_STORY[this.selectedRoute] || PROLOGUE_STORY.male;
    let rawSceneData = routeData[sceneKey] || CHAPTER1_STORY[sceneKey] || CHAPTER2_STORY[sceneKey];

    if (rawSceneData) {
      // 深度拷贝并注入男女主专属变量替换（{MC_NAME}, {MC_PORTRAIT}, {ALLY_1_NAME}, {ALLY_2_NAME} 等）
      const isMale = this.selectedRoute === 'male';
      const mcName = isMale ? '张子骁' : '石予诺';
      const mcPortrait = isMale ? 'assets/art/zhangzixiao_default.png' : 'assets/art/shiyunuo_default.png';
      const ally1Name = isMale ? '张瀚瑜' : '陈品璇';
      const ally1Portrait = isMale ? 'assets/art/zhanghanyu_default.png' : 'assets/art/chenpinxuan_default.png';
      const ally2Name = isMale ? '范文默' : '何妍熹';
      const ally2Portrait = isMale ? 'assets/art/fanwenmo_default.png' : 'assets/art/heyanxi_default.png';

      const sceneData = JSON.parse(JSON.stringify(rawSceneData));
      if (Array.isArray(sceneData.dialogues)) {
        sceneData.dialogues.forEach(dlg => {
          if (dlg.speaker === '{MC_NAME}') dlg.speaker = mcName;
          if (dlg.speaker === '{ALLY_1_NAME}') dlg.speaker = ally1Name;
          if (dlg.speaker === '{ALLY_2_NAME}') dlg.speaker = ally2Name;
          if (dlg.leftPortrait === '{MC_PORTRAIT}') dlg.leftPortrait = mcPortrait;
          if (dlg.rightPortrait === '{MC_PORTRAIT}') dlg.rightPortrait = mcPortrait;
          if (dlg.leftPortrait === '{ALLY_1_PORTRAIT}') dlg.leftPortrait = ally1Portrait;
          if (dlg.rightPortrait === '{ALLY_1_PORTRAIT}') dlg.rightPortrait = ally1Portrait;
          if (dlg.leftPortrait === '{ALLY_2_PORTRAIT}') dlg.leftPortrait = ally2Portrait;
          if (dlg.rightPortrait === '{ALLY_2_PORTRAIT}') dlg.rightPortrait = ally2Portrait;
          if (dlg.text) {
            dlg.text = dlg.text.replace(/\{MC_NAME\}/g, mcName)
                               .replace(/\{ALLY_1_NAME\}/g, ally1Name)
                               .replace(/\{ALLY_2_NAME\}/g, ally2Name);
          }
        });
      }
      this.dialogueSystem.startScene(sceneData);
    }
  }

  handleSceneTransition(transition) {
    if (!transition) return;

    // 剧情入队事件拦截：先加入队伍名册，再弹出仪式感入队组件，确认后再推进下一步
    if (transition.type === 'JOIN_PARTY' && transition.unitId) {
      if (this.gameState) {
        joinParty(this.gameState, transition.unitId);
      }
      this.joinPartyModal.show(transition.unitId, () => {
        if (transition.isBattleTrigger || transition.battleId) {
          const bMap = CHAPTERS[transition.battleId] || CH0_BATTLE1;
          this.enterBattleMap(bMap, bMap.nextStorySceneOnWin);
        } else if (transition.targetScene) {
          this.startStoryScene(transition.targetScene);
        } else if (transition.type === 'CHAPTER_CLEAR') {
          this.enterEpilogueScreen();
        }
      });
      return;
    }

    if (transition.isBattleTrigger || transition.battleId) {
      const bMap = CHAPTERS[transition.battleId] || CH0_BATTLE1;
      this.enterBattleMap(bMap, bMap.nextStorySceneOnWin);
    } else if (transition.targetScene) {
      // 跨章节横幅检测：进入第二章或第三章首个场景前弹出全屏章节横幅
      if (transition.targetScene === 'ch1_scene_playground') {
        this.showChapterBanner('第二章', '操场上来的人', () => {
          this.startStoryScene(transition.targetScene);
        });
      } else if (transition.targetScene === 'ch2_scene_auditorium') {
        this.showChapterBanner('第三章', '谁是下一个', () => {
          this.startStoryScene(transition.targetScene);
        });
      } else {
        this.startStoryScene(transition.targetScene);
      }
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
      // 数值工厂统一造敌：肖像/成长/掉落全部来自 ENEMIES 模板，drops 深拷贝可安全 splice
      const newUnit = createEnemyUnit(ru.enemyId, {
        instanceId: ru.instanceId,
        x: ru.x,
        y: ru.y,
        facing: 'left'
      });
      if (!newUnit) continue;
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

    // A3 锚点推进：开战即落盘 —— 战败/中途退出后读档回到本章开头重打（D1 语义）
    if (this.gameState) {
      advanceTo(this.gameState, { chapterId: chapterData.id });
      this.saveManager.autosave(this.gameState);
    }

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
    // 渲染器按战场区可用空间自适应了格子尺寸，main 侧坐标换算同步跟随
    this.tileSize = this.renderer.tileSize;

    const units = [];

    // 出战名单：优先按当前关卡 chapter.playerDeploy 的 unitId 部署；若无指定则按 roster 排布
    const deployedIds = new Set();
    if (Array.isArray(chapter.playerDeploy)) {
      chapter.playerDeploy.forEach((dep, idx) => {
        let uId = dep.unitId;
        // 动态适配主角与特定线
        if (uId === 'zhangzixiao' && this.selectedRoute === 'female') {
          uId = 'shiyunuo';
        } else if (uId === 'zhanghanyu' && this.selectedRoute === 'female') {
          uId = 'chenpinxuan';
        } else if (uId === 'fanwenmo' && this.selectedRoute === 'female') {
          uId = 'heyanxi';
        }

        let unit = getPartyUnit(this.gameState, uId);
        // 若该剧情关卡有特定角色临时助阵但尚未正式永久入队（如徐老师在第二章操场前排助阵），自动按 UNITS 临时入编
        if (!unit && UNITS[uId]) {
          joinParty(this.gameState, uId);
          unit = getPartyUnit(this.gameState, uId);
        }
        if (unit) {
          unit.x = dep.x;
          unit.y = dep.y;
          unit.facing = 'right';
          units.push(unit);
          deployedIds.add(uId);
        }
      });
    }

    // 兜底：若 roster 中有其他角色且 deploy 还有空余位置，依次补足
    const maxDeploy = (chapter.playerDeploy && chapter.playerDeploy.length) || 1;
    if (units.length < maxDeploy) {
      Object.keys(this.gameState.roster).forEach((unitId) => {
        if (deployedIds.has(unitId) || units.length >= maxDeploy) return;
        const pos = chapter.playerDeploy[units.length] || { x: 2 + units.length, y: 4 };
        const unit = getPartyUnit(this.gameState, unitId);
        if (!unit) return;
        unit.x = pos.x;
        unit.y = pos.y;
        unit.facing = 'right';
        units.push(unit);
        deployedIds.add(unitId);
      });
    }

    const deployPos = chapter.playerDeploy[0] || { x: 2, y: 4 };

    for (const e of chapter.enemyDeploy) {
      let enemyId = e.enemyId;
      // 序章 Boss 战男女线动态适配
      if (chapter.id === 'ch0_battle3' && e.instanceId === 'boss_corrupted') {
        enemyId = this.selectedRoute === 'female' ? 'heyanxi_corrupted' : 'fanwenmo_corrupted';
      }
      // 数值工厂统一造敌：与援军同一工厂，数值口径一致
      const unit = createEnemyUnit(enemyId, {
        instanceId: e.instanceId,
        x: e.x,
        y: e.y,
        facing: 'left'
      });
      if (unit) units.push(unit);
    }

    // ★ 诉求6：地图战斗开始的时候，全员满血满魔，不继承上一次战斗的血量
    units.filter(u => u.faction === 'player').forEach(u => {
      u.currentHp = u.stats.maxHp;
      u.currentSp = u.stats.maxSp;
      u.isAlive = true;
      u.hasActed = false;
    });

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

    // ★ 诉求9：开局进入战斗初始状态，光标自动停留在主角身上
    const leadUnit = units.find(u => u.isAlive && u.faction === 'player' && u.id === this.activePlayerUnitId)
      || units.find(u => u.isAlive && u.faction === 'player');
    const initCursorX = leadUnit ? leadUnit.x : deployPos.x;
    const initCursorY = leadUnit ? leadUnit.y : deployPos.y;
    this.battleState.cursor = { x: initCursorX, y: initCursorY };

    // ★ 关键重置：清空上一场战斗残留的胜利/战利品模态框状态
    // (否则第二场战斗 checkBattleEnd 会因 victoryModalShown 残留而永不弹窗，回合无限空转)
    this.battleState.victoryModal = null;
    this.battleState.victoryModalShown = false;
    this.battleState.itemRewardModal = null;
    this.battleState.combatExchangeModal = null;
    this.battleState.levelUpModal = null;
    this.battleState.unitDetailModal = null;
    this.battleState.inventoryModal = null;
    this.battleState.tutorialModal = null;
    this.battleState.phaseBanner = null;
    this.battleState.reinforcementNotice = null;

    // 全队共享仓库：直接引用 gameState.stash —— 战斗中的存/取实时写进进度，
    // 胜利 commit 后随档持久化，跨战斗不再清空
    this.battleState.stash = this.gameState.stash;
    this.battleState.collectedLoots = [];

    // 初始化援军配置
    this.battleState.pendingReinforcements = (chapter.reinforcements || []).slice();
    this.battleState.triggeredReinforcementTurns = new Set();

    // 初始化回合阶段横幅：第1回合 PLAYER_PHASE 开场展示 (包含一级【第1回合】)
    this.showPhaseBanner('PLAYER_PHASE', 1, true);

    // ★ 首关新手教学（任务 #9）：关卡配置了 tutorial 块就开场弹出三步引导，
    //   遮罩挡住地图，玩家读完（或 Escape 跳过）再开始操作
    if (chapter.tutorial && Array.isArray(chapter.tutorial.steps) && chapter.tutorial.steps.length > 0) {
      this.battleState.tutorialModal = new TutorialPanelModal(
        this.canvas,
        chapter.tutorial,
        () => { this.battleState.tutorialModal = null; }
      );
    }

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

  /**
   * 单位步行动画 (b3)：先看见棋盘上的人走动，再出菜单 / 战斗界面。
   * 逻辑坐标先行就位 (u.x/u.y 落终点 —— 攻击范围 / 菜单锚点以终点计算，无中间态)，
   * 视觉用 animOffset 从起点偏移逐格衰减到 0，drawUnits 按「u.x + animOffset」渲染。
   * path 为 findPath 的「不含起点」格式；空数组或原地则跳过动画。
   * msPerTile 取 150：慢过菜单弹出直觉、快过拖沓（移 5 格约 0.8s）。
   */
  playWalkAnimation(unit, fromX, fromY, path, msPerTile = 130) {
    return new Promise((resolve) => {
      const full = [{ x: fromX, y: fromY }, ...(path || [])];
      if (full.length < 2) { setTimeout(resolve, 50); return; }
      const ts = this.tileSize;
      let seg = 0;

      const nextSeg = () => {
        if (seg >= full.length - 1) {
          unit.animOffsetX = 0;
          unit.animOffsetY = 0;
          setTimeout(resolve, 50);
          return;
        }
        const a = full[seg];
        const b = full[seg + 1];

        // 分段转向 + 步声
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        if (dx > 0) unit.facing = 'right';
        else if (dx < 0) unit.facing = 'left';
        else if (dy > 0) unit.facing = 'down';
        else if (dy < 0) unit.facing = 'up';
        sound.playSfx('sfx_step');

        const startTime = performance.now();

        const doStep = () => {
          const elapsed = performance.now() - startTime;
          if (elapsed < msPerTile) {
            const t = Math.min(1, elapsed / msPerTile);
            // 线性匀速移动，连接各段形成连贯步伐
            const currX = a.x + dx * t;
            const currY = a.y + dy * t;
            unit.animOffsetX = (currX - unit.x) * ts;
            unit.animOffsetY = (currY - unit.y) * ts;
            requestAnimationFrame(doStep);
          } else {
            // 本段结束，精准对齐到 b 格点
            unit.animOffsetX = (b.x - unit.x) * ts;
            unit.animOffsetY = (b.y - unit.y) * ts;
            seg += 1;
            nextSeg();
          }
        };
        requestAnimationFrame(doStep);
      };
      nextSeg();
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
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = rect.width ? (this.canvas.width / rect.width) : 1;
      const scaleY = rect.height ? (this.canvas.height / rect.height) : 1;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      // ★ 存档界面模态独占 hover（任何 stage 之上，行高亮联动）
      if (this.saveMenuModal) {
        this.saveMenuModal.handleMouseMove(mouseX, mouseY);
        return;
      }

      if (this.battleState.isAnimatingCombat) return;

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
        // 委托行动菜单组件（ActionMenu 自闭环：盒内 hover 联动焦点，盒外静默）
        if (this.battleState.actionMenu) {
          this.battleState.actionMenu.handleMouseMove(mouseX, mouseY);
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
        // 委托行动菜单组件（moveSelection 循环滚动且自动跳过灰项）
        if (this.battleState.actionMenu) {
          this.battleState.actionMenu.moveSelection(e.deltaY > 0 ? 1 : -1);
        }
      }
    }, { passive: false });

    this.canvas.addEventListener('click', (e) => {
      sound.unlock();
      // ★ 章节标题覆盖层展示期间吞掉点击（自动播放，展示结束才放行）
      if (this.chapterBanner) return;
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = rect.width ? (this.canvas.width / rect.width) : 1;
      const scaleY = rect.height ? (this.canvas.height / rect.height) : 1;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      // ★ 存档界面模态独占点击（标题侧/剧情侧打开都拦在最前，防穿透到场景）
      if (this.saveMenuModal) {
        this.saveMenuModal.handleClick(clickX, clickY);
        return;
      }

      // ★ 新伙伴入队弹窗独占点击
      if (this.joinPartyModal && this.joinPartyModal.isOpen) {
        this.joinPartyModal.handleClick(clickX, clickY);
        return;
      }

      // ★ 胜利结算模态框组件捕获
      if (this.battleState.victoryModal) {
        this.battleState.victoryModal.handleClick(clickX, clickY);
        return;
      }

      // ★ 战斗失败模态框组件捕获
      if (this.battleState.gameOverModal) {
        this.battleState.gameOverModal.handleClick(clickX, clickY);
        return;
      }

      // ★ 战利品弹窗组件捕获
      if (this.battleState.itemRewardModal) {
        this.battleState.itemRewardModal.handleClick(clickX, clickY);
        return;
      }

      // ★ 交战演出弹层捕获（时间轴未完时吞点击防误关；finish 后点确认触发 onClose）
      if (this.battleState.combatExchangeModal) {
        this.battleState.combatExchangeModal.handleClick(clickX, clickY);
        return;
      }

      // ★ 升级明细弹层捕获（九维演出未完时吞点击防误关；确认后关闭继续掉落/回合结算）
      if (this.battleState.levelUpModal) {
        this.battleState.levelUpModal.handleClick(clickX, clickY);
        return;
      }

      // ★ 新手教学弹层捕获（未读完吞点击；确认/关闭后开始正常操作）
      if (this.battleState.tutorialModal) {
        this.battleState.tutorialModal.handleClick(clickX, clickY);
        return;
      }

      // ★ 人物详情弹层捕获（行动菜单「详情」：关闭后回菜单继续选择）
      if (this.battleState.unitDetailModal) {
        this.battleState.unitDetailModal.handleClick(clickX, clickY);
        return;
      }

      // ★ 道具·仓库弹层捕获（行动菜单「道具」：关闭后回菜单继续选择）
      if (this.battleState.inventoryModal) {
        this.battleState.inventoryModal.handleClick(clickX, clickY);
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

      // ★ 行动菜单组件独占：盒内命中组件消化；盒外点击解释为「取消菜单」
      //   （handleBattleCancel 会把单位送回原位并重新圈选移动范围）
      if (this.battleState.mode === 'ACTION_MENU' && this.battleState.actionMenu) {
        if (!this.battleState.actionMenu.handleClick(clickX, clickY)) {
          this.handleBattleCancel();
        }
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

      // ★ 章节标题覆盖层展示期间吞掉按键（自动播放，展示结束才放行）
      if (this.chapterBanner) return;

      // ★ 存档界面模态独占按键（方向导航/确认/Esc/D删/E导/I导 全在组件内消化）
      if (this.saveMenuModal) {
        this.saveMenuModal.handleKeyDown(e);
        return;
      }

      // ★ 新伙伴入队弹窗独占按键 (Space / Enter / Escape)
      if (this.joinPartyModal && this.joinPartyModal.isOpen) {
        this.joinPartyModal.handleKeyDown(e);
        return;
      }

      // ★ 胜利结算模态框按键捕获 (回车/空格/Esc)
      if (this.battleState.victoryModal) {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
          this.battleState.victoryModal.handleKeyDown(e);
        }
        return;
      }

      // ★ 战斗失败模态框按键捕获 (回车/空格/Esc)
      if (this.battleState.gameOverModal) {
        if (e.key === ' ' || e.key === 'Enter') {
          this.battleState.gameOverModal.handleClick(this.battleState.gameOverModal.retryBtnRect.x + 5, this.battleState.gameOverModal.retryBtnRect.y + 5);
        } else if (e.key === 'Escape') {
          this.battleState.gameOverModal.handleClick(this.battleState.gameOverModal.titleBtnRect.x + 5, this.battleState.gameOverModal.titleBtnRect.y + 5);
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

      // ★ 交战演出弹层：时间轴未完时吞按键；finish 后回车/空格/ESC 触发确认关闭
      if (this.battleState.combatExchangeModal) {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
          this.battleState.combatExchangeModal.handleKeyDown(e);
        }
        return;
      }

      // ★ 升级明细弹层：时间轴未完时吞按键；确认键关闭继续流程
      if (this.battleState.levelUpModal) {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
          this.battleState.levelUpModal.handleKeyDown(e);
        }
        return;
      }

      // ★ 新手教学弹层：三步引导期间吃掉方向/确认/取消，防地图光标瞎动
      if (this.battleState.tutorialModal) {
        this.battleState.tutorialModal.handleKeyDown(e);
        return;
      }

      // ★ 人物详情弹层：查看期间吃掉地图操作键
      if (this.battleState.unitDetailModal) {
        this.battleState.unitDetailModal.handleKeyDown(e);
        return;
      }

      // ★ 道具·仓库弹层：Tab 切视图 / 上下左右行导航都在组件里
      if (this.battleState.inventoryModal) {
        this.battleState.inventoryModal.handleKeyDown(e);
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
        if (e.key === 'Escape') {
          // T5/D5：剧情场景呼出存档界面（手动存档 / 读档 / 删除 / 导出导入一体）
          sound.playSfx('sfx_menu_open');
          this.openSaveMenu('save');
          return;
        }
        if (e.key === ' ' || e.key === 'Enter') {
          this.dialogueSystem.next();
        }
        return;
      }

      // ★ 行动菜单组件独占：↑↓ 移焦点 / Enter 确认 / Esc 取消全部在组件内消化，
      //   菜单打开期间地图光标不再联动（其它按键不产生任何副作用）
      if (this.battleState.mode === 'ACTION_MENU' && this.battleState.actionMenu) {
        this.battleState.actionMenu.handleKeyDown(e);
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          this.moveCursor(0, -1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          this.moveCursor(0, 1);
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
        this.confirmUnitMove();
      } else {
        this.handleBattleCancel();
      }
      return;
    }

    // ★ ACTION_MENU 已整体迁移到 ActionMenu 组件（bindEvents 内直接委托，
    //   选中分发见 handleActionMenuSelect），这里不再有该分支。
    // ★ ITEM_MENU 已删除：道具菜单项改为打开 InventoryPanelModal（背包·仓库面板），
    //   道具的「使用」交互后续迭代并入面板。

    if (bs.mode === 'TARGET_SELECT') {
      const target = bs.targetEnemies[bs.targetIndex];
      if (target) {
        this.executeCombatSequence(bs.selectedUnit, target);
      }
      return;
    }
  }

  /**
   * 确认移动落点（b3）：逻辑坐标先行就位 + 等步行动画走完再弹行动菜单。
   * 旧版在这直接改 u.x/u.y（玩家眼里是「闪现」），随后 openActionMenu 与
   * 交战弹层几乎同时砸出来，战斗开始时人已在终点——过程完全看不清。
   */
  async confirmUnitMove() {
    const bs = this.battleState;
    if (bs.isAnimatingCombat) return; // 防重复触发位移

    const u = bs.selectedUnit;
    if (!u) return;

    const oldX = u.x;
    const oldY = u.y;
    // 拷贝后再复位：动画期间 currentPath 被清空也不影响播放轨迹
    const path = (bs.currentPath && bs.currentPath.length > 0)
      ? bs.currentPath.slice()
      : bs.gridSystem.findPath(oldX, oldY, bs.cursor.x, bs.cursor.y, u.faction, bs.units);

    bs.isAnimatingCombat = true; // 锁输入：步行中不接受任何操作

    // 逻辑坐标先行就位：攻击范围 / 菜单锚点 / 后续 PathFinder 全部以终点计算，无中间态
    u.x = bs.cursor.x;
    u.y = bs.cursor.y;

    bs.reachableTiles = [];
    bs.currentPath = [];

    // ★ b3 核心：先看见棋盘上的人一步步走过去，走完才弹菜单
    await this.playWalkAnimation(u, oldX, oldY, path);

    bs.isAnimatingCombat = false;
    this.openActionMenu();
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

    if (bs.mode === 'TARGET_SELECT') {
      // 攻击选中取消 → 回到行动菜单（菜单在进入选敌时已销毁，原地重建四项重算）
      bs.battlePreview = null;
      bs.attackableTiles = [];
      sound.playSfx('sfx_cancel');
      this.openActionMenu();
      return;
    }
  }

  /**
   * 打开行动菜单（任务 #9 重构）：
   * 旧版是 items 数组 + renderer 手绘 + 散落各事件里的命中检测；
   * 现在整体换成 ActionMenu 组件（四项恒定 + 灰显不隐藏 + 输入自闭环）。
   */
  openActionMenu() {
    const bs = this.battleState;
    const u = bs.selectedUnit;
    if (!u) return;

    const weapon = WEAPONS[u.equippedWeapon] || WEAPONS.pencil;
    const atkRangeTiles = bs.gridSystem.getAttackableTiles(u.x, u.y, weapon.range[0], weapon.range[1]);
    const enemiesInRange = bs.units.filter(
      enemy => enemy.isAlive && enemy.faction === 'enemy'
        && atkRangeTiles.some(t => t.x === enemy.x && t.y === enemy.y)
    );
    const hasItems = u.inventory && u.inventory.length > 0;

    // 菜单锚点 = 单位格的像素矩形（含地图偏移，与 renderer 绘制同一坐标系）
    const anchorRect = {
      x: u.x * this.tileSize + this.renderer.offsetX,
      y: u.y * this.tileSize + this.renderer.offsetY,
      w: this.tileSize,
      h: this.tileSize
    };

    bs.actionMenu = new ActionMenu({
      items: planActionMenuItems({ enemiesInRange: enemiesInRange.length, hasItems }),
      anchorRect,
      canvasW: this.canvas.width,
      canvasH: this.canvas.height,
      onSelect: (id) => this.handleActionMenuSelect(id),
      onCancel: () => this.handleBattleCancel()
    });
    bs.mode = 'ACTION_MENU';
    sound.playSfx('sfx_menu_open');
  }

  /**
   * 菜单选中分发（ActionMenu onSelect 回调）：
   *   详情 → UnitDetailModal（查看数值，关闭回菜单，不耗行动）
   *   攻击 → enterTargetSelect（关菜单进入选敌）
   *   道具 → InventoryPanelModal（背包·仓库管理，关闭回菜单，不耗行动）
   *   待机 → endUnitTurn（结束该单位行动）
   */
  handleActionMenuSelect(id) {
    const bs = this.battleState;
    const u = bs.selectedUnit;
    if (!u) return;

    if (id === 'detail') {
      bs.unitDetailModal = new UnitDetailModal(
        this.canvas,
        { unit: u },
        () => { bs.unitDetailModal = null; }
      );
      return; // 菜单保持打开，弹层盖在其上；关闭后继续选
    }

    if (id === 'attack') {
      bs.actionMenu = null;   // 进入选敌，菜单销毁
      this.enterTargetSelect();
      return;
    }

    if (id === 'item') {
      bs.inventoryModal = new InventoryPanelModal(
        this.canvas,
        {
          unit: u,
          stash: bs.stash || createStash(),
          onUseItem: (targetUnit, row, res) => {
            bs.inventoryModal = null;
            const hpGain = res.hpRestored || 0;
            const text = hpGain > 0 ? `使用${row.name} HP+${hpGain}` : `使用${row.name}成功`;
            this.addFloatingText(text, targetUnit.x, targetUnit.y, '#22c55e');
            bs.actionMenu = null;
            this.endUnitTurn();
          }
        },
        () => { bs.inventoryModal = null; }
      );
      return; // 菜单保持打开，弹层盖在其上；关闭后继续选
    }

    if (id === 'wait') {
      bs.actionMenu = null;   // endUnitTurn 也会清，这里显式表达菜单生命周期
      this.endUnitTurn();
      return;
    }
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
    this.battleState.targetEnemies = [];

    // 攻击发起前根据目标位置更新朝向
    const dx = defender.x - attacker.x;
    const dy = defender.y - attacker.y;
    if (Math.abs(dx) >= Math.abs(dy)) {
      if (dx !== 0) attacker.facing = dx > 0 ? 'right' : 'left';
    } else {
      attacker.facing = dy > 0 ? 'down' : 'up';
    }

    // 1. 进攻方在单元格内停留 0.5s：光标聚焦进攻方单元格，清楚展示是谁、走到哪儿
    this.battleState.cursor.x = attacker.x;
    this.battleState.cursor.y = attacker.y;
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 2. 光标移动到受击单位单元格停留 0.5s：播放光标锁定音效，清楚展示打了谁
    this.battleState.cursor.x = defender.x;
    this.battleState.cursor.y = defender.y;
    sound.playSfx('sfx_cursor');
    await new Promise((resolve) => setTimeout(resolve, 500));

    const preview = CombatSystem.predictBattle(
      attacker,
      defender,
      this.battleState.gridSystem.getTerrain(attacker.x, attacker.y),
      this.battleState.gridSystem.getTerrain(defender.x, defender.y)
    );

    // ★ 交战演出弹层：承担 HP 条掉血动画、反击展示与经验条增长（取代地图 -N 浮字）
    const cePlayerSide = attacker.faction === 'player' ? 'attacker'
      : (defender.faction === 'player' ? 'defender' : null);
    const playerUnit = attacker.faction === 'player' ? attacker
      : (defender.faction === 'player' ? defender : null);

    let ceConfirmResolve = null;
    const ceModal = new CombatExchange(this.canvas, {
      attacker: { name: attacker.name, level: attacker.level, hp: attacker.currentHp, maxHp: attacker.stats?.maxHp ?? attacker.currentHp, faction: attacker.faction, unit: attacker },
      defender: { name: defender.name, level: defender.level, hp: defender.currentHp, maxHp: defender.stats?.maxHp ?? defender.currentHp, faction: defender.faction, unit: defender },
      playerSide: cePlayerSide,
      exp: playerUnit ? { current: playerUnit.exp, max: 100, level: playerUnit.level } : null,
    }, () => {
      this.battleState.combatExchangeModal = null;
      if (ceConfirmResolve) { const r = ceConfirmResolve; ceConfirmResolve = null; r(); }
    });
    this.battleState.combatExchangeModal = ceModal;

    // 单步击打函数：掷骰一次（弹层演出与真实扣血共用判定结果）。
    // 地图侧保留突进冲撞与受击震颤；弹层侧承担精确 HP 掉血动画与音效时间轴。
    const playSingleStrike = async (src, dst, statPred, strikeLabel) => {
      const srcSide = (src === attacker) ? 'attacker' : 'defender';

      // 1. 计算命中与伤害（判定只掷一次，弹层与真实扣血共用）
      const isHit = (Math.random() * 100) < statPred.hit;
      const isCrit = isHit && (Math.random() * 100) < statPred.crit;
      const damage = isHit ? (isCrit ? statPred.damage * 3 : statPred.damage) : 0;

      // 2. 真实且同步扣减血量（与弹层 hpTrack 同源：hpAfter = clamp(hpBefore - damage, 0, maxHp)）
      const dstHpBefore = dst.currentHp;
      if (isHit) {
        dst.currentHp = Math.max(0, dst.currentHp - damage);
      }

      // 3. 并行演出：弹层自 windup 起播（音效由其时间轴驱动），地图突进到位后接受击震颤
      const layerP = ceModal.playStrike({
        srcSide,
        label: strikeLabel || '',
        isHit, isCrit, damage,
        dstHpBefore,
      });
      await this.lungeUnit(src, dst, 8, 140);
      if (isHit) {
        this.shakeUnit(dst, isCrit ? 8 : 5, isCrit ? 280 : 200); // 受击高频剧烈抖动
      } else {
        this.shakeUnit(dst, 2, 100); // 轻微躲闪
      }
      await layerP; // 等弹层该段（蓄势→命中→HP掉落→定格）完整播完
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
    if (attacker.currentHp <= 0) {
      attacker.isAlive = false;
      attacker.deathAnim = { startTime: performance.now(), duration: 800 };
    }
    if (defender.currentHp <= 0) {
      defender.isAlive = false;
      defender.deathAnim = { startTime: performance.now(), duration: 800 };
    }

    // ★ 统一击杀结算：本次交战中阵亡的敌方单位，无论它是守方（被我方主动攻击击杀）
    //   还是攻方（敌方回合扑向我方时被我方反击击杀），都必须一致地结算经验、掉落与弹窗。
    //   修复 Bug：旧代码只检查 defender 位 —— 敌方作为攻方被反击击杀时（典型如男主线
    //   混混战：张子骁首击 11 伤打不死 14 HP 混混，残血 3 HP 混混在敌方回合扑上来被我方
    //   11 伤反击击杀），零经验、零掉落、零弹窗；而石予诺双击 9×2 在自己回合以守方位
    //   阵亡，正常弹窗 —— 两条线由此产生 UI 不一致。
    const slainUnit = !defender.isAlive ? defender : (!attacker.isAlive ? attacker : null);

    // 经验与升级（我方单位参与本次交战时）：growth 服务一次结算（曲线 + FE 随机成长 roll + apply），
    //   弹层经验条吃结算结果做演出（普通增长 / 升级满格→横幅→回卷），升级明细留 levelUpPending
    let levelUpPending = null;
    if (playerUnit) {
      // 击杀经验：用户曲线 30+(敌等-我等)×10 下限 10（含反击击杀）；主动出手未击杀保留参与经验 12
      let expGained = 0;
      if (slainUnit && slainUnit.faction === 'enemy') {
        expGained = expForKill(playerUnit.level, slainUnit.level);
      } else if (attacker === playerUnit) {
        expGained = expForAction();
      }
      if (expGained > 0) {
        const expBefore = playerUnit.exp;
        const levelBefore = playerUnit.level;
        const statsBefore = snapshotGrowthStats(playerUnit); // apply 前九维快照（升级明细行条的"旧值"）
        const result = gainExp(playerUnit, expGained);       // 入账 + 连锁升级（roll + apply）
        const leveledUp = result.levelsGained > 0;
        await ceModal.playExp({
          side: cePlayerSide,
          name: playerUnit.name,
          amount: expGained,
          before: expBefore,
          after: playerUnit.exp,
          leveledUp,
          levelBefore,
          levelAfter: playerUnit.level,
          maxExp: 100,
        });
        if (leveledUp) {
          levelUpPending = {
            unit: playerUnit,
            fromLevel: levelBefore,
            toLevel: playerUnit.level,
            gainsByLevel: result.gainsByLevel,
            statsBefore,
          };
        }
      }
    }

    // ★ 交战演出收官：时间轴排完出确认按钮，等玩家看完终局面板再继续掉落与回合结算
    ceModal.finish();
    await new Promise((resolve) => { ceConfirmResolve = resolve; });

    // ★ 升级明细弹层：交战弹层确认后弹出（九维 stagger + 条形增长 + 文字 +1），
    //   连环多级一次放完整时间轴；玩家确认后才继续掉落与回合结算
    if (levelUpPending) {
      const lu = levelUpPending;
      levelUpPending = null;
      await new Promise((resolve) => {
        this.battleState.levelUpModal = new LevelUpModal(this.canvas, lu, () => {
          this.battleState.levelUpModal = null;
          resolve();
        });
      });
    }

    // ★ 掉落结算统一走 V2 服务 settleLoot（判定基准 = 阵亡者，反击击杀同样拾取；
    //   返回快照自带 name/desc/iconPath，UI 层无需再查 ITEMS 表）
    const { loots } = settleLoot(slainUnit, playerUnit);
    if (loots.length > 0) this.battleState.collectedLoots.push(...loots);
    for (const loot of loots) {
      sound.playSfx('sfx_item_get');
      // 逐条弹出真正的战利品弹窗组件，等待玩家确认后继续
      await new Promise((resolve) => {
        this.battleState.itemRewardModal = new ItemModal(
          this.canvas,
          {
            enemyName: slainUnit.name,
            itemName: loot.name,
            desc: loot.desc,
            icon: loot.iconPath
          },
          () => {
            this.battleState.itemRewardModal = null;
            resolve();
          }
        );
      });
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

          // b3：敌方移动同样走步行动画——先看见棋盘上的人走，再出交战弹层
          //   与玩家侧 confirmUnitMove 同协议（逻辑坐标先行 + animOffset 衰减）
          const oldX = enemy.x;
          const oldY = enemy.y;
          enemy.x = decision.targetTile.x;
          enemy.y = decision.targetTile.y;
          await this.playWalkAnimation(
            enemy,
            oldX,
            oldY,
            this.battleState.gridSystem.findPath(
              oldX, oldY, enemy.x, enemy.y, enemy.faction, this.battleState.units
            )
          );

          // 到位后 facing 朝向最近玩家（预备攻击姿态，覆盖步行朝向）
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

    // ★ 诉求9：每个回合开始，光标自动停留在主角身上
    const leadUnit = this.battleState.units.find(u => u.isAlive && u.faction === 'player' && u.id === this.activePlayerUnitId)
      || this.battleState.units.find(u => u.isAlive && u.faction === 'player');
    if (leadUnit) {
      this.battleState.cursor.x = leadUnit.x;
      this.battleState.cursor.y = leadUnit.y;
    }

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

      // ★ 战利品文案取自本场「实得掉落」累计（settleLoot 判定后 drops 已清空，
      //   且旧逻辑列的是掉落表全量而非实际 roll 中的——改为只报真到手的）
      const lootName = summarizeLoots(bs.collectedLoots);

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
          // A1/T4：胜利确认 → 全队档案写回（等级/经验/装备/背包/血蓝）+ 登记通关；
          // 随后 startStoryScene 的 A2 存档天然带上结算后的最新状态
          this.commitBattleResults();
          if (this.nextStorySceneOnWin) {
            this.startStoryScene(this.nextStorySceneOnWin);
          } else {
            // 无后续剧情的兜底分支：也落一次盘再回标题
            this.saveManager.autosave(this.gameState);
            this.enterTitleScreen();
          }
        }
      );
    } else if (alivePlayers.length === 0) {
      if (bs.gameOverModal) return;
      sound.playSfx('sfx_shock_sting');
      setTimeout(() => {
        bs.gameOverModal = new GameOverModal(
          this.canvas,
          {},
          () => {
            bs.gameOverModal = null;
            // D1/T6：战败不 commit——roster 从未被战场污染（getPartyUnit 出的是深拷贝），
            // 直接按 gameState 锚点重建战斗 = 回到本章开头
            this.resumeFromGameState();
          },
          () => {
            bs.gameOverModal = null;
            this.enterTitleScreen();
          }
        );
      }, 700);
    }
  }

  /**
   * T4 胜利结算：把战场上我方全体单位（等级/经验/装备/背包/血蓝）写回进度档案，
   * 并登记本章通关。仓库 stash 与 gameState 引用共享，战场上的存取已实时生效，无需写回。
   */
  commitBattleResults() {
    const bs = this.battleState;
    bs.units
      .filter(u => u.faction === 'player')
      .forEach(u => commitRuntimeUnit(this.gameState, u));
    if (bs.chapter && bs.chapter.id) {
      markChapterCleared(this.gameState, bs.chapter.id);
    }
  }

  /**
   * 按 gameState 恢复现场（战败重开 / 读档继续共用）：
   * chapterId 非空 → 直接重开该章战斗；否则回到 sceneId 剧情节点。
   */
  resumeFromGameState() {
    if (!this.gameState) {
      this.enterTitleScreen();
      return;
    }
    this.selectedRoute = this.gameState.route;
    this.activePlayerUnitId = this.gameState.leadUnitId;
    const chapterData = CHAPTERS[this.gameState.chapterId];
    if (chapterData) {
      this.enterBattleMap(chapterData, chapterData.nextStorySceneOnWin);
    } else {
      const sceneData = (PROLOGUE_STORY[this.selectedRoute] || PROLOGUE_STORY.male)[this.gameState.sceneId];
      if (sceneData) {
        this.startStoryScene(this.gameState.sceneId);
      } else {
        this.enterTitleScreen();
      }
    }
  }

  /** 游玩时长累计：跳过标题屏（挂机不算游戏时间）；每满整秒写 gameState.playtimeSec */
  tickPlaytimeClock() {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const dt = now - this._lastLoopTs;
    this._lastLoopTs = now;
    if (!this.gameState || this.stage === 'STAGE_TITLE' || dt <= 0) return;
    this._playtimeAccumMs += dt;
    if (this._playtimeAccumMs >= 1000) {
      const sec = Math.floor(this._playtimeAccumMs / 1000);
      tickPlaytime(this.gameState, sec);
      this._playtimeAccumMs -= sec * 1000;
    }
  }

  loop() {
    this.tickPlaytimeClock();
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
      // 渲染行动菜单组件（非模态浮窗：无遮罩、与地图渲染并存，模态弹层在其上盖住）
      if (this.battleState.mode === 'ACTION_MENU' && this.battleState.actionMenu) {
        this.battleState.actionMenu.render(this.renderer.ctx);
      }
      // 渲染教学 / 人物详情 / 道具·仓库三个模态弹层（行动菜单打开的弹层盖在菜单上）
      if (this.battleState.tutorialModal && typeof this.battleState.tutorialModal.render === 'function') {
        this.battleState.tutorialModal.render();
      }
      if (this.battleState.unitDetailModal && typeof this.battleState.unitDetailModal.render === 'function') {
        this.battleState.unitDetailModal.render();
      }
      if (this.battleState.inventoryModal && typeof this.battleState.inventoryModal.render === 'function') {
        this.battleState.inventoryModal.render();
      }
      // 渲染交战演出弹层组件（虚拟时钟由本 render 逐帧推进：playStrike/playExp 的 await 依赖此调用）
      if (this.battleState.combatExchangeModal && typeof this.battleState.combatExchangeModal.render === 'function') {
        this.battleState.combatExchangeModal.render();
      }
      // 渲染升级明细弹层组件（虚拟时钟同款：九维演出逐帧推进，whenDone/确认依赖此调用）
      if (this.battleState.levelUpModal && typeof this.battleState.levelUpModal.render === 'function') {
        this.battleState.levelUpModal.render();
      }
      // 渲染战利品模态框组件
      if (this.battleState.itemRewardModal && typeof this.battleState.itemRewardModal.render === 'function') {
        this.battleState.itemRewardModal.render();
      }
      // 渲染胜利结算模态框组件
      if (this.battleState.victoryModal && typeof this.battleState.victoryModal.render === 'function') {
        this.battleState.victoryModal.render();
      }
      // 渲染战斗失利模态框组件
      if (this.battleState.gameOverModal && typeof this.battleState.gameOverModal.render === 'function') {
        this.battleState.gameOverModal.render();
      }
    }
    // ★ 新伙伴入队弹窗组件渲染（剧情环节弹窗，盖在当前 stage 上）
    if (this.joinPartyModal && this.joinPartyModal.isOpen) {
      this.joinPartyModal.render();
    }

    // ★ 存档界面模态渲染在所有 stage 之上（load 模式盖标题屏，save 模式盖剧情屏）
    if (this.saveMenuModal && typeof this.saveMenuModal.render === 'function') {
      this.saveMenuModal.render();
    }
    // ★ 章节标题覆盖层：跨标题/剧情/战斗阶段全屏展示（最上层），展示结束清理并触发 onDone
    if (this.chapterBanner) {
      this.renderer.drawChapterBanner(this.chapterBanner);
      if (Date.now() - this.chapterBanner.startTime > this.chapterBanner.duration) {
        const done = this.chapterBannerOnDone;
        this.chapterBanner = null;
        this.chapterBannerOnDone = null;
        if (done) done();
      }
    }
    requestAnimationFrame(() => this.loop());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new GameApp();
});
