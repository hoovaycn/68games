/**
 * 第五章《全国第一》剧情脚本数据表
 *
 * 结构上仍按当前程序保留一场主战斗，
 * 但叙事尽量贴近定稿的几个核心：
 * - 全员一起顺藤摸瓜；
 * - 受害者长大后成了递东西的人；
 * - “加害者和受害者，从来就是同一群人”。
 */

export const CHAPTER4_STORY = {
  ch4_scene_team_meeting: {
    id: 'ch4_scene_team_meeting',
    title: '放学后 · 顺藤摸瓜',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_classroom@2x.png',
    bgm: 'bgm_classroom',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '大家放学后谁也没走，直接蹲在路边，把捡到的荧光包装纸、瓶盖、送货单全摊在地上拼线索。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '那个队长嘴硬归嘴硬，还是漏了点东西。他说他们教练每周五下午都在城郊旧训练馆发饮料，校门口的小贩、巷口的混混、操场那帮体育生，全是从那儿拿的货。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'right',
        text: '那还蹲这儿抠泥巴干嘛？走啊！抄家伙直捣他们老巢！我兜里还有五十块零花钱，打赢了全请大家吃冰棍！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '得了吧你，每次打架前你先看看自己鞋带系紧没，别又冲两步摔个狗吃屎。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'right',
        text: '张希哲你皮痒了是吧！我那是战术性滑铲！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '都给我闭嘴！毛都没长齐呢还抄家伙？老巢也是你们能瞎冲的？真当自己是名侦探柯南了？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '可我们都已经被他们欺负这么久了。再等，等来的只会是下一拨、更下一拨。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '行，那就一起去。你们冲前面，我们两个大人压后。查归查，谁都不许一个人往里冲。',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '大家商量完毕，决定直捣黄龙。',
      buttonText: '【前往城郊旧训练馆】',
      targetScene: 'ch4_scene_street'
    }
  },

  ch4_scene_street: {
    id: 'ch4_scene_street',
    title: '旧训练馆外 · 拿货的下线',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_street@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '傍晚时分，一行人按着地址摸到了城郊废弃旧训练馆外。远远就能看见门口停着几辆熟悉的小吃车，几个商贩正往高年级混混和异化体育生手里塞荧光包装的零食。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '推车小贩',
        leftPortrait: 'assets/art/vendor_default@2x.png',
        rightPortrait: 'assets/art/punk_default@2x.png',
        activeSide: 'left',
        text: '尝尝，新出的辣条，吃了刷题不困，通宵都精神。你们不是说最近卷子压得人脑袋疼吗？这玩意儿最顶用。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '高年级混混',
        leftPortrait: 'assets/art/vendor_default@2x.png',
        rightPortrait: 'assets/art/punk_default@2x.png',
        activeSide: 'right',
        text: '废话那么多，货够不够？我们兄弟还等着分呢。下周月考一到，谁还不想往前窜几名。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '异化体育生',
        leftPortrait: 'assets/art/senior_athlete_corrupted@2x.png',
        rightPortrait: 'assets/art/punk_default@2x.png',
        activeSide: 'left',
        text: '就是，赶紧拿来！我们队长说了，教练这儿的货是最好的！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/punk_default@2x.png',
        activeSide: 'left',
        text: '果然，外面这些散货的全是来这儿拿的！',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '再不动手，那几箱东西马上就要被搬空了。',
      buttonText: '【逼近训练馆】',
      targetScene: 'ch4_scene_coach'
    }
  },

  ch4_scene_coach: {
    id: 'ch4_scene_coach',
    title: '旧训练馆 · 全国第一',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_training_room@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '众人刚把外围几个人逼退，训练馆那扇吱呀作响的铁门就自己开了。馆里昏黄得像一直没见过太阳，最里面的裁判椅上坐着个光头中年男人，手里慢慢转着秒表。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '坏教练',
        leftPortrait: 'assets/art/coach_corrupted@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '哪来的小屁孩？毛都没长齐，也敢管爷爷的事？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/coach_corrupted@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'right',
        text: '就是你让他们往学校塞这些破东西的？害了多少同学了你还敢坐这儿装大爷！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '坏教练',
        leftPortrait: 'assets/art/coach_corrupted@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '害？我这是给他们捷径。喝了就能拿第一，多少人求着我要，我还不一定给呢。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/coach_corrupted@2x.png',
        activeSide: 'left',
        text: '你把人吃成那样，还好意思说是帮忙？',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '坏教练',
        leftPortrait: 'assets/art/coach_corrupted@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '小姑娘，话别说太早。吃不到葡萄说葡萄酸，你还没尝过“赢”是什么滋味。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '他抬手吹了声短促的铁哨，馆里几个刚才还低着头搬箱子的学生猛地抬起头来，眼睛一层层亮起青光。训练垫边上还滚出来一堆泛黄旧奖状，边角都磨毛了。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/coach_corrupted@2x.png',
        activeSide: 'left',
        text: '别跟他废话。先把他和这些被异化的人一起打败，再从他嘴里把所有真相挖出来。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'JOIN_PARTY',
      unitIds: ['teacher_xu', 'adult_liu'],
      prompt: '坏教练捏碎了秒表，四周的小弟跟着眼冒青光。',
      buttonText: '【击退坏教练】',
      battleId: 'ch4_battle1',
      isBattleTrigger: true
    }
  },

  ch4_scene_after: {
    id: 'ch4_scene_after',
    title: '训练馆深处 · 受害者长大了',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_training_room@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '坏教练被打得踉跄着跌坐在地上，旁边几个刚恢复的学生还在捂着脑袋喘。训练馆里一下子只剩秒表乱晃的声音。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '原本凶神恶煞的坏教练，此刻眼里的青光完全褪去。他看着满地散落的旧奖状和异化零食，忽然像个无助的孩子一样捂住脸，肩膀止不住地发抖，竟然当着所有人的面哭了起来。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '坏教练',
        leftPortrait: 'assets/art/coach_sad@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '二十年前……我就是个连体测都过不了的体育差生。所有人都笑话我。喝了这东西，我真拿过全国少年冠军。那几年我风光得很，谁见我都客客气气。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '坏教练',
        leftPortrait: 'assets/art/coach_sad@2x.png',
        rightPortrait: 'assets/art/vendor_sad@2x.png',
        activeSide: 'left',
        text: '可巅峰就那几年。除了跑步我什么都不会，后来腿废了、名头也没了，只能在这种破地方混饭吃。你说我不靠这个，我还靠什么？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '推车小贩',
        leftPortrait: 'assets/art/vendor_sad@2x.png',
        rightPortrait: 'assets/art/coach_sad@2x.png',
        activeSide: 'left',
        text: '我当年也是。全班倒数，我爸说我考不上大学就去要饭。靠这东西我考过省状元，风光没几年，现在还不是在小学门口卖烤肠，天天被城管追。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '两人说着说着，身上的青光又忽然一阵一阵往上翻，像是那股劲还不肯彻底放开他们。众人下意识围上去，一声一声喊，把人从那股反噬里往回拽。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '坏教练',
        leftPortrait: 'assets/art/coach_sad@2x.png',
        rightPortrait: 'assets/art/vendor_sad@2x.png',
        activeSide: 'left',
        text: '我知道这东西不对……我真的知道。可我除了让小孩喝这个拿成绩，我什么都不会啊。我不这么干，我连饭都吃不上。',
        highlight: true,
        sfx: 'sfx_unit_down'
      },
      {
        id: 8,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/coach_sad@2x.png',
        activeSide: 'left',
        text: '原来不是“坏人专门去害人”。是以前的受害者，变成了今天的加害者。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/coach_sad@2x.png',
        activeSide: 'left',
        text: '加害者和受害者，从来就是同一群人。只不过有人当年他们被异化后，就彻底忘了真正的自我。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '坏教练',
        leftPortrait: 'assets/art/coach_sad@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '货不是我们做的。隔两个月，就有人把这些异化零食的纸箱放在训练馆门口。我从来没见过送货的人长什么样，只知道问多了，就再也拿不到货。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '刘老师从散落的旧账本里抽出一张送货单，另一只手掰开坏教练攥紧的掌心，摸出一把挂着褪色号码牌的旧仓库钥匙。送货单上写得很清楚：家长会前夜，统一装车。',
        sfx: 'sfx_item_get'
      },
      {
        id: 12,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '也就是说，他们下一步是要借家长会，把东西直接送进每个孩子家里。',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '真正让人发冷的不是仓库有多少货，而是明知道递过来的是毒药，还是会有人主动去接。',
      buttonText: '【赶往家长会】',
      targetScene: 'ch5_scene_parent_meeting'
    }
  }
};
