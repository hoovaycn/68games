import { WEAPONS } from './goods/weapons.js';
import { CONSUMABLES } from './goods/consumables.js';
import { KEY_ITEMS } from './goods/key_items.js';
import { ARMORS } from './goods/armors.js';

export const ITEMS = {
  ...WEAPONS,
  ...CONSUMABLES,
  ...KEY_ITEMS,
  ...ARMORS
};
