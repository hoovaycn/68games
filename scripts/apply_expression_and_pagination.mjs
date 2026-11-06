import fs from 'fs';
import path from 'path';

// 待处理的文件清单（序章、Ch1~Ch19、虎门外传）
const STORY_FILES = [
  'story_prologue.js',
  'story_chapter1.js',
  'story_chapter2.js',
  'story_chapter3.js',
  'story_chapter4.js',
  'story_chapter5.js',
  'story_chapter6.js',
  'story_chapter7.js',
  'story_chapter8.js',
  'story_chapter9.js',
  'story_chapter10.js',
  'story_chapter11.js',
  'story_chapter12.js',
  'story_chapter13.js',
  'story_chapter14.js',
  'story_chapter15.js',
  'story_chapter16.js',
  'story_chapter17.js',
  'story_chapter18.js',
  'story_chapter19.js',
  'story_humen_origin.js'
];

// 智能切分长台词（超过 50 字符切分）
export function paginateDialogueText(text) {
  if (!text || typeof text !== 'string') return text;

  const segments = text.split('[next]');
  const processedSegments = [];

  for (let seg of segments) {
    seg = seg.trim();
    if (seg.length <= 50) {
      processedSegments.push(seg);
      continue;
    }

    const subParts = splitLongSegment(seg);
    processedSegments.push(...subParts);
  }

  return processedSegments.join('[next]');
}

function splitLongSegment(seg) {
  if (seg.length <= 50) return [seg];

  // 1. 强标点优先（。 ！ ？ ； …… ...）
  const punctuationRegex = /([。！？；]|\.\.\.|……)/g;
  let match;
  let bestSplitIndex = -1;
  let bestDistance = Infinity;
  const target = Math.floor(seg.length / 2);

  while ((match = punctuationRegex.exec(seg)) !== null) {
    const splitPos = match.index + match[0].length;
    // 保证两端都有至少 14 字
    if (splitPos >= 16 && (seg.length - splitPos) >= 14) {
      const dist = Math.abs(splitPos - target);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestSplitIndex = splitPos;
      }
    }
  }

  if (bestSplitIndex !== -1) {
    const first = seg.slice(0, bestSplitIndex).trim();
    const second = seg.slice(bestSplitIndex).trim();
    return [...splitLongSegment(first), ...splitLongSegment(second)];
  }

  // 2. 次要标点（， 、 ） ）
  const commaRegex = /([，、）])/g;
  while ((match = commaRegex.exec(seg)) !== null) {
    const splitPos = match.index + match[0].length;
    if (splitPos >= 18 && (seg.length - splitPos) >= 14) {
      const dist = Math.abs(splitPos - target);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestSplitIndex = splitPos;
      }
    }
  }

  if (bestSplitIndex !== -1) {
    const first = seg.slice(0, bestSplitIndex).trim();
    const second = seg.slice(bestSplitIndex).trim();
    return [...splitLongSegment(first), ...splitLongSegment(second)];
  }

  // 3. 兜底逗号
  const anyCommaRegex = /([，,])/g;
  while ((match = anyCommaRegex.exec(seg)) !== null) {
    const splitPos = match.index + match[0].length;
    if (splitPos >= 12 && (seg.length - splitPos) >= 12) {
      const dist = Math.abs(splitPos - target);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestSplitIndex = splitPos;
      }
    }
  }

  if (bestSplitIndex !== -1) {
    const first = seg.slice(0, bestSplitIndex).trim();
    const second = seg.slice(bestSplitIndex).trim();
    return [...splitLongSegment(first), ...splitLongSegment(second)];
  }

  return [seg];
}

