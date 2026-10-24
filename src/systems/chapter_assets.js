// Follow the actual story links, not filename prefixes: a chapter may cross
// story files (e.g. Humen) and a battle may lead to a different scene file.
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
  const portraits = {
    MC_PORTRAIT: protagonist,
    MC_CORRUPTED_PORTRAIT: protagonist,
    ALLY_1_PORTRAIT: ally1,
    ALLY_1_CORRUPTED_PORTRAIT: ally1,
    ALLY_2_PORTRAIT: ally2,
    ALLY_2_CORRUPTED_PORTRAIT: ally2
  };
  const add = src => {
    if (!src) return;
    const key = /^\{([A-Z_0-9]+)\}$/.exec(src)?.[1];
    if (key) {
      if (portraits[key]) {
        images.add(`assets/art/${portraits[key]}_${key.includes('CORRUPTED') ? 'corrupted' : 'default'}@2x.png`);
      }
    } else {
      images.add(src);
    }
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
        add(line.leftPortrait);
        add(line.rightPortrait);
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
