/**
 * 宗门系统模块
 * 从 game.js 的 GameState 类中提取的宗门相关方法
 *
 * 包含功能：
 * - 加入宗门
 * - 退出宗门
 * - 执行宗门任务
 * - 宗门贡献度管理
 * - 宗门等级提升
 * - 宗门商店购买
 */

export class SectSystem {
    constructor(gameState) {
        this.state = gameState;
    }

    // 加入宗门
    joinSect(sectId) {
        const sect = this.state.sects.find(s => s.id === sectId);
        if (!sect) {
            return { success: false, message: '宗门不存在' };
        }

        // 检查要求
        if (sect.requirements.realm) {
            const realmNames = Object.keys(this.state.realms);
            const currentRealmIndex = realmNames.indexOf(this.state.realm);
            const requiredRealmIndex = realmNames.indexOf(sect.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${sect.requirements.realm}` };
            }

            if (currentRealmIndex === requiredRealmIndex && this.state.level < sect.requirements.level) {
                return { success: false, message: `层级不足，需要${sect.requirements.realm}${sect.requirements.level}层` };
            }
        }

        // 检查灵石
        if (this.state.spiritStones < sect.joinCost) {
            return { success: false, message: `灵石不足，需要${sect.joinCost}灵石` };
        }

        // 退出当前宗门
        if (this.state.sect !== 'none') {
            const currentSect = this.state.sects.find(s => s.id === this.state.sect);
            this.state.addLog(`退出了${currentSect.name}`, 'info');
        }

        // 加入新宗门
        this.state.spiritStones -= sect.joinCost;
        this.state.sect = sectId;
        this.state.sectContribution = 0;
        this.state.sectRank = '外门弟子';
        this.state.sectReputation = 0;

        this.state.addLog(`成功加入${sect.name}！`, 'legendary');
        return { success: true, message: `成功加入${sect.name}` };
    }

    // 退出宗门
    leaveSect() {
        if (this.state.sect === 'none') {
            return { success: false, message: '未加入宗门' };
        }

        const currentSect = this.state.sects.find(s => s.id === this.state.sect);

        // 退出宗门会失去所有贡献度和声望
        this.state.sect = 'none';
        this.state.sectContribution = 0;
        this.state.sectRank = '外门弟子';
        this.state.sectReputation = 0;

        this.state.addLog(`退出了${currentSect.name}，失去了所有贡献度和声望`, 'info');
        return { success: true, message: '退出宗门' };
    }

    // 执行宗门任务
    doSectTask(taskId) {
        if (this.state.sect === 'none') {
            return { success: false, message: '未加入宗门，无法执行宗门任务' };
        }

        const task = this.state.sectTasks.find(t => t.id === taskId);
        if (!task) {
            return { success: false, message: '任务不存在' };
        }

        // 检查要求
        if (task.requirements.minRealm) {
            const realmNames = Object.keys(this.state.realms);
            const currentRealmIndex = realmNames.indexOf(this.state.realm);
            const requiredRealmIndex = realmNames.indexOf(task.requirements.minRealm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${task.requirements.minRealm}` };
            }
        }

        if (task.requirements.minLevel && this.state.level < task.requirements.minLevel) {
            return { success: false, message: `层级不足，需要${task.requirements.minLevel}层` };
        }

        const canDo = this.canDoAction('work');
        if (!canDo.can) {
            return { success: false, message: canDo.message };
        }

        this.state.isWorking = true;
        this.state.workEndTime = Date.now() + task.duration;
        this.state.currentJob = { name: `宗门任务: ${task.name}` };

        this.state.addLog(`开始执行宗门任务：${task.name}，预计${task.duration/1000}秒完成`, 'info');
        if (task.specialReward) {
            this.state.addLog(`特殊奖励: ${task.specialReward}`, 'rare');
        }

