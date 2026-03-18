/**
 * 主测试运行器
 *
 * 运行所有测试套件并生成汇总报告
 */

import { runConfigurationTests } from './test-configuration.js';
import { runStateManagementTests } from './test-state-management.js';
import { runCultivationTests } from './test-cultivation.js';
import { runQuestTests } from './test-quest.js';
import { runCombatTests } from './test-combat.js';
import { runSectTests } from './test-sect.js';
import { runNPCTests } from './test-npc.js';
import { runPetTests } from './test-pet.js';
import { runDungeonTests } from './test-dungeon.js';
import { runAchievementTests } from './test-achievement.js';
import { runIntegrationTests } from './test-integration.js';
import { runSaveTests } from './test-save.js';

// 测试套件配置
const testSuites = [
    { name: '配置引用测试', runner: runConfigurationTests, priority: 'P0' },
    { name: '状态管理测试', runner: runStateManagementTests, priority: 'P0' },
    { name: '修炼系统测试', runner: runCultivationTests, priority: 'P0' },
    { name: '任务系统测试', runner: runQuestTests, priority: 'P1' },
    { name: '战斗系统测试', runner: runCombatTests, priority: 'P1' },
    { name: '宗门系统测试', runner: runSectTests, priority: 'P1' },
    { name: 'NPC系统测试', runner: runNPCTests, priority: 'P2' },
    { name: '宠物系统测试', runner: runPetTests, priority: 'P2' },
    { name: '副本系统测试', runner: runDungeonTests, priority: 'P1' },
    { name: '成就系统测试', runner: runAchievementTests, priority: 'P2' },
    { name: '集成测试', runner: runIntegrationTests, priority: 'P0' },
    { name: '存档系统测试', runner: runSaveTests, priority: 'P0' }
];

// 汇总结果
const overallResults = {
    suites: [],
    totalPassed: 0,
    totalFailed: 0,
    totalTests: 0,
    startTime: Date.now()
};

// 运行单个测试套件
async function runTestSuite(suite) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`运行测试套件: ${suite.name} [${suite.priority}]`);
    console.log(`${'='.repeat(60)}\n`);

    try {
        const results = await suite.runner();
        return {
            name: suite.name,
            priority: suite.priority,
            passed: results.passed,
            failed: results.failed,
            total: results.passed + results.failed,
            tests: results.tests
        };
    } catch (error) {
        console.error(`测试套件 "${suite.name}" 执行失败:`, error.message);
        return {
            name: suite.name,
            priority: suite.priority,
            passed: 0,
            failed: 1,
            total: 1,
            tests: [{ name: '测试套件执行', passed: false, details: error.message }],
            error: error.message
        };
    }
}

// 运行所有测试
async function runAllTests() {
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║          文字修仙游戏 - 全面测试套件                    ║');
    console.log('║          comprehensive Test Suite                       ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');

    console.log(`测试套件数量: ${testSuites.length}`);
    console.log(`开始时间: ${new Date(overallResults.startTime).toLocaleString()}\n`);

    // 按优先级分组
    const p0Suites = testSuites.filter(s => s.priority === 'P0');
    const p1Suites = testSuites.filter(s => s.priority === 'P1');
    const p2Suites = testSuites.filter(s => s.priority === 'P2');

    console.log(`优先级分布: P0=${p0Suites.length}, P1=${p1Suites.length}, P2=${p2Suites.length}\n`);

    // 运行所有测试套件
    for (const suite of testSuites) {
        const result = await runTestSuite(suite);
        overallResults.suites.push(result);
        overallResults.totalPassed += result.passed;
        overallResults.totalFailed += result.failed;
        overallResults.totalTests += result.total;
    }

    // 生成汇总报告
    generateSummaryReport();

    return overallResults;
}

// 生成汇总报告
function generateSummaryReport() {
    const endTime = Date.now();
    const duration = ((endTime - overallResults.startTime) / 1000).toFixed(2);

    console.log('\n\n');
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║                    测试汇总报告                          ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');

    // 总体统计
    const passRate = ((overallResults.totalPassed / overallResults.totalTests) * 100).toFixed(1);
    console.log('📊 总体统计:');
    console.log(`   通过: ${overallResults.totalPassed}`);
    console.log(`   失败: ${overallResults.totalFailed}`);
    console.log(`   总计: ${overallResults.totalTests}`);
    console.log(`   通过率: ${passRate}%`);
    console.log(`   执行时间: ${duration}秒\n`);

    // 按套件统计
    console.log('📋 各测试套件结果:');
    console.log('┌────────────────────────┬───────┬───────┬───────┬──────────┐');
    console.log('│ 测试套件               │ 通过  │ 失败  │ 总计  │ 通过率   │');
    console.log('├────────────────────────┼───────┼───────┼───────┼──────────┤');

    for (const suite of overallResults.suites) {
        const suitePassRate = ((suite.passed / suite.total) * 100).toFixed(1);
        const name = suite.name.padEnd(22, ' ');
        const passed = suite.passed.toString().padStart(5, ' ');
        const failed = suite.failed.toString().padStart(5, ' ');
        const total = suite.total.toString().padStart(5, ' ');
        const rate = suitePassRate.padStart(6, ' ') + '%';
        console.log(`│${name}│${passed}│${failed}│${total}│${rate} │`);
    }

    console.log('└────────────────────────┴───────┴───────┴───────┴──────────┘\n');

    // 失败的测试详情
    if (overallResults.totalFailed > 0) {
        console.log('❌ 失败的测试详情:\n');

        for (const suite of overallResults.suites) {
            if (suite.failed > 0) {
                console.log(`【${suite.name}】`);
                const failedTests = suite.tests.filter(t => !t.passed);
                for (const test of failedTests) {
                    console.log(`  ✗ ${test.name}`);
                    if (test.details) {
                        console.log(`    ${test.details}`);
                    }
                }
                console.log('');
            }
        }
    }

    // 按优先级统计
    console.log('📈 按优先级统计:');
    for (const priority of ['P0', 'P1', 'P2']) {
        const prioritySuites = overallResults.suites.filter(s => s.priority === priority);
        const pPassed = prioritySuites.reduce((sum, s) => sum + s.passed, 0);
        const pFailed = prioritySuites.reduce((sum, s) => sum + s.failed, 0);
        const pTotal = pPassed + pFailed;
        const pRate = pTotal > 0 ? ((pPassed / pTotal) * 100).toFixed(1) : '0.0';

        console.log(`  [${priority}] 通过: ${pPassed}, 失败: ${pFailed}, 总计: ${pTotal}, 通过率: ${pRate}%`);
    }

    console.log('\n');

    // 最终状态
    if (overallResults.totalFailed === 0) {
        console.log('🎉 所有测试通过！游戏系统运行正常。\n');
    } else {
        console.log('⚠️  部分测试失败，请查看上方详情并修复相关问题。\n');
    }

    console.log('═'.repeat(60));
    console.log('');
}

// 导出
export { runAllTests, testSuites };

// 如果直接运行此文件
if (import.meta.url === new URL(process.argv[1], 'file://').href) {
    runAllTests().then(results => {
        const exitCode = results.totalFailed > 0 ? 1 : 0;
        process.exit(exitCode);
    });
}
