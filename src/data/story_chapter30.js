/**
 * 第三十章《跨越百年的毕业礼》剧情脚本数据表（第三幕 第10章 全剧终章）
 *
 * 流程结构：
 * - ch30_scene_second_form: 第二形态降临！机器从阿瑶破碎记忆中扯出沈家父子怨念，回顾害人的根源
 * - ch30_scene_three_generations: 三代同堂！1839林公浩然气、2046大号金色虚影托手、2026生还大人并肩
 * - ch30_scene_divine_summon: 浩然气降临！林则徐、虎门义士、未来人金光召唤，正反对仗
 * - ch30_battle1: 全剧终极大决战【斩断循环】（六8班全员 + 大人们 VS 净化主宰阿瑶与沈家父子灵魂）
 * - ch30_scene_final_redemption: 阿瑶恢复清明，众人重逢原谅，六个孩子一一告别
 * - ch30_scene_golden_departure: 金光林则徐与未来人退场，阿瑶扯断神经缆绳以死终结循环
 * - ch30_scene_epilogue_three_views: 后来——海峰、徐老师、刘老师与少年们各自的未来，全剧终
 */

export const CHAPTER30_STORY = {
  // s1: 第二形态 · 沈家怨念
  ch30_scene_second_form: {
    id: 'ch30_scene_second_form',
    title: '傍晚六点二十分 · 净化主宰降临',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_second_form@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_evil_lair',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '电光熄灭后的天台，陷入一片令人窒息的死寂。只有机器核心深处，传来越来越响、像一颗巨大心脏在跳动般的嗡鸣。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（冷汗顺着额角滑下，猛地举枪对准控制台）别放松！这动静……不对劲！',
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '话音未落，控制台中央轰然炸裂！暗紫气浪冲天而起，阿瑶的身影在电光中急剧膨胀、扭曲，化作一个半人半机器的巨大轮廓，无数光缆与破碎试卷在它周身疯狂旋转。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: 'ayao-final_form',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（瞳孔骤缩，失声喊道）就是这个！我们在未来见过——三号船一炸，阿瑶老师就会启动天梯考场，把全城的人都变成只会打满分的提线木偶！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2}',
        leftEmotion: 'default',
        rightPortrait: 'ayao-final_form',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（声音发颤）对……白发阿瑶老师亲口说的：二零二六年的今天，她把机器开到最大功率，机器会反过来咬住她——原来就是这一刻！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '更令人头皮发麻的是，机器竟从阿瑶破碎的记忆深处，硬生生扯出了两团纠缠不散的黑色怨念——正是当年害了阿瑶、又害了无数学生的沈家父子！',
        sfx: 'sfx_suspense'
      },
      {
        id: 7,
        speaker: '沈崇礼之魂',
        leftPortrait: 'shen_chongli_soul',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（黑色怨念凝聚成一个执文明杖的人形，声音阴冷）二十年了……阿瑶，你终究还是我们沈家的提线木偶。[next]替我们，把这座城里那些不听话的蝼蚁，统统碾成满分吧！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '沈万廷之魂',
        leftPortrait: 'shen_wanting_soul',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（另一团更浑浊的怨念化作苍老身影，嗓音沙哑如风箱）沈家的百年大业，绝不会断送在几个毛孩子手里！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '两团黑气怨念拧成一股，化作滔天黑雾冲天而起！整个天台瞬间暗了下来，一股压得人喘不过气的精神威压，把所有人都死死钉在原地！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 10,
        speaker: '徐老师',
        leftPortrait: 'xu-stealth',
        leftEmotion: 'default',
        rightPortrait: 'shen_wanting_soul',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（死死盯着那两团怨念，拳头捏得咯咯响）沈万廷！二十年前在水闸把阿瑶逼上绝路的，是你！[next]如今又带着你儿子沈崇礼，往学校里送毒零食、害了那么多学生——你们沈家，一个都别想跑！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 11,
        speaker: '覃瑞怡',
        leftPortrait: 'qinruiyi',
        leftEmotion: 'cry',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（声音发颤）阿瑶老师……你为他们吞了毒、背了整整二十年的骂名，到头来，他们连你的灵魂都要当燃料烧掉啊！',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 12,
        speaker: '净化主宰·阿瑶',
        leftPortrait: 'ayao-final_form',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（机械复眼冷漠扫下，声音混着电流）住口……过去的阿瑶已经死了。[next]现在，我只需要一个没有痛苦、没有背叛的世界——哪怕要用沈家的怨念、用我自己的命，来当这场净化的燃料！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '沈家父子的怨念与阿瑶的执念，即将吞噬整座城市！',
      buttonText: '【两代人的浩然气 · 并肩迎战】',
      targetScene: 'ch30_scene_three_generations'
    }
  },

  // s2: 跨越时空的浩然气 · 三代同堂（前段：绝境中的回忆）
  ch30_scene_three_generations: {
    id: 'ch30_scene_three_generations',
    title: '崩解的机器核心前 · 绝境',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_second_form@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_evil_lair',
    dialogues: [
      {
        id: 1,
        speaker: '系统警报广播',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '『净化对象脱离控制！全域净化失败！启动终极毁灭程序：引爆底舱核心，抹除所有证据！！』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '净化主宰·阿瑶',
        leftPortrait: 'ayao-final_form',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（半人半机器的巨大轮廓盘踞在雷暴中央，数万根光缆如巨蟒舞动，机械复眼闪烁深紫电芒）低等生物虚妄的情感……终究不过是一串无用的数据！净化程序全开，将这群蝼蚁连同这片江面全部蒸发！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '沈家父子之魂',
        leftPortrait: 'shen_chongli_soul',
        leftEmotion: 'default',
        rightPortrait: 'shen_wanting_soul',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（两团怨念齐声尖啸，缠上阿瑶的半机械身躯）把这些碍事的凡人……统统烧成灰烬！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（被无形的精神重力压得单膝跪地，仍死死把孩子们护在身后，枪口颤抖却不肯放低）这重力……比第一形态强了十倍不止！都趴下！别抬头！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'xu-stealth',
        leftEmotion: 'default',
        rightPortrait: 'liu',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（被压得直不起腰，却死死抱着教案夹不肯松开，嘶声喊道）孩子们！还记得吗——当年在虎门滩头，林公亲手把那根浩然正气杖交到我们手上的时候，是怎么说的？！',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（咬着牙，从胸口摸出那枚古罐残片，又把书包带上的碎木死死握紧）当然记得！林公说——浩然正气，代代相传，护我中华少年！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 7,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2}',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（红着眼，声音却格外坚定）还有那根浩然正气杖，就是林公当年亲手交到我们手里的！它护着我们走到了今天，这一次，也一定护得住我们！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '唤起跨越百年的浩然正气！',
      buttonText: '【浩然正气 · 开！】',
      targetScene: 'ch30_scene_divine_summon'
    }
  },

  // s2b: 浩然气降临 · 三代同堂（后段：金光召唤）
  ch30_scene_divine_summon: {
    id: 'ch30_scene_divine_summon',
    title: '崩解的机器核心前 · 浩然气降临',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_divine_light@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_cargo_top_second_form@2x.png',
    bgm: 'bgm_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '话音落下，{MC_NAME}胸口的古罐残片和手中的浩然正气杖碎木，突然同时迸发出冲霄而起的纯阳烈焰！[next]一道耀眼的金光撕开漫天黑雾，从天而降，洒满整座天台！',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '林公浩然气',
        leftPortrait: 'lin_zexu-gold',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（金光中，一百八十年前虎门滩头那尊头顶官帽、手握长剑的威严身影浮现，声如洪钟）后生莫惧！林则徐在此！[next]当年虎门一别，吾以这浩然正气杖相托，便是盼它代代相传、护我中华少年！[next]尔等鼠辈，百年前借夷毒祸我中华未成，今日又借巧术役我后生——苟利国家生死以，岂因祸福避趋之，其罪当诛！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '金光所至，黑雾节节退散！当年虎门滩头拼死守池的义士们，还有从绝望未来杀回来的金色身影，一个个在孩子们身后站了起来——正道的浩然气，同样从未断绝！',
        highlight: true
      },
      {
        id: 4,
        speaker: '虎门民团教头',
        leftPortrait: 'militia_instructor-gold',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（金色虚影扛着那根斑驳的木杖，朗声大笑）虎门滩头的义士，也从没散过！[next]小娃娃们，当年我们守住了销烟池，今天，该你们守住自己的考场了！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT}-gold',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（金色虚影微笑着注视大家，声音温柔而坚定）十二岁的我，别怕。[next]我们就是从那个绝望的未来杀回来的你们——今天，我们一起把这台机器、还有那个循环，彻底砸碎！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT}-gold',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（金色虚影并肩站在成年主角身旁，拍了拍胸前空着的警徽位，声音坚定）还有我！[next]我们胸前这空着的位置，就是把警徽送回过去、换你们走到今天的证明。这一仗，谁都不许掉队！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 7,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（端枪上膛，大吼一声）海峰在此！全员突击！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '徐老师＆刘老师',
        leftPortrait: 'xu-stealth',
        leftEmotion: 'default',
        rightPortrait: 'liu',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（抄起铁管与教案夹并肩站立）人大附小六8班全体同学！人生最硬的一道大题，交卷了！！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '全剧终局决战爆发！',
      buttonText: '【斩断循环】',
      battleId: 'ch30_battle1',
      isBattleTrigger: true,
      targetScene: 'ch30_battle1'
    }
  },

  // 终局战斗过渡占位（战后触发）
  ch30_battle1: {
    id: 'ch30_battle1',
    title: '战局结算 · 斩断循环',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_aftermath@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '半人半机器的轮廓被彻底轰碎！沈家父子的怨念发出凄厉尖啸后烟消云散，阿瑶从漫天的电光中跌落，重重摔在甲板上！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '暗紫的光从阿瑶眼底褪去！',
      buttonText: '【扶起阿瑶】',
      targetScene: 'ch30_scene_final_redemption'
    }
  },

  // s3: 最后的答案 · 重逢与原谅
  ch30_scene_final_redemption: {
    id: 'ch30_scene_final_redemption',
    title: '傍晚六点四十分 · 最后的答案',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_aftermath@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_broken',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '当暗紫的光从她眼底褪去，那双眼睛，终于变回了二十年前那个阿瑶。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '阿瑶',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'cry',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（虚弱地抬起头，看着围上来的徐老师、刘老师和海峰，眼泪夺眶而出）老徐……淑惠……海峰哥……我……我是不是……又做错事了……',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'xu-stealth',
        leftEmotion: 'cry',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'cry',
        activeSide: 'left',
        text: '（一把扶住她，声音发颤）没有！你没有做错！是沈家那些畜生，是这台该死的机器，把你困了整整二十年……现在，都没事了。',
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 4,
        speaker: '刘老师',
        leftPortrait: 'liu',
        leftEmotion: 'default',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'cry',
        activeSide: 'left',
        text: '（蹲下身，替她擦去脸上的血污，语气像当年在课桌前一样）阿瑶，我是淑惠。你睁眼看看，机器倒了，孩子们都好好的——咱们六8班，一个都没少。',
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 5,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'cry',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'cry',
        activeSide: 'left',
        text: '（把枪别回腰间，红着眼笑了笑）阿瑶，你海峰哥这回，可算没来晚。[next]你当年替大家扛下的那口黑锅，今天，一起把它砸了。',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '张希哲',
        leftPortrait: 'zhangxizhe',
        leftEmotion: 'cry',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'cry',
        activeSide: 'left',
        text: '（凑上前，把书包带上的碎木举到她眼前，鼻音很重）阿瑶老师！我是张希哲，六8班最皮的那个！[next]你当年发的荧光糖，我们一颗都没咽下去——那玩意儿有毒，我们就知道那不是你的本心。',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 7,
        speaker: '覃瑞怡',
        leftPortrait: 'qinruiyi',
        leftEmotion: 'cry',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'cry',
        activeSide: 'left',
        text: '（眼泪啪嗒往下掉）阿瑶老师，你不是坏人。你是被那台机器骗了二十年……你是为了救我们，才变成那样的！',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 8,
        speaker: '朱晏泽',
        leftPortrait: 'zhuyanze',
        leftEmotion: 'default',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'cry',
        activeSide: 'left',
        text: '（挺直腰板，声音压得稳稳的）六8班，一个都不能少。[next]阿瑶老师，你也是六8班的——这道大题，我们一起交卷。',
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1}',
        leftEmotion: 'default',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'cry',
        activeSide: 'left',
        text: '（紧紧攥住阿瑶老师的手）阿瑶老师，未来已经不一样了！我们没让那台机器把全城变成提线木偶！',
        sfx: 'sfx_confirm'
      },
      {
        id: 10,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2}',
        leftEmotion: 'default',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'cry',
        activeSide: 'left',
        text: '（把从未来带回来的那枚警徽，轻轻按进阿瑶掌心）白发阿瑶老师说的那个"二零二六年的今天"，我们把它改写了。[next]那个绝望的未来，不会来了。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 11,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'cry',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'cry',
        activeSide: 'left',
        text: '（上前一步，语气坚定却带着哭腔）阿瑶老师，世界没变成你说的那个样子。[next]你吞下的毒、背了二十年的骂名，我们没让它白费。',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '漫天金光里，那几道身影缓缓转向了众人。',
      buttonText: '【浩然气的最后嘱托】',
      targetScene: 'ch30_scene_golden_departure'
    }
  },

  // s3b: 金光退场 · 以死终结循环
  ch30_scene_golden_departure: {
    id: 'ch30_scene_golden_departure',
    title: '金光散尽前 · 最后的嘱托',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_aftermath@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_broken',
    dialogues: [
      {
        id: 1,
        speaker: '林公浩然气',
        leftPortrait: 'lin_zexu-dissolve',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_cargo_top_divine_light@2x.png',
        text: '（金光中的威严身影缓缓上前，声如洪钟）后生们，做得好。[next]百年前虎门一别，吾所托者，非仅此一杖，乃"苟利国家生死以"的骨气。今日，你们守住了。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '林公浩然气',
        leftPortrait: 'lin_zexu-dissolve',
        leftEmotion: 'default',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'cry',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_cargo_top_divine_light@2x.png',
        text: '（目光落在虚弱的阿瑶身上，语气转缓）阿瑶，你且听——二十年的罪，不独在你；可今日这一念回头，便足以洗净所有骂名。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '虎门民团教头',
        leftPortrait: 'militia_instructor-dissolve',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_cargo_top_divine_light@2x.png',
        text: '（金色虚影扛着木杖，冲众人咧嘴一笑）小娃娃们，虎门滩头的火，没白烧。[next]往后这浩然正气杖，就交给你们了。守好自己的考场，就是守住了这片天！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT}-dissolve',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_cargo_top_divine_light@2x.png',
        text: '（金色虚影走到十二岁的自己面前，抬手想摸摸他的头，却只是隔着光轻轻一笑）十二岁的我，听好。[next]我们这些来自未来的人，其实早就不属于这里了。循环一断，那个绝望的未来就不会再出现——我们，也该消失了。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT}-dissolve',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_cargo_top_divine_light@2x.png',
        text: '（金色虚影并肩而立，指了指胸前空着的警徽位）小个子，别哭。[next]我们能把警徽送回过去、陪你们走到今天，就已经赢了。未来不会变成考场，你们会好好长大的。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '话音落下，金色的身影自脚边开始，一点一点化作暖金色的光屑，散进江风里——像一场迟到了二十年的告别。[next]天台重归寂静，只剩阿瑶还被那几根神经缆绳，紧紧缠在即将崩解的机器核心上。',
        bgImg: 'assets/backgrounds/bg_cargo_top_aftermath@2x.png',
        bgm: 'bgm_broken',
        sfx: 'sfx_suspense'
      },
      {
        id: 7,
        speaker: '阿瑶',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'smile',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（看着那些消散的金光，忽然笑了，眼泪却止不住）原来……你们一直……都记得……[next]那我也，不能再拖累你们了。[next]机器和我长在了一起，只要我还活着，这循环就永远断不了。',
        highlight: true,
        sfx: 'sfx_sad_melody'
      },
      {
        id: 8,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'smile',
        activeSide: 'left',
        text: '（脸色骤变，冲上前）阿瑶！别做傻事！我们一起想办法！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '阿瑶',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'smile',
        rightPortrait: 'haifeng-police',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（望着冲上来的海峰，轻轻摇头，笑得像二十年前课桌边那个小姑娘）海峰哥……别拦我。[next]你们已经替我扛了二十年，这最后一程，让我自己走。',
        highlight: true,
        sfx: 'sfx_sad_melody'
      },
      {
        id: 10,
        speaker: '阿瑶',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'cry',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（又看向徐老师和刘老师，眼泪一颗颗砸下来）老徐，淑惠……答应我，把六8班带好。[next]别再让哪个孩子，像我一样，为了及格去走歪路。',
        highlight: true,
        sfx: 'sfx_sad_melody'
      },
      {
        id: 11,
        speaker: '阿瑶',
        leftPortrait: 'ayao-adult-dissolve',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（用尽最后力气，猛地扯断后颈的神经缆绳，笑容释然）孩子们……这是老师……最后能教你们的一句话了。[next]好好读书，别学我……要做一个，不向捷径低头的人……',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 12,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '缆绳断裂的瞬间，整台机器发出濒死的嗡鸣，随后轰然坍塌，化作漫天暗紫的光屑。阿瑶的身体也在那光雨中，一点点变得透明，最终化作一缕青烟，消散在江风里。',
        sfx: 'sfx_disaster_fire'
      },
      {
        id: 13,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1}',
        leftEmotion: 'cry',
        rightPortrait: null,
        activeSide: 'left',
        text: '（从口袋里掏出一颗皱巴巴的糖，朝光屑散尽的方向伸出手，声音抖得不成样子）阿瑶老师……我还没请你吃糖呢……[next]等我以后开了小卖部，第一颗糖一定给你留着……',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 14,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2}',
        leftEmotion: 'cry',
        rightPortrait: null,
        activeSide: 'left',
        text: '（死死攥着胸前那枚警徽，哭得浑身发抖）阿瑶老师……我会当个好警察的！[next]沈家那些没算完的账，我一定一笔一笔替你讨回来！',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 15,
        speaker: '覃瑞怡',
        leftPortrait: 'qinruiyi',
        leftEmotion: 'cry',
        rightPortrait: null,
        activeSide: 'left',
        text: '（抱着书，眼泪大颗大颗砸在地上）阿瑶老师……你还没看我当上医生呢……[next]我发誓，你教我们别走捷径，我会记一辈子。',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 16,
        speaker: '张希哲',
        leftPortrait: 'zhangxizhe',
        leftEmotion: 'cry',
        rightPortrait: null,
        activeSide: 'left',
        text: '（狠狠抹了把脸，鼻音浓得发闷）阿瑶老师！我数学这次真能上九十分！[next]你、你在天上可得看着——我以后再也不抄作业了！',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 17,
        speaker: '朱晏泽',
        leftPortrait: 'zhuyanze',
        leftEmotion: 'cry',
        rightPortrait: null,
        activeSide: 'left',
        text: '（挺直腰杆，声音抖得厉害，却仍一字一顿）阿瑶老师……六8班，我会替你守住。[next]一个，都不许走歪。',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 18,
        speaker: '徐老师',
        leftPortrait: 'xu-stealth',
        leftEmotion: 'cry',
        rightPortrait: 'liu',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（扑上前，却只捞到一把散开的光屑，嘶声喊道）阿瑶——！你放心，你的学生们，一个都不会走歪路！',
        highlight: true,
        sfx: 'sfx_sad_melody'
      },
      {
        id: 19,
        speaker: '刘老师',
        leftPortrait: 'liu',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（把脸埋进掌心，声音哽咽）傻阿瑶……你到最后，都还在替别人扛……',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 20,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '江风卷走最后一片光屑，暗紫的天幕终于被撕开一道口子，透出一点破晓前的微光。',
        sfx: 'sfx_confirm'
      },
      {
        id: 21,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: 'liu',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（攥紧拳头，仰起头，把眼泪逼回去）阿瑶老师，我们答应你。[next]不做向捷径低头的人——这是六8班，最后一道大题的答案。',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '江风渐暖，天边亮了。',
      buttonText: '【走下三号船】',
      targetScene: 'ch30_scene_ashore_dawn'
    }
  },

  // s4: 下船 · 晨曦降临
  ch30_scene_ashore_dawn: {
    id: 'ch30_scene_ashore_dawn',
    title: '破晓 · 走下三号船',
    bgType: 'canal_dawn',
    bgImg: 'assets/backgrounds/bg_ending_dawn@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_street@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '众人互相搀扶着，从摇摇欲坠的三号船上走了下来。江风带着清晨的凉意扑面而来，天边已经泛起鱼肚白。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '没有毒雾，没有满分怪物，也没有那个变成考场的未来。远处新校舍的轮廓，在晨曦里一点一点亮了起来。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: 'haifeng-police',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（深深吸了一口气）原来天亮以后，空气是这个味道的。',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（拍了拍{MC_NAME}的肩膀，望着天边）都结束了。走，带你们回家。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '三个月后……',
      buttonText: '【后来】',
      targetScene: 'ch30_scene_epilogue_three_views'
    }
  },

  // s4: 尾声 · 后来（谁谁谁后来怎么样了）
  ch30_scene_epilogue_three_views: {
    id: 'ch30_scene_epilogue_three_views',
    title: '三个月后 · 所有人都在的未来',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_neighborhood@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '三个月后，秋。老运河边的风已经有了桂花香，被炸得七零八落的天台，也早就修葺一新。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_school_gate_afternoon@2x.png',
        text: '【后来 · 海峰】[next]海峰升了职，调去了市局。只是每周五放学，他还是雷打不动地蹲在校门口，举着那台老相机。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '海峰警官',
        leftPortrait: 'haifeng',
        leftEmotion: 'smile',
        rightPortrait: '{ALLY_2}',
        rightEmotion: 'default',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_school_gate_afternoon@2x.png',
        text: '（冲镜头喊）{ALLY_2_NAME}！红领巾系正了再笑！三、二、一，茄子——！[next]（按下快门，小声嘀咕）等你们考上大学，我把这些照片洗成一整面墙。',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_watergate_renewed@2x.png',
        text: '【后来 · 徐老师与刘老师】[next]徐老师和刘老师又带了一届六8班。每年清明，他们都会去一趟江边的老水闸，带一束花，和那支修好的老钢笔。',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'xu',
        leftEmotion: 'smile',
        rightPortrait: 'liu',
        rightEmotion: 'default',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_watergate_renewed@2x.png',
        text: '（把花放在栏杆上，又把老钢笔并排摆好）阿瑶，这届孩子比上届还皮。[next]不过你放心，一个都没走歪。',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '刘老师',
        leftPortrait: 'liu',
        leftEmotion: 'smile',
        rightPortrait: 'xu',
        rightEmotion: 'default',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_watergate_renewed@2x.png',
        text: '（望着江水，轻轻笑）淑惠跟你说，六8班现在有了新的班规——考砸了，擦干眼泪再做一遍就是。[next]这是你教的。',
        sfx: 'sfx_confirm'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '【后来 · 少年们】[next]六8班的孩子们考进了同一所初中，分到了不同的班，可放学还是总凑到一块儿。',
        sfx: 'sfx_confirm'
      },
      {
        id: 8,
        speaker: '张希哲',
        leftPortrait: 'zhangxizhe',
        leftEmotion: 'default',
        rightPortrait: 'qinruiyi',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（颠着足球，眼睛发亮）你们信不信，我这学期数学能上九十分！[next]阿瑶老师在天上看着呢，我可不敢再抄作业了。',
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '覃瑞怡',
        leftPortrait: 'qinruiyi',
        leftEmotion: 'smile',
        rightPortrait: 'zhangxizhe',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（抱着书，笑得眼睛弯弯）我要当医生。[next]以后再有像阿瑶老师那样被坏东西缠上的人，我就去把他们一个个拉回来。',
        sfx: 'sfx_confirm'
      },
      {
        id: 10,
        speaker: '朱晏泽',
        leftPortrait: 'zhuyanze',
        leftEmotion: 'default',
        rightPortrait: 'qinruiyi',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（推了推并不存在的眼镜，一本正经）我当班长，管他们。[next]谁不交作业，我就把阿瑶老师那句"别走捷径"贴他脑门上。',
        sfx: 'sfx_confirm'
      },
      {
        id: 11,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1}',
        leftEmotion: 'default',
        rightPortrait: 'zhuyanze',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（咬着冰棍，含糊不清）我想开家小卖部。[next]让每个考砸的小孩，都能分到一颗"再来一次"的糖。',
        sfx: 'sfx_confirm'
      },
      {
        id: 12,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2}',
        leftEmotion: 'default',
        rightPortrait: '{ALLY_1}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（把一枚警徽别在胸口，挺起胸膛）我要当警察。[next]像我爸那样，把当年沈家没算完的账，一笔一笔算清楚。',
        sfx: 'sfx_confirm'
      },
      {
        id: 13,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: '{ALLY_2}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（抬头看着天，忽然笑出来）我还没想好以后干什么。[next]但我知道，以后每次想走捷径的时候，都会想起——有个叫阿瑶的老师，用她的一辈子，告诉我那条路不能走。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 14,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '夕阳把几个少年的影子拉得老长。街角的光里，仿佛又有几道金色的身影，微笑着冲他们比了个大拇指，然后散进晚风里。',
        sfx: 'sfx_confirm'
      },
      {
        id: 15,
        speaker: '六8班异闻录',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '『谨以此片，献给所有在及格线边缘挣扎过、却从未向捷径低头的少年们。』[next]『——《六8班异闻录》 全剧终。』',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '《六8班异闻录》全剧终。感谢游玩！',
      buttonText: '【全剧终 · 返回标题主菜单】',
      targetScene: 'title_screen'
    }
  }
};
