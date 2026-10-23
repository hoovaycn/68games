/**
 * 第十六章《我们穿越了》剧情脚本数据表（第二幕 第6章）
 *
 * 流程结构：
 * - ch15_scene_time_passage: 众人一同穿越，在时空通道中先看到过去，尚未落地
 * - ch15_scene_historic_prologue: 【画外音宏大叙事】1838年紫禁城养心殿，道光皇帝面对沉沦危局八召林则徐，御准严禁鸦片
 * - ch15_scene_humen_harbor_inspect: 【前线巡阅】1839年广东虎门古港与海防官口，林则徐临江督防，颁布铁令
 * - ch15_scene_beach_wake: 【时空交错】现代少年团自时空漩涡跌落虎门滩头，亲眼见证历史上的“双池化烟”名场面
 * - ch15_scene_militia_stand: 【外敌突袭】异国鸦片武装水手勾结初代买办死士偷袭化烟池，民团浴血抵抗
 * - ch15_battle1: 【滩头血战】虎门滩头保卫战（主角团 + 虎门民团教头 VS 异国武装水手与初代买办死士）
 * - ch15_scene_lin_commends: 守池战后，林则徐与来自未来的少年相见
 * - ch15b_scene_missing_jar: 清点时发现少了一只青花罐，开启第十七章的福寿堂线索
 */

