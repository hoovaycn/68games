import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DialogueSystem } from '../src/systems/dialogue_system.js';

function createMockDialogueSystem() {
  const canvas = {
    width: 960,
    height: 540,
    getContext: () => ({
      measureText: (text) => ({ width: text.length * 22 }),
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      roundRect: () => {},
      fill: () => {},
      stroke: () => {},
      fillText: () => {}
    })
  };
  return new DialogueSystem(canvas, () => {});
}

test('3行以内的普通对话不额外分页，保持单页', () => {
  const ds = createMockDialogueSystem();
  const shortText = '这是一句普通的对白，字数并不多，可以很轻松地放在对话框里展示。';
  const pages = ds.paginateText(shortText, 3);
  assert.equal(pages.length, 1);
  assert.equal(pages[0], shortText);
});

test('支持显式断句标记：[next] 分段', () => {
  const ds = createMockDialogueSystem();
  const textWithNext = '第一段剧情交代[next]第二段重要情报[NEXT]第三段结论';
  const pages = ds.paginateText(textWithNext, 3);
  assert.equal(pages.length, 3);
  assert.equal(pages[0], '第一段剧情交代');
  assert.equal(pages[1], '第二段重要情报');
  assert.equal(pages[2], '第三段结论');
});

test('支持显式断句标记：竖线 | 分段', () => {
  const ds = createMockDialogueSystem();
  const textWithPipe = '海峰，快看前面！|那些暗哨把码头封死了。';
  const pages = ds.paginateText(textWithPipe, 3);
  assert.equal(pages.length, 2);
  assert.equal(pages[0], '海峰，快看前面！');
  assert.equal(pages[1], '那些暗哨把码头封死了。');
});

test('支持显式断句标记：双换行 \\n\\n 自然段落分段', () => {
  const ds = createMockDialogueSystem();
  const textWithBlankLine = '第一段话说完了，这里空一行。\n\n第二段话另起一页继续讲。';
  const pages = ds.paginateText(textWithBlankLine, 3);
  assert.equal(pages.length, 2);
  assert.equal(pages[0], '第一段话说完了，这里空一行。');
  assert.equal(pages[1], '第二段话另起一页继续讲。');
});

test('超过3行的超长文本自动兜底每3行切一页', () => {
  const ds = createMockDialogueSystem();
  // 构造 6 行文本（每行约 38 个字以上）
  const line = '这是一行很长很长很长很长很长很长很长很长很长很长的文本内容';
  const longText = `${line}1\n${line}2\n${line}3\n${line}4\n${line}5`;
  const pages = ds.paginateText(longText, 3);
  assert.equal(pages.length, 2);
  const p1Lines = pages[0].split('\n');
  const p2Lines = pages[1].split('\n');
  assert.equal(p1Lines.length, 3);
  assert.equal(p2Lines.length, 2);
});

test('多页台词交互：补全当前页 -> 翻到下一页 -> 补全下一页 -> 推进下一句', () => {
  let completed = false;
  const canvas = {
    width: 960,
    height: 540,
    getContext: () => ({
      measureText: (t) => ({ width: t.length * 22 }),
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      roundRect: () => {},
      fill: () => {},
      stroke: () => {},
      fillText: () => {}
    })
  };
  const ds = new DialogueSystem(canvas, () => { completed = true; });

  const testScene = {
    id: 'test_scene',
    dialogues: [
      {
        id: 1,
        speaker: '测试角色',
        text: '第一小节内容[next]第二小节内容'
      },
      {
        id: 2,
        speaker: '测试角色2',
        text: '第二句普通台词'
      }
    ]
  };

  ds.startScene(testScene);
  assert.equal(ds.dialogueIndex, 0);
  assert.equal(ds.pages.length, 2);
  assert.equal(ds.pageIndex, 0);
  assert.equal(ds.isLineComplete, false);

  // 1. 第一次按回车/空格：补全第一页
  ds.next();
  assert.equal(ds.isLineComplete, true);
  assert.equal(ds.displayedText, '第一小节内容');
  assert.equal(ds.dialogueIndex, 0);
  assert.equal(ds.pageIndex, 0);

  // 2. 第二次按回车/空格：翻到第 2 页，重置打字机
  ds.next();
  assert.equal(ds.pageIndex, 1);
  assert.equal(ds.dialogueIndex, 0);
  assert.equal(ds.isLineComplete, false);
  assert.equal(ds.displayedText, '');

  // 3. 第三次按回车/空格：补全第 2 页
  ds.next();
  assert.equal(ds.isLineComplete, true);
  assert.equal(ds.displayedText, '第二小节内容');
  assert.equal(ds.dialogueIndex, 0);
  assert.equal(ds.pageIndex, 1);

  // 4. 第四次按回车/空格：本句所有分页全部读完，正式切到下一句对白 (dialogueIndex = 1)
  ds.next();
  assert.equal(ds.dialogueIndex, 1);
  assert.equal(ds.pageIndex, 0);
  assert.equal(ds.pages.length, 1);
  assert.equal(ds.pages[0], '第二句普通台词');
});
