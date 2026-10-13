/**
 * 第十九章《逆行攻坚》剧情脚本数据表（第二幕 第9章）
 *
 * 流程结构：
 * - ch18_scene_warehouse_breach: 洋行仓库外围，覃瑞怡提供被囚期间记下的防御布控图与弱点，全员制定强攻计划
 * - ch18_scene_teacher_stand: 冲破货栈正门，重装机械药人与大批死士合围。徐老师与刘老师毅然决然留在大厅断后
 * - ch18_battle1: 货栈中庭防线强袭战（主角团 VS 沈氏中枢生化狂战士与重装卫队）
 * - ch18_scene_tower_arrival: 浴血杀穿中庭，少年们登上货栈顶层钟楼大厅，直面沈氏父子与正在启动的巨灵生化枢纽
 */

export const CHAPTER18_STORY = {
  // s1: 戴罪立功 · 破阵密码
  ch18_scene_warehouse_breach: {
    id: 'ch18_scene_warehouse_breach',
    title: '洋行仓库外侧 · 暴雨突击准备',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_warehouse_grand_hall@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '洋行仓库的主楼是一座二十世纪初留下来的哥特式红砖巨堡，四周架设着防暴铁丝网与高压探照灯，暴雨在惨白的光束中狂乱飞舞。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（从口袋里掏出一张用眼线笔画在餐巾纸上的简易草图）大家看，他们把我押进地下室时，我默记了整座楼的监控盲区！货栈东西两侧的电网每隔四十五秒就会断电一小会儿！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '（一脸佩服地凑近草图纸）班长，你这脑子是自带监控回放还是咋的？连哪堵墙是监控死角都能背下来……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '太棒了瑞怡！只要切断他们顶层的备用发电机，整栋货栈的自动防御炮塔就会彻底瘫痪！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '我们趁着跳闸间隙强攻正厅大门，一口气冲上顶层钟楼！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '探照灯扫过的瞬间，主电闸火花迸溅，全场防暴电网骤停！',
      buttonText: '【破门强攻 · 突入货栈大堂】',
      targetScene: 'ch18_scene_teacher_stand'
    }
  },

  // s2: 师者如山 · 决绝断后
  ch18_scene_teacher_stand: {
    id: 'ch18_scene_teacher_stand',
    title: '货栈一层挑空中庭 · 钢铁巨兽',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_warehouse_grand_hall@2x.png',
    bgm: 'bgm_intense_boss',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '沉重的橡木大门轰然被撞开！然而大厅正中央，竟伫立着三具注入了大量变异药剂、手提重型防暴合金盾与电锯的改造重装巨人！大门后方的液压铁闸轰然降下，将退路完全锁死！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '（横握竹教鞭，眼中燃烧着平静而决绝的烈火）老徐，二十年前，我们在校门口退后了一步，抱憾终生；今天，我们身后站着自己最好的学生，一步也不能再退了。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（将旧教案塞进{MC_NAME}怀中，一把将少年们推向通往顶层的螺旋铁梯）孩子们！这里有我们两个老骨头顶着！冲上去，把沈氏两代恶魔彻底终结！！这是老师给你们布置的最后一次作业！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '徐老师！刘老师！！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '别让老师的心血白费！跟紧我，撕碎梯口的守卫，冲上天台！！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '两位老师与重装药人正面硬撼，旋转楼梯上涌出数十名持械死士拦截！',
      buttonText: '【决死强突 · 杀穿螺旋楼梯】',
      battleId: 'ch18_battle1',
      isBattleTrigger: true
    }
  },

  // s3: 登顶天台 · 魔巢尽头
  ch18_scene_tower_arrival: {
    id: 'ch18_scene_tower_arrival',
    title: '货栈顶层钟楼大厅 · 暴风雨之巅',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_clocktower_summit@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '少年们浴血杀穿楼道守军，一脚踹开钟楼紧闭的青铜大门。狂风混杂着暴雨从破碎的彩色玻璃窗灌入，大厅中央赫然悬浮着一颗由无数青黑雾气与机械管道纠缠而成的“百年鸦片巨灵之心”！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/shen_chongli_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（站在巨型控制台前，双眼布满血丝，癫狂狂笑）居然真让你们这群小杂种爬上来了！但你们以为赢了吗？老太爷已经将全身残躯融入了百年鸦片巨灵神，整座城市的重点名校，今夜都将臣服在福寿堂脚下！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/shen_chongli_default@2x.png',
        activeSide: 'left',
        text: '（拔出浩然销烟杖，金芒万丈）沈崇礼，你们两代人的百年毒梦，就在此刻彻底烧成灰吧！！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '青黑巨心轰鸣咆哮，狂暴的毒雾化作滔天风暴！',
      buttonText: '【拔出销烟杖 · 开启终极决战】',
      targetScene: 'ch19_scene_final_stand'
    }
  }
};
