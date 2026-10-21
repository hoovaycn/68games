import { sound } from '../../engine/sound.js';

/**
 * 存档界面模态组件（T5 / D5：标题页「继续游戏」+ 独立存档界面）
 *
 * 视觉语言与 VictoryModal 统一（浅黄羊皮纸 #FFFDF9 + 黑金 #292524/#FACC15）。
 * 两种模式复用同一面板：
 *  - mode='load'（标题页「存档管理」）：槽位 [auto,1,2,3]，点选即读档
 *  - mode='save'（剧情内 Esc 呼出）：槽位 [1,2,3]，点选即把当前进度写入
 *
 * 交互：↑↓/鼠标 focus 移动，Enter/点击行执行主操作，
 *       D 删档（confirm 二次确认）、E 导出 .json、I 导入粘贴 JSON、Esc 关闭。
 *
 * 组件只依赖 save_manager（槽位读写）与注入回调：
 *  - getState()         → save 模式取当前 gameState
 *  - onLoaded(state)    → 读档成功（main.js 接管 resumeFromGameState）
 *  - onClosed()         → 关闭面板
 *  - describeChapter(m) → 章节主标题（main.js 注入）
 *  - describeAnchor(m)  → 章节名/剧情场景名的中文描述（main.js 注入，组件不做数据查询）
 */
export class SaveMenuModal {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config || {};
    this.mode = this.config.mode === 'save' ? 'save' : 'load';
    this.saveManager = this.config.saveManager;
    this.getState = this.config.getState || null;
    this.onLoaded = this.config.onLoaded || null;
    this.onClosed = this.config.onClosed || null;
    this.describeAnchor = this.config.describeAnchor || null;
    this.describeChapter = this.config.describeChapter || null;

    // save 模式只给手动槽（auto 由系统写）；load 模式四槽全列
    this.slotList = this.mode === 'save' ? [1, 2, 3] : ['auto', 1, 2, 3];
    this.focusIndex = 0;

    this.rowRects = [];       // render 每帧刷新的行命中区
    this.buttonRects = {};    // 底部按钮命中区
    this.statusText = '';
    this.statusStart = 0;

