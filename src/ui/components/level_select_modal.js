import { sound } from '../../engine/sound.js';

/**
 * 选关菜单模态组件 (F1 快捷呼出)
 * 用于开发测试阶段快速跳转 1~20 全章节剧情与关卡。
 *
 * 视觉风格与游戏统一（黑金科技玄幻/半透明毛玻璃底板、琥珀金边框、高亮选中态）。
 * 左栏显示第一幕（第1章~第10章），右栏显示第二幕（第11章~第20章）。
 */
export class LevelSelectModal {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config || {};
    this.onSelect = this.config.onSelect || null;
    this.onClose = this.config.onClose || null;

    // 20 个章节完整信息
    this.chapters = [
      // 第一幕
      { num: 1, act: 1, label: '序章', title: '失踪同学的异变', sceneKey: 'scene_classroom' },
      { num: 2, act: 1, label: '第2章', title: '操场上来的人', sceneKey: 'ch1_scene_playground' },
      { num: 3, act: 1, label: '第3章', title: '谁是下一个', sceneKey: 'ch2_scene_auditorium' },
      { num: 4, act: 1, label: '第4章', title: '她是谁', sceneKey: 'ch3_scene_exhibition' },
      { num: 5, act: 1, label: '第5章', title: '全国第一', sceneKey: 'ch4_scene_team_meeting' },
      { num: 6, act: 1, label: '第6章', title: '家长会', sceneKey: 'ch5_scene_parent_meeting' },
      { num: 7, act: 1, label: '第7章', title: '大溃败', sceneKey: 'ch6_scene_corridor' },
      { num: 8, act: 1, label: '第8章', title: '从前那一班 · 上', sceneKey: 'ch7_scene_flashback' },
      { num: 9, act: 1, label: '第9章', title: '从前那一班 · 下', sceneKey: 'ch8_scene_warehouse' },
      { num: 10, act: 1, label: '第10章', title: '大考', sceneKey: 'ch9_scene_exam' },
      // 第二幕
      { num: 11, act: 2, label: '第11章', title: '博物馆惊魂', sceneKey: 'ch10_scene_museum_meet' },
      { num: 12, act: 2, label: '第12章', title: '烂人老爸', sceneKey: 'ch11_scene_slum_street' },
      { num: 13, act: 2, label: '第13章', title: '夜袭汽修厂', sceneKey: 'ch12_scene_night_ambush' },
      { num: 14, act: 2, label: '第14章', title: '避难所疑云', sceneKey: 'ch13_scene_safahouse' },
      { num: 15, act: 2, label: '第15章', title: '海魂回响', sceneKey: 'ch14_scene_dock_ritual' },
      { num: 16, act: 2, label: '第16章', title: '浩然正气', sceneKey: 'ch15_scene_time_passage' },
      { num: 17, act: 2, label: '第17章', title: '破碎的奖状', sceneKey: 'ch16_scene_return_ruins' },
      { num: 18, act: 2, label: '第18章', title: '孤注一掷', sceneKey: 'ch17_scene_alter_breach' },
      { num: 19, act: 2, label: '第19章', title: '逆行攻坚', sceneKey: 'ch18_scene_warehouse_breach' },
      { num: 20, act: 2, label: '第20章', title: '破晓钟声', sceneKey: 'ch19_scene_final_stand' }
    ];

