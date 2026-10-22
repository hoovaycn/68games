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
    portrait: 'assets/portraits/vendor_default@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_red@2x.png',
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
    portrait: 'assets/portraits/punk_default@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
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
    portrait: 'assets/portraits/fanwenmo_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
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
    portrait: 'assets/portraits/heyanxi_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_pink@2x.png',
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
    portrait: 'assets/portraits/teacher_pe_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
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
    portrait: 'assets/portraits/senior_athlete_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_red@2x.png',
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
    portrait: 'assets/portraits/zhuyanze_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
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
    equippedWeapon: 'pencil',
    portrait: 'assets/portraits/classmate_boy_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_green@2x.png',
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
    portrait: 'assets/portraits/classmate_girl_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_pink@2x.png',
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
  },
  senior_athlete_leader_corrupted: {
    id: 'senior_athlete_leader_corrupted',
    name: '魔化外校队长',
    title: '堵门发饮料的领头人',
    classId: 'sports_star',
    level: 5,
    equippedWeapon: 'dumbbell',
    portrait: 'assets/portraits/senior_athlete_leader_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_red@2x.png',
    themeColor: '#991b1b',
    bio: '明明自己也中过招，却还是站在校门外把同样的东西往别人手里塞。青蓝色的眼睛里只剩下“冠军”和“达标”两个字。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'bastard_soda', chance: 1.0 },
      { itemId: 'suspicious_beverage', chance: 1.0 }
    ],
    quotes: {
      move: '拿着！喝了就能赢！',
      attack: '冠军是抢出来的！',
      death: '我……我是不是又把这东西递给别人了……'
    }
  },

  zhangxizhe_corrupted: {
    id: 'zhangxizhe_corrupted',
    name: '异化张希哲',
    title: '被“变强”执念顶住的前锋',
    classId: 'sports_star',
    level: 6,
    equippedWeapon: 'football',
    portrait: 'assets/portraits/zhangxizhe_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_blue@2x.png',
    themeColor: '#15803d',
    bio: '眼睛里只剩下“我要更强”“我要护住别人”的念头，连最熟的同伴都认不出来了。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'bastard_soda', chance: 1.0 }
    ],
    quotes: {
      move: '得更强……',
      attack: '挡我者输！',
      death: '我刚才……是不是差点伤到你们……'
    }
  },
  qinruiyi_corrupted: {
    id: 'qinruiyi_corrupted',
    name: '异化覃瑞怡',
    title: '被“必须一直赢”勒住的队长',
    classId: 'cheerleader',
    level: 6,
    equippedWeapon: 'pom_pom',
    portrait: 'assets/portraits/qinruiyi_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_red@2x.png',
    themeColor: '#be185d',
    bio: '还挂着笑，可那笑已经空了。她还在给所有人加油，只是连自己也被“不能输”这句话困住了。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'white_rabbit_candy', chance: 1.0 }
    ],
    quotes: {
      move: '再努力一点……',
      attack: '赢了大家才会开心！',
      death: '我是不是……喊得太用力了……'
    }
  },
  coach_corrupted: {
    id: 'coach_corrupted',
    name: '异化坏教练',
    title: '把捷径当饭碗的坏教练',
    classId: 'teacher',
    level: 7,
    equippedWeapon: 'whistle',
    portrait: 'assets/portraits/coach_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
    themeColor: '#7f1d1d',
    bio: '当年靠这东西拿了第一，如今又靠它养活自己。嘴上说着“都是为了赢”，其实早就分不清自己是受害者还是加害者。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'suspicious_beverage', chance: 1.0 },
      { itemId: 'bastard_soda', chance: 1.0 },
      { itemId: 'dumbbell', chance: 1.0 }
    ],
    quotes: {
      move: '赢过一次的人，哪还回得去。',
      attack: '我这是给你们捷径！',
      death: '没了这东西……我还剩什么……'
    }
  },
  mystery_man: {
    id: 'mystery_man',
    name: '幻境坏家长',
    title: '十几年前的幕后黑手',
    classId: 'primary_student',
    level: 8,
    equippedWeapon: 'fountain_pen',
    portrait: 'assets/portraits/mystery_man_default@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
    themeColor: '#312e81',
    bio: '他也是那个组织的成员，二十年前曾用同样的手段控制了上一代学生。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 7
    },
    drops: [
      { itemId: 'discarded_snack', chance: 1.0 },
      { itemId: 'suspicious_beverage', chance: 1.0 },
      { itemId: 'moms_lunchbox', chance: 1.0 }
    ],
    quotes: {
      move: '总有人愿意为结果买单。',
      attack: '你们还小，不懂这世道。',
      death: '晚了……这城里早就不是一所学校的事了……'
    }
  },
  zhangzixiao_corrupted: {
    id: 'zhangzixiao_corrupted',
    name: '异化张子骁',
    title: '只剩最优解的棋盘脑',
    classId: 'xuesu',
    level: 8,
    equippedWeapon: 'pencil',
    portrait: 'assets/portraits/zhangzixiao_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_blue@2x.png',
    themeColor: '#1d4ed8',
    bio: '所有表情都被压平了，只剩下一张在脑子里不断推演的答题网格。为了赢，他想把自己也变成一道标准答案。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'white_rabbit_candy', chance: 1.0 }
    ],
    quotes: {
      move: '最优解……最优解……',
      attack: '这一步不会错。',
      death: '原来……不是所有东西都该算成题。'
    }
  },
  shiyunuo_corrupted: {
    id: 'shiyunuo_corrupted',
    name: '异化石予诺',
    title: '把自己画空的影子',
    classId: 'xuesu',
    level: 8,
    equippedWeapon: 'pencil',
    portrait: 'assets/portraits/shiyunuo_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_pink@2x.png',
    themeColor: '#db2777',
    bio: '她还捏着铅笔，只是眼里已经没有光了，像把自己也涂成了一张必须交卷的标准图。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'honey_tea', chance: 1.0 }
    ],
    quotes: {
      move: '再描一遍……就会像了……',
      attack: '只要够像，就不会被说没用了。',
      death: '原来……我不用把自己也画没。'
    }
  },
  zhanghanyu_corrupted: {
    id: 'zhanghanyu_corrupted',
    name: '异化张瀚瑜',
    title: '把小聪明拧成利刺的学习委员',
    classId: 'study_committee',
    level: 8,
    equippedWeapon: 'chalk_head',
    portrait: 'assets/portraits/zhanghanyu_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_green@2x.png',
    themeColor: '#047857',
    bio: '本来最会变通的脑子，这会儿只剩“我得比别人聪明”这一根绷紧的弦。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'cheat_sheet', chance: 1.0 }
    ],
    quotes: {
      move: '我得比他们快一步。',
      attack: '聪明的人才不会输。',
      death: '啧……原来我也有钻牛角尖的时候。'
    }
  },
  chenpinxuan_corrupted: {
    id: 'chenpinxuan_corrupted',
    name: '异化陈品璇',
    title: '把逞强练成铠甲的情报部长',
    classId: 'strong_boy',
    level: 8,
    equippedWeapon: 'basketball',
    portrait: 'assets/portraits/chenpinxuan_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_red@2x.png',
    themeColor: '#c2410c',
    bio: '看起来比平时更能打，可那股劲已经不是底气，而是把“我不能不行”硬顶在肩上的执拗。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'sausage', chance: 1.0 }
    ],
    quotes: {
      move: '我不能掉链子。',
      attack: '谁说我不行！',
      death: '好吧……偶尔承认自己不行，也不会怎么样。'
    }
  },
  senior_student_corrupted: {
    id: 'senior_student_corrupted',
    name: '异化学长',
    title: '被公式逼疯的高年级',
    classId: 'school_punk',
    level: 7,
    equippedWeapon: 'exercise_bat',
    portrait: 'assets/portraits/senior_student_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
    themeColor: '#4c1d95',
    bio: '穿着旧校服，嘴里疯狂念叨着考试公式，像野兽一样扑过来。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'sausage', chance: 1.0 }
    ],
    quotes: {
      move: '公式……公式……',
      attack: '别拦着我复习！',
      death: '我……全忘了……'
    }
  },
  janitor_corrupted: {
    id: 'janitor_corrupted',
    name: '异化大爷',
    title: '传达室的绝望守卫',
    classId: 'vendor_mob',
    level: 7,
    equippedWeapon: 'snack_throw',
    portrait: 'assets/portraits/janitor_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
    themeColor: '#78350f',
    bio: '原本是拦住一切危险的传达室大爷，现在却被异化零食吞噬，成为了走廊上的绝望守卫。',
    ai: {
      type: 'passive_guard',
      aggroRadius: 5
    },
    drops: [
      { itemId: 'white_rabbit_candy', chance: 1.0 }
    ],
    quotes: {
      move: '谁也不许出去……',
      attack: '回去背书！',
      death: '我连大门……都看不好……'
    }
  },

  /* ══════════════════ 第二幕新增敌军体系 ══════════════════ */
  // 1. 沈氏黑衣死士（现代打手 / 货栈与码头守卫）
  shen_guard: {
    id: 'shen_guard',
    name: '黑衣死士',
    title: '沈氏集团精锐爪牙',
    classId: 'street_loafer',
    level: 8,
    equippedWeapon: 'exercise_bat',
    portrait: 'assets/portraits/shen_guard_default@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
    themeColor: '#1e293b',
    bio: '身穿黑西装配墨镜的冷酷死士，神情麻木，服从命令近乎本能。受福寿膏余毒与利益驱使，行事凶残。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'bastard_soda', chance: 0.8 },
      { itemId: 'sausage', chance: 1.0 }
    ],
    quotes: {
      move: '清除目标，不留活口。',
      attack: '别挣扎了，乖乖认命！',
      death: '老板……任务……失败……'
    }
  },

  // 2. 异国武装水手（1839鸦片走私船武装水手）
  foreign_sailor: {
    id: 'foreign_sailor',
    name: '武装水手',
    title: '走私快艇火器水手',
    classId: 'street_loafer',
    level: 9,
    equippedWeapon: 'mop',
    portrait: 'assets/portraits/foreign_sailor_1839@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_blue@2x.png',
    themeColor: '#0369a1',
    bio: '1839年游弋在珠江口外的武装走私水手，身材魁梧满脸络腮胡，手持沉重水手短棍与缆绳工具，横行霸道。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'sausage', chance: 1.0 },
      { itemId: 'white_rabbit_candy', chance: 0.8 }
    ],
    quotes: {
      move: 'Get out of the way! (滚开！)',
      attack: '尝尝甲板上的铁棍！',
      death: 'Damn it... the tide is turning...'
    }
  },

  // 3. 初代买办死士（1839勾结洋行的大汉奸爪牙）
  comprador_assassin: {
    id: 'comprador_assassin',
    name: '初代买办死士',
    title: '怡和洋行暗影刺客',
    classId: 'study_committee',
    level: 10,
    equippedWeapon: 'recorder',
    portrait: 'assets/portraits/comprador_assassin_1839@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
    themeColor: '#701a75',
    bio: '一百八十年前投靠洋商买办家族的暗杀刺客，身着长衫手持异化骨笛，精通阴毒偷袭与精神扰乱。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 6
    },
    drops: [
      { itemId: 'honey_tea', chance: 1.0 },
      { itemId: 'bastard_soda', chance: 0.8 }
    ],
    quotes: {
      move: '洋人的银子，比骨气好使！',
      attack: '断人财路，犹如杀人父母！',
      death: '百年基业……怎么会……'
    }
  },

  // 4. 沈氏重装狂战士（注入异化浓缩物的重装头目）
  berserker_guard: {
    id: 'berserker_guard',
    name: '重装狂暴死士',
    title: '异化强化重甲守卫',
    classId: 'strong_boy',
    level: 11,
    equippedWeapon: 'dumbbell',
    portrait: 'assets/portraits/berserker_guard_heavy@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
    themeColor: '#831843',
    bio: '注射了狂暴浓缩药剂的巨汉，肌肉暴胀，双眼泛着猩红光芒，拥有极高防御与骇人蛮力。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 7
    },
    drops: [
      { itemId: 'bastard_soda', chance: 1.0 },
      { itemId: 'sausage', chance: 1.0 }
    ],
    quotes: {
      move: '吼啊啊！碾碎他们！',
      attack: '把骨头统统砸碎！',
      death: '药效……竟然……散了……'
    }
  },

  // 5. 沈崇礼（少东家 · 现代行刑者）
  shen_chongli: {
    id: 'shen_chongli',
    name: '沈崇礼',
    title: '沈氏集团执行少主',
    classId: 'teacher',
    level: 11,
    equippedWeapon: 'teaching_pointer',
    portrait: 'assets/portraits/mystery_man_corrupted@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_red@2x.png',
    themeColor: '#991b1b',
    bio: '沈万廷之子，表面斯文儒雅的名流精英，骨子里狂妄冷酷。手执合金文明杖，视底层与学生为任其收割的数字。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 7
    },
    drops: [
      { itemId: 'honey_tea', chance: 1.0 },
      { itemId: 'white_rabbit_candy', chance: 1.0 }
    ],
    quotes: {
      move: '不知天高地厚的小鬼，这里不是你们的学校！',
      attack: '规则，由我沈家来制定！',
      death: '不可思议……我怎么会输给一群毛头小孩？！'
    }
  },

  // 6. 沈万廷（幕后黑手沈会长 · 百年家主）
  shen_wanting: {
    id: 'shen_wanting',
    name: '沈万廷',
    title: '福寿堂幕后当代家主',
    classId: 'teacher',
    level: 12,
    equippedWeapon: 'whistle',
    portrait: 'assets/portraits/shen_wanting_old@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
    themeColor: '#450a0a',
    bio: '福寿堂百年阴暗传承的当代家主，苍老面容下隐藏着无尽的贪婪与野心。妄图借新时代迷魂毒素重塑百年前的提线木偶王国。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 8
    },
    drops: [
      { itemId: 'honey_tea', chance: 1.0 },
      { itemId: 'sausage', chance: 1.0 }
    ],
    quotes: {
      move: '百年大业，岂容一帮乳臭未干的毛孩子撼动！',
      attack: '见识一下真正的绝对掌控吧！',
      death: '列祖列宗……老夫不甘心啊！'
    }
  },

  // 7. 百年巨灵魔尊（福寿堂百年烟魔巨像 · 终极大Boss）
  boss_colossus: {
    id: 'boss_colossus',
    name: '百年巨灵魔尊',
    title: '福寿堂百年怨念化身',
    classId: 'strong_boy',
    level: 13,
    equippedWeapon: 'dumbbell',
    portrait: 'assets/portraits/boss_colossus_opium_god@2x.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black@2x.png',
    themeColor: '#581c87',
    bio: '沈万廷借轮椅管线操纵的钟楼铁架巨魔，胸口映着他的脸，靠沈崇礼从控制台输送的毒雾活动。',
    ai: {
      type: 'aggressive_chase',
      aggroRadius: 9
    },
    drops: [
      { itemId: 'honey_tea', chance: 1.0 },
      { itemId: 'bastard_soda', chance: 1.0 },
      { itemId: 'white_rabbit_candy', chance: 1.0 }
    ],
    quotes: {
      move: '呼……嘶……百年的沉沦，没人能逃脱……',
      attack: '在无尽的黑暗烟海中窒息吧！',
      death: '正气……林则徐的浩然正气……为何历经百年依然不灭……！'
    }
  }
};
