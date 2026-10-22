const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const CHAPTER_CONFIGS = [
  {
    id: 'ch0_battle1',
    tmx: 'docs/map/tiled_project/ch0_battle1.tmx',
    js: 'src/data/chapters/ch0_battle1.js',
    playerUnits: ['{MC_ID}'],
    enemyUnits: [{ enemyId: 'vendor', instanceId: 'vendor_boss' }]
  },
  {
    id: 'ch0_battle2',
    tmx: 'docs/map/tiled_project/ch0_battle2.tmx',
    js: 'src/data/chapters/ch0_battle2.js',
    playerUnits: ['{MC_ID}'],
    enemyUnits: [
      { enemyId: 'punk', instanceId: 'punk_1' },
      { enemyId: 'punk', instanceId: 'punk_2' }
    ]
  },
  {
    id: 'ch0_battle3',
    tmx: 'docs/map/tiled_project/ch0_battle3.tmx',
    js: 'src/data/chapters/ch0_battle3.js',
    playerUnits: ['{MC_ID}', '{ALLY_ID}'],
    enemyUnits: [{ enemyId: '{BOSS_ID}', instanceId: 'boss_1' }]
  },
  {
    id: 'ch1_battle1',
    tmx: 'docs/map/tiled_project/ch1_battle1.tmx',
    js: 'src/data/chapters/ch1_battle1.js',
    playerUnits: ['xu_laoshi', 'zhangzixiao', 'zhangxizhe', 'qinruiyi'],
    enemyUnits: [
      { enemyId: 'teacher_pe_corrupted', instanceId: 'boss_pe_teacher' },
      { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_1' },
      { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_2' },
      { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_3' },
      { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_4' }
    ]
  },
  {
    id: 'ch2_battle1',
    tmx: 'docs/map/tiled_project/ch2_battle1.tmx',
    js: 'src/data/chapters/ch2_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo'],
    enemyUnits: [
      { enemyId: 'zhuyanze_corrupted', instanceId: 'boss_zhuyanze' },
      { enemyId: 'classmate_boy_corrupted', instanceId: 'boy_1' },
      { enemyId: 'classmate_girl_corrupted', instanceId: 'girl_1' },
      { enemyId: 'classmate_boy_corrupted', instanceId: 'boy_2' },
      { enemyId: 'classmate_girl_corrupted', instanceId: 'girl_2' }
    ]
  },
  {
    id: 'ch3_battle1',
    tmx: 'docs/map/tiled_project/ch3_battle1.tmx',
    js: 'src/data/chapters/ch3_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'qinruiyi', 'zhuyanze', 'xu_laoshi', 'liu_laoshi'],
    enemyUnits: [
      { enemyId: 'zhangxizhe_corrupted', instanceId: 'boss_zhangxizhe' },
      { enemyId: 'senior_athlete_leader_corrupted', instanceId: 'athlete_leader' },
      { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_a' },
      { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_b' }
    ]
  },
  {
    id: 'ch4_battle1',
    tmx: 'docs/map/tiled_project/ch4_battle1.tmx',
    js: 'src/data/chapters/ch4_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze', 'xu_laoshi', 'liu_laoshi'],
    enemyUnits: [
      { enemyId: 'coach_corrupted', instanceId: 'coach_boss' },
      { enemyId: 'senior_athlete_leader_corrupted', instanceId: 'athlete_leader' },
      { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_a' },
      { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_b' },
      { enemyId: 'classmate_boy_corrupted', instanceId: 'runner_a' },
      { enemyId: 'classmate_girl_corrupted', instanceId: 'runner_b' }
    ]
  },
  {
    id: 'ch5_battle1',
    tmx: 'docs/map/tiled_project/ch5_battle1.tmx',
    js: 'src/data/chapters/ch5_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'xu_laoshi', 'liu_laoshi'],
    enemyUnits: [
      { enemyId: 'classmate_boy_corrupted', instanceId: 'cm_boy_a' },
      { enemyId: 'classmate_girl_corrupted', instanceId: 'cm_girl_a' },
      { enemyId: 'classmate_boy_corrupted', instanceId: 'cm_boy_b' },
      { enemyId: 'classmate_girl_corrupted', instanceId: 'cm_girl_b' }
    ]
  },
  {
    id: 'ch6_battle1',
    tmx: 'docs/map/tiled_project/ch6_battle1.tmx',
    js: 'src/data/chapters/ch6_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'xu_laoshi', 'liu_laoshi'],
    enemyUnits: [
      { enemyId: 'zhangxizhe_corrupted', instanceId: 'boss_xizhe' },
      { enemyId: 'qinruiyi_corrupted', instanceId: 'boss_ruiyi' },
      { enemyId: 'zhuyanze_corrupted', instanceId: 'boss_yanze' },
      { enemyId: 'classmate_boy_corrupted', instanceId: 'cm_boy_a' },
      { enemyId: 'classmate_girl_corrupted', instanceId: 'cm_girl_a' },
      { enemyId: 'classmate_boy_corrupted', instanceId: 'cm_boy_b' }
    ]
  },
  {
    id: 'ch7_battle1',
    tmx: 'docs/map/tiled_project/ch7_battle1.tmx',
    js: 'src/data/chapters/ch7_battle1.js',
    playerUnits: ['young_xu', 'young_liu', 'ayao'],
    enemyUnits: [
      { enemyId: 'senior_student_corrupted', instanceId: 'senior_1' },
      { enemyId: 'janitor_corrupted', instanceId: 'janitor_1' },
      { enemyId: 'classmate_boy_corrupted', instanceId: 'corrupted_boy_1' },
      { enemyId: 'classmate_girl_corrupted', instanceId: 'corrupted_girl_1' }
    ]
  },
  {
    id: 'ch8_battle1',
    tmx: 'docs/map/tiled_project/ch8_battle1.tmx',
    js: 'src/data/chapters/ch8_battle1.js',
    playerUnits: ['young_xu', 'young_liu'],
    enemyUnits: [
      { enemyId: 'mystery_man', instanceId: 'mystery_boss' },
      { enemyId: 'coach_corrupted', instanceId: 'coach_boss' },
      { enemyId: 'senior_athlete_leader_corrupted', instanceId: 'athlete_leader' },
      { enemyId: 'classmate_boy_corrupted', instanceId: 'runner_a' },
      { enemyId: 'classmate_girl_corrupted', instanceId: 'runner_b' }
    ]
  },
  {
    id: 'ch9_battle1',
    tmx: 'docs/map/tiled_project/ch9_battle1.tmx',
    js: 'src/data/chapters/ch9_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'zhangzixiao_corrupted', instanceId: 'shadow_mc' },
      { enemyId: 'zhanghanyu_corrupted', instanceId: 'shadow_ally1' },
      { enemyId: 'fanwenmo_corrupted', instanceId: 'shadow_ally2' },
      { enemyId: 'zhangxizhe_corrupted', instanceId: 'shadow_xizhe' },
      { enemyId: 'qinruiyi_corrupted', instanceId: 'shadow_ruiyi' },
      { enemyId: 'zhuyanze_corrupted', instanceId: 'shadow_yanze' }
    ]
  },
  {
    id: 'ch10_battle1',
    tmx: 'docs/map/tiled_project/ch10_battle1.tmx',
    js: 'src/data/chapters/ch10_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'shen_guard', instanceId: 'guard_a' },
      { enemyId: 'shen_guard', instanceId: 'guard_b' },
      { enemyId: 'shen_guard', instanceId: 'guard_c' },
      { enemyId: 'senior_athlete_corrupted', instanceId: 'push_a' },
      { enemyId: 'senior_athlete_corrupted', instanceId: 'push_b' }
    ]
  },
  {
    id: 'ch11_battle1',
    tmx: 'docs/map/tiled_project/ch11_battle1.tmx',
    js: 'src/data/chapters/ch11_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'shen_guard', instanceId: 'guard_a' },
      { enemyId: 'shen_guard', instanceId: 'guard_b' },
      { enemyId: 'shen_guard', instanceId: 'guard_c' },
      { enemyId: 'punk', instanceId: 'punk_a' },
      { enemyId: 'punk', instanceId: 'punk_b' }
    ]
  },
  {
    id: 'ch12_battle1',
    tmx: 'docs/map/tiled_project/ch12_battle1.tmx',
    js: 'src/data/chapters/ch12_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze', 'father_haifeng'],
    enemyUnits: [
      { enemyId: 'shen_guard', instanceId: 'guard_a' },
      { enemyId: 'shen_guard', instanceId: 'guard_b' },
      { enemyId: 'shen_guard', instanceId: 'guard_c' },
      { enemyId: 'berserker_guard', instanceId: 'heavy_a' },
      { enemyId: 'berserker_guard', instanceId: 'heavy_b' }
    ]
  },
  {
    id: 'ch13_battle1',
    tmx: 'docs/map/tiled_project/ch13_battle1.tmx',
    js: 'src/data/chapters/ch13_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze', 'xu_laoshi', 'liu_laoshi', 'father_haifeng'],
    enemyUnits: [
      { enemyId: 'shen_guard', instanceId: 'guard_a' },
      { enemyId: 'shen_guard', instanceId: 'guard_b' },
      { enemyId: 'shen_guard', instanceId: 'guard_c' },
      { enemyId: 'shen_guard', instanceId: 'guard_d' },
      { enemyId: 'berserker_guard', instanceId: 'heavy_a' },
      { enemyId: 'berserker_guard', instanceId: 'heavy_b' },
      { enemyId: 'punk', instanceId: 'punk_a' },
      { enemyId: 'punk', instanceId: 'punk_b' }
    ]
  },
  {
    id: 'ch14_battle1',
    tmx: 'docs/map/tiled_project/ch14_battle1.tmx',
    js: 'src/data/chapters/ch14_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'shen_guard', instanceId: 'guard_a' },
      { enemyId: 'shen_guard', instanceId: 'guard_b' },
      { enemyId: 'shen_guard', instanceId: 'guard_c' },
      { enemyId: 'shen_guard', instanceId: 'guard_d' },
      { enemyId: 'berserker_guard', instanceId: 'heavy_a' },
      { enemyId: 'berserker_guard', instanceId: 'heavy_b' }
    ]
  },
  {
    id: 'ch15_battle1',
    tmx: 'docs/map/tiled_project/ch15_battle1.tmx',
    js: 'src/data/chapters/ch15_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze', 'militia_instructor'],
    enemyUnits: [
      { enemyId: 'foreign_sailor', instanceId: 'sailor_a' },
      { enemyId: 'foreign_sailor', instanceId: 'sailor_b' },
      { enemyId: 'foreign_sailor', instanceId: 'sailor_c' },
      { enemyId: 'foreign_sailor', instanceId: 'sailor_d' },
      { enemyId: 'comprador_assassin', instanceId: 'assassin_a' },
      { enemyId: 'comprador_assassin', instanceId: 'assassin_b' }
    ]
  },
  {
    id: 'ch15b_battle1',
    tmx: 'docs/map/tiled_project/ch15b_battle1.tmx',
    js: 'src/data/chapters/ch15b_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze', 'father_haifeng'],
    enemyUnits: [
      { enemyId: 'foreign_sailor', instanceId: 'warehouse_sailor_a' },
      { enemyId: 'foreign_sailor', instanceId: 'warehouse_sailor_b' },
      { enemyId: 'foreign_sailor', instanceId: 'warehouse_sailor_c' },
      { enemyId: 'foreign_sailor', instanceId: 'warehouse_sailor_d' },
      { enemyId: 'comprador_assassin', instanceId: 'warehouse_guard_a' },
      { enemyId: 'comprador_assassin', instanceId: 'warehouse_guard_b' }
    ]
  },
  {
    id: 'ch16_battle1',
    tmx: 'docs/map/tiled_project/ch16_battle1.tmx',
    js: 'src/data/chapters/ch16_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'shen_guard', instanceId: 'guard_a' },
      { enemyId: 'shen_guard', instanceId: 'guard_b' },
      { enemyId: 'shen_guard', instanceId: 'guard_c' },
      { enemyId: 'shen_guard', instanceId: 'guard_d' },
      { enemyId: 'berserker_guard', instanceId: 'heavy_a' }
    ]
  },
  {
    id: 'ch17_battle1',
    tmx: 'docs/map/tiled_project/ch17_battle1.tmx',
    js: 'src/data/chapters/ch17_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze', 'xu_laoshi', 'liu_laoshi'],
    enemyUnits: [
      { enemyId: 'berserker_guard', instanceId: 'heavy_a' },
      { enemyId: 'berserker_guard', instanceId: 'heavy_b' },
      { enemyId: 'berserker_guard', instanceId: 'heavy_c' },
      { enemyId: 'shen_guard', instanceId: 'guard_a' },
      { enemyId: 'shen_guard', instanceId: 'guard_b' },
      { enemyId: 'shen_guard', instanceId: 'guard_c' },
      { enemyId: 'shen_guard', instanceId: 'guard_d' }
    ]
  },
  {
    id: 'ch18_battle1',
    tmx: 'docs/map/tiled_project/ch18_battle1.tmx',
    js: 'src/data/chapters/ch18_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'berserker_guard', instanceId: 'heavy_a' },
      { enemyId: 'berserker_guard', instanceId: 'heavy_b' },
      { enemyId: 'berserker_guard', instanceId: 'heavy_c' },
      { enemyId: 'shen_guard', instanceId: 'guard_a' },
      { enemyId: 'shen_guard', instanceId: 'guard_b' },
      { enemyId: 'shen_chongli', instanceId: 'shen_chongli' }
    ]
  },
  {
    id: 'ch19_battle1',
    tmx: 'docs/map/tiled_project/ch19_battle1.tmx',
    js: 'src/data/chapters/ch19_battle1.js',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'boss_colossus', instanceId: 'boss_colossus' },
      { enemyId: 'shen_wanting', instanceId: 'shen_wanting' },
      { enemyId: 'shen_chongli', instanceId: 'shen_chongli' }
    ]
  }
];

