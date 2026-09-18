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
      { itemId: 'sausage', chance: 1.0 },           // 消耗品烤肠 (+16 HP)
      { itemId: 'white_rabbit_candy', chance: 1.0 }, // 消耗品大白兔奶糖 (+8 HP, +5 MP) 首战补给
      { itemId: 'dirty_sock', chance: 1.0 }         // 关键道具：张子骁的臭袜子
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
      { itemId: 'bastard_soda', chance: 1.0 },       // 100% 掉落混蛋汽水 (+6 HP, 本回合攻速+3)
      { itemId: 'white_rabbit_candy', chance: 0.8 }, // 80% 掉落大白兔奶糖 (+8 HP, +5 MP)，给物理系续航
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
      { itemId: 'sausage', chance: 1.0 },
      { itemId: 'white_rabbit_candy', chance: 1.0 }
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
      { itemId: 'honey_tea', chance: 1.0 }          // 掉落蜂蜜柚子茶 (+25 MP)，法系核心补给
    ],
    quotes: {
      move: '升 C…… 降 E…… 只要不按错……',
      attack: '别关灯！门外……门外有脏东西在看着！',
      death: '（竖笛滑落）……手好酸……予诺，你怎么会在这里……？'
    }
  },
  teacher_pe_corrupted: {
    id: 'teacher_pe_corrupted',
    name: '魔化体育老师',
    title: '被体测指标侵蚀的教官',
    classId: 'teacher',
    level: 5,
    equippedWeapon: 'whistle',
    portrait: 'assets/portraits/teacher_pe_corrupted.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black.png',
    themeColor: '#dc2626',
    bio: '凯式刺猬头高高竖起，青黑色的血管在脖颈上暴起。嘴里紧咬着生锈铁哨，厉声呵斥着所有学生必须达标成人级极限体能！',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'suspicious_beverage', chance: 1.0 },
      { itemId: 'honey_tea', chance: 1.0 },           // 掉落蜂蜜柚子茶 (+25 MP)，回满或高额补充 MP
      { itemId: 'pe_teacher_brain', chance: 1.0 }
    ],
    quotes: {
      move: '哨声一响！全体加练一百组！谁也不准停！',
      attack: '六年级怎么了？！六年级也要跑马拉松！',
      death: '（哨子吐落）……我……我刚才在干什么……我的秒表怎么捏碎了……'
    }
  },
  senior_athlete_corrupted: {
    id: 'senior_athlete_corrupted',
    name: '魔化外校体育生',
    title: '被焦虑饮料驱使的冲锋手',
    classId: 'sports_star',
    level: 3,
    equippedWeapon: 'dumbbell',
    portrait: 'assets/portraits/senior_athlete_corrupted.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_red.png',
    themeColor: '#b91c1c',
    bio: '身穿外校红白校服，双眼失神泛着青芒，机械地举着铸铁哑铃冲锋，口中念叨着体校教练给的特训饮料。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 5
    },
    drops: [
      { itemId: 'bastard_soda', chance: 0.8 },
      { itemId: 'white_rabbit_candy', chance: 0.8 }, // 掉落大白兔奶糖 (+8 HP, +5 MP)
      { itemId: 'sausage', chance: 0.5 }
    ],
    quotes: {
      move: '教练说……只要喝了这罐……体测就能拿第一……',
      attack: '不要挡我拿冠军！',
      death: '（跪倒在地）……肚子好胀……那饮料根本不是体校发的……'
    }
  },
  zhuyanze_corrupted: {
    id: 'zhuyanze_corrupted',
    name: '反常的朱晏泽',
    title: '被猜疑心魔操控的富二代',
    classId: 'primary_student',
    level: 5,
    equippedWeapon: 'fountain_pen',
    portrait: 'assets/portraits/zhuyanze_corrupted.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black.png',
    themeColor: '#4f46e5',
    bio: '平日里最讲义气护短的朱大少爷，此刻眼神阴鸷泛着荧绿青光。手里紧捏着金尖钢笔，反常地带头指控同学作弊与中招。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'discarded_snack', chance: 1.0 },
      { itemId: 'moms_lunchbox', chance: 1.0 }       // 豪华掉落：妈妈做的便当 (+30 HP, +15 MP)
    ],
    quotes: {
      move: '我全都看见了……你们一个个都在说谎！',
      attack: '血口喷人？！我朱晏泽才不会冤枉好人！',
      death: '（猛按太阳穴）……痛……我怎么会带头指责自己的同桌……这根本不是我！'
    }
  },
  classmate_boy_corrupted: {
    id: 'classmate_boy_corrupted',
    name: '魔化男同学',
    title: '盲从起哄的附和者',
    classId: 'primary_student',
    level: 3,
    equippedWeapon: 'triangular_ruler',
    portrait: 'assets/portraits/classmate_boy_corrupted.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_green.png',
    themeColor: '#15803d',
    bio: '双眼泛着暗绿，在教室里煽风点火、随声附和。谣言与猜忌成了他的助燃剂。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 5
    },
    drops: [
      { itemId: 'sausage', chance: 0.6 }
    ],
    quotes: {
      move: '他平时六十分！今天凭什么考前几名？！',
      attack: '肯定是他偷吃了怪零食！',
      death: '对不起……我只是脑子一热跟着瞎喊的……'
    }
  },
  classmate_girl_corrupted: {
    id: 'classmate_girl_corrupted',
    name: '魔化女同学',
    title: '添油加醋的传谣者',
    classId: 'primary_student',
    level: 3,
    equippedWeapon: 'compass_needle',
    portrait: 'assets/portraits/classmate_girl_corrupted.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_pink.png',
    themeColor: '#be185d',
    bio: '脸色惨白，尖叫着四处指认同窗，手中圆规挥舞，让教室内的猜疑恐慌不断扩散。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 5
    },
    drops: [
      { itemId: 'white_rabbit_candy', chance: 0.6 }
    ],
    quotes: {
      move: '大家都看见了！徐老师说的怪零食就是他吃的！',
      attack: '离我们远点！你这个中了邪的作弊者！',
      death: '呜呜呜……我根本没看见……我只是害怕……'
    }
  }
};
