/**
 * 任务系统模块
 * 从 game.js 的 GameState 类中提取的任务相关方法
 *
 * 包含功能：
 * - 接受任务
 * - 完成任务
 * - 检查任务进度
 * - 更新任务进度
 * - 获取任务列表
 */

export class QuestSystem {
    constructor(gameState) {
        this.state = gameState;
        this._isUpdatingQuest = false; // 防止无限递归
    }

    // 接受任务
    acceptQuest(questId) {
        // 检查任务是否已完成
        if (this.state.completedQuests.includes(questId)) {
            return { success: false, message: '任务已完成' };
        }

        // 检查任务是否已接受
        if (this.state.questProgress[questId]) {
            return { success: false, message: '任务已接受' };
        }

        const quest = this.state.storyQuests[questId];
        if (!quest) {
            return { success: false, message: '任务不存在' };
        }

        // 检查任务要求
        if (quest.requirements) {
            // 检查章节要求
            if (quest.requirements.chapter && this.state.currentChapter < quest.requirements.chapter) {
                return { success: false, message: `需要达到第${quest.requirements.chapter}章` };
            }

            // 检查前置任务
            if (quest.requirements.prevQuest && !this.state.completedQuests.includes(quest.requirements.prevQuest)) {
                return { success: false, message: '需要完成前置任务' };
            }

            // 检查境界要求
            if (quest.requirements.realm) {
                const realmNames = Object.keys(this.state.realms);
                const currentRealmIndex = realmNames.indexOf(this.state.realm);
                const requiredRealmIndex = realmNames.indexOf(quest.requirements.realm);
                if (currentRealmIndex < requiredRealmIndex) {
                    return { success: false, message: `需要${quest.requirements.realm}境界` };
                }
            }

            // 检查剧情标记
            if (quest.requirements.storyFlag) {
                const [flag, value] = quest.requirements.storyFlag;
                if (this.state.storyFlags[flag] !== value) {
                    return { success: false, message: '需要完成特定剧情' };
                }
            }
        }

        // 初始化任务进度
        const firstStage = quest.stages[0];
        this.state.questProgress[questId] = {
            currentStage: firstStage.id,
            progress: {},
            acceptedAt: Date.now()
        };

        this.state.addLog(`接受任务：${quest.name}`, 'rare');
        this.state.addLog(firstStage.description, 'info');

        return {
            success: true,
            message: `接受任务：${quest.name}`,
            quest: quest,
            currentStage: firstStage
        };
    }

    // 完成任务
    completeQuest(questId) {
        if (!this.state.questProgress[questId]) {
            return { success: false, message: '任务未开始' };
        }

        const quest = this.state.storyQuests[questId];
        if (!quest) {
            return { success: false, message: '任务不存在' };
        }

        // 移除任务进度
        delete this.state.questProgress[questId];

        // 添加到已完成列表
        this.state.completedQuests.push(questId);

        // 发放完成奖励
        if (quest.completionRewards) {
            for (const reward of quest.completionRewards) {
                this.giveReward(reward);
            }
        }

        this.state.addLog(`任务完成：${quest.name}`, 'legendary');

        return {
            success: true,
            message: `完成任务：${quest.name}`,
            rewards: quest.completionRewards
        };
    }

    // 检查任务进度
    checkQuestProgress(questId) {
        const progress = this.state.questProgress[questId];
        const quest = this.state.storyQuests[questId];

        if (!progress || !quest) {
            return {
                inProgress: false,
                completed: this.state.completedQuests.includes(questId),
                message: '任务未开始'
            };
        }

        const currentStage = quest.stages.find(s => s.id === progress.currentStage);
        if (!currentStage) {
            return {
                inProgress: false,
                completed: true,
                message: '任务已完成'
            };
        }

        const isCompleted = this.checkStageCompletion(questId, currentStage);

        return {
            inProgress: true,
            completed: isCompleted,
            currentStage: currentStage,
            progress: progress.progress,
            progressText: this.getQuestProgressText(questId)
        };
    }

