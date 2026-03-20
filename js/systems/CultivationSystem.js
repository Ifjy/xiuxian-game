/**
 * 修炼系统模块
 * 从 game.js 的 GameState 类中提取的修炼相关方法
 *
 * 包含功能：
 * - 修为计算和增加
 * - 境界突破
 * - 功法学习
 * - 灵根相关计算
 * - 修炼速度计算
 */

export class CultivationSystem {
    constructor(gameState) {
        this.state = gameState;
    }

    // 计算当前层级的修炼需求
    calculateCultivationRequirement() {
        const realmConfig = this.state.realms[this.state.realm];
        const levelIndex = this.state.level - 1;

        let requirement = realmConfig.baseRequirement;
        requirement *= Math.pow(realmConfig.growthMultiplier, levelIndex);

        // 根骨影响修为需求
        requirement *= (1 - this.state.talents.potential * 0.02);

        return Math.floor(requirement);
    }

    // 计算基础修炼速度
    calculateBaseCultivationRate() {
        const realmConfig = this.state.realms[this.state.realm];
        let rate = realmConfig.baseCultivationRate;

        // 灵根加成（最重要的加成）
        rate *= this.getSpiritualRootCultivationBonus();

        // 功法加成
        if (this.state.currentSkill && this.state.skills[this.state.currentSkill]) {
            const skill = this.state.skills[this.state.currentSkill];
            if (skill.effect === 'cultivation_speed') {
                rate *= (1 + skill.value * this.state.skills[this.state.currentSkill].level);
            }
        }

        // 宠物加成
        if (this.state.currentPet) {
            const pet = this.state.pets[this.state.currentPet];
            if (pet.effect === 'cultivation_boost') {
                rate *= (1 + pet.value * this.state.pets[this.state.currentPet].level * 0.1);
            }
        }

        // 法宝加成
        for (const [slot, artifact] of Object.entries(this.state.equippedArtifacts)) {
            if (artifact) {
                const stats = this.calculateArtifactStats(artifact);
                rate *= (1 + stats.cultivation * 0.01); // 法宝修炼加成
            }
        }

        // 宗门加成
        if (this.state.sect !== 'none') {
            const sect = this.state.sects.find(s => s.id === this.state.sect);
            if (sect && sect.benefits.cultivationBonus) {
                rate *= (1 + sect.benefits.cultivationBonus);
            }
        }

        // 悟性影响修炼速度
        rate *= (1 + this.state.talents.wisdom * 0.05);

        return rate;
    }

    // 计算实际修炼速度
    calculateActualCultivationRate() {
        const base = this.calculateBaseCultivationRate();

        // 计算打坐倍率（实时获取）
        const meditationMultiplier = this.state.isMeditating ? 3.0 : 1.0;

        // 获取物品buff倍率
        const itemBuffMultiplier = this.state.buffs.cultivation.multiplier || 1.0;

        // 打坐和物品效果是乘法叠加
        const totalMultiplier = meditationMultiplier * itemBuffMultiplier;

        // 随时间有小幅波动
        const timeFactor = 0.8 + Math.random() * 0.4;

        // 幸运影响修炼波动
        let luckFactor = this.state.talents.luck * 0.01;
        if (this.state.buffs.luck) {
            luckFactor += this.state.buffs.luck.value * 0.02;
        }

        const finalFactor = timeFactor + luckFactor;

        return base * totalMultiplier * finalFactor;
    }

    // 增加修为
    addCultivation(amount) {
        // amount 应该是每秒修为的基础值，不需要再次计算
        const oldCultivation = this.state.cultivation;
        this.state.cultivation = Math.floor(this.state.cultivation + amount);

        // 更新任务进度（使用try-catch防止错误影响修炼）
        try {
            this.updateQuestProgress('cultivate', amount);
        } catch (error) {
            console.error('任务进度更新失败:', error);
        }

        // 先检查是否达到自动突破条件（在限制之前）
        if (oldCultivation < this.state.maxCultivation * 2 && this.state.cultivation >= this.state.maxCultivation * 2) {
            this.autoBreakthrough();
        }

        // 限制修为不超过最大值的2倍（为自动突破留出空间）
        if (this.state.cultivation >= this.state.maxCultivation * 2) {
            this.state.cultivation = this.state.maxCultivation * 2;
        }

        // 检查段位成就
        this.checkRealmAchievement();

        return this.state.cultivation >= this.state.maxCultivation;
    }

