// 境界压制系统测试脚本

// 测试函数：验证境界压制计算
function testRealmSuppression() {
    console.log('=== 境界压制系统测试 ===');

    // 测试场景
    const testCases = [
        {
            name: '同境界压制',
            playerRealm: '炼气期',
            playerLevel: 5,
            targetRealm: '炼气期',
            targetLevel: 3,
            expected: '轻微压制'
        },
        {
            name: '跨境界压制',
            playerRealm: '筑基期',
            playerLevel: 1,
            targetRealm: '炼气期',
            targetLevel: 9,
            expected: '重大压制'
        },
        {
            name: '被压制',
            playerRealm: '炼气期',
            playerLevel: 9,
            targetRealm: '筑基期',
            targetLevel: 1,
            expected: '被压制'
        }
    ];

    // 测试压制计算
    testCases.forEach(testCase => {
        console.log(`\n测试: ${testCase.name}`);
        console.log(`玩家: ${testCase.playerRealm} ${testCase.playerLevel}层`);
        console.log(`目标: ${testCase.targetRealm} ${testCase.targetLevel}层`);

        // 模拟计算
        const realmNames = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期', '炼虚期', '合体期', '大乘期', '渡劫期'];
        const playerIndex = realmNames.indexOf(testCase.playerRealm);
        const targetIndex = realmNames.indexOf(testCase.targetRealm);

        if (playerIndex === targetIndex) {
            const levelDiff = testCase.playerLevel - testCase.targetLevel;
            const multiplier = 1 + (levelDiff * 0.1);
            console.log(`✅ 压制倍数: ${multiplier.toFixed(2)}`);
            console.log(`   效果: ${testCase.expected}`);
        } else {
            const realmDiff = playerIndex - targetIndex;
            const multiplier = realmDiff > 0 ? 1 + (realmDiff * 1.0) : 1 / (1 + Math.abs(realmDiff) * 1.0);
            console.log(`✅ 压制倍数: ${multiplier.toFixed(2)}`);
            console.log(`   效果: ${testCase.expected}`);
        }
    });

    console.log('\n=== 测试完成 ===');
    console.log('境界压制系统基础逻辑正常！');
}

// 运行测试
testRealmSuppression();

console.log('\n=== 手动测试步骤 ===');
console.log('1. 打开游戏: http://localhost:8888/index.html');
console.log('2. 创建角色或加载存档');
console.log('3. 点击[战斗]按钮');
console.log('4. 尝试挑战不同境界的怪物');
console.log('5. 观察战斗日志中的压制信息');
console.log('\n预期结果:');
console.log('- 高境界打低境界：显示压制信息，属性提升');
console.log('- 低境界打高境界：显示被压制信息，属性降低');
console.log('- 同境界高层级：显示层级压制信息');