    this.refreshSlots();
  }

  /** 重新拉取槽位总览（存/删/导入后刷新显示） */
  refreshSlots() {
    const all = this.saveManager.listSlots();
    this.slotInfos = this.slotList.map((s) => all.find((x) => x.slot === s));
  }

  setStatus(text) {
    this.statusText = text;
    this.statusStart = Date.now();
  }

  anchorText(meta) {
    if (!meta) return '';
    if (this.describeAnchor) {
      const t = this.describeAnchor(meta);
      if (t) return t;
    }
    return meta.chapterId
      ? `战斗 · ${meta.chapterId}`
      : (meta.sceneId ? `剧情 · ${meta.sceneId}` : '新档');
  }

  moveFocus(dir) {
    const n = this.slotInfos.length;
    this.focusIndex = (this.focusIndex + dir + n) % n;
    sound.playSfx('sfx_cursor');
  }

  /** 行主操作：load= 读档并回调；save= 把当前进度写进该槽 */
  activateRow(index) {
    const info = this.slotInfos[index];
    if (!info) return;

    if (this.mode === 'load') {
      if (!info.exists) {
        this.setStatus('该槽位没有存档');
        return;
      }
      const state = this.saveManager.loadSlot(info.slot);
      if (!state) {
        this.setStatus('读取失败：存档数据损坏');
        return;
      }
      sound.playSfx('sfx_confirm');
      const cb = this.onLoaded;
      this.onLoaded = null;
      if (cb) cb(state, info.slot);
    } else {
      const gs = this.getState ? this.getState() : null;
      if (!gs) {
        this.setStatus('当前没有可存档的进度');
        return;
      }
      const res = this.saveManager.saveToSlot(info.slot, gs);
      if (res.ok) {
        sound.playSfx('sfx_confirm');
        this.refreshSlots();
        this.setStatus(`已存入【${info.label}】`);
        if (this.config.onSaved) this.config.onSaved(info.slot);
      } else {
        this.setStatus('存档失败：' + (res.error || '未知错误'));
      }
    }
  }

  deleteRow(index) {
    const info = this.slotInfos[index];
    if (!info || !info.exists) {
      this.setStatus('该槽位没有存档');
      return;
    }
    if (typeof window !== 'undefined' && window.confirm
        && !window.confirm(`确认删除【${info.label}】？此操作不可恢复。`)) {
      return;
    }
    this.saveManager.deleteSlot(info.slot);
    this.refreshSlots();
    sound.playSfx('sfx_shock_sting');
    this.setStatus(`已删除【${info.label}】`);
  }

  /** 导出焦点槽为 .json 备份文件（浏览器下载） */
  exportRow(index) {
    const info = this.slotInfos[index];
    if (!info || !info.exists) {
      this.setStatus('该槽位没有存档');
      return;
    }
    const text = this.saveManager.exportSlot(info.slot);
    if (!text) {
      this.setStatus('导出失败');
      return;
    }
    try {
      const blob = new Blob([text], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fx_save_slot_${info.slot}_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.setStatus(`已导出【${info.label}】为 .json 文件`);
    } catch (e) {
      this.setStatus('导出失败：' + ((e && e.message) || e));
    }
  }

  /** 导入：粘贴存档 JSON → 校验 → 写入焦点槽（auto 槽不允许手动写入） */
  importToRow(index) {
    const info = this.slotInfos[index];
    if (!info) return;
    if (info.slot === 'auto') {
      this.setStatus('自动存档槽由系统写入，请选择手动槽导入');
      return;
    }
    if (typeof window === 'undefined' || !window.prompt) return;
    const text = window.prompt('粘贴存档 JSON 文本（.json 备份文件的内容）：');
    if (!text) return;
    const res = this.saveManager.importSaveText(text);
    if (!res.ok) {
      this.setStatus('导入失败：' + res.error);
      return;
    }
    const w = this.saveManager.saveToSlot(info.slot, res.state);
    if (!w.ok) {
      this.setStatus('写入失败：' + (w.error || '未知错误'));
      return;
    }
    this.refreshSlots();
    sound.playSfx('sfx_confirm');
    this.setStatus(`已导入至【${info.label}】`);
  }

  close() {
    sound.playSfx('sfx_cursor');
    const cb = this.onClosed;
    this.onClosed = null;
    if (cb) cb();
  }

  // ============================================================
  // 输入
  // ============================================================
  handleMouseMove(mouseX, mouseY) {
    for (let i = 0; i < this.rowRects.length; i++) {
      const r = this.rowRects[i];
      if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
        if (this.focusIndex !== i) {
          this.focusIndex = i;
          sound.playSfx('sfx_cursor');
        }
        break;
      }
    }
  }

  handleClick(mouseX, mouseY) {
    // 底部按钮优先
    const hitBtn = (r) => r && mouseX >= r.x && mouseX <= r.x + r.w
      && mouseY >= r.y && mouseY <= r.y + r.h;
    if (hitBtn(this.buttonRects.import)) { this.importToRow(this.focusIndex); return true; }
    if (hitBtn(this.buttonRects.close)) { this.close(); return true; }

    // 行点击：先对焦再执行主操作
    for (let i = 0; i < this.rowRects.length; i++) {
      const r = this.rowRects[i];
      if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
        this.focusIndex = i;
        this.activateRow(i);
        return true;
      }
    }
    // 点空白处吞掉事件，防穿透到底层场景
    return true;
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        this.moveFocus(-1);
        return true;
      case 'ArrowDown':
      case 's':
      case 'S':
        this.moveFocus(1);
        return true;
      case 'Enter':
      case ' ':
        this.activateRow(this.focusIndex);
        return true;
      case 'Delete':
      case 'd':
      case 'D':
        this.deleteRow(this.focusIndex);
        return true;
      case 'e':
      case 'E':
        this.exportRow(this.focusIndex);
        return true;
      case 'i':
      case 'I':
        this.importToRow(this.focusIndex);
        return true;
      case 'Escape':
        this.close();
        return true;
    }
    return false;
  }

  // ============================================================
  // 渲染
  // ============================================================
  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 半透明深色遮罩
    ctx.fillStyle = 'rgba(15, 12, 10, 0.72)';
    ctx.fillRect(0, 0, w, h);

    const boxW = 680;
    const boxH = 480;
    const x = (w - boxW) / 2;
    const y = (h - boxH) / 2;

    // 羊皮纸面板 + 描边 + 内衬线（与 VictoryModal 同款）
    ctx.fillStyle = '#fffdf9';
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, 16);
    ctx.fill();
    ctx.strokeStyle = '#d6c8b4';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.strokeStyle = '#e2d5bd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x + 7, y + 7, boxW - 14, boxH - 14, 12);
    ctx.stroke();

    // 1. 黑金 Header
    const headH = 58;
    const headGrad = ctx.createLinearGradient(0, y + 14, 0, y + 14 + headH);
    headGrad.addColorStop(0, '#292524');
    headGrad.addColorStop(1, '#1c1917');
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.roundRect(x + 14, y + 14, boxW - 28, headH, 10);
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.mode === 'save' ? '★  保 存 进 度  ★' : '★  读 取 存 档  ★', w / 2, y + 14 + headH / 2);

    // 2. 槽位行
    this.rowRects = [];
    const rowW = boxW - 40;
    const rowH = 70;
    const rowGap = 8;
    let rowY = y + 88;
    for (let i = 0; i < this.slotInfos.length; i++) {
      const info = this.slotInfos[i];
      const rowX = x + 20;
      const focused = i === this.focusIndex;
      this.rowRects.push({ x: rowX, y: rowY, w: rowW, h: rowH });

      // 行底板
      ctx.fillStyle = info.exists ? (focused ? '#f5eedf' : '#faf6ec') : '#f7f4ec';
      ctx.beginPath();
      ctx.roundRect(rowX, rowY, rowW, rowH, 10);
      ctx.fill();

      ctx.strokeStyle = focused ? '#facc15' : '#e2d5bd';
      ctx.lineWidth = focused ? 2.5 : 1.5;
      ctx.stroke();

      if (info.exists) {
        // 章节是主标题；槽位、场景、角色和时间分层显示。
        const meta = info.meta || {};
        ctx.textAlign = 'left';
        ctx.fillStyle = '#292524';
        ctx.font = 'bold 17px sans-serif';
        const chapter = this.describeChapter ? this.describeChapter(meta) : '';
        ctx.fillText(chapter || '未命名章节', rowX + 18, rowY + 21, rowW - 235);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#7c2d12';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(`${focused ? '▶ ' : ''}${info.label}`, rowX + rowW - 16, rowY + 20);

        ctx.textAlign = 'left';
        ctx.fillStyle = '#57534e';
        ctx.font = '14px sans-serif';
        ctx.fillText(this.anchorText(meta), rowX + 18, rowY + 43, rowW - 300);
        ctx.textAlign = 'right';
        ctx.fillText(
          `${meta.leadName || '?'} Lv.${meta.leadLevel || 1} · ${meta.route === 'female' ? '女主线' : '男主线'}`,
          rowX + rowW - 16, rowY + 43, 260
        );

        const playH = Math.floor((meta.playtimeSec || 0) / 3600);
        const playM = Math.floor(((meta.playtimeSec || 0) % 3600) / 60);
        const playText = playH > 0 ? `${playH}小时${playM}分` : `${playM}分`;
        ctx.textAlign = 'left';
        ctx.fillStyle = '#78716c';
        ctx.font = '12px sans-serif';
        ctx.fillText(
          `队伍 ${meta.partySize || 1} 人 · 通关 ${meta.clearedCount || 0} 章 · 游玩 ${playText}`,
          rowX + 18, rowY + 61
        );
        ctx.textAlign = 'right';
        ctx.fillText(this.formatSavedAt(meta.savedAt), rowX + rowW - 16, rowY + 61);

        // 保存模式明确标出覆盖风险，放在槽位名旁边。
        if (this.mode === 'save') {
          ctx.fillStyle = '#b91c1c';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText('存入将覆盖', rowX + rowW - 100, rowY + 20);
        }
      } else {
        // 空槽
        ctx.textAlign = 'left';
        ctx.fillStyle = '#a8a29e';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`▶ ${info.label}`, rowX + 18, rowY + 22);
        ctx.font = '13px sans-serif';
        ctx.fillText(this.mode === 'save' ? '（ 空槽 · 可存入 ）' : '（ 空槽 · 无存档 ）', rowX + 18, rowY + 44);
      }

      rowY += rowH + rowGap;
    }

    // 3. 底部：状态提示 + 按键说明 + 按钮
    const footY = y + boxH - 58;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#44403c';
    ctx.font = 'bold 14px sans-serif';
    // 状态文案 3 秒内高亮显示，之后回落到按键说明
    if (this.statusText && Date.now() - this.statusStart < 3000) {
      ctx.fillStyle = '#7c2d12';
      ctx.fillText(this.statusText, x + 24, footY);
    } else {
      ctx.fillText('↑↓选择 · Enter确认 · Esc关闭 · D删除 · E导出 · I导入', x + 24, footY);
    }

    // 按钮：[导入存档]（load 模式给）+ [关闭]
    this.buttonRects = {};
    const btnW = 108;
    const btnH = 36;
    let btnX = x + boxW - 24 - btnW;
    const btnY = y + boxH - 74;

    if (this.mode === 'load') {
      this.drawToolbarButton(ctx, '导入存档', btnX, btnY, btnW, btnH);
      this.buttonRects.import = { x: btnX, y: btnY, w: btnW, h: btnH };
      btnX -= btnW + 12;
    }
    this.drawToolbarButton(ctx, '关 闭', btnX, btnY, btnW, btnH);
    this.buttonRects.close = { x: btnX, y: btnY, w: btnW, h: btnH };
  }

  drawToolbarButton(ctx, text, bx, by, bw, bh) {
    const grad = ctx.createLinearGradient(0, by, 0, by + bh);
    grad.addColorStop(0, '#292524');
    grad.addColorStop(1, '#1c1917');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 8);
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, bx + bw / 2, by + bh / 2 + 1);
  }

  formatSavedAt(ts) {
    if (!ts) return '--';
    const d = new Date(ts);
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }
}
