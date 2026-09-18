/**
 * SRPG 全局数值平衡基准与算法规范 (Balance Standard & Redline System)
 *
 * 核心目标：
 * 1. 提供关卡等级预期、经验池预算、攻防TTK（Time To Kill）、道具梯队与技能消耗的标准计算模型。
 * 2. 建立不可突破的平衡性“红线（Redlines）”，在开发新角色、新技能、新关卡时提供自动化拦截与告警。
 */

export const BALANCE_STANDARDS = {
  // 1. 等级与经验曲线规范
  LEVEL_SYSTEM: {
    MAX_LEVEL: 20,
    EXP_TO_LEVEL: 100, // 每 100 EXP 固定升 1 级（FE经典机制）
    BASE_DEFEAT_EXP: 30, // 同级击杀基础经验
    BASE_HIT_EXP: 10,   // 未击杀命中获得经验
    // 关卡预期等级线性演进模型: Chapter 0 (Lv 1~2) -> Chapter 1 (Lv 2~4) -> Chapter 2 (Lv 4~6)
    getExpectedLevel(chapterIndex, battleIndex = 1) {
      if (chapterIndex === 0) return 1 + (battleIndex >= 3 ? 1 : 0);
      return Math.min(20, chapterIndex * 2 + battleIndex);
    }
  },

  // 2. 攻防与战斗节奏 (TTK = Time To Kill, 击杀所需轮次)
  COMBAT_TTK: {
    // 杂兵被我方单兵击杀轮次基准: 1.5 ~ 2.5 轮 (单次普攻扣 40%~60% HP，技能可单回合斩杀)
    MINION_TTK_TURNS: { min: 1, max: 3 },
    // 精英/小BOSS被击杀轮次基准: 3 ~ 5 轮 (需多人集火或交技能)
    ELITE_TTK_TURNS: { min: 2.5, max: 5 },
    // 最终BOSS被击杀轮次基准: 4 ~ 7 轮
    BOSS_TTK_TURNS: { min: 4, max: 8 },
    // 我方前排被杂兵围殴存活轮次: 至少吃 3~4 次攻击不暴毙
    PLAYER_SURVIVAL_HITS: { min: 3, max: 6 }
  },

  // 3. 属性成长率与上限分配规范 (职业/角色)
  STAT_GROWTH_STANDARDS: {
    TOTAL_GROWTH_CAP: 450, // 全属性成长率总和上限（防数值膨胀）
    TOTAL_GROWTH_MIN: 300, // 全属性成长率总和下限
    PHYSICAL_MAX_MP_CAP: 10, // 战士/物理系初始 MP 极值红线
    PHYSICAL_MP_GROWTH_CAP: 25, // 战士/物理系 MP 成长率上限 %
    MAGE_MIN_MP: 18, // 法系初始 MP 下限
    MAGE_MP_GROWTH_MIN: 40 // 法系 MP 成长率下限 %
  },

  // 4. 技能与 MP 经济学梯队 (Skill MP Economy)
  SKILL_TIERS: {
    // T1: 初始专属招牌技 (Lv.1)
    T1_SIGNATURE: {
      minLevel: 1,
      costRange: { min: 4, max: 5 }, // 物理系放 1 次见底，法系可放 4 次
      damageMultiplier: { min: 1.0, max: 1.3 }
    },
    // T2: 进阶职业技 (Lv.3~4)
    T2_ADVANCED: {
      minLevel: 3,
      costRange: { min: 5, max: 7 },
      damageMultiplier: { min: 1.3, max: 1.6 }
    },
    // T3: 终极/大招技 (Lv.6+)
    T3_ULTIMATE: {
      minLevel: 6,
      costRange: { min: 8, max: 12 },
      damageMultiplier: { min: 1.6, max: 2.2 }
    }
  },

  // 5. 道具分级与回复量基准
  ITEM_TIERS: {
    // 初级 (Tier 1, Ch.0~1): 单个回复 15~20 HP 或 5 MP (刚好支撑物理系再放 1 次技能)
    T1_BASIC: {
      maxHpHeal: 20,
      maxMpHeal: 6,
      chapters: ['ch0', 'ch1']
    },
    // 中级 (Tier 2, Ch.1~2): 单个回复 30~40 HP 或 10~15 MP (法系半管/物理系补满)
    T2_INTERMEDIATE: {
      maxHpHeal: 40,
      maxMpHeal: 15,
      chapters: ['ch1', 'ch2']
    },
    // 高级 (Tier 3, Ch.2+): 60+ HP 或 25+ MP / 全队回复
    T3_ADVANCED: {
      maxHpHeal: 80,
      maxMpHeal: 30,
      chapters: ['ch2', 'ch3']
    }
  },

  // 6. 硬性红线 (Redline Violation Rules)
  REDLINES: {
    // 暴击率上限：除特殊必杀武器外，基础暴击率严禁超过 35%（防突兀秒杀造成挫败）
    MAX_NATURAL_CRIT: 35,
    // 杂兵命中率下限与上限：避免 100% 盲眼或 100% 必中
    MIN_MINION_HIT: 55,
    MAX_MINION_HIT: 95,
    // 单击秒杀红线：敌人攻击力不得超过同级我方角色（HP + DEF）的 65%
    ONE_SHOT_THRESHOLD: 0.65,
    // 等级差距红线：关卡敌人平均等级与关卡预期等级偏差不得超过 ±1 级
    LEVEL_DISPARITY_TOLERANCE: 1.5
  }
};