    // 自动突破
    autoBreakthrough() {
        const realmConfig = this.state.realms[this.state.realm];
        const maxLevel = realmConfig.levels;

        // 检查是否已经是该境界最高层
        if (this.state.level >= maxLevel) {
            // 尝试突破到下一个境界
            const success = Math.random() < 0.5;
            if (success) {
                const realmNames = Object.keys(this.state.realms);
                const currentIndex = realmNames.indexOf(this.state.realm);

                if (currentIndex < realmNames.length - 1) {
                    this.state.realm = realmNames[currentIndex + 1];
                    this.state.level = 1;
                    this.state.cultivation = 0;
                    this.state.maxCultivation = this.calculateCultivationRequirement();
                    this.state.addLog(`修为爆满，自动突破！进入${this.state.realm}！`, 'legendary');
                } else {
                    this.state.addLog('你已达到修仙界的巅峰！修为继续积累...', 'legendary');
                }
            } else {
                // 突破失败，损失一半修为
                const loss = Math.floor(this.state.maxCultivation * 0.5);
                this.state.cultivation = Math.max(0, this.state.cultivation - loss);
                this.state.addLog(`自动突破失败！损失${loss}修为`, 'danger');
            }
        } else {
            // 同境界内升级
            this.state.level++;
            this.state.cultivation = 0;
            this.state.maxCultivation = this.calculateCultivationRequirement();
            this.state.addLog(`修为爆满，自动突破到${this.state.realm} ${this.state.level}层！`, 'success');
        }

        this.checkRealmAchievement();
    }

    // 计算突破成功率
    calculateBreakthroughChance() {
        const realmConfig = this.state.realms[this.state.realm];
        let chance = realmConfig.breakthroughBaseChance;

        // 每层成功率递减
        const levelPenalty = Math.log(this.state.level + 1) * 0.1;
        chance -= levelPenalty;

        // 悟性影响突破成功率
        chance += this.state.talents.wisdom * 0.02;

        // 功法加成
        if (this.state.currentSkill && this.state.skills[this.state.currentSkill]) {
            const skill = this.state.skills[this.state.currentSkill];
            if (skill.effect === 'breakthrough_chance') {
                chance += skill.value * this.state.skills[this.state.currentSkill].level;
            }
        }

        // 加上buff加成
        chance += this.state.buffs.breakthrough.bonus;

        // 添加随机波动
        const variance = realmConfig.breakthroughVariance;
        chance += (Math.random() - 0.5) * variance;

        // 限制在0.05-0.95之间
        return Math.max(0.05, Math.min(0.95, chance));
    }

    // 检查是否可以突破
    canBreakthrough() {
        return this.state.cultivation >= this.state.maxCultivation;
    }

    // 尝试突破
    attemptBreakthrough() {
        if (!this.canBreakthrough()) {
            return { success: false, message: '修为不足，无法突破' };
        }

        // 检查是否需要渡劫（大境界突破）
        const needsTribulation = this.state.level >= this.state.realms[this.state.realm].levels;
        const nextRealm = this.getNextRealm();

        if (needsTribulation && nextRealm && this.state.heavenlyTribulations[nextRealm]) {
            // 需要渡劫
            return {
                success: false,
                needTribulation: true,
                targetRealm: nextRealm,
                message: `突破到${nextRealm}需要渡过${this.state.heavenlyTribulations[nextRealm].name}！`
            };
        }

        const chance = this.calculateBreakthroughChance();
        const success = Math.random() < chance;

        if (success) {
            const realmConfig = this.state.realms[this.state.realm];

            if (this.state.level < realmConfig.levels) {
                this.state.level++;
                this.state.addLog(`恭喜！突破成功！达到${this.state.realm} ${this.state.level}层`, 'success');
            } else {
                // 这里不会到达，因为上面检查了needsTribulation
                const realmNames = Object.keys(this.state.realms);
                const currentIndex = realmNames.indexOf(this.state.realm);

                if (currentIndex < realmNames.length - 1) {
                    this.state.realm = realmNames[currentIndex + 1];
                    this.state.level = 1;
                    this.state.addLog(`境界突破！进入${this.state.realm}！`, 'legendary');
                } else {
                    this.state.addLog('你已达到修仙界的巅峰！即将飞升！', 'legendary');
                }
            }

            this.state.cultivation = Math.floor(this.state.maxCultivation * 0.1);
            this.state.maxCultivation = this.calculateCultivationRequirement();

            // 检查并学习新的战斗技能
            this.checkAndLearnCombatSkills();

            // 更新任务进度
            try {
                this.updateQuestProgress('breakthrough', this.state.level);
            } catch (error) {
                console.error('任务进度更新失败:', error);
            }

            return { success: true, message: '突破成功！' };
        } else {
            const failurePenalty = Math.floor(this.state.maxCultivation * 0.2);
            this.state.cultivation = Math.max(0, this.state.cultivation - failurePenalty);

            this.state.addLog(`突破失败！损失${failurePenalty}修为`, 'danger');
            return { success: false, message: '突破失败！修为受损' };
        }
    }

