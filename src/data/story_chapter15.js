/**
 * 第十六章《浩然正气》剧情脚本数据表（第二幕 第6章）
 *
 * 流程结构：
 * - ch15_scene_historic_prologue: 【画外音宏大叙事】1838年紫禁城养心殿，道光皇帝面对沉沦危局八召林则徐，御准严禁鸦片
 * - ch15_scene_humen_harbor_inspect: 【前线巡阅】1839年广东虎门古港与海防官口，林则徐临江督防，颁布铁令
 * - ch15_scene_beach_wake: 【时空交错】现代少年团自时空漩涡跌落虎门滩头，亲眼见证历史上的“双池化烟”名场面
 * - ch15_scene_militia_stand: 【外敌突袭】异国鸦片武装水手勾结初代买办死士偷袭化烟池，民团浴血抵抗
 * - ch15_battle1: 【滩头血战】虎门滩头保卫战（主角团 + 虎门民团教头 VS 异国武装水手与初代买办死士）
 * - ch15_scene_lin_commends: 【名臣赐物】林则徐亲临滩头抚慰将士，识破少年赤诚，御赐“浩然销烟杖”作为浩然信物
 * - ch15_scene_righteous_seal: 【共鸣重返】浩然销烟杖爆发神圣浩然金光，破除时空界限，众人重返现代驳船
 */

