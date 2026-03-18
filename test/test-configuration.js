/**
 * 配置引用测试脚本
 * 用于验证 GameState 中的配置引用是否正确
 */

import { GameState } from '../js/core/GameState.js';
import { GAME_CONFIG } from '../js/config/GameConfig.js';

console.log('===== 开始配置引用测试 =====\n');

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

// 测试配置引用
console.log('===== 测试配置引用 =====');

const configsToTest = [
    { name: 'realms', config: game.realms, expectedType: 'object' },
    { name: 'spiritualRoots', config: game.spiritualRoots, expectedType: 'object' },
    { name: 'backgrounds', config: game.backgrounds, expectedType: 'object' },
    { name: 'skillConfig', config: game.skillConfig, expectedType: 'object' },
    { name: 'storyQuests', config: game.storyQuests, expectedType: 'object' },
    { name: 'sects', config: game.sects, expectedType: 'object' },
    { name: 'sectTasks', config: game.sectTasks, expectedType: 'object' },
    { name: 'sectShop', config: game.sectShop, expectedType: 'object' },
    { name: 'npcs', config: game.npcs, expectedType: 'object' },
    { name: 'pets', config: game.pets, expectedType: 'object' }
];

let passedTests = 0;
let failedTests = 0;

configsToTest.forEach(({ name, config, expectedType }) => {
    const exists = config !== undefined && config !== null;
    const isCorrectType = typeof config === expectedType;

    if (exists && isCorrectType) {
        const keysCount = Object.keys(config).length;
        console.log(`✅ ${name}: 已定义，包含 ${keysCount} 个条目`);
        passedTests++;
    } else {
        console.log(`❌ ${name}: ${exists ? '存在但类型错误' : '未定义'}`);
        failedTests++;
    }
});

console.log(`\n===== 测试结果 =====`);
console.log(`通过: ${passedTests}/${configsToTest.length}`);
console.log(`失败: ${failedTests}/${configsToTest.length}`);

if (failedTests === 0) {
    console.log('\n🎉 所有配置引用测试通过！');
} else {
    console.log('\n⚠️  部分配置引用测试失败，请检查 GameState.js');
}

// 测试特定配置内容
console.log('\n===== 测试特定配置内容 =====');

// 测试 sectTasks
if (game.sectTasks && game.sectTasks.length > 0) {
    console.log(`✅ sectTasks 包含 ${game.sectTasks.length} 个任务`);
    console.log(`   第一个任务: ${game.sectTasks[0].name}`);
} else {
    console.log('❌ sectTasks 为空或未定义');
}

// 测试 sectShop
if (game.sectShop) {
    if (game.sectShop.skills && game.sectShop.items) {
        console.log(`✅ sectShop 包含 ${game.sectShop.skills.length} 个技能和 ${game.sectShop.items.length} 个物品`);
    } else {
        console.log('❌ sectShop 缺少 skills 或 items 数组');
    }
} else {
    console.log('❌ sectShop 未定义');
}

// 测试 npcs
if (game.npcs) {
    const npcCount = Object.keys(game.npcs).length;
    console.log(`✅ npcs 包含 ${npcCount} 个 NPC`);
    if (npcCount > 0) {
        const firstNpcId = Object.keys(game.npcs)[0];
        console.log(`   第一个NPC: ${game.npcs[firstNpcId].name}`);
    }
} else {
    console.log('❌ npcs 未定义');
}

// 测试 storyQuests
if (game.storyQuests) {
    const questCount = Object.keys(game.storyQuests).length;
    console.log(`✅ storyQuests 包含 ${questCount} 个任务`);
    if (questCount > 0) {
        const firstQuestId = Object.keys(game.storyQuests)[0];
        console.log(`   第一个任务: ${game.storyQuests[firstQuestId].name}`);
    }
} else {
    console.log('❌ storyQuests 未定义');
}

console.log('\n===== 测试完成 =====');
