import { WEAPONS } from '../data/weapons.js';
import { ITEMS } from '../data/items.js';
import { SUBDIVIDE } from './grid.js';

/**
 * 火焰纹章（FE）经典数值与战斗系统
 */
export class CombatSystem {

  // 计算单位的攻击速度 (AS)
  static getAttackSpeed(unit) {
    const weapon = WEAPONS[unit.equippedWeapon] || WEAPONS.pencil;
    const effectiveWeight = Math.max(0, weapon.weight - Math.floor(unit.stats.str / 5));
    return Math.max(0, unit.stats.spd - effectiveWeight);
  }

  // 计算攻击力 (Attack)
  static getAttackPower(unit) {
    const weapon = WEAPONS[unit.equippedWeapon] || WEAPONS.pencil;
    if (weapon.type === 'magic') {
      return unit.stats.mag + weapon.might;
    }
    return unit.stats.str + weapon.might;
  }

  // 计算单位回避率 (Avoid)
  static getAvoid(unit, terrain) {
    const as = this.getAttackSpeed(unit);
    const terrainAvoid = (terrain && terrain.avoid) || 0;
    return as * 2 + unit.stats.luk + terrainAvoid + (unit.tempBuffs?.avoid || 0);
  }

  // 计算命中率 (Hit)
  static getHitRate(unit) {
    const weapon = WEAPONS[unit.equippedWeapon] || WEAPONS.pencil;
    return weapon.hit + unit.stats.skl * 2 + Math.floor(unit.stats.luk / 2) + (unit.tempBuffs?.hit || 0);
  }

  // 计算必杀率 (Crit)
  static getCritRate(unit) {
    const weapon = WEAPONS[unit.equippedWeapon] || WEAPONS.pencil;
    return weapon.crit + Math.floor(unit.stats.skl / 2) + (unit.tempBuffs?.crit || 0);
  }

  // 曼哈顿距离
  static getDistance(u1, u2) {
    return Math.abs(u1.x - u2.x) + Math.abs(u1.y - u2.y);
  }

  // 判定武器是否在该距离内可攻击
  static canAttackAtDistance(weapon, dist) {
    return dist >= weapon.range[0] * SUBDIVIDE && dist <= weapon.range[1] * SUBDIVIDE;
  }

  /**
   * 计算战斗前预测（战斗面板 UI 专用）
   */
  static predictBattle(attacker, defender, attackerTerrain, defenderTerrain) {
    const dist = this.getDistance(attacker, defender);
    const atkWeapon = WEAPONS[attacker.equippedWeapon] || WEAPONS.pencil;
    const defWeapon = WEAPONS[defender.equippedWeapon] || WEAPONS.pencil;

    // 攻方能否打到守方
    const attackerCanHit = this.canAttackAtDistance(atkWeapon, dist);
    // 守方能否反击 (守方武器射程是否覆盖该距离)
    const defenderCanCounter = this.canAttackAtDistance(defWeapon, dist);

    // 攻方伤害预测
    const defDefense = (defenderTerrain ? defenderTerrain.def || 0 : 0) + defender.stats.def;
    const atkRawDamage = Math.max(0, this.getAttackPower(attacker) - defDefense);
    const atkHit = Math.max(0, Math.min(100, this.getHitRate(attacker) - this.getAvoid(defender, defenderTerrain)));
    const atkCrit = Math.max(0, Math.min(100, this.getCritRate(attacker) - defender.stats.luk));

    // 攻速对比与追击判定
    const atkAS = this.getAttackSpeed(attacker);
    const defAS = this.getAttackSpeed(defender);
    const attackerDouble = (atkAS - defAS) >= 5;
    const defenderDouble = (defAS - atkAS) >= 5 && defenderCanCounter;

    // 守方反击预测
    let defRawDamage = 0;
    let defHit = 0;
    let defCrit = 0;

    if (defenderCanCounter) {
      const atkDefense = (attackerTerrain ? attackerTerrain.def || 0 : 0) + attacker.stats.def;
      defRawDamage = Math.max(0, this.getAttackPower(defender) - atkDefense);
      defHit = Math.max(0, Math.min(100, this.getHitRate(defender) - this.getAvoid(attacker, attackerTerrain)));
      defCrit = Math.max(0, Math.min(100, this.getCritRate(defender) - attacker.stats.luk));
    }

    return {
      attacker: {
        unit: attacker,
        weapon: atkWeapon,
        damage: atkRawDamage,
        hit: atkHit,
        crit: atkCrit,
        isDouble: attackerDouble,
        canAttack: attackerCanHit
      },
      defender: {
        unit: defender,
        weapon: defWeapon,
        damage: defRawDamage,
        hit: defHit,
        crit: defCrit,
        isDouble: defenderDouble,
        canCounter: defenderCanCounter
      }
    };
  }

