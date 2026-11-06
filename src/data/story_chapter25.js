/**
 * 第二十五章《时空重逢》剧情脚本数据表（第三幕 第5章）
 *
 * 流程结构：
 * - ch25_scene_shelter_arrival: 逃入废弃地下防空洞，神秘反抗军首领与副官，熟稔道破众人习惯
 * - ch25_scene_unmasking_reunion: 摘下面罩，二十年后的成年主角与成年副官，父辈遗物与绝笔信真相
 * - ch25_scene_shoulder_to_shoulder: 防空洞闸门被热熔切割，两代六8班并肩执棍上膛
 * - ch25_battle1: 防空洞绝壁守护战（大小号联手 VS 天梯追猎者阿尔法）
 * - ch25_scene_bitter_legacy: 战后指明云端【天梯总考场】，阿瑶在维生舱与机器融为一体，需夺取古罐残片逆流回2026
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
        text: '顺着排污管道，披着黑斗篷的神秘人带着孩子们冲进一扇厚重的防爆门。防空洞里昏暗阴冷，四周堆满了旧武器和物资箱。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_nervous@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（靠在铁桶上喘着粗气，紧张地抓着钢筋，另一只手的大拇指却不停地抠着手指上缠的那圈白胶带）[next]喂！你们到底是什么人？！干嘛救我们？！街上那些满分怪物到底怎么回事？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '黑斗篷副手',
        leftPortrait: 'assets/art/shadow_cloaked_agent@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '（站在操作台阴影里，抱着手臂轻笑了一声）张希哲，这么多年了。你一慌神就死命抠手指上那圈护指胶带、抠到肉流血的毛病，还是一点都没变啊。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（手里的钢筋猛地一抖）你……你怎么会知道？！这个习惯连我爸妈都不清楚，只有我们六8班平时一起踢球的几个人才知道！你们到底是谁？！',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '神秘首领与身旁的副手对视一眼，缓缓走到昏黄的应急灯光下。',
      buttonText: '【步入灯光 · 照镜子般的奇迹】',
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
        text: '神秘人缓步走到昏黄的应急灯下，抬手掀下深黑的战术兜帽。[next]摇曳的灯光照亮了一张成熟而刚毅的脸庞，而那双清澈却布满风霜的眼眸，正平静地注视着惊呆的众人。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（死死盯着对方的眉眼，像被雷击中一般后退半步，声音剧烈发颤）[next]你……你笑起来右边嘴角的弧度……还有看人时习惯性侧耳的动作……这怎么可能……你到底是谁？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'right',
        text: '（眼眶泛红，缓缓单膝蹲下身，与十二岁的自己平视）好久不见……十二岁的我。[next]六8班那个总爱上课偷偷转笔、还在为期末考试发愁的自己。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（也从阴影中走上前，指了指自己身上洗得发白、边缘磨破的宽大警服）[next]{ALLY_2_NAME}，看看这件外套。领口是当年海峰老爸抽烟烫出的米粒小洞……胸口被扯下来的，就是我们拼死送回过去的警徽！',
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
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（眼眶通红，死死抱住十二岁的自己，声音哽咽颤抖）[next]对不起……是我们无能！整整二十年，每一个闭上眼的夜晚，全都是三号船底舱那场烧透江面的大火！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_memory_cabin_explosion@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_resistance_bunker@2x.png',
        text: '二十年前9月28日傍晚五点五十九分……底舱的烈性炸药被引爆，火浪瞬间封死通路！',
        highlight: true,
        bgm: 'bgm_broken',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_memory_teachers_hold_gate@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_resistance_bunker@2x.png',
        text: '徐老师和刘老师死死顶住被烧变形的防爆钢闸，用背挡住喷涌的铁水……',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_memory_haifeng_lifeboat@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_resistance_bunker@2x.png',
        text: '老爸浑身是血，踩中跳雷炸断了腿，却拼出最后一口气把我们五个推上充气救生筏！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 10,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_memory_ship_sinking@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_resistance_bunker@2x.png',
        text: '闸门合死前，徐老师最后冲我们喊的话是：‘活下去！带孩子们回学校！’[next]轰的一声巨响，整艘船彻底沉入江底……我们趴在救生筏上哭哑了嗓子，伸出手，却连他们的一片衣角都抓不到！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 11,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_future_exam_city@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_future_city_ruins@2x.png',
        text: '（骨节捏得泛白，眼中燃烧着不屈的怒火）大火吞没了江面，但真正的噩梦才刚开始。[next]三号船爆炸彻底释放了古罐里那股失控的能量，阿瑶启动【天梯考场】，用机械芯片抹去了全城人的喜怒哀乐，把活生生的人变成只会执行满分命令的提线木偶！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 12,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_timegate_case_send@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_future_city_ruins@2x.png',
        text: '二十年了，你们看到的这座死城，就是我们没能守住的世界——三号船爆炸后，阿瑶把全城的人都变成了没有喜怒哀乐的提线木偶，我们这些反抗军被打得七零八落，只能躲在废墟、暗河和防空洞里苟延残喘。[next]我们拼尽最后一点力气撕开时空门，把这枚警徽和预警信送回来，箱子的锁也只认海峰叔叔一个人——只有他才能打开。就是想让当年的你们知道真相，去赌一个能改变历史的机会！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 13,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_resistance_bunker@2x.png',
        text: '（轻轻揉了揉十二岁自己的头发，露出一抹释然的微笑）历史要是真的被你们改写，这个残酷的未来会消失，而我们这些长大后的自己会怎么样……谁也说不准，说不定也会跟着一起消散。[next]可那又怎样？只要徐老师、刘老师和海峰叔叔能平安活着，只要你们能拥有一个洒满阳光的真正未来，我们宁肯赌这一把。',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 14,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（泪水夺眶而出，随后死死抹去眼泪，眼神前所未有地坚定）原来你们是赌上自己的存在，在救当年的我们！[next]徐老师教过我们，浩然正气存乎于心！未来不能亡，老师们不能死！[next]二十年前没能救下他们，这一次，由我们替你们把所有人完完整整抢回来！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 15,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（抹了把脸，喉咙发堵）既然未来的我们还在这儿拼，那这条命就更不能白搭！哥几个，跟着长大后的自己，把他们统统打回去！',
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
    bgm: 'bgm_broken',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '轰隆——！！头顶通风盖板被高能热熔激光整块切穿，重重砸在地面！硝烟之中，刺耳的机械咆哮撕裂了防空洞的寂静！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '防暴歼灭猎犬',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/hound_riot@2x.png',
        activeSide: 'right',
        text: '（四足合金利爪深深抠进水泥地面，猩红电子眼疯狂闪烁，机械喉管发出令人齿酸的金属低吼）[next]咔……滋……锁定旧时代高威胁叛逆基因样本……清除协议激活！撕碎目标！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '天梯追猎者·阿尔法',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/boss_hunter_alpha@2x.png',
        activeSide: 'right',
        text: '（两米多高的重装机械躯体踏碎混凝土碎块，重型转轮机枪旋转预热，发出沉闷轰鸣）两批相差十八岁的老鼠混在一起……真是可笑的时空垃圾。[next]反抗军的苟延残喘到此为止，全部碾碎成渣！',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 4,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/boss_hunter_alpha@2x.png',
        activeSide: 'left',
        text: '（甩过来一根合金防暴棍，冷笑一声，横棍挡在最前方）十二岁的我，怕不怕？',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/boss_hunter_alpha@2x.png',
        activeSide: 'left',
        text: '怕什么！旧仓库沈家打手我们打过，虎门滩头洋枪大炮也见过了！徐老师教过我们浩然正气存乎于心！看好了——十二岁的我们从来不怕事！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/boss_hunter_alpha@2x.png',
        activeSide: 'left',
        text: '好样的！{ALLY_2_ADULT_NAME}掩护！让这帮走狗尝尝咱们六8班的厉害！上！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'JOIN_PARTY',
      unitIds: ['mc_adult_zixiao', 'fanwenmo_adult'],
      prompt: '{MC_ADULT_NAME}与{ALLY_2_ADULT_NAME}加入战斗！两代六8班并肩迎战重型追猎者阿尔法与猎犬群！',
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
        text: '既然你们连东西都能送回到过去，那为什么你们自己不回去，非要绕这么大一个圈子？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '我们在这个时代生活了二十年，早就回不去了。但你们刚从二十年前被拽过来，只要有启动时空门的能量源，就能顺着时间通道送回去！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（指着高塔全息模型）能量源就在最顶层的【天梯总考场】。阿瑶在当年爆炸后，把自己接入维生舱维持运转，吸收全城面具人的意识！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '阿瑶胸口嵌着最初的【古罐残片】！只有打上最高层拿到它，启动考场里的时空门，才能把你们送回2026年9月28日的码头！',
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
