/**
 * 状态管理系统测试脚本
 * 测试打坐、历练、打工等状态管理功能
 */

import { GameState } from '../js/core/GameState.js';

console.log('===== 开始状态管理系统测试 =====\n');

// 创建测试角色
const characterData = {
    playerName: '测试角色',
    daoName: '测试道号',
    background: 'commoner',
    talents: { wisdom: 0, luck: 0, potential: 0, fortune: 0 },
    spiritualRoot: '天火灵根'
};

// 创建 GameState 实例
const game = new GameState(characterData);

console.log('✅ GameState 实例创建成功\n');

// 测试1: 打坐状态
console.log('===== 测试1: 打坐状态 =====');
console.log(`初始打坐状态: ${game.isMeditating}`);

const startMeditationResult = game.startMeditation();
console.log(`开始打坐结果: ${startMeditationResult ? '成功' : '失败'}`);
console.log(`打坐状态: ${game.isMeditating}`);
console.log(`修炼倍率: ${game.buffs.cultivation.multiplier}`);
console.log(`Buff结束时间: ${new Date(game.buffs.cultivation.endTime).toLocaleString()}`);

if (game.isMeditating && game.buffs.cultivation.multiplier === 3.0) {
    console.log('✅ 打坐状态启动成功\n');
} else {
    console.log('❌ 打坐状态启动失败\n');
}

// 测试2: 状态互斥
console.log('===== 测试2: 状态互斥检查 =====');

// 尝试在打坐状态下进行历练
if (game.isMeditating) {
    const adventureResult = game.startAdventure('exploration');
    console.log(`打坐中尝试历练: ${adventureResult === false ? '被阻止' : '未被阻止'}`);
    if (adventureResult === false) {
        console.log('✅ 状态互斥检查正常\n');
    } else {
        console.log('❌ 状态互斥检查失败\n');
    }
}

// 停止打坐
game.stopMeditation();
console.log(`停止打坐后状态: ${game.isMeditating}`);

// 测试3: 历练状态
console.log('===== 测试3: 历练状态 =====');
const startAdventureResult = game.startAdventure('exploration');
console.log(`开始历练结果: ${startAdventureResult !== false ? '成功' : '失败'}`);
console.log(`历练状态: ${game.isAdventuring}`);
console.log(`历练结束时间: ${new Date(game.adventureEndTime).toLocaleString()}`);

if (game.isAdventuring) {
    console.log('✅ 历练状态启动成功');

    // 测试历练中不能打坐
    const meditationResult = game.startMeditation();
    console.log(`历练中尝试打坐: ${meditationResult === false ? '被阻止' : '未被阻止'}`);
    if (meditationResult === false) {
        console.log('✅ 历练状态互斥检查正常\n');
    } else {
        console.log('❌ 历练状态互斥检查失败\n');
    }
} else {
    console.log('❌ 历练状态启动失败\n');
}

// 测试4: 打工状态
console.log('===== 测试4: 打工状态 =====');
// 先完成历练
game.completeAdventure();
console.log(`完成历练后状态: ${game.isAdventuring}`);

const startWorkResult = game.startWork('manual_labor');
console.log(`开始打工结果: ${startWorkResult !== false ? '成功' : '失败'}`);
console.log(`打工状态: ${game.isWorking}`);
console.log(`工作结束时间: ${new Date(game.workEndTime).toLocaleString()}`);

if (game.isWorking) {
    console.log('✅ 打工状态启动成功\n');
} else {
    console.log('❌ 打工状态启动失败\n');
}

// 测试5: Buff检查
console.log('===== 测试5: Buff超时检查 =====');

// 设置一个即将过期的buff
game.buffs.cultivation.endTime = Date.now() + 100; // 100ms后过期
game.isMeditating = true;

console.log(`Buff过期前 - 打坐状态: ${game.isMeditating}`);
console.log(`Buff结束时间: ${new Date(game.buffs.cultivation.endTime).toLocaleTimeString()}`);

// 等待buff过期
await new Promise(resolve => setTimeout(resolve, 200));

// 检查buff
game.checkBuffs();

console.log(`Buff过期后 - 打坐状态: ${game.isMeditating}`);
console.log(`修炼倍率: ${game.buffs.cultivation.multiplier}`);

if (!game.isMeditating && game.buffs.cultivation.multiplier === 1.0) {
    console.log('✅ Buff超时检查正常，打坐状态已重置\n');
} else {
    console.log('❌ Buff超时检查失败\n');
}

// 测试6: 活动状态超时检查
console.log('===== 测试6: 活动状态超时检查 =====');

// 开始一个即将超时的历练
game.startAdventure('exploration');
game.adventureEndTime = Date.now() + 100; // 100ms后超时

console.log(`历练超时前 - 历练状态: ${game.isAdventuring}`);

// 等待超时
await new Promise(resolve => setTimeout(resolve, 200));

// 检查活动状态
game.checkActivityStatus();

console.log(`历练超时后 - 历练状态: ${game.isAdventuring}`);

if (!game.isAdventuring) {
    console.log('✅ 活动状态超时检查正常\n');
} else {
    console.log('❌ 活动状态超时检查失败\n');
}

// 测试7: 获取当前状态
console.log('===== 测试7: 获取当前状态 =====');
const currentState = game.getCurrentState();
console.log(`当前状态文本: ${currentState.text}`);
console.log(`当前状态类型: ${currentState.type}`);
console.log(`当前境界: ${currentState.realm}`);
console.log(`当前等级: ${currentState.level}`);
console.log(`当前修为: ${currentState.cultivation}/${currentState.maxCultivation}`);

if (currentState.text && currentState.type) {
    console.log('✅ 获取当前状态正常\n');
} else {
    console.log('❌ 获取当前状态失败\n');
}

console.log('===== 测试完成 =====');
console.log('\n🎉 状态管理系统测试完成！');