  /**
   * 实际执行一轮战斗轮转
   * 顺序：
   * 1. 攻方先手
   * 2. 若守方存活且可反击 -> 守方反击
   * 3. 若攻方追击且守方存活 -> 攻方二连击
   * 4. 若守方追击且攻方存活 -> 守方二连击
   */
  static executeCombat(attacker, defender, attackerTerrain, defenderTerrain) {
    const preview = this.predictBattle(attacker, defender, attackerTerrain, defenderTerrain);
    const rounds = [];
    let currentAttackerHp = attacker.currentHp;
    let currentDefenderHp = defender.currentHp;

    const performSingleHit = (source, target, pred, isAttackerSide) => {
      const rollHit = Math.random() * 100;
      const isHit = rollHit < pred.hit;
      let damageDealt = 0;
      let isCrit = false;

      if (isHit) {
        const rollCrit = Math.random() * 100;
        isCrit = rollCrit < pred.crit;
        damageDealt = isCrit ? pred.damage * 3 : pred.damage;
      }

      if (isAttackerSide) {
        currentDefenderHp = Math.max(0, currentDefenderHp - damageDealt);
      } else {
        currentAttackerHp = Math.max(0, currentAttackerHp - damageDealt);
      }

      rounds.push({
        sourceId: source.id,
        sourceName: source.name,
        targetId: target.id,
        targetName: target.name,
        isHit,
        isCrit,
        damage: damageDealt,
        attackerHpAfter: currentAttackerHp,
        defenderHpAfter: currentDefenderHp
      });
    };

    // 1. 攻方攻击
    performSingleHit(attacker, defender, preview.attacker, true);

    // 2. 守方反击
    if (currentDefenderHp > 0 && preview.defender.canCounter) {
      performSingleHit(defender, attacker, preview.defender, false);
    }

    // 3. 攻方追击
    if (currentDefenderHp > 0 && currentAttackerHp > 0 && preview.attacker.isDouble) {
      performSingleHit(attacker, defender, preview.attacker, true);
    }

    // 4. 守方追击
    if (currentDefenderHp > 0 && currentAttackerHp > 0 && preview.defender.isDouble) {
      performSingleHit(defender, attacker, preview.defender, false);
    }

    // 更新实际血量
    attacker.currentHp = currentAttackerHp;
    defender.currentHp = currentDefenderHp;

    if (attacker.currentHp <= 0) attacker.isAlive = false;
    if (defender.currentHp <= 0) defender.isAlive = false;

    // 经验结算 (攻方)
    let expGained = 0;
    if (attacker.faction === 'player') {
      const levelDiff = defender.level - attacker.level;
      if (!defender.isAlive) {
        // 击杀经验
        expGained = Math.max(20, 30 + levelDiff * 10);
      } else {
        // 参与交战经验
        expGained = Math.max(5, 10 + levelDiff * 2);
      }
      attacker.exp += expGained;
      // 升级判定
      let leveledUp = false;
      if (attacker.exp >= 100) {
        attacker.exp -= 100;
        attacker.level += 1;
        leveledUp = true;
      }
      attacker.lastLevelUp = leveledUp;
    }

    // 掉落物判定
    const droppedItems = [];
    if (!defender.isAlive && defender.drops && defender.drops.length > 0) {
      for (const drop of defender.drops) {
        if (Math.random() <= drop.chance) {
          droppedItems.push(drop.itemId);
          // 加入攻方背包
          if (attacker.inventory) {
            const existing = attacker.inventory.find(i => i.id === drop.itemId);
            if (existing) {
              existing.count += 1;
            } else {
              attacker.inventory.push({ id: drop.itemId, count: 1 });
            }
          }
        }
      }
    }

    return {
      rounds,
      expGained,
      defenderDefeated: !defender.isAlive,
      attackerDefeated: !attacker.isAlive,
      droppedItems
    };
  }

  /**
   * 使用道具
   */
  static useItem(unit, itemId) {
    const item = ITEMS[itemId];
    if (!item) return { success: false, msg: '不存在的道具' };
    if (item.kind === 'key_item') return { success: false, msg: '剧情道具不能当作普通消耗品使用' };

    const invItem = unit.inventory.find(i => i.id === itemId);
    if (!invItem || invItem.count <= 0) {
      return { success: false, msg: '背包中没有该道具' };
    }

    let appliedMsg = '';
    let hpRestored = 0;
    for (const eff of item.effects) {
      if (eff.stat === 'hp') {
        const oldHp = unit.currentHp;
        unit.currentHp = Math.min(unit.stats.maxHp, unit.currentHp + eff.value);
        const restored = unit.currentHp - oldHp;
        hpRestored += restored;
        appliedMsg += `恢复了 ${restored} 点 HP！`;
      } else if (eff.stat === 'mp') {
        const oldMp = unit.currentMp ?? unit.currentSp ?? 0;
        const maxMp = unit.stats.maxMp ?? unit.stats.maxSp ?? 20;
        const newMp = Math.min(maxMp, oldMp + eff.value);
        unit.currentMp = newMp;
        unit.currentSp = newMp;
        const restoredMp = newMp - oldMp;
        appliedMsg += ` 恢复了 ${restoredMp} 点 MP！`;
      } else if (eff.stat === 'spd') {
        unit.tempBuffs = unit.tempBuffs || {};
        unit.tempBuffs.spd = (unit.tempBuffs.spd || 0) + eff.value;
        unit.stats.spd += eff.value;
        appliedMsg += ` 本回合攻速 +${eff.value}！`;
      }
    }

    // 消耗
    invItem.count -= 1;
    if (invItem.count <= 0) {
      unit.inventory = unit.inventory.filter(i => i.id !== itemId);
    }

    return { success: true, msg: appliedMsg, hpRestored, itemName: item.name };
  }
}
