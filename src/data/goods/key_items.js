/**
 * 关键道具配置表（V2 服务层 / goods 分类表 4/4）
 *
 * ── Schema 约定 ─────────────────────────────────────────────
 * kind: 'key_item' 固定；不可使用（use_in_battle/use_in_field 恒 false）
 * effects 恒空数组；stack 恒 1
 * storyTag: 剧情钩子标签（联调轮接 story flag 判定）
 * ─────────────────────────────────────────────────────────────
 * 旧 items.js 的 3 个 key_item 原样收编 + 计划中的剧情关键道具。
 */

export const KEY_ITEMS = {
  /* ══════════ 旧表收编 ══════════ */
  suspicious_snack: {
    id: 'suspicious_snack',
    name: '可疑零食',
    kind: 'key_item',
    desc: '包装袋花花绿绿、没有任何生产日期的怪异零食，散发着微弱的甜腻冷香。不可食用。',
    effects: [],
    use_in_battle: false,
    use_in_field: false,
    stack: 1,
    storyTag: 'ch0_battle1_victory'
  },
  dirty_sock: {
    id: 'dirty_sock',
    name: '张子骁的臭袜子',
    kind: 'key_item',
    desc: '练字三年、墨汁浸透的“翰墨神器”，酸爽气场逼人，混混闻之都主动认输。关键道具，不可食用。',
    effects: [],
    use_in_battle: false,
    use_in_field: false,
    stack: 1,
    icon: 'assets/items/dirty_sock.png',
    storyTag: 'ch0_battle1_drop'
  },
  pe_teacher_brain: {
    id: 'pe_teacher_brain',
    name: '体育老师的脑子',
    kind: 'key_item',
    desc: '从混混手中缴获的怪异战利品，摸上去弹弹的，仿佛仍残留着“体育老师有事，这节课上数学”的执念。',
    effects: [],
    use_in_battle: false,
    use_in_field: false,
    stack: 1,
    icon: 'assets/items/pe_teacher_brain.png',
    storyTag: 'ch0_battle2_drop'
  },

  /* ══════════ 计划中的剧情关键道具（章节落地时启用） ══════════ */
  class_photo: {
    id: 'class_photo',
    name: '班级合影',
    kind: 'key_item',
    desc: '六年级 8 班的毕业预拍。照片里每个人的笑容都在，但洗出来后发现后排多了一排影子。',
    effects: [],
    use_in_battle: false,
    use_in_field: false,
    stack: 1,
    storyTag: 'pending_ch1'
  },
  teachers_office_key: {
    id: 'teachers_office_key',
    name: '教师办公室钥匙',
    kind: 'key_item',
    desc: '拴着红色毛线圈的黄铜钥匙。值班老师下班后被反常地留在了门锁上，插着，没拔。',
    effects: [],
    use_in_battle: false,
    use_in_field: false,
    stack: 1,
    storyTag: 'pending_ch1'
  },
  class_roll_book: {
    id: 'class_roll_book',
    name: '班级点名册',
    kind: 'key_item',
    desc: '六 8 班的点名册。徐老师的那一栏日期停在事发前一天，后面几页被撕走了一角。',
    effects: [],
    use_in_battle: false,
    use_in_field: false,
    stack: 1,
    storyTag: 'pending_ch1'
  }
};
