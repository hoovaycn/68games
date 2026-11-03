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
      { num: 11, act: 2, label: '第11章', title: '博物馆里的罐子', sceneKey: 'ch10_scene_museum_meet' },
      { num: 12, act: 2, label: '第12章', title: '烂人老爸', sceneKey: 'ch11_scene_slum_street' },
      { num: 13, act: 2, label: '第13章', title: '汽修厂的后仓', sceneKey: 'ch12_scene_night_ambush' },
      { num: 14, act: 2, label: '第14章', title: '照片上的人', sceneKey: 'ch13_scene_safahouse' },
      { num: 15, act: 2, label: '第15章', title: '罐子碎了', sceneKey: 'ch14_scene_dock_ritual' },
      { num: 16, act: 2, label: '第16章', title: '我们穿越了', sceneKey: 'ch15_scene_time_passage' },
      { num: 17, act: 2, label: '第17章', title: '福寿堂留下的罐子', sceneKey: 'ch15b_scene_missing_jar' },
      { num: 18, act: 2, label: '第18章', title: '班长去哪了', sceneKey: 'ch16_scene_return_ruins' },
      { num: 19, act: 2, label: '第19章', title: '去救覃瑞怡', sceneKey: 'ch17_scene_alter_breach' },
      { num: 20, act: 2, label: '第20章', title: '钟楼里的最后一战', sceneKey: 'ch19_scene_final_stand' },
      // 第三幕
      { num: 21, act: 3, label: '第21章', title: '神医的茶香', sceneKey: 'ch21_scene_clinic_warmth' },
      { num: 22, act: 3, label: '第22章', title: '未来警徽', sceneKey: 'ch22_scene_pier_confrontation' },
      { num: 23, act: 3, label: '第23章', title: '夺舍真相', sceneKey: 'ch23_scene_counseling_breakin' },
      { num: 24, act: 3, label: '第24章', title: '钢铁废墟', sceneKey: 'ch24_scene_ruins_arrival' },
      { num: 25, act: 3, label: '第25章', title: '时空重逢', sceneKey: 'ch25_scene_shelter_arrival' },
      { num: 26, act: 3, label: '第26章', title: '最后的考场', sceneKey: 'ch26_scene_pyramid_ascent' },
      { num: 27, act: 3, label: '第27章', title: '熔炉抉择', sceneKey: 'ch27_scene_reactor_run' },
      { num: 28, act: 3, label: '第28章', title: '倒流的挽歌', sceneKey: 'ch28_scene_return_2026' },
      { num: 29, act: 3, label: '第29章', title: '求死的神明', sceneKey: 'ch29_scene_throne_reveal' },
      { num: 30, act: 3, label: '第30章', title: '跨越百年的毕业礼', sceneKey: 'ch30_scene_snack_crush' }
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
      if (this.focusIndex % 10 === 0) {
        this.focusIndex += 9;
      } else {
        this.focusIndex--;
      }
      sound.playSfx('sfx_cursor');
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      // 下移：如果当前在某列底部，循环到该列顶部
      if (this.focusIndex % 10 === 9) {
        this.focusIndex -= 9;
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
      } else {
        this.focusIndex += 20;
      }
      sound.playSfx('sfx_cursor');
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      e.preventDefault();
      if (this.focusIndex + 10 < this.chapters.length) {
        this.focusIndex += 10;
      } else {
        this.focusIndex -= 20;
      }
      sound.playSfx('sfx_cursor');
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
    const modalW = 900;
    const modalH = 480;
    const modalX = (this.canvas.width - modalW) / 2;
    const modalY = (this.canvas.height - modalH) / 2;
    if (clickX < modalX || clickX > modalX + modalW || clickY < modalY || clickY > modalY + modalH) {
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

    // 2. 主模态框居中 (910 x 480)
    const modalW = 910;
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
    ctx.roundRect(modalX + 4, modalY + 4, modalW - 8, 44, [8, 8, 0, 0]);
    ctx.fill();

    // 标题文本
    ctx.fillStyle = '#fbbf24'; // 明亮金黄
    ctx.font = 'bold 18px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚡ 快速选关菜单 (测试秘籍 F1 · 全三幕 30 章)', modalX + 18, modalY + 26);

    // 右上角关闭提示与按钮
    const closeW = 86;
    const closeH = 26;
    const closeX = modalX + modalW - closeW - 14;
    const closeY = modalY + 12;
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

    // 3. 三栏布局 (第一幕 / 第二幕 / 第三幕)
    const colW = 278;
    const colGap = 16;
    const colStartX = modalX + 18;
    const colY = modalY + 54;

    const colHeaders = [
      { title: '第一幕 · 校园迷雾', sub: '1~10章' },
      { title: '第二幕 · 硝烟重燃', sub: '11~20章' },
      { title: '第三幕 · 破晓终局', sub: '21~30章' }
    ];

    const drawColHeader = (colIdx, title, sub) => {
      const x = colStartX + colIdx * (colW + colGap);
      ctx.fillStyle = '#292524';
      ctx.beginPath();
      ctx.roundRect(x, colY, colW, 28, 4);
      ctx.fill();
      ctx.strokeStyle = '#44403c';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#fde68a';
      ctx.font = 'bold 13px "PingFang SC", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(title, x + 8, colY + 14);

      ctx.fillStyle = '#a8a29e';
      ctx.font = '11px "PingFang SC", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(sub, x + colW - 8, colY + 14);
    };

    for (let c = 0; c < 3; c++) {
      drawColHeader(c, colHeaders[c].title, colHeaders[c].sub);
    }

    // 渲染三个栏目中的各 10 个章节项（共 30 项）
    this.itemRects = [];
    const itemStartY = colY + 34;
    const itemH = 29;
    const itemGap = 3;

    for (let i = 0; i < this.chapters.length; i++) {
      const chItem = this.chapters[i];
      const colIdx = Math.floor(i / 10);
      const rowIdx = i % 10;
      const colX = colStartX + colIdx * (colW + colGap);
      const iy = itemStartY + rowIdx * (itemH + itemGap);

      const rect = { x: colX, y: iy, w: colW, h: itemH };
      this.itemRects[i] = rect;

      const isFocused = this.focusIndex === i;

      // 背景
      if (isFocused) {
        ctx.fillStyle = 'rgba(217, 119, 6, 0.4)'; // 琥珀金高亮
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
        ctx.font = 'bold 12px "PingFang SC", sans-serif';
        ctx.fillText(`▶ ${chItem.label}`, rect.x + 6, rect.y + itemH / 2);
      } else {
        ctx.fillStyle = '#d6d3d1';
        ctx.font = '11px "PingFang SC", sans-serif';
        ctx.fillText(`  ${chItem.label}`, rect.x + 6, rect.y + itemH / 2);
      }

      // 章节标题
      ctx.textAlign = 'left';
      ctx.fillStyle = isFocused ? '#ffffff' : '#a8a29e';
      ctx.font = isFocused ? 'bold 12px "PingFang SC", sans-serif' : '12px "PingFang SC", sans-serif';
      
      // 标题截断保护（防止超出单列）
      let titleText = chItem.title;
      if (titleText.length > 9) {
        titleText = titleText.slice(0, 8) + '…';
      }
      ctx.fillText(titleText, rect.x + 62, rect.y + itemH / 2);

      // 右侧动作提示
      if (isFocused) {
        ctx.fillStyle = '#fde68a';
        ctx.font = '10px "PingFang SC", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('↵', rect.x + rect.w - 6, rect.y + itemH / 2);
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
