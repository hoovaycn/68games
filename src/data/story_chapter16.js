/**
 * 第十七章《破碎的奖状》剧情脚本数据表（第二幕 第7章）
 *
 * 流程结构：
 * - ch16_scene_return_ruins: 众人携赤心木钎重返现代驳船残骸，暂时返回安全屋清点装备
 * - ch16_scene_betrayal_note: 黎明时分，浩然信物不翼而飞，桌上只留下一张被泪水浸湿的三好学生奖状与留书
 * - ch16_scene_rainy_chase: 众人顺着字迹破译真相，冒雨狂追至老城水闸废料场
 * - ch16_battle1: 水闸废料场截击战（主角团 VS 伏击的沈氏精锐死士）
 * - ch16_scene_truth_unveiled: 击退伏兵，从敌人口中得知覃瑞怡已被带往江心地下魔窟祭坛
 */

export const CHAPTER16_STORY = {
  // s1: 重返废墟 · 黎明前夕
  ch16_scene_return_ruins: {
    id: 'ch16_scene_return_ruins',
    title: '古运河驳船残骸 · 晨雾笼罩',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_barge_altar@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '晨光破开浓云，古运河的驳船甲板上一片狼藉。沈氏父子趁着时空混乱早已乘快艇逃遁，但在{MC_NAME}怀中，那柄赤红如玉的“赤心销烟钎”正散发着温润而磅礴的金光。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '大难不死，还带回了彻底克制福寿堂古毒的圣物！沈万廷父子老巢就在下游废弃的“洋行货栈”，先回安全屋补充防暴盾牌和弹药，正午展开全线合围！',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（死死捏着衣角，低着头，声音隐隐发颤）这柄木钎……真的能让所有被威胁、被下毒的人……彻底恢复清白吗？',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '当然！只要有它在，沈崇礼手里的任何毒药和档案要挟，都成不了气候！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '众人回到防空洞安全屋暂时和衣小憩，然而天刚蒙蒙亮，惊变突生！',
      buttonText: '【猛然惊醒 · 查探异动】',
      targetScene: 'ch16_scene_betrayal_note'
    }
  },

  // s2: 奖状留书 · 孤身犯险
  ch16_scene_betrayal_note: {
    id: 'ch16_scene_betrayal_note',
    title: '安全屋铁桌前 · 沾满泪痕的留言',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_safahouse_shelter@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（惊惶失措地指着空空如也的防爆箱）不……不见了！放在铁盒里的赤心木钎不见了！覃瑞怡的人也不在安全屋里！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '冰冷的铁皮桌上，压着一张被小心翼翼展平的“市级优秀学生干部”奖状。背面是覃瑞怡娟秀却颤抖的字迹，上面斑驳地落着未干的泪痕。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '信纸留言（覃瑞怡）',
        leftPortrait: 'assets/art/qinruiyi_resolute@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '『对不起大家……沈崇礼在家长会偷拍了我们全班所有人的隐秘家庭档案，还扣下了小敏的手术捐款信托。』',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '信纸留言（覃瑞怡）',
        leftPortrait: 'assets/art/qinruiyi_resolute@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '『他们说只要我天亮前把木钎送去江心水闸，就会销毁档案放过大家……我绝不能连累整个班级毁掉前途。木钎是我拿的，所有罪名我一个人扛。』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '这个傻孩子！沈崇礼那帮吃人不吐骨头的恶棍怎么可能守信用！这是去送死啊！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '带上所有家伙，全速赶往江心旧水闸！绝不能让二十年前阿瑶的悲剧，在这孩子身上重演第二遍！！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '众人冲进雷暴中的泥泞道路，顺着车辙狂追至江心废弃旧水闸！',
      buttonText: '【突袭水闸 · 撕碎防线】',
      targetScene: 'ch16_scene_rainy_chase'
    }
  },

  // s3: 暴雨追击 · 铁闸喋血
  ch16_scene_rainy_chase: {
    id: 'ch16_scene_rainy_chase',
    title: '江心旧水闸 · 泥泞与锈铁',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_watergate_ruins@2x.png',
    bgm: 'bgm_intense_boss',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '旧水闸的铁锈大门虚掩着，泥地里扔着一只熟悉的粉色双肩包。闸口阴影中，十余名戴着防毒面具、手持高压电棍的沈氏精锐死士早已严阵以待！',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '沈氏死士头目',
        leftPortrait: 'assets/art/berserker_guard_heavy@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '桀桀……六掌柜料事如神，那个天真的女班长果然把东西送来了！至于你们这帮追来的跟屁虫，就留在这给水闸当肥料吧！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '把覃瑞怡交出来！！把信物还给我们！！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '电弧在暴雨中滋滋作响，死士群猛扑而上！',
      buttonText: '【怒火爆发 · 水闸突击战】',
      battleId: 'ch16_battle1',
      isBattleTrigger: true
    }
  },

  // s4: 供词审讯 · 绝境深渊
  ch16_scene_truth_unveiled: {
    id: 'ch16_scene_truth_unveiled',
    title: '锈蚀水闸顶 · 逼供残兵',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_watergate_ruins@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/berserker_guard_heavy@2x.png',
        activeSide: 'left',
        text: '（一记反关节擒拿死死扣住头目的喉咙）说！小姑娘人在哪里？！木钎被送去哪了？！',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '沈氏死士头目',
        leftPortrait: 'assets/art/berserker_guard_heavy@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'right',
        text: '咳咳……迟了……你们去得太晚了！六掌柜和老太爷已经把她带去洋行货栈地下的“万毒血池”……要用那柄木钎作为活祭之匙，逼她喝下第一口原浆药引！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '洋行地下魔窟！一秒都不能耽搁，全员全速突进！！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '众人沿着水闸下泄洪密道，狂奔直插洋行货栈地下核心祭坛！',
      buttonText: '【突入魔窟 · 开启第十八章】',
      targetScene: 'ch17_scene_alter_breach'
    }
  }
};
