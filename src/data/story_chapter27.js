/**
 * 第二十七章《熔炉抉择》剧情脚本数据表（第三幕 第7章）
 *
 * 流程结构：
 * - ch27_scene_reactor_run: 金字塔底层反物质反应堆，时空光门开启连接2026年9月28日黄昏五点五十分
 * - ch27_scene_annihilation_horde: 因果律排斥成年人，大号将十二岁小号推入光环，独自阻击歼灭机甲暴风
 * - ch27_battle1: 光门前最后的血肉长城（大号死守4回合 VS 重装歼灭者暴风）
 * - ch27_scene_great_sacrifice: 光门稳定100%，历史修正使成年主角与副官化作漫天金色光蝶消散，少先队礼嘱托托付未来
 */

export const CHAPTER27_STORY = {
  // s1: 反应堆核心 · 逆转的金色光门
  ch27_scene_reactor_run: {
    id: 'ch27_scene_reactor_run',
    title: '底层深井 · 撕裂维度的光门',
    bgType: 'reactor',
    bgImg: 'assets/backgrounds/bg_reactor_core@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '反物质反应堆大厅深不见底的光井中，蓝白色光弧如狂澜倒卷撕裂空间！球形光门狂暴展开，光门内映照出二零二六年九月二十八日老城区那片染血的火烧云，隐隐传来长江三号船沉闷急促的汽笛声！',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '成年主角',
        leftPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '时空坐标锁死！二零二六年九月二十八日黄昏五点五十分！距离三号船底舱爆炸……还有整整十分钟！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        activeSide: 'left',
        text: '打开了！大号的我，文默叔叔！所有人一起跳进去！我们回2026年把老爸和老师们全救下来！！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '滋啦——砰！成年主角的手套刚刚碰触光门，金色因果律电弧狂暴炸裂，数吨排斥巨力将大号凌空震飞五六米撞在钢柱上，手臂焦黑冒出青烟！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '成年副官',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '没用的……这道门只能通过未被扭曲的纯净原住民，也就是十二岁的你们。我们早就在废墟里长成了一身锈迹与弹片的怪物……因果律排斥我们，我们根本迈不进这扇门。',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        activeSide: 'left',
        text: '（死死抱住胳膊大哭）我不信什么狗屁因果律！你们受了二十年的罪天天被追杀挨饿！现在能回去了凭什么不让你们走？！哪怕被电死也比留在这个烂世界强啊！！',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '防爆气闸门被等离子光刀切开，四米高重装机甲暴风踏碎铁门杀入！',
      buttonText: '【面对追兵 · 誓死阻击】',
      targetScene: 'ch27_scene_annihilation_horde'
    }
  },

  // s2: 钢铁浪潮 · 无路可退
  ch27_scene_annihilation_horde: {
    id: 'ch27_scene_annihilation_horde',
    title: '反应堆大厅前沿 · 绝命防线',
    bgType: 'reactor',
    bgImg: 'assets/backgrounds/bg_reactor_core@2x.png',
    bgm: 'bgm_army_approaching',
    dialogues: [
      {
        id: 1,
        speaker: '歼灭机甲·暴风',
        leftPortrait: 'assets/art/boss_judgement_core@2x.png',
        rightPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        activeSide: 'left',
        text: '目标确认：抵抗军指挥官张子骁，附带时空逆流活体样本五名。执行资本法典第107条：就地物理抹杀，不留俘虏！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '成年主角',
        leftPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（使尽毕生力气将十二岁的小号狠狠扔进蓝白光圈之内）把所有小家伙推进光圈中心！快！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '成年副官',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '（飞身将所有哭喊的孩子推进保护场，拔掉EMP手雷插销）在光圈里趴下！时空稳定读条需要整整一分钟，在读条走完之前，绝对不准迈出光圈半步！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        activeSide: 'left',
        text: '（隔着光幕用球棒砸着屏障痛哭）大叔放我出去！六8班打架从来没有让长辈在前面挨打、自己在后面缩着的道理！我们跟这帮铁皮烂狗拼了！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '成年主角',
        leftPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '傻希哲……这次回去别去江边贪玩了。放学了就乖乖排队出校门，买个两块钱的鸡蛋灌饼，趁热吃了它！文默，给咱们的童年……打扫干净这最后的灰尘吧！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '大号二人立于光圈前化身血肉长城，阻击四面扑来的死士与机甲！',
      buttonText: '【进入战斗 · 光门前最后的血肉长城】',
      battleId: 'ch27_battle1',
      isBattleTrigger: true,
      targetScene: 'ch27_scene_great_sacrifice'
    }
  },

  // s3: 泯灭的光粒 · 换你们一个明天
  ch27_scene_great_sacrifice: {
    id: 'ch27_scene_great_sacrifice',
    title: '时空光门闭合前夕 · 最痛的告别',
    bgType: 'reactor',
    bgImg: 'assets/backgrounds/bg_reactor_core@2x.png',
    bgm: 'bgm_sad_melody',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '轰隆！暴风机甲化作冲天火球！中央光门指示灯彻底转为纯金：【时空共振率：100%！逆行通道正式锁定！】圈外滚滚硝烟中，两个浑身是血的身影转过身来。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        activeSide: 'left',
        text: '（拼命拍打光幕）大号！！门稳固了！快伸手！我拉你进来！快伸手啊！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '随着2026年被改变的命运之线开始倒卷，成年主角与副官的指尖、衣角没有流血，而是化作了一点点如夏夜萤火虫般绚烂的金色数据光粒，在火光中温柔消散。',
        sfx: 'sfx_suspense'
      },
      {
        id: 4,
        speaker: '成年主角',
        leftPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（看着透明消散的双掌，嘴角露出纯真笑容）傻子……如果你回到2026年真的救下了老爸和老师们……崇文实验的操场就不会荒芜，本就不该存在活在废墟里的三十二岁张子骁。我们本来……就是注定要消失的幽灵啊。',
        highlight: true,
        sfx: 'sfx_sad_melody'
      },
      {
        id: 5,
        speaker: '成年副官',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '（穿透光幕将染血的特警警徽塞入小号掌心）我们拿二十年的苦难，换回了一个所有人都在的明天。去底舱按掉倒计时阀门，告诉海峰叔叔六8班一个都没少……替我们把那个阳光灿烂的人生好好过下去！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '成年主角',
        leftPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（在彻底消散前笔直庄重地敬了一个少先队队礼，继而比出大拇指）六8班！张子骁（石予诺）！崇文实验小学的未来就全交给你了！给我——冲啊！！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '漫天金色光雨翩跹炸裂。光门发出一声震天凤鸣，将撕心裂肺痛哭的少年们卷入星河倒卷的时空漩涡，狠狠轰回二零二六年九月二十八日那个残阳如血的江畔黄昏！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '穿过时空风暴，脚下重新踩上冰冷潮湿的江边货船甲板！',
      buttonText: '【开启第二十八章 · 倒流的挽歌】',
      targetScene: 'ch28_scene_return_2026'
    }
  }
};
