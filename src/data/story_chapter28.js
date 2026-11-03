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
        text: '砰！五个孩子狼狈地从虚空中滚落，重重摔在冰冷湿润的江边碎石滩上。抬头望去，天边铺满了如火如荼的浓烈火烧云。江风带着鱼腥味，远处万吨生锈货轮“长江三号”底舱已冒起黑烟！',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '（抬手看表，黄昏五点五十分）我们回来了！真的回来了！距离大爆炸只剩最后整整十分钟！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '（拔出大号留下的碳钢折叠工兵铲）大号他们用命换回来的这十分钟，六8班哪怕跑断腿也得抢回来！冲！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '大号给的情报：二号货舱埋了重力跳雷，海峰叔叔会在五点五十九分踩雷！徐老师刘老师会被降下的防爆钢闸封死在底舱！全速冲向舷梯！！',
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
        text: '（手提转轮榴弹枪，阴鸷狞笑）哟呵？闹了半天竟然是崇文实验小学五只小奶狗？放学不回家写作业，跑来老子的炸药库找死啊？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/boss_iron_scorpion@2x.png',
        activeSide: 'right',
        text: '铁蝎！深红财团在老城区的走狗！你怀里揣着延迟十分钟的自毁遥控器，想把整艘船连同三十吨化学品沉入江底杀人灭口！你以为你逃得掉吗？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '引信守卫长·铁蝎',
        leftPortrait: 'assets/art/boss_iron_scorpion@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（脸色剧变，榴弹枪上膛）你一个毛都没长齐的小学生怎么可能知道核心自爆计划？！兄弟们重盾架起来！把这几个小兔崽子乱枪打烂扔进江里！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/boss_iron_scorpion@2x.png',
        activeSide: 'left',
        text: '老子二十年后连四米重装机甲都拆过，就凭你们几块烂铜烂铁也想拦六8班？！打烂他们！把路轰开！！',
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
        text: '底舱铁门被合力踹开！烈焰蒸腾黑烟刺鼻，中央自毁LED屏幕正跳动着极度刺眼的数字：【自毁倒计时：00:10】！【00:09】！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '左侧通道上海峰警官正全速狂奔，踏出的右脚下方不到二十厘米处，压发式跳雷引信钢珠正散发死亡微光！右侧隔离舱三十厘米厚的液压防爆钢闸正急速下坠只剩四十厘米，徐老师和刘老师正被火海围困！',
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '老爸——！！！别落脚！！！地雷————！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '副官如炮弹般滑铲飞扑，双手死死抱住海峰右膝撞飞出三米远！几乎同一毫秒，跳雷引信被激起，数千枚钢珠将旁边的铁壁轰成马蜂窝！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '（将两把高碳钢工兵铲斜向死死插进液压齿轮滑轨内，双臂青筋暴裂）朱彦泽顶住！给老子——卡住啊啊啊啊啊！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '吱嘎刺耳暴响！数吨重的钢闸硬生生被工兵铲卡在离地三十公分处！倒计时【00:03】！主角滑进缝隙一把拉住徐老师与刘老师拼命往外拽！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '徐老师！刘老师！醒醒！你们答应过这学期带我们去秋游的！跟我们回家——！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '倒计时【00:00】！全员拼死将两位老师拖出闸门！主角将古罐残片插进泄压阀死死拧下！轰！外围假油箱引爆化作火柱，但底舱高压阻燃干粉如暴雪喷涌，彻底锁死了大爆炸！大人们全员生还！',
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '（顾不上满脸黑灰将孩子死死搂进怀里痛哭）活着……都活着……！老徐！淑惠！孩子们把我们救下来了！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 10,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（眼泪滴在孩子们发梢上）平安就好……全员平安就好……六8班……一个都没少！',
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
