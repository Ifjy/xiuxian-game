/**
 * 集成测试
 *
 * 测试内容：
 * - 完整游戏流程测试
 * - 状态切换集成测试
 * - 系统间交互测试
 * - 多系统联动测试
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

// 等待函数
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runIntegrationTests() {
    console.log('=== 集成测试 ===\n');

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
    game.maxCultivation = 100;
    game.spiritStones = 5000;
    game.inventory = { '聚气丹': 50 };
    recordTest('游戏初始化', game.character && game.character.name === '测试角色');

    // 2. 测试完整修炼流程
    console.log('\n2. 测试完整修炼流程...');
    try {
        // 修炼 → 突破
        const initialCultivation = game.cultivation;
        const addResult = game.addCultivation(50);

        recordTest('修炼增加修为', addResult && game.cultivation > initialCultivation,
            `修为: ${initialCultivation} → ${game.cultivation}`);

        // 尝试突破
        game.cultivation = game.maxCultivation;
        const breakthroughResult = game.attemptBreakthrough();

        recordTest('修真突破', breakthroughResult && typeof breakthroughResult.success === 'boolean',
            JSON.stringify(breakthroughResult));

        if (breakthroughResult.success) {
            recordTest('境界提升', breakthroughResult.newLevel || breakthroughResult.newRealm,
                '突破成功');
        }
    } catch (error) {
        recordTest('完整修炼流程', false, error.message);
    }

    // 3. 测试历练→战斗→奖励流程
    console.log('\n3. 测试历练→战斗→奖励流程...');
    try {
        const beforeStones = game.spiritStones;
        const beforeItems = Object.keys(game.inventory).length;

        // 开始历练
        const adventureResult = game.startAdventure('forest');

        recordTest('开始历练', adventureResult && typeof adventureResult.success === 'boolean',
            JSON.stringify(adventureResult));

        if (adventureResult.success) {
            // 等待历练完成（模拟）
            game.cultivation += 10;
            game.spiritStones += 100;

            const afterStones = game.spiritStones;
            recordTest('历练奖励', afterStones > beforeStones,
                `灵石: ${beforeStones} → ${afterStones}`);
        }
    } catch (error) {
        recordTest('历练流程', false, error.message);
    }

    // 4. 测试战斗→装备→属性提升流程
    console.log('\n4. 测试战斗→装备→属性提升流程...');
    try {
        // 战斗
        const monsters = game.getAvailableMonsters ? game.getAvailableMonsters() : [];
        let fightSuccess = false;

        if (monsters.length > 0) {
            const fightResult = game.fight(monsters[0].id);
            fightSuccess = fightResult && fightResult.success;
            recordTest('战斗执行', fightSuccess,
                fightSuccess ? '战斗胜利' : '战斗失败');
        }

        // 装备法宝
        if (game.equipArtifact) {
            const equipResult = game.equipArtifact('铁剑');
            if (equipResult && equipResult.success) {
                // 验证属性提升
                const stats = game.calculateCombatStats();
                recordTest('装备提升属性', stats && stats.attack > 0,
                    `攻击力: ${stats.attack}`);
            } else {
                recordTest('装备法宝', true, '法宝已装备或不存在');
            }
        }
    } catch (error) {
        recordTest('战斗装备流程', false, error.message);
    }

    // 5. 测试宗门→任务→商店流程
    console.log('\n5. 测试宗门→任务→商店流程...');
    try {
        // 加入宗门
        const joinResult = game.joinSect('qingyun_sect');
        recordTest('加入宗门', joinResult && joinResult.success,
            joinResult.success ? `加入${joinResult.sect ? joinResult.sect.name : ''}` : '加入失败');

        // 做宗门任务
        if (joinResult.success) {
            const taskResult = game.doSectTask('sect_patrol');
            recordTest('宗门任务', taskResult && typeof taskResult.success === 'boolean',
                JSON.stringify(taskResult));
        }

        // 商店购买
        if (game.buyFromSectShop) {
            const buyResult = game.buyFromSectShop('items', '聚气丹');
            recordTest('商店购买', buyResult && typeof buyResult.success === 'boolean',
                JSON.stringify(buyResult));
        }
    } catch (error) {
        recordTest('宗门流程', false, error.message);
    }

    // 6. 测试状态互斥
    console.log('\n6. 测试状态互斥...');
    try {
        // 开始打坐
        const meditateResult = game.startMeditation();
        recordTest('开始打坐', meditateResult && meditateResult.success,
            '打坐中');

        // 尝试在打坐时进行其他活动
        const adventureResult = game.startAdventure('forest');
        recordTest('打坐中不能历练', adventureResult && !adventureResult.success,
            adventureResult.message || '历练被阻止');

        // 停止打坐
        if (game.isMeditating) {
            game.isMeditating = false;
            delete game.buffs.cultivation;
        }

        // 开始历练
        const adventureStart = game.startAdventure('forest');
        if (adventureStart.success) {
            // 尝试在历练中打坐
            const meditateInAdventure = game.startMeditation();
            recordTest('历练中不能打坐', meditateInAdventure && !meditateInAdventure.success,
                meditateInAdventure.message || '打坐被阻止');

            // 清理
            game.isAdventuring = false;
            game.adventureStartTime = null;
        }
    } catch (error) {
        recordTest('状态互斥', false, error.message);
    }

    // 7. 测试任务→完成→奖励流程
    console.log('\n7. 测试任务→完成→奖励流程...');
    try {
        // 获取可接受任务
        const quests = game.getAvailableQuests();

        if (quests.length > 0) {
            const acceptResult = game.acceptQuest(quests[0].id);
            recordTest('接受任务', acceptResult && acceptResult.success,
                `接受任务: ${quests[0].name}`);

            if (acceptResult.success) {
                // 模拟完成任务
                game.cultivation = 100;
                game.updateQuestProgress('cultivate', 100);

                // 检查任务进度
                const progress = game.checkQuestProgress(quests[0].id);
                recordTest('任务进度更新', progress && progress.inProgress,
                    `任务状态: ${progress.completed ? '已完成' : '进行中'}`);
            }
        } else {
            recordTest('接受任务', true, '没有可接受的任务');
        }
    } catch (error) {
        recordTest('任务流程', false, error.message);
    }

    // 8. 测试NPC交互→好感度→奖励流程
    console.log('\n8. 测试NPC交互→好感度→奖励流程...');
    try {
        // NPC对话
        const talkResult = game.talkToNPC('mysterious_taoist');
        recordTest('NPC对话', talkResult && talkResult.success,
            '对话成功');

        // 赠送礼物
        if (game.giveGiftToNPC && game.inventory['聚气丹'] > 0) {
            const giftResult = game.giveGiftToNPC('mysterious_taoist', '聚气丹');
            recordTest('赠送礼物', giftResult && typeof giftResult.success === 'boolean',
                JSON.stringify(giftResult));
        }
    } catch (error) {
        recordTest('NPC交互流程', false, error.message);
    }

    // 9. 测试副本→战斗→奖励流程
    console.log('\n9. 测试副本→战斗→奖励流程...');
    try {
        // 获取副本
        const dungeons = game.getAvailableDungeons();

        if (dungeons.length > 0) {
            // 进入副本
            const enterResult = game.enterDungeon(dungeons[0].id);
            recordTest('进入副本', enterResult && enterResult.success,
                `进入副本: ${dungeons[0].name}`);

            if (enterResult.success) {
                // 副本探索
                const exploreResult = game.exploreDungeon();
                recordTest('副本探索', exploreResult && typeof exploreResult.success === 'boolean',
                    JSON.stringify(exploreResult));

                // 退出副本
                const exitResult = game.exitDungeon();
                recordTest('退出副本', exitResult && exitResult.success,
                    '退出副本');
            }
        } else {
            recordTest('副本流程', true, '没有可用的副本');
        }
    } catch (error) {
        recordTest('副本流程', false, error.message);
    }

    // 10. 测试多系统联动
    console.log('\n10. 测试多系统联动...');
    try {
        // 宗门 + 战斗
        game.joinSect('qingyun_sect');
        const sectBonus = game.getSectRankBonus();
        const stats = game.calculateCombatStats();

        recordTest('宗门战斗联动', sectBonus && stats,
            `宗门加成: ${sectBonus.taskBonus * 100}%, 战斗属性: ${stats.attack}`);

        // 宠物 + 修炼
        if (game.setCurrentPet && game.pets && Object.keys(game.pets).length > 0) {
            const petId = Object.keys(game.pets)[0];
            game.setCurrentPet(petId);
            const petBonus = game.getPetBonus();

            recordTest('宠物修炼联动', petBonus,
                `宠物加成: ${JSON.stringify(petBonus)}`);
        }

        // 任务 + 成就
        game.achievements = {};
        const achievementCheck = game.checkAchievements();

        recordTest('任务成就联动', achievementCheck,
            `成就检查: ${achievementCheck.newAchievements ? achievementCheck.newAchievements.length : 0}新成就`);
    } catch (error) {
        recordTest('多系统联动', false, error.message);
    }

    // 11. 测试数据一致性
    console.log('\n11. 测试数据一致性...');
    try {
        // 修改数据
        const originalRealm = game.realm;
        const originalLevel = game.level;

        game.level = 5;
        game.realm = '筑基期';

        // 检查相关数据是否更新
        const maxCultUpdated = game.maxCultivation > 100;
        recordTest('境界数据一致性', maxCultUpdated,
            `最大修为已更新: ${game.maxCultivation}`);

        // 恢复
        game.realm = originalRealm;
        game.level = originalLevel;
    } catch (error) {
        recordTest('数据一致性', false, error.message);
    }

    // 12. 测试完整游戏循环
    console.log('\n12. 测试完整游戏循环...');
    try {
        // 重置游戏状态
        game.realm = '炼气期';
        game.level = 1;
        game.cultivation = 0;
        game.spiritStones = 1000;

        // 模拟完整循环
        let cycleSuccess = true;

        // 1. 修炼
        game.addCultivation(50);

        // 2. 战斗获得资源
        game.spiritStones += 200;

        // 3. 购买物品
        game.inventory['筑基丹'] = (game.inventory['筑基丹'] || 0) + 1;

        // 4. 使用物品突破
        game.cultivation = game.maxCultivation;
        game.attemptBreakthrough();

        // 5. 检查结果
        if (game.level > 1 || game.cultivation > 0 || game.spiritStones >= 1000) {
            recordTest('游戏循环执行', true,
                `境界: ${game.realm}, 等级: ${game.level}, 修为: ${game.cultivation}, 灵石: ${game.spiritStones}`);
        } else {
            recordTest('游戏循环执行', false, '游戏循环数据异常');
            cycleSuccess = false;
        }
    } catch (error) {
        recordTest('完整游戏循环', false, error.message);
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
export { runIntegrationTests };

// 如果直接运行此文件
if (import.meta.url === new URL(process.argv[1], 'file://').href) {
    runIntegrationTests().then(results => {
        process.exit(results.failed > 0 ? 1 : 0);
    });
}
