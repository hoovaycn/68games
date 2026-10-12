/**
 * 第十六章《浩然正气》剧情脚本数据表（第二幕 第6章）
 *
 * 流程结构：
 * - ch15_scene_beach_wake: 穿越至道光十九年（1839年）广东虎门滩头，海风烈烈，巨池销烟
 * - ch15_scene_militia_stand: 英国武装鸦片快艇水手与买办死士偷袭沙角滩头，民团奋死抵抗
 * - ch15_battle1: 虎门滩头保卫战（主角团 + 虎门民团教头 VS 异国武装水手与初代买办死士）
 * - ch15_scene_righteous_seal: 击退外敌，义勇赠予刻有铭文的“销烟赤木法钎”，时空回溯共振
 */

export const CHAPTER15_STORY = {
  // s1: 沙角滩头 · 历史烟云
  ch15_scene_beach_wake: {
    id: 'ch15_scene_beach_wake',
    title: '道光十九年 · 广东虎门沙角海滩',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_street_dusk@2x.png',
    bgm: 'bgm_battle_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '海浪一波波拍打着裤腿，刺骨的潮水将少年们从昏迷中唤醒。日光炽烈得炫目，空气中充斥着生石灰沸腾的刺鼻烟气与滚滚热浪。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '（揉着眼睛爬起来，目瞪口呆地看着前方）这……这根本不是城南的古运河！你们看远处的海面上，停泊着插满骷髅旗与米字旗的巨大三桅帆船！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（捡起沙滩上的一面残破旌旗，声音颤抖）海滩上挖了两个长宽各十五丈的巨大化烟池……池旁伫立着钦差大臣林则徐的帅旗！我们……我们竟然逆流回到了1839年的虎门销烟现场！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '看池子边上！有一群拿火绳枪和弯刀的人正从划艇上跳下来，妄图往海里倒药抢夺生鸦片！',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '滩头传来愤怒的呐喊与火铳爆鸣，守池民团正被重重围困！',
      buttonText: '【拔足狂奔 · 援救民团】',
      targetScene: 'ch15_scene_militia_stand'
    }
  },

  // s2: 民团死守 · 买办偷袭
  ch15_scene_militia_stand: {
    id: 'ch15_scene_militia_stand',
    title: '销烟池畔 · 浴血滩头',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_street_dusk@2x.png',
    bgm: 'bgm_boss_intro',
    dialogues: [
      {
        id: 1,
        speaker: '虎门民团教头',
        leftPortrait: 'assets/art/boss_rebel_default@2x.png',
        rightPortrait: 'assets/art/teacher_pe_default@2x.png',
        activeSide: 'left',
        text: '（手提齐眉铁棍，肩头渗血）洋鬼子和福寿堂的汉奸狗贼！林总督命我等化尽天下乌烟，今日除非踏过老子尸首，否则半钱黑膏也休想抢走！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/teacher_pe_default@2x.png',
        rightPortrait: 'assets/art/boss_rebel_default@2x.png',
        activeSide: 'left',
        text: '好壮士！不管是两百年前还是两百年后，老子这一身警服最容不下的就是这帮毒贩！教头，我们来帮你！',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '大家结成铁桶防御阵！护住销烟池，绝不能让百年前的浩然正气被玷污！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '数十名武装外国水手与初代买办死士挥舞刺刀弯刀蜂拥扑来！',
      buttonText: '【滩头血战 · 护卫化烟池】',
      battleId: 'ch15_battle1',
      isBattleTrigger: true
    }
  },

  // s3: 浩然信物 · 破空重返
  ch15_scene_righteous_seal: {
    id: 'ch15_scene_righteous_seal',
    title: '落日熔金 · 百年心印',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_street_dusk@2x.png',
    bgm: 'bgm_battle_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '在众人的齐心血战下，狂妄的侵略水手与买办走狗丢盔弃甲，狼狈逃回快艇。夕阳西下，两口巨大的化烟池里，翻滚的白烟直冲云霄，涤荡着世间的一切污浊！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '虎门民团教头',
        leftPortrait: 'assets/art/boss_rebel_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（双手捧出一柄被石灰烈焰淬炼得赤红如玉的沉香木销烟钎）诸位义士身手奇绝、大义凛然！此物乃林大人亲手刻印的“赤心销烟钎”，内蕴千万人同心灭毒之浩然正气，赠予诸位！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/boss_rebel_default@2x.png',
        activeSide: 'left',
        text: '（接过赤木钎，掌心顿时涌入一股温暖醇厚、坚不可摧的纯正力量）有了这股浩然正气，福寿堂的一切妖邪剧毒都将无所遁形！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '赤木钎在掌中爆发出耀眼金辉，与跨越百年的时空法则剧烈共鸣。潮声再起，周遭的沙滩与海浪化作金色的流光，裹挟着众人重返现代驳船！',
        sfx: 'sfx_suspense'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '金光收敛，众人脚踏实地，重新回到了雨夜运河驳船的废墟之上！',
      buttonText: '【重返现代 · 开启第十七章】',
      targetScene: 'ch16_scene_return_ruins'
    }
  }
};
