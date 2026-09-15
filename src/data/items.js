/**
 * 旧路径兼容 shim（V2 服务层收编）
 * 道具配置已拆分至 goods/consumables.js（成长/回复/战斗）与 goods/key_items.js。
 * 本文件保留旧导出路径（ITEMS），main.js / combat.js 引用零改动。
 */
export { LEGACY_ITEMS_VIEW as ITEMS } from './goods/index.js';
