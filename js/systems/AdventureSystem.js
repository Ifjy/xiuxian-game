/**
 * 冒险系统模块
 * 从 game.js 的 GameState 类中提取的冒险相关方法
 *
 * 包含功能：
 * - 开始历练
 * - 完成历练
 * - 开始打工
 * - 完成打工
 * - 开始秘境探索
 * - 完成秘境探索
 */

export class AdventureSystem {
    constructor(gameState) {
        this.state = gameState;
    }

    // 开始历练
    startAdventure() {
        const canDo = this.canDoAction('adventure');
        if (!canDo.can) {
            this.state.addLog(canDo.message + '！', 'danger');
            return false;
        }

        const adventure = this.state.adventures[Math.floor(Math.random() * this.state.adventures.length)];
        this.state.currentAdventure = adventure;
        this.state.isAdventuring = true;
        this.state.adventureEndTime = Date.now() + adventure.duration;

        this.state.addLog(adventure.message, 'success');
        return true;
    }

    // 完成历练
    completeAdventure() {
        if (!this.state.currentAdventure) return;

        const adventure = this.state.currentAdventure;
        const random = Math.random();
        let cumulative = 0;

        for (const outcome of adventure.outcomes) {
            cumulative += outcome.chance;
            if (random <= cumulative) {
                this.processAdventureOutcome(outcome);
                break;
            }
        }

        this.state.isAdventuring = false;
        this.state.currentAdventure = null;
        this.state.adventureEndTime = 0;

        // 更新任务进度
        try {
            this.updateQuestProgress('adventure', 1);
        } catch (error) {
            console.error('任务进度更新失败:', error);
        }
    }

    // 开始秘境探索
    startExploration(realmId) {
        const canDo = this.canDoAction('exploration');
        if (!canDo.can) {
            this.state.addLog(canDo.message + '！', 'danger');
            return false;
        }

        const realm = this.state.secretRealms.find(r => r.id === realmId);
        if (!realm) {
            this.state.addLog('秘境不存在', 'danger');
            return false;
        }

        // 检查要求
        if (realm.requirements.realm) {
            const realmNames = Object.keys(this.state.realms);
            const currentRealmIndex = realmNames.indexOf(this.state.realm);
            const requiredRealmIndex = realmNames.indexOf(realm.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                this.state.addLog(`境界不足，需要${realm.requirements.realm}`, 'danger');
                return false;
            }

            if (currentRealmIndex === requiredRealmIndex && this.state.level < realm.requirements.level) {
                this.state.addLog(`层级不足，需要${realm.requirements.realm}${realm.requirements.level}层`, 'danger');
                return false;
            }
        }

        // 检查消耗
        if (realm.cost && realm.cost.spiritStones) {
            if (this.state.spiritStones < realm.cost.spiritStones) {
                this.state.addLog(`灵石不足，需要${realm.cost.spiritStones}灵石`, 'danger');
                return false;
            }
            this.state.spiritStones -= realm.cost.spiritStones;
        }

        this.state.currentExploration = realm;
        this.state.isExploring = true;
        this.state.explorationEndTime = Date.now() + realm.duration;

        this.state.addLog(`开始探索${realm.name}...`, 'rare');
        this.state.addLog(`预计耗时${realm.duration / 1000}秒`, 'info');
        return true;
    }

    // 完成秘境探索
    completeExploration() {
        if (!this.state.currentExploration) return;

        const realm = this.state.currentExploration;
        const random = Math.random();
        let cumulative = 0;

        // 计算幸运值影响
        const luckBonus = (this.state.talents.luck + this.state.talents.fortune) * 0.01;
        const adjustedRandom = random - luckBonus * 0.5;

        for (const outcome of realm.outcomes) {
            cumulative += outcome.chance;
            if (adjustedRandom <= cumulative) {
                this.processExplorationOutcome(outcome, realm);
                break;
            }
        }

        this.state.isExploring = false;
        this.state.currentExploration = null;
        this.state.explorationEndTime = 0;
    }

