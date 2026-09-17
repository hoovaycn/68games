/**
 * 序章双线完整剧本文案配置表 (Story Pipeline)
 * 完整接入 assets/backgrounds/ 场景大图
 */
export const PROLOGUE_STORY = {
  chapterId: 'ch0_prologue',
  chapterTitle: '序章：失踪同学的异变',

  // 男主线（张子骁视角 · 对应失踪者：范文默）
  male: {
    scene_classroom: {
      id: 'scene_classroom',
      title: '人大附小 · 六 8 班教室',
      bgType: 'classroom',
      bgImg: 'assets/backgrounds/bg_classroom.png',
      bgm: 'bgm_classroom',
      dialogues: [
        {
          id: 1,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '我叫张子骁，人大附小六（8）班的学生。课间棋盘上的常胜将军，人送外号“六 8 班棋王”，信奉“走一步，看三步”。',
          sfx: 'sfx_text_blip'
        },
        {
          id: 2,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '新学期开学第三周，早读、默写、抢乒乓球台……一切本该和往常一样平淡无奇。',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/teacher_xu_default.png',
          activeSide: 'left',
          text: '直到今天清晨，教室里的气氛突然变得有些诡异。徐老师站在讲台前，脸色比平时严肃得多……',
          sfx: 'sfx_text_blip'
        },
        {
          id: 4,
          speaker: '徐老师',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/teacher_xu_default.png',
          activeSide: 'right',
          text: '子骁，早读点名范文默又没来。昨晚他爸爸给我发了一条特别反常的微信……',
          sfx: 'sfx_text_blip'
        },
        {
          id: 5,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/teacher_xu_default.png',
          activeSide: 'left',
          text: '（奇怪……徐老师平时最反感把家长私信给学生看的，今天脸色居然这么严肃……）',
          sfx: 'sfx_text_blip'
        },
        {
          id: 6,
          speaker: '徐老师',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/teacher_xu_default.png',
          activeSide: 'right',
          text: '【微信消息】“徐老师您好，小默昨晚非要我给他报高三冲刺班，一边狂做电磁学一边哭着说‘它们要来了’……这孩子平时连数学作业都抄别人的，昨晚却跟魔怔了一样……”',
          sfx: 'sfx_phone_msg'
        },
        {
          id: 7,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/teacher_xu_default.png',
          activeSide: 'left',
          text: '小默？他连九九乘法表都要掰手指头，去通宵刷高三电磁学？！',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 8,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/zhanghanyu_default.png',
          activeSide: 'left',
          text: '（这时，同桌张瀚瑜神色慌张地冲了过来。他是我最要好的铁哥们儿，平时消息最灵通……）',
          sfx: 'sfx_text_blip'
        },
        {
          id: 9,
          speaker: '张瀚瑜',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/zhanghanyu_default.png',
          activeSide: 'right',
          bgm: 'bgm_suspense',
          text: '子骁子骁！我昨天放学看见小默在校门口被一个推小车的大叔拦住了！那大叔笑得跟假人似的，还塞给他一包会发荧光的怪异零食！',
          sfx: 'sfx_text_blip'
        },
        {
          id: 10,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/zhanghanyu_default.png',
          activeSide: 'left',
          text: '校门口可疑摊贩……不行，我得趁现在去校门口截住他问个明白！',
          sfx: 'sfx_confirm'
        }
      ],
      transition: {
        type: 'CHOICE',
        prompt: '晨读铃声还未响起，你要立刻出发吗？',
        buttonText: '【走出校门 · 前往街道探查】',
        targetScene: 'scene_street_vendor'
      }
    },

    scene_street_vendor: {
      id: 'scene_street_vendor',
      title: '校外街道 · 遭遇流动商贩',
      bgType: 'street',
      bgImg: 'assets/backgrounds/bg_street.png',
      bgm: 'bgm_street',
      dialogues: [
        {
          id: 1,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/vendor_default.png',
          activeSide: 'left',
          text: '（刚走出校门，空气里就弥漫着一股过分甜腻的冷香……前面那个推车的大叔，面色青白青白的……）',
          sfx: 'sfx_text_blip'
        },
        {
          id: 2,
          speaker: '流动商贩',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/vendor_default.png',
          activeSide: 'right',
          text: '嘻嘻嘻……小朋友，买一串香喷喷的淀粉烤肠吗？吃上一口……保你倒背如流高考物理大题哦……',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/vendor_default.png',
          activeSide: 'left',
          text: '倒背如流？小学生背什么高考物理！小默变成那样果然是你搞的鬼！快把解药交出来！',
          sfx: 'sfx_attack_swing'
        },
        {
          id: 4,
          speaker: '流动商贩',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/vendor_default.png',
          activeSide: 'right',
          text: '不知天高地厚的小棋呆子……那就尝尝我投掷出的特制辣条吧！',
          sfx: 'sfx_shock_sting'
        }
      ],
      transition: {
        type: 'CHOICE',
        prompt: '恶霸商贩正挥舞辣条扑来！准备好展开第一战了吗？',
        buttonText: '【展开战斗 · 击退流动商贩】',
        battleId: 'ch0_battle1',
        isBattleTrigger: true
      }
    },

    // 击败商贩后的剧情缓冲 1
    scene_after_vendor: {
      id: 'scene_after_vendor',
      title: '校外街道 · 击退商贩',
      bgType: 'street',
      bgImg: 'assets/backgrounds/bg_street.png',
      bgm: 'bgm_street',
      dialogues: [
        {
          id: 1,
          speaker: '流动商贩',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/vendor_default.png',
          activeSide: 'right',
          text: '哎哟！现在的小学生棋路怎么这么邪门……算你狠，我的小推车不要了！',
          sfx: 'sfx_unit_down'
        },
        {
          id: 2,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '呼……商贩扔下小推车溜走了。车上掉落了一包发着诡异荧光的【淀粉烤肠】。',
          sfx: 'sfx_item_get'
        },
        {
          id: 3,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '（这就是从小默家搜出来的同款零食！上面印着‘黑心作坊出品’……前方巷口似乎还有动静！）',
          sfx: 'sfx_text_blip'
        }
      ],
      transition: {
        type: 'CHOICE',
        prompt: '收起战利品，准备前往巷口查看情况。',
        buttonText: '【继续往前走 · 探索巷口】',
        targetScene: 'scene_street_punk'
      }
    },

    // 遭遇高年级混混
    scene_street_punk: {
      id: 'scene_street_punk',
      title: '校外巷口 · 拦截高年级混混',
      bgType: 'street',
      bgImg: 'assets/backgrounds/bg_street.png',
      bgm: 'bgm_street',
      dialogues: [
        {
          id: 1,
          speaker: '高年级混混',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/punk_default.png',
          activeSide: 'right',
          text: '喂！六年级的小鬼，慌里慌张去哪呢？把身上值钱的文具和零食统统留下，学长今天心情不好……',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 2,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/punk_default.png',
          activeSide: 'left',
          text: '（这家伙手里卷着五年中考三年模拟，眼白都是血丝……看来也是被焦虑怪异侵蚀了！）',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/punk_default.png',
          activeSide: 'left',
          text: '别挡道！我还要去救范文默呢！这步棋，叫将军！',
          sfx: 'sfx_confirm'
        }
      ],
      transition: {
        type: 'CHOICE',
        prompt: '狂暴的高年级混混掏出了铅笔盒！准备展开第二战！',
        buttonText: '【展开战斗 · 击退混混】',
        battleId: 'ch0_battle2',
        isBattleTrigger: true
      }
    },

    // 击败混混后的剧情缓冲 2
    scene_before_home: {
      id: 'scene_before_home',
      title: '校外巷口 · 扫清障碍',
      bgType: 'street',
      bgImg: 'assets/backgrounds/bg_street.png',
      bgm: 'bgm_street',
      dialogues: [
        {
          id: 1,
          speaker: '高年级混混',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/punk_default.png',
          activeSide: 'right',
          text: '可恶……我的五年中考三年模拟居然输给了小学生……你给我等着！',
          sfx: 'sfx_unit_down'
        },
        {
          id: 2,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '收工！终于把阻碍都扫清了。小默家就在前面这栋楼的 402 室……',
          sfx: 'sfx_confirm'
        }
      ],
      transition: {
        type: 'CHOICE',
        prompt: '小默家大门紧闭，室内隐隐泛着血红色微光。',
        buttonText: '【敲门上楼 · 查看范文默情况】',
        targetScene: 'scene_home'
      }
    },

    scene_home: {
      id: 'scene_home',
      title: '范文默家 · 异变现场',
      bgType: 'classroom',
      bgImg: 'assets/backgrounds/bg_home.png',
      bgm: 'bgm_suspense',
      dialogues: [
        {
          id: 1,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_default.png',
          activeSide: 'left',
          text: '一路狂奔赶到小默家，防盗门虚掩着一条缝，里面飘出一股淡淡的墨水味。',
          sfx: 'sfx_confirm'
        },
        {
          id: 2,
          speaker: '范文默',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_default.png',
          activeSide: 'right',
          text: '……子骁？你怎么逃课过来了……我今天只是有点头痛，在家里预习呢……',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_default.png',
          activeSide: 'left',
          text: '小默！徐老师和瀚瑜都很担心你！你平时连早操都不落下的，到底怎么了？',
          sfx: 'sfx_text_blip'
        },
        {
          id: 4,
          speaker: '范文默',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_default.png',
          activeSide: 'right',
          text: '我真的没事……你看，我还在写物理题呢……只要把这道题解开……只要解开……（声音开始颤抖）',
          sfx: 'sfx_text_blip'
        },
        {
          id: 5,
          speaker: '范文默',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_corrupted.png',
          activeSide: 'right',
          bgImg: 'assets/backgrounds/bg_home_eerie.png',
          bgm: 'bgm_eerie_revelation',
          text: '……动量守恒……麦克斯韦方程组……嘻嘻……为什么路程差算不出来？！只要刷完这套五三……“它们”就会把脑子还给我……嘻嘻嘻……',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 6,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_corrupted.png',
          activeSide: 'left',
          bgImg: 'assets/backgrounds/bg_home_eerie.png',
          text: '小默？！你的眼睛怎么泛着诡异红光！满地都是高三草稿纸，连墙上都写满了血色公式！',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 7,
          speaker: '范文默',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_corrupted.png',
          activeSide: 'right',
          bgImg: 'assets/backgrounds/bg_home_eerie.png',
          text: '不能停下……“它们”在书桌下面看着呢……（突然惊恐抱头痛苦大喊）……子骁快走！千万别吃校门口推车的零食……“它们”会吃掉你的脑子！快走啊！！',
          sfx: 'sfx_text_blip'
        },
        {
          id: 8,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_corrupted.png',
          activeSide: 'left',
          bgImg: 'assets/backgrounds/bg_home_eerie.png',
          text: '（书桌阴影里赫然摆着一包撕开的荧光“三无怪味零食”……和小吃摊贩卖的一模一样！“它们”究竟是什么？！）',
          sfx: 'sfx_shock_sting'
        }
      ],
      transition: {
        type: 'CHOICE',
        prompt: '小默彻底被怪异控制，随时准备扑上来！门外突然传来急促的砸门声！',
        buttonText: '【回头查看门外动静】',
        targetScene: 'scene_home_reinforce'
      }
    },

    // 男线 s5：张瀚瑜破门支援 + 首次入队弹窗
    scene_home_reinforce: {
      id: 'scene_home_reinforce',
      title: '范文默家 · 队友破门支援',
      bgType: 'classroom',
      bgImg: 'assets/backgrounds/bg_home_eerie.png',
      bgm: 'bgm_battle_normal',
      dialogues: [
        {
          id: 1,
          speaker: '张瀚瑜',
          leftPortrait: 'assets/art/zhanghanyu_default.png',
          rightPortrait: 'assets/art/zhangzixiao_default.png',
          activeSide: 'left',
          text: '砰——！子骁！我就知道你会一个人逞能跑过来！我问了三个路人才追上你——我操这什么情况？！',
          sfx: 'sfx_hit_crit'
        },
        {
          id: 2,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhanghanyu_default.png',
          rightPortrait: 'assets/art/zhangzixiao_default.png',
          activeSide: 'right',
          text: '瀚瑜？！你怎么跟来了！别靠近，小默现在神志不清，力气大得吓人！',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '张瀚瑜',
          leftPortrait: 'assets/art/zhanghanyu_default.png',
          rightPortrait: 'assets/art/zhangzixiao_default.png',
          activeSide: 'left',
          text: '我是学委，班上同学掉队了能不管吗！我包里有粉笔头和小测验重点，咱俩配合，物理把他打醒！',
          sfx: 'sfx_confirm'
        }
      ],
      transition: {
        type: 'JOIN_PARTY',
        unitId: 'zhanghanyu',
        prompt: '同桌铁哥们张瀚瑜赶到了身边！',
        buttonText: '【结成双人小队 · 唤醒小默】',
        battleId: 'ch0_battle3',
        isBattleTrigger: true
      }
    },

    // 男线 s6：战后打醒恢复 + 范文默入队
    scene_home_recover: {
      id: 'scene_home_recover',
      title: '范文默家 · 清醒与说漏嘴',
      bgType: 'classroom',
      bgImg: 'assets/backgrounds/bg_home.png',
      bgm: 'bgm_suspense',
      dialogues: [
        {
          id: 1,
          speaker: '范文默',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_default.png',
          activeSide: 'right',
          text: '（剧烈喘息，眼瞳中的青光逐渐散去）……咳咳……子骁……瀚瑜……？你们怎么都在我家书房……？满地怎么都是草稿纸……',
          sfx: 'sfx_unit_down'
        },
        {
          id: 2,
          speaker: '张瀚瑜',
          leftPortrait: 'assets/art/zhanghanyu_default.png',
          rightPortrait: 'assets/art/fanwenmo_default.png',
          activeSide: 'left',
          text: '呼——！终于打醒了！你刚才跟吃了大力丸似的，挥着大厚书追着我们满屋跑！到底怎么回事？！',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '范文默',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_default.png',
          activeSide: 'right',
          text: '我……我昨天放学在校门口，那个推车商贩说只要吃下一口……就能把整本冲刺题背下来……',
          sfx: 'sfx_text_blip'
        },
        {
          id: 4,
          speaker: '范文默',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_default.png',
          activeSide: 'right',
          text: '然后我的脑袋里全是算式的尖叫声……根本停不下来……它们说……下周一……还要来学校……',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 5,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_default.png',
          activeSide: 'left',
          text: '果然是那个推车商贩搞的鬼！小默，这包剩下的怪味零食我先收下了。下周一，我们绝不能坐视不管！',
          sfx: 'sfx_item_get'
        },
        {
          id: 6,
          speaker: '范文默',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: 'assets/art/fanwenmo_default.png',
          activeSide: 'right',
          text: '谢谢你们把我打醒……以后查探校外怪事，算我一个，我虽然成绩差，但搬砖力气管够！',
          sfx: 'sfx_confirm'
        }
      ],
      transition: {
        type: 'JOIN_PARTY',
        unitId: 'fanwenmo',
        prompt: '恢复理智的小默决定加入异闻调查队！',
        buttonText: '【收纳物证 · 深夜回访】',
        targetScene: 'scene_home_night'
      }
    },

    // 男线 s7：主角家深夜 · 零食留白收尾
    scene_home_night: {
      id: 'scene_home_night',
      title: '深夜 · 张子骁房间',
      bgType: 'classroom',
      bgImg: 'assets/backgrounds/bg_home_mc.png',
      bgm: 'bgm_suspense',
      dialogues: [
        {
          id: 1,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '深夜十一点半，台灯下只有秒针滴答走动的声响。',
          sfx: 'sfx_text_blip'
        },
        {
          id: 2,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '那包从小默书桌上带回来的怪异零食，正静静躺在我的棋盘旁，表面泛着若隐若现的幽暗荧光。',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 3,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '“……只要吃一口，就能算清后面十步棋……就能考上九十分么……”',
          sfx: 'sfx_text_blip'
        },
        {
          id: 4,
          speaker: '张子骁',
          leftPortrait: 'assets/art/zhangzixiao_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '我的手指不由自主地触碰到了包装袋的一角……冰凉刺骨……',
          sfx: 'sfx_text_blip'
        }
      ],
      transition: {
        type: 'CHAPTER_CLEAR',
        prompt: '第一章《失踪同学的异变》完结！黑暗中的谜团才刚刚露出冰山一角……',
        buttonText: '【第一章结案 · 查看调查总结】'
      }
    }
  },

  // 女主线（石予诺视角 · 对应失踪者：何妍熹）
  female: {
    scene_classroom: {
      id: 'scene_classroom',
      title: '人大附小 · 六 8 班教室',
      bgType: 'classroom',
      bgImg: 'assets/backgrounds/bg_classroom.png',
      bgm: 'bgm_classroom',
      dialogues: [
        {
          id: 1,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '我是石予诺，六（8）班的美术课代表。我的速写本上没有“画不下去”这一页！',
          sfx: 'sfx_text_blip'
        },
        {
          id: 2,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '新学期刚开学不久，大家都在为了升学打拼，教室里每天都是狂背英语单词和默写公式的声音。',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/teacher_xu_default.png',
          activeSide: 'left',
          text: '不过今天早上气氛有些不对劲……徐老师正在讲台上焦急地查看着手机，把我叫了过去……',
          sfx: 'sfx_text_blip'
        },
        {
          id: 4,
          speaker: '徐老师',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/teacher_xu_default.png',
          activeSide: 'right',
          text: '予诺，妍熹今天早自习没来。她妈妈昨晚深夜给我发了一条微信请假……',
          sfx: 'sfx_text_blip'
        },
        {
          id: 5,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/teacher_xu_default.png',
          activeSide: 'left',
          text: '徐老师，妍熹昨天放学还约我一起看动漫呢，她生病了吗？',
          sfx: 'sfx_text_blip'
        },
        {
          id: 6,
          speaker: '徐老师',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/teacher_xu_default.png',
          activeSide: 'right',
          text: '【微信消息】“老师，妍熹昨晚抱着长笛不肯撒手，同一个音翻来覆去练到凌晨三点，关灯就哭着说‘外面有脏东西’……今天把自己锁在房间里不肯出门……”',
          sfx: 'sfx_phone_msg'
        },
        {
          id: 7,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/chenpinxuan_default.png',
          activeSide: 'left',
          text: '（走廊尽头，陈品璇急匆匆地跑了过来。她是我的贴心好闺蜜，也是班上的八卦特派员。）',
          sfx: 'sfx_text_blip'
        },
        {
          id: 8,
          speaker: '陈品璇',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/chenpinxuan_default.png',
          activeSide: 'right',
          bgm: 'bgm_suspense',
          text: '予诺！昨天体育课我就觉得妍熹不对劲！平时看见我就叽叽喳喳的，昨天一个人蹲在墙角抱着长笛发疯一样比划，眼神直勾勾的！',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 9,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/chenpinxuan_default.png',
          activeSide: 'left',
          text: '有个声音在催她……？品璇，你先帮我打掩护，我必须趁课间去校外看看！',
          sfx: 'sfx_confirm'
        }
      ],
      transition: {
        type: 'CHOICE',
        prompt: '为了闺蜜何妍熹，你要现在出校调查吗？',
        buttonText: '【走出校门 · 前往街道探查】',
        targetScene: 'scene_street_vendor'
      }
    },

    scene_street_vendor: {
      id: 'scene_street_vendor',
      title: '校外街道 · 遭遇流动商贩',
      bgType: 'street',
      bgImg: 'assets/backgrounds/bg_street.png',
      bgm: 'bgm_street',
      dialogues: [
        {
          id: 1,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/vendor_default.png',
          activeSide: 'left',
          text: '（校门外的人行道上……那个推着发光小推车的大叔，笑得好诡异……）',
          sfx: 'sfx_text_blip'
        },
        {
          id: 2,
          speaker: '流动商贩',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/vendor_default.png',
          activeSide: 'right',
          text: '漂亮的小姑娘，来尝尝阿伯的特制零食吗？吃上一口……保你落笔就是美院满分卷哦……',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/vendor_default.png',
          activeSide: 'left',
          text: '小学生考什么美院！妍熹听到的怪声音就是你捣的鬼吧！',
          sfx: 'sfx_attack_swing'
        },
        {
          id: 4,
          speaker: '流动商贩',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/vendor_default.png',
          activeSide: 'right',
          text: '多管闲事的小丫头……那就尝尝我的投掷辣条！',
          sfx: 'sfx_shock_sting'
        }
      ],
      transition: {
        type: 'CHOICE',
        prompt: '恶霸商贩挥舞辣条扑来！准备好展开第一战了吗？',
        buttonText: '【展开战斗 · 击退流动商贩】',
        battleId: 'ch0_battle1',
        isBattleTrigger: true
      }
    },

    scene_after_vendor: {
      id: 'scene_after_vendor',
      title: '校外街道 · 击退商贩',
      bgType: 'street',
      bgImg: 'assets/backgrounds/bg_street.png',
      bgm: 'bgm_street',
      dialogues: [
        {
          id: 1,
          speaker: '流动商贩',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/vendor_default.png',
          activeSide: 'right',
          text: '哎哟！现在的小画家怎么这么凶……小推车不要了，快闪！',
          sfx: 'sfx_unit_down'
        },
        {
          id: 2,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '商贩跑了！推车旁掉落了一包诡异的【怪味淀粉香肠】。',
          sfx: 'sfx_item_get'
        },
        {
          id: 3,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '（上面印着黑心作坊标志……前面的巷口好像有人在挑衅，去看看！）',
          sfx: 'sfx_text_blip'
        }
      ],
      transition: {
        type: 'CHOICE',
        prompt: '收起战利品，准备前往巷口查看情况。',
        buttonText: '【继续往前走 · 探索巷口】',
        targetScene: 'scene_street_punk'
      }
    },

    scene_street_punk: {
      id: 'scene_street_punk',
      title: '校外巷口 · 拦截高年级混混',
      bgType: 'street',
      bgImg: 'assets/backgrounds/bg_street.png',
      bgm: 'bgm_street',
      dialogues: [
        {
          id: 1,
          speaker: '高年级混混',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/punk_default.png',
          activeSide: 'right',
          text: '喂！六年级的小妹妹，把身上值钱的零食和文具交出来，学长今天心情很糟糕！',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 2,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/punk_default.png',
          activeSide: 'left',
          text: '（这家伙手里拿着五三词汇表，眼神直发愣……也是被怪物污染了！）',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/punk_default.png',
          activeSide: 'left',
          text: '让开！我还要去救何妍熹！没有我画不出来的活路！',
          sfx: 'sfx_confirm'
        }
      ],
      transition: {
        type: 'CHOICE',
        prompt: '狂暴的高年级混混围了上来！准备展开第二战！',
        buttonText: '【展开战斗 · 击退混混】',
        battleId: 'ch0_battle2',
        isBattleTrigger: true
      }
    },

    scene_before_home: {
      id: 'scene_before_home',
      title: '校外巷口 · 扫清障碍',
      bgType: 'street',
      bgImg: 'assets/backgrounds/bg_street.png',
      bgm: 'bgm_street',
      dialogues: [
        {
          id: 1,
          speaker: '高年级混混',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/punk_default.png',
          activeSide: 'right',
          text: '呜呜……现在的班干居然会打人……我输了！',
          sfx: 'sfx_unit_down'
        },
        {
          id: 2,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '成功解决！妍熹家就在前面这栋楼的 301 室，赶快上去！',
          sfx: 'sfx_confirm'
        }
      ],
      transition: {
        type: 'CHOICE',
        prompt: '妍熹家门缝里飘出淡淡的怪异焦味。',
        buttonText: '【敲门上楼 · 查看何妍熹情况】',
        targetScene: 'scene_home'
      }
    },

    // 商贩被击败后切换的中段剧情：混混登场前先有对话
    scene_punk_intro: {
      id: 'scene_punk_intro',
      title: '校外巷口 · 高年级混混登场',
      bgType: 'street',
      bgImg: 'assets/backgrounds/bg_street.png',
      bgm: 'bgm_street',
      dialogues: [
        {
          id: 1,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/vendor_default.png',
          activeSide: 'left',
          text: '呼……商贩被击退，掉落了一串【烤肠】。妍熹果然就是被他用怪零食控制的……',
          sfx: 'sfx_item_get'
        },
        {
          id: 2,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/punk_default.png',
          activeSide: 'left',
          text: '得赶紧去妍熹家——（突然身后巷口传来踩碎瓶子的脆响）咦？',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '高年级混混',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/punk_default.png',
          activeSide: 'right',
          text: '六年级的小学妹，身上带零花钱了吗？借学长买两套冲刺卷怎么样？别磨蹭！',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 4,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/punk_default.png',
          activeSide: 'left',
          text: '（他手里卷着练习册当武器，眼白充血……看来也是被焦虑侵蚀了！就在同一张地图上把他打发了！）',
          sfx: 'sfx_confirm'
        }
      ],
      transition: {
        type: 'SPAWN_REINFORCEMENT',
        prompt: '敌方援军进入战场！',
        buttonText: '【迎战 · 击退混混援军】'
      }
    },

    scene_home: {
      id: 'scene_home',
      title: '何妍熹家 · 异变现场',
      bgType: 'classroom',
      bgImg: 'assets/backgrounds/bg_home.png',
      bgm: 'bgm_suspense',
      dialogues: [
        {
          id: 1,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/heyanxi_default.png',
          activeSide: 'left',
          text: '击败混混后，我气喘吁吁地按响了妍熹家的门铃。妍熹探出头，脸色略显苍白。',
          sfx: 'sfx_confirm'
        },
        {
          id: 2,
          speaker: '何妍熹',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/heyanxi_default.png',
          activeSide: 'right',
          text: '予诺……？你怎么逃课过来了……我今天有点发低烧，妈妈让我卧床休息呢……',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/chenpinxuan_default.png',
          activeSide: 'left',
          text: '妍熹！品璇和我快急疯了！品璇说昨天体育课你眼神直勾勾的，昨晚阿姨还说你一直哭……',
          sfx: 'sfx_text_blip'
        },
        {
          id: 4,
          speaker: '何妍熹',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/heyanxi_default.png',
          activeSide: 'right',
          text: '品璇那个贪吃鬼，又在瞎编了……我真的只是太困了……只要再练熟这一个小节……（手指开始剧烈颤抖）',
          sfx: 'sfx_text_blip'
        },
        {
          id: 5,
          speaker: '何妍熹',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/heyanxi_corrupted.png',
          activeSide: 'right',
          bgImg: 'assets/backgrounds/bg_home_eerie.png',
          bgm: 'bgm_eerie_revelation',
          text: '……升C……降E……练完这一整本练习曲……耳朵里的那些虫鸣声……就会停下来了吧……嘻嘻……嘻嘻嘻……',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 6,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/heyanxi_corrupted.png',
          activeSide: 'left',
          bgImg: 'assets/backgrounds/bg_home_eerie.png',
          text: '妍熹？！你的瞳孔为什么在散发幽蓝冷光！满墙满床贴的都是写满乐句的便利贴！',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 7,
          speaker: '何妍熹',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/heyanxi_corrupted.png',
          activeSide: 'right',
          bgImg: 'assets/backgrounds/bg_home_eerie.png',
          text: '予诺……快闭上耳朵！“它们”顺着网线和电波爬过来了……千万别喝校门口商贩的汽水……别听它们的声音啊啊啊——！！',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 8,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/heyanxi_corrupted.png',
          activeSide: 'left',
          bgImg: 'assets/backgrounds/bg_home_eerie.png',
          text: '（书桌阴影里赫然摆着一包泛着诡异荧光的“三无怪味零食”……那个流动商贩到底是给谁做事的？！）',
          sfx: 'sfx_shock_sting'
        }
      ],
      transition: {
        type: 'CHOICE',
        prompt: '妍熹彻底被错乱音律控制，握紧竖笛步步逼近！门外忽然传来咚咚咚的砸门声！',
        buttonText: '【回头查看门外动静】',
        targetScene: 'scene_home_reinforce'
      }
    },

    // 女线 s5：陈品璇破门支援 + 首次入队弹窗
    scene_home_reinforce: {
      id: 'scene_home_reinforce',
      title: '何妍熹家 · 队友破门支援',
      bgType: 'classroom',
      bgImg: 'assets/backgrounds/bg_home_eerie.png',
      bgm: 'bgm_battle_normal',
      dialogues: [
        {
          id: 1,
          speaker: '陈品璇',
          leftPortrait: 'assets/art/chenpinxuan_default.png',
          rightPortrait: 'assets/art/shiyunuo_default.png',
          activeSide: 'left',
          text: '哐当——！予诺！我就知道你一个人偷偷溜过来了！我一路小跑，书包里的篮球差点颠飞出来！——哇啊！妍熹怎么变这样了？！',
          sfx: 'sfx_hit_crit'
        },
        {
          id: 2,
          speaker: '石予诺',
          leftPortrait: 'assets/art/chenpinxuan_default.png',
          rightPortrait: 'assets/art/shiyunuo_default.png',
          activeSide: 'right',
          text: '品璇！别大意，妍熹被怪异音波控制了，吹出来的音浪能震碎玻璃！',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '陈品璇',
          leftPortrait: 'assets/art/chenpinxuan_default.png',
          rightPortrait: 'assets/art/shiyunuo_default.png',
          activeSide: 'left',
          text: '哼，管她什么音浪，在我面前都得趴下！姐可是全校铅球第一名，咱俩一起上，先把她制伏打醒！',
          sfx: 'sfx_confirm'
        }
      ],
      transition: {
        type: 'JOIN_PARTY',
        unitId: 'chenpinxuan',
        prompt: '情报特派员陈品璇赶到了身边！',
        buttonText: '【结成双人小队 · 唤醒妍熹】',
        battleId: 'ch0_battle3',
        isBattleTrigger: true
      }
    },

    // 女线 s6：战后打醒恢复 + 何妍熹入队
    scene_home_recover: {
      id: 'scene_home_recover',
      title: '何妍熹家 · 清醒与说漏嘴',
      bgType: 'classroom',
      bgImg: 'assets/backgrounds/bg_home.png',
      bgm: 'bgm_suspense',
      dialogues: [
        {
          id: 1,
          speaker: '何妍熹',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/heyanxi_default.png',
          activeSide: 'right',
          text: '（长笛当啷落地，眼神恢复清亮）……唔……予诺……品璇……？你们怎么会跑到我房间里来了……？我的手好酸……',
          sfx: 'sfx_unit_down'
        },
        {
          id: 2,
          speaker: '陈品璇',
          leftPortrait: 'assets/art/chenpinxuan_default.png',
          rightPortrait: 'assets/art/heyanxi_default.png',
          activeSide: 'left',
          text: '累死我了！你刚才吹笛子跟催命似的，追着我们满屋子跑！快老实交代，到底怎么回事？！',
          sfx: 'sfx_text_blip'
        },
        {
          id: 3,
          speaker: '何妍熹',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/heyanxi_default.png',
          activeSide: 'right',
          text: '我……我昨天放学在校门口，那个推车商贩塞给我一包东西，说只要吃一口，这次升学选拔赛的长笛曲目就能闭着眼睛吹出来……',
          sfx: 'sfx_text_blip'
        },
        {
          id: 4,
          speaker: '何妍熹',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/heyanxi_default.png',
          activeSide: 'right',
          text: '然后我的脑袋就像被电波控制了一样……根本停不下来……它们说……下周一……还要来学校接管大家……',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 5,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/heyanxi_default.png',
          activeSide: 'left',
          text: '果然是校门口推车商贩搞的鬼！这包吃剩的怪零食我先扣下了。下周一，我们必须查个水落石出！',
          sfx: 'sfx_item_get'
        },
        {
          id: 6,
          speaker: '何妍熹',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: 'assets/art/heyanxi_default.png',
          activeSide: 'right',
          text: '谢谢你们把我唤醒……下周一调查，带上我一起吧，我的长笛能发出安抚心灵的音律！',
          sfx: 'sfx_confirm'
        }
      ],
      transition: {
        type: 'JOIN_PARTY',
        unitId: 'heyanxi',
        prompt: '恢复清醒的妍熹决定加入异闻调查小队！',
        buttonText: '【收纳物证 · 深夜回访】',
        targetScene: 'scene_home_night'
      }
    },

    // 女线 s7：主角家深夜 · 零食留白收尾
    scene_home_night: {
      id: 'scene_home_night',
      title: '深夜 · 石予诺画室',
      bgType: 'classroom',
      bgImg: 'assets/backgrounds/bg_home_mc.png',
      bgm: 'bgm_suspense',
      dialogues: [
        {
          id: 1,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '深夜十一点半，台灯静静照在画架上，窗外的城市一片漆黑。',
          sfx: 'sfx_text_blip'
        },
        {
          id: 2,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '那包从妍熹书桌带回来的怪异零食，正摆在我的调色盘旁，散发着若有若无的冷光。',
          sfx: 'sfx_shock_sting'
        },
        {
          id: 3,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '“……只要吃一口，就能画出所有人都惊叹的名画……就能稳拿第一么……”',
          sfx: 'sfx_text_blip'
        },
        {
          id: 4,
          speaker: '石予诺',
          leftPortrait: 'assets/art/shiyunuo_default.png',
          rightPortrait: null,
          activeSide: 'left',
          text: '我的画笔不由自主地朝着包装袋探去……指尖一阵莫名的冰凉刺痛……',
          sfx: 'sfx_text_blip'
        }
      ],
      transition: {
        type: 'CHAPTER_CLEAR',
        prompt: '第一章《失踪同学的异变》完结！黑心商贩背后的阴谋才刚刚露出冰山一角……',
        buttonText: '【第一章结案 · 查看调查总结】'
      }
    }
  }
};
