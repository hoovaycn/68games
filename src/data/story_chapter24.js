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
        text: '四周一片冰冷，空气里弥漫着刺鼻的焦糊味。天空阴沉沉的，到处都是破败的金属巨塔与废墟。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（咳着泥水从瓦砾中爬出）大家都在吗？！希哲！瑞怡！老朱！你们都没事吧？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（揉着摔疼的膝盖）哎哟……{MC_NAME}，这是哪儿啊？！刚才还在徐老师的房间里，怎么一眨眼……这楼怎么全塌了？！天上的全息屏写的……二零四六年？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '（害怕地指着街对面）你们快看那些走在街上的人……他们的脸怎么怪怪的？！',
        sfx: 'sfx_suspense'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '街上的行人都戴着焊死的金属面具，面具上画着诡异的红色假笑，额头上印着【100分·绝对合格】。他们步伐整齐，周围听不到一点说话声。',
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
        text: '那人机械地转过头，额头红光闪烁：『检测到杂音，扣除公民积分2点。』说完甩开手，头也不回地朝前走去。',
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
        text: '大理石门柱断裂半埋在瓦砾里，隐约看得见“崇文实验”四个字。在原本升旗台的位置，立着一座两米多高的黑色花岗岩纪念碑。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '朱彦泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: '{ALLY_2_NAME}',
        activeSide: 'left',
        text: '这里真的是我们学校！快看这块石碑，上面刻着名单！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '（死死抓着石碑上的名字，浑身发抖）不……这不可能……我爸的名字怎么会在上面……这绝不可能！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '碑文触目惊心：【徐博、刘淑惠、海峰——于2026年9月28日，牺牲于长江三号船自爆事件。浩气长存。】',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（跪倒在石碑前，眼泪涌了出来）2026年9月28日？！离我们出发的那天，只剩不到两个星期了啊！徐老师……刘老师……海峰叔叔……他们全都在那艘船上牺牲了？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（哭出声）所以预警信是真的！未来警徽也是真的！大人们全都不在了……谁来带我们回家啊……呜呜呜……',
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
        text: '广播尖啸：『警报！检测到异常情感波动！纯洁度低于30分！立即执行清除！』',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '执行队长',
        leftPortrait: 'assets/art/boss_exam_captain@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（手持电弧防暴棍，机械音冰冷）停止情绪反应。接受前额叶情感切除手术，否则直接销毁！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/boss_exam_captain@2x.png',
        activeSide: 'left',
        text: '（抹干眼泪抽出一根钢筋，怒吼）切除你个大头鬼！你们这帮戴假笑面具的铁皮怪，也配在老师们的纪念碑前叫嚣？！想动我们，先问问老子手里的钢筋！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/boss_exam_captain@2x.png',
        activeSide: 'left',
        text: '大家列阵！保护好老师们的石碑！迎战！！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '外骨骼执行队长携机械治安官扑来！',
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
        text: '轰隆！身后的断墙被战车撞塌，大家被逼到了绝壁死角，激光把地面打得火花四溅！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（咬紧牙关挡在前面，眼眶泛红）{MC_NAME}……难道我们真的要死在这座冷冰冰的未来城市里了吗……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '徐老师教过我们浩然正气！就算是死，我们也绝不戴那种恶心的面具！来啊！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '执行队长',
        leftPortrait: 'assets/art/boss_exam_captain@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '锁定目标头部。执行彻底清——',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '咻——轰！！！两枚电磁手雷从高架桥凌空砸下，电弧疯狂炸裂！紧接着反器材狙击枪轰鸣，机甲座舱应声爆炸！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '神秘人',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（身披破损黑斗篷，手握脉冲霰弹枪顺滑索落下，拉住两人）几个小鬼胆子挺大啊！连重装防暴队都敢硬刚？！快趴下，跟我往防空洞撤！',
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
