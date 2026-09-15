# assets/sprites/ 说明

## placeholder/ 已交付临时占位行走图（CC0，2026-09-15）
* 来源：OpenGameArt《Walking Character Set》CC0，登记见 `assets/EXTERNAL_ASSETS.md`
* 文件：walk_placeholder_{blue,red,green,black,white,pink}.png
* 规格：每张 384×512 = **每帧 128×128，4 行（下/左/右/上）× 3 帧走路循环**，已透明，可直接做帧动画
* 临时映射建议：blue→男主、pink→女主、red/black→vendor/punk 敌人、其余给 NPC；正式图到位前先跑通自由活动与战棋移动

## 为什么正式行走图不 AI 出
1. AI 直接生成「4 方向 × 3–4 帧」精灵表会帧间漂移、尺寸不一、方向错乱，返工成本高于手画。
2. P1 方案二选一：①按 assets/art/ 立绘人设用 Aseprite 逐角色拆帧，命名 {id}_walk.png；
   ②用已下载备用的 Kenney Modular Character Pack（CC0，work_ref/ext_pack/，425 个发型/服装部件）拼装。
