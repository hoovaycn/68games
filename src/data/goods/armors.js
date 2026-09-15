/**
 * 防具配置表（V2 服务层 / goods 分类表 2/4）
 *
 * ── Schema 约定 ─────────────────────────────────────────────
 * id/name/kind:'armor' 同武器表
 * def     物理防御加成（叠加到 unit.stats.def）
 * res     魔法防御加成（叠加到 unit.stats.res）
 * weight  负重：联调轮接到 combat.js 攻速公式（与武器 weight 合并计 load）
 * avoid   回避修正（负数=副作用）
 * movPenalty 移动力减少（0=无）
 * levelReq/stack/desc 同武器表
 * ─────────────────────────────────────────────────────────────
 * 联调说明：当前 combat.js / spawn 尚未消费防具（main.js 零改动原则），
 * 本表先作为数据层落地；equippedArmors 的战斗接入在 UI 联调轮完成。
 */

export const ARMORS = {
  // —— 学生入门 ——
  school_bag: {
    id: 'school_bag',
    name: '书包',
    kind: 'armor',
    def: 3,
    res: 1,
    weight: 2,
    avoid: 0,
    movPenalty: 0,
    levelReq: 1,
    stack: 1,
    desc: '印着奥特曼的一年级书包。装满课本后意外地抗揍，背在身前就是盾牌。'
  },
  red_scarf: {
    id: 'red_scarf',
    name: '红领巾',
    kind: 'armor',
    def: 1,
    res: 1,
    weight: 0,
    avoid: 5,
    movPenalty: 0,
    levelReq: 1,
    stack: 1,
    desc: '鲜艳的红色三角巾。系正了的人，走路都挺拔三分，据说能躲过头狼的攻击。'
  },

  // —— 重装（物理向） ——
  hooded_trashcan: {
    id: 'hooded_trashcan',
    name: '套头垃圾桶',
    kind: 'armor',
    def: 6,
    res: 0,
    weight: 4,
    avoid: -10,
    movPenalty: 1,
    levelReq: 2,
    stack: 1,
    desc: '头顶环卫垃圾桶冲锋的邪道防具。防御力惊人，代价是根本看不见路。'
  },
  sport_kneepad: {
    id: 'sport_kneepad',
    name: '运动护膝',
    kind: 'armor',
    def: 2,
    res: 0,
    weight: 1,
    avoid: 0,
    movPenalty: 0,
    levelReq: 1,
    stack: 1,
    desc: '体育室借来的旧护膝，橡胶味很冲。摔倒十次也得爬起来十一次的底气。'
  },

  // —— 魔抗向 ——
  student_badge: {
    id: 'student_badge',
    name: '校牌',
    kind: 'armor',
    def: 0,
    res: 3,
    weight: 0,
    avoid: 0,
    movPenalty: 0,
    levelReq: 1,
    stack: 1,
    desc: '别在胸前的塑料校牌。照片糊了，但刻着名字的那一面始终朝外。'
  },

  // —— 稀有（剧情/商店限定） ——
  strong_will: {
    id: 'strong_will',
    name: '坚强的意志',
    kind: 'armor',
    def: 2,
    res: 4,
    weight: 0,
    avoid: 0,
    movPenalty: 0,
    levelReq: 3,
    stack: 1,
    desc: '无形无质的装备。班主任说六年级是道坎，迈过去的孩子都自带这一件。'
  }
};