    // 开始打工
    startWork(jobId) {
        const job = this.state.jobs.find(j => j.id === jobId);
        if (!job) {
            return { success: false, message: '工作不存在' };
        }

        const canDo = this.canDoAction('work');
        if (!canDo.can) {
            return { success: false, message: canDo.message };
        }

        this.state.isWorking = true;
        this.state.workEndTime = Date.now() + job.duration;
        this.state.currentJob = job;

        // 计算基础奖励
        let baseReward = Math.floor(Math.random() * (job.baseReward[1] - job.baseReward[0]) + job.baseReward[0]);

        // 属性加成
        const attributeValue = this.state.talents[job.attribute] || 0;
        baseReward = Math.floor(baseReward * (1 + attributeValue * job.bonusMultiplier));

        this.state.addLog(`开始${job.name}，预计${job.duration/1000}秒完成`, 'info');

        // 模拟工作过程
        setTimeout(() => {
            // 检查风险
            if (Math.random() < job.risk) {
                // 工作出意外
                const penalty = Math.floor(Math.random() * (job.riskPenalty[1] - job.riskPenalty[0]) + job.riskPenalty[0]);
                this.state.cultivation = Math.max(0, this.state.cultivation - penalty);
                this.state.addLog(`工作出意外了，损失${penalty}修为`, 'danger');
            } else {
                // 工作成功
                this.addSpiritStones(baseReward);
                this.state.addLog(`工作完成！获得${baseReward}灵石`, 'success');
            }

            // 重置工作状态
            this.state.isWorking = false;
            this.state.workEndTime = 0;
            this.state.currentJob = null;
        }, job.duration);

        return { success: true, message: `开始${job.name}` };
    }

    // 完成打工
    completeWork() {
        // 这个方法在 startWork 中通过 setTimeout 处理
        // 这里提供接口以便外部调用
        if (!this.state.currentJob) {
            return { success: false, message: '没有正在执行的工作' };
        }

        // 工作完成逻辑已经在 setTimeout 中处理
        return { success: true, message: '工作完成' };
    }

    // 处理历练结果
    processAdventureOutcome(outcome) {
        switch (outcome.result) {
            case 'success':
            case 'great_success':
                if (outcome.reward.type === 'cultivation') {
                    const amount = Math.floor(Math.random() * (outcome.reward.value[1] - outcome.reward.value[0]) + outcome.reward.value[0]);
                    this.addCultivation(amount);
                    this.state.addLog(`历练成功！获得${amount}修为`, outcome.result === 'great_success' ? 'legendary' : 'success');

                    // 大成功时有概率获得法宝
                    if (outcome.result === 'great_success' && Math.random() < 0.15) {
                        this.grantRandomArtifact();
                    }
                } else if (outcome.reward.type === 'item') {
                    this.addItem(outcome.reward.value);
                    this.state.addLog(`历练成功！获得${outcome.reward.value}`, outcome.result === 'great_success' ? 'legendary' : 'success');
                } else if (outcome.reward.type === 'spirit_stones') {
                    const amount = Math.floor(Math.random() * (outcome.reward.value[1] - outcome.reward.value[0]) + outcome.reward.value[0]);
                    this.addSpiritStones(amount);
                    this.state.addLog(`历练成功！获得${amount}灵石`, 'success');
                } else if (outcome.reward.type === 'pet') {
                    this.catchPet(outcome.reward.value);
                } else if (outcome.reward.type === 'artifact') {
                    this.acquireArtifact(outcome.reward.value);
                }
                break;

            case 'failure':
                if (outcome.penalty) {
                    if (outcome.penalty.type === 'cultivation_loss') {
                        const loss = Math.floor(Math.random() * (outcome.penalty.value[1] - outcome.penalty.value[0]) + outcome.penalty.value[0]);
                        this.state.cultivation = Math.max(0, this.state.cultivation - loss);
                        this.state.addLog(`历练失败！损失${loss}修为`, 'danger');
                    } else if (outcome.penalty.type === 'injured') {
                        const injury = Math.floor(Math.random() * (outcome.penalty.value[1] - outcome.penalty.value[0]) + outcome.penalty.value[0]);
                        this.state.cultivation = Math.max(0, this.state.cultivation - injury);
                        this.state.addLog(`历练失败！受伤损失${injury}修为`, 'danger');
                    }
                } else if (outcome.message) {
                    this.state.addLog(outcome.message, 'danger');
                }
                break;
        }

        this.checkRealmAchievement();
    }

