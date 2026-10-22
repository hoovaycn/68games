/**
 * 第二十章《钟楼里的最后一战》剧情脚本数据表（第二幕 第10章 · 第二幕大决战与终章）
 *
 * 流程结构：
 * - ch19_scene_final_stand: 沈万廷接通轮椅与钟楼装置，阴云遮住日光，巨魔现身
 * - ch19_battle1: 第二幕终极决战（少年团 VS 巨魔与沈氏父子）
 * - ch19_scene_boss_destroyed: 销烟杖击碎毒雾核心，沈氏父子失去反抗能力
 * - ch19_scene_miracle_reunion: 省厅增援控制现场，海峰获救归来
 * - ch19_scene_dawn_epilogue: 众人来到运河岸边迎接破晓，公海密电留下第三幕悬念
 */

export const CHAPTER19_STORY = {
  // s1: 巅峰对决前夕 · 百年魔躯
  ch19_scene_final_stand: {
    id: 'ch19_scene_final_stand',
    title: '货栈顶层钟楼大厅 · 魔尊降世',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_clocktower_summit@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '沈万廷',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（把轮椅的输液管插进控制台）我这把老骨头撑到今天，就是要看福寿堂把这批药送出去。崇礼，开闸！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        activeSide: 'left',
        text: '沈崇礼扳下启动杆。药罐里的黑气顺着管子涌出，窗外的阳光被翻涌的乌云遮住，钟楼一下暗了下来。沈万廷的轮椅还在控制台旁，管子却已经接进中央的铁架。',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '昏暗中，齿轮和铁架一节节撑开，先是两条长满倒刺的手臂，接着是一颗冒绿光的胸口。它弯下腰，整座钟楼的地板都跟着一震。',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        sfx: 'sfx_suspense'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '一头四米高的巨魔挡住出口！铁拳上长满毒刺，胸口的绿光里映出沈万廷的脸；他在轮椅上抬手，巨魔也跟着挥拳，沈崇礼则在控制台上不断往里送黑气。',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        highlight: true,
        bgm: 'bgm_retro_level3',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '沈万廷',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        activeSide: 'left',
        text: '我动不了，它替我动。谁敢碰那些药罐，就先从它拳头底下活着出去！',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '巨魔',
        leftPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        rightPortrait: 'assets/art/shen_wanting_old@2x.png',
        activeSide: 'left',
        text: '（胸口绿光一闪，嗓音里混着沈万廷的声音）谁敢碰药罐，我就砸碎谁！',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        activeSide: 'left',
        text: '楼下的老师和警察马上就要上来？先让他们吸够毒雾！等我带着药罐从后门走，学校里自然有人接货。',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '巨魔',
        leftPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '楼下的人敢上来，也一个都别想走！',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        activeSide: 'left',
        text: '（握紧警徽）我爸拼命护我们出来，不是为了让他们再拿这药害人。不能让药罐离开钟楼！',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 10,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        activeSide: 'left',
        text: '先避开巨魔的拳头！分头挡住沈家父子，打断控制台的供气管，再用销烟杖砸它胸口的核心！',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '沈万廷操纵巨魔封住出口，沈崇礼守着控制台和药罐。六个孩子迎上沈氏父子！',
      buttonText: '【迎战巨魔 · 截住最后一批毒药】',
      battleId: 'ch19_battle1',
      isBattleTrigger: true
    }
  },

  // s2: 决战胜利 · 巨灵崩解
  ch19_scene_boss_destroyed: {
    id: 'ch19_scene_boss_destroyed',
    title: '残破的钟楼露台 · 圣光普照',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_clocktower_summit@2x.png',
    bgm: 'bgm_retro_level3',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '供气管被打断，巨魔的铁拳慢了下来。{MC_NAME}趁机爬上倒下的铁架，用销烟杖击中它胸口的核心。杖上那道金光照亮了整座钟楼！',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        activeSide: 'left',
        text: '核心碎了，黑气散去，窗外的乌云也裂开一道口子，阳光重新照进钟楼。巨魔塌成满地废铁。沈万廷的轮椅停了，他瘫在座位上，已经指挥不动它；沈崇礼想抱起药罐逃走，被众人堵在门口。',
        bgm: 'bgm_victory',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '沈万廷',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（望着碎掉的核心）那罐里的东西……两百年了，怎么偏偏毁在你们手上……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（松开药罐，跌坐在地）爸，送药单没了，货也保不住了。福寿堂……真到头了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/shen_wanting_old@2x.png',
        activeSide: 'left',
        text: '（握紧销烟杖）林大人，您让我们回去后别停下。今天沈家这批药没能送进学校。您当年毁掉的那池鸦片，没白毁。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        activeSide: 'left',
        text: '沈掌柜当年明明可以接着给穷人免费发药，却自己抱着青花罐上了洋商的船。今天，我们至少拦下了沈家这批药。',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '毒雾没了！老师他们可以上来了！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '楼下突然响起了震耳欲聋的警笛长鸣，刺目的红蓝警灯划破夜空！',
      buttonText: '【望向楼下 · 奇迹重逢】',
      targetScene: 'ch19_scene_miracle_reunion'
    }
  },

  // s3: 警灯耀夜 · 英雄归来
  ch19_scene_miracle_reunion: {
    id: 'ch19_scene_miracle_reunion',
    title: '钟楼大厅废墟门前 · 铁汉柔情',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_clocktower_summit@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '省厅增援赶到，带走了沈家父子，封存了最后的药罐。徐老师和刘老师互相扶着走进来，身后几名医护人员还推着一副担架。担架上的人裹着大衣，胸前缠满绷带——是海峰！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police_damaged@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（躺在担架上，勉强扯出一点笑）哭什么，我还在呢。让医生先把我抬稳，你再扑过来。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police_damaged@2x.png',
        activeSide: 'left',
        text: '（趴到担架边，握住海峰的手）爸！你真的还活着……我以为再也见不到你了！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '水警在三号闸口的巡逻艇上找到了他，立刻送医。省厅已经备好针对那种毒针的解毒药，医生说他伤得很重，但救回来了。',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '二十年前被夺走的公道与尊严……今天，终于在这一届孩子手中彻底夺回来了。阿瑶，你看到了吗……',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '医护人员把海峰抬下钟楼。天快亮了，众人跟着来到楼外的运河岸边。',
      buttonText: '【走出钟楼 · 迎接破晓】',
      targetScene: 'ch19_scene_dawn_epilogue'
    }
  },

  // s4: 运河岸边 · 公海密电（第二幕尾声与第三幕悬念）
  ch19_scene_dawn_epilogue: {
    id: 'ch19_scene_dawn_epilogue',
    title: '古运河岸边 · 破晓时分',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_canal_dawn@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '医护人员把海峰抬到运河岸边的救护车旁。六个孩子和两位老师跟着走出仓库，晨光落在水面上；身后的钟楼敲响了第一声钟，黑雾已经散了。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police_damaged@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（被扶上救护车）医生催我走了。你们先回家睡一觉，等我好些，再来医院把这一路的事讲给我听。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police_damaged@2x.png',
        activeSide: 'left',
        text: '爸，这次换我等你回家。你说了要听我们讲，就得说话算话。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '救护车开走了。六个孩子和两位老师站在河边，直到警灯消失在街角。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '徐老师抢回的送药单和那批药都交给警方了，家长们也接到了平安电话。海叔叔有医生照顾，我们终于能喘口气了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（望着天边）打了一夜，我脑子里全是虎门的那片白烟。回头还得写暑假作业……这经历能算作文素材吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '当然算。写的时候别光写虎门的大场面，也写写和你一起守在那儿的人。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '作文晚点再写。今天一个也没少，先回家好好睡一觉，别让爸妈再担心了。',
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '（看着大家）我在仓库里真以为没人会来找我。谢谢你们。以后有什么事，我一定先跟大家说，不会再一个人扛着。',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '说好了，谁有事就叫上大伙。暑假作业除外啊，那个得各写各的！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '那等海叔叔出院，咱们六个再去我家打游戏。上回说好的那一局，这次谁也不许缺席。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 12,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '同一时间，钟楼里的警员清点沈崇礼的东西，发现一部没登记过的卫星电话。屏幕突然亮起，一条没有署名的新消息跳了出来：',
        highlight: true,
        bgm: 'bgm_suspense',
        sfx: 'sfx_suspense'
      },
      {
        id: 13,
        speaker: '卫星加密密电',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '『崇礼，城里的据点丢了，我们知道。海上的船队还在，新的试验也已经开始。你没完成的事，会有人接着做。』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 14,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '屏幕熄了。沈家父子被抓，福寿堂在城里的药和送药单都没了；但海上，还有人接着做这件事。',
        sfx: 'sfx_confirm'
      },
      {
        id: 15,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '第二幕 · 完。第三幕，敬请期待。',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '第二幕全篇落幕。',
      buttonText: '【重返主菜单】',
      targetScene: 'title_screen'
    }
  }
};
