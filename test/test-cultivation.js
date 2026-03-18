/**
 * 修炼系统测试脚本
 * 测试修为增长、灵根加成、突破等功能
 */

import { GameState } from '../js/core/GameState.js';

console.log('===== 开始修炼系统测试 =====\n');

// 创建测试角色
const characterData = {
    playerName: '测试角色',
    daoName: '测试道号',
    background: 'commoner',
    talents: { wisdom: 0, luck: 0, potential: 0, fortune: 0 },
    spiritualRoot: '天火灵根'  // 使用天灵根，修炼加成 +50%
};

const game = new GameState(characterData);

console.log('✅ GameState 实例创建成功\n');

// 测试1: 修为增长
console.log('===== 测试1: 修为增长 =====');
console.log(`初始修为: ${game.cultivation}/${game.maxCultivation}`);

const initialCultivation = game.cultivation;
game.addCultivation(100);
console.log(`增加100修为后: ${game.cultivation}/${game.maxCultivation}`);

if (game.cultivation === initialCultivation + 100) {
    console.log('✅ 修为增长正常\n');
} else {
    console.log('❌ 修为增长异常\n');
}

// 测试2: 修为达到上限时停止增长
console.log('===== 测试2: 修为上限检查 =====');
game.cultivation = game.maxCultivation;
console.log(`修为设为上限: ${game.cultivation}/${game.maxCultivation}`);

game.addCultivation(100);
console.log(`尝试增加修为后: ${game.cultivation}/${game.maxCultivation}`);

if (game.cultivation === game.maxCultivation) {
    console.log('✅ 修为上限检查正常\n');
} else {
    console.log('❌ 修为上限检查失败\n');
}

// 测试3: 灵根加成
console.log('===== 测试3: 灵根加成 =====');
console.log(`灵根: ${game.spiritualRoot}`);
const rootConfig = game.getSpiritualRootConfig();
console.log(`灵根配置:`, rootConfig ? {
    tier: rootConfig.tier,
    element: rootConfig.element,
    cultivationBonus: rootConfig.cultivationBonus
} : '未找到');

const bonus = game.getSpiritualRootCultivationBonus();
console.log(`修炼倍率: ${bonus}x`);

if (bonus === 1.5) {
    console.log('✅ 灵根加成正确（天火灵根 +50%）\n');
} else {
    console.log(`❌ 灵根加成错误，期望1.5，实际${bonus}\n`);
}

// 测试4: 修炼速度计算
console.log('===== 测试4: 修炼速度计算 =====');
const rate = game.calculateActualCultivationRate();
console.log(`修炼速度: ${rate.toFixed(2)} 修为/秒`);

// 修炼速度 = 基础速度 × 灵根加成 × 功法加成
// 天火灵根: 1.5倍，基础吐纳法: 1.1倍（level 1）
const expectedRate = 1.0 * 1.5 * 1.1;
if (Math.abs(rate - expectedRate) < 0.01) {
    console.log(`✅ 修炼速度计算正确（${rate.toFixed(2)} ≈ ${expectedRate.toFixed(2)}）\n`);
} else {
    console.log(`❌ 修炼速度计算错误，期望${expectedRate.toFixed(2)}，实际${rate.toFixed(2)}\n`);
}

// 测试5: 突破条件检查
console.log('===== 测试5: 突破条件检查 =====');
game.cultivation = game.maxCultivation;
const canBreakthrough = game.canBreakthrough();
console.log(`修为达到上限: ${game.cultivation}/${game.maxCultivation}`);
console.log(`可以突破: ${canBreakthrough}`);

if (canBreakthrough) {
    console.log('✅ 突破条件检查正常\n');
} else {
    console.log('❌ 突破条件检查失败\n');
}

// 测试6: 尝试突破
console.log('===== 测试6: 突破尝试 =====');
game.cultivation = game.maxCultivation;
game.level = 1;
const initialLevel = game.level;
const initialRealm = game.realm;

console.log(`突破前: ${initialRealm} ${initialLevel}层`);

// 多次尝试突破，因为有成功概率
let breakthroughSuccess = false;
for (let i = 0; i < 20; i++) {
    const result = game.attemptBreakthrough();
    if (result.success) {
        breakthroughSuccess = true;
        console.log(`突破结果: ${result.message}`);
        break;
    }
}

console.log(`突破后: ${game.realm} ${game.level}层`);

if (game.level > initialLevel || game.realm !== initialRealm) {
    console.log('✅ 突破功能正常\n');
} else {
    console.log('⚠️  突破未成功（概率事件）\n');
}

// 测试7: 境界提升后修为上限更新
console.log('===== 测试7: 境界提升后修为上限 =====');
const oldMaxCultivation = game.maxCultivation;
const oldRealm = game.realm;

// 手动提升境界测试
game.level = 9;
game.cultivation = game.maxCultivation;

// 尝试突破到下一境界
for (let i = 0; i < 50; i++) {
    const result = game.attemptBreakthrough();
    if (result.success && game.realm !== oldRealm) {
        console.log(`境界从 ${oldRealm} 提升到 ${game.realm}`);
        console.log(`修为上限从 ${oldMaxCultivation} 提升到 ${game.maxCultivation}`);

        if (game.maxCultivation > oldMaxCultivation) {
            console.log('✅ 境界提升后修为上限正确更新\n');
        } else {
            console.log('❌ 境界提升后修为上限未更新\n');
        }
        break;
    }
}

if (game.realm === oldRealm) {
    console.log('⚠️  无法突破到下一境界（可能需要更高的悟性）\n');
}

// 测试8: 功法学习
console.log('===== 测试8: 功法学习 =====');
const learnResult = game.learnSkill('引气诀');
console.log(`学习引气诀结果: ${learnResult.message}`);
console.log(`已学功法:`, Object.keys(game.skills));

if (game.skills['引气诀']) {
    console.log('✅ 功法学习正常\n');
} else {
    console.log('❌ 功法学习失败\n');
}

// 测试9: 功法切换
console.log('===== 测试9: 功法切换 =====');
const setSkillResult = game.setCurrentSkill('引气诀');
console.log(`切换到引气诀结果: ${setSkillResult.message}`);
console.log(`当前功法: ${game.currentSkill}`);

if (game.currentSkill === '引气诀') {
    console.log('✅ 功法切换正常\n');
} else {
    console.log('❌ 功法切换失败\n');
}

// 测试10: 出身加成
console.log('===== 测试10: 出身加成 =====');
const nobleChar = {
    playerName: '贵族角色',
    daoName: '贵族',
    background: 'noble',  // 贵族：初始灵石+1000，悟性+2
    talents: { wisdom: 0, luck: 0, potential: 0, fortune: 0 },
    spiritualRoot: '四系灵根'
};

const nobleGame = new GameState(nobleChar);
console.log(`出身: ${nobleGame.background}`);
console.log(`初始灵石: ${nobleGame.spiritStones}`);
console.log(`悟性: ${nobleGame.talents.wisdom}`);

if (nobleGame.spiritStones === 1000 && nobleGame.talents.wisdom === 2) {
    console.log('✅ 出身加成正常\n');
} else {
    console.log('❌ 出身加成失败\n');
}

console.log('===== 测试完成 =====');
console.log('\n🎉 修炼系统测试完成！');
