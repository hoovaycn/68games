const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 第三幕关键美术资产比对定义
const ART_REQUIREMENTS = {
  characters: [
    { id: 'su_wan_doctor', name: '苏晚医生', states: ['default', 'inquiring', 'probing', 'smile'], paths: ['assets/art/su_wan_doctor_default@2x.png', 'assets/portraits/su_wan_doctor@2x.png'] },
    { id: 'ayao_adult', name: '阿瑶（32岁真容）', states: ['default', 'tearful', 'smile'], paths: ['assets/art/ayao_adult_default@2x.png', 'assets/art/ayao_adult_tearful@2x.png', 'assets/art/ayao_adult_smile@2x.png'] },
    { id: 'ayao_corrupted_god', name: '因果裁决者·永恒阿瑶', states: ['default', 'agony', 'mechanical'], paths: ['assets/art/ayao_corrupted_god_default@2x.png', 'assets/portraits/ayao_corrupted_god@2x.png'] },
    { id: 'ayao_aged_2046', name: '未来阿瑶（2046年休眠体）', states: ['default', 'weeping'], paths: ['assets/art/ayao_aged_2046_default@2x.png', 'assets/art/ayao_aged_2046_weeping@2x.png'] },
    { id: 'mc_adult_zixiao', name: '成年张子骁（32岁大号主角）', states: ['default', 'gentle', 'resolve', 'fade_smile'], paths: ['assets/art/mc_adult_zixiao_default@2x.png', 'assets/portraits/mc_adult_zixiao@2x.png'] },
    { id: 'mc_adult_yunuo', name: '成年石予诺（32岁女线大号）', states: ['default', 'gentle', 'resolve', 'fade_smile'], paths: ['assets/art/mc_adult_yunuo_default@2x.png', 'assets/portraits/mc_adult_yunuo@2x.png'] },
    { id: 'fanwenmo_adult', name: '成年范文默（32岁）', states: ['default', 'tearful', 'fade_smile'], paths: ['assets/art/fanwenmo_adult_default@2x.png', 'assets/portraits/fanwenmo_adult@2x.png'] },
    { id: 'heyanxi_adult', name: '成年何妍熹（32岁女线副官）', states: ['default', 'tearful', 'fade_smile'], paths: ['assets/art/heyanxi_adult_default@2x.png', 'assets/portraits/heyanxi_adult@2x.png'] },
    { id: 'haifeng_burnt', name: '海峰警官（火海生还差分）', states: ['default', 'tearful'], paths: ['assets/art/haifeng_burnt_default@2x.png', 'assets/art/haifeng_burnt_tearful@2x.png'] },
    { id: 'teachers_burnt', name: '徐老师/刘老师（火海生还差分）', states: ['default', 'relieved'], paths: ['assets/art/teachers_burnt_default@2x.png', 'assets/art/teachers_burnt_relieved@2x.png'] },
    { id: 'teacher_xubox_stealth', name: '徐老师（雨夜潜行风衣差分）', states: ['default', 'tense', 'somber'], paths: ['assets/art/teacher_xubox_stealth_default@2x.png'] }
  ],
  enemies: [
    { id: 'enforcer_abiao', name: '三号船盯梢头目·阿彪', file: 'assets/portraits/enforcer_abiao@2x.png' },
    { id: 'porter_blueeye', name: '青眼搬运工', file: 'assets/portraits/porter_blueeye@2x.png' },
    { id: 'sniper_dock', name: '码头埋伏狙击手', file: 'assets/portraits/sniper_dock@2x.png' },
    { id: 'boss_viper_smuggler', name: '走私头目·独眼蝰蛇', file: 'assets/portraits/boss_viper_smuggler@2x.png' },
    { id: 'sailor_berserk', name: '狂化重装水手', file: 'assets/portraits/sailor_berserk@2x.png' },
    { id: 'shadow_parasite', name: '时空煞气寄生体', file: 'assets/portraits/shadow_parasite@2x.png' },
    { id: 'chronos_puppet', name: '时空错乱傀儡', file: 'assets/portraits/chronos_puppet@2x.png' },
    { id: 'boss_exam_captain', name: '满分治安官·执行队长', file: 'assets/portraits/boss_exam_captain@2x.png' },
    { id: 'officer_100', name: '机械化满分治安官', file: 'assets/portraits/officer_100@2x.png' },
    { id: 'probe_machine', name: '情绪清扫探针机甲', file: 'assets/portraits/probe_machine@2x.png' },
    { id: 'boss_hunter_alpha', name: '天梯追猎者·阿尔法', file: 'assets/portraits/boss_hunter_alpha@2x.png' },
    { id: 'patrol_robot_exam', name: '天梯巡考机械人', file: 'assets/portraits/patrol_robot_exam@2x.png' },
    { id: 'boss_ai_topstudent', name: '满分优等生智脑', file: 'assets/portraits/boss_ai_topstudent@2x.png' },
    { id: 'boss_storm_mech', name: '境外重装歼灭者·暴风', file: 'assets/portraits/boss_storm_mech@2x.png' },
    { id: 'alloy_deathsworn', name: '合金自律死士', file: 'assets/portraits/alloy_deathsworn@2x.png' },
    { id: 'hound_riot', name: '防暴歼灭猎犬', file: 'assets/portraits/hound_riot@2x.png' },
    { id: 'boss_iron_scorpion', name: '引信守卫长·铁蝎', file: 'assets/portraits/boss_iron_scorpion@2x.png' },
    { id: 'fanatic_bomber', name: '狂化引爆死士', file: 'assets/portraits/fanatic_bomber@2x.png' },
    { id: 'hold_gate_guard', name: '底舱重型水闸守卫', file: 'assets/portraits/hold_gate_guard@2x.png' },
    { id: 'pillar_neural_lock', name: '外置神经死锁柱', file: 'assets/portraits/pillar_neural_lock@2x.png' },
    { id: 'repair_spider', name: '主脑重装修复蛛', file: 'assets/portraits/repair_spider@2x.png' },
    { id: 'boss_judgement_core', name: '万物天梯裁决核心', file: 'assets/portraits/boss_judgement_core@2x.png' },
    { id: 'capital_guard_mech', name: '境外资本重装护卫机甲', file: 'assets/portraits/capital_guard_mech@2x.png' }
  ],
  backgrounds: [
    { file: 'assets/backgrounds/bg_counseling_room@2x.png', name: '崇文楼心理咨询室' },
    { file: 'assets/backgrounds/bg_street_night_rain@2x.png', name: '废弃水闸泥泞雨巷' },
    { file: 'assets/backgrounds/bg_pier_night_rain@2x.png', name: '江边九号码头暴雨夜' },
    { file: 'assets/backgrounds/bg_future_city_ruins@2x.png', name: '2046年未来都市废墟' },
    { file: 'assets/backgrounds/bg_future_square_monument@2x.png', name: '旧校址烈士纪念广场' },
    { file: 'assets/backgrounds/bg_resistance_bunker@2x.png', name: '反抗军地下防空洞基地' },
    { file: 'assets/backgrounds/bg_sky_exam_core@2x.png', name: '天梯考场核心层' },
    { file: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png', name: '阿瑶中央休眠维生舱' },
    { file: 'assets/backgrounds/bg_reactor_core@2x.png', name: '底层时空喷流反应堆' },
    { file: 'assets/backgrounds/bg_pier_sunset_cargo@2x.png', name: '三号船黄昏登船栈桥' },
    { file: 'assets/backgrounds/bg_cargo_hold_fire@2x.png', name: '三号船底舱烈火走廊' },
    { file: 'assets/backgrounds/bg_cargo_top_throne@2x.png', name: '三号船顶层神座天台' },
    { file: 'assets/backgrounds/bg_canal_dawn@2x.png', name: '老运河破晓清晨（大结局）' }
  ],
  cg_items: [
    { file: 'assets/art/cg_future_badge@2x.png', name: '2046年未来特警警徽' },
    { file: 'assets/art/cg_blood_warning_note@2x.png', name: '泛黄带血的时空预警纸条' },
    { file: 'assets/art/cg_mask_100score@2x.png', name: '满分笑脸神经面具' },
    { file: 'assets/art/cg_ayao_broken_pen@2x.png', name: '阿瑶的断尖旧钢笔' },
    { file: 'assets/art/cg_folding_shovel@2x.png', name: '淬火碳钢折叠工兵铲' },
    { file: 'assets/art/cg_snack_crushed@2x.png', name: '完好无损的怪零食袋/捏碎CG' },
    { file: 'assets/art/cg_grad_photo_2006@2x.png', name: '2006年初中毕业泛黄旧合照' },
    { file: 'assets/art/cg_repaired_humen_jar@2x.png', name: '修补完好的虎门古青瓷罐' }
  ]
};

function checkFile(relPath) {
  const p = path.join(ROOT, relPath);
  return fs.existsSync(p);
}

function findFuzzyMatch(relPath) {
  const parsed = path.parse(relPath);
  const dir = path.join(ROOT, parsed.dir);
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  const baseName = parsed.name.replace(/@2x$/, '');
  const match = files.find(f => f.startsWith(baseName) || baseName.startsWith(path.parse(f).name));
  return match ? path.join(parsed.dir, match) : null;
}

console.log('====== 第三幕美术资源审计结果 ======');

console.log('\n--- 1. 角色立绘与表情差分 ---');
for (const c of ART_REQUIREMENTS.characters) {
  const found = [];
  const missing = [];
  for (const p of c.paths) {
    if (checkFile(p)) found.push(p);
    else {
      const fuzzy = findFuzzyMatch(p);
      missing.push({ path: p, fuzzy });
    }
  }
  console.log(`[角色] ${c.name} (${c.id}): 存在 ${found.length} / 待补 ${missing.length}`);
  if (missing.length > 0) {
    missing.forEach(m => {
      console.log(`   - 缺失: ${m.path}${m.fuzzy ? ` (疑似对应已有文件: ${m.fuzzy})` : ''}`);
    });
  }
}

console.log('\n--- 2. 战斗小兵与Boss敌人切片/Sprite ---');
for (const e of ART_REQUIREMENTS.enemies) {
  const exists = checkFile(e.file);
  const fuzzy = exists ? null : findFuzzyMatch(e.file);
  console.log(`[敌人] ${e.name} (${e.id}): ${exists ? '✔ 已就位' : `❌ 缺失 -> ${e.file}`}${fuzzy ? ` (相似文件: ${fuzzy})` : ''}`);
}

console.log('\n--- 3. 场景背景图 ---');
for (const bg of ART_REQUIREMENTS.backgrounds) {
  const exists = checkFile(bg.file);
  const fuzzy = exists ? null : findFuzzyMatch(bg.file);
  console.log(`[背景] ${bg.name}: ${exists ? '✔ 已就位' : `❌ 缺失 -> ${bg.file}`}${fuzzy ? ` (相似文件: ${fuzzy})` : ''}`);
}

console.log('\n--- 4. 关键道具与剧情CG特写 ---');
for (const cg of ART_REQUIREMENTS.cg_items) {
  const exists = checkFile(cg.file);
  const fuzzy = exists ? null : findFuzzyMatch(cg.file);
  console.log(`[CG/道具] ${cg.name}: ${exists ? '✔ 已就位' : `❌ 缺失 -> ${cg.file}`}${fuzzy ? ` (相似文件: ${fuzzy})` : ''}`);
}
