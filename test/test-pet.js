/**
 * 宠物系统测试
 *
 * 测试内容：
 * - 可以设置当前宠物
 * - 宠物加成正确应用
 * - 宠物效果正确触发
 * - 宠物等级提升
 * - 宠物获取方式
 * - 宠物属性计算
 * - 宠物技能效果
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

async function runPetTests() {
    console.log('=== 宠物系统测试 ===\n');

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
    game.inventory = { '聚气丹': 10 };
    game.pets = {}; // 初始化宠物数据
    game.currentPet = null; // 当前宠物
    recordTest('游戏初始化', game.character && game.character.name === '测试角色');

    // 2. 测试获取宠物配置
    console.log('\n2. 测试获取宠物配置...');
    try {
        const hasPetConfig = game.config && game.config.pets;
        recordTest('宠物配置存在', hasPetConfig,
            hasPetConfig ? `宠物数量: ${Object.keys(game.config.pets).length}` : '无配置');

        if (hasPetConfig) {
            const petNames = Object.keys(game.config.pets);
            console.log(`  可用宠物: ${petNames.join(', ')}`);
        }
    } catch (error) {
        recordTest('宠物配置存在', false, error.message);
    }

    // 3. 测试获取宠物
    console.log('\n3. 测试获取宠物...');
    try {
        // 添加一个宠物到背包
        game.pets['灵猫'] = { level: 1, experience: 0 };

        const hasPet = '灵猫' in game.pets;
        recordTest('获取宠物', hasPet,
            `宠物数据: ${JSON.stringify(game.pets['灵猫'])}`);
    } catch (error) {
        recordTest('获取宠物', false, error.message);
    }

    // 4. 测试设置当前宠物
    console.log('\n4. 测试设置当前宠物...');
    try {
        const result = game.setCurrentPet('灵猫');
        recordTest('设置当前宠物', result && typeof result.success === 'boolean',
            JSON.stringify(result));

        if (result.success) {
            recordTest('当前宠物设置', game.currentPet === '灵猫',
                `当前宠物: ${game.currentPet}`);
        }
    } catch (error) {
        recordTest('设置当前宠物', false, error.message);
    }

    // 5. 测试宠物加成
    console.log('\n5. 测试宠物加成...');
    try {
        if (game.currentPet) {
            const bonus = game.getPetBonus();
            recordTest('获取宠物加成', bonus && typeof bonus === 'object',
                JSON.stringify(bonus));

            if (bonus) {
                // 验证加成字段
                const hasValidBonus = bonus.cultivation || bonus.luck || bonus.combat;
                recordTest('宠物加成有效', hasValidBonus,
                    `修炼加成: ${bonus.cultivation || 0}, 幸运加成: ${bonus.luck || 0}`);
            }
        } else {
            recordTest('宠物加成', false, '没有当前宠物');
        }
    } catch (error) {
        recordTest('宠物加成', false, error.message);
    }

    // 6. 测试宠物等级提升
    console.log('\n6. 测试宠物等级提升...');
    try {
        if (game.currentPet && game.pets[game.currentPet]) {
            const beforeLevel = game.pets[game.currentPet].level;

            // 添加经验
            game.pets[game.currentPet].experience = 100;

            const levelUpResult = game.levelUpPet(game.currentPet);

            recordTest('宠物升级功能', levelUpResult && typeof levelUpResult.success === 'boolean',
                JSON.stringify(levelUpResult));

            if (levelUpResult.success) {
                const afterLevel = game.pets[game.currentPet].level;
                recordTest('宠物等级提升', afterLevel > beforeLevel,
                    `之前: ${beforeLevel}, 之后: ${afterLevel}`);
            }
        } else {
            recordTest('宠物等级提升', false, '没有当前宠物');
        }
    } catch (error) {
        recordTest('宠物等级提升', false, error.message);
    }

    // 7. 测试宠物效果触发
    console.log('\n7. 测试宠物效果触发...');
    try {
        if (game.currentPet) {
            // 测试宠物被动效果
            const effect = game.triggerPetEffect('cultivation');
            recordTest('宠物效果触发', effect && typeof effect === 'object',
                JSON.stringify(effect));
        } else {
            recordTest('宠物效果触发', false, '没有当前宠物');
        }
    } catch (error) {
        recordTest('宠物效果触发', false, error.message);
    }

    // 8. 测试宠物属性计算
    console.log('\n8. 测试宠物属性计算...');
    try {
        if (game.currentPet && game.pets[game.currentPet]) {
            const stats = game.getPetStats(game.currentPet);
            recordTest('获取宠物属性', stats && typeof stats === 'object',
                JSON.stringify(stats));

            if (stats) {
                recordTest('宠物属性完整', stats.level && stats.experience && stats.affection,
                    `等级: ${stats.level}, 经验: ${stats.experience}, 好感度: ${stats.affection}`);
            }
        } else {
            recordTest('宠物属性计算', false, '没有当前宠物');
        }
    } catch (error) {
        recordTest('宠物属性计算', false, error.message);
    }

    // 9. 测试宠物技能
    console.log('\n9. 测试宠物技能...');
    try {
        if (game.currentPet) {
            const skills = game.getPetSkills(game.currentPet);
            recordTest('获取宠物技能', Array.isArray(skills),
                `技能数量: ${skills.length}`);

            if (skills.length > 0) {
                console.log(`  宠物技能: ${skills.join(', ')}`);
            }
        } else {
            recordTest('宠物技能', false, '没有当前宠物');
        }
    } catch (error) {
        recordTest('宠物技能', false, error.message);
    }

    // 10. 测试宠物好感度
    console.log('\n10. 测试宠物好感度...');
    try {
        if (game.currentPet && game.pets[game.currentPet]) {
            const beforeAffection = game.pets[game.currentPet].affection || 0;

            // 增加好感度
            game.increasePetAffection(game.currentPet, 10);

            const afterAffection = game.pets[game.currentPet].affection || 0;

            recordTest('宠物好感度增加', afterAffection > beforeAffection,
                `之前: ${beforeAffection}, 之后: ${afterAffection}`);
        } else {
            recordTest('宠物好感度', false, '没有当前宠物');
        }
    } catch (error) {
        recordTest('宠物好感度', false, error.message);
    }

    // 11. 测试宠物喂养
    console.log('\n11. 测试宠物喂养...');
    try {
        if (game.currentPet) {
            const beforeInventory = game.inventory['聚气丹'];

            const feedResult = game.feedPet(game.currentPet, '聚气丹');

            recordTest('喂养宠物', feedResult && typeof feedResult.success === 'boolean',
                JSON.stringify(feedResult));

            if (feedResult.success) {
                const afterInventory = game.inventory['聚气丹'];
                recordTest('食物消耗', afterInventory < beforeInventory,
                    `之前: ${beforeInventory}, 之后: ${afterInventory}`);
            }
        } else {
            recordTest('宠物喂养', false, '没有当前宠物');
        }
    } catch (error) {
        recordTest('宠物喂养', false, error.message);
    }

    // 12. 测试多宠物管理
    console.log('\n12. 测试多宠物管理...');
    try {
        // 添加多个宠物
        game.pets['灵狐'] = { level: 1, experience: 0 };
        game.pets['灵鹤'] = { level: 2, experience: 50 };

        const petCount = Object.keys(game.pets).length;
        recordTest('多宠物拥有', petCount >= 3,
            `宠物数量: ${petCount}`);

        // 切换宠物
        const switchResult = game.setCurrentPet('灵狐');
        if (switchResult.success) {
            recordTest('切换宠物', game.currentPet === '灵狐',
                `当前宠物: ${game.currentPet}`);
        }
    } catch (error) {
        recordTest('多宠物管理', false, error.message);
    }

    // 13. 测试宠物解除
    console.log('\n13. 测试宠物解除...');
    try {
        if (game.currentPet) {
            const releaseResult = game.releasePet(game.currentPet);
            recordTest('解除宠物', releaseResult && typeof releaseResult.success === 'boolean',
                JSON.stringify(releaseResult));

            if (releaseResult.success) {
                recordTest('宠物移除', !game.pets[game.currentPet] && !game.currentPet,
                    '宠物已解除');
            }
        } else {
            recordTest('宠物解除', false, '没有当前宠物');
        }
    } catch (error) {
        recordTest('宠物解除', false, error.message);
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
export { runPetTests };

// 如果直接运行此文件
if (import.meta.url === new URL(process.argv[1], 'file://').href) {
    runPetTests().then(results => {
        process.exit(results.failed > 0 ? 1 : 0);
    });
}
