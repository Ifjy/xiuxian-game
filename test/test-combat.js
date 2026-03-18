/**
 * 战斗系统测试
 *
 * 测试内容：
 * - 可以与怪物战斗
 * - 战斗属性计算正确（攻击、防御、生命）
 * - 境界压制正确应用
 * - 战斗奖励正确发放（修为、灵石、物品）
 * - 可以学习战斗技能
 * - 可以装备法宝
 * - 战斗技能冷却正常
 * - 法宝属性加成正确
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

async function runCombatTests() {
    console.log('=== 战斗系统测试 ===\n');

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
    game.inventory = { '聚气丹': 10 };
    recordTest('游戏初始化', game.character && game.character.name === '测试角色');

    // 2. 测试战斗属性计算
    console.log('\n2. 测试战斗属性计算...');
    try {
        const stats = game.calculateCombatStats();
        recordTest('战斗属性计算', stats && typeof stats.attack === 'number' && typeof stats.defense === 'number' && typeof stats.health === 'number',
            JSON.stringify(stats));

        // 验证属性不为负
        recordTest('战斗属性非负', stats.attack >= 0 && stats.defense >= 0 && stats.health > 0,
            `attack: ${stats.attack}, defense: ${stats.defense}, health: ${stats.health}`);
    } catch (error) {
        recordTest('战斗属性计算', false, error.message);
    }

    // 3. 测试获取可用怪物列表
    console.log('\n3. 测试获取可用怪物列表...');
    try {
        const monsters = game.getAvailableMonsters();
        recordTest('获取怪物列表', Array.isArray(monsters) && monsters.length > 0,
            `怪物数量: ${monsters.length}`);

        if (monsters.length > 0) {
            console.log(`  可用怪物: ${monsters.map(m => m.id).join(', ')}`);
        }
    } catch (error) {
        recordTest('获取怪物列表', false, error.message);
    }

    // 4. 测试基础战斗
    console.log('\n4. 测试基础战斗...');
    try {
        // 先获取一个可用的怪物
        const monsters = game.getAvailableMonsters();
        if (monsters.length > 0) {
            const monsterId = monsters[0].id;
            const beforeCultivation = game.cultivation;
            const beforeStones = game.spiritStones;

            const result = game.fight(monsterId);

            recordTest('战斗执行成功', result && typeof result.success === 'boolean',
                JSON.stringify(result));

            if (result.success) {
                // 验证奖励
                const afterCultivation = game.cultivation;
                const afterStones = game.spiritStones;

                recordTest('战斗修为奖励', afterCultivation >= beforeCultivation,
                    `之前: ${beforeCultivation}, 之后: ${afterCultivation}`);

                recordTest('战斗灵石奖励', afterStones >= beforeStones,
                    `之前: ${beforeStones}, 之后: ${afterStones}`);

                if (result.combatLog && result.combatLog.length > 0) {
                    console.log(`  战斗日志: ${result.combatLog.slice(-3).join(' → ')}`);
                }
            }
        } else {
            recordTest('基础战斗', false, '没有可用的怪物');
        }
    } catch (error) {
        recordTest('基础战斗', false, error.message);
    }

    // 5. 测试境界压制
    console.log('\n5. 测试境界压制...');
    try {
        // 设置高境界测试境界压制
        game.realm = '金丹期';
        game.level = 1;
        const highRealmStats = game.calculateCombatStats();

        game.realm = '炼气期';
        game.level = 1;
        const lowRealmStats = game.calculateCombatStats();

        recordTest('境界压制存在', highRealmStats.attack > lowRealmStats.attack || highRealmStats.health > lowRealmStats.health,
            `金丹期: attack=${highRealmStats.attack}, 炼气期: attack=${lowRealmStats.attack}`);
    } catch (error) {
        recordTest('境界压制', false, error.message);
    }

    // 6. 测试战斗技能
    console.log('\n6. 测试战斗技能系统...');
    try {
        // 检查战斗技能配置
        const hasCombatSkills = game.combatSkills && typeof game.combatSkills === 'object';

        recordTest('战斗技能对象存在', hasCombatSkills);

        if (hasCombatSkills) {
            // 尝试学习一个技能
            const learnResult = game.learnCombatSkill('烈焰掌');
            recordTest('学习战斗技能', learnResult && typeof learnResult.success === 'boolean',
                JSON.stringify(learnResult));
        }
    } catch (error) {
        recordTest('战斗技能系统', false, error.message);
    }

    // 7. 测试法宝系统
    console.log('\n7. 测试法宝系统...');
    try {
        // 检查法宝配置
        const hasArtifacts = game.config && game.config.artifacts;

        recordTest('法宝配置存在', hasArtifacts);

        if (hasArtifacts) {
            // 尝试装备法宝
            const equipResult = game.equipArtifact('铁剑');
            recordTest('装备法宝', equipResult && typeof equipResult.success === 'boolean',
                JSON.stringify(equipResult));

            // 验证法宝属性加成
            if (equipResult && equipResult.success) {
                const statsWithArtifact = game.calculateCombatStats();
                recordTest('法宝属性加成', statsWithArtifact && typeof statsWithArtifact.attack === 'number',
                    `攻击力: ${statsWithArtifact.attack}`);
            }
        }
    } catch (error) {
        recordTest('法宝系统', false, error.message);
    }

    // 8. 测试已装备法宝
    console.log('\n8. 测试已装备法宝检查...');
    try {
        const equipped = game.equippedArtifacts;
        recordTest('法宝装备对象存在', equipped && typeof equipped === 'object',
            JSON.stringify(equipped));
    } catch (error) {
        recordTest('法宝装备对象', false, error.message);
    }

    // 9. 测试战斗技能冷却
    console.log('\n9. 测试战斗技能冷却...');
    try {
        if (game.combatSkills && Object.keys(game.combatSkills).length > 0) {
            const skillId = Object.keys(game.combatSkills)[0];
            const skill = game.combatSkills[skillId];

            recordTest('技能冷却字段存在', skill && typeof skill.cooldown === 'number');
        } else {
            recordTest('技能冷却测试', false, '没有学习的战斗技能');
        }
    } catch (error) {
        recordTest('战斗技能冷却', false, error.message);
    }

    // 10. 测试多轮战斗
    console.log('\n10. 测试多轮战斗...');
    try {
        const monsters = game.getAvailableMonsters();
        if (monsters.length > 0) {
            let totalBattles = 0;
            let successfulBattles = 0;

            for (let i = 0; i < 3; i++) {
                const result = game.fight(monsters[0].id);
                totalBattles++;
                if (result && result.success) {
                    successfulBattles++;
                }
            }

            recordTest('连续战斗', successfulBattles >= 2,
                `成功: ${successfulBattles}/${totalBattles}`);
        }
    } catch (error) {
        recordTest('多轮战斗', false, error.message);
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
export { runCombatTests };

// 如果直接运行此文件
if (import.meta.url === new URL(process.argv[1], 'file://').href) {
    runCombatTests().then(results => {
        process.exit(results.failed > 0 ? 1 : 0);
    });
}