    this.focusIndex = 0;
    this.itemRects = [];
    this.closeBtnRect = null;
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' || e.code === 'F1') {
      e.preventDefault();
      sound.playSfx('sfx_cancel');
      if (this.onClose) this.onClose();
      return;
    }

    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      e.preventDefault();
      // 上移：如果当前在某列顶部，循环到该列底部
      if (this.focusIndex === 0) {
        this.focusIndex = 9;
      } else if (this.focusIndex === 10) {
        this.focusIndex = 19;
      } else {
        this.focusIndex--;
      }
      sound.playSfx('sfx_cursor');
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      // 下移：如果当前在某列底部，循环到该列顶部
      if (this.focusIndex === 9) {
        this.focusIndex = 0;
      } else if (this.focusIndex === 19) {
        this.focusIndex = 10;
      } else {
        this.focusIndex++;
      }
      sound.playSfx('sfx_cursor');
      return;
    }

    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      e.preventDefault();
      if (this.focusIndex >= 10) {
        this.focusIndex -= 10;
        sound.playSfx('sfx_cursor');
      }
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      e.preventDefault();
      if (this.focusIndex < 10) {
        this.focusIndex += 10;
        sound.playSfx('sfx_cursor');
      }
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.confirmSelection();
    }
  }

  handleMouseMove(mouseX, mouseY) {
    for (let i = 0; i < this.itemRects.length; i++) {
      const r = this.itemRects[i];
      if (r && mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
        if (this.focusIndex !== i) {
          this.focusIndex = i;
          sound.playSfx('sfx_cursor');
        }
        return;
      }
    }
  }

  handleClick(clickX, clickY) {
    // 检查是否点击关闭按钮
    if (this.closeBtnRect) {
      const cb = this.closeBtnRect;
      if (clickX >= cb.x && clickX <= cb.x + cb.w && clickY >= cb.y && clickY <= cb.y + cb.h) {
        sound.playSfx('sfx_cancel');
        if (this.onClose) this.onClose();
        return;
      }
    }

    // 检查是否点击各章节项目
    for (let i = 0; i < this.itemRects.length; i++) {
      const r = this.itemRects[i];
      if (r && clickX >= r.x && clickX <= r.x + r.w && clickY >= r.y && clickY <= r.y + r.h) {
        this.focusIndex = i;
        this.confirmSelection();
        return;
      }
    }

    // 点击模态框外部遮罩区域时关闭
    const modalX = (this.canvas.width - 840) / 2;
    const modalY = (this.canvas.height - 480) / 2;
    if (clickX < modalX || clickX > modalX + 840 || clickY < modalY || clickY > modalY + 480) {
      sound.playSfx('sfx_cancel');
      if (this.onClose) this.onClose();
    }
  }

  confirmSelection() {
    const item = this.chapters[this.focusIndex];
    if (!item) return;
    sound.playSfx('sfx_confirm');
    if (this.onSelect) {
      this.onSelect(item.num, item);
    }
  }

  render() {
    const ctx = this.ctx;
    const cw = this.canvas.width;
    const ch = this.canvas.height;

    ctx.save();

    // 1. 全屏深色半透明遮罩
    ctx.fillStyle = 'rgba(0, 0, 0, 0.78)';
    ctx.fillRect(0, 0, cw, ch);

    // 2. 主模态框居中
    const modalW = 840;
    const modalH = 480;
    const modalX = Math.round((cw - modalW) / 2);
    const modalY = Math.round((ch - modalH) / 2);

    // 面板背景
    ctx.fillStyle = '#1c1917'; // 暖石深黑
    ctx.beginPath();
    ctx.roundRect(modalX, modalY, modalW, modalH, 10);
    ctx.fill();

    // 双重边框（高亮黑金饰边）
    ctx.strokeStyle = '#d97706'; // 琥珀橙
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.strokeStyle = '#fef3c7'; // 浅金内描边
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(modalX + 4, modalY + 4, modalW - 8, modalH - 8, 8);
    ctx.stroke();

    // 顶部标题栏背景
    ctx.fillStyle = '#292524';
    ctx.beginPath();
    ctx.roundRect(modalX + 4, modalY + 4, modalW - 8, 48, [8, 8, 0, 0]);
    ctx.fill();

    // 标题文本
    ctx.fillStyle = '#fbbf24'; // 明亮金黄
    ctx.font = 'bold 20px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚡ 快速选关菜单 (测试秘籍 F1)', modalX + 22, modalY + 28);

    // 右上角关闭提示与按钮
    const closeW = 90;
    const closeH = 28;
    const closeX = modalX + modalW - closeW - 16;
    const closeY = modalY + 14;
    this.closeBtnRect = { x: closeX, y: closeY, w: closeW, h: closeH };

    ctx.fillStyle = '#44403c';
    ctx.beginPath();
    ctx.roundRect(closeX, closeY, closeW, closeH, 4);
    ctx.fill();
    ctx.strokeStyle = '#78716c';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#e7e5e4';
    ctx.font = '12px "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Esc / 关闭', closeX + closeW / 2, closeY + closeH / 2);

    // 3. 两栏布局
    const colW = 388;
    const colH = 345;
    const col1X = modalX + 24;
    const col2X = modalX + modalW - colW - 24;
    const colY = modalY + 62;

    // 两栏表头
    const drawColHeader = (x, title, sub) => {
      ctx.fillStyle = '#292524';
      ctx.beginPath();
      ctx.roundRect(x, colY, colW, 30, 4);
      ctx.fill();
      ctx.strokeStyle = '#44403c';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#fde68a';
      ctx.font = 'bold 14px "PingFang SC", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(title, x + 12, colY + 15);

      ctx.fillStyle = '#a8a29e';
      ctx.font = '12px "PingFang SC", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(sub, x + colW - 12, colY + 15);
    };

    drawColHeader(col1X, '第一幕 · 校园迷雾', '第 1 ~ 10 章');
    drawColHeader(col2X, '第二幕 · 硝烟重燃', '第 11 ~ 20 章');

    // 渲染两个栏目中的 10 个章节项
    this.itemRects = [];
    const itemStartY = colY + 36;
    const itemH = 28;
    const itemGap = 3;

    for (let i = 0; i < 20; i++) {
      const chItem = this.chapters[i];
      const isCol2 = i >= 10;
      const colX = isCol2 ? col2X : col1X;
      const rowIdx = isCol2 ? (i - 10) : i;
      const iy = itemStartY + rowIdx * (itemH + itemGap);

      const rect = { x: colX, y: iy, w: colW, h: itemH };
      this.itemRects[i] = rect;

      const isFocused = this.focusIndex === i;

      // 背景
      if (isFocused) {
        ctx.fillStyle = 'rgba(217, 119, 6, 0.35)'; // 琥珀金高亮
        ctx.beginPath();
        ctx.roundRect(rect.x, rect.y, rect.w, rect.h, 4);
        ctx.fill();
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else {
        ctx.fillStyle = (rowIdx % 2 === 0) ? '#24201e' : '#1c1917';
        ctx.beginPath();
        ctx.roundRect(rect.x, rect.y, rect.w, rect.h, 4);
        ctx.fill();
        ctx.strokeStyle = '#38332f';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 编号标牌
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      if (isFocused) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 13px "PingFang SC", sans-serif';
        ctx.fillText(`▶ ${chItem.label}`, rect.x + 8, rect.y + itemH / 2);
      } else {
        ctx.fillStyle = '#d6d3d1';
        ctx.font = '12px "PingFang SC", sans-serif';
        ctx.fillText(`  ${chItem.label}`, rect.x + 8, rect.y + itemH / 2);
      }

      // 章节标题
      ctx.textAlign = 'left';
      ctx.fillStyle = isFocused ? '#ffffff' : '#a8a29e';
      ctx.font = isFocused ? 'bold 13px "PingFang SC", sans-serif' : '13px "PingFang SC", sans-serif';
      ctx.fillText(chItem.title, rect.x + 75, rect.y + itemH / 2);

      // 右侧动作提示
      if (isFocused) {
        ctx.fillStyle = '#fde68a';
        ctx.font = '11px "PingFang SC", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('回车跳转 ↵', rect.x + rect.w - 10, rect.y + itemH / 2);
      }
    }

    // 4. 底部说明提示栏
    const footerY = modalY + modalH - 30;
    ctx.fillStyle = '#78716c';
    ctx.font = '12px "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('操作指南：↑↓ / WS 移动 | ←→ / AD 切换篇幕 | Enter / 鼠标点击 确认跳转 | F1 / Esc 关闭', modalX + modalW / 2, footerY);

    ctx.restore();
  }
}
