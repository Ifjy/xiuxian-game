/**
 * 副本系统测试
 *
 * 测试内容：
 * - 可以获取可用副本列表
 * - 可以进入副本
 * - 副本战斗正常
 * - 副本奖励正确发放
 * - 多波次战斗正确
 * - 渡劫系统正常工作
 * - 副本进度保存
 * - 副本退出功能
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

async function runDungeonTests() {
    console.log('=== 副本系统测试 ===\n');

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
    game.isInDungeon = false;
    game.currentDungeon = null;
    game.dungeonProgress = {};
    recordTest('游戏初始化', game.character && game.character.name === '测试角色');

    // 2. 测试获取副本列表
    console.log('\n2. 测试获取副本列表...');
    try {
        const dungeons = game.getAvailableDungeons();
        recordTest('获取副本列表', Array.isArray(dungeons),
            `副本数量: ${dungeons.length}`);

        if (dungeons.length > 0) {
            console.log(`  可用副本: ${dungeons.map(d => d.name).join(', ')}`);
        }
    } catch (error) {
        recordTest('获取副本列表', false, error.message);
    }

    // 3. 测试进入副本
    console.log('\n3. 测试进入副本...');
    try {
        const dungeons = game.getAvailableDungeons();
        if (dungeons.length > 0) {
            const dungeonId = dungeons[0].id;
            const enterResult = game.enterDungeon(dungeonId);

            recordTest('进入副本', enterResult && typeof enterResult.success === 'boolean',
                JSON.stringify(enterResult));

            if (enterResult.success) {
                recordTest('副本状态设置', game.isInDungeon === true,
                    `是否在副本中: ${game.isInDungeon}`);

                recordTest('当前副本设置', game.currentDungeon === dungeonId,
                    `当前副本: ${game.currentDungeon}`);
            }
        } else {
            recordTest('进入副本', false, '没有可用的副本');
        }
    } catch (error) {
        recordTest('进入副本', false, error.message);
    }

    // 4. 测试副本探索
    console.log('\n4. 测试副本探索...');
    try {
        if (game.isInDungeon && game.currentDungeon) {
            const exploreResult = game.exploreDungeon();

            recordTest('副本探索', exploreResult && typeof exploreResult.success === 'boolean',
                JSON.stringify(exploreResult));

            if (exploreResult.success) {
                recordTest('探索结果存在', exploreResult.event || exploreResult.combat || exploreResult.reward,
                    `探索类型: ${exploreResult.event ? '事件' : exploreResult.combat ? '战斗' : exploreResult.reward ? '奖励' : '未知'}`);
            }
        } else {
            // 先进入副本
            const dungeons = game.getAvailableDungeons();
            if (dungeons.length > 0) {
                game.enterDungeon(dungeons[0].id);
                const exploreResult = game.exploreDungeon();
                recordTest('副本探索', exploreResult && typeof exploreResult.success === 'boolean',
                    JSON.stringify(exploreResult));
            } else {
                recordTest('副本探索', false, '没有可用的副本');
            }
        }
    } catch (error) {
        recordTest('副本探索', false, error.message);
    }

    // 5. 测试副本战斗
    console.log('\n5. 测试副本战斗...');
    try {
        if (game.isInDungeon) {
            const combatResult = game.fightInDungeon();

            recordTest('副本战斗', combatResult && typeof combatResult.success === 'boolean',
                JSON.stringify(combatResult));

            if (combatResult.success) {
                recordTest('战斗奖励', combatResult.rewards && Object.keys(combatResult.rewards).length > 0,
                    `奖励: ${JSON.stringify(combatResult.rewards)}`);
            }
        } else {
            recordTest('副本战斗', false, '未进入副本');
        }
    } catch (error) {
        recordTest('副本战斗', false, error.message);
    }

    // 6. 测试多波次战斗
    console.log('\n6. 测试多波次战斗...');
    try {
        // 获取支持多波次战斗的副本
        const dungeons = game.dungeons || game.config?.dungeons || {};
        const multiWaveDungeon = Object.values(dungeons).find(d => d.waves && d.waves.length > 0);

        if (multiWaveDungeon) {
            game.enterDungeon(multiWaveDungeon.id);
            const waveResult = game.startDungeonWaves();

            recordTest('多波次战斗', waveResult && typeof waveResult.success === 'boolean',
                JSON.stringify(waveResult));
        } else {
            recordTest('多波次战斗', false, '没有多波次副本');
        }
    } catch (error) {
        recordTest('多波次战斗', false, error.message);
    }

    // 7. 测试渡劫系统
    console.log('\n7. 测试渡劫系统...');
    try {
        // 设置准备渡劫的状态
        game.realm = '筑基期';
        game.level = 9;
        game.cultivation = game.maxCultivation;

        const tribulationResult = game.startTribulation('筑基期');

        recordTest('开始渡劫', tribulationResult && typeof tribulationResult.success === 'boolean',
            JSON.stringify(tribulationResult));

        if (tribulationResult.success) {
            recordTest('渡劫状态', tribulationResult.tribulationState || game.isInTribulation,
                '渡劫状态已设置');
        }
    } catch (error) {
        recordTest('渡劫系统', false, error.message);
    }

    // 8. 测试渡劫战斗
    console.log('\n8. 测试渡劫战斗...');
    try {
        if (game.isInTribulation || (game.tribulationState && game.tribulationState.active)) {
            const fightResult = game.fightTribulation();

            recordTest('渡劫战斗', fightResult && typeof fightResult.success === 'boolean',
                JSON.stringify(fightResult));

            if (fightResult.success) {
                recordTest('渡劫结果', fightResult.breakthroughSuccess !== undefined,
                    `突破成功: ${fightResult.breakthroughSuccess}`);
            }
        } else {
            recordTest('渡劫战斗', false, '未进入渡劫状态');
        }
    } catch (error) {
        recordTest('渡劫战斗', false, error.message);
    }

    // 9. 测试副本进度保存
    console.log('\n9. 测试副本进度保存...');
    try {
        if (game.isInDungeon && game.currentDungeon) {
            // 模拟一些进度
            game.dungeonProgress[game.currentDungeon] = {
                explored: 3,
                battles: 2,
                rewards: 1
            };

            const progress = game.getDungeonProgress(game.currentDungeon);
            recordTest('副本进度', progress && typeof progress === 'object',
                JSON.stringify(progress));
        } else {
            recordTest('副本进度', false, '未进入副本');
        }
    } catch (error) {
        recordTest('副本进度保存', false, error.message);
    }

    // 10. 测试退出副本
    console.log('\n10. 测试退出副本...');
    try {
        if (game.isInDungeon) {
            const exitResult = game.exitDungeon();

            recordTest('退出副本', exitResult && typeof exitResult.success === 'boolean',
                JSON.stringify(exitResult));

            if (exitResult.success) {
                recordTest('副本状态清除', !game.isInDungeon && !game.currentDungeon,
                    `在副本中: ${game.isInDungeon}, 当前副本: ${game.currentDungeon || '无'}`);
            }
        } else {
            recordTest('退出副本', false, '未进入副本');
        }
    } catch (error) {
        recordTest('退出副本', false, error.message);
    }

    // 11. 测试副本重复进入
    console.log('\n11. 测试副本重复进入...');
    try {
        const dungeons = game.getAvailableDungeons();
        if (dungeons.length > 0) {
            // 第一次进入
            game.enterDungeon(dungeons[0].id);
            const firstEnter = game.currentDungeon;

            // 退出
            game.exitDungeon();

            // 第二次进入
            game.enterDungeon(dungeons[0].id);
            const secondEnter = game.currentDungeon;

            recordTest('重复进入副本', firstEnter === secondEnter,
                `第一次: ${firstEnter}, 第二次: ${secondEnter}`);

            // 清理
            game.exitDungeon();
        } else {
            recordTest('重复进入副本', false, '没有可用的副本');
        }
    } catch (error) {
        recordTest('副本重复进入', false, error.message);
    }

    // 12. 测试副本奖励发放
    console.log('\n12. 测试副本奖励发放...');
    try {
        const beforeStones = game.spiritStones;
        const beforeCultivation = game.cultivation;

        // 进入副本并获得奖励
        const dungeons = game.getAvailableDungeons();
        if (dungeons.length > 0) {
            game.enterDungeon(dungeons[0].id);

            // 模拟获得奖励
            game.dungeonProgress[game.currentDungeon] = {
                explored: 5,
                completed: true
            };

            const rewardResult = game.claimDungeonRewards();

            recordTest('领取副本奖励', rewardResult && typeof rewardResult.success === 'boolean',
                JSON.stringify(rewardResult));

            if (rewardResult.success) {
                const afterStones = game.spiritStones;
                const afterCultivation = game.cultivation;

                const hasReward = afterStones > beforeStones || afterCultivation > beforeCultivation;
                recordTest('副本奖励获得', hasReward,
                    `灵石: ${beforeStones}→${afterStones}, 修为: ${beforeCultivation}→${afterCultivation}`);
            }

            game.exitDungeon();
        } else {
            recordTest('副本奖励发放', false, '没有可用的副本');
        }
    } catch (error) {
        recordTest('副本奖励发放', false, error.message);
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
export { runDungeonTests };

// 如果直接运行此文件
if (import.meta.url === new URL(process.argv[1], 'file://').href) {
    runDungeonTests().then(results => {
        process.exit(results.failed > 0 ? 1 : 0);
    });
}
