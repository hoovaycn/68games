/**
 * 技能服务（V2 服务层）
 * 纯函数，不碰 DOM/UI；main.js 战斗流程调用本模块查技能、判 MP、结算技能效果。
 *
 * 职责：
 *  1. getUnitSkills(unit)          —— 单位可用技能（个人技 + 职业技）
 *  2. canCastSkill(unit, skill)    —— MP 是否足够释放
 *  3. predictSkillDamage(...)      —— damage 技能预测伤害（UI 面板用）
 *  4. applySkill(...)              —— 结算技能效果（heal/buff/debuff/damage），不扣 MP
 *  5. clearTurnBuffs(unit)         —— 清除 turn/nextAttack 临时 buff（回合结束调用）
 */
import { SKILLS } from '../data/skills.js';

// 可直接写入 unit.stats 的基础属性；avoid/hit/crit 是派生值，只进 tempBuffs 由 combat 公式读
const BASE_STATS = new Set(['str', 'mag', 'skl', 'spd', 'luk', 'def', 'res', 'mov']);

/** 单位可用技能：个人技（ownerUnit 匹配）+ 职业技（ownerClass 匹配） */
export function getUnitSkills(unit) {
  if (!unit) return [];
  const skills = [];
  for (const s of Object.values(SKILLS)) {
    if (s.scope === 'personal' && s.ownerUnit === unit.id) skills.push(s);
    else if (s.scope === 'class' && s.ownerClass === unit.classId) skills.push(s);
  }
  return skills;
}

/** 当前 MP 是否足够释放该技能 */
export function canCastSkill(unit, skill) {
  return !!unit && !!skill && (unit.currentMp || 0) >= (skill.mpCost || 0);
}

/** 技能是否已解锁（无 unlockLevel 视为 1 级解锁，个人技/基础职业技默认可用） */
export function isSkillUnlocked(unit, skill) {
  if (!unit || !skill) return false;
  const req = skill.unlockLevel || 1;
  return (unit.level || 1) >= req;
}

/** damage 技能预测伤害：power(str/mag) + might - 对应防御(def/res)，下限 0 */
export function predictSkillDamage(caster, target, skill) {
  if (!caster || !target || !skill || skill.effect?.kind !== 'damage') return 0;
  const power = skill.effect.power === 'mag' ? caster.stats.mag : caster.stats.str;
  const defense = skill.effect.power === 'mag' ? target.stats.res : target.stats.def;
  return Math.max(0, power + (skill.effect.might || 0) - defense);
}

/**
 * 结算技能效果（不扣 MP，由调用方先扣）。
 * @returns {{kind:string, text:string, hpChange:number}}
 */
export function applySkill(caster, target, skill) {
  const eff = skill.effect;
  const result = { kind: eff.kind, text: skill.name, hpChange: 0 };

  if (eff.kind === 'heal') {
    const before = target.currentHp;
    // 治疗量随施法者魔力小幅成长（mag/3 取整），让奶量随等级/成长提升
    const healAmt = (eff.amount || 0) + Math.floor((caster.stats?.mag || 0) / 3);
    target.currentHp = Math.min(target.stats.maxHp, target.currentHp + healAmt);
    result.hpChange = target.currentHp - before;
    result.text = `HP +${result.hpChange}`;
  } else if (eff.kind === 'damage') {
    const dmg = predictSkillDamage(caster, target, skill);
    target.currentHp = Math.max(0, target.currentHp - dmg);
    result.hpChange = -dmg;
    result.text = `${target.name} -${dmg}`;
  } else if (eff.kind === 'buff' || eff.kind === 'debuff') {
    target.tempBuffs = target.tempBuffs || {};
    target.tempBuffDurations = target.tempBuffDurations || {};
    for (const [stat, value] of Object.entries(eff.stats || {})) {
      target.tempBuffs[stat] = (target.tempBuffs[stat] || 0) + value;
      target.tempBuffDurations[stat] = skill.duration;
      if (BASE_STATS.has(stat)) {
        target.stats[stat] = (target.stats[stat] || 0) + value;
      }
    }
  }

  return result;
}

/** 清除 turn / nextAttack 的临时 buff（battle 持续整场，不清） */
export function clearTurnBuffs(unit) {
  if (!unit || !unit.tempBuffs) return;
  for (const [stat, value] of Object.entries(unit.tempBuffs)) {
    const dur = unit.tempBuffDurations?.[stat];
    // 未显式声明 duration（如道具 spd buff）默认按 turn 处理
    if (dur === 'turn' || dur === 'nextAttack' || dur === undefined || dur === null) {
      if (BASE_STATS.has(stat)) {
        unit.stats[stat] = (unit.stats[stat] || 0) - value;
      }
      delete unit.tempBuffs[stat];
      if (unit.tempBuffDurations) delete unit.tempBuffDurations[stat];
    }
  }
}