    // 获取下一个境界
    getNextRealm() {
        const realmNames = Object.keys(this.state.realms);
        const currentIndex = realmNames.indexOf(this.state.realm);
        if (currentIndex < realmNames.length - 1) {
            return realmNames[currentIndex + 1];
        }
        return null;
    }

    // 学习功法
    learnSkill(skillName) {
        if (this.state.skills[skillName]) {
            return { success: false, message: '已经学过此功法' };
        }

        const skill = this.state.skills[skillName];
        if (!skill) {
            return { success: false, message: '未知功法' };
        }

        // 检查要求
        if (skill.requirements.realm) {
            const realmNames = Object.keys(this.state.realms);
            const currentRealmIndex = realmNames.indexOf(this.state.realm);
            const requiredRealmIndex = realmNames.indexOf(skill.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${skill.requirements.realm}` };
            }

            if (currentRealmIndex === requiredRealmIndex && this.state.level < skill.requirements.level) {
                return { success: false, message: `层级不足，需要${skill.requirements.realm}${skill.requirements.level}层` };
            }
        }

        this.state.skills[skillName] = { level: 1 };
        this.state.addLog(`学会了${skillName}！`, 'legendary');
        return { success: true, message: `学会了${skillName}` };
    }

    // 升级功法
    upgradeSkill(skillName) {
        if (!this.state.skills[skillName]) {
            return { success: false, message: '未学过此功法' };
        }

        const skill = this.state.skills[skillName];
        const currentLevel = this.state.skills[skillName].level;

        if (currentLevel >= skill.maxLevel) {
            return { success: false, message: '功法已至最高层' };
        }

        // 计算升级消耗
        const cost = 100 * currentLevel;
        if (this.state.spiritStones < cost) {
            return { success: false, message: `灵石不足，需要${cost}灵石` };
        }

        this.state.spiritStones -= cost;
        this.state.skills[skillName].level++;
        this.state.addLog(`${skillName}升至${this.state.skills[skillName].level}层！`, 'success');
        return { success: true, message: `${skillName}升级成功` };
    }

    // 设置当前功法
    setCurrentSkill(skillName) {
        if (!this.state.skills[skillName]) {
            return { success: false, message: '未学过此功法' };
        }

        this.state.currentSkill = skillName;
        this.state.addLog(`切换功法为${skillName}`, 'info');
        return { success: true, message: `切换功法为${skillName}` };
    }

    // 计算灵根对修炼速度的影响
    getSpiritualRootCultivationBonus() {
        const rootConfig = this.getSpiritualRootConfig();
        if (!rootConfig) return 1.0;
        return rootConfig.cultivationBonus || 1.0;
    }

    // 计算灵根对功法学习的影响
    getSpiritualRootSkillBonus() {
        const rootConfig = this.getSpiritualRootConfig();
        if (!rootConfig) return 1.0;
        return rootConfig.skillBonus || 1.0;
    }

    // 计算灵根对炼丹的影响
    getSpiritualRootAlchemyBonus() {
        const rootConfig = this.getSpiritualRootConfig();
        if (!rootConfig) return 1.0;
        return rootConfig.alchemyBonus || 1.0;
    }

    // 获取灵根配置
    getSpiritualRootConfig() {
        if (!this.state.spiritualRoot) return null;
        return this.state.spiritualRoots[this.state.spiritualRoot];
    }

    // 检查段位成就
    checkRealmAchievement() {
        const achievement = this.state.realmAchievements[this.state.realm];
        if (!achievement) return;

        if (this.state.level === achievement.requirements.level) {
            if (this.state.achievements.includes(achievement.id)) return;

            this.state.achievements.push(achievement.id);

            const random = Math.random();
            const isGood = random < achievement.rewards.good.chance;

            if (isGood) {
                const reward = achievement.rewards.good;
                this.state.addLog(`🏆 段位成就：${achievement.name}！${reward.message}`, 'legendary');

                if (reward.cultivation) {
                    this.addCultivation(reward.cultivation);
                }
                if (reward.items && reward.items.length > 0) {
                    for (const item of reward.items) {
                        this.addItem(item);
                    }
                }
            } else {
                const penalty = achievement.rewards.bad;
                this.state.addLog(`⚠️ 段位考验失败！${penalty.message}`, 'danger');

                if (penalty.cultivation && penalty.cultivation < 0) {
                    this.state.cultivation = Math.max(0, this.state.cultivation + penalty.cultivation);
                }
            }
        }
    }

    // 检查并学习新的战斗技能
    checkAndLearnCombatSkills() {
        for (const [skillId, skill] of Object.entries(this.state.combatSkills)) {
            // 跳过已学会的技能
            if (this.state.combatSkills[skillId] && this.state.combatSkills[skillId].learned) {
                continue;
            }

            // 检查是否满足技能要求
            if (skill.requirements.realm) {
                const realmNames = Object.keys(this.state.realms);
                const currentRealmIndex = realmNames.indexOf(this.state.realm);
                const requiredRealmIndex = realmNames.indexOf(skill.requirements.realm);

                if (currentRealmIndex >= requiredRealmIndex) {
                    if (currentRealmIndex === requiredRealmIndex && this.state.level < skill.requirements.level) {
                        continue; // 同境界但层级不够
                    }

                    // 满足条件，自动学习
                    const result = this.learnCombatSkill(skillId);
                    if (result.success) {
                        this.state.addLog(`突破境界，领悟了${skill.name}！`, 'rare');
                    }
                }
            }
        }
    }

    // 辅助方法：计算法宝属性
    calculateArtifactStats(artifact) {
        if (!artifact) return { attack: 0, defense: 0, cultivation: 0 };

        const levelMultiplier = 1 + (artifact.level - 1) * 0.2; // 每级+20%

        return {
            attack: Math.floor(artifact.baseStats.attack * levelMultiplier),
            defense: Math.floor(artifact.baseStats.defense * levelMultiplier),
            cultivation: Math.floor(artifact.baseStats.cultivation * levelMultiplier)
        };
    }

    // 辅助方法：添加物品
    addItem(itemName, count = 1) {
        if (!this.state.inventory[itemName]) {
            this.state.inventory[itemName] = 0;
        }
        this.state.inventory[itemName] += count;
        this.state.addLog(`获得${itemName} x${count}`, 'rare');
    }

    // 辅助方法：更新任务进度
    updateQuestProgress(objectiveType, value) {
        // 这个方法应该由 QuestSystem 提供
        // 这里提供一个占位实现，实际使用时应该调用 QuestSystem 的方法
        if (this.state.questSystem) {
            this.state.questSystem.updateQuestProgress(objectiveType, value);
        }
    }

    // 辅助方法：学习战斗技能
    learnCombatSkill(skillId) {
        // 这个方法应该由 CombatSystem 提供
        // 这里提供一个占位实现
        if (this.state.combatSystem) {
            return this.state.combatSystem.learnCombatSkill(skillId);
        }
        return { success: false, message: '战斗系统未初始化' };
    }

    // 开始入定
    startMeditation() {
        // 检查是否可以入定
        if (this.state.isMeditating) {
            this.state.addLog('已经在入定状态了！', 'warning');
            return false;
        }

        if (this.state.isAdventuring) {
            this.state.addLog('历练中无法入定！', 'danger');
            return false;
        }

        if (this.state.isWorking) {
            this.state.addLog('打工中无法入定！', 'danger');
            return false;
        }

        // 开始入定 - 不修改物品buff，只设置打坐状态
        this.state.isMeditating = true;
        this.state.meditationEndTime = Date.now() + 30000; // 30秒后自动停止打坐
        this.state.addLog('进入深度入定状态，修炼速度提升3倍，持续30秒', 'success');
        return true;
    }

    // 停止入定
    stopMeditation() {
        if (!this.state.isMeditating) return false;

        this.state.isMeditating = false;
        // 不再重置buff.multiplier和endTime，让物品buff自然过期
        this.state.addLog('结束入定', 'info');
        return true;
    }
}
