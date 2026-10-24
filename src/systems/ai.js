import { CombatSystem } from './combat.js';
import { WEAPONS } from '../data/weapons.js';
import { SUBDIVIDE } from './grid.js';

/**
 * 战棋敌人 AI 决策机
 */
export class EnemyAI {
  /**
   * 为指定敌人计算单回合最佳行动
   * 返回: { action: 'attack'|'move'|'wait', targetTile: {x,y}, attackTarget: Unit|null }
   */
  static decide(enemyUnit, playerUnits, gridSystem, allUnits) {
    const alivePlayers = playerUnits.filter(p => p.isAlive);
    if (alivePlayers.length === 0) {
      return { action: 'wait', targetTile: { x: enemyUnit.x, y: enemyUnit.y }, attackTarget: null };
    }

    const weapon = WEAPONS[enemyUnit.equippedWeapon] || WEAPONS.pencil;
    const reachableTiles = gridSystem.getReachableTiles(
      enemyUnit.x,
      enemyUnit.y,
      enemyUnit.stats.mov,
      enemyUnit.faction,
      allUnits
    );

    // 1. 寻找能在本回合移动并攻击到的玩家单位
    const attackOptions = [];

    for (const moveTile of reachableTiles) {
      const attackRangeTiles = gridSystem.getAttackableTiles(
        moveTile.x,
        moveTile.y,
        weapon.range[0],
        weapon.range[1]
      );

      for (const atkTile of attackRangeTiles) {
        const targetPlayer = alivePlayers.find(p => p.x === atkTile.x && p.y === atkTile.y);
        if (targetPlayer) {
          const pred = CombatSystem.predictBattle(
            enemyUnit,
            targetPlayer,
            gridSystem.getTerrain(moveTile.x, moveTile.y),
            gridSystem.getTerrain(targetPlayer.x, targetPlayer.y)
          );

          // 反击风险评估：目标反击（含追击）会对敌人造成多少期望伤害，是否致命
          const counterHits = pred.defender.isDouble ? 2 : 1;
          const counterDamage = pred.defender.canCounter
            ? pred.defender.damage * counterHits * (pred.defender.hit / 100)
            : 0;

          attackOptions.push({
            moveTile,
            targetPlayer,
            predictedDamage: pred.attacker.damage,
            canKill: pred.attacker.damage >= targetPlayer.currentHp,
            targetHp: targetPlayer.currentHp,
            counterDamage,
            counterLethal: counterDamage >= enemyUnit.currentHp
          });
        }
      }
    }

    // 2. 如果存在可攻击选项
    if (attackOptions.length > 0) {
      // 优先级：能击杀 > 避开会被反击致死的目标 > 反击期望越低越好（优先打脆皮）> 血量最低 > 造成伤害最高
      attackOptions.sort((a, b) => {
        if (a.canKill !== b.canKill) return a.canKill ? -1 : 1;
        if (a.counterLethal !== b.counterLethal) return a.counterLethal ? 1 : -1;
        if (a.counterDamage !== b.counterDamage) return a.counterDamage - b.counterDamage;
        if (a.targetHp !== b.targetHp) return a.targetHp - b.targetHp;
        return b.predictedDamage - a.predictedDamage;
      });

      const best = attackOptions[0];
      return {
        action: 'attack',
        targetTile: best.moveTile,
        attackTarget: best.targetPlayer
      };
    }

    // 3. 无法在本回合攻击到任何玩家：根据 AI 类型决定是否靠近
    const nearestPlayer = this.findNearestPlayer(enemyUnit, alivePlayers);
    const dist = Math.abs(enemyUnit.x - nearestPlayer.x) + Math.abs(enemyUnit.y - nearestPlayer.y);

    const aiConfig = enemyUnit.ai || { type: 'aggressive_chase', aggroRadius: 6 };

    // 守摊型 AI：若玩家未进入警戒半径，则在原地不动
    if (aiConfig.type === 'passive_guard' && dist > (aiConfig.aggroRadius || 4) * SUBDIVIDE) {
      return { action: 'wait', targetTile: { x: enemyUnit.x, y: enemyUnit.y }, attackTarget: null };
    }

    // 朝「最值得追击」的玩家逼近：距离接近时优先脆皮，避免无脑扑向前排肉盾被反杀
    const chaseTarget = this.findChaseTarget(enemyUnit, alivePlayers);
    reachableTiles.sort((a, b) => {
      const distA = Math.abs(a.x - chaseTarget.x) + Math.abs(a.y - chaseTarget.y);
      const distB = Math.abs(b.x - chaseTarget.x) + Math.abs(b.y - chaseTarget.y);
      return distA - distB;
    });

    const bestMoveTile = reachableTiles[0] || { x: enemyUnit.x, y: enemyUnit.y };
    return {
      action: 'move',
      targetTile: bestMoveTile,
      attackTarget: null
    };
  }

  static findNearestPlayer(enemy, players) {
    let best = players[0];
    let minDist = Infinity;
    for (const p of players) {
      const d = Math.abs(enemy.x - p.x) + Math.abs(enemy.y - p.y);
      if (d < minDist) {
        minDist = d;
        best = p;
      }
    }
    return best;
  }

  /**
   * 挑选追击目标：与 findNearestPlayer 不同，这里在「距离接近」时优先追脆皮（低防低血），
   * 避免敌人傻乎乎冲向顶在前排的高防高反击肉盾。距离仍占主导，脆皮太远时不会绕远路。
   */
  static findChaseTarget(enemy, players) {
    let best = players[0];
    let bestScore = Infinity;
    for (const p of players) {
      const dist = Math.abs(enemy.x - p.x) + Math.abs(enemy.y - p.y);
      const def = (p.stats && typeof p.stats.def === 'number') ? p.stats.def : 0;
      const hp = (typeof p.currentHp === 'number' && Number.isFinite(p.currentHp)) ? p.currentHp : 0;
      // 脆弱度 = 防御 + 血量折算（越低越好打）；距离乘 6，让约 1 格的差距即可倾斜向脆皮
      const squish = def + hp / 8;
      const score = dist * 6 + squish;
      if (score < bestScore) {
        bestScore = score;
        best = p;
      }
    }
    return best;
  }
}
