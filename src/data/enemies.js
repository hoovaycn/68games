/**
 * 敌人数据表（模板）
 */
export const ENEMIES = {
  vendor: {
    id: 'vendor',
    name: '流动商贩',
    title: '校门口可疑摊贩',
    classId: 'vendor_mob',
    level: 1,
    equippedWeapon: 'snack_throw',
    portrait: 'assets/portraits/vendor_default.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_red.png',
    themeColor: '#e11d48',
    ai: {
      type: 'passive_guard', // 守摊型：不主动远距离追击，进入射程必打
      aggroRadius: 4
    },
    drops: [
      { itemId: 'sausage', chance: 1.0 },   // 消耗品烤肠
      { itemId: 'dirty_sock', chance: 1.0 } // 关键道具：张子骁的臭袜子
    ],
    quotes: {
      move: '同学……买包零食吗？保你考第一……',
      attack: '尝尝这个！',
      death: '嘻嘻嘻……它们……它们就要来了……'
    }
  },
  punk: {
    id: 'punk',
    name: '高年级混混',
    title: '被焦虑侵蚀的学长',
    classId: 'school_punk',
    level: 2,
    equippedWeapon: 'exercise_bat',
    portrait: 'assets/portraits/punk_default.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black.png',
    themeColor: '#b91c1c',
    ai: {
      type: 'aggressive_chase', // 凶狠追击型：主动靠近并围剿
      aggroRadius: 6
    },
    drops: [
      { itemId: 'bastard_soda', chance: 1.0 },       // 100% 掉落混蛋汽水
      { itemId: 'pe_teacher_brain', chance: 1.0 }    // 100% 掉落体育老师的脑子
    ],
    quotes: {
      move: '小屁孩，别多管闲事！',
      attack: '这道题你解得开吗？！',
      death: '可恶……我还要……刷完这套卷子……'
    }
  }
};