    // 更新任务进度
    updateQuestProgress(objectiveType, value) {
        // 防止无限递归：如果正在更新任务进度，直接返回
        if (this._isUpdatingQuest) {
            return [];
        }

        this._isUpdatingQuest = true;
        const updatedQuests = [];

        try {
            for (const [questId, progress] of Object.entries(this.state.questProgress)) {
                const quest = this.state.storyQuests[questId];
                if (!quest) continue;
                const currentStage = quest.stages.find(s => s.id === progress.currentStage);
                if (!currentStage) continue;

                const objective = currentStage.objective;
                let progressed = false;

            switch (objectiveType) {
                case 'cultivate':
                    if (objective.type === 'cultivate') {
                        progress.progress.cultivated = (progress.progress.cultivated || 0) + value;
                        progressed = true;
                    }
                    break;
                case 'breakthrough':
                    if (objective.type === 'breakthrough') {
                        progress.progress.level = this.state.level;
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
                        progress.progress.contribution = this.state.sectContribution;
                        progressed = true;
                    }
                    break;
                case 'sect_rank':
                    if (objective.type === 'sect_rank') {
                        progress.progress.rank = this.state.sectRank;
                        progressed = true;
                    }
                    break;
                case 'collect_items':
                    if (objective.type === 'collect_items') {
                        if (!progress.progress.collected) progress.progress.collected = {};
                        for (const item of Object.keys(objective.items)) {
                            progress.progress.collected[item] = this.state.inventory[item] || 0;
                        }
                        progressed = true;
                    }
                    break;
                case 'tribulation':
                    if (objective.type === 'tribulation' && this.state.realm === objective.target) {
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

            if (progressed && this.checkStageCompletion(questId, currentStage)) {
                this.completeQuestStage(questId, currentStage);
                updatedQuests.push({ questId, quest });
            }
        }
        } finally {
            // 确保标志被重置
            this._isUpdatingQuest = false;
        }

        return updatedQuests;
    }

    // 检查阶段是否完成
    checkStageCompletion(questId, stage) {
        const progress = this.state.questProgress[questId];
        const objective = stage.objective;

        switch (objective.type) {
            case 'cultivate':
                return (progress.progress.cultivated || 0) >= objective.target;
            case 'breakthrough':
                return this.state.level >= objective.target;
            case 'adventure':
            case 'defeat_monsters':
                return (progress.progress.adventures || progress.progress.defeated || 0) >= objective.target;
            case 'sect_contribution':
                return this.state.sectContribution >= objective.target;
            case 'sect_rank':
                return this.state.sectRank === objective.target;
            case 'collect_items':
                for (const [item, count] of Object.entries(objective.items)) {
                    if ((this.state.inventory[item] || 0) < count) return false;
                }
                return true;
            case 'tribulation':
                return progress.progress.tribulation === true;
            default:
                return false;
        }
    }

    // 完成任务阶段
    completeQuestStage(questId, stage) {
        const quest = this.state.storyQuests[questId];

        // 添加默认空对象，防止 undefined
        const onComplete = stage.onComplete || {};

        // 发放奖励
        if (stage.rewards) {
            for (const reward of stage.rewards) {
                this.giveReward(reward);
            }
        }

        // 安全访问 message，提供默认值
        const message = onComplete.message || `完成阶段：${stage.name}`;
        this.state.addLog(message, 'legendary');

        // 安全设置剧情标记（检查字段存在性）
        if (onComplete.setFlag) {
            this.state.storyFlags[onComplete.setFlag.flag] = onComplete.setFlag.value;
        }

        // 安全进入下一章节（检查字段存在性）
        if (onComplete.nextChapter) {
            this.state.currentChapter = onComplete.nextChapter;
            this.state.addLog(`进入第${onComplete.nextChapter}章！`, 'legendary');
        }

        // 移动到下一阶段
        const nextStageIndex = quest.stages.indexOf(stage) + 1;
        if (nextStageIndex < quest.stages.length) {
            this.state.questProgress[questId].currentStage = quest.stages[nextStageIndex].id;
            this.state.questProgress[questId].progress = {};
            const nextStage = quest.stages[nextStageIndex];
            this.state.addLog(`新任务目标：${nextStage.name}`, 'rare');
        } else {
            this.completeQuest(questId);
        }
    }

    // 获取任务进度描述
    getQuestProgressText(questId) {
        const progress = this.state.questProgress[questId];
        const quest = this.state.storyQuests[questId];
        if (!progress || !quest) return '未开始';

        const currentStage = quest.stages.find(s => s.id === progress.currentStage);
        if (!currentStage) return '已完成';

        const objective = currentStage.objective;
        switch (objective.type) {
            case 'cultivate':
                return `修炼进度：${progress.progress.cultivated || 0}/${objective.target}`;
            case 'breakthrough':
                return `突破层级：${this.state.level}/${objective.target}层`;
            case 'adventure':
                return `历练次数：${progress.progress.adventures || 0}/${objective.target}`;
            case 'sect_contribution':
                return `宗门贡献：${this.state.sectContribution}/${objective.target}`;
            case 'sect_rank':
                return `当前等级：${this.state.sectRank}，目标：${objective.target}`;
            case 'collect_items':
                let text = '收集物品：';
                for (const [item, count] of Object.entries(objective.items)) {
                    text += `${item} ${this.state.inventory[item] || 0}/${count} `;
                }
                return text;
            case 'tribulation':
                return this.state.realm === objective.target ? '已达成' : `需达到${objective.target}`;
            case 'defeat_monsters':
                return `击败怪物：${progress.progress.defeated || 0}/${objective.target}`;
            default:
                return currentStage.description;
        }
    }

    // 获取可接受的任务列表
    getAvailableQuests() {
        const availableQuests = [];

        for (const [questId, quest] of Object.entries(this.state.storyQuests)) {
            // 跳过已完成的任务
            if (this.state.completedQuests.includes(questId)) {
                continue;
            }

            // 跳过已接受的任务
            if (this.state.questProgress[questId]) {
                continue;
            }

            // 检查任务要求
            let canAccept = true;
            if (quest.requirements) {
                if (quest.requirements.chapter && this.state.currentChapter < quest.requirements.chapter) {
                    canAccept = false;
                }
                if (quest.requirements.prevQuest && !this.state.completedQuests.includes(quest.requirements.prevQuest)) {
                    canAccept = false;
                }
                if (quest.requirements.realm) {
                    const realmNames = Object.keys(this.state.realms);
                    const currentRealmIndex = realmNames.indexOf(this.state.realm);
                    const requiredRealmIndex = realmNames.indexOf(quest.requirements.realm);
                    if (currentRealmIndex < requiredRealmIndex) {
                        canAccept = false;
                    }
                }
                if (quest.requirements.storyFlag) {
                    const [flag, value] = quest.requirements.storyFlag;
                    if (this.state.storyFlags[flag] !== value) {
                        canAccept = false;
                    }
                }
            }

            if (canAccept) {
                availableQuests.push({
                    id: questId,
                    ...quest
                });
            }
        }

        return availableQuests;
    }

    // 获取进行中的任务列表
    getActiveQuests() {
        const activeQuests = [];

        for (const [questId, progress] of Object.entries(this.state.questProgress)) {
            const quest = this.state.storyQuests[questId];
            if (!quest) continue;

            const currentStage = quest.stages.find(s => s.id === progress.currentStage);
            if (!currentStage) continue;

            activeQuests.push({
                id: questId,
                name: quest.name,
                description: currentStage.description,
                progress: this.getQuestProgressText(questId),
                stage: currentStage
            });
        }

        return activeQuests;
    }

    // 获取已完成的任务列表
    getCompletedQuests() {
        const completedQuests = [];

        for (const questId of this.state.completedQuests) {
            const quest = this.state.storyQuests[questId];
            if (!quest) continue;

            completedQuests.push({
                id: questId,
                name: quest.name,
                description: quest.description
            });
        }

        return completedQuests;
    }

    // 放弃任务
    abandonQuest(questId) {
        if (!this.state.questProgress[questId]) {
            return { success: false, message: '任务未开始' };
        }

        // 检查是否可以放弃
        const quest = this.state.storyQuests[questId];
        if (quest.cannotAbandon) {
            return { success: false, message: '此任务无法放弃' };
        }

        delete this.state.questProgress[questId];
        this.state.addLog(`放弃了任务：${quest.name}`, 'info');

        return { success: true, message: '放弃任务成功' };
    }

    // 发放奖励
    giveReward(reward) {
        switch (reward.type) {
            case 'spirit_stones':
                this.addSpiritStones(reward.value);
                break;
            case 'cultivation':
                this.addCultivation(reward.value);
                break;
            case 'item':
                this.addItem(reward.value, reward.quantity || 1);
                break;
            case 'skill':
                if (!this.state.skills[reward.value]) {
                    this.state.skills[reward.value] = { level: 1 };
                }
                break;
            case 'artifact':
                if (this.state.combatSystem) {
                    this.state.combatSystem.acquireArtifact(reward.value);
                }
                break;
            case 'sect_contribution':
                this.state.sectContribution += reward.value;
                break;
            case 'sect_reputation':
                this.state.sectReputation += reward.value;
                break;
        }
    }

    // 辅助方法：增加灵石
    addSpiritStones(amount) {
        this.state.spiritStones += amount;
        this.state.addLog(`获得${amount}灵石`, 'success');
    }

    // 辅助方法：增加修为
    addCultivation(amount) {
        if (this.state.cultivationSystem) {
            this.state.cultivationSystem.addCultivation(amount);
        } else {
            this.state.cultivation = Math.floor(this.state.cultivation + amount);
        }
    }

    // 辅助方法：添加物品
    addItem(itemName, count = 1) {
        if (!this.state.inventory[itemName]) {
            this.state.inventory[itemName] = 0;
        }
        this.state.inventory[itemName] += count;
        this.state.addLog(`获得${itemName} x${count}`, 'rare');
    }
}
