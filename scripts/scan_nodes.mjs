import fs from 'fs';
import path from 'path';

const actFiles = [
  'story_prologue.js',
  ...Array.from({length: 19}, (_, i) => `story_chapter${i+1}.js`),
  'story_humen_origin.js'
];

async function scanAndRefineEmotions() {
  const proposal = [];

  for (const file of actFiles) {
    const modPath = path.resolve('src/data', file);
    const mod = await import('file:///' + modPath.replace(/\\/g, '/'));
    const expKey = Object.keys(mod)[0];
    const storyObj = mod[expKey];

    const scenes = [];
    if (storyObj.male) {
      for (const [k, v] of Object.entries(storyObj.male)) {
        if (v && v.dialogues) scenes.push({ sceneKey: `male.${k}`, scene: v, file, branch: 'male' });
      }
      for (const [k, v] of Object.entries(storyObj.female)) {
        if (v && v.dialogues) scenes.push({ sceneKey: `female.${k}`, scene: v, branch: 'female' });
      }
    } else {
      for (const [k, v] of Object.entries(storyObj)) {
        if (v && v.dialogues) scenes.push({ sceneKey: k, scene: v, branch: 'shared' });
      }
    }

    for (const sc of scenes) {
      const trans = sc.scene.transition || {};
      const isBattle = !!(trans.isBattleTrigger || trans.battleId || trans.type === 'BATTLE');
      
      const dialogues = sc.scene.dialogues || [];
      const totalCount = dialogues.length;

      for (let idx = 0; idx < totalCount; idx++) {
        const d = dialogues[idx];
        const speaker = d.speaker || '';
        const text = d.text || '';
        const sfx = d.sfx || '';
        const isNearEnd = idx >= totalCount - 2; // 场景末尾即将触发战斗/选择

        // 我们分析主角、副手、核心队友在当前句子的最佳表情
        // 关键逻辑：
        // 1. 如果处于战前场景（isBattle），且属于即将迎战的对话，或者人物在对峙、呵斥、拔出武器、下定决心：
        //    - 主角必须是 RESOLUTE！
        //    - 副手：范文默 FURY 或 PANIC，何妍熹 RESOLUTE！
        //    - 张希哲：SMIRK（挑衅）或 NERVOUS（面对强敌紧张）！
        //    - 覃瑞怡：RESOLUTE（倔强迎战）！
        //    - 朱晏泽：COMMAND（指挥）或 SHOCK（动摇）！
        //    - 徐老师：STERN（严厉对峙）！
        //    - 刘老师：PROTECTIVE（保护戒备）！
        //    - 海峰：ALERT（戒备临战）！

        // 2. 其它剧情场景中的特殊表情规则：
        //    - 突发震惊/黑化/异变/怪声/破门/发现真相 -> SHOCK (予诺/文默/妍熹/彦泽/子骁)
        //    - 悲伤/痛哭/自责/受伤 -> SAD (子骁), TEARFUL (予诺), CRYING (文默/瑞怡), PAIN (徐老师)
        //    - 释然/欣慰/打趣/温情 -> SMILE (子骁), THINKING (予诺日常推理), RELIEVED (瑞怡/刘老师), WARM (徐老师), LOVING (海峰), GENTLE (妍熹)
        
        proposal.push({
          file,
          sceneKey: sc.sceneKey,
          sceneTitle: sc.scene.title || '',
          isBattle,
          id: d.id,
          speaker,
          text,
          sfx,
          leftPortrait: d.leftPortrait,
          rightPortrait: d.rightPortrait,
          isNearEnd
        });
      }
    }
  }

  return proposal;
}

const lines = await scanAndRefineEmotions();
console.log(`总共扫描了 ${lines.length} 条对话节点`);