// 情绪立绘匹配
export function upgradePortrait(portrait, speaker, text, fileName) {
  if (!portrait || typeof portrait !== 'string') return portrait;

  // 严格保护测试中指定的特殊立绘
  if (portrait.includes('_damaged') ||
      portrait.includes('_corrupted') ||
      portrait.includes('_police@') ||
      portrait.includes('caseboard') ||
      portrait.includes('adult_') ||
      portrait.includes('_old') ||
      portrait.includes('mystery_man')) {
    return portrait;
  }

  const s = speaker || '';
  const t = text || '';

  // 1. 张希哲
  if (portrait.includes('zhangxizhe')) {
    if (/得意|哼|看我的|暴射|吹嘘|包在我身上|小菜一碟|本大爷|嘻嘻|看好了|别小看/.test(t)) {
      return 'assets/art/zhangxizhe_smirk@2x.png';
    }
    if (/冷汗|心虚|认怂|咽口水|老、老师|腿软|饶命|我错了|惨了|怪物|吃人|发抖|哆嗦/.test(t)) {
      return 'assets/art/zhangxizhe_nervous@2x.png';
    }
    return portrait;
  }

  // 2. 覃瑞怡
  if (portrait.includes('qinruiyi')) {
    if (/哇|哭|眼泪|抽泣|救命|害怕|不要过来|呜呜|委屈|救救我|怎么办|吓得/.test(t)) {
      return 'assets/art/qinruiyi_crying@2x.png';
    }
    if (/破涕为笑|吓死我了|得救了|擦掉眼泪|谢谢你们|嘻嘻|我就知道|太好了|松了一口气/.test(t)) {
      return 'assets/art/qinruiyi_relieved@2x.png';
    }
    return portrait;
  }

  // 3. 朱晏泽
  if (portrait.includes('zhuyanze')) {
    if (/怎么可能|这……|失控|愕然|不敢相信|大家小心！|天啊|怎么会这样|乱成一团/.test(t)) {
      return 'assets/art/zhuyanze_shock@2x.png';
    }
    if (/安静|整队|集合|听我口令|纪律|班委|报告老师|组织|列队|大家跟我来|别慌|站好/.test(t)) {
      return 'assets/art/zhuyanze_command@2x.png';
    }
    return portrait;
  }

  // 4. 徐老师
  if (portrait.includes('teacher_xu')) {
    if (/咳|剧痛|闷哼|伤口|撑不住|脸色煞白|撕裂|支撑不住|倒吸一口凉气/.test(t)) {
      return 'assets/art/teacher_xu_pain@2x.png';
    }
    if (/立正|住手|放开|严肃|规矩|戒尺|凝重|混账|护在身|退后|胡闹|成何体统|休得无礼/.test(t)) {
      return 'assets/art/teacher_xu_stern@2x.png';
    }
    if (/没事吧|辛苦|好样的|摸了摸|别怕|温柔|宽慰|笑了笑|夸赞|平安|有老师在|回家吧|好孩子/.test(t)) {
      return 'assets/art/teacher_xu_warm@2x.png';
    }
    return portrait;
  }

  // 5. 刘老师
  if (portrait.includes('adult_liu')) {
    if (/挡在|休想|敢动我的学生|护住|怒视|危险|后退|住手|绝不允许|冲着我来/.test(t)) {
      return 'assets/art/adult_liu_protective@2x.png';
    }
    if (/太好了|松了一口气|欣慰|平安无事|真棒|笑了|没事就好|眼角湿润|好样的/.test(t)) {
      return 'assets/art/adult_liu_relieved@2x.png';
    }
    return portrait;
  }

  // 6. 海峰警官（仅在非战损、非制服的特定普通台词上）
  if (portrait.includes('father_haifeng')) {
    if (/警戒|拔枪|别动|隐蔽|有埋伏|跟紧我|搜寻|警惕|四周|危险|痕迹|勘查|注意脚下/.test(t)) {
      return 'assets/art/father_haifeng_alert@2x.png';
    }
    if (/儿子|好样的|小兔崽子|哈哈|拍了拍|老爸|别怕有我|没事了|骄傲|笑了笑|闺女|好孩子/.test(t)) {
      return 'assets/art/father_haifeng_loving@2x.png';
    }
    return portrait;
  }

  // 7. 序章张子骁 / 石予诺 / 范文默 / 何妍熹
  if (portrait.includes('zhangzixiao')) {
    if (/？！|怎么会|电磁学|震惊|瞪大|异变|天呐|不可能|什么情况/.test(t)) {
      return 'assets/art/zhangzixiao_shock@2x.png';
    }
    if (/下定决心|截住|将军|决不能|交出来|咬牙|挺身|别挡道|快把解药/.test(t)) {
      return 'assets/art/zhangzixiao_resolute@2x.png';
    }
    if (/收工|棋王|放心|解决|打醒了/.test(t)) {
      return 'assets/art/zhangzixiao_smile@2x.png';
    }
    if (/难受|低头|自责|叹气|满分呢|六十二分|要是偷偷/.test(t)) {
      return 'assets/art/zhangzixiao_sad@2x.png';
    }
    return portrait;
  }

  if (portrait.includes('shiyunuo')) {
    if (/沉思|分析|线索|推理|奇怪|为什么|不合常理|不对劲|琢磨|规律/.test(t)) {
      return 'assets/art/shiyunuo_thinking@2x.png';
    }
    if (/？！|怎么可能|震惊|愕然|瞪大|什么？！|不可思议/.test(t)) {
      return 'assets/art/shiyunuo_shock@2x.png';
    }
    if (/下定决心|绝对不能|反驳|怒斥|住手|绝不放弃|活路|快停下/.test(t)) {
      return 'assets/art/shiyunuo_resolute@2x.png';
    }
    if (/泪|心痛|难过|动容|在流血啊|闺蜜/.test(t)) {
      return 'assets/art/shiyunuo_tearful@2x.png';
    }
    return portrait;
  }

  if (portrait.includes('fanwenmo')) {
    if (/混蛋|找死|敢动|冲了上去|怒吼|火冒三丈|揍|打死/.test(t)) {
      return 'assets/art/fanwenmo_fury@2x.png';
    }
    if (/汗|哆嗦|结巴|慌|怕|怎么回事|头痛|算式尖叫/.test(t)) {
      return 'assets/art/fanwenmo_panic@2x.png';
    }
    if (/哭|呜呜|爸|救我|眼泪|尖叫声……根本停不下来/.test(t)) {
      return 'assets/art/fanwenmo_crying@2x.png';
    }
    return portrait;
  }

  if (portrait.includes('heyanxi')) {
    if (/瞄准|别动|戒备|严肃|冷静|锁定|扣下|箭步/.test(t)) {
      return 'assets/art/heyanxi_resolute@2x.png';
    }
    if (/小心！|怎么会|震惊|吸了口冷气|天呐/.test(t)) {
      return 'assets/art/heyanxi_shock@2x.png';
    }
    if (/别怕|有我在|微笑|温和|安慰|清醒过来了|谢谢你们/.test(t)) {
      return 'assets/art/heyanxi_gentle@2x.png';
    }
    return portrait;
  }

  // 8. 宏占位符主角与副手（用于通用章节）
  if (portrait === '{MC_PORTRAIT}') {
    if (/？！|怎么可能|猛地一震|震惊|倒吸一口凉气|瞪大眼睛|不可置信|什么？！/.test(t)) {
      return '{MC_SHOCK_PORTRAIT}';
    }
    if (/我握紧|绝不|不能放弃|咬紧牙关|挺身而出|站出来|我怒道|休想！|冲上前|绝不退缩|正面迎上/.test(t)) {
      return '{MC_RESOLUTE_PORTRAIT}';
    }
    if (/沉思|推理|线索|不对劲|我琢磨着|难道说|细想一下|我仔细打量|背后必有/.test(t)) {
      return '{MC_THINKING_PORTRAIT}';
    }
    if (/松了一口气|笑了笑|我笑着说|没问题|包在我身上|太好了|放心吧/.test(t)) {
      return '{MC_SMILE_PORTRAIT}';
    }
    if (/低下头|心里一酸|眼眶泛红|自责|愧疚|难受|默默擦了擦|咬住下唇/.test(t)) {
      return '{MC_SAD_PORTRAIT}';
    }
  }

  if (portrait === '{ALLY_2_PORTRAIT}') {
    if (/混账|敢动|冲了过去|怒吼|气得满脸通红|找死|去死吧/.test(t)) {
      return '{ALLY_2_FURY_PORTRAIT}';
    }
    if (/吓得|发抖|结结巴巴|满头大汗|惊慌|退后两步|冷汗直流/.test(t)) {
      return '{ALLY_2_PANIC_PORTRAIT}';
    }
    if (/大哭|哇地一声|爸！|哭喊|眼泪止不住|呜呜/.test(t)) {
      return '{ALLY_2_CRYING_PORTRAIT}';
    }
    if (/别怕|交给我|轻声|安慰|递过纸巾|温和地/.test(t)) {
      return '{ALLY_2_GENTLE_PORTRAIT}';
    }
    if (/站定|瞄准|严肃|下定决心|我也绝不后退|蓄势待发/.test(t)) {
      return '{ALLY_2_RESOLUTE_PORTRAIT}';
    }
  }

  return portrait;
}

