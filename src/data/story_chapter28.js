/**
 * 第二十八章《倒流的挽歌》剧情脚本数据表（第三幕 第8章）
 *
 * 流程结构：
 * - ch28_scene_return_2026: 重返2026年9月28日黄昏五点五十分，江边汽笛长鸣，距离大爆炸仅剩十分钟
 * - ch28_scene_rush_to_pier: 突袭三号船登船栈桥，引信守卫长铁蝎封锁通道
 * - ch28_battle1: 三号船甲板破袭战（4回合内突破铁蝎夺取底舱防爆卡）
 * - ch28_scene_disarm_destiny: 倒计时十秒生死飞扑！副官撞开海峰避开跳雷，工兵铲卡死液压钢闸救出徐博刘老师，大人们全员生还
 */

export const CHAPTER28_STORY = {
  // s1: 撕裂晚霞 · 抢回失去的十分钟
  ch28_scene_return_2026: {
    id: 'ch28_scene_return_2026',
    title: '二零二六年九月二十八日 · 黄昏五点五十分',
    bgType: 'pier_sunset',
    bgImg: 'assets/backgrounds/bg_pier_sunset_cargo@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '扑通几声，五个孩子摔在江边的碎石滩上。抬头看去，晚霞烧得通红，江面上停着的“长江三号”货船，底舱已经冒出了黑烟！',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（看了一眼手表）五点五十分！我们真的赶回来了！离爆炸还有最后十分钟！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '（举起工兵铲）这十分钟是未来的大家用命换来的！跑断腿也得把人抢下来！快冲！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '未来给的路线：二号货舱有跳雷，海峰叔叔五点五十九分会踩上去！徐老师和刘老师会被铁闸关在底舱！快上船！！',
        sfx: 'sfx_suspense'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '众人冲上登船栈桥，雇佣兵引信守卫长铁蝎拦住去路！',
      buttonText: '【栈桥死斗 · 杀上三号船】',
      targetScene: 'ch28_scene_rush_to_pier'
    }
  },

  // s2: 栈桥死斗 · 谁敢挡路！
  ch28_scene_rush_to_pier: {
    id: 'ch28_scene_rush_to_pier',
    title: '傍晚五点五十二分 · 登船甲板通道',
    bgType: 'pier_sunset',
    bgImg: 'assets/backgrounds/bg_pier_sunset_cargo@2x.png',
    bgm: 'bgm_army_approaching',
    dialogues: [
      {
        id: 1,
        speaker: '引信守卫长·铁蝎',
        leftPortrait: 'assets/art/boss_iron_scorpion@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '哟？人大附小的几个小兔崽子？放学不回家，跑老子的船上送死啊？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/boss_iron_scorpion@2x.png',
        activeSide: 'right',
        text: '铁蝎！你身上揣着遥控器，想把整艘船炸了杀人灭口！你跑不掉了！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '引信守卫长·铁蝎',
        leftPortrait: 'assets/art/boss_iron_scorpion@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（脸色剧变，大口径转轮榴弹枪瞬间抬起，腰间雷管引信噼啪作响）你个毛孩子怎么会知道计划？！死士何在！重盾何在！把通往底舱的梯道给我焊死！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '底舱重型水闸守卫',
        leftPortrait: 'assets/art/hold_gate_guard@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（全身厚重防暴装甲轰然踏前，手持两米宽的合金防暴大盾重重顿在甲板上，掀起一阵劲风）重盾壁垒已立！底舱重地，任何人不得通过！闯入者格杀勿论！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '狂化引爆死士',
        leftPortrait: 'assets/art/fanatic_bomber@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（浑身捆绑着大号烈性炸药包，狂热地扣紧手中的拉火引信，双眼通红嘶吼）哈哈哈！谁也别想活着下船！陪我们一起炸上天吧！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/boss_iron_scorpion@2x.png',
        activeSide: 'left',
        text: '未来几米高的铁皮大机甲我们都砸烂过，就凭你们几个也敢拦路？！揍他们！！夺下防爆卡！！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '必须在4回合内击溃铁蝎与引爆死士，夺取底舱防爆卡！',
      buttonText: '【进入战斗 · 三号船甲板破袭战】',
      battleId: 'ch28_battle1',
      isBattleTrigger: true,
      targetScene: 'ch28_scene_disarm_destiny'
    }
  },

  // s3: 倒计时十秒 · 飞扑逆转因果
  ch28_scene_disarm_destiny: {
    id: 'ch28_scene_disarm_destiny',
    title: '傍晚五点五十九分 · 三号船底舱生死逆转',
    bgType: 'cargo_fire',
    bgImg: 'assets/backgrounds/bg_cargo_hold_fire@2x.png',
    bgm: 'bgm_shock_sting',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '底舱门被一脚踹开！火光中，中央炸弹的红色倒计时只剩下十秒：【00:10】！【00:09】！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'right',
        text: '前面通道里，海峰警官正往前猛冲，脚下就是一枚隐蔽的跳雷！右边厚重的铁闸门正飞速下落，徐老师和刘老师还在里面！',
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '爸——！！！别踩！！！脚下有地雷————！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '{ALLY_2_NAME}飞身扑了上去，狠狠撞开海峰！地雷几乎同时被引爆，弹片将旁边的铁板打得噼啪作响！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '（把工兵铲猛地卡进闸门滑轨里）朱彦泽快来帮忙！给我死死卡住啊啊啊！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '闸门被工兵铲硬生生别住！倒计时还剩三秒！{MC_NAME}钻进缝隙，拉住两位老师拼命往外拽！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '徐老师！刘老师！快出来！我们带你们回家！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '倒计时归零！大家把老师拽出来的瞬间，灭火阀也被同时拧开，大量阻燃干粉喷涌而出，压住了火势！所有人都活下来了！',
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{ALLY_2_NAME}',
        activeSide: 'left',
        text: '（满脸黑灰，一把抱紧自己的孩子）好小子……没事就好！老徐！淑惠！孩子们把我们救下来了！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 10,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（流着泪摸着孩子们的头）平安就好……大家都没事就好……六8班，一个都没少！',
        highlight: true,
        sfx: 'sfx_sad_melody'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '大火被水警控制，但集装箱深处传来了阿瑶神明化的最后威压。',
      buttonText: '【开启第二十九章 · 少年无悔】',
      targetScene: 'ch29_scene_throne_reveal'
    }
  }
};