    // 处理秘境探索结果
    processExplorationOutcome(outcome, realm) {
        this.state.addLog(`探索${realm.name}结果：${this.getExplorationResultText(outcome.result)}`, outcome.result.includes('great') || outcome.result.includes('legendary') || outcome.result.includes('boss') || outcome.result.includes('conqueror') || outcome.result === 'legacy' || outcome.result === 'void_master' ? 'legendary' : outcome.result.includes('good') || outcome.result === 'victory' || outcome.result === 'solved' || outcome.result === 'rich_vein' || outcome.result === 'secret_found' || outcome.result === 'survived' ? 'success' : 'danger');

        if (outcome.rewards) {
            for (const reward of outcome.rewards) {
                if (reward.type === 'spirit_stones') {
                    const amount = Math.floor(Math.random() * (reward.value[1] - reward.value[0]) + reward.value[0]);
                    this.addSpiritStones(amount);
                    this.state.addLog(`获得${amount}灵石`, 'success');
                } else if (reward.type === 'cultivation') {
                    const amount = Math.floor(Math.random() * (reward.value[1] - reward.value[0]) + reward.value[0]);
                    this.addCultivation(amount);
                    this.state.addLog(`获得${amount}修为`, 'success');
                } else if (reward.type === 'item') {
                    this.addItem(reward.value);
                    this.state.addLog(`获得${reward.value}`, 'rare');
                } else if (reward.type === 'artifact') {
                    this.acquireArtifact(reward.value);
                } else if (reward.type === 'skill') {
                    this.learnSkill(reward.value);
                }
            }
        }

        if (outcome.penalty) {
            if (outcome.penalty.type === 'injured' || outcome.penalty.type === 'heavy_injured') {
                const loss = Math.floor(Math.random() * (outcome.penalty.value[1] - outcome.penalty.value[0]) + outcome.penalty.value[0]);
                this.state.cultivation = Math.max(0, this.state.cultivation - loss);
                this.state.addLog(`受伤损失${loss}修为`, 'danger');
            } else if (outcome.penalty.type === 'cultivation_loss') {
                const loss = Math.floor(Math.random() * (outcome.penalty.value[1] - outcome.penalty.value[0]) + outcome.penalty.value[0]);
                this.state.cultivation = Math.max(0, this.state.cultivation - loss);
                this.state.addLog(`损失${loss}修为`, 'danger');
            } else if (outcome.penalty.type === 'sealed') {
                const loss = Math.floor(Math.random() * (outcome.penalty.value[1] - outcome.penalty.value[0]) + outcome.penalty.value[0]);
                this.state.cultivation = Math.max(0, this.state.cultivation - loss);
                this.state.addLog(`被困在遗迹中，损失${loss}修为`, 'danger');
            } else if (outcome.penalty.type === 'realm_fall') {
                this.state.addLog('在虚空中迷失，境界跌落一层！', 'danger');
                // 境界跌落逻辑
                const realmNames = Object.keys(this.state.realms);
                const currentIndex = realmNames.indexOf(this.state.realm);
                if (currentIndex > 0) {
                    this.state.realm = realmNames[currentIndex - outcome.penalty.value];
                    this.state.level = 9;
                    this.state.cultivation = 0;
                    this.state.maxCultivation = this.state.realms[this.state.realm].baseRequirement;
                }
            }
        }

        this.checkRealmAchievement();
    }

    // 获取探索结果文本
    getExplorationResultText(result) {
        const texts = {
            'success': '有所收获',
            'good_find': '发现宝物',
            'great_find': '重大发现！',
            'victory': '击败妖兽',
            'boss_kill': '击败首领！',
            'legendary_kill': '斩杀传说级妖兽！',
            'rich_vein': '发现富矿',
            'super_rare': '发现稀有矿脉！',
            'solved': '解开谜题',
            'secret_found': '发现秘密',
            'legacy': '获得上古传承！',
            'survived': '生还',
            'conqueror': '征服虚空！',
            'void_master': '虚空主宰！',
            'failure': '一无所获',
            'defeat': '战败',
            'trapped': '陷入困境',
            'lost': '迷失虚空'
        };
        return texts[result] || result;
    }

