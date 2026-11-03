/**
 * 第二十四章《钢铁废墟》剧情脚本数据表（第三幕 第4章）
 *
 * 流程结构：
 * - ch24_scene_ruins_arrival: 穿越至2046年未来城市废墟，满城面具人行尸走肉，情感被抹杀
 * - ch24_scene_martyr_monument: 发现崇文实验旧址，黑色花岗岩烈士纪念碑刻着徐博、刘淑惠、海峰于2026年9月28日牺牲
 * - ch24_scene_security_breach: 满分治安官与情绪清扫机甲合围，判定悲伤愤怒为高危感染
 * - ch24_battle1: 未来广场突围求生战（主角团5人 VS 满分治安官团队）
 * - ch24_scene_abyss_cornered: 弹尽粮绝之际，黑斗篷神秘人从高架桥投掷EMP并狙爆机甲救场
 */

export const CHAPTER24_STORY = {
  // s1: 冰冷酸雨 · 满分面具的死城
  ch24_scene_ruins_arrival: {
    id: 'ch24_scene_ruins_arrival',
    title: '二零四六年 · 冰冷的未来废墟',
    bgType: 'future_city',
    bgImg: 'assets/backgrounds/bg_future_city_ruins@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '冷。刺骨欲裂的冰冷。鼻腔里充斥着剧烈刺鼻的焦油味与烧焦绝缘电缆的臭氧味。天空中飘着灰白色的刺鼻酸雨，四周矗立着一栋栋直插铅灰色阴云的森冷金属巨塔。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '（咳着泥水从焦黑瓦砾中爬出，扶起身旁的伙伴）咳咳咳……大家……大家都在吗？！希哲！瑞怡！老朱！你们都没事吧？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（揉着摔青的膝盖）哎哟我的屁股……{MC_NAME}，我们这是在哪儿啊？！刚才还在徐老师的咨询室里，怎么一眨眼……这楼怎么全被削掉半截了？！还有天上的广告牌……二零四六年？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '（浑身战栗指着街对面走动的队伍）你们快看那些走在街上的人……他们的脸……怎么长成那样？！',
        sfx: 'sfx_suspense'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '街道两旁的行人面孔都被严丝合缝焊死的合金面具覆盖，面具上画着红漆诡异假笑，额头烙印着【100分·绝对合格个体】。他们步伐整齐划一，城市听不到任何笑声与叹息。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '朱彦泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（壮着胆子拉住其中一人）叔叔！请问崇文实验小学怎么走？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '面具人僵硬转头，额头红印骤然转为黄光：『检测到低频杂质音波，扣除公民积分2点，请服从天梯考核。』说完甩开手，机械地继续向前走去。',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '穿过铁丝网死巷，众人循着记忆跑向熟悉的旧校址广场。',
      buttonText: '【前往学校广场 · 寻找校址】',
      targetScene: 'ch24_scene_martyr_monument'
    }
  },

  // s2: 广场中央 · 石破天惊的墓碑
  ch24_scene_martyr_monument: {
    id: 'ch24_scene_martyr_monument',
    title: '旧校址广场 · 刻在黑色岩石上的真相',
    bgType: 'monument',
    bgImg: 'assets/backgrounds/bg_future_square_monument@2x.png',
    bgm: 'bgm_shock_sting',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '大理石门柱断裂半埋在瓦砾里，上面隐隐残留着“崇文实验”四个剥落金字。在原本升旗台的位置，矗立着一座两米多高、满是弹痕的黑色花岗岩烈士纪念碑。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '朱彦泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '这里真的是我们的学校！快看这块石碑，上面刻着名单！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '（抚摸石碑顶端铭文，瞳孔剧烈收缩，呼吸几乎停滞）不……这不是真的……这绝不可能！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '碑文触目惊心：【徐博（崇文实验小学六年级班主任）、刘淑惠（少先队大队辅导员）、海峰（一级警督）——于2026年9月28日，牺牲于长江三号船自爆事件。浩气长存。】',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '（双腿一软跪在泥水里，双拳砸向石板，眼泪决堤而出）2026年9月28日？！距离我们被阿瑶打进裂隙的那天，只有不到两个星期了啊！！徐老师……刘老师……海峰叔叔……他们全都在那艘船上牺牲了？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（跪在碑前痛哭）所以那封信是真的！未来警徽是真的！大人们全都不在了……二十年后的世界真的毁灭了……谁来带我们回家啊……呜呜呜……',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '尖锐的防空警报声突然在广场四角炸响！',
      buttonText: '【警报狂鸣 · 遭遇机械执法队】',
      targetScene: 'ch24_scene_security_breach'
    }
  },

  // s3: 红光降临 · 机械暴徒的猎杀
  ch24_scene_security_breach: {
    id: 'ch24_scene_security_breach',
    title: '纪念碑四周 · 冰冷的绞杀网',
    bgType: 'monument',
    bgImg: 'assets/backgrounds/bg_future_square_monument@2x.png',
    bgm: 'bgm_army_approaching',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '刺耳广播尖啸：『警报！旧校址检测到高危生物体！释放大剂量悲伤、愤怒恶性情感污染源！情感纯洁度低于30分！判定为高危感染宿主！立即执行清除！』',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '执行队长',
        leftPortrait: 'assets/art/boss_exam_captain@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（重装外骨骼紧握电弧防暴棍，机械音冰冷）低等生物，停止低级情感排泄。交出未登记大脑，接受前额叶情感切除手术！否则直接碾碎为机修肥料！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/boss_exam_captain@2x.png',
        activeSide: 'left',
        text: '（抹干眼泪抽出一根螺纹钢筋，怒吼）切除你妈的情感！你们这帮戴着死人面具的铁皮怪物，也配在徐老师和刘老师的纪念碑前指手画脚？！想把我们变成行尸走肉，先从老子的尸体上跨过去！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/boss_exam_captain@2x.png',
        activeSide: 'left',
        text: '六8班，列阵！别让他们玷污了老师们的石碑！迎战！！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '外骨骼执行队长携机械治安官与高空探针扑来！',
      buttonText: '【进入战斗 · 未来广场突围求生战】',
      battleId: 'ch24_battle1',
      isBattleTrigger: true,
      targetScene: 'ch24_scene_abyss_cornered'
    }
  },

  // s4: 绝境逼近 · 从天而降的黑影
  ch24_scene_abyss_cornered: {
    id: 'ch24_scene_abyss_cornered',
    title: '废墟断墙下 · 弹尽粮绝之危',
    bgType: 'future_city',
    bgImg: 'assets/backgrounds/bg_future_city_ruins@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '轰隆！最后一堵断墙被执法战车撞塌！孩子们满身是伤被逼到绝壁死胡同，张希哲的钢筋被打弯，枪械的刺目激光将雨幕切割得粉碎！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（泪水模糊）{MC_NAME}……对不起……我们连大人们都没能救回来……就要死在这座连眼泪都不被允许的冷血未来了吗……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '徐老师教过我们……做人要有浩然正气！就算是死，我们也绝不戴着那种恶心的假笑面具死！来啊！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '执行队长',
        leftPortrait: 'assets/art/boss_exam_captain@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '锁定目标头部。执行彻底格式——',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '咻——轰！！！两枚漆黑的EMP电磁手雷从百米高架桥精准砸中执行队长面门，电弧狂暴炸裂！紧接着反器材狙击枪轰鸣，一枪穿透六足机甲座舱引爆冲天火球！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '神秘人',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（身披破损黑斗篷，手握脉冲霰弹枪顺滑索从天而降，一把提住两人的衣领）几个小兔崽子命挺硬啊！连治安军重装防暴队都敢硬刚？！趴下！跟着我往老防空洞撤！快！！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '神秘黑斗篷战士掩护孩子们冲进地下通道。',
      buttonText: '【开启第二十五章 · 时空重逢】',
      targetScene: 'ch25_scene_shelter_arrival'
    }
  }
};
