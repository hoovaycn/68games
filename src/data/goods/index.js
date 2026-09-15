/**
 * goods 聚合入口（V2 服务层）
 * 四张分类表的统一出口 + 跨表 id 检索。
 *
 * UI/联调轮预留接口：
 *   import { getGoodsById, GOODS_INDEX } from './data/goods/index.js'
 *   -> 商店/背包/掉落弹窗按此取物名与描述；注册中心自检引用完整性。
 */

import { WEAPONS } from './weapons.js';
import { ARMORS } from './armors.js';
import { CONSUMABLES } from './consumables.js';
import { KEY_ITEMS } from './key_items.js';

/** 全商品索引（id -> 配置对象） */
export const GOODS_INDEX = {
  ...WEAPONS,
  ...ARMORS,
  ...CONSUMABLES,
  ...KEY_ITEMS
};

/** 跨表 id 检索（武器/防具/消耗品/关键道具） */
export function getGoodsById(id) {
  return GOODS_INDEX[id] || null;
}

/**
 * 四分类页签（UI 联调轮：inventory_panel / 行动菜单「道具」入口消费）。
 * 顺序即页签顺序；label 为统一中文短语。未注册 kind（脏数据）由 UI 落到「其他」。
 */
export const GOODS_KINDS = [
  { kind: 'consumable', label: '道具' },
  { kind: 'weapon', label: '武器' },
  { kind: 'armor', label: '防具' },
  { kind: 'key_item', label: '重要' }
];

/**
 * 兼容旧路径的 ITEMS 视图：src/data/items.js 从本处 re-export。
 * 旧 main.js / combat.js 只做 ITEMS[id] 查找，多出的条目不影响现有查找。
 */
export const LEGACY_ITEMS_VIEW = {
  ...CONSUMABLES,
  ...KEY_ITEMS
};

export { WEAPONS, ARMORS, CONSUMABLES, KEY_ITEMS };
