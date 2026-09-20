/**
 * 战斗平衡性自动化模拟脚本
 * 
 * 用于快速模拟测试游戏中各个章节的战斗平衡性。
 * 通过脱离 UI，直接在内存中让程序控制敌我双方互相战斗，从而评估胜率和平均回合数。
 * 
 * 运行方式:
 * node scripts/simulate_balance.mjs
 */
import { CH0_BATTLE1 } from '../src/data/chapters/ch0_battle1.js';
import { CH0_BATTLE2 } from '../src/data/chapters/ch0_battle2.js';
import { CH0_BATTLE3 } from '../src/data/chapters/ch0_battle3.js';
import { CH1_BATTLE1 } from '../src/data/chapters/ch1_battle1.js';
import { CH2_BATTLE1 } from '../src/data/chapters/ch2_battle1.js';
import { CH8_BATTLE1 } from '../src/data/chapters/ch8_battle1.js';
import { createPlayerUnit, createEnemyUnit, gainExp, expForKill } from '../src/systems/growth.js';
import { CombatSystem } from '../src/systems/combat.js';
import { applySkill } from '../src/systems/skill_service.js';

// 我们把所有关卡放在一个数组里
const CHAPTERS = [
  CH0_BATTLE1,
  CH0_BATTLE2,
  CH0_BATTLE3,
  CH1_BATTLE1,
  CH2_BATTLE1,
  CH8_BATTLE1
];

// 简易AI逻辑
function simpleAiTurn(attacker, enemies) {
  // 找能打到的敌人，打能打出最大伤害的
  let bestTarget = null;
  let maxDmg = -1;
  let bestPreview = null;

  for (const enemy of enemies) {
    if (!enemy.isAlive) continue;
    const dist = Math.abs(attacker.x - enemy.x) + Math.abs(attacker.y - enemy.y);
    // 假设他们都能走到面前（这里简化，不走格子，直接算面对面能打出的伤害）
    const preview = CombatSystem.predictBattle(attacker, enemy, null, null);
    
    // 如果无法造成伤害，跳过
    if (preview.attacker.damage > maxDmg) {
      maxDmg = preview.attacker.damage;
      bestTarget = enemy;
      bestPreview = preview;
    }
  }

  return { target: bestTarget, preview: bestPreview };
}

async function simulateBattle(chapterTemplate, party, isLogging) {
  // 1. 初始化战场
  const playerUnits = party.filter(u => u.isAlive);
  const enemyUnits = (chapterTemplate.enemyDeploy || []).map(e => {
    const enemy = createEnemyUnit(e.enemyId, e.level || 1, e.overrides);
    enemy.x = e.x;
    enemy.y = e.y;
    return enemy;
  });

  // 简易布局：忽略真实坐标，直接按距离算（这里为了测试，假设都在射程内）
  
  let turn = 1;
  while (playerUnits.some(u => u.isAlive) && enemyUnits.some(u => u.isAlive) && turn < 100) {
    // 玩家回合
    for (const p of playerUnits) {
      if (!p.isAlive) continue;
      const { target } = simpleAiTurn(p, enemyUnits);
      if (target) {
        // 模拟战斗（忽略地形，简化）
        const result = CombatSystem.executeCombat(p, target, null, null);
        if (isLogging) {
          console.log(`[Turn ${turn}] ${p.name} 攻击 ${target.name}, 造成伤害. 目标HP: ${target.currentHp}`);
        }
      } else {
        // 尝试奶人
        const lowHpAlly = playerUnits.find(u => u.isAlive && u.currentHp < u.stats.maxHp);
        if (lowHpAlly && p.currentMp >= 5) { // 简单模拟技能
            p.currentMp -= 5;
            lowHpAlly.currentHp = Math.min(lowHpAlly.stats.maxHp, lowHpAlly.currentHp + 10);
            if (isLogging) console.log(`[Turn ${turn}] ${p.name} 治疗 ${lowHpAlly.name}. 目标HP: ${lowHpAlly.currentHp}`);
        }
      }
    }

    // 敌方回合
    for (const e of enemyUnits) {
      if (!e.isAlive) continue;
      const { target } = simpleAiTurn(e, playerUnits);
      if (target) {
        const result = CombatSystem.executeCombat(e, target, null, null);
        if (isLogging) {
          console.log(`[Turn ${turn}] (敌) ${e.name} 攻击 ${target.name}. 目标HP: ${target.currentHp}`);
        }
      }
    }
    
    turn++;
  }

  let win = false;
  if (chapterTemplate.objective && chapterTemplate.objective.type === 'defeat_boss') {
    const boss = enemyUnits.find(u => u.id === chapterTemplate.enemyDeploy.find(d => d.instanceId?.startsWith('boss') || d.enemyId.includes('boss'))?.enemyId || enemyUnits[0].id);
    win = playerUnits.some(u => u.isAlive) && (!boss || !boss.isAlive);
  } else {
    win = playerUnits.some(u => u.isAlive) && !enemyUnits.some(u => u.isAlive);
  }
  
  return { win, turns: turn };
}

async function runSimulations() {
  console.log('=== 开始平衡性模拟 ===');
  
  const iterations = 100;
  
  for (let i = 0; i < CHAPTERS.length; i++) {
    const chapter = CHAPTERS[i];
    let wins = 0;
    let totalTurns = 0;

    for (let j = 0; j < iterations; j++) {
      // 每次模拟重置玩家队伍
      const zhangzixiao = createPlayerUnit('zhangzixiao');
      const shiyunuo = createPlayerUnit('shiyunuo');
      const chenpinxuan = createPlayerUnit('chenpinxuan');
      const fanwenmo = createPlayerUnit('fanwenmo');
      
      // 简单模拟等级提升：每过一章，队伍等级+2
      for (const u of [zhangzixiao, shiyunuo, chenpinxuan, fanwenmo]) {
        for (let k = 0; k < i * 2; k++) {
            gainExp(u, 100);
        }
        u.currentHp = u.stats.maxHp;
        u.currentMp = u.stats.maxMp || 20;
      }
      
      let party = [];
      for (const pd of chapter.playerDeploy) {
         let u = null;
         if (pd.unitId === 'zhangzixiao') u = zhangzixiao;
         else if (pd.unitId === 'shiyunuo') u = shiyunuo;
         else if (pd.unitId === 'chenpinxuan') u = chenpinxuan;
         else if (pd.unitId === 'fanwenmo') u = fanwenmo;
         else u = createPlayerUnit(pd.unitId);
         
         // 给非主角单位也升升级
         if (!['zhangzixiao', 'shiyunuo', 'chenpinxuan', 'fanwenmo'].includes(pd.unitId)) {
            for (let k = 0; k < i * 2; k++) {
              gainExp(u, 100);
            }
            u.currentHp = u.stats.maxHp;
            u.currentMp = u.stats.maxMp || 20;
         }
         party.push(u);
      }

      const { win, turns } = await simulateBattle(chapter, party, false);
      if (win) wins++;
      totalTurns += turns;
    }
    
    console.log(`章节 [${chapter.name}]: 胜率 ${wins}/${iterations} (${wins}%)，平均回合数: ${(totalTurns/iterations).toFixed(1)}`);
  }
}

runSimulations().catch(console.error);