async function syncTmx(config) {
  const fullTmxPath = path.resolve(__dirname, '..', config.tmx);
  const fullJsPath = path.resolve(__dirname, '..', config.js);

  if (!fs.existsSync(fullTmxPath)) {
    console.log(`TMX file not found: ${config.tmx}`);
    return;
  }

  const xml = fs.readFileSync(fullTmxPath, 'utf-8');
  const parser = new xml2js.Parser({ explicitArray: false });
  const result = await parser.parseStringPromise(xml);
  const map = result.map;

  const width = parseInt(map.$.width, 10);
  const height = parseInt(map.$.height, 10);
  const tileWidth = parseInt(map.$.tilewidth, 10) || 48;
  const LOGIC_SCALE = 1; // 1:1 —— 一个逻辑格 = 一个瓦片（48px）

  // 1. 解析瓦片层
  let bgCsv = '';
  let decCsv = '';
  const layers = Array.isArray(map.layer) ? map.layer : [map.layer];
  for (const layer of layers) {
    if (!layer || !layer.data) continue;
    if (layer.$.name === 'Background') {
      bgCsv = (layer.data._ || layer.data).trim();
    } else if (layer.$.name === 'Decoration') {
      decCsv = (layer.data._ || layer.data).trim();
    }
  }

  const to2D = (csv, w) => {
    if (!csv) return Array.from({ length: height }, () => Array(w).fill(0));
    const flat = csv.split(',').map(n => parseInt(n.trim(), 10) || 0);
    const arr = [];
    for (let i = 0; i < flat.length; i += w) {
      arr.push(flat.slice(i, i + w));
    }
    return arr;
  };

  const bgGrid = to2D(bgCsv, width);
  const decGrid = to2D(decCsv, width);

  // 2. 解析对象层 (Collisions, Spawns, Terrains/Zones)
  const collisions = [];
  const spawns = [];
  const zones = {};

  const TERRAIN_PRESETS = {
    // 草地/绿化/花坛
    '草丛': { name: '草丛', def: 1, avoid: 10, cost: 2 },
    '草地': { name: '草地', def: 1, avoid: 10, cost: 2 },
    '花坛': { name: '花坛', def: 1, avoid: 10, cost: 2 },
    '灌木': { name: '灌木', def: 1, avoid: 10, cost: 2 },
    'grass': { name: '草地', def: 1, avoid: 10, cost: 2 },
    'bush': { name: '灌木', def: 1, avoid: 10, cost: 2 },

    // 掩体/路障/桌椅
    '掩体': { name: '掩体', def: 2, avoid: 15, cost: 1 },
    '路障': { name: '路障', def: 2, avoid: 15, cost: 1 },
    'cover': { name: '掩体', def: 2, avoid: 15, cost: 1 },
    'shelter': { name: '掩体', def: 2, avoid: 15, cost: 1 },

    // 高地/讲台
    '高地': { name: '高地', def: 1, avoid: 15, cost: 1 },
    '讲台': { name: '讲台', def: 1, avoid: 15, cost: 1 },
    '高台': { name: '高台', def: 1, avoid: 15, cost: 1 },
    'high_ground': { name: '高地', def: 1, avoid: 15, cost: 1 },

    // 树荫
    '树荫': { name: '树荫', def: 0, avoid: 15, cost: 1 },
    'shade': { name: '树荫', def: 0, avoid: 15, cost: 1 },

    // 室内地毯 / 沙发 / 长椅
    '地毯': { name: '地毯', def: 0, avoid: 5, cost: 1 },
    'carpet': { name: '地毯', def: 0, avoid: 5, cost: 1 },
    '沙发': { name: '沙发', def: 1, avoid: 10, cost: 1 },
    '长椅': { name: '长椅', def: 1, avoid: 10, cost: 1 },
    'bench': { name: '长椅', def: 1, avoid: 10, cost: 1 },

    // 减益地形：水坑/泥泞
    '水坑': { name: '水坑', def: 0, avoid: -10, cost: 2 },
    '泥泞': { name: '泥泞', def: 0, avoid: -10, cost: 2 },
    'mud': { name: '泥泞', def: 0, avoid: -10, cost: 2 }
  };

  const objectGroups = map.objectgroup ? (Array.isArray(map.objectgroup) ? map.objectgroup : [map.objectgroup]) : [];

  for (const group of objectGroups) {
    if (!group.object) continue;
    const groupName = (group.$.name || '').trim();
    const objects = Array.isArray(group.object) ? group.object : [group.object];

    for (const obj of objects) {
      const x = parseFloat(obj.$.x || 0);
      const y = parseFloat(obj.$.y || 0);
      const w = parseFloat(obj.$.width || 0);
      const h = parseFloat(obj.$.height || 0);

      // 读取对象自定义属性
      const customProps = {};
      if (obj.properties && obj.properties[0] && obj.properties[0].property) {
        const pList = Array.isArray(obj.properties[0].property) ? obj.properties[0].property : [obj.properties[0].property];
        for (const p of pList) {
          if (p.$ && p.$.name) {
            customProps[p.$.name] = p.$.value;
          }
        }
      }

      // 读取可能存在的文本内容 (文字工具)
      let textContent = '';
      if (obj.text && obj.text[0]) {
        textContent = typeof obj.text[0] === 'string' ? obj.text[0] : (obj.text[0]._ || '');
      }

      if (groupName === 'Collisions') {
        // 使用物理包围盒相交算法，只要碰撞盒覆盖某个逻辑格子超过 25% 面积，即判定为空气墙阻挡
        const logicTileWidth = tileWidth * LOGIC_SCALE;
        const overlapMin = logicTileWidth / 4;
        const startX = Math.max(0, Math.floor(x / logicTileWidth));
        const endX = Math.min(Math.ceil(width / LOGIC_SCALE) - 1, Math.floor((x + w - 1) / logicTileWidth));
        const startY = Math.max(0, Math.floor(y / logicTileWidth));
        const endY = Math.min(Math.ceil(height / LOGIC_SCALE) - 1, Math.floor((y + h - 1) / logicTileWidth));

        for (let cy = startY; cy <= endY; cy++) {
          for (let cx = startX; cx <= endX; cx++) {
            const cellLeft = cx * logicTileWidth;
            const cellRight = (cx + 1) * logicTileWidth;
            const cellTop = cy * logicTileWidth;
            const cellBottom = (cy + 1) * logicTileWidth;

            const overlapX = Math.max(0, Math.min(x + w, cellRight) - Math.max(x, cellLeft));
            const overlapY = Math.max(0, Math.min(y + h, cellBottom) - Math.max(y, cellTop));

            // 重叠宽度和高度均大于 1/4 逻辑格子即视作有效阻挡
            if (overlapX >= overlapMin && overlapY >= overlapMin) {
              if (!collisions.some(c => c.x === cx && c.y === cy)) {
                collisions.push({ x: cx, y: cy });
              }
            }
          }
        }
      } else if (groupName === 'Spawns') {
        // 出生点直接按逻辑格子大小换算
        const logicTileWidth = tileWidth * LOGIC_SCALE;
        const sx = Math.min(Math.ceil(width / LOGIC_SCALE) - 1, Math.max(0, Math.floor(x / logicTileWidth)));
        const sy = Math.min(Math.ceil(height / LOGIC_SCALE) - 1, Math.max(0, Math.floor(y / logicTileWidth)));
        spawns.push({ x: sx, y: sy });
      } else if (groupName === 'Terrains' || groupName === 'Zones' || groupName === 'Buffs' || customProps.def !== undefined || customProps.avoid !== undefined) {
        // 地形特技区域 (掩体/草丛/高地/地毯等)
        const key = (obj.$.name || obj.$.type || textContent || '').trim();
        const base = TERRAIN_PRESETS[key] || { name: key || '掩体', def: 1, avoid: 10, cost: 1 };

        // 支持在名称或文本中写 "防+2 避+15%"
        const defMatch = (textContent || key).match(/防\+?(-?\d+)/);
        const avoidMatch = (textContent || key).match(/避\+?(-?\d+)/);

        const zoneDef = customProps.def !== undefined ? parseInt(customProps.def, 10) : (defMatch ? parseInt(defMatch[1], 10) : base.def);
        const zoneAvoid = customProps.avoid !== undefined ? parseInt(customProps.avoid, 10) : (avoidMatch ? parseInt(avoidMatch[1], 10) : base.avoid);
        const zoneCost = customProps.cost !== undefined ? parseInt(customProps.cost, 10) : base.cost;
        const zoneName = customProps.name || base.name || key || '增益区';

        const logicTileWidth = tileWidth * LOGIC_SCALE;
        const startX = Math.max(0, Math.floor(x / logicTileWidth));
        const endX = Math.min(Math.ceil(width / LOGIC_SCALE) - 1, Math.floor((x + (w || logicTileWidth) - 1) / logicTileWidth));
        const startY = Math.max(0, Math.floor(y / logicTileWidth));
        const endY = Math.min(Math.ceil(height / LOGIC_SCALE) - 1, Math.floor((y + (h || logicTileWidth) - 1) / logicTileWidth));

        for (let cy = startY; cy <= endY; cy++) {
          for (let cx = startX; cx <= endX; cx++) {
            zones[`${cx},${cy}`] = {
              name: zoneName,
              def: zoneDef,
              avoid: zoneAvoid,
              cost: zoneCost
            };
          }
        }
      }
    }
  }

  // 3. 读取并更新 JS 文件
  let jsContent = fs.readFileSync(fullJsPath, 'utf-8');

  // 同步地图尺寸 (逻辑尺寸)
  const logicWidth = Math.ceil(width / LOGIC_SCALE);
  const logicHeight = Math.ceil(height / LOGIC_SCALE);
  jsContent = jsContent.replace(/mapWidth:\s*\d+,/m, `mapWidth: ${logicWidth},`);
  jsContent = jsContent.replace(/mapHeight:\s*\d+,/m, `mapHeight: ${logicHeight},`);

  // 清理旧地图残留（斑马线、柏油路、旧街具），全面交由 Tiled 管理
  if (jsContent.includes('terrainTiles:')) {
    jsContent = jsContent.replace(/terrainTiles:\s*\[[\s\S]*?\],/m, 'terrainTiles: [],');
  }
  if (jsContent.includes('props:')) {
    jsContent = jsContent.replace(/props:\s*\[[\s\S]*?\],/m, 'props: [],');
  }

  // 构建 tiledData 对象
  const tiledData = {
    visualWidth: width,
    visualHeight: height,
    bgGrid,
    decGrid,
    collisions,
    zones
  };

  const tiledJson = JSON.stringify(tiledData, null, 2);

  // 安全替换或注入 tiledData（严格匹配并替换原有 tiledData）
  if (jsContent.includes('tiledData:')) {
    jsContent = jsContent.replace(/tiledData:\s*\{[\s\S]*?\n\}(?=\s*[,;\n])/m, `tiledData: ${tiledJson}`);
  } else {
    jsContent = jsContent.replace(/\n\};?\s*$/, `,\n  tiledData: ${tiledJson}\n};\n`);
  }

  // 4. 更新 playerDeploy 与 enemyDeploy
  if (spawns.length > 0) {
    // 按照从左到右排序
    spawns.sort((a, b) => a.x - b.x);
    const playerCount = config.playerUnits.length;
    const playerSpawns = spawns.slice(0, playerCount);
    const enemySpawns = spawns.slice(playerCount);

    // 更新 Player Deploy
    const playerDeployLines = playerSpawns.map((s, idx) => {
      const u = config.playerUnits[idx] || config.playerUnits[0];
      return `    { unitId: '${u}', x: ${s.x}, y: ${s.y} }`;
    }).join(',\n');

    jsContent = jsContent.replace(
      /playerDeploy:\s*\[[\s\S]*?\],/m,
      `playerDeploy: [\n${playerDeployLines}\n  ],`
    );

    // 更新 Enemy Deploy
    if (enemySpawns.length > 0) {
      const enemyDeployLines = enemySpawns.map((s, idx) => {
        const u = config.enemyUnits[idx] || config.enemyUnits[config.enemyUnits.length - 1];
        return `    { enemyId: '${u.enemyId}', instanceId: '${u.instanceId}', x: ${s.x}, y: ${s.y} }`;
      }).join(',\n');

      jsContent = jsContent.replace(
        /enemyDeploy:\s*\[[\s\S]*?\],/m,
        `enemyDeploy: [\n${enemyDeployLines}\n  ],`
      );
    }
  }

  fs.writeFileSync(fullJsPath, jsContent);
  console.log(`[Synced] ${config.id} -> ${config.js}`);
}

async function run() {
  const requested = process.argv.slice(2);
  const configs = requested.length
    ? CHAPTER_CONFIGS.filter((cfg) => requested.includes(cfg.id))
    : CHAPTER_CONFIGS;
  if (requested.length && configs.length !== new Set(requested).size) {
    throw new Error(`未找到全部指定的战斗地图: ${requested.join(', ')}`);
  }
  for (const cfg of configs) {
    await syncTmx(cfg);
  }
}

run().catch(console.error);