export const CHAPTER15_STORY = {
  // s1: 【画外音宏大叙事】紫禁城养心殿 · 帝王与重臣的抉择
  ch15_scene_historic_prologue: {
    id: 'ch15_scene_historic_prologue',
    title: '道光十八年 · 紫禁城养心殿',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_forbidden_city_palace@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '历史画外音',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '【清 · 道光十八年 冬】\n幽深森严的紫禁城里，寒风呼呼地刮。西洋的鸦片像蛀虫一样啃食着大江南北，当官的和老百姓都苦不堪言，上千万两白银哗哗地往外流。国家快撑不住的时候，深宫御案前展开了一场决定民族存亡的绝密长谈……',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '道光皇帝',
        leftPortrait: 'assets/art/emperor_daoguang_palace@2x.png',
        rightPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        activeSide: 'left',
        text: '林爱卿，朕看了你的奏折，触目惊心……“中原几乎没有能打仗的兵，也没有能发军饷的银子！”满朝大臣都说不能得罪洋人，只有你敢说要从根上断掉它。你真能替朕、替大清，扛起这副千斤重担？',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: 'assets/art/emperor_daoguang_palace@2x.png',
        activeSide: 'left',
        text: '（撩袍跪伏，声音铿锵如金石）“苟利国家生死以，岂因祸福避趋之！”若鸦片一日不绝，臣一日不回！臣愿提头南下，直抵粤海门户，誓叫这万里海波，复还朗朗乾坤！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '道光皇帝',
        leftPortrait: 'assets/art/emperor_daoguang_palace@2x.png',
        rightPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        activeSide: 'left',
        text: '好！朕赐卿“钦差大臣关防”紫金印绶，节制两广水陆官兵！此去山高水远，去替天下万民，斩断这百年妖毒！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '御案上金印重重落下，风云突变，历史长河呼啸着扑向南国海疆！',
      buttonText: '【南下粤海 · 奔赴前线】',
      targetScene: 'ch15_scene_humen_harbor_inspect'
    }
  },

  // s2: 【前线巡阅】虎门古港 · 帅旗猎猎
  ch15_scene_humen_harbor_inspect: {
    id: 'ch15_scene_humen_harbor_inspect',
    title: '道光十九年 · 广东虎门海防要塞',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_humen_harbor_1839@2x.png',
    bgm: 'bgm_intense_boss',
    dialogues: [
      {
        id: 1,
        speaker: '历史画外音',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '【道光十九年 四月廿二】\n珠江咽喉，虎门海口。靖远、威远炮台炮门洞开，水师百艘战船锁死江面，海滩上聚集着万千义愤填膺的广东军民。一场震动全球的浩然壮举正在此地上演！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '传本钦差军令：开池引潮，投盐泼灰！收缴的两万余箱、两百三十七万余斤鸦片烟膏，全部投进化烟池！凡勾结洋商、藏匿烟土、暗中勾结的人，格杀勿论！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '正当三军齐声高呼、民团擂响战鼓之时，要塞侧翼的沙角海滩突然传来火绳枪与快艇暗袭的剧烈警报！时空的漩涡恰在此刻轰然坠落在沸腾的海滩之上！',
        sfx: 'sfx_suspense'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '剧烈的时空金光与石灰白烟撞在一起，少年们从天而降！',
      buttonText: '【坠落滩头 · 见证历史】',
      targetScene: 'ch15_scene_beach_wake'
    }
  },

  // s3: 【时空交错】沙角滩头 · 沸腾的双池
  ch15_scene_beach_wake: {
    id: 'ch15_scene_beach_wake',
    title: '道光十九年 · 广东虎门沙角海滩',
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
        text: '海浪一波波拍打着裤腿，刺骨的潮水与浓烈的石灰烟尘将少年们猛然呛醒。炽烈耀眼的骄阳下，眼前正是历史课本上庄严厚重的“虎门销烟”现场！',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '（揉着眼睛失声尖叫）天哪！不是做梦！远处海面上停泊的是大英帝国的武装双桅纵帆船！池子里正翻滚着白色的生石灰沸水！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '（脸色发白地摸了摸口袋）完了完了……手机一格信号都没有！那我的暑期研学报告、还有开学摸底考，是不是全泡汤了？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（抚摸着插在沙滩上的“钦差大臣林”大旗，热泪盈眶）长宽十五丈的化烟池……潮起注水，投盐化灰！这就是两百年前中华民族第一次向毒品亮剑的伟岸时刻！我们真的穿越回来了！',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '快看池畔浅滩！有几艘黑色快艇正冒死靠岸，十几个手持洋枪和弯刀的人正试图夺取化烟池边的鸦片箱！',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '滩头传来愤怒的短兵相接声，负责守池的虎门民团正浴血迎击！',
      buttonText: '【挺身而出 · 支援民团】',
      targetScene: 'ch15_scene_militia_stand'
    }
  },

  // s4: 【外敌突袭】民团死守 · 买办偷袭
  ch15_scene_militia_stand: {
    id: 'ch15_scene_militia_stand',
    title: '化烟巨池畔 · 浴血浅滩',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_humen_beach_1839@2x.png',
    bgm: 'bgm_intense_boss',
    dialogues: [
      {
        id: 1,
        speaker: '虎门民团教头',
        leftPortrait: 'assets/art/militia_instructor_1839@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '（手持销烟杖，浑身血迹却目光如电）番鬼兵与福寿堂的卖国走狗！林总督有令，化尽人间乌烟！尔等若想夺回一两烟土，先踏过老子这条命！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/militia_instructor_1839@2x.png',
        activeSide: 'left',
        text: '好一条响当当的汉子！不管是百年前还是百年后，老子这一身警服、满腔热血，最容不下的就是这帮祸国殃民的毒枭！教头，我们并肩杀敌！',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '全员集合！守住化烟池，绝不能让百年前的浩然正气被这帮小人糟蹋！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '燧发火枪喷射火星，异国武装水手与沈氏先祖买办死士嚎叫着扑向滩头！',
      buttonText: '【沙角血战 · 捍卫化烟池】',
      battleId: 'ch15_battle1',
      isBattleTrigger: true
    }
  },

  // s5: 【名臣赐物】林则徐亲临 · 浩然相赠
  ch15_scene_lin_commends: {
    id: 'ch15_scene_lin_commends',
    title: '销烟池畔 · 钦差大臣巡阅',
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
        text: '激战落幕，偷袭的武装快艇被尽数击沉或缴获，残敌仓皇逃窜。沙角海滩上三军雷动！一顶深蓝色官呢大轿在亲兵簇拥下肃然停在池畔，林则徐亲自迈步登台！',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（凝视着服饰奇异却正气凛然的众人，目光深邃而宽慰）少年人服饰奇特，非我朝装束，但方才于枪林弹雨中捍卫化烟池，其心之赤、其志之坚，老夫亲眼所见！尔等究竟自何处而来？',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        activeSide: 'left',
        text: '（深深鞠躬，一脸严肃）林总督！我们来自两百年后的和平中国！在我们的时代，山河锦绣、百姓安康，您当年播下的禁毒火种，已经变成守护亿万同胞的钢铁长城！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（眼眶泛红，望向苍茫南海，长叹而笑）两百年后……山河无恙，国无烟毒……善！大善！老夫此生无憾矣！',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '林则徐',
        leftPortrait: 'assets/art/lin_zexu_imperial_commissioner@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '这柄“浩然销烟杖”，就是老夫用岭南沉香木削成的一根长棍，浸过沸水和石灰，还带着千千万万百姓的浩然誓愿。听说你们那个时代还有旧毒没除干净，老夫就把这棍子送给后世的少年——拿着这份浩然正气，百毒不侵，什么妖魔鬼怪统统退散！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '林则徐亲手将赤红如玉的销烟杖交到少年掌心！',
      buttonText: '【手握正气 · 承接嘱托】',
      targetScene: 'ch15_scene_righteous_seal'
    }
  },

  // s6: 【共鸣重返】百年心印 · 时空回溯
  ch15_scene_righteous_seal: {
    id: 'ch15_scene_righteous_seal',
    title: '落日熔金 · 百年心印',
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
        text: '浩然销烟杖入手温润醇厚，表面缓缓浮现出暗金色的“浩然正气”微雕铭文。池中翻滚的滚滚白烟与金色的落日晚霞交相辉映，化作洗净世间一切黑暗的纯阳圣光！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '林公在上，后辈定不负嘱托！不管什么福寿堂沈万廷，这百年毒账，我们替您连本带利彻底清算！',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '浩然销烟杖爆发出冲天金芒，与虚空中扭曲的时空界限产生共鸣。虎门的潮声渐渐远去，化作璀璨的金色光瀑，裹挟着满载浩然正气的众人破空重返现代驳船！',
        highlight: true,
        sfx: 'sfx_suspense'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '时空金流平复，众人重新踏足于现代暴雨中破损的古运河驳船残骸之上！',
      buttonText: '【重返现代 · 开启第十七章】',
      targetScene: 'ch16_scene_return_ruins'
    }
  }
};
