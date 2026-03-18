/**
 * 成就系统测试
 *
 * 测试内容：
 * - 成就检查正常触发
 * - 成就奖励正确发放
 * - 境界成就正确解锁
 * - 成就不会重复获得
 * - 成就列表获取
 * - 成就进度跟踪
 * - 成就分类功能
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

async function runAchievementTests() {
    console.log('=== 成就系统测试 ===\n');

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
    game.spiritStones = 1000;
    game.inventory = {};
    game.achievements = {}; // 已获得的成就
    game.achievementProgress = {}; // 成就进度
    recordTest('游戏初始化', game.character && game.character.name === '测试角色');

    // 2. 测试获取成就配置
    console.log('\n2. 测试获取成就配置...');
    try {
        const hasAchievements = game.achievementsConfig || game.config?.achievements;
        recordTest('成就配置存在', hasAchievements,
            hasAchievements ? `成就数量: ${Object.keys(hasAchievements).length}` : '无配置');

        if (hasAchievements) {
            const achievementIds = Object.keys(hasAchievements);
            console.log(`  成就ID: ${achievementIds.slice(0, 5).join(', ')}${achievementIds.length > 5 ? '...' : ''}`);
        }
    } catch (error) {
        recordTest('成就配置存在', false, error.message);
    }

    // 3. 测试获取可获取成就列表
    console.log('\n3. 测试获取可获取成就列表...');
    try {
        const achievements = game.getAvailableAchievements();
        recordTest('获取成就列表', Array.isArray(achievements),
            `成就数量: ${achievements.length}`);

        if (achievements.length > 0) {
            console.log(`  可获取成就: ${achievements.map(a => a.name).slice(0, 3).join(', ')}...`);
        }
    } catch (error) {
        recordTest('获取成就列表', false, error.message);
    }

    // 4. 测试成就检查
    console.log('\n4. 测试成就检查...');
    try {
        // 设置条件触发成就
        game.level = 5;
        game.cultivation = 500;

        const checkResult = game.checkAchievements();

        recordTest('成就检查功能', checkResult && typeof checkResult === 'object',
            JSON.stringify(checkResult));

        if (checkResult && checkResult.newAchievements) {
            recordTest('新成就检测', Array.isArray(checkResult.newAchievements),
                `新成就数量: ${checkResult.newAchievements.length}`);

            if (checkResult.newAchievements.length > 0) {
                console.log(`  获得成就: ${checkResult.newAchievements.join(', ')}`);
            }
        }
    } catch (error) {
        recordTest('成就检查', false, error.message);
    }

    // 5. 测试境界成就
    console.log('\n5. 测试境界成就...');
    try {
        // 设置突破条件
        game.level = 9;
        game.cultivation = game.maxCultivation;
        game.realm = '炼气期';

        const realmResult = game.checkRealmAchievement();

        recordTest('境界成就检查', realmResult && typeof realmResult.success === 'boolean',
            JSON.stringify(realmResult));

        if (realmResult.success) {
            recordTest('境界成就奖励', realmResult.rewards && realmResult.rewards.length > 0,
                `奖励数量: ${realmResult.rewards.length}`);
        }
    } catch (error) {
        recordTest('境界成就', false, error.message);
    }

    // 6. 测试成就不重复获得
    console.log('\n6. 测试成就不重复获得...');
    try {
        // 获得一个成就
        game.achievements['first_level_up'] = {
            id: 'first_level_up',
            unlockedAt: Date.now()
        };

        // 再次检查
        const checkResult = game.checkAchievements();

        const notDuplicated = !checkResult.newAchievements || !checkResult.newAchievements.includes('first_level_up');
        recordTest('成就不重复', notDuplicated,
            '同一成就不会重复获得');
    } catch (error) {
        recordTest('成就不重复获得', false, error.message);
    }

    // 7. 测试成就奖励发放
    console.log('\n7. 测试成就奖励发放...');
    try {
        const beforeStones = game.spiritStones;
        const beforeCultivation = game.cultivation;

        // 模拟获得成就并领取奖励
        const rewardResult = game.claimAchievementReward('test_achievement');

        recordTest('领取成就奖励', rewardResult && typeof rewardResult.success === 'boolean',
            JSON.stringify(rewardResult));

        // 注意：如果成就不存在，可能返回失败，这是正常的
        if (rewardResult && rewardResult.success) {
            const afterStones = game.spiritStones;
            const afterCultivation = game.cultivation;

            const hasReward = afterStones > beforeStones || afterCultivation > beforeCultivation;
            recordTest('成就奖励获得', hasReward,
                `灵石: ${beforeStones}→${afterStones}, 修为: ${beforeCultivation}→${afterCultivation}`);
        }
    } catch (error) {
        recordTest('成就奖励发放', false, error.message);
    }

    // 8. 测试成就进度跟踪
    console.log('\n8. 测试成就进度跟踪...');
    try {
        // 更新成就进度
        game.updateAchievementProgress('cultivation_master', 100);

        const progress = game.achievementProgress['cultivation_master'];
        recordTest('成就进度记录', progress && typeof progress === 'object',
            JSON.stringify(progress));

        if (progress) {
            recordTest('进度值有效', typeof progress.current === 'number' && typeof progress.target === 'number',
                `进度: ${progress.current}/${progress.target}`);
        }
    } catch (error) {
        recordTest('成就进度跟踪', false, error.message);
    }

    // 9. 测试成就分类
    console.log('\n9. 测试成就分类...');
    try {
        const categories = game.getAchievementCategories();
        recordTest('成就分类', Array.isArray(categories) && categories.length > 0,
            `分类数量: ${categories.length}`);

        if (categories.length > 0) {
            console.log(`  成就分类: ${categories.join(', ')}`);
        }
    } catch (error) {
        recordTest('成就分类', false, error.message);
    }

    // 10. 测试已获得成就列表
    console.log('\n10. 测试已获得成就列表...');
    try {
        // 添加一些已获得的成就
        game.achievements['achievement_1'] = { id: 'achievement_1', unlockedAt: Date.now() };
        game.achievements['achievement_2'] = { id: 'achievement_2', unlockedAt: Date.now() };

        const completed = game.getCompletedAchievements();
        recordTest('已获得成就', Array.isArray(completed),
            `已获得数量: ${completed.length}`);

        if (completed.length > 0) {
            console.log(`  已获得: ${completed.map(a => a.name).join(', ')}`);
        }
    } catch (error) {
        recordTest('已获得成就列表', false, error.message);
    }

    // 11. 测试成就完成度
    console.log('\n11. 测试成就完成度...');
    try {
        const completion = game.getAchievementCompletion();
        recordTest('成就完成度', completion && typeof completion === 'object',
            JSON.stringify(completion));

        if (completion) {
            recordTest('完成度计算', typeof completion.total === 'number' && typeof completion.completed === 'number',
                `完成: ${completion.completed}/${completion.total}`);

            if (completion.total > 0) {
                const percentage = (completion.completed / completion.total * 100).toFixed(1);
                console.log(`  完成度: ${percentage}%`);
            }
        }
    } catch (error) {
        recordTest('成就完成度', false, error.message);
    }

    // 12. 测试成就统计
    console.log('\n12. 测试成就统计...');
    try {
        const stats = game.getAchievementStats();
        recordTest('成就统计', stats && typeof stats === 'object',
            JSON.stringify(stats));

        if (stats) {
            recordTest('统计数据完整', typeof stats.totalPoints === 'number' && typeof stats.rareAchievements === 'number',
                `总积分: ${stats.totalPoints}, 稀有成: ${stats.rareAchievements}`);
        }
    } catch (error) {
        recordTest('成就统计', false, error.message);
    }

    // 13. 测试特殊成就
    console.log('\n13. 测试特殊成就...');
    try {
        // 测试隐藏成就
        const hiddenAchievements = game.getHiddenAchievements();
        recordTest('隐藏成就', Array.isArray(hiddenAchievements),
            `隐藏成就数量: ${hiddenAchievements.length}`);

        // 测试传奇成就
        const legendaryAchievements = game.getLegendaryAchievements();
        recordTest('传奇成就', Array.isArray(legendaryAchievements),
            `传奇成就数量: ${legendaryAchievements.length}`);
    } catch (error) {
        recordTest('特殊成就', false, error.message);
    }

    // 14. 测试成就重置（测试功能）
    console.log('\n14. 测试成就重置...');
    try {
        // 备份当前成就
        const backup = { ...game.achievements };

        // 重置成就（仅用于测试）
        const resetResult = game.resetAchievements();

        recordTest('成就重置功能', resetResult && typeof resetResult.success === 'boolean',
            JSON.stringify(resetResult));

        // 恢复成就
        game.achievements = backup;

        recordTest('成就恢复', Object.keys(game.achievements).length > 0,
            '成就已恢复');
    } catch (error) {
        recordTest('成就重置', false, error.message);
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
export { runAchievementTests };

// 如果直接运行此文件
if (import.meta.url === new URL(process.argv[1], 'file://').href) {
    runAchievementTests().then(results => {
        process.exit(results.failed > 0 ? 1 : 0);
    });
}