export const CHAPTER15_STORY = {
  // s0: 穿越途中 · 先看到历史，直到沙角海滩才真正落地
  ch15_scene_time_passage: {
    id: 'ch15_scene_time_passage',
    title: '时空通道 · 驳船与过去之间',
    bgType: 'black',
    bgImg: 'assets/backgrounds/bg_time_passage@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '脚下没有甲板，也没有江水。六个孩子、海峰和两位老师还抓着彼此，漂在一条发光的通道里；身后的驳船越来越远，渐渐缩成一个小点。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '等等，岸上的路灯都不见了！我们这是……真的穿越了？',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '看，前面的景象正在往回倒。我们真在穿越！还没落地，先别松手！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '通道前方闪出一座古老的宫殿，说话声也越来越清楚。大家仍在通道里，像隔着一扇窗看见了很久以前的事。',
        sfx: 'sfx_suspense'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '这只是穿越途中看到的过去，不是他们的落脚点。宫殿里，道光皇帝正在召见林则徐。',
      buttonText: '【看向宫殿 · 听听当年的决定】',
      targetScene: 'ch15_scene_historic_prologue'
    }
  },

  // s1: 【画外音宏大叙事】紫禁城养心殿 · 帝王与重臣的抉择
  ch15_scene_historic_prologue: {
    id: 'ch15_scene_historic_prologue',
    title: '道光十八年 · 紫禁城养心殿',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_forbidden_city_palace@2x.png',
    bgm: 'bgm_gojira_battle',
    dialogues: [
      {
        id: 1,
        speaker: '历史画外音',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '【穿越途中 · 道光十八年冬】\n少年们还在通道里，并没有落进皇宫。眼前像开了扇窗：道光皇帝在养心殿召见林则徐，商量怎么禁烟。当时鸦片正害人上瘾，白银也不断流向海外。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '道光皇帝',
        leftPortrait: 'assets/art/emperor_daoguang_palace@2x.png',
        rightPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        activeSide: 'left',
        text: '林则徐，朕看了你的奏折。鸦片害了百姓，也让国库的钱不断流出去。有人怕得罪外国商人，不敢禁烟。你愿意去广东把这件事办到底吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: 'assets/art/emperor_daoguang_palace@2x.png',
        activeSide: 'left',
        text: '（跪下）“苟利国家生死以，岂因祸福避趋之！”只要鸦片还在害人，我就不会停。请派我去广东，把走私的鸦片查出来、毁掉。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '道光皇帝',
        leftPortrait: 'assets/art/emperor_daoguang_palace@2x.png',
        rightPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        activeSide: 'left',
        text: '好。朕派你去广东禁烟，沿海官兵听你调遣。把鸦片查出来，不许再让它害人。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '宫廷画面退到身后。众人继续往前，眼前又出现一年后的广东虎门。',
      buttonText: '【南下粤海 · 奔赴前线】',
      targetScene: 'ch15_scene_humen_harbor_inspect'
    }
  },

  // s2: 【前线巡阅】虎门古港 · 帅旗猎猎
  ch15_scene_humen_harbor_inspect: {
    id: 'ch15_scene_humen_harbor_inspect',
    title: '道光十九年 · 广东虎门海防要塞',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_humen_harbor_1839@2x.png',
    bgm: 'bgm_gojira_battle',
    dialogues: [
      {
        id: 1,
        speaker: '历史画外音',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '【穿越途中 · 道光十九年虎门】\n众人还在通道里，眼前却能看到海边挤满水师和百姓。官兵把收缴的鸦片搬到池边，准备加盐和石灰销毁。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '把收缴的鸦片全搬到池边！引海水进来，加盐、加石灰，彻底销毁。有人想偷偷藏下一箱，也必须查出来！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '沙角海滩突然传来枪声：有人趁销烟时从海上偷袭，想抢回鸦片。与此同时，通道出口在海滩上打开，卷着众人的白光直冲下去。',
        sfx: 'sfx_suspense'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '白光撞进石灰白烟，海风和枪声一下变得真切；众人终于要落地了。',
      buttonText: '【坠落滩头 · 见证历史】',
      targetScene: 'ch15_scene_beach_wake'
    }
  },

  // s3: 【时空交错】沙角滩头 · 沸腾的双池
  ch15_scene_beach_wake: {
    id: 'ch15_scene_beach_wake',
    title: '道光十九年 · 广东虎门沙角海滩',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_humen_beach_1839@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '众人摔在海滩上，被涌来的浪和石灰烟呛得直咳。抬头一看，官兵正在往大池里倒石灰，海上是旧式帆船；他们真的落在了虎门销烟现场。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '（揉眼睛）等等，我们真到了虎门销烟的时候？海边有人开枪，池子里还在倒石灰！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '（脸色发白地摸了摸口袋）完了完了……手机一格信号都没有！那我的暑期研学报告、还有开学摸底考，是不是全泡汤了？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（扶着沙滩上的“钦差大臣林”旗）你们看，官兵正往池里灌海水，撒盐、倒石灰，把鸦片彻底毁掉。我们真的到了虎门销烟现场！',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '快看浅滩！几艘小帆船靠岸了，那些拿洋枪和刀的人正往销烟池边冲，要抢还没销毁的鸦片箱！',
        bgm: 'bgm_army_approaching',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '滩头传来愤怒的短兵相接声，负责守池的虎门民团正浴血迎击！',
      buttonText: '【挺身而出 · 支援民团】',
      targetScene: 'ch15_scene_militia_stand'
    }
  },

  // s4: 【外敌突袭】民团死守 · 买办偷袭
  ch15_scene_militia_stand: {
    id: 'ch15_scene_militia_stand',
    title: '化烟巨池畔 · 浴血浅滩',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_humen_beach_1839@2x.png',
    bgm: 'bgm_intense_boss',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/foreign_sailor_1839@2x.png',
        rightPortrait: 'assets/art/militia_instructor_1839@2x.png',
        activeSide: 'left',
        text: '洋人水手举枪上岸，本地打手在前面带路。池边，一个握着木杖的民团教头带人守住还没倒进水里的鸦片箱，拦下了刚跑来的孩子们。',
        sfx: 'sfx_suspense'
      },
      {
        id: 11,
        speaker: '虎门民团教头',
        leftPortrait: 'assets/art/militia_instructor_1839@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '我是这儿带民团守池的。林大人让我盯紧这些还没销毁的鸦片，不能让人抢走。你们几个从哪儿来的？快往后站，那边有枪！',
        sfx: 'sfx_confirm'
      },
      {
        id: 12,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/militia_instructor_1839@2x.png',
        activeSide: 'left',
        text: '我们从海滩那头来的，看见他们要抢箱子。我们是来帮忙的，您说怎么守？',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '洋人走私水手',
        leftPortrait: 'assets/art/foreign_sailor_1839@2x.png',
        rightPortrait: 'assets/art/comprador_assassin_1839@2x.png',
        activeSide: 'left',
        text: '就是那几箱！趁他们还没倒进池子，搬回船上！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '带路的中国打手',
        leftPortrait: 'assets/art/comprador_assassin_1839@2x.png',
        rightPortrait: 'assets/art/foreign_sailor_1839@2x.png',
        activeSide: 'left',
        text: '我带你们绕过官兵。先把守池的人赶开，货就在眼前！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '虎门民团教头',
        leftPortrait: 'assets/art/militia_instructor_1839@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '（握紧守池木杖，挡在鸦片箱前）这批鸦片是来销毁的，不是给你们抢回去害人的！想碰池子，先过我这一关！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/militia_instructor_1839@2x.png',
        activeSide: 'left',
        text: '教头，孩子们跟你守这口池！我和两位老师去另一边护住正在搬运鸦片的人，谁也别单独冲。',
        sfx: 'sfx_confirm'
      },
      {
        id: 51,
        speaker: '虎门民团教头',
        leftPortrait: 'assets/art/militia_instructor_1839@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '成，你们跟紧我和弟兄们，别让打手绕到箱子后头。看见洋枪就躲，先护住人，再护住货！',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '大家靠过来，护住池边的鸦片箱！不能让他们把烟土抢回去！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'JOIN_PARTY',
      unitId: 'militia_instructor',
      prompt: '海峰和两位老师守另一侧的销烟池；教头带着六个孩子，挡住洋人水手和带路的打手！',
      buttonText: '【沙角血战 · 捍卫化烟池】',
      battleId: 'ch15_battle1',
      isBattleTrigger: true
    }
  },

  // s5: 林则徐与来自未来的少年相见
  ch15_scene_lin_commends: {
    id: 'ch15_scene_lin_commends',
    title: '销烟池边 · 林则徐来了',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_humen_beach_1839@2x.png',
    bgm: 'bgm_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '偷袭的人被打退了，官兵继续把鸦片倒进池里。林则徐带着几名亲兵来到池边，先去看了受伤的民团，随后走向刚才帮忙守池的孩子们。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（看着众人的衣服）你们不像这个年代的人。刚才明明可以躲开，却留下来帮我们守池。你们从哪里来？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        activeSide: 'left',
        text: '（鞠躬）林总督，我们来自将近两百年后的中国。小时候，我们在课本上读过虎门销烟。今天亲眼看见您和大家守住这口池，才知道当年有多难。我们那儿还有人贩毒，但也有警察、老师和普通人，一直在拦。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（望向还在冒白烟的销烟池）两百年后，孩子们还记得这里？还有人肯站出来，不让毒害人？那就好。今天这池鸦片没白毁，我们这些人也没白拼。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: 'assets/art/militia_instructor_1839@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '教头从池边跑来，手里拿着刚清点完的单子，神色不对。',
        sfx: 'sfx_suspense'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '清点时少了一只青花罐。刚才打起来时，有人把它运走了。',
      buttonText: '【看看少了哪只罐 · 开启第十七章】',
      targetScene: 'ch15b_scene_missing_jar'
    }
  }
};
