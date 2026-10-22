/**
 * 第十八章《班长去哪了》剧情脚本数据表（第二幕 第8章）
 *
 * 流程结构：
 * - ch16_scene_return_ruins: 众人携浩然销烟杖重返现代驳船残骸，暂时返回安全屋清点装备
 * - ch16_scene_betrayal_note: 黎明时分，浩然信物不翼而飞，桌上只留下一张被泪水浸湿的三好学生奖状与留书
 * - ch16_scene_rainy_chase: 众人顺着字迹破译真相，冒雨狂追至老城水闸废料场
 * - ch16_battle1: 水闸废料场截击战（主角团 VS 伏击的沈氏精锐死士）
 * - ch16_scene_truth_unveiled: 击退伏兵，从敌人口中得知覃瑞怡已被带往江心地下魔窟祭坛
 */

export const CHAPTER16_STORY = {
  // s1: 重返废墟 · 黎明前夕
  ch16_scene_return_ruins: {
    id: 'ch16_scene_return_ruins',
    title: '古运河驳船残骸 · 雨夜将尽',
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
        text: '夜还没亮，众人重新落在破损的驳船上。沈氏父子早趁混乱坐快艇逃了；{MC_NAME}手里还握着林则徐交给大家的销烟杖。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '等等，我们要是没穿越回虎门，沈掌柜就不会知道“福寿堂两百年后还在”。他原本还免费给穷人发药，会不会是我们告诉了他未来，他才决定跟洋商走？',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '那福寿堂后来变坏，会不会跟我们穿越回去有关？可洋商早就找上他了。就算我们没说，他真会一直好好开药铺吗？',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '先回安全屋把人和装备点清楚，再联系增援。沈家躲在下游的旧洋行仓库，等天亮了，我们就去堵住出口。销烟杖先锁进防爆箱，别再让他们抢走。',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（手机震了一下，她看完消息，脸色发白）沈崇礼手里……真的有我们班每个人的住址吗？',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '海叔叔请警方去联系家长了，可还没挨家通知到。回安全屋咱们一起想办法。瑞怡，谁给你发的消息？',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '瑞怡没回答。众人回到安全屋，把销烟杖锁好，轮流睡了一会儿。天刚亮，张希哲发现防爆箱被打开了。',
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
        text: '（惊慌失措地指着空空如也的防爆箱）不……不见了！放在铁盒里的浩然销烟杖不见了！覃瑞怡的人也不在安全屋里！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '铁皮桌上留着覃瑞怡从书包里拿出的“市级优秀学生干部”奖状。她把奖状翻过来当信纸，背面写满了字，纸角还有没干的泪痕。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '信纸留言（覃瑞怡）',
        leftPortrait: 'assets/art/qinruiyi_resolute@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '『对不起大家……刚才沈崇礼发来六 8 班家庭联系表的照片，上面有每个人的住址。他还拍了我家门口，说他们已经知道我们住哪儿。』',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '信纸留言（覃瑞怡）',
        leftPortrait: 'assets/art/qinruiyi_resolute@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '『他要我天亮前独自把销烟杖送到江心旧水闸。不给，就按地址抓同学试药，从我家开始；我敢把消息告诉你们，他就立刻动手。我知道他可能骗人，可我不敢拿全班同学赌。是我拿的杖，别怪别人。』',
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
        text: '我让警方继续联系家长，先守住名单上最近的几户，也派人封住水闸外侧。咱们赶紧去救瑞怡！不能让二十年前阿瑶的事，再发生在她身上！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '警方分头联系家长、封住水闸外侧；众人顺着雨地上的车辙追到江心旧水闸。',
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
        leftPortrait: 'assets/art/berserker_guard_heavy@2x.png',
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
        text: '嘿嘿……六掌柜料事如神，那个天真的女班长果然把东西送来了！至于你们这帮追来的跟屁虫，就留在这给水闸当肥料吧！',
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
      prompt: '海峰和两位老师从侧面找覃瑞怡的下落；其余五个孩子被守卫堵在水闸正门，只能先打退他们！',
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
        text: '（从侧面赶回来，按住被孩子们打倒的头目）水闸里没有瑞怡。说！你们把她和销烟杖送去哪了？',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '沈氏死士头目',
        leftPortrait: 'assets/art/berserker_guard_heavy@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'right',
        text: '咳……人已经被带到旧洋行仓库地下了。沈崇礼抢了杖，想拿它压住毒池里的黑气，再逼那个女孩喝第一口原浆，替他们试药！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '她就在仓库地下！海叔叔，快带我们从水闸的检修通道过去！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '海峰从头目身上搜出仓库通行卡，撬开水闸下方通往旧洋行仓库的检修门，带众人沿通道冲向地下室。',
      buttonText: '【突入魔窟 · 开启第十九章】',
      targetScene: 'ch17_scene_alter_breach'
    }
  }
};