        // 模拟任务过程
        setTimeout(() => {
            this.state.isWorking = false;
            this.state.workEndTime = 0;
            this.state.currentJob = null;

            const rankBonus = this.getSectRankBonus().taskBonus;

            const contribution = Math.floor(Math.random() * (task.contributionReward[1] - task.contributionReward[0]) + task.contributionReward[0] * rankBonus);
            const spiritStones = Math.floor(Math.random() * (task.spiritStonesReward[1] - task.spiritStonesReward[0]) + task.spiritStonesReward[0]);
            const experience = task.experienceReward ? Math.floor(Math.random() * (task.experienceReward[1] - task.experienceReward[0]) + task.experienceReward[0] * rankBonus) : 0;

            this.state.sectContribution += contribution;
            this.addSpiritStones(spiritStones);

            let logMessage = `宗门任务完成！获得${contribution}贡献，${spiritStones}灵石`;
            if (experience > 0) {
                this.addCultivation(experience);
                logMessage += `，${experience}修为`;
            }

            // 特殊奖励机制
            const specialChance = Math.random();
            if (specialChance < 0.15) {
                // 15%概率获得特殊奖励
                const specialRewards = ['聚气丹', '筑基丹', '洗髓丹', '悟性丹', '灵石袋'];
                const reward = specialRewards[Math.floor(Math.random() * specialRewards.length)];
                this.addItem(reward);
                logMessage += `，特殊奖励：${reward}`;
            } else if (specialChance > 0.95) {
                // 5%概率获得稀有奖励
                const rareRewards = ['天劫符', '灵宠丹'];
                const reward = rareRewards[Math.floor(Math.random() * rareRewards.length)];
                this.addItem(reward);
                logMessage += `，稀有奖励：${reward}`;
            }

            this.state.addLog(logMessage, 'legendary');

            // 检查是否可以提升宗门等级
            this.checkSectRankPromotion();
        }, task.duration);

