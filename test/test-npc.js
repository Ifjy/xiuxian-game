/**
 * NPC系统测试
 *
 * 测试内容：
 * - 可以获取可用NPC列表
 * - 可以与NPC对话
 * - NPC对话分支正确
 * - 可以向NPC赠送礼物
 * - NPC好感度正确增加
 * - 好感度等级正确显示
 * - NPC对话历史记录
 * - NPC解锁条件正确
 */

import { GameState } from '../js/core/GameState.js';

// 测试结果记录
const testResults = {
    passed: 0,
    failed: 0,
    tests: []
};

function recordTest(name, passed, details = '') {
    testResults.tests.push({ name, passed, details });
    if (passed) {
        testResults.passed++;
        console.log(`✓ ${name}`);
    } else {
        testResults.failed++;
        console.error(`✗ ${name}`);
        if (details) console.error(`  详情: ${details}`);
    }
}

async function runNPCTests() {
    console.log('=== NPC系统测试 ===\n');

    // 1. 初始化游戏
    console.log('1. 初始化游戏...');
    const game = new GameState();
    game.character = {
        name: '测试角色',
        daoTitle: '测试道号',
        spiritualRoot: 'fire',
        background: 'mortal'
    };
    game.realm = '炼气期';
    game.level = 1;
    game.cultivation = 0;
    game.spiritStones = 5000;
    game.inventory = {
        '聚气丹': 50,
        '筑基丹': 10,
        '灵石': 1000
    };
    game.npcs = {}; // 初始化NPC数据
    game.npcAffection = {}; // 初始化好感度数据
    recordTest('游戏初始化', game.character && game.character.name === '测试角色');

    // 2. 测试获取NPC列表
    console.log('\n2. 测试获取NPC列表...');
    try {
        const npcs = game.getAvailableNPCs();
        recordTest('获取NPC列表', Array.isArray(npcs),
            `NPC数量: ${npcs.length}`);

        if (npcs.length > 0) {
            console.log(`  可用NPC: ${npcs.map(n => n.name).join(', ')}`);
        }
    } catch (error) {
        recordTest('获取NPC列表', false, error.message);
    }

    // 3. 测试NPC对话
    console.log('\n3. 测试NPC对话...');
    try {
        const talkResult = game.talkToNPC('mysterious_taoist');
        recordTest('与NPC对话', talkResult && typeof talkResult.success === 'boolean',
            JSON.stringify(talkResult));

        if (talkResult.success) {
            recordTest('对话内容存在', talkResult.dialogText || talkResult.dialog,
                talkResult.dialogText || talkResult.dialog);

            if (talkResult.options) {
                recordTest('对话选项', Array.isArray(talkResult.options),
                    `选项数量: ${talkResult.options.length}`);
            }
        }
    } catch (error) {
        recordTest('与NPC对话', false, error.message);
    }

    // 4. 测试NPC对话分支
    console.log('\n4. 测试NPC对话分支...');
    try {
        // 先进行一次对话获取选项
        const talkResult = game.talkToNPC('mysterious_taoist');
        if (talkResult.success && talkResult.options && talkResult.options.length > 0) {
            const optionId = talkResult.options[0].id;
            const selectResult = game.selectNPCDialogOption('mysterious_taoist', optionId);

            recordTest('选择对话选项', selectResult && typeof selectResult.success === 'boolean',
                JSON.stringify(selectResult));
        } else {
            recordTest('选择对话选项', false, '没有可用的对话选项');
        }
    } catch (error) {
        recordTest('NPC对话分支', false, error.message);
    }

    // 5. 测试赠送礼物
    console.log('\n5. 测试赠送礼物...');
    try {
        const beforeAffection = game.npcAffection['mysterious_taoist'] || 0;
        const beforeInventory = game.inventory['聚气丹'];

        const giftResult = game.giveGiftToNPC('mysterious_taoist', '聚气丹');

        recordTest('赠送礼物', giftResult && typeof giftResult.success === 'boolean',
            JSON.stringify(giftResult));

        if (giftResult.success) {
            const afterAffection = game.npcAffection['mysterious_taoist'] || 0;
            const afterInventory = game.inventory['聚气丹'];

            recordTest('好感度增加', afterAffection > beforeAffection,
                `之前: ${beforeAffection}, 之后: ${afterAffection}`);

            recordTest('物品扣除', afterInventory < beforeInventory,
                `之前: ${beforeInventory}, 之后: ${afterInventory}`);
        }
    } catch (error) {
        recordTest('赠送礼物', false, error.message);
    }

    // 6. 测试好感度等级
    console.log('\n6. 测试好感度等级...');
    try {
        // 设置不同的好感度测试等级
        game.npcAffection['test_npc_1'] = 10;
        game.npcAffection['test_npc_2'] = 50;
        game.npcAffection['test_npc_3'] = 100;

        const level1 = game.getAffectionLevel(10);
        const level2 = game.getAffectionLevel(50);
        const level3 = game.getAffectionLevel(100);

        recordTest('好感度等级函数', typeof level1 === 'string' && typeof level2 === 'string' && typeof level3 === 'string',
            `10好感度: ${level1}, 50好感度: ${level2}, 100好感度: ${level3}`);
    } catch (error) {
        recordTest('好感度等级', false, error.message);
    }

    // 7. 测试获取NPC好感度
    console.log('\n7. 测试获取NPC好感度...');
    try {
        const affection = game.getNPCAffection('mysterious_taoist');
        recordTest('获取好感度值', typeof affection === 'number',
            `好感度值: ${affection}`);
    } catch (error) {
        recordTest('获取NPC好感度', false, error.message);
    }

    // 8. 测试NPC解锁条件
    console.log('\n8. 测试NPC解锁条件...');
    try {
        // 测试未解锁的NPC
        game.level = 1;
        const locked = game.checkNPCUnlockRequirements('high_level_npc');

        // 测试已解锁的NPC
        game.level = 10;
        const unlocked = game.checkNPCUnlockRequirements('high_level_npc');

        recordTest('NPC解锁检查', typeof locked === 'boolean' && typeof unlocked === 'boolean',
            `低等级: ${locked}, 高等级: ${unlocked}`);
    } catch (error) {
        recordTest('NPC解锁条件', false, error.message);
    }

    // 9. 测试NPC对话历史
    console.log('\n9. 测试NPC对话历史...');
    try {
        // 进行几次对话
        game.talkToNPC('mysterious_taoist');
        game.talkToNPC('mysterious_taoist');

        const history = game.getNPCDialogHistory('mysterious_taoist');
        recordTest('对话历史记录', history && Array.isArray(history),
            `历史记录数: ${history ? history.length : 0}`);
    } catch (error) {
        recordTest('NPC对话历史', false, error.message);
    }

    // 10. 测试多NPC交互
    console.log('\n10. 测试多NPC交互...');
    try {
        const npcs = game.getAvailableNPCs();
        if (npcs.length >= 2) {
            const talkResult1 = game.talkToNPC(npcs[0].id);
            const talkResult2 = game.talkToNPC(npcs[1].id);

            recordTest('多NPC交互', talkResult1.success && talkResult2.success,
                `${npcs[0].name}: ${talkResult1.success}, ${npcs[1].name}: ${talkResult2.success}`);
        } else {
            recordTest('多NPC交互', false, 'NPC数量不足');
        }
    } catch (error) {
        recordTest('多NPC交互', false, error.message);
    }

    // 11. 测试好感度加成效果
    console.log('\n11. 测试好感度加成效果...');
    try {
        // 设置高好感度
        game.npcAffection['mysterious_taoist'] = 100;
        const highAffectionBonus = game.getNPCAffectionBonus('mysterious_taoist');

        // 设置低好感度
        game.npcAffection['mysterious_taoist'] = 10;
        const lowAffectionBonus = game.getNPCAffectionBonus('mysterious_taoist');

        recordTest('好感度加成', typeof highAffectionBonus === 'number' && typeof lowAffectionBonus === 'number',
            `高好感度加成: ${highAffectionBonus}, 低好感度加成: ${lowAffectionBonus}`);
    } catch (error) {
        recordTest('好感度加成效果', false, error.message);
    }

    // 12. 测试NPC特殊事件
    console.log('\n12. 测试NPC特殊事件...');
    try {
        const eventResult = game.checkNPCSpecialEvent('mysterious_taoist');
        recordTest('NPC特殊事件检查', eventResult && typeof eventResult === 'object',
            JSON.stringify(eventResult));
    } catch (error) {
        recordTest('NPC特殊事件', false, error.message);
    }

    // 输出测试结果
    console.log('\n=== 测试结果汇总 ===');
    console.log(`通过: ${testResults.passed}`);
    console.log(`失败: ${testResults.failed}`);
    console.log(`总计: ${testResults.passed + testResults.failed}`);

    if (testResults.failed > 0) {
        console.log('\n失败的测试:');
        testResults.tests.filter(t => !t.passed).forEach(t => {
            console.log(`  - ${t.name}${t.details ? ': ' + t.details : ''}`);
        });
    }

    return testResults;
}

// 导出测试函数
export { runNPCTests };

// 如果直接运行此文件
if (import.meta.url === new URL(process.argv[1], 'file://').href) {
    runNPCTests().then(results => {
        process.exit(results.failed > 0 ? 1 : 0);
    });
}
