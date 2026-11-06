import fs from 'fs';
import path from 'path';

const actFiles = [
  'story_prologue.js',
  ...Array.from({length: 19}, (_, i) => `story_chapter${i+1}.js`),
  'story_humen_origin.js'
];

async function generateEmotionPlan() {
  const modifications = [];

  for (const file of actFiles) {
    const modPath = path.resolve('src/data', file);
    const mod = await import('file:///' + modPath.replace(/\\/g, '/'));
    const expKey = Object.keys(mod)[0];
    const storyObj = mod[expKey];

    const scenes = [];
    if (storyObj.male) {
      for (const [k, v] of Object.entries(storyObj.male)) {
        if (v && v.dialogues) scenes.push({ sceneKey: `male.${k}`, scene: v, rawKey: k, branch: 'male' });
      }
      for (const [k, v] of Object.entries(storyObj.female)) {
        if (v && v.dialogues) scenes.push({ sceneKey: `female.${k}`, scene: v, rawKey: k, branch: 'female' });
      }
    } else {
      for (const [k, v] of Object.entries(storyObj)) {
        if (v && v.dialogues) scenes.push({ sceneKey: k, scene: v, rawKey: k, branch: 'shared' });
      }
    }

    for (const sc of scenes) {
      const trans = sc.scene.transition || {};
      const isBattle = !!(trans.isBattleTrigger || trans.battleId || trans.type === 'BATTLE');
      const dialogues = sc.scene.dialogues || [];
      const total = dialogues.length;

      dialogues.forEach((d, idx) => {
        const isNearEnd = idx >= total - 3;
        const text = d.text || '';
        const speaker = d.speaker || '';

        // 辅助检测函数：对 portrait 做精准研判
        function evaluatePortrait(portrait, speakerRole, side) {
          if (!portrait || typeof portrait !== 'string') return null;

          // 保护性跳过特殊历史/CG立绘
          if (portrait.includes('_corrupted') || portrait.includes('_damaged') ||
              portrait.includes('adult_') || portrait.includes('_old') ||
              portrait.includes('young_') || portrait.includes('mystery_') ||
              portrait.includes('caseboard') || portrait.includes('lin_zexu')) {
            return null;
          }

          // 1. 主角宏替换
          if (portrait === '{MC_PORTRAIT}' || portrait === '{MC_SMILE_PORTRAIT}') {
            // 开战前/对峙/迎敌/喊口号 -> 绝不许微笑或平淡，必须 RESOLUTE
            if (isBattle || text.match(/(打|冲|拦住|休想|将军|活路|怪物|清澈|逼近|迎战|别挡道|交出来|决战|拳头|砸烂|撕碎|答不答应)/)) {
              return '{MC_RESOLUTE_PORTRAIT}';
            }
            if (text.match(/(震惊|怎么会|泛起青|血光|异化|怪物|惨叫|到底是谁|天啊|怎么变成这样|青黑凶光)/)) {
              return '{MC_SHOCK_PORTRAIT}';
            }
            if (text.match(/(六十二分|要是偷偷吃|考砸|害怕|自责|心疼|对不起)/)) {
              return '{MC_SAD_PORTRAIT}';
            }
          }

          // 2. 双线主角张子骁
          if (portrait.includes('zhangzixiao_')) {
            // 如果在战前场景且在迎战/喊话
            if (isBattle && (isNearEnd || text.match(/(别挡道|交出来|将军|打醒|迎战|拦住|冲|谁敢|不可)/))) {
              return 'assets/art/zhangzixiao_resolute@2x.png';
            }
            if (text.match(/(别挡道|快把解药交出来|这步棋，叫将军|我们打醒|休想|决战|拳头|砸烂)/)) {
              return 'assets/art/zhangzixiao_resolute@2x.png';
            }
            if (text.match(/(红光|草稿纸|异化|血色公式|什么情况|青黑凶光|瞪大眼睛|狂刷|通宵)/)) {
              return 'assets/art/zhangzixiao_shock@2x.png';
            }
            if (text.match(/(六十二分|要是偷偷吃|难过|害怕|自责)/)) {
              return 'assets/art/zhangzixiao_sad@2x.png';
            }
            // 严禁在战前笑
            if (portrait.includes('zhangzixiao_smile') && (isBattle || text.match(/(怪|危险|凶光|逼近)/))) {
              return 'assets/art/zhangzixiao_resolute@2x.png';
            }
          }

          // 3. 双线主角石予诺
          if (portrait.includes('shiyunuo_')) {
            if (isBattle && (isNearEnd || text.match(/(让开|救|活路|打醒|迎战|画不出来|休想|冲)/))) {
              return 'assets/art/shiyunuo_resolute@2x.png';
            }
            if (text.match(/(让开！我还要去救|没有我画不出来的活路|你捣的鬼吧|打败|决战)/)) {
              return 'assets/art/shiyunuo_resolute@2x.png';
            }
            if (text.match(/(怪音波|震碎|变成这样|青光|怎么可能|天啊)/)) {
              return 'assets/art/shiyunuo_shock@2x.png';
            }
            if (text.match(/(哭喊|反锁|生病|自责|难过)/)) {
              return 'assets/art/shiyunuo_tearful@2x.png';
            }
          }

          // 4. 副手宏 {ALLY_2_PORTRAIT}
          if (portrait === '{ALLY_2_PORTRAIT}') {
            if (isBattle || text.match(/(交出来|还给我们|人渣|老子|绝不|独一无二|不能离开|冲|杀)/)) {
              return '{ALLY_2_FURY_PORTRAIT}';
            }
            if (text.match(/(爸你醒醒|哭喊|不要扔下我|撕心裂肺)/)) {
              return '{ALLY_2_CRYING_PORTRAIT}';
            }
            if (text.match(/(异化|怎么回事|天啊|怎么会|发抖)/)) {
              return '{ALLY_2_PANIC_PORTRAIT}';
            }
          }

          // 5. 范文默
          if (portrait.includes('fanwenmo_')) {
            if (isBattle && text.match(/(打|救|冲|老子|绝不|算我一个)/)) {
              return 'assets/art/fanwenmo_fury@2x.png';
            }
            if (text.match(/(头痛|算式|尖叫|停不下来|动量守恒|抱头|发抖)/)) {
              return 'assets/art/fanwenmo_panic@2x.png';
            }
            if (text.match(/(痛哭|眼泪|悔恨|对不起)/)) {
              return 'assets/art/fanwenmo_crying@2x.png';
            }
          }

          // 6. 何妍熹
          if (portrait.includes('heyanxi_')) {
            if (isBattle || text.match(/(迎战|保护|绝不|长笛|交给我)/)) {
              return 'assets/art/heyanxi_resolute@2x.png';
            }
            if (text.match(/(震碎|怪声|青光|害怕)/)) {
              return 'assets/art/heyanxi_shock@2x.png';
            }
            if (text.match(/(别怕|没事了|温和|谢谢)/)) {
              return 'assets/art/heyanxi_gentle@2x.png';
            }
          }

          // 7. 覃瑞怡
          if (portrait.includes('qinruiyi_')) {
            if (text.match(/(虚假的第一名，我不要|我逃出来不是为了站在这儿|朱晏泽，别一个人往后退|谁要你用这种方式保护|切！张希哲你少得意|你把人吃成那样|绝不认输)/)) {
              return 'assets/art/qinruiyi_resolute@2x.png';
            }
            if (text.match(/(红了眼圈|哭|大笨蛋|害怕|救命|呜呜|被抓)/)) {
              return 'assets/art/qinruiyi_crying@2x.png';
            }
            if (text.match(/(破涕为笑|获救|谢谢你们|终于安全|松了一口气)/)) {
              return 'assets/art/qinruiyi_relieved@2x.png';
            }
          }

          // 8. 张希哲
          if (portrait.includes('zhangxizhe_')) {
            if (text.match(/(暴射入网|看我暴射|害了多少同学了你还敢坐这儿装大爷|老子平时在球场上|靠吃药算什么真本事|就凭你|哼)/)) {
              return 'assets/art/zhangxizhe_smirk@2x.png';
            }
            if (text.match(/(成年人的器械，胳膊会拉伤|拉伤|冷汗|沈崇礼每按一次阀门|腿都不听使唤|咬牙|强撑|好重)/)) {
              return 'assets/art/zhangxizhe_nervous@2x.png';
            }
          }

          // 9. 朱晏泽
          if (portrait.includes('zhuyanze_')) {
            if (text.match(/(听我指挥|少侮辱‘义气’|跟你们这种冷血木偶混在一起才叫真丢人|大伙抄家伙|部署|反攻|结阵)/)) {
              return 'assets/art/zhuyanze_command@2x.png';
            }
            if (text.match(/(它一拳就把栏杆打成这样|腿都不听使唤|怎么会|青光|天啊|怎么回事|作弊)/)) {
              return 'assets/art/zhuyanze_shock@2x.png';
            }
          }

          // 10. 徐老师
          if (portrait.includes('teacher_xu_') || portrait.includes('xu_laoshi_')) {
            if (text.match(/(住手！他们才六年级|都往后退|靠过来，别散|护好自己和队友|打通这道门|别回头|我们挡住|脸色异常凝重)/)) {
              return 'assets/art/teacher_xu_stern@2x.png';
            }
            if (text.match(/(咳咳……头好痛|旧教案|痛心|阿瑶|二十年前|伤口)/)) {
              return 'assets/art/teacher_xu_pain@2x.png';
            }
            if (text.match(/(好样的|别怕，老师在|平安就好|欣慰|微笑)/)) {
              return 'assets/art/teacher_xu_warm@2x.png';
            }
          }

          // 11. 刘老师
          if (portrait.includes('adult_liu_') || portrait.includes('liu_laoshi_')) {
            if (text.match(/(家长全退到后排|我们先把孩子打醒|谁都不许再喂第二口|记住——打醒他，别打伤他|我们留下挡住后面的援兵|握紧教鞭|护在身前)/)) {
              return 'assets/art/adult_liu_protective@2x.png';
            }
            if (text.match(/(心里的石头落下了|平安|释然|微笑着点头|一切都过去了)/)) {
              return 'assets/art/adult_liu_relieved@2x.png';
            }
          }

          // 12. 父亲海峰
          if (portrait.includes('father_haifeng_') && !portrait.includes('police_damaged')) {
            if (text.match(/(今天这道闸，我们非过不可|拦住水手|别让他们把罐子搬走|老子今天活剥了你们|看老子怎么把这帮孙子收拾干净|戒备|警惕|拔出|神兵天降)/)) {
              return 'assets/art/father_haifeng_alert@2x.png';
            }
            if (text.match(/(傻看什么！躲到老子背后|老爸是警察|我家孩子|奖状|心疼|摸了摸头)/)) {
              return 'assets/art/father_haifeng_loving@2x.png';
            }
          }

          return null;
        }

        const newLeft = evaluatePortrait(d.leftPortrait, speaker, 'left');
        const newRight = evaluatePortrait(d.rightPortrait, speaker, 'right');

        if ((newLeft && newLeft !== d.leftPortrait) || (newRight && newRight !== d.rightPortrait)) {
          modifications.push({
            file,
            sceneKey: sc.sceneKey,
            id: d.id,
            speaker,
            text: text.substring(0, 40),
            oldLeft: d.leftPortrait,
            newLeft: newLeft || d.leftPortrait,
            oldRight: d.rightPortrait,
            newRight: newRight || d.rightPortrait
          });
        }
      });
    }
  }

  console.log(`\n【表情升级规划】共有 ${modifications.length} 处对话节点匹配到全新细腻表情！\n`);
  for (const m of modifications.slice(0, 30)) {
    console.log(`[${m.file}] ${m.sceneKey} #${m.id} [${m.speaker}]`);
    if (m.newLeft !== m.oldLeft) console.log(`   Left:  ${m.oldLeft} -> ${m.newLeft}`);
    if (m.newRight !== m.oldRight) console.log(`   Right: ${m.oldRight} -> ${m.newRight}`);
    console.log(`   Text:  "${m.text}..."\n`);
  }

  fs.writeFileSync('scripts/emotion_plan.json', JSON.stringify(modifications, null, 2), 'utf8');
}

generateEmotionPlan();