        return { success: true, message: `开始执行${task.name}` };
    }

    // 增加宗门贡献
    addSectContribution(amount) {
        if (this.state.sect === 'none') {
            return { success: false, message: '未加入宗门' };
        }

        this.state.sectContribution += amount;
        this.state.addLog(`宗门贡献+${amount}`, 'success');

        // 检查是否可以提升等级
        this.checkSectRankPromotion();

        return { success: true, message: `贡献+${amount}` };
    }

    // 减少宗门贡献
    spendSectContribution(amount) {
        if (this.state.sect === 'none') {
            return { success: false, message: '未加入宗门' };
        }

        if (this.state.sectContribution < amount) {
            return { success: false, message: '贡献度不足' };
        }

        this.state.sectContribution -= amount;
        return { success: true, message: `消耗${amount}贡献` };
    }

    // 获取当前宗门等级加成
    getSectRankBonus() {
        if (this.state.sect === 'none') return { taskBonus: 1.0, shopDiscount: 1.0 };

        const rank = this.state.sectRanks[this.state.sectRank];
        return {
            taskBonus: rank.taskBonus,
            shopDiscount: rank.shopDiscount
        };
    }

    // 检查并提升宗门等级
    checkSectRankPromotion() {
        if (this.state.sect === 'none') return;

        const currentRank = this.state.sectRanks[this.state.sectRank];
        if (!currentRank) return;

        // 查找下一个等级
        const nextRanks = Object.entries(this.state.sectRanks)
            .filter(([_, rank]) => rank.level === currentRank.level + 1);

        for (const [rankName, rankConfig] of nextRanks) {
            // 检查升级条件
            const hasEnoughContribution = this.state.sectContribution >= rankConfig.minContribution;
            const hasEnoughRealm = this.checkRealmRequirement(rankConfig.minRealm);

            if (hasEnoughContribution && hasEnoughRealm) {
                this.state.sectRank = rankName;
                this.state.addLog(`恭喜！你在宗门中晋升为${rankName}！`, 'legendary');
                this.state.addLog(`新的身份享有${(rankConfig.taskBonus * 100 - 100).toFixed(0)}%任务奖励加成`, 'rare');
            }
        }
    }

    // 检查境界要求
    checkRealmRequirement(requiredRealm) {
        if (!requiredRealm) return true;

        const realmNames = Object.keys(this.state.realms);
        const currentRealmIndex = realmNames.indexOf(this.state.realm);
        const requiredRealmIndex = realmNames.indexOf(requiredRealm);

        return currentRealmIndex >= requiredRealmIndex;
    }

    // 检查宗门权限
    hasSectPermission(permission) {
        if (this.state.sect === 'none') return false;

        const rank = this.state.sectRanks[this.state.sectRank];
        return rank.permissions.includes(permission) || rank.permissions.includes('all');
    }

    // 从宗门商店购买
    buyFromSectShop(itemType, itemName) {
        if (this.state.sect === 'none') {
            return { success: false, message: '未加入宗门，无法购买' };
        }

        const shop = this.state.sectShop;
        const items = itemType === 'skills' ? shop.skills : shop.items;

        const shopItem = items.find(item => item.name === itemName);
        if (!shopItem) {
            return { success: false, message: '商品不存在' };
        }

        // 检查要求
        if (shopItem.requirements.minRealm) {
            const realmNames = Object.keys(this.state.realms);
            const currentRealmIndex = realmNames.indexOf(this.state.realm);
            const requiredRealmIndex = realmNames.indexOf(shopItem.requirements.minRealm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${shopItem.requirements.minRealm}` };
            }
        }

        if (shopItem.requirements.sect && this.state.sect !== shopItem.requirements.sect) {
            return { success: false, message: `此商品仅特定宗门可购买` };
        }

        // 应用宗门等级折扣
        const rankBonus = this.getSectRankBonus().shopDiscount;
        const finalPrice = Math.floor(shopItem.price * rankBonus);

        // 检查货币
        if (shopItem.currency === 'spiritStones') {
            if (this.state.spiritStones < finalPrice) {
                return { success: false, message: '灵石不足' };
            }
            this.state.spiritStones -= finalPrice;
        } else if (shopItem.currency === 'contribution') {
            if (this.state.sectContribution < finalPrice) {
                return { success: false, message: '贡献度不足' };
            }
            this.state.sectContribution -= finalPrice;
        }

        // 发放商品
        if (itemType === 'skills') {
            if (this.state.cultivationSystem) {
                const result = this.state.cultivationSystem.learnSkill(itemName);
                if (result.success) {
                    this.state.addLog(`从宗门购买了${itemName}，消耗${finalPrice}${shopItem.currency === 'spiritStones' ? '灵石' : '贡献'}`, 'success');
                }
                return result;
            }
        } else {
            this.addItem(itemName);
            this.state.addLog(`从宗门购买了${itemName}，消耗${finalPrice}${shopItem.currency === 'spiritStones' ? '灵石' : '贡献'}`, 'success');
            return { success: true, message: `购买${itemName}成功` };
        }

        return { success: false, message: '购买失败' };
    }

    // 获取宗门信息
    getSectInfo() {
        if (this.state.sect === 'none') {
            return null;
        }

        const sect = this.state.sects.find(s => s.id === this.state.sect);
        return {
            ...sect,
            currentRank: this.state.sectRank,
            contribution: this.state.sectContribution,
            reputation: this.state.sectReputation,
            rankBonus: this.getSectRankBonus()
        };
    }

    // 获取可用的宗门任务列表
    getAvailableSectTasks() {
        if (this.state.sect === 'none') {
            return [];
        }

        const availableTasks = [];
        const realmIndex = Object.keys(this.state.realms).indexOf(this.state.realm);

        for (const task of this.state.sectTasks) {
            // 检查境界要求
            if (task.requirements.minRealm) {
                const reqRealmIndex = Object.keys(this.state.realms).indexOf(task.requirements.minRealm);
                if (realmIndex < reqRealmIndex) {
                    continue;
                }
            }

            // 检查层级要求
            if (task.requirements.minLevel && this.state.level < task.requirements.minLevel) {
                continue;
            }

            availableTasks.push(task);
        }

        return availableTasks;
    }

    // 检查是否可以进行某个操作
    canDoAction(action) {
        if (this.state.isAdventuring) {
            return { can: false, message: '历练中无法执行' };
        }
        if (this.state.isWorking) {
            return { can: false, message: '正在工作中' };
        }
        if (this.state.isExploring) {
            return { can: false, message: '探索秘境中无法执行' };
        }
        if (this.state.isMeditating) {
            return { can: false, message: '入定中无法执行' };
        }
        return { can: true };
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
