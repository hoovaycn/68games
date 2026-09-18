import { BALANCE_STANDARDS } from './balance_standards.js';
import { CLASSES } from '../data/classes.js';
import { UNITS } from '../data/units.js';
import { SKILLS } from '../data/skills.js';
import { WEAPONS } from '../data/goods/weapons.js';
import { CONSUMABLES } from '../data/goods/consumables.js';
import { ENEMIES } from '../data/enemies.js';

/**
 * 战棋平衡性验证与红线拦截引擎 (BalanceValidator)
 * 自动审查角色面板、技能消耗、敌人攻防、关卡难度与掉落道具是否越过平衡红线。
 */
export class BalanceValidator {

  /**
   * 校验单个职业/角色数值
   */
  static validateClass(classId, classData) {
    const issues = [];
    const base = classData.base;
    const growth = classData.growth;

    // 1. 成长率总和检查
    const totalGrowth = Object.entries(growth).reduce((sum, [stat, val]) => {
      // FE 经典惯例：通常累加主要属性 (hp, str, mag, skl, spd, luk, def, res)
      return ['hp', 'str', 'mag', 'skl', 'spd', 'luk', 'def', 'res'].includes(stat) ? sum + val : sum;
    }, 0);

    if (totalGrowth > BALANCE_STANDARDS.STAT_GROWTH_STANDARDS.TOTAL_GROWTH_CAP) {
      issues.push({
        level: 'REDLINE',
        type: 'growth_overflow',
        msg: `职业 [${classId}] 成长率总和 (${totalGrowth}%) 超标，红线为 ${BALANCE_STANDARDS.STAT_GROWTH_STANDARDS.TOTAL_GROWTH_CAP}%`
      });
    }

    // 2. 物理系与法系 MP 职业定位红线
    // 纯物理系定义：str 显著高于 mag 且 mag 极低
    const isPurePhysical = (base.str || 0) >= (base.mag || 0) + 4 && (base.mag || 0) <= 3;
    const isMage = (base.mag || 0) > (base.str || 0) + 2;

    if (isPurePhysical) {
      if (base.mp > BALANCE_STANDARDS.STAT_GROWTH_STANDARDS.PHYSICAL_MAX_MP_CAP) {
        issues.push({
          level: 'REDLINE',
          type: 'physical_mp_bloat',
          msg: `物理系职业 [${classId}] 基础 MP (${base.mp}) 过高，破坏技能稀缺性红线（上限 ${BALANCE_STANDARDS.STAT_GROWTH_STANDARDS.PHYSICAL_MAX_MP_CAP}）`
        });
      }
      if (growth.mp > BALANCE_STANDARDS.STAT_GROWTH_STANDARDS.PHYSICAL_MP_GROWTH_CAP) {
        issues.push({
          level: 'WARN',
          type: 'physical_mp_growth_high',
          msg: `物理系职业 [${classId}] MP 成长率 (${growth.mp}%) 偏高，红线建议 ≤ ${BALANCE_STANDARDS.STAT_GROWTH_STANDARDS.PHYSICAL_MP_GROWTH_CAP}%`
        });
      }
    }

    if (isMage) {
      if (base.mp < BALANCE_STANDARDS.STAT_GROWTH_STANDARDS.MAGE_MIN_MP) {
        issues.push({
          level: 'REDLINE',
          type: 'mage_mp_starvation',
          msg: `法系/辅助职业 [${classId}] 基础 MP (${base.mp}) 不足，法系应 ≥ ${BALANCE_STANDARDS.STAT_GROWTH_STANDARDS.MAGE_MIN_MP}`
        });
      }
    }

    return issues;
  }

  /**
   * 校验技能消耗与解锁梯度
   */
  static validateSkill(skillId, skill) {
    const issues = [];
    const unlockLv = skill.unlockLevel || 1;
    const cost = skill.mpCost || 0;

    // 校验阶梯与消耗是否匹配
    if (unlockLv === 1) {
      if (cost > BALANCE_STANDARDS.SKILL_TIERS.T1_SIGNATURE.costRange.max + 1) {
        issues.push({
          level: 'WARN',
          type: 't1_skill_cost_too_high',
          msg: `初始技能 [${skill.name || skillId}] 消耗 (${cost} MP) 偏高，初期可能无法施放`
        });
      }
    } else if (unlockLv >= 3 && unlockLv < 6) {
      if (cost < BALANCE_STANDARDS.SKILL_TIERS.T2_ADVANCED.costRange.min) {
        issues.push({
          level: 'WARN',
          type: 't2_skill_cost_too_low',
          msg: `进阶技能 [${skill.name || skillId}] 消耗 (${cost} MP) 偏低，进阶技能应具有更高代价`
        });
      }
    }

    return issues;
  }

