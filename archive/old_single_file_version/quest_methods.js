// 剧情任务系统方法
// 这些方法将被添加到 GameState 类中

/**
 * 获取当前可用的任务列表
 */
function getAvailableQuests() {
    const available = [];

    for (const [questId, quest] of Object.entries(CONFIG.storyQuests)) {
        // 跳过已完成的任务
        if (this.completedQuests.includes(questId)) {
            continue;
        }

        // 检查前置任务
        if (quest.requirements) {
            if (!this.checkQuestRequirements(quest.requirements)) {
                continue;
            }
        }

        // 检查任务解锁条件
        const currentStage = this.getCurrentQuestStage(questId);
        if (!currentStage && !this.canStartQuest(questId)) {
            continue;
        }

        available.push({
            id: questId,
            ...quest,
            currentStage: currentStage
        });
    }

    return available;
}

/**
 * 检查任务前置条件
 */
function checkQuestRequirements(requirements) {
    if (requirements.realm) {
        const realmNames = Object.keys(CONFIG.realms);
        const currentRealmIndex = realmNames.indexOf(this.realm);
        const requiredRealmIndex = realmNames.indexOf(requirements.realm);
        if (currentRealmIndex < requiredRealmIndex) {
            return false;
        }
        if (currentRealmIndex === requiredRealmIndex && this.level < requirements.level) {
            return false;
        }
    }

    if (requirements.sect && requirements.sect !== 'any' && this.sect !== requirements.sect) {
        return false;
    }

    if (requirements.sect === 'any' && this.sect === 'none') {
        return false;
    }

    if (requirements.flag) {
        if (!this.storyFlags[requirements.flag]) {
            return false;
        }
    }

    return true;
}

/**
 * 检查是否可以开始任务
 */
function canStartQuest(questId) {
    const quest = CONFIG.storyQuests[questId];
    if (!quest) return false;

    // 主线任务按章节顺序解锁
    if (quest.type === 'main') {
        return quest.chapter <= this.currentChapter;
    }

    // 支线任务检查特定条件
    return this.checkQuestRequirements(quest.requirements);
}

/**
 * 获取任务的当前阶段
 */
function getCurrentQuestStage(questId) {
    if (this.questProgress[questId]) {
        const stageId = this.questProgress[questId].currentStage;
        const quest = CONFIG.storyQuests[questId];
        if (quest) {
            return quest.stages.find(s => s.id === stageId);
        }
    }
    return null;
}

/**
 * 开始任务
 */
function startQuest(questId) {
    const quest = CONFIG.storyQuests[questId];
    if (!quest) {
        return { success: false, message: '任务不存在' };
    }

    if (this.completedQuests.includes(questId)) {
        return { success: false, message: '任务已完成' };
    }

    if (this.questProgress[questId]) {
        return { success: false, message: '任务已进行中' };
    }

    if (!this.canStartQuest(questId)) {
        return { success: false, message: '任务条件未满足' };
    }

    // 初始化任务进度
    this.questProgress[questId] = {
        currentStage: quest.stages[0].id,
        progress: {},
        startTime: Date.now()
    };

    this.addLog(`开始任务：${quest.name}`, 'rare');
    return { success: true, message: `开始任务：${quest.name}` };
}

/**
 * 更新任务进度
 */
