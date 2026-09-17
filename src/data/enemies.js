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
    bio: '推着一辆嘎吱作响的小车，在校门口卖了三年「考前保过零食」。没人知道他从哪进货，也没人知道他为什么总在放学前十分钟才出现。传说买过他东西的人第二天考试都迷之顺利——也可能只是心理作用。',
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
    bio: '六年级升学压力最大的倒霉蛋，成绩越掉脾气越大，把火全撒在低年级头上。书包里塞着三套没写完的卷子，走路横得像只螃蟹。其实他半夜也会偷偷躲在被子里哭——但白天，谁都别想从他嘴里听到一句好话。',
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
  },
  fanwenmo_corrupted: {
    id: 'fanwenmo_corrupted',
    name: '狂暴的小默',
    title: '被题海侵蚀的同学',
    classId: 'strong_boy',
    level: 3,
    equippedWeapon: 'exercise_bat',
    portrait: 'assets/portraits/fanwenmo_corrupted.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black.png',
    themeColor: '#7c3aed',
    bio: '双眼泛着幽异青光，嘴里反复念叨着“动量守恒”、“洛伦兹力”。平时连乘法口诀都费劲的他，此刻正狂暴地挥舞着厚重的冲刺题集！',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'suspicious_snack', chance: 1.0 },
      { itemId: 'sausage', chance: 1.0 }
    ],
    quotes: {
      move: '洛伦兹力……动量守恒……为什么对不上？！',
      attack: '做完这套五三！“它们”就把脑子还给我！',
      death: '（剧烈咳嗽）……我……我刚才在干什么……满地都是草稿纸……'
    }
  },
  heyanxi_corrupted: {
    id: 'heyanxi_corrupted',
    name: '失常的妍熹',
    title: '被循环音律困住的同学',
    classId: 'study_committee',
    level: 3,
    equippedWeapon: 'recorder',
    portrait: 'assets/portraits/heyanxi_corrupted.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_pink.png',
    themeColor: '#0891b2',
    bio: '双眼空洞泛着冷青光，机械地重复按压着竖笛音孔，嘴里念叨着错乱音阶。刺耳的音浪在房间里回荡，令人头痛欲裂！',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'suspicious_snack', chance: 1.0 },
      { itemId: 'bastard_soda', chance: 1.0 }
    ],
    quotes: {
      move: '升 C…… 降 E…… 只要不按错……',
      attack: '别关灯！门外……门外有脏东西在看着！',
      death: '（竖笛滑落）……手好酸……予诺，你怎么会在这里……？'
    }
  }
};
