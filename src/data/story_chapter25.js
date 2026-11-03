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
        text: '顺着排污管道，神秘人带着孩子们冲进一扇厚重的防爆门。警报声被关在门外，四周堆满了旧武器和物资箱。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（靠在铁桶上喘着粗气，握紧手里的钢筋）喂！你到底是谁？！干嘛救我们？！街上那些满分怪物到底是什么东西？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '（靠在操作台边抱臂而立，笑了笑）张希哲，二十年了。你一紧张就死命抠胶带的毛病，还是一点没变啊。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '（手里的钢筋险些脱手）你……你怎么知道？！这毛病连我妈都没注意过，只有我们打球的几个人知道！你到底是谁？！',
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
        text: '神秘人摘下防毒面具，昏黄灯光照亮了一张成熟刚毅的脸庞。眉眼和下颌处的伤疤，竟然和眼前的少年一模一样！',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（愣在原地，声音发颤）你……你的眉眼……还有下巴上的浅疤……你到底是谁？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'right',
        text: '（单膝跪地，轻轻摸了摸十二岁自己的脑袋，眼圈通红）好久不见……十二岁的我。六8班那个还在为期末考试发愁的自己。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_2_NAME}',
        activeSide: 'left',
        text: '（摘下面罩，露出洗得发白的警服）看看这件衣服。领口是当年海峰老爸抽烟烫的小洞，胸口被扯下来的……就是拼死送回过去的警徽！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（大哭着扑进三十岁自己的怀里）老爸的衣服！真的是你！老爸呢？！徐老师和刘老师呢？！你们当年为什么没能把他们救出来啊！呜呜呜……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_2_NAME}',
        activeSide: 'left',
        text: '二十年前9月28日那一夜……在三号船最底层，火势太猛了。徐老师和刘老师死死顶住防爆门，老爸用尽最后力气把我们推上逃生艇……我们只能眼睁睁看着大火吞噬整艘船，什么都做不了！',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 7,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '大爆炸之后，阿瑶利用总考场把全城的人都变成了没有感情的傀儡。我们苦撑了二十年，拼死把警徽和信送回去，就是绝不能让当年的悲剧重演！',
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
        text: '通风盖板被激光切开！三只机械猎犬扑下，两米多高的追猎队长踏碎地面，重机枪子弹瞬间上膛！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（甩过来一根合金防暴棍，笑了笑）十二岁的我，怕不怕？',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '怕什么！旧仓库沈家打手我们打过，虎门滩头洋枪大炮也见过了！徐老师教过我们浩然正气存乎于心！看好了——十二岁的我们从来不怕事！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '好样的！{ALLY_2_ADULT_NAME}掩护！让这帮走狗尝尝咱们六8班的厉害！上！',
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
        text: '战火渐渐平息，{MC_ADULT_NAME}甩掉滚烫的弹壳，调出了全息地图。',
        sfx: 'sfx_explosion'
      },
      {
        id: 2,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '既然你们能把东西送回过去，为什么不直接把我们送回2026年去阻止大爆炸？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '我们在这个时空的因果太重，回不去了。但你们六个刚从二十年前被拽过来，只要有时空矩阵的能量源，就能顺着时间逆流回去！',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 4,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_2_NAME}',
        activeSide: 'left',
        text: '（指着高塔全息模型）能量源就在最顶层的【天梯总考场】。阿瑶在当年爆炸后，把自己接入维生舱维持运转，吸收全城面具人的意识！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '阿瑶胸口嵌着最初的【地脉古罐原石】！只有打上最高层拿到原石，启动考场里的时空矩阵，才能把你们送回2026年9月28日的码头！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（接过防暴棍，目光坚定）二十年前阿瑶把我们打到这儿，二十年后，我们亲自去见她！天梯考场，我们上定了！',
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