function updateQuestProgress(objectiveType, value) {
    const updatedQuests = [];

    for (const [questId, progress] of Object.entries(this.questProgress)) {
        const quest = CONFIG.storyQuests[questId];
        if (!quest) continue;

        const currentStage = quest.stages.find(s => s.id === progress.currentStage);
        if (!currentStage) continue;

        const objective = currentStage.objective;
        let progressed = false;

        // 检查目标类型
        switch (objectiveType) {
            case 'cultivate':
                if (objective.type === 'cultivate') {
                    progress.progress.cultivated = (progress.progress.cultivated || 0) + value;
                    progressed = true;
                }
                break;

            case 'breakthrough':
                if (objective.type === 'breakthrough') {
                    progress.progress.breakthroughs = (progress.progress.breakthroughs || 0) + 1;
                    progressed = true;
                }
                break;

            case 'adventure':
                if (objective.type === 'adventure') {
                    progress.progress.adventures = (progress.progress.adventures || 0) + 1;
                    progressed = true;
                }
                break;

            case 'sect_contribution':
                if (objective.type === 'sect_contribution') {
                    progress.progress.contribution = value;
                    progressed = true;
                }
                break;

            case 'sect_rank':
                if (objective.type === 'sect_rank' && this.sectRank === objective.target) {
                    progress.progress.rank = this.sectRank;
                    progressed = true;
                }
                break;

            case 'collect_items':
                if (objective.type === 'collect_items') {
                    progressed = this.checkCollectionObjective(objective.items, progress);
                }
                break;

            case 'tribulation':
                if (objective.type === 'tribulation' && this.realm === objective.target) {
                    progress.progress.tribulation = true;
                    progressed = true;
                }
                break;

            case 'defeat_monsters':
                if (objective.type === 'defeat_monsters') {
                    progress.progress.defeated = (progress.progress.defeated || 0) + 1;
                    progressed = true;
                }
                break;
        }

        if (progressed) {
            // 检查是否完成阶段
            if (this.checkStageCompletion(questId, currentStage)) {
                this.completeQuestStage(questId, currentStage);
                updatedQuests.push({ questId, quest, currentStage });
            }
        }
    }

    return updatedQuests;
}

/**
 * 检查收集类目标是否完成
 */
function checkCollectionObjective(requiredItems, progress) {
    if (!progress.progress.collected) {
        progress.progress.collected = {};
    }

    for (const [item, required] of Object.entries(requiredItems)) {
        const owned = this.inventory[item] || 0;
        progress.progress.collected[item] = owned;
    }

    // 检查是否所有物品都已收集
    for (const [item, required] of Object.entries(requiredItems)) {
        if ((this.inventory[item] || 0) < required) {
            return false;
        }
    }

    return true;
}

/**
 * 检查阶段是否完成
 */
function checkStageCompletion(questId, stage) {
    const progress = this.questProgress[questId];
    const objective = stage.objective;

    switch (objective.type) {
        case 'cultivate':
            return (progress.progress.cultivated || 0) >= objective.target;

        case 'breakthrough':
            return this.level >= objective.target;

        case 'adventure':
        case 'defeat_monsters':
            return (progress.progress.adventures || progress.progress.defeated || 0) >= objective.target;

        case 'sect_contribution':
            return this.sectContribution >= objective.target;

        case 'sect_rank':
            return this.sectRank === objective.target;

        case 'collect_items':
            return this.checkCollectionObjective(objective.items, progress);

        case 'tribulation':
            return progress.progress.tribulation === true;

        default:
            return false;
    }
}

/**
 * 完成任务阶段
 */
function completeQuestStage(questId, stage) {
    const quest = CONFIG.storyQuests[questId];
    const onComplete = stage.onComplete;

    // 发放奖励
    if (stage.rewards) {
        this.giveQuestRewards(stage.rewards);
    }

    // 显示完成消息
    this.addLog(onComplete.message, 'legendary');

    // 设置剧情标记
    if (onComplete.setFlag) {
        this.storyFlags[onComplete.setFlag.flag] = onComplete.setFlag.value;
    }

    // 解锁下一阶段或下一章节
    if (onComplete.unlocks) {
        for (const unlockedQuestId of onComplete.unlocks) {
            // 可以在这里处理解锁逻辑
        }
    }

    // 进入下一章节
    if (onComplete.nextChapter) {
        this.currentChapter = onComplete.nextChapter;
        this.addLog(`进入第${onComplete.nextChapter}章！`, 'legendary');
    }

    // 移动到下一阶段
    const nextStageIndex = quest.stages.indexOf(stage) + 1;
    if (nextStageIndex < quest.stages.length) {
        this.questProgress[questId].currentStage = quest.stages[nextStageIndex].id;
        this.questProgress[questId].progress = {};

        const nextStage = quest.stages[nextStageIndex];
        this.addLog(`新任务目标：${nextStage.name}`, 'rare');
    } else {
        // 任务完全完成
        this.completeQuest(questId);
    }
}

