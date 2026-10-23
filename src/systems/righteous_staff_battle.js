export const RIGHTEOUS_STAFF_DAMAGE = 90;
export const RIGHTEOUS_STAFF_RANGE = 3;

/** A one-time boss attack; the staff stays in the bag until the victory scene. */
export function useRighteousStaffInBattle(battle, caster, leadUnitId) {
  if (battle?.chapter?.id !== 'ch19_battle1') {
    return { success: false, msg: '浩然正气杖只能在钟楼终战对巨魔使用' };
  }
  if (!caster || caster.id !== leadUnitId || caster.faction !== 'player' || caster.hasActed
      || battle.phase !== 'PLAYER_PHASE') {
    return { success: false, msg: '只有本回合的主角能使用浩然正气杖' };
  }
  if (!caster.inventory?.some((slot) => slot.id === 'righteous_staff' && slot.count > 0)) {
    return { success: false, msg: '主角没有浩然正气杖' };
  }
  if (battle.staffUsed) {
    return { success: false, msg: '这一战已经引动过杖上的金光' };
  }

  const boss = battle.units?.find((unit) => unit.id === 'boss_colossus' && unit.faction === 'enemy' && unit.isAlive);
  if (!boss || boss.currentHp <= 1) {
    return { success: false, msg: '巨魔已无法承受这一击' };
  }
  const distance = Math.abs(caster.x - boss.x) + Math.abs(caster.y - boss.y);
  if (distance > RIGHTEOUS_STAFF_RANGE) {
    return { success: false, msg: `先靠近巨魔（${RIGHTEOUS_STAFF_RANGE}格内）` };
  }

  // Leave the last blow to ordinary combat so kills, loot and the final CG
  // still follow the usual victory flow, whether or not the staff was used.
  const damage = Math.min(RIGHTEOUS_STAFF_DAMAGE, boss.currentHp - 1);
  boss.currentHp -= damage;
  battle.staffUsed = true;
  return { success: true, damage, target: boss, msg: `金光重创巨魔，造成 ${damage} 点伤害！` };
}
