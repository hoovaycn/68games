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
    icon: 'assets/items/dirty_sock@2x.png',
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
    icon: 'assets/items/pe_teacher_brain@2x.png',
    storyTag: 'ch0_battle2_drop'
  },

  suspicious_beverage: {
    id: 'suspicious_beverage',
    name: '可疑运动饮料',
    kind: 'key_item',
    desc: '从操场外校体育生手里缴获的空饮料瓶，瓶身泛着荧光，贴着无任何厂址信息的体测冲刺标签。不可食用。',
    effects: [],
    use_in_battle: false,
    use_in_field: false,
    stack: 1,
    icon: 'assets/items/suspicious_drink@2x.png',
    storyTag: 'ch1_battle1_victory'
  },
  discarded_snack: {
    id: 'discarded_snack',
    name: '已丢弃的零食物证',
    kind: 'key_item',
    desc: '在小区垃圾桶底层翻出的未拆封可疑零食，袋身覆满灰尘，最终由徐老师收缴作为全班洗清冤屈的铁证。不可食用。',
    effects: [],
    use_in_battle: false,
    use_in_field: false,
    stack: 1,
    storyTag: 'ch2_battle1_victory'
  },
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
  },

  /* ══════════ 第二幕剧情信物（ch10~ch15） ══════════ */
  righteous_staff: {
    id: 'righteous_staff',
    name: '浩然正气杖',
    kind: 'key_item',
    desc: '林则徐交给民团守护销烟池的木杖，刻着「浩然正气」四字。钟楼终战时主角靠近巨魔，可从“重要道具”激起金光重创它一次。',
    effects: [],
    use_in_battle: false,
    use_in_field: false,
    stack: 1,
    icon: 'assets/items/righteous_staff@2x.png',
    storyTag: 'ch15_battle1_victory'
  },
  opium_porcelain_jar: {
    id: 'opium_porcelain_jar',
    name: '青花古瓷罐',
    kind: 'key_item',
    desc: '道光十九年虎门销烟时期的青花瓷罐，罐身爬满海蛎壳和黑红封泥，里面封着百年前被「福寿堂」偷偷藏下的鸦片老膏。',
    effects: [],
    use_in_battle: false,
    use_in_field: false,
    stack: 1,
    icon: 'assets/items/opium_porcelain_jar@2x.png',
    storyTag: 'ch10_battle1_victory'
  },
  police_badge: {
    id: 'police_badge',
    name: '警官证与金徽',
    kind: 'key_item',
    desc: '海峰贴身藏着的一本深红警官证和一枚锃亮的国徽金徽。证件上写着「省公安厅禁毒总队特勤处 · 二级警督 海峰」——是他卧底刑警身份的铁证。',
    effects: [],
    use_in_battle: false,
    use_in_field: false,
    stack: 1,
    icon: 'assets/items/police_badge@2x.png',
    storyTag: 'ch12_battle1_victory'
  },
  opium_essence_vial: {
    id: 'opium_essence_vial',
    name: '古毒原浆',
    kind: 'key_item',
    desc: '福寿堂从百年前偷藏的鸦片老膏里提炼出的「青髓」母体原浆，青黑黏稠，是所有异化零食的真正源头。',
    effects: [],
    use_in_battle: false,
    use_in_field: false,
    stack: 1,
    icon: 'assets/items/opium_essence_vial@2x.png',
    storyTag: 'ch13_battle1_victory'
  }
};
