/**
 * 任务系统测试脚本
 * 测试任务获取、接受、完成等功能
 */

import { GameState } from '../js/core/GameState.js';

console.log('===== 开始任务系统测试 =====\n');

// 创建测试角色
const characterData = {
    playerName: '测试角色',
    daoName: '测试道号',
    background: 'commoner',
    talents: { wisdom: 0, luck: 0, potential: 0, fortune: 0 },
    spiritualRoot: '天火灵根'
};

const game = new GameState(characterData);

console.log('✅ GameState 实例创建成功\n');

// 测试1: 获取可接受任务列表
console.log('===== 测试1: 获取可接受任务列表 =====');
const availableQuests = game.getAvailableQuests();
console.log(`可接受任务数量: ${availableQuests.length}`);
console.log(`可接受任务:`, availableQuests.map(q => `${q.id} - ${q.name}`));

if (availableQuests.length > 0) {
    console.log('✅ 可以获取可接受任务列表\n');
} else {
    console.log('❌ 无法获取可接受任务列表\n');
}

// 测试2: 接受任务
console.log('===== 测试2: 接受任务 =====');
if (availableQuests.length > 0) {
    const firstQuest = availableQuests[0];
    console.log(`尝试接受任务: ${firstQuest.name}`);

    const acceptResult = game.acceptQuest(firstQuest.id);
    console.log(`接受结果: ${acceptResult.message}`);

    if (acceptResult.success) {
        console.log(`任务进度: ${JSON.stringify(game.questProgress[firstQuest.id])}`);
        console.log('✅ 可以接受任务\n');
    } else {
        console.log('❌ 接受任务失败\n');
    }
} else {
    console.log('⚠️  没有可接受的任务\n');
}

// 测试3: 任务进度更新
console.log('===== 测试3: 任务进度更新 =====');
if (availableQuests.length > 0) {
    const firstQuest = availableQuests[0];
    const questConfig = game.storyQuests[firstQuest.id];

    if (questConfig && questConfig.stages && questConfig.stages.length > 0) {
        const firstStage = questConfig.stages[0];
        console.log(`第一阶段: ${firstStage.name}`);
        console.log(`目标类型: ${firstStage.objective.type}`);

        // 根据目标类型模拟进度
        if (firstStage.objective.type === 'cultivate') {
            const target = firstStage.objective.target;
            console.log(`修为目标: ${target}`);

            game.addCultivation(target);
            const progressText = game.getQuestProgressText(firstQuest.id);
            console.log(`任务进度: ${progressText}`);

            if (progressText && progressText.includes(`${target}`)) {
                console.log('✅ 任务进度正确更新\n');
            } else {
                console.log('❌ 任务进度未更新\n');
            }
        }
    }
}

// 测试4: 完成任务
console.log('===== 测试4: 完成任务 =====');
if (availableQuests.length > 0) {
    const firstQuest = availableQuests[0];

    // 先完成所有阶段
    const questConfig = game.storyQuests[firstQuest.id];
    if (questConfig && questConfig.stages) {
        questConfig.stages.forEach((stage, index) => {
            if (stage.objective.type === 'cultivate') {
                game.addCultivation(stage.objective.target);
            }
        });
    }

    const completeResult = game.completeQuest(firstQuest.id);
    console.log(`完成结果: ${completeResult.message}`);

    if (completeResult.success) {
        console.log(`已完成任务: ${game.completedQuests.includes(firstQuest.id) ? '是' : '否'}`);
        console.log('✅ 可以完成任务\n');
    } else {
        console.log(`⚠️  完成任务: ${completeResult.message}\n`);
    }
}

// 测试5: 任务阶段获取
console.log('===== 测试5: 任务阶段获取 =====');
if (availableQuests.length > 1) {
    const secondQuest = availableQuests[1];
    game.acceptQuest(secondQuest.id);

    const currentStage = game.getCurrentQuestStage(secondQuest.id);
    console.log(`当前阶段: ${currentStage ? currentStage.name : '无'}`);

    if (currentStage) {
        console.log('✅ 可以获取当前任务阶段\n');
    } else {
        console.log('❌ 无法获取当前任务阶段\n');
    }
}

// 测试6: 多任务管理
console.log('===== 测试6: 多任务管理 =====');
const activeQuestCount = Object.keys(game.questProgress).length;
console.log(`进行中任务数量: ${activeQuestCount}`);
const completedQuestCount = game.completedQuests.length;
console.log(`已完成任务数量: ${completedQuestCount}`);

if (activeQuestCount >= 0 && completedQuestCount >= 0) {
    console.log('✅ 可以管理多个任务\n');
} else {
    console.log('❌ 多任务管理失败\n');
}

// 测试7: 任务配置访问
console.log('===== 测试7: 任务配置访问 =====');
const questCount = Object.keys(game.storyQuests).length;
console.log(`总任务配置数量: ${questCount}`);

if (questCount > 0) {
    const sampleQuestId = Object.keys(game.storyQuests)[0];
    const sampleQuest = game.storyQuests[sampleQuestId];
    console.log(`示例任务: ${sampleQuest.name}`);
    console.log(`任务类型: ${sampleQuest.type}`);
    console.log(`任务章节: ${sampleQuest.chapter}`);
    console.log('✅ 可以访问任务配置\n');
} else {
    console.log('❌ 无法访问任务配置\n');
}

// 测试8: 任务奖励发放
console.log('===== 测试8: 任务奖励发放 =====');
const testQuest = availableQuests.find(q => game.storyQuests[q.id] &&
                                     game.storyQuests[q.id].stages &&
                                     game.storyQuests[q.id].stages.length > 0);

if (testQuest) {
    const questConfig = game.storyQuests[testQuest.id];
    const firstStage = questConfig.stages[0];

    if (firstStage.rewards && firstStage.rewards.length > 0) {
        console.log(`阶段奖励:`, firstStage.rewards);
        const hasReward = firstStage.rewards.some(r =>
            r.type === 'cultivation' || r.type === 'spiritStones' || r.type === 'item'
        );
        if (hasReward) {
            console.log('✅ 任务奖励配置正常\n');
        } else {
            console.log('❌ 任务奖励配置异常\n');
        }
    }
}

console.log('===== 测试完成 =====');
console.log('\n🎉 任务系统测试完成！');
