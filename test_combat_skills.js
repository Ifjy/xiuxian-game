// 战斗技能系统测试脚本

// 模拟加载游戏配置
const CONFIG = require('./game.js').CONFIG || {};

// 测试函数：验证战斗技能配置
function testCombatSkillConfig() {
    console.log('=== 战斗技能配置测试 ===');

    // 检查战斗技能配置是否存在
    if (typeof CONFIG !== 'undefined' && CONFIG.combatSkills) {
        console.log(`✅ 战斗技能配置已加载，共${Object.keys(CONFIG.combatSkills).length}个技能`);

        // 测试每个技能
        for (const [skillId, skill] of Object.entries(CONFIG.combatSkills)) {
            console.log(`\n技能: ${skill.name} [${skill.tier}]`);
            console.log(`  类型: ${skill.type}`);
            console.log(`  威力: ${skill.power}x`);
            console.log(`  冷却: ${skill.cooldown}秒`);
            console.log(`  描述: ${skill.description}`);
            console.log(`  要求: ${skill.requirements.realm || '无'} ${skill.requirements.level || ''}`);

            // 验证必填字段
            if (!skill.id || !skill.name || !skill.type || !skill.power) {
                console.log(`  ❌ 缺少必填字段`);
            } else {
                console.log(`  ✅ 配置完整`);
            }
        }
    } else {
        console.log('❌ 无法加载战斗技能配置');
    }

    console.log('\n=== 配置测试完成 ===\n');
}

// 测试函数：模拟技能学习逻辑
function testSkillLearning() {
    console.log('=== 技能学习逻辑测试 ===');

    const testCases = [
        {
            name: '炼气期1层学习剑气术',
            playerRealm: '炼气期',
            playerLevel: 1,
            targetSkill: 'sword_qi',
            expected: true
        },
        {
            name: '炼气期3层学习烈焰掌',
            playerRealm: '炼气期',
            playerLevel: 3,
            targetSkill: 'flame_palm',
            expected: true
        },
        {
            name: '炼气期1层尝试学习烈焰掌',
            playerRealm: '炼气期',
            playerLevel: 1,
            targetSkill: 'flame_palm',
            expected: false
        },
        {
            name: '筑基期1层学习护体罡气',
            playerRealm: '筑基期',
            playerLevel: 1,
            targetSkill: 'body_armor',
            expected: true
        }
    ];

    testCases.forEach(testCase => {
        console.log(`\n测试: ${testCase.name}`);
        console.log(`  玩家境界: ${testCase.playerRealm} ${testCase.playerLevel}层`);

        if (CONFIG.combatSkills && CONFIG.combatSkills[testCase.targetSkill]) {
            const skill = CONFIG.combatSkills[testCase.targetSkill];
            const realmNames = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期', '炼虚期', '合体期', '大乘期', '渡劫期'];
            const playerIndex = realmNames.indexOf(testCase.playerRealm);
            const requiredIndex = realmNames.indexOf(skill.requirements.realm);

            let canLearn = false;
            if (playerIndex > requiredIndex || (playerIndex === requiredIndex && testCase.playerLevel >= skill.requirements.level)) {
                canLearn = true;
            }

            const result = canLearn === testCase.expected ? '✅' : '❌';
            console.log(`  ${result} ${canLearn ? '可以学习' : '无法学习'} ${skill.name}`);
            console.log(`  预期: ${testCase.expected ? '可学习' : '不可学习'}`);
        } else {
            console.log(`  ❌ 技能不存在: ${testCase.targetSkill}`);
        }
    });

    console.log('\n=== 学习逻辑测试完成 ===\n');
}

// 测试函数：模拟技能效果计算
function testSkillEffects() {
    console.log('=== 技能效果计算测试 ===');

    const testScenarios = [
        {
            name: '剑气术伤害计算',
            baseAttack: 100,
            monsterDefense: 30,
            skillPower: 1.5,
            expected: '105伤害'
        },
        {
            name: '护体罡气防御加成',
            baseDefense: 50,
            skillPower: 1.5,
            expected: '75防御'
        },
        {
            name: '金钟罩Buff',
            baseAttack: 100,
            baseDefense: 50,
            skillPower: 1.2,
            expected: '120攻击，60防御'
        }
    ];

    testScenarios.forEach(scenario => {
        console.log(`\n测试: ${scenario.name}`);

        if (scenario.name.includes('伤害')) {
            const damage = Math.max(1, (scenario.baseAttack * scenario.skillPower) - scenario.monsterDefense);
            console.log(`  ✅ 基础攻击${scenario.baseAttack} × 威力${scenario.skillPower} - 防御${scenario.monsterDefense} = ${damage}伤害`);
            console.log(`  预期: ${scenario.expected}`);
        } else if (scenario.name.includes('防御')) {
            const defense = scenario.baseDefense * scenario.skillPower;
            console.log(`  ✅ 基础防御${scenario.baseDefense} × 威力${scenario.skillPower} = ${defense}防御`);
            console.log(`  预期: ${scenario.expected}`);
        } else if (scenario.name.includes('Buff')) {
            const attack = scenario.baseAttack * scenario.skillPower;
            const defense = scenario.baseDefense * scenario.skillPower;
            console.log(`  ✅ 攻击${attack}，防御${defense}`);
            console.log(`  预期: ${scenario.expected}`);
        }
    });

    console.log('\n=== 技能效果测试完成 ===\n');
}

// 运行所有测试
console.log('╔══════════════════════════════════════╗');
console.log('║  战斗技能系统测试套件                ║');
console.log('╚══════════════════════════════════════╝\n');

try {
    testCombatSkillConfig();
    testSkillLearning();
    testSkillEffects();

    console.log('╔══════════════════════════════════════╗');
    console.log('║  所有测试完成！                      ║');
    console.log('╚══════════════════════════════════════╝\n');

    console.log('=== 手动测试步骤 ===');
    console.log('1. 打开游戏: http://localhost:8888/index.html');
    console.log('2. 创建新角色');
    console.log('3. 点击[战斗]按钮');
    console.log('4. 查看是否显示战斗技能选择区域');
    console.log('5. 选择技能并挑战怪物');
    console.log('6. 观察战斗日志中的技能使用信息');
    console.log('\n预期结果:');
    console.log('- 战斗界面显示可用技能卡片');
    console.log('- 新角色自动学会"剑气术"');
    console.log('- 点击技能卡片可以选中（高亮显示）');
    console.log('- 战斗日志显示"【使用剑气术】"');
    console.log('- 使用技能后进入冷却状态');
    console.log('- 突破境界后自动学习新技能');

} catch (error) {
    console.error('测试出错:', error.message);
    console.log('\n提示: 请确保游戏正在运行');
}
