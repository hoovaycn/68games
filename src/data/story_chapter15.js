/**
 * 第十六章《浩然正气》剧情脚本数据表（第二幕 第6章）
 *
 * 流程结构：
 * - ch15_scene_time_passage: 众人一同穿越，在时空通道中先看到过去，尚未落地
 * - ch15_scene_historic_prologue: 【画外音宏大叙事】1838年紫禁城养心殿，道光皇帝面对沉沦危局八召林则徐，御准严禁鸦片
 * - ch15_scene_humen_harbor_inspect: 【前线巡阅】1839年广东虎门古港与海防官口，林则徐临江督防，颁布铁令
 * - ch15_scene_beach_wake: 【时空交错】现代少年团自时空漩涡跌落虎门滩头，亲眼见证历史上的“双池化烟”名场面
 * - ch15_scene_militia_stand: 【外敌突袭】异国鸦片武装水手勾结初代买办死士偷袭化烟池，民团浴血抵抗
 * - ch15_battle1: 【滩头血战】虎门滩头保卫战（主角团 + 虎门民团教头 VS 异国武装水手与初代买办死士）
 * - ch15_scene_lin_commends: 【名臣赐物】林则徐亲临滩头抚慰将士，识破少年赤诚，御赐“浩然销烟杖”作为浩然信物
 * - ch15_scene_righteous_seal: 【共鸣重返】浩然销烟杖爆发神圣浩然金光，破除时空界限，众人重返现代驳船
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
    bgm: 'bgm_eerie_revelation',
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
    bgm: 'bgm_army_approaching',
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
        text: '快看池畔浅滩！有几艘黑色快艇正冒死靠岸，十几个手持洋枪和弯刀的人正试图夺取化烟池边的鸦片箱！',
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
        speaker: '虎门民团教头',
        leftPortrait: 'assets/art/militia_instructor_1839@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '（握紧林总督交给他的守池木杖）这批鸦片是来销毁的，不是给你们抢回去害人的！想碰池子，先过我这一关！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/militia_instructor_1839@2x.png',
        activeSide: 'left',
        text: '教头，孩子们跟你守这口池！我和两位老师去另一边护住正在搬运鸦片的人，谁也别单独冲。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
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
      prompt: '海峰和两位老师守另一侧的销烟池；教头带着六个孩子，迎战冲向这口池子的走私水手！',
      buttonText: '【沙角血战 · 捍卫化烟池】',
      battleId: 'ch15_battle1',
      isBattleTrigger: true
    }
  },

  // s5: 【名臣赐物】林则徐亲临 · 浩然相赠
  ch15_scene_lin_commends: {
    id: 'ch15_scene_lin_commends',
    title: '销烟池畔 · 钦差大臣巡阅',
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
        text: '激战落幕，偷袭的武装快艇被尽数击沉或缴获，残敌仓皇逃窜。沙角海滩上三军雷动！一顶深蓝色官呢大轿在亲兵簇拥下肃然停在池畔，林则徐亲自迈步登台！',
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
        text: '（鞠躬）林总督，我们来自将近两百年后的中国。现在还有人贩毒，但也有很多警察和普通人一直在阻止他们。您今天做的事，后来一直有人接着做。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（眼眶泛红）两百年后，还有人在禁烟、救人？好。今天做的事，没有白费。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '刚才教头守池时拿的这根木杖，是我削给民团用的。他把它交回来了。你们带走吧；回去以后，不论那罐里的东西多可怕，都记得今天大家是怎么一起把鸦片毁掉的。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '林则徐亲手将赤红如玉的销烟杖交到少年掌心！',
      buttonText: '【手握正气 · 承接嘱托】',
      targetScene: 'ch15_scene_righteous_seal'
    }
  },

  // s6: 【共鸣重返】百年心印 · 时空回溯
  ch15_scene_righteous_seal: {
    id: 'ch15_scene_righteous_seal',
    title: '落日熔金 · 百年心印',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_humen_beach_1839@2x.png',
    bgm: 'bgm_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '{MC_NAME}握住木杖，杖上渐渐浮出金色的“浩然正气”四个字。销烟池的白烟在光里散开；木杖上的金光，和先前碎罐里亮起的纹路很像。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '林总督，回去以后，我们会继续阻止福寿堂。那些人用您当年想销毁的鸦片害学生，这件事不能就这么算了。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '木杖突然发亮，众人脚下再次出现那道把他们卷来时的白光。海滩、销烟池和炮声渐渐远去；大家手拉着手，重新落回现代的驳船上。',
        highlight: true,
        sfx: 'sfx_suspense'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '时空金流平复，众人重新踏足于现代暴雨中破损的古运河驳船残骸之上！',
      buttonText: '【重返现代 · 开启第十七章】',
      targetScene: 'ch16_scene_return_ruins'
    }
  }
};
