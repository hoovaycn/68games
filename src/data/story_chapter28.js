/**
 * 第二十八章《倒流的挽歌》剧情脚本数据表（第三幕 第8章）
 *
 * 流程结构：
 * - ch28_scene_return_2026: 重返2026年9月28日黄昏五点五十分，江边汽笛长鸣，距离大爆炸仅剩十分钟
 * - ch28_scene_rush_to_pier: 突袭三号船登船栈桥，引信守卫长铁蝎封锁通道
 * - ch28_battle1: 三号船甲板破袭战（4回合内突破铁蝎夺取底舱防爆卡）
 * - ch28_scene_disarm_destiny: 倒计时十秒生死飞扑！副官撞开海峰避开跳雷，工兵铲卡死液压钢闸，倒计时归零陷入黑暗
 * - ch28_scene_rescue_aftermath: 浓烟散去大人们全员生还，孩子们讲明未来警徽与阿瑶被冤枉的真相，众人决定冲上顶层救人
 */

export const CHAPTER28_STORY = {
  // s1: 撕裂晚霞 · 抢回失去的十分钟
  ch28_scene_return_2026: {
    id: 'ch28_scene_return_2026',
    title: '二零二六年九月二十八日 · 黄昏五点五十分',
    bgType: 'pier_sunset',
    bgImg: 'assets/backgrounds/bg_pier_sunset_cargo@2x.png',
    bgm: 'bgm_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '扑通几声，五个孩子摔在江边的碎石滩上！抬头一看，晚霞烧得通红，“长江三号”货船底舱已经窜出黑烟，船上的爆炸倒计时正一分一秒逼近！',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: '{ALLY_2}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '五点五十分！只剩不到十分钟！海峰叔叔五分钟后就会踩中跳雷，徐老师和刘老师马上要被铁闸关死在底舱——没时间了！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'qinruiyi',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '未来给的情报！二号货舱有跳雷，底舱铁闸正在下坠！快跑！直接冲上船！',
        sfx: 'sfx_suspense'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'zhangxizhe',
        leftEmotion: 'default',
        rightPortrait: 'zhuyanze',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '快！未来的大家用命换来的十分钟，一秒钟都不能浪费！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '五个孩子撒腿就往登船栈桥冲去！可还没冲到一半，栈桥那头忽然响起一排子弹上膛的咔嚓声，十几个黑洞洞的枪口从阴影里伸了出来！',
        sfx: 'sfx_shock_sting'
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
    bgm: 'bgm_victory',
    dialogues: [
      {
        id: 1,
        speaker: '引信守卫长·铁蝎',
        leftPortrait: 'boss_iron_scorpion',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '哟？人大附小的几个小兔崽子？放学不回家，跑老子的船上送死啊？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: 'boss_iron_scorpion',
        rightEmotion: 'default',
        activeSide: 'right',
        text: '铁蝎！你身上揣着遥控器，想把整艘船炸了杀人灭口！你跑不掉了！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '引信守卫长·铁蝎',
        leftPortrait: 'boss_iron_scorpion',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（脸色剧变，大口径转轮榴弹枪瞬间抬起，腰间雷管引信噼啪作响）你个毛孩子怎么会知道我的名字，还知道计划？！死士何在！重盾何在！把通往底舱的梯道给我焊死！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '底舱重型水闸守卫',
        leftPortrait: 'hold_gate_guard',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（全身厚重防暴装甲轰然踏前，手持两米宽的合金防暴大盾重重顿在甲板上，掀起一阵劲风）重盾壁垒已立！底舱重地，任何人不得通过！闯入者格杀勿论！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '狂化引爆死士',
        leftPortrait: 'fanatic_bomber',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（浑身捆绑着大号烈性炸药包，狂热地扣紧手中的拉火引信，双眼通红嘶吼）哈哈哈！谁也别想活着下船！陪我们一起炸上天吧！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '覃瑞怡',
        leftPortrait: 'qinruiyi',
        leftEmotion: 'default',
        rightPortrait: 'boss_iron_scorpion',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（飞快看了眼手表，急得跺脚）时间只剩几分钟了！他们就是想把我们拖死在这里！别散开，跟着冲！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '朱晏泽',
        leftPortrait: 'zhuyanze',
        leftEmotion: 'default',
        rightPortrait: 'hold_gate_guard',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（把扳手扛上肩）挡路的都得让开！我们要进去救人，没工夫跟你们讲道理！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 8,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2}',
        leftEmotion: 'default',
        rightPortrait: 'fanatic_bomber',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（红了眼）我爸和老师们还在底舱里！谁挡路，就把谁揍趴下！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '张希哲',
        leftPortrait: 'zhangxizhe',
        leftEmotion: 'default',
        rightPortrait: 'boss_iron_scorpion',
        rightEmotion: 'default',
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

  // s3: 倒计时十秒 · 飞扑抢回命运
  ch28_scene_disarm_destiny: {
    id: 'ch28_scene_disarm_destiny',
    title: '傍晚五点五十九分 · 三号船底舱生死逆转',
    bgType: 'cargo_fire',
    bgImg: 'assets/backgrounds/bg_cargo_hold_fire@2x.png',
    bgm: 'bgm_victory',
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
        leftPortrait: '{ALLY_2}',
        leftEmotion: 'default',
        rightPortrait: 'haifeng-police',
        rightEmotion: 'default',
        activeSide: 'right',
        text: '前面通道里，海峰警官正往前猛冲，脚下就是一枚隐蔽的跳雷！右边厚重的铁闸门正飞速下落，徐老师和刘老师还在里面！',
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2}',
        leftEmotion: 'default',
        rightPortrait: 'haifeng-police',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '爸——！！！别踩！！！脚下有地雷————！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: '{ALLY_2}',
        leftEmotion: 'default',
        rightPortrait: 'haifeng-police',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '{ALLY_2_NAME}飞身扑了上去，狠狠撞开海峰！地雷几乎同时被引爆，弹片将旁边的铁板打得噼啪作响！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '张希哲',
        leftPortrait: 'zhangxizhe',
        leftEmotion: 'default',
        rightPortrait: 'zhuyanze',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（把工兵铲猛地卡进闸门滑轨里）朱晏泽快来帮忙！给我死死卡住啊啊啊！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: 'xu',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '闸门被工兵铲硬生生别住！倒计时还剩三秒！{MC_NAME}钻进缝隙，拉住两位老师拼命往外拽！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: 'xu',
        rightEmotion: 'default',
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
        text: '倒计时归零！就在这千钧一发之际，一声震耳欲聋的巨响轰然炸开——眼前的一切，瞬间被吞没成无边的黑暗！',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '到底……成了吗？',
      buttonText: '【轰——！！】',
      targetScene: 'ch28_scene_rescue_aftermath'
    }
  },

  // s4: 浓烟散去 · 一个都没少
  ch28_scene_rescue_aftermath: {
    id: 'ch28_scene_rescue_aftermath',
    title: '傍晚六点整 · 浓烟散去之后',
    bgType: 'cargo_fire',
    bgImg: 'assets/backgrounds/bg_cargo_hold_extinguished@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '黑暗一点一点退去，浓烟里响起一阵剧烈的咳嗽。{MC_NAME}第一个睁开眼——海峰警官、徐老师、刘老师，都还在！',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '灭火阀喷出的阻燃干粉死死压住了火势，只有几簇余烬还在噼啪作响。所有人都活下来了！',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-burnt',
        leftEmotion: 'default',
        rightPortrait: '{ALLY_2}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（满脸黑灰，一把抱紧自己的孩子）好小子……没事就好！老徐！淑惠！孩子们把我们救下来了！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '刘老师',
        leftPortrait: 'liu-burnt-choke',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（流着泪摸着孩子们的头）平安就好……大家都没事就好……六8班，一个都没少！',
        highlight: true,
        sfx: 'sfx_sad_melody'
      },
      {
        id: 5,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-burnt',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（突然想起什么，盯着孩子们）等等！你们几个小破孩儿，怎么会提前知道跳雷埋在哪、铁闸什么时候落？像是从头到尾都算准了一样！',
        sfx: 'sfx_suspense'
      },
      {
        id: 6,
        speaker: '徐老师',
        leftPortrait: 'xu-burnt',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（也一脸不解）是啊，你们怎么像亲眼见过这一切似的？这到底是怎么回事？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: 'haifeng-burnt',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（喘着气，认真地说）我们从未来回来的！海峰叔叔，你在码头截获的那枚警徽，就是长大后的{ALLY_2_NAME}从你那件旧警服胸口扯下来，拼死送回来警告我们的！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 8,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-burnt',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（摸出那枚带着烟熏痕迹的警徽，一下子愣住）这警徽……我还没给过谁啊……未来的我？',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2}',
        leftEmotion: 'default',
        rightPortrait: 'haifeng-burnt',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（红着眼圈）未来的世界满城都是戴着满分面具的机器，是长大后的我们撕开时空门，拼死把我们送回来的！[next]我们还见到了被困在天梯里的阿瑶老师——她白了头发、瘦得不成样子，就是她给了我们回去的钥匙！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 10,
        speaker: '徐老师',
        leftPortrait: 'xu-burnt',
        leftEmotion: 'default',
        rightPortrait: 'liu-burnt-choke',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（和刘老师对视一眼，脸色发白）阿瑶……我们之前找到她的时候，她就冷冰冰的，跟二十年前判若两人。[next]孩子们，她到底经历了什么，才会变成现在这样？',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 11,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: 'xu-burnt',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（握紧拳头，一字一句）徐老师、刘老师，未来那个阿瑶老师亲口告诉了我们真相——[next]她当年根本不是贪图满分作弊！是沈家那两个坏蛋拿你们逼她：考不到满分，就要对你们下毒手！[next]她是为了护住你们，才自己吞了那罐毒药，一个人背了整整二十年的骂名！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 12,
        speaker: '徐老师',
        leftPortrait: 'xu-burnt',
        leftEmotion: 'default',
        rightPortrait: 'liu-burnt-choke',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（踉跄着后退一步，声音抖得厉害）什么……阿瑶她……她当年是为了我们……[next]我们竟然……错怪了她整整二十年……',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 13,
        speaker: '刘老师',
        leftPortrait: 'liu-burnt-choke',
        leftEmotion: 'default',
        rightPortrait: 'xu-burnt',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（眼泪一下涌了出来）阿瑶……你当年为什么要一个人扛着不说啊……我们……我们找了你好久……',
        highlight: true,
        sfx: 'sfx_sad_melody'
      },
      {
        id: 14,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: '{ALLY_2}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '她就在三号船顶层，和那台机器连在一起，马上要把全城的情绪都抹掉！[next]徐老师、刘老师、海峰叔叔——这一次，我们一起去，把她从机器里抢回来！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '大火被水警控制，但集装箱深处传来了阿瑶与机器融为一体的最后威压。',
      buttonText: '【开启第二十九章 · 少年无悔】',
      targetScene: 'ch29_scene_throne_reveal'
    }
  }
};
