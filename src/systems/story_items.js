import { KEY_ITEMS } from '../data/goods/key_items.js';

/** Apply a story possession change once, including loss in older saves without the item. */
export function applyStoryItemEvent(state, event) {
  const item = KEY_ITEMS[event?.itemId];
  const inventory = state?.roster?.[state.leadUnitId]?.inventory;
  if (!item || !Array.isArray(inventory)) return null;

  const owned = inventory.some((slot) => slot.id === item.id && slot.count > 0);
  const flag = `storyItem:${item.id}`;
  if (event.action === 'gain' && !owned) {
    inventory.push({ id: item.id, count: 1 });
  } else if (event.action === 'lose' && owned) {
    state.roster[state.leadUnitId].inventory = inventory.filter((slot) => slot.id !== item.id);
  } else if (event.action === 'lose' && state.flags?.[flag] !== 'lose') {
    // Older saves did not track this item, but the theft should still be shown once.
  } else {
    return null;
  }
  (state.flags ??= {})[flag] = event.action;
  return item;
}
