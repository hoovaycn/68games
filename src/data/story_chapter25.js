/**
 * 第二十五章《时空重逢》剧情脚本数据表（第三幕 第5章）
 *
 * 流程结构：
 * - ch25_scene_shelter_arrival: 逃入废弃地下防空洞，神秘反抗军首领与女副官，熟稔道破众人习惯
 * - ch25_scene_unmasking_reunion: 摘下面罩，二十年后的成年主角与成年副官，父辈遗物与绝笔信真相
 * - ch25_scene_shoulder_to_shoulder: 防空洞闸门被热熔切割，两代六8班并肩执棍上膛
 * - ch25_battle1: 防空洞绝壁守护战（大小号联手 VS 天梯追猎者阿尔法）
 * - ch25_scene_bitter_legacy: 战后指明云端【天梯总考场】，阿瑶在维生舱神明化，需夺取古罐原石逆流回2026
 */

export const CHAPTER25_STORY = {
  // s1: 暗影掩护 · 废弃防空洞里的据点
  ch25_scene_shelter_arrival: {
    id: 'ch25_scene_shelter_arrival',
    title: '地下百米 · 废弃老防空洞反抗据点',
    bgType: 'bunker',
    bgImg: 'assets/backgrounds/bg_resistance_bunker@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '穿过狭窄逼仄的排污管道，神秘人拽着五个孩子滚进了一处深埋地下数十米的厚重合金防爆门后。门外高频电磁警报与猎犬咆哮被隔绝，四周堆满了老旧的战术补给箱与改造武器。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（靠在锈蚀的防爆铁桶上剧烈咳嗽，双手握紧钢筋警惕地指着神秘人）喂！你到底是谁？！救我们有什么企图？！还有……刚才在街上那些满分怪物，到底是什么东西？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '（靠在简易示波器操作台边抱臂而立，眼底泛起温暖笑意）张希哲，二十年了。你一紧张心虚就死命抠球棒黑胶带的臭毛病，真是一点都没变啊。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '（手里的钢筋险些脱手掉在地上）你……你怎么知道？！我紧张抠胶带的习惯连我亲妈都没注意过，只有我们六8班打棒球的几个人知道！你到底是谁？！',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '神秘首领缓缓抬手解开战术头盔与防毒面具。',
      buttonText: '【摘下面罩 · 照镜子般的奇迹】',
      targetScene: 'ch25_scene_unmasking_reunion'
    }
  },

  // s2: 摘下面罩 · 照镜子般的奇迹
  ch25_scene_unmasking_reunion: {
    id: 'ch25_scene_unmasking_reunion',
    title: '防空洞控制台前 · 跨越二十年的对视',
    bgType: 'bunker',
    bgImg: 'assets/backgrounds/bg_resistance_bunker@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '神秘首领取下防毒面具，昏黄应急灯光照亮了一张饱经风霜、轮廓分明的青年面孔。眉眼、鼻梁与下颌处四年级跌打的月牙形伤疤，与眼前的少年完全一致！',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（双脚像钉在地上，声音发颤）你……你的眉眼……还有左侧下巴跳鞍马摔破缝了四针留下的月牙浅疤……你到底是谁？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'right',
        text: '（单膝跪地，布满老茧和弹片伤痕的大手极其温柔地抚摸十二岁自己的头顶，眼眶通红）好久不见……十二岁的我。或者说，二十年前……在六8班还在为期末考试发愁的自己。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_2_NAME}',
        activeSide: 'left',
        text: '（摘下战术贝雷帽与面罩，露出洗得发白的特警长袖制服）看看这件衣服。右边衣领上是海峰爸爸加夜班抽烟烫出的小焦洞，左边胸口被撕裂的布口……就是我们拼死送回2026年的警徽！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（嚎啕大哭扑进三十岁自己的怀里）海峰爸爸的衣服！真的是你！老爸呢？！徐老师和刘老师呢？！你们当年为什么没能把他们救出来啊！呜呜呜……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_2_NAME}',
        activeSide: 'left',
        text: '二十年前9月28日那一夜……在三号船最底层货舱，火势太快了。徐老师和刘老师用身体顶住变形防爆阀，海峰爸爸用尽最后力气把十二岁的我们推上逃生艇……我们只能眼睁睁看着火球把船吞噬，什么都做不了！',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 7,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '大爆炸后城市地脉撕裂，阿瑶借天梯考场把所有人变成了满分傀儡。我们苟延残喘二十年搜集芯片，拼死送回警徽和血书，就是为了哪怕粉身碎骨，也绝不能让悲剧再次发生！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '刺耳警报炸响：生化追猎队已用热熔激光切穿通风井！',
      buttonText: '【重型闸门 · 两代六8班并肩迎战】',
      targetScene: 'ch25_scene_shoulder_to_shoulder'
    }
  },

  // s3: 双峰并立 · 并肩迎战
  ch25_scene_shoulder_to_shoulder: {
    id: 'ch25_scene_shoulder_to_shoulder',
    title: '防空洞重型闸门前 · 两代人的同框',
    bgType: 'bunker',
    bgImg: 'assets/backgrounds/bg_resistance_bunker@2x.png',
    bgm: 'bgm_army_approaching',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '水泥通风盖板被暗红色激光切开大洞，铁水滋滋作响！三只闪烁幽绿复眼的机械猎犬跃下，两米多高、双联装加特林的追猎队长重重踏碎地面！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（甩给小号一根记忆钛合金防暴棍，战意昂扬）小号的我，怕不怕？',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '怕个屁！旧仓库我们打过沈家打手，虎门滩头面对过洋枪大炮！徐老师说过浩然正气存乎于心！看好了——十二岁的我们从来不是软柿子！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '好样的！{ALLY_2_ADULT_NAME}双枪掩护！让这帮天梯走狗尝尝六8班二十年陈酿的怒火！杀！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '大小主角与两代副官联手，迎战重型追猎者阿尔法与猎犬群！',
      buttonText: '【进入战斗 · 防空洞绝壁守护战】',
      battleId: 'ch25_battle1',
      isBattleTrigger: true,
      targetScene: 'ch25_scene_bitter_legacy'
    }
  },

  // s4: 硝烟散尽 · 指向云端的巨塔
  ch25_scene_bitter_legacy: {
    id: 'ch25_scene_bitter_legacy',
    title: '走廊残骸前 · 唯一的回归之路',
    bgType: 'bunker',
    bgImg: 'assets/backgrounds/bg_resistance_bunker@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '穿甲燃烧弹引爆了阿尔法的核能反应堆，火光与青烟吞没走廊。{MC_ADULT_NAME}喘着粗气甩掉滚烫弹壳，调出全息控制台。',
        sfx: 'sfx_explosion'
      },
      {
        id: 2,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '既然你们造出了能向过去传递物质的机器，为什么不直接把我们送回2026年去阻止大爆炸？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '因果律有质量锚定。我和{ALLY_2_ADULT_NAME}的因果引力太重，但你们六个刚被阿瑶拉扯过来，在时间轴上属于二十年前！只要有足够庞大的因果引力源，你们就能逆流返回！',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 4,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '（点亮云端浮空金字塔三维模型）源头就是城市最顶端的【天梯总考场】。阿瑶在当年爆炸后，把肉体接入量子维生舱封印成神，抽走全城面具人的精神运算维持运转！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '阿瑶心脏里嵌着最初也是最完整的【地脉古罐原石核心】！只有杀上最高层逼她交出原石密钥，才能启动考场中央的时空逆流矩阵，送你们回到2026年9月28日的码头！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（接过高频震荡短刃，目光坚如铸铁）二十年前阿瑶把我们打入废墟，二十年后，我们亲自去会会这位老朋友！天梯考场，我们上定了！！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '两代人整理弹药与武器，向着云端天梯金字塔进发！',
      buttonText: '【开启第二十六章 · 最后的考场】',
      targetScene: 'ch26_scene_pyramid_ascent'
    }
  }
};
