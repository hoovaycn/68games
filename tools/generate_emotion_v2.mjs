// 生成「角色-形象-情绪」三层配置表 + story 迁移映射
import { ART_EMOTION_FILES } from '../src/engine/avatar.js';

// 1) 旧角色id → 新基础角色 + 隐含形象（undefined = default形象/短id）
const ROLE_MAP = {
  zhangzixiao: { role: 'zhangzixiao' },
  mc_adult_zixiao: { role: 'zhangzixiao', form: 'adult' },
  shiyunuo: { role: 'shiyunuo' },
  mc_adult_yunuo: { role: 'shiyunuo', form: 'adult' },
  zhanghanyu: { role: 'zhanghanyu' },
  chenpinxuan: { role: 'chenpinxuan' },
  fanwenmo: { role: 'fanwenmo' },
  fanwenmo_adult: { role: 'fanwenmo', form: 'adult' },
  heyanxi: { role: 'heyanxi' },
  heyanxi_adult: { role: 'heyanxi', form: 'adult' },
  qinruiyi: { role: 'qinruiyi' },
  zhangxizhe: { role: 'zhangxizhe' },
  zhuyanze: { role: 'zhuyanze' },

  teacher_xu: { role: 'xu' },
  teacher_xubox_stealth: { role: 'xu', form: 'stealth' },
  teacher_xu_burnt: { role: 'xu', form: 'burnt' },
  young_xu: { role: 'xu', form: 'young' },
  adult_liu: { role: 'liu' },
  teacher_liu_burnt: { role: 'liu', form: 'burnt' },
  young_liu: { role: 'liu', form: 'young' },
  father_haifeng: { role: 'haifeng' },
  haifeng_burnt: { role: 'haifeng', form: 'burnt' },
  teacher_pe: { role: 'pe' },

  ayao: { role: 'ayao' },
  ayao_adult: { role: 'ayao', form: 'adult' },
  ayao_corrupted_god: { role: 'ayao', form: 'corrupted_god' },
  ayao_aged_2046: { role: 'ayao', form: 'aged_2046' },
  ayao_final_form: { role: 'ayao', form: 'final_form' },
  su_wan_doctor: { role: 'ayao', form: 'doctor' }
};

// 2) 从旧“情绪”里拆出的形象/状态/动作词（组成「角色-形象」id）
const FORM_WORDS = new Set([
  'corrupted', 'police', 'police_damaged', 'battle_damaged', 'machine',
  'dissolve', 'charge', 'hug', 'aim', 'choke', 'pale'
]);

// 3) 旧情绪 → 6 个统一情绪
const EMOTION_MAP = {
  default: 'default',
  smile: 'smile', gentle: 'smile', loving: 'smile', warm: 'smile', relieved: 'smile',
  resolute: 'frown', stern: 'frown', command: 'frown', smirk: 'frown', cold: 'frown',
  alert: 'frown', angry: 'frown', thinking: 'frown', concerned: 'frown', protective: 'frown',
  sad: 'cry', pain: 'cry',
  nervous: 'awkward',
  shock: 'shock', panic: 'shock'
};

const newTable = {};
const migrateMap = {}; // 旧角色id|旧情绪 -> { id, emotion }

function keyId(role, form) {
  return form ? `${role}-${form}` : role;
}

for (const [oldId, emotions] of Object.entries(ART_EMOTION_FILES)) {
  const r = ROLE_MAP[oldId] || { role: oldId };
  for (const [emotion, base] of Object.entries(emotions)) {
    let id, newEmotion;
    if (FORM_WORDS.has(emotion)) {
      const form = r.form ? `${r.form}-${emotion}` : emotion;
      id = keyId(r.role, form);
      newEmotion = 'default';
    } else {
      id = keyId(r.role, r.form);
      newEmotion = EMOTION_MAP[emotion] || 'default';
    }
    if (!newTable[id]) newTable[id] = {};
    if (!newTable[id][newEmotion]) newTable[id][newEmotion] = base;
    migrateMap[`${oldId}|${emotion}`] = { id, emotion: newEmotion };
  }
}

console.log('=== 新配置表 ===');
console.log(JSON.stringify(newTable, null, 2));
console.log('\n=== 迁移映射（旧角色id|旧情绪 → {id, emotion}） ===');
console.log(JSON.stringify(migrateMap, null, 0));
