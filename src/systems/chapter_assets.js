// Follow the actual story links, not filename prefixes: a chapter may cross
// story files (e.g. Humen) and a battle may lead to a different scene file.
import { artForEmotion } from '../engine/avatar.js';

export function collectChapterAssets(entry, story, battles, chapterEntries, route, units, enemies) {
  const entries = new Set(chapterEntries);
  const scenes = new Set();
  const battleIds = new Set();
  const images = new Set();
  const tilesets = new Map();
  const queue = [entry];
  const protagonist = route === 'female' ? 'shiyunuo' : 'zhangzixiao';
  const ally1 = route === 'female' ? 'chenpinxuan' : 'zhanghanyu';
  const ally2 = route === 'female' ? 'heyanxi' : 'fanwenmo';
  const mcAdult = route === 'female' ? 'shiyunuo-adult' : 'zhangzixiao-adult';
  const ally2Adult = route === 'female' ? 'heyanxi-adult' : 'fanwenmo-adult';
  const actorRefs = {
    '{MC}': protagonist,
    '{MC}-corrupted': route === 'female' ? 'shiyunuo-corrupted' : 'zhangzixiao-corrupted',
    '{MC_ADULT}': mcAdult,
    '{MC_ADULT}-dissolve': route === 'female' ? 'shiyunuo-adult-dissolve' : 'zhangzixiao-adult-dissolve',
    '{ALLY_1}': ally1,
    '{ALLY_1}-corrupted': route === 'female' ? 'chenpinxuan-corrupted' : 'zhanghanyu-corrupted',
    '{ALLY_2}': ally2,
    '{ALLY_2}-corrupted': route === 'female' ? 'heyanxi-corrupted' : 'fanwenmo-corrupted',
    '{ALLY_2_ADULT}': ally2Adult,
    '{ALLY_2_ADULT}-dissolve': route === 'female' ? 'heyanxi-adult-dissolve' : 'fanwenmo-adult-dissolve'
  };
  const add = src => {
    if (!src) return;
    images.add(src);
  };
  const addArt = (actor, emotion) => {
    if (!actor) return;
    const resolved = actorRefs[actor] ?? actor;
    const url = artForEmotion(resolved, emotion, '2x');
    if (url) images.add(url);
  };
  while (queue.length) {
    const key = queue.shift();
    if (!key || key === 'title_screen' || (key !== entry && entries.has(key))
        || scenes.has(key)) continue;
    const scene = story[key];
    if (!scene) continue;
    scenes.add(key);
    add(scene.bgImg);
    add(scene.bgImgFallback);
    for (const line of scene.dialogues || []) {
      add(line.bgImg);
      if (!line.hidePortraits) {
        addArt(line.leftPortrait, line.leftEmotion);
        addArt(line.rightPortrait, line.rightEmotion);
      }
    }
    const transition = scene.transition || {};
    if (transition.battleId) {
      const battle = battles[transition.battleId];
      if (battle && !battleIds.has(transition.battleId)) {
        battleIds.add(transition.battleId);
        for (const deploy of battle.playerDeploy || []) {
          let id = deploy.unitId;
          if (id === '{MC_ID}' || id === 'zhangzixiao') id = protagonist;
          else if (id === '{ALLY_ID}' || id === 'zhanghanyu') id = ally1;
          else if (id === 'fanwenmo') id = ally2;
          add(units[id]?.portrait);
        }
        for (const deploy of [...(battle.enemyDeploy || []),
          ...(battle.reinforcements || []).flatMap(wave => wave.units || [])]) {
          let id = deploy.enemyId;
          if (id === '{BOSS_ID}' || (battle.id === 'ch0_battle3' && id === 'fanwenmo_corrupted')) {
            id = `${ally2}_corrupted`;
          } else if (route === 'female') {
            id = ({
              zhangzixiao_corrupted: 'shiyunuo_corrupted',
              zhanghanyu_corrupted: 'chenpinxuan_corrupted',
              fanwenmo_corrupted: 'heyanxi_corrupted'
            })[id] || id;
          }
          add(enemies[id]?.portrait);
        }
        if (battle.tiledData) {
          const data = battle.tiledData;
          const gids = new Set([...(data.bgGrid || []).flat(), ...(data.decGrid || []).flat()]
            .map(gid => (gid & 0x1fffffff) >>> 0).filter(Boolean));
          for (const ts of data.tilesets || []) {
            if ([...gids].some(gid => gid >= ts.firstgid && gid < ts.firstgid + ts.total)) {
              tilesets.set(ts.src, ts);
            }
          }
        } else {
          add('assets/tiles/kenney/roguelikeCity_full_transparent.png');
          for (const prop of battle.props || []) add(prop.img);
          for (const terrain of Object.values(battle.terrainTypes || {})) add(terrain.tileImg);
        }
        queue.push(battle.nextStorySceneOnWin);
      }
    }
    queue.push(transition.targetScene);
  }
  return { scenes, battleIds, images, tilesets: [...tilesets.values()] };
}