/**
 * 发放任务奖励
 */
function giveQuestRewards(rewards) {
    for (const reward of rewards) {
        switch (reward.type) {
            case 'spirit_stones':
                this.addSpiritStones(reward.value);
                break;

            case 'cultivation':
                this.addCultivation(reward.value);
                break;

            case 'item':
                const quantity = reward.quantity || 1;
                this.addItem(reward.value, quantity);
                break;

            case 'skill':
                // 学习功法（如果还没学会）
                if (!this.skills[reward.value]) {
                    this.skills[reward.value] = { level: 1 };
                    this.addLog(`学会了${reward.value}！`, 'rare');
                }
                break;

            case 'artifact':
                this.artifacts.push(reward.value);
                this.addLog(`获得法宝：${reward.value}！`, 'legendary');
                break;

            case 'sect_contribution':
                this.sectContribution += reward.value;
                break;

            case 'sect_reputation':
                this.sectReputation += reward.value;
                break;
        }
    }
}

/**
 * 完成任务
 */
function completeQuest(questId) {
    if (!this.questProgress[questId]) {
        return;
    }

    delete this.questProgress[questId];
    this.completedQuests.push(questId);

    const quest = CONFIG.storyQuests[questId];
    this.addLog(`任务完成：${quest.name}`, 'legendary');
}

/**
 * 获取任务进度描述
 */
function getQuestProgressText(questId) {
    const progress = this.questProgress[questId];
    const quest = CONFIG.storyQuests[questId];

    if (!progress || !quest) {
        return '未开始';
    }

    const currentStage = quest.stages.find(s => s.id === progress.currentStage);
    if (!currentStage) {
        return '已完成';
    }

    const objective = currentStage.objective;
    let progressText = '';

    switch (objective.type) {
        case 'cultivate':
            const cultivated = progress.progress.cultivated || 0;
            progressText = `修炼进度：${cultivated}/${objective.target}`;
            break;

        case 'breakthrough':
            progressText = `突破层级：${this.level}/${objective.target}层`;
            break;

        case 'adventure':
            const adventures = progress.progress.adventures || 0;
            progressText = `历练次数：${adventures}/${objective.target}`;
            break;

        case 'sect_contribution':
            progressText = `宗门贡献：${this.sectContribution}/${objective.target}`;
            break;

        case 'sect_rank':
            progressText = `当前等级：${this.sectRank}，目标：${objective.target}`;
            break;

        case 'collect_items':
            progressText = '收集物品：';
            for (const [item, count] of Object.entries(objective.items)) {
                const owned = this.inventory[item] || 0;
                progressText += `${item} ${owned}/${count} `;
            }
            break;

        case 'tribulation':
            progressText = this.realm === objective.target ? '已达成' : `需达到${objective.target}`;
            break;

        case 'defeat_monsters':
            const defeated = progress.progress.defeated || 0;
            progressText = `击败怪物：${defeated}/${objective.target}`;
            break;

        default:
            progressText = currentStage.description;
    }

    return progressText;
}

// 导出所有方法
const questMethods = {
    getAvailableQuests,
    checkQuestRequirements,
    canStartQuest,
    getCurrentQuestStage,
    startQuest,
    updateQuestProgress,
    checkCollectionObjective,
    checkStageCompletion,
    completeQuestStage,
    giveQuestRewards,
    completeQuest,
    getQuestProgressText
};