    // 检查是否可以进行某个操作
    canDoAction(action) {
        const currentState = this.getCurrentState();

        switch (action) {
            case 'adventure':
                if (currentState.type === 'meditating' || currentState.type === 'working' || currentState.type === 'exploring') {
                    return { can: false, message: `${currentState.text}无法历练` };
                }
                if (currentState.type === 'adventuring') {
                    return { can: false, message: '正在历练中' };
                }
                return { can: true };

            case 'exploration':
                if (currentState.type === 'meditating' || currentState.type === 'working' || currentState.type === 'adventuring') {
                    return { can: false, message: `${currentState.text}无法探索秘境` };
                }
                if (currentState.type === 'exploring') {
                    return { can: false, message: '正在探索秘境中' };
                }
                return { can: true };

            case 'work':
                if (currentState.type === 'meditating' || currentState.type === 'adventuring') {
                    return { can: false, message: `${currentState.text}无法打工` };
                }
                if (currentState.type === 'working') {
                    return { can: false, message: '正在打工中' };
                }
                return { can: true };

            default:
                return { can: true };
        }
    }

    // 获取当前状态
    getCurrentState() {
        if (this.state.isWorking) {
            return {
                type: 'working',
                text: '打工中',
                endTime: this.state.workEndTime,
                job: this.state.currentJob
            };
        } else if (this.state.isExploring) {
            return {
                type: 'exploring',
                text: '探索秘境中',
                endTime: this.state.explorationEndTime,
                exploration: this.state.currentExploration
            };
        } else if (this.state.isAdventuring) {
            return {
                type: 'adventuring',
                text: '历练中',
                endTime: this.state.adventureEndTime,
                adventure: this.state.currentAdventure
            };
        } else if (this.state.isMeditating) {
            return {
                type: 'meditating',
                text: '入定中',
                endTime: this.state.buffs.cultivation.endTime
            };
        } else {
            return {
                type: 'cultivating',
                text: '修炼中',
                endTime: 0
            };
        }
    }

    // 辅助方法：增加修为
    addCultivation(amount) {
        if (this.state.cultivationSystem) {
            return this.state.cultivationSystem.addCultivation(amount);
        }
        const oldCultivation = this.state.cultivation;
        this.state.cultivation = Math.floor(this.state.cultivation + amount);
        return this.state.cultivation >= this.state.maxCultivation;
    }

    // 辅助方法：增加灵石
    addSpiritStones(amount) {
        this.state.spiritStones += amount;
        this.state.addLog(`获得${amount}灵石`, 'success');
    }

    // 辅助方法：添加物品
    addItem(itemName, count = 1) {
        if (!this.state.inventory[itemName]) {
            this.state.inventory[itemName] = 0;
        }
        this.state.inventory[itemName] += count;
        this.state.addLog(`获得${itemName} x${count}`, 'rare');
    }

    // 辅助方法：捕获宠物
    catchPet(petName) {
        if (this.state.petSystem) {
            return this.state.petSystem.catchPet(petName);
        }
        return { success: false, message: '宠物系统未初始化' };
    }

    // 辅助方法：获得法宝
    acquireArtifact(artifactId) {
        if (this.state.combatSystem) {
            return this.state.combatSystem.acquireArtifact(artifactId);
        }
        return { success: false, message: '战斗系统未初始化' };
    }

    // 辅助方法：学习功法
    learnSkill(skillName) {
        if (this.state.cultivationSystem) {
            return this.state.cultivationSystem.learnSkill(skillName);
        }
        return { success: false, message: '修炼系统未初始化' };
    }

    // 辅助方法：检查段位成就
    checkRealmAchievement() {
        if (this.state.cultivationSystem) {
            this.state.cultivationSystem.checkRealmAchievement();
        }
    }

    // 辅助方法：随机获得法宝
    grantRandomArtifact() {
        if (this.state.combatSystem) {
            this.state.combatSystem.grantRandomArtifact();
        }
    }

    // 辅助方法：更新任务进度
    updateQuestProgress(objectiveType, value) {
        if (this.state.questSystem) {
            this.state.questSystem.updateQuestProgress(objectiveType, value);
        }
    }
}
