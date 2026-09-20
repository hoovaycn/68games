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

          attackOptions.push({
            moveTile,
            targetPlayer,
            predictedDamage: pred.attacker.damage,
            canKill: pred.attacker.damage >= targetPlayer.currentHp,
            targetHp: targetPlayer.currentHp
          });
        }
      }
    }

    // 2. 如果存在可攻击选项
    if (attackOptions.length > 0) {
      // 优先级：先挑能击杀的 -> 再挑血量最低的 -> 再挑造成伤害最高的
      attackOptions.sort((a, b) => {
        if (a.canKill && !b.canKill) return -1;
        if (!a.canKill && b.canKill) return 1;
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

    // 朝最近玩家逼近：在 reachableTiles 中挑选距离最近玩家曼哈顿距离最小的格子
    reachableTiles.sort((a, b) => {
      const distA = Math.abs(a.x - nearestPlayer.x) + Math.abs(a.y - nearestPlayer.y);
      const distB = Math.abs(b.x - nearestPlayer.x) + Math.abs(b.y - nearestPlayer.y);
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
}
