import fs from 'fs';
import path from 'path';

/**
 * 第一幕与第二幕长句 [next] 分页与情绪立绘表情升级脚本
 */

// 1. 智能台词分页切分
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

  // 优先级 1：句末主标点（。 ！ ？ ； …… ...）
  const punctuationRegex = /([。！？；]|\.\.\.|……)/g;
  let match;
  let bestSplitIndex = -1;
  let bestDistance = Infinity;
  const target = Math.floor(seg.length / 2);

  while ((match = punctuationRegex.exec(seg)) !== null) {
    const splitPos = match.index + match[0].length;
    // 保证分割出来的两部分长度都在合理范围（两端至少 15 字）
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

  // 优先级 2：从句/次要标点（， 、 ） ）
  const commaRegex = /([，、）])/g;
  while ((match = commaRegex.exec(seg)) !== null) {
    const splitPos = match.index + match[0].length;
    if (splitPos >= 18 && (seg.length - splitPos) >= 15) {
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

  // 如果找不到合适标点且特别长（> 60），寻找任意逗号或空格
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

// 2. 根据对白情境匹配角色立绘表情差分
export function resolvePortraitExpression(speaker, text, currentPortrait, isLeft, line) {
  if (!currentPortrait || typeof currentPortrait !== 'string') return currentPortrait;

  // 保护已有特殊立绘，如 police_damaged, battle_damaged, corrupted, police, adult, old 等，不误替换
  if (currentPortrait.includes('_damaged') ||
      currentPortrait.includes('_corrupted') ||
      currentPortrait.includes('_police@') ||
      currentPortrait.includes('caseboard') ||
      currentPortrait.includes('adult_') ||
      currentPortrait.includes('_old')) {
    return currentPortrait;
  }

  const s = speaker || '';
  const t = text || '';

  // 1) 徐老师 (teacher_xu)
  if (currentPortrait.includes('teacher_xu') || s.includes('徐老师')) {
    if (t.includes('咳') || t.includes('剧痛') || t.includes('闷哼') || t.includes('伤口') || t.includes('撑不住') || t.includes('脸色煞白')) {
      return 'assets/art/teacher_xu_pain@2x.png';
    }
    if (t.includes('立正') || t.includes('住手') || t.includes('放开') || t.includes('严肃') || t.includes('规矩') || t.includes('戒尺') || t.includes('严肃') || t.includes('凝重') || t.includes('混账') || t.includes('护在身') || t.includes('退后')) {
      return 'assets/art/teacher_xu_stern@2x.png';
    }
    if (t.includes('没事吧') || t.includes('辛苦') || t.includes('好样的') || t.includes('摸了摸') || t.includes('别怕') || t.includes('温柔') || t.includes('宽慰') || t.includes('笑了笑') || t.includes('夸赞') || t.includes('平安')) {
      return 'assets/art/teacher_xu_warm@2x.png';
    }
    return currentPortrait;
  }

  // 2) 刘老师 (adult_liu)
  if (currentPortrait.includes('adult_liu') || s.includes('刘老师')) {
    if (t.includes('挡在') || t.includes('休想') || t.includes('敢动我的学生') || t.includes('护住') || t.includes('怒视') || t.includes('危险') || t.includes('后退') || t.includes('住手')) {
      return 'assets/art/adult_liu_protective@2x.png';
    }
    if (t.includes('太好了') || t.includes('松了一口气') || t.includes('欣慰') || t.includes('平安无事') || t.includes('真棒') || t.includes('笑了')) {
      return 'assets/art/adult_liu_relieved@2x.png';
    }
    return currentPortrait;
  }

  // 3) 张希哲 (zhangxizhe)
  if (currentPortrait.includes('zhangxizhe') || s.includes('张希哲')) {
    if (t.includes('得意') || t.includes('哼') || t.includes('看我的') || t.includes('暴射') || t.includes('吹嘘') || t.includes('包在我身上') || t.includes('小菜一碟') || t.includes('本大爷') || t.includes('嘻嘻') || t.includes('怕了吧')) {
      return 'assets/art/zhangxizhe_smirk@2x.png';
    }
    if (t.includes('冷汗') || t.includes('心虚') || t.includes('认怂') || t.includes('咽口水') || t.includes('老、老师') || t.includes('腿软') || t.includes('饶命') || t.includes('我错了') || t.includes('惨了') || t.includes('怪物')) {
      return 'assets/art/zhangxizhe_nervous@2x.png';
    }
    return currentPortrait;
  }

  // 4) 覃瑞怡 (qinruiyi)
  if (currentPortrait.includes('qinruiyi') || s.includes('覃瑞怡')) {
    if (t.includes('哇') || t.includes('哭') || t.includes('眼泪') || t.includes('抽泣') || t.includes('救命') || t.includes('害怕') || t.includes('不要过来') || t.includes('呜呜') || t.includes('委屈')) {
      return 'assets/art/qinruiyi_crying@2x.png';
    }
    if (t.includes('破涕为笑') || t.includes('吓死我了') || t.includes('得救了') || t.includes('擦掉眼泪') || t.includes('谢谢你们') || t.includes('嘻嘻') || t.includes('我就知道你们会来')) {
      return 'assets/art/qinruiyi_relieved@2x.png';
    }
    return currentPortrait;
  }

  // 5) 朱晏泽 (zhuyanze)
  if (currentPortrait.includes('zhuyanze') || s.includes('朱晏泽')) {
    if (t.includes('怎么可能') || t.includes('这……') || t.includes('失控') || t.includes('愕然') || t.includes('不敢相信') || t.includes('大家小心！') || t.includes('天啊')) {
      return 'assets/art/zhuyanze_shock@2x.png';
    }
    if (t.includes('安静') || t.includes('整队') || t.includes('集合') || t.includes('听我口令') || t.includes('纪律') || t.includes('班委') || t.includes('报告老师') || t.includes('组织') || t.includes('列队') || t.includes('大家跟我来')) {
      return 'assets/art/zhuyanze_command@2x.png';
    }
    return currentPortrait;
  }

  // 6) 海峰警官 (father_haifeng)
  if (currentPortrait.includes('father_haifeng') || s.includes('海峰')) {
    if (t.includes('警戒') || t.includes('拔枪') || t.includes('别动') || t.includes('隐蔽') || t.includes('有埋伏') || t.includes('跟紧我') || t.includes('搜寻') || t.includes('警惕') || t.includes('四周') || t.includes('危险')) {
      return 'assets/art/father_haifeng_alert@2x.png';
    }
    if (t.includes('儿子') || t.includes('好样的') || t.includes('小兔崽子') || t.includes('哈哈') || t.includes('拍了拍') || t.includes('老爸') || t.includes('别怕有我') || t.includes('没事了') || t.includes('骄傲') || t.includes('笑了笑')) {
      return 'assets/art/father_haifeng_loving@2x.png';
    }
    return currentPortrait;
  }

  // 7) 序章特定：张子骁 / 石予诺 / 范文默 / 何妍熹
  if (currentPortrait.includes('zhangzixiao')) {
    if (t.includes('？！') || t.includes('怎么会') || t.includes('电磁学') || t.includes('震惊') || t.includes('瞪大') || t.includes('异变')) {
      return 'assets/art/zhangzixiao_shock@2x.png';
    }
    if (t.includes('下定决心') || t.includes('截住') || t.includes('将军') || t.includes('决不能') || t.includes('交出来') || t.includes('咬牙') || t.includes('挺身')) {
      return 'assets/art/zhangzixiao_resolute@2x.png';
    }
    if (t.includes('收工') || t.includes('笑') || t.includes('棋王') || t.includes('放心')) {
      return 'assets/art/zhangzixiao_smile@2x.png';
    }
    if (t.includes('难受') || t.includes('低头') || t.includes('自责') || t.includes('叹气')) {
      return 'assets/art/zhangzixiao_sad@2x.png';
    }
    return currentPortrait;
  }

  if (currentPortrait.includes('shiyunuo')) {
    if (t.includes('沉思') || t.includes('分析') || t.includes('线索') || t.includes('推理') || t.includes('奇怪') || t.includes('为什么') || t.includes('不合常理')) {
      return 'assets/art/shiyunuo_thinking@2x.png';
    }
    if (t.includes('？！') || t.includes('怎么可能') || t.includes('震惊') || t.includes('愕然') || t.includes('瞪大')) {
      return 'assets/art/shiyunuo_shock@2x.png';
    }
    if (t.includes('下定决心') || t.includes('绝对不能') || t.includes('反驳') || t.includes('怒斥') || t.includes('住手') || t.includes('绝不放弃')) {
      return 'assets/art/shiyunuo_resolute@2x.png';
    }
    if (t.includes('泪') || t.includes('心痛') || t.includes('难过') || t.includes('动容')) {
      return 'assets/art/shiyunuo_tearful@2x.png';
    }
    return currentPortrait;
  }

  if (currentPortrait.includes('fanwenmo')) {
    if (t.includes('混蛋') || t.includes('找死') || t.includes('敢动') || t.includes('冲了上去') || t.includes('怒吼') || t.includes('火冒三丈') || t.includes('揍')) {
      return 'assets/art/fanwenmo_fury@2x.png';
    }
    if (t.includes('汗') || t.includes('哆嗦') || t.includes('结巴') || t.includes('慌') || t.includes('怕') || t.includes('怎么回事') || t.includes('头痛')) {
      return 'assets/art/fanwenmo_panic@2x.png';
    }
    if (t.includes('哭') || t.includes('呜呜') || t.includes('爸') || t.includes('救我') || t.includes('眼泪')) {
      return 'assets/art/fanwenmo_crying@2x.png';
    }
    return currentPortrait;
  }

  if (currentPortrait.includes('heyanxi')) {
    if (t.includes('瞄准') || t.includes('别动') || t.includes('戒备') || t.includes('严肃') || t.includes('冷静') || t.includes('锁定')) {
      return 'assets/art/heyanxi_resolute@2x.png';
    }
    if (t.includes('小心！') || t.includes('怎么会') || t.includes('震惊') || t.includes('吸了口冷气')) {
      return 'assets/art/heyanxi_shock@2x.png';
    }
    if (t.includes('别怕') || t.includes('有我在') || t.includes('微笑') || t.includes('温和') || t.includes('安慰')) {
      return 'assets/art/heyanxi_gentle@2x.png';
    }
    return currentPortrait;
  }

  // 8) 宏占位符主角与副手
  if (currentPortrait === '{MC_PORTRAIT}') {
    if (t.includes('？！') || t.includes('怎么可能') || t.includes('猛地一震') || t.includes('震惊') || t.includes('倒吸一口凉气') || t.includes('瞪大眼睛')) {
      return '{MC_SHOCK_PORTRAIT}';
    }
    if (t.includes('我握紧') || t.includes('绝不') || t.includes('不能放弃') || t.includes('咬紧牙关') || t.includes('挺身而出') || t.includes('站出来') || t.includes('我怒道') || t.includes('休想！') || t.includes('冲上前')) {
      return '{MC_RESOLUTE_PORTRAIT}';
    }
    if (t.includes('沉思') || t.includes('推理') || t.includes('线索') || t.includes('不对劲') || t.includes('我琢磨着') || t.includes('难道说') || t.includes('细想一下')) {
      return '{MC_THINKING_PORTRAIT}';
    }
    if (t.includes('松了一口气') || t.includes('笑了笑') || t.includes('我笑着说') || t.includes('没问题') || t.includes('包在我身上') || t.includes('太好了')) {
      return '{MC_SMILE_PORTRAIT}';
    }
    if (t.includes('低下头') || t.includes('心里一酸') || t.includes('眼眶泛红') || t.includes('自责') || t.includes('愧疚') || t.includes('难受')) {
      return '{MC_SAD_PORTRAIT}';
    }
  }

  if (currentPortrait === '{ALLY_2_PORTRAIT}') {
    if (t.includes('混账') || t.includes('敢动') || t.includes('冲了过去') || t.includes('怒吼') || t.includes('气得满脸通红') || t.includes('找死')) {
      return '{ALLY_2_FURY_PORTRAIT}';
    }
    if (t.includes('吓得') || t.includes('发抖') || t.includes('结结巴巴') || t.includes('满头大汗') || t.includes('惊慌') || t.includes('退后两步')) {
      return '{ALLY_2_PANIC_PORTRAIT}';
    }
    if (t.includes('大哭') || t.includes('哇地一声') || t.includes('爸！') || t.includes('哭喊') || t.includes('眼泪止不住')) {
      return '{ALLY_2_CRYING_PORTRAIT}';
    }
    if (t.includes('别怕') || t.includes('交给我') || t.includes('轻声') || t.includes('安慰') || t.includes('递过纸巾')) {
      return '{ALLY_2_GENTLE_PORTRAIT}';
    }
    if (t.includes('站定') || t.includes('瞄准') || t.includes('严肃') || t.includes('下定决心') || t.includes('我也绝不后退')) {
      return '{ALLY_2_RESOLUTE_PORTRAIT}';
    }
  }

  return currentPortrait;
}

console.log('Dialogue pagination and portrait resolver ready.');