// 执行批量转换并输出统计
let totalPaginated = 0;
let totalPortraitsUpgraded = 0;

for (const fileName of STORY_FILES) {
  const filePath = path.join('e:/WorkBuddy/fx_game/src/data', fileName);
  let content = fs.readFileSync(filePath, 'utf8');

  // 我们使用正则匹配每一个对白对象块：
  // 匹配类似:
  // {
  //   id: 1,
  //   speaker: '...',
  //   leftPortrait: '...',
  //   rightPortrait: '...',
  //   activeSide: '...',
  //   text: '...',
  //   ...
  // }
  // 由于 JS 对象代码结构统一，我们针对每个 dialogue 项进行精细字段解析与重构

  const dialogueBlockRegex = /\{[^{}]*?id:\s*\d+[^{}]*?text:\s*('[^']*?'|"[^"]*?")[^{}]*?\}/gs;

  let filePaginated = 0;
  let filePortraits = 0;

  content = content.replace(dialogueBlockRegex, (block) => {
    let newBlock = block;

    // 提取 speaker
    const speakerMatch = /speaker:\s*('[^']*?'|"[^"]*?")/.exec(block);
    const speaker = speakerMatch ? speakerMatch[1].slice(1, -1) : '';

    // 提取 text
    const textMatch = /text:\s*('([^']*)'|"([^"]*)")/.exec(block);
    if (!textMatch) return block;

    const rawQuote = textMatch[1][0]; // ' or "
    const oldText = textMatch[2] !== undefined ? textMatch[2] : textMatch[3];

    // 处理 [next] 分页
    const newText = paginateDialogueText(oldText);
    if (newText !== oldText) {
      newBlock = newBlock.replace(`text: ${rawQuote}${oldText}${rawQuote}`, `text: ${rawQuote}${newText}${rawQuote}`);
      filePaginated++;
    }

    // 提取 leftPortrait 和 rightPortrait
    const leftMatch = /leftPortrait:\s*('[^']*?'|"[^"]*?"|\w+)/.exec(block);
    const rightMatch = /rightPortrait:\s*('[^']*?'|"[^"]*?"|\w+)/.exec(block);

    if (leftMatch) {
      const oldLeft = leftMatch[1].replace(/['"]/g, '');
      const newLeft = upgradePortrait(oldLeft, speaker, newText, fileName);
      if (newLeft !== oldLeft) {
        newBlock = newBlock.replace(`leftPortrait: ${leftMatch[1]}`, `leftPortrait: '${newLeft}'`);
        filePortraits++;
      }
    }

    if (rightMatch) {
      const oldRight = rightMatch[1].replace(/['"]/g, '');
      const newRight = upgradePortrait(oldRight, speaker, newText, fileName);
      if (newRight !== oldRight) {
        newBlock = newBlock.replace(`rightPortrait: ${rightMatch[1]}`, `rightPortrait: '${newRight}'`);
        filePortraits++;
      }
    }

    return newBlock;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[${fileName}] -> 分页调整: ${filePaginated} 处, 表情升级: ${filePortraits} 处`);
  totalPaginated += filePaginated;
  totalPortraitsUpgraded += filePortraits;
}

console.log(`\n🎉 全量处理完成！共完成 ${totalPaginated} 处台词分页断句，${totalPortraitsUpgraded} 处立绘表情差分升级！`);
