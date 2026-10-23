/**
 * 第二十章《钟楼里的最后一战》剧情脚本数据表（第二幕 第10章 · 第二幕大决战与终章）
 *
 * 流程结构：
 * - ch19_scene_final_stand: 沈万廷接通轮椅与钟楼装置，阴云遮住日光，巨魔现身
 * - ch19_battle1: 第二幕终极决战（少年团 VS 巨魔与沈氏父子）
 * - ch19_scene_boss_destroyed: 浩然正气杖随毒雾核心一同碎裂，沈氏父子失去反抗能力
 * - ch19_scene_miracle_reunion: 老师上钟楼报信，众人下到一楼与获救的海峰重逢
 * - ch19_scene_dawn_epilogue: 众人在运河岸边告别，各自准备回到日常生活
 * - ch19_scene_radio_signal: 警方在安全屋清点证物，陌生无线电信号留下第三幕悬念
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
        text: '（胸口绿光一闪，嗓音里混着沈万廷的声音）碰一下药罐，我就把你们一个个砸进地板里。',
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
        speaker: '系统提示',
        leftPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '巨魔一拳砸向钟楼边的铁栏杆。整排栏杆拧成一团，螺栓从孩子们身边擦过，钉进身后的墙里。它又往前迈了一步，脚下的地板发出一声闷响。',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 91,
        speaker: '系统提示',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        activeSide: 'left',
        text: '巨魔胸口喷出一团黑气，{MC_NAME}下意识举起木杖。“浩然正气”四个金字亮了一下，扑到面前的黑气竟被逼得散开。',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        sfx: 'sfx_suspense'
      },
      {
        id: 10,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        activeSide: 'left',
        text: '（往后退了半步）它一拳就把栏杆打成这样？我……我腿都不听使唤了。咱们真能打过吗？',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_resolute@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '我也怕。可我从地下室逃出来，不是为了站在这儿，看着他们把药送进学校。朱晏泽，别一个人往后退。',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 12,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        activeSide: 'left',
        text: '（贴着墙）等等，沈崇礼每按一次阀门，它胸口的绿光就亮一次。那几根管子还在往它身上送黑气！',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        sfx: 'sfx_confirm'
      },
      {
        id: 13,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        activeSide: 'left',
        text: '先别走散。谁被它盯上就喊，其他人把人拉开。咱们六个一起上来的，也得一起下去。',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        sfx: 'sfx_confirm'
      },
      {
        id: 14,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        activeSide: 'left',
        text: '（攥紧警徽，手还在抖）我爸拼命护我们到这里，不是为了让沈家再拿这药害人。我怕，可药罐不能离开钟楼！',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 15,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        activeSide: 'left',
        text: '我也怕。可它胸口喷出的黑气碰上这根杖就散！先打断供气管，等它慢下来，我来把浩然正气杖插进核心。你们谁都别落下！',
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
    bgImgFallback: 'assets/backgrounds/bg_clocktower_storm@2x.png',
    bgm: 'bgm_retro_level3',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '供气管被打断，巨魔的铁拳慢了下来。{MC_NAME}趁机爬上倒下的铁架，把浩然正气杖插进它胸口的核心。“浩然正气”四字再次亮起，金光照亮了整座钟楼！',
        bgImg: 'assets/backgrounds/bg_clocktower_storm@2x.png',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 11,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '浩然正气杖上的金光压住核心里翻涌的黑气。核心裂开时，嵌在里面的木杖也跟着崩成碎屑；“浩然正气”四个金字最后亮了一下，随黑雾一起散去。{MC_NAME}伸出手，却再也捡不回来了。',
        bgImg: 'assets/backgrounds/bg_clocktower_staff_sacrifice@2x.png',
        hidePortraits: true,
        itemEvent: { itemId: 'righteous_staff', action: 'lose' },
        highlight: true,
        sfx: 'sfx_suspense'
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
        text: '（望着巨魔残骸里的木屑）林大人，您让我们回去后别停下。浩然正气杖留在这里了，但今天沈家这批药没能送进学校。您当年毁掉的那池鸦片，没白毁。',
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
      },
      {
        id: 8,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '（和刘老师沿楼梯赶上来）孩子们都在！楼下省厅的人已经接手了。海峰也找到了，人还活着，就在一楼大厅，快跟我们下去！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '警笛声从货栈外传来，众人跟着两位老师沿螺旋楼梯下到一楼。',
      buttonText: '【跟老师下楼 · 去见海峰】',
      targetScene: 'ch19_scene_miracle_reunion'
    }
  },

  // s3: 一楼大厅 · 英雄归来
  ch19_scene_miracle_reunion: {
    id: 'ch19_scene_miracle_reunion',
    title: '货栈一楼大厅 · 失而复得',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_warehouse_grand_hall@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '众人下到一楼大厅，省厅增援已经带走了沈家父子，封存了最后的药罐。徐老师领着孩子们穿过人群；大厅门口，医护人员正守着一副担架。担架上的人裹着大衣，胸前缠满绷带——是海峰！',
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
      prompt: '医护人员准备把海峰抬往门外的救护车。天快亮了，众人跟着走出货栈，来到运河岸边。',
      buttonText: '【走出货栈 · 迎接破晓】',
      targetScene: 'ch19_scene_dawn_epilogue'
    }
  },

  // s4: 运河岸边 · 回到各自的生活
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
        text: '（被扶上救护车）省厅的同事回去审人、继续值勤，我去医院听医生审我。先老老实实养伤，你们也回家睡一觉，等我好些，再来讲讲这一路的事。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police_damaged@2x.png',
        activeSide: 'left',
        text: '爸，我先回家换身干衣服，下午就去医院看你。这次换我等你回家，你说了要听我们讲，就得说话算话。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police_damaged@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '说话算话。不过来一个就行，别把大伙儿全带进病房。医生看见，还以为你们要在那儿开班会。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '救护车开走了。六个孩子和两位老师站在河边，直到警灯消失在街角。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '我先回家补觉。醒了还得写暑假作业……刘老师，昨晚那一宿能写进作文里，顺便抵两页作业吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '作文可以写，数学不能抵。我睡醒还得回学校批卷子，你要是真写，就把和你一起守在那儿的人也写进去。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '不是吧？我们连沈家都拦住了，数学作业还是拦不住？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '拦不住。我先送你们回家，下午再去学校跟校长说清楚。要是校长问起作业，别看我，我也救不了你们。',
        sfx: 'sfx_confirm'
      },
      {
        id: 10,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '我先回家跟爸妈说声对不起，他们肯定急坏了。以后谁再让我一个人去解决，我先把你们全叫来，不自己扛了。',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '这才对。我先回家吃顿热饭，睡醒再来找你们。替你撑场子可以，替你写暑假作业不行。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 12,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '谁要你替我写？我还怕你照着我的抄呢。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 13,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '那我回家开一局，等海叔叔出院，咱们六个再去我家打游戏。张希哲，你可把手柄拿稳了，上回踢球连鞋都飞出去。',
        sfx: 'sfx_confirm'
      },
      {
        id: 14,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '放心，手柄没鞋带，飞不了。真输了我请早饭，行了吧？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 15,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '（听着他们吵，望向亮起来的河面）昨晚我还怕，天亮后听不见你们这样说话了。现在好了，作业、游戏、谁请早饭，还是能吵半天。以前嫌这些事没完没了，现在觉得，能一直这样就很好。我也先回家了，过两天校门口见。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 16,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '救护车已经开远，警车也驶回各自的辖区。老师领着孩子们走向不同的街口，早餐铺陆续开了门。河岸渐渐空下来，仿佛昨天那场雨和那团黑雾从没来过。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '晨光落在空荡荡的河岸上，大家都回家了。',
      buttonText: '【继续】',
      targetScene: 'ch19_scene_radio_signal'
    }
  },

  // s5: 安全屋 · 无人认领的无线电信号
  ch19_scene_radio_signal: {
    id: 'ch19_scene_radio_signal',
    title: '城北安全屋 · 下午的值班电台',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_safahouse_radio@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_safahouse_shelter@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '当天下午，孩子们都回了家。城北安全屋里只剩一名值班警员，正把从沈崇礼身上搜出的无线电台和其他证物逐一登记。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '没人碰它，电台却自己响了。值班警员停下笔，把声音调大。',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '卫星加密密电',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '『滋……三号船收到。城里的收件人换了。下一份名单，按新地址送……滋……』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '信号断了。警员拿起登记表，把“三号船”三个字记在空白处，翻遍沈崇礼的案卷，也没找到这个名字。',
        sfx: 'sfx_suspense'
      },
      {
        id: 5,
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
