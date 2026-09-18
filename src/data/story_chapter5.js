/**
 * 第六章《家长会》剧情脚本数据表
 *
 * 重点：
 * - 这是考试前的家长会；
 * - 家长不能打，重点是看见“明明知道不对，却还是想赌”的心理；
 * - 张希哲、覃瑞怡、朱晏泽缺席要成为后面大崩盘的伏笔。
 */

export const CHAPTER5_STORY = {
  ch5_scene_parent_meeting: {
    id: 'ch5_scene_parent_meeting',
    title: '考试前夜 · 家长会',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_parent_meeting.png',
    bgm: 'bgm_classroom',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '期中考试前最后一次家长会，六八班教室里坐满了家长，椅子不够，连过道都站着人。窗外天已经擦黑，教室里却闷得人额头冒汗。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '讲台上，穿浅灰夹克、夹着黑公文包的家委主任正站在最中间，桌子上摆着整整一排印着怪 logo 的零食和饮料，堆得像小山一样显眼。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '张希哲、覃瑞怡、朱晏泽怎么一个都没来？平时这种热闹他们三个不是最爱往前凑吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: 'assets/art/adult_liu_default.png',
        activeSide: 'left',
        text: '他们三家家长放学就把人接走了，说要“回去单独聊聊考试的事”。我发消息过去，到现在都没人回。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '我不喜欢这个说法。每次大考前，总有人觉得只要把孩子单独拎回去加加码，分数就会自己长出来。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '家委主任',
        leftPortrait: 'assets/art/parent_rep_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '各位家长静一静！这是我托了好多关系，从专门做尖子生培养的教育机构弄来的“聪明营养片”和“考前专注饮”。人家重点中学的孩子都在吃，今天现场请两个同学试试，免费的！',
        sfx: 'sfx_confirm'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '他说着，伸手点了点后排两个成绩中等、平时最容易被比较的同学。那两个孩子愣了一下，旁边家长的目光却已经齐刷刷落过去了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '家委主任',
        leftPortrait: 'assets/art/parent_rep_default.png',
        rightPortrait: 'assets/art/classmate_boy_corrupted.png',
        activeSide: 'left',
        text: '来，别害怕。吃完下次考试肯定进前十，也给你们爸妈长长脸。现在这个年头，不早点想办法，怎么跟别人家孩子拼？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '家长甲',
        leftPortrait: 'assets/art/parent_rep_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'right',
        text: '老师你们先别拦。人家家委主任也是好心，弄点营养品回来试试，总不能真害自己班孩子吧？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/parent_rep_default.png',
        activeSide: 'left',
        text: '那几包东西一摆出来，我后背就开始发冷。可最吓人的不是它摆在讲台上，是下面真的有人在认真衡量：要不要让自己孩子试一口。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '徐老师刚想上前，最后那两个被点到的同学已经在一屋子大人的注视下，硬着头皮接过了包装袋。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '再晚一步，就不是拦不拦得住的问题了。',
      buttonText: '【盯住那两个孩子】',
      targetScene: 'ch5_scene_breakout'
    }
  },

  ch5_scene_breakout: {
    id: 'ch5_scene_breakout',
    title: '教室里 · 乱起来了',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_parent_meeting.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '两个同学对视一眼，在满教室家长面前撕开包装，嚼了两口。也就几秒钟，他们眼里“唰”地浮上一层青蓝色的光，脸上的表情一下空了。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '学生家长',
        leftPortrait: 'assets/art/parent_rep_default.png',
        rightPortrait: 'assets/art/classmate_girl_corrupted.png',
        activeSide: 'left',
        text: '孩子？你怎么了？我是妈妈啊，你看我一眼！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '教室瞬间乱成一团，椅子倒了一片。那两个孩子尖叫着扑向离自己最近的人，后排又有四个之前偷偷拿过样品的同学跟着站了起来，嘴里一遍遍念着“再吃一口就能考好”。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '家委主任',
        leftPortrait: 'assets/art/parent_rep_default.png',
        rightPortrait: 'assets/art/classmate_boy_corrupted.png',
        activeSide: 'left',
        text: '这、这不可能……不是说只是提神吗？不是说重点学校都在吃吗？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: 'assets/art/classmate_boy_corrupted.png',
        activeSide: 'left',
        text: '都往后退！家长别往前挤！孩子现在认不出人，谁再扑上去只会被撞伤！',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default.png',
        rightPortrait: 'assets/art/classmate_girl_corrupted.png',
        activeSide: 'left',
        text: '家长不进战。你们全退到后排，把窗边那块让出来。我们先把孩子喊回来，谁都不许再喂第二口！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/classmate_girl_corrupted.png',
        activeSide: 'left',
        text: '他们不是在发疯，他们是在被一句话顶着走。“考好一点”“别让爸妈失望”“就今天一晚”……这些话全挤到一块去了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/classmate_boy_corrupted.png',
        activeSide: 'left',
        text: '讲台前先站开！别让他们冲到家长堆里去！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '现在能做的只有一件事：先把当场异化的孩子全部打醒。',
      buttonText: '【护住教室】',
      battleId: 'ch5_battle1',
      isBattleTrigger: true
    }
  },

  ch5_scene_after: {
    id: 'ch5_scene_after',
    title: '家长会散场后 · 没人真的被吓住',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_parent_meeting.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '最后一个异化同学被打醒后，瘫坐在地上茫然地看着翻倒的椅子，像刚从一场恶梦里醒过来。满教室家长都亲眼看见了自己孩子刚才认不出人的样子，半天没人说话。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 2,
        speaker: '家长乙',
        leftPortrait: 'assets/art/parent_rep_default.png',
        rightPortrait: 'assets/art/classmate_girl_corrupted.png',
        activeSide: 'left',
        text: '这什么破东西！可不能给孩子吃！好好的孩子都吃成疯子了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '讲桌上很快堆起一片被退回的样品。家委主任夹着公文包，脸色一阵青一阵白，终于灰溜溜地往门口退。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '家委主任',
        leftPortrait: 'assets/art/parent_rep_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '你们懂什么？别人家挤破头都抢不到，就你们轴。将来孩子考不上好学校，有你们后悔的！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '可比起他那句嘴硬的话，更让人发冷的是另一幕：几个家长一边说“太吓人了”，一边左右看了看，还是把没拆的样品悄悄塞进了包里。',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/parent_rep_default.png',
        activeSide: 'left',
        text: '他们明明已经看见后果了，可还是有人舍不得松手。因为他们要的从来不只是孩子平平安安，是提分，是第一，是拿去跟别人家比的那个结果。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '最吓人的从来不是零食本身，是所有人都觉得：为了赢，这点代价也值。最后分数也许真拿到了，可那个会笑、会发呆、会因为解出一道题开心半天的孩子，可能就回不来了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: 'assets/art/adult_liu_default.png',
        activeSide: 'left',
        text: '张希哲他们三个还是没消息？',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '没有。对话框一直安安静静的，像是人根本没碰手机。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '不对……这个家委主任，我十几年前好像在哪见过。不是这张脸，是这种表情。抢着往前凑，急着问“有没有更快的办法”的那种表情。',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '窗外的教学楼一层层暗下去，而真正的坏消息，很可能这才刚开始。',
      buttonText: '【去找失联的人】',
      targetScene: 'ch6_scene_corridor'
    }
  }
};
