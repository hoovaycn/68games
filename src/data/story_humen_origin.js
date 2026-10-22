/**
 * 第十七章《福寿堂留下的罐子》：追查古罐，见证一家药铺走上歪路。
 * 沿用原有的 ch15_scene_righteous_seal 场景 ID，旧存档可继续读取。
 */

export const HUMEN_ORIGIN_STORY = {
  ch15b_scene_missing_jar: {
    id: 'ch15b_scene_missing_jar',
    title: '虎门销烟池边 · 少了一只罐',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_humen_beach_1839@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '虎门民团教头',
        leftPortrait: 'assets/art/militia_instructor_1839@2x.png',
        rightPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        activeSide: 'left',
        text: '林大人，箱子都在，但装烟膏的青花罐少了一只。有人看见刚才打起来时，一个人把罐子放上小车，往旧码头推走了。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '池子守住了，那只罐子也得找回来。教头，你带人看好剩下的货。孩子们跟我去码头，千万别自己追。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '等等，车轮印旁掉了块木牌，上面写着“福寿堂”。我在我们那儿查沈家时，也见过这个名字。',
        highlight: true,
        bgm: 'bgm_eerie_revelation',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '福寿堂？难道这时候他们就跟走私船是一伙的？先别猜了，沿车轮印找找那只罐子。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '教头留在池边看守剩下的货。林则徐带着官兵和孩子们，沿车轮印走到旧码头。',
      buttonText: '【跟着车轮印去码头】',
      targetScene: 'ch15b_scene_smuggler_storehouse'
    }
  },

  ch15b_scene_smuggler_storehouse: {
    id: 'ch15b_scene_smuggler_storehouse',
    title: '虎门旧码头 · 福寿堂药仓',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_humen_fushoutang_storehouse@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '官兵推开仓门。墙边是福寿堂准备免费发给穷人的药材箱。门口停着刚才那辆小车，车上是丢失的青花罐，旁边还堆着几箱烟膏。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '福寿堂沈掌柜',
        leftPortrait: 'assets/art/fushoutang_shopkeeper_1839@2x.png',
        rightPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        activeSide: 'left',
        text: '林大人，车是他们从我店里抢走的！洋商要借我的铺子藏烟膏，我没答应。他们打完仗把罐子推进来，硬说这仓里的货都是我的。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '走私水手',
        leftPortrait: 'assets/art/foreign_sailor_1839@2x.png',
        rightPortrait: 'assets/art/fushoutang_shopkeeper_1839@2x.png',
        activeSide: 'left',
        text: '别装了！把你的几家铺子借我们运货，洋商付的银子，可比你免费给穷人发药强多了。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: 'assets/art/fushoutang_shopkeeper_1839@2x.png',
        activeSide: 'left',
        text: '给穷人的药材先别动。烟膏和那只罐子是谁推进来的，我会查清楚；现在先把这批走私的货扣下。',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '海叔叔，你不是说两百年后的福寿堂拿药害学生吗？可沈家现在还在免费给穷人发药啊。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '福寿堂沈掌柜',
        leftPortrait: 'assets/art/fushoutang_shopkeeper_1839@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（愣住）两百年后……还有福寿堂？',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '走私水手',
        leftPortrait: 'assets/art/foreign_sailor_1839@2x.png',
        rightPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        activeSide: 'left',
        text: '别让他们把货扣下！抢回罐子和烟膏，快搬上船！',
        bgm: 'bgm_battle_normal',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '六个人跟紧我！拦住水手，别让他们把罐子和烟膏搬走！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '走私水手扑向青花罐和烟膏，想把这批货抢回船上！',
      buttonText: '【拦住水手 · 守住烟膏】',
      battleId: 'ch15b_battle1',
      isBattleTrigger: true
    }
  },

  ch15b_scene_storehouse_aftermath: {
    id: 'ch15b_scene_storehouse_aftermath',
    title: '虎门旧码头 · 药铺变了',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_humen_fushoutang_storehouse@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '水手被打退，官兵开始搬走烟膏。药材箱原样留下，青花罐还在门口的小车上。沈掌柜盯着那只罐子看了很久。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: 'assets/art/fushoutang_shopkeeper_1839@2x.png',
        activeSide: 'left',
        text: '你原来免费给穷人发药，以后也可以接着做。这几箱烟膏是走私者塞进来的，不会算在你头上。往后别再让他们进门。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '福寿堂沈掌柜',
        leftPortrait: 'assets/art/fushoutang_shopkeeper_1839@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（看着青花罐，低声说）两百年后，福寿堂还在卖害人的药……难道沈家后来是靠帮洋商运烟膏发财的？',
        highlight: true,
        bgm: 'bgm_eerie_revelation',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: 'assets/art/fushoutang_shopkeeper_1839@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '趁官兵搬货，沈掌柜突然抱起青花罐，从后门跳上小船。海峰追到门口，只看见他正往洋商的船那边划。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '一阵浪打翻了小船。青花罐从沈掌柜手里滑脱，沉进虎门海口。洋商船上的水手把他拉了上去；官兵派船打捞那只罐子，可浪太急，一时找不到了。',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 6,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '博物馆的铭牌写着“虎门海口出水”，就是这只罐子吧？可掌柜刚才明明不肯帮洋商，怎么听完我们说的未来，就把罐子抱走了？',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '我说了两百年后的事，他才知道福寿堂能开那么久。可我不说，他就不会拿那只罐子吗？',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 8,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '我也不知道咱们没来会怎样。洋商早就在拉他入伙，最后抱罐子上船也是他自己选的。先回池边，往后怎么对付福寿堂，我们还得想办法。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '官兵留下看守药仓，林则徐带着孩子们回到销烟池。',
      buttonText: '【回到销烟池】',
      targetScene: 'ch15b_scene_lin_report'
    }
  },

  ch15b_scene_lin_report: {
    id: 'ch15b_scene_lin_report',
    title: '销烟池边 · 沈掌柜跑了',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_humen_beach_1839@2x.png',
    bgm: 'bgm_gojira_battle',
    dialogues: [
      {
        id: 1,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '沈掌柜上了洋商的船，我会让官兵盯住他们。往后要是再拿药铺藏烟膏，一定查到底。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        activeSide: 'left',
        text: '林总督，在我们那边，沈家后来真的拿药铺当幌子卖害人的药。回去后，我会沿着这条线继续查。',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '教头守池时用的木杖，是我交给民团的。他已经还给我，你们带回去吧。那帮人还在卖毒药，就别停下。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        activeSide: 'left',
        text: '明白。回去我们就追沈家，不能再让他们把药送进学校。',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '林则徐把守池用的木杖交给众人，杖上的字亮了起来。',
      buttonText: '【带着线索返回现代】',
      targetScene: 'ch15_scene_righteous_seal'
    }
  },

  ch15_scene_righteous_seal: {
    id: 'ch15_scene_righteous_seal',
    title: '虎门海滩 · 再次穿越',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_humen_beach_1839@2x.png',
    bgm: 'bgm_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '{MC_NAME}握紧木杖，掌心沾上一点销烟池边的白灰。白烟从杖身飘过，金色的“浩然正气”四字一点点亮起来。刚才教头握着它守池，现在轮到两百年后的孩子握住它；那道金光，竟与现代碎罐内壁的纹路一模一样。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '林总督，我们回去接着查福寿堂。今天药铺还在免费给穷人发药，沈掌柜却已经抱着罐子去找洋商了。回去后，不能再让他们拿毒药害学生。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '木杖突然发亮，众人脚下再次出现那道把他们卷来时的白光。海滩、销烟池和炮声渐渐远去；大家手拉着手，重新落回现代的驳船上。',
        highlight: true,
        sfx: 'sfx_suspense'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '众人落回现代的驳船上。沈家父子已经逃往下游。',
      buttonText: '【回到现代 · 开启第十八章】',
      targetScene: 'ch16_scene_return_ruins'
    }
  }
};
