/**
 * 旧版仓库二次突入剧情，仅供旧存档续玩；新主线从地下室直达钟楼。
 *
 * 流程结构：
 * - ch18_scene_warehouse_breach: 洋行仓库外围，覃瑞怡提供被囚期间记下的防御布控图与弱点，全员制定强攻计划
 * - ch18_scene_teacher_stand: 冲破货栈正门，重装机械药人与大批死士合围。徐老师与刘老师毅然决然留在大厅断后
 * - ch18_battle1: 货栈中庭防线强袭战（主角团 VS 沈氏中枢生化狂战士与重装卫队）
 * - ch18_scene_tower_arrival: 新主线共用的钟楼入口，见到沈万廷与最后一批原料
 */

export const CHAPTER18_STORY = {
  // s1: 戴罪立功 · 破阵密码
  ch18_scene_warehouse_breach: {
    id: 'ch18_scene_warehouse_breach',
    title: '洋行仓库外侧 · 暴雨突击准备',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_warehouse_grand_hall@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '众人从地下室的另一侧逃到仓库外。沈家父子还在顶楼，可大楼四周通了电，探照灯来回扫，想走正门根本过不去。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（拿出画在餐巾纸上的草图）他们押我进来时，我记下了侧门和摄像头；后来从地下室小窗里看到东侧电网每隔一会儿会短暂停电。趁那几秒从侧门进去，就能到一楼大厅。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '（一脸佩服地凑近草图纸）班长，你这脑子是自带监控回放还是咋的？连哪堵墙是监控死角都能背下来……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '东侧门后就是大厅楼梯。如果赶在电网恢复前穿过去，至少能避开外面的探照灯。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '好，等下一次断电，从东侧门进大厅。徐老师和刘老师掩护，我们去顶楼找沈家父子。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '东侧电网短暂断电。众人穿过侧门，沿走廊来到一楼大厅门前。',
      buttonText: '【推开大厅门 · 突入货栈】',
      targetScene: 'ch18_scene_teacher_stand'
    }
  },

  // s2: 师者如山 · 决绝断后
  ch18_scene_teacher_stand: {
    id: 'ch18_scene_teacher_stand',
    title: '货栈一层挑空中庭 · 钢铁巨兽',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_warehouse_grand_hall@2x.png',
    bgm: 'bgm_intense_boss',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/berserker_guard_heavy@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '一推开大厅门，三名服过药的重装守卫就举着盾牌挡住去路。门后的铁闸落下，堵住回头路；通往顶楼的楼梯口也挤满了沈家的打手。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 11,
        speaker: '重装守卫',
        leftPortrait: 'assets/art/berserker_guard_heavy@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（盾牌往地上一砸）楼梯封了。想上顶楼，就在这儿把浩然正气杖交出来！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 12,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '我爸正在顶楼装货。你们在这儿陪守卫慢慢打吧，等打上去，药早就运走了！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 13,
        speaker: '沈家护卫',
        leftPortrait: 'assets/art/shen_guard_default@2x.png',
        rightPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        activeSide: 'left',
        text: '沈先生，后面的老师交给我们。重装的人堵楼梯，孩子一个也上不去。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '（握紧教鞭）老徐，侧廊又来了一批守卫。我们留下挡住后面的援兵，让孩子们去楼梯口。二十年前没护住阿瑶，今天不能再退了。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（把旧教案塞给{MC_NAME}）我们挡住后面赶来的守卫。你们打通前面重装守卫和楼梯口，去顶楼阻止沈家父子。别回头！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '徐老师！刘老师！！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '别让老师的心血白费！跟紧我，撕碎梯口的守卫，冲上天台！！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '两位老师在大厅牵制后续援兵；孩子们迎战挡路的重装守卫。沈崇礼也守在楼梯口，想拖住他们！',
      buttonText: '【决死强突 · 杀穿螺旋楼梯】',
      battleId: 'ch18_battle1',
      isBattleTrigger: true
    }
  },

  // 钟楼入口：新主线从 ch17_scene_tearful_retreat 直接抵达
  ch18_scene_tower_arrival: {
    id: 'ch18_scene_tower_arrival',
    title: '货栈顶层钟楼大厅 · 最后的药罐',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_clocktower_summit@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '孩子们沿楼梯追到仓库顶楼，推开钟楼门。沈万廷坐在轮椅上，身边只剩几罐药；沈崇礼坐货梯先到了，正站在控制台前。两位老师还在楼下挡住追兵。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '沈万廷',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（抬起头，敲了敲身旁的药罐）刘淑惠的学生也来了？学校那张送药单被你们抢走了，可货还在我手里。二十年前阿瑶挡了我的路，这回连你们也想拦？',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: 'assets/art/shen_wanting_old@2x.png',
        activeSide: 'left',
        text: '爸，楼下的人挡不住了。运货车也没法走！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '沈万廷',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        activeSide: 'left',
        text: '那就把钟楼这套装置打开。先放毒雾拦住追来的人，守住药罐；只要货还在，福寿堂就没输。',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/shen_wanting_old@2x.png',
        activeSide: 'left',
        text: '（握紧浩然正气杖）名单和货，我们一样都不会留给你们。沈万廷，二十年前的事，今天也该有个交代了！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '沈万廷把轮椅上的管子接向控制台，沈崇礼的手已经按在启动杆上！',
      buttonText: '【冲向控制台 · 阻止沈家父子】',
      targetScene: 'ch19_scene_final_stand'
    }
  }
};
