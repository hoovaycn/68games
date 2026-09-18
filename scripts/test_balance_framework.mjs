import { BalanceValidator } from '../src/systems/balance_validator.js';

console.log('=== 全量平衡性审计报告 ===');
const report = BalanceValidator.runFullAudit();
console.log('红线拦截违规数 (REDLINE):', report.redlines.length);
if (report.redlines.length > 0) {
  report.redlines.forEach(r => console.error(' [REDLINE]', r.msg));
}
console.log('优化建议警示数 (WARN):', report.warnings.length);
report.warnings.forEach(w => console.warn(' [WARN]', w.msg));
console.log('常规提示数 (INFO):', report.info.length);

console.log('\n=== 测试用例 1: 模拟非法需求拦截（物理系暴击率 80%） ===');
const illegalWeapon = { name: '毁灭巨力笔', crit: 80, might: 10, type: 'melee' };
const weaponCheck = BalanceValidator.validateWeapon('test_crit_weapon', illegalWeapon);
console.log('暴击率 80% 校验结果:', weaponCheck);
if (weaponCheck.length === 0 || weaponCheck[0].level !== 'REDLINE') {
  throw new Error('未成功拦截 80% 暴击率红线');
}

console.log('\n=== 测试用例 2: 模拟非法需求拦截（物理系初始 MP 达 30 破坏稀缺性） ===');
const illegalWarrior = {
  base: { hp: 25, mp: 30, str: 10, mag: 1, skl: 5, spd: 5, luk: 5, def: 5, res: 2 },
  growth: { hp: 70, mp: 40, str: 50, mag: 10, skl: 40, spd: 40, luk: 30, def: 40, res: 10 }
};
const warriorCheck = BalanceValidator.validateClass('test_warrior', illegalWarrior);
console.log('战士 MP 膨胀校验结果:', warriorCheck);
const hasMpRedline = warriorCheck.some(c => c.level === 'REDLINE' && c.type === 'physical_mp_bloat');
if (!hasMpRedline) {
  throw new Error('未成功拦截物理系 MP 膨胀红线');
}

console.log('\n=== 测试用例 3: 模拟非法秒杀怪（单下攻击秒杀我方 70% 血量） ===');
const illegalBoss = {
  name: '灭霸教导主任',
  stats: { hp: 100, str: 28, def: 15, spd: 10, luk: 10 }
};
const samplePlayer = { stats: { hp: 23, def: 5 } };
const bossCheck = BalanceValidator.validateEnemy('illegal_boss', illegalBoss, samplePlayer);
console.log('秒杀怪校验结果:', bossCheck);
const hasOneShotRedline = bossCheck.some(c => c.level === 'REDLINE' && c.type === 'one_shot_threat');
if (!hasOneShotRedline) {
  throw new Error('未成功拦截秒杀怪红线');
}

console.log('\n>>> 平衡性算法与红线拦截体系全量验证通过！ <<<');