  /**
   * 校验武器数值（暴击红线）
   */
  static validateWeapon(weaponId, weapon) {
    const issues = [];
    if (weapon.crit > BALANCE_STANDARDS.REDLINES.MAX_NATURAL_CRIT && weapon.type !== 'killer') {
      issues.push({
        level: 'REDLINE',
        type: 'lethal_crit_redline',
        msg: `武器 [${weapon.name || weaponId}] 暴击率 (${weapon.crit}%) 触发硬性红线拦截！常规武器严禁超过 ${BALANCE_STANDARDS.REDLINES.MAX_NATURAL_CRIT}%，防秒杀毁体验`
      });
    }
    return issues;
  }

  /**
   * 校验敌人攻防与玩家 TTK 对抗健康度
   */
  static validateEnemy(enemyId, enemy, samplePlayer) {
    const issues = [];
    const cls = CLASSES[enemy.classId] || {};
    const eBase = cls.base || enemy.stats || {};
    const pStats = samplePlayer.stats;

    // 1. 攻击秒杀红线 (Enemy Attack vs Player HP+DEF)
    const enemyAtk = (eBase.str || 0) + 6; // 假定新手武器威力 6
    const playerDef = pStats.def || 0;
    const damagePerHit = Math.max(0, enemyAtk - playerDef);
    const damageRatio = damagePerHit / pStats.hp;

    if (damageRatio >= BALANCE_STANDARDS.REDLINES.ONE_SHOT_THRESHOLD) {
      issues.push({
        level: 'REDLINE',
        type: 'one_shot_threat',
        msg: `敌人 [${enemy.name}] 单击伤害 (${damagePerHit}) 占同级我方角色 HP (${pStats.hp}) 的 ${Math.round(damageRatio * 100)}%，触碰秒杀红线 (${Math.round(BALANCE_STANDARDS.REDLINES.ONE_SHOT_THRESHOLD * 100)}%)`
      });
    }

    // 2. 检查掉落物合理性：必须有 HP 或 MP 产出生态
    if (enemy.drops && enemy.drops.length > 0) {
      const hasConsumable = enemy.drops.some(d => CONSUMABLES[d.itemId]);
      if (!hasConsumable) {
        issues.push({
          level: 'INFO',
          type: 'no_consumable_drop',
          msg: `敌人 [${enemy.name}] 无回复类补给掉落`
        });
      }
    }

    return issues;
  }

  /**
   * 全量扫描系统当前的所有配置，输出诊断报告
   */
  static runFullAudit() {
    const report = {
      timestamp: new Date().toISOString(),
      redlines: [],
      warnings: [],
      info: []
    };

    // 1. 扫描所有职业
    for (const [id, data] of Object.entries(CLASSES)) {
      const issues = this.validateClass(id, data);
      this._categorizeIssues(issues, report);
    }

    // 2. 扫描所有技能
    for (const [id, skill] of Object.entries(SKILLS)) {
      const issues = this.validateSkill(id, skill);
      this._categorizeIssues(issues, report);
    }

    // 3. 扫描所有武器
    for (const [id, weapon] of Object.entries(WEAPONS)) {
      const issues = this.validateWeapon(id, weapon);
      this._categorizeIssues(issues, report);
    }

    // 4. 扫描敌人与对位对抗（以初始张子骁作为基准参照物）
    const samplePlayer = {
      stats: { hp: 23, str: 7, def: 5, spd: 7, luk: 6 }
    };
    for (const [id, enemy] of Object.entries(ENEMIES)) {
      const issues = this.validateEnemy(id, enemy, samplePlayer);
      this._categorizeIssues(issues, report);
    }

    return report;
  }

  static _categorizeIssues(issues, report) {
    for (const issue of issues) {
      if (issue.level === 'REDLINE') report.redlines.push(issue);
      else if (issue.level === 'WARN') report.warnings.push(issue);
      else report.info.push(issue);
    }
  }
}
