/**
 * 战斗系统模块
 * 从 game.js 的 GameState 类中提取的战斗相关方法
 *
 * 包含功能：
 * - 计算战斗属性
 * - 战斗逻辑
 * - 学习战斗技能
 * - 使用战斗技能
 * - 渡劫系统
 * - 法宝管理
 */

export class CombatSystem {
    constructor(gameState) {
        this.state = gameState;
    }

    // 计算战斗属性
    calculateCombatStats() {
        const realmConfig = this.state.realms[this.state.realm];
        let attack = realmConfig.baseAttack;
        let defense = realmConfig.baseDefense;
        let health = realmConfig.baseHealth;

        // 根骨影响生命值和防御
        health *= (1 + this.state.talents.potential * 0.1);
        defense *= (1 + this.state.talents.potential * 0.05);

        // 悟性影响攻击
        attack *= (1 + this.state.talents.wisdom * 0.05);

        // 幸运影响暴击（通过计算战斗时体现）
        let luckBonus = this.state.talents.luck * 0.02;
        if (this.state.buffs.luck) {
            luckBonus += this.state.buffs.luck.value * 0.02;
        }

        // 功法加成
        if (this.state.currentSkill && this.state.skills[this.state.currentSkill]) {
            const skill = this.state.skills[this.state.currentSkill];
            const skillLevel = this.state.skills[this.state.currentSkill].level;

            if (skill.effect === 'attack_boost') {
                attack *= (1 + skill.value * skillLevel);
            } else if (skill.effect === 'defense_boost') {
                defense *= (1 + skill.value * skillLevel);
            } else if (skill.effect === 'all_stats') {
                attack *= (1 + skill.value * skillLevel);
                defense *= (1 + skill.value * skillLevel);
                health *= (1 + skill.value * skillLevel * 0.05);
            } else if (skill.effect === 'cultivation_speed') {
                // 修炼速度不影响战斗
            } else if (skill.effect === 'health_regen') {
                health *= (1 + skill.value * skillLevel * 0.1);
            }
        }

        // 宠物加成
        if (this.state.currentPet && this.state.pets[this.state.currentPet]) {
            const pet = this.state.pets[this.state.currentPet];
            const petLevel = this.state.pets[this.state.currentPet].level;

            if (pet.effect === 'attack_boost') {
                attack *= (1 + pet.value * petLevel * 0.1);
            } else if (pet.effect === 'defense_boost') {
                defense *= (1 + pet.value * petLevel * 0.1);
            } else if (pet.effect === 'all_stats') {
                attack *= (1 + pet.value * petLevel * 0.1);
                defense *= (1 + pet.value * petLevel * 0.1);
                health *= (1 + pet.value * petLevel * 0.05);
            } else if (pet.effect === 'luck_boost') {
                luckBonus += pet.value * petLevel * 0.1;
            }
        }

        // 法宝加成
        for (const [slot, artifact] of Object.entries(this.state.equippedArtifacts)) {
            if (artifact) {
                const stats = this.calculateArtifactStats(artifact);
                attack += stats.attack;
                defense += stats.defense;

                // 法宝修炼加成直接加到基础修炼速度
                // (在calculateActualCultivationRate中应用)
            }
        }

        // 宗门加成
        if (this.state.sect !== 'none') {
            const sect = this.state.sects.find(s => s.id === this.state.sect);
            if (sect && sect.benefits.attackBonus) {
                attack *= (1 + sect.benefits.attackBonus);
            }
            if (sect && sect.benefits.defenseBonus) {
                defense *= (1 + sect.benefits.defenseBonus);
            }
            if (sect && sect.benefits.healthBonus) {
                health *= (1 + sect.benefits.healthBonus);
            }
        }

        return {
            attack: Math.floor(attack),
            defense: Math.floor(defense),
            health: Math.floor(health),
            luckBonus: luckBonus
        };
    }

    // 计算境界压制
    calculateRealmSuppression(targetRealm, targetLevel) {
        const realmNames = Object.keys(this.state.realms);
        const playerRealmIndex = realmNames.indexOf(this.state.realm);
        const targetRealmIndex = realmNames.indexOf(targetRealm);

        // 同境界，计算层级压制
        if (playerRealmIndex === targetRealmIndex) {
            const levelDiff = this.state.level - targetLevel;
            if (levelDiff > 0) {
                // 玩家层级更高，有轻微压制
                return {
                    hasSuppression: true,
                    suppressionLevel: 'minor',
                    multiplier: 1 + (levelDiff * 0.1), // 每高1层加10%
                    description: `${levelDiff}层压制`
                };
            }
            return { hasSuppression: false, multiplier: 1 };
        }

        // 不同境界，计算境界压制
        const realmDiff = playerRealmIndex - targetRealmIndex;

        if (realmDiff > 0) {
            // 玩家境界更高，有境界压制
            // 1个大境界压制 = 2倍属性差距
            const baseMultiplier = 1 + (realmDiff * 1.0);

            return {
                hasSuppression: true,
                suppressionLevel: realmDiff >= 3 ? 'major' : 'moderate',
                multiplier: baseMultiplier,
                description: `${realmDiff}个大境界压制`
            };
        } else if (realmDiff < 0) {
            // 玩家境界更低，被境界压制
            // 被压制时，玩家属性降低
            const baseMultiplier = 1 / (1 + Math.abs(realmDiff) * 1.0);

            return {
                hasSuppression: true,
                suppressionLevel: 'suppressed',
                multiplier: baseMultiplier,
                description: `被${Math.abs(realmDiff)}个大境界压制`
            };
        }

        return { hasSuppression: false, multiplier: 1 };
    }

    // 战斗怪物
    fightMonster(monsterId, skillId = null) {
        const monster = this.state.monsters.find(m => m.id === monsterId);
        if (!monster) {
            return { success: false, message: '怪物不存在' };
        }

        // 检查要求
        if (monster.requirements.realm) {
            const realmNames = Object.keys(this.state.realms);
            const currentRealmIndex = realmNames.indexOf(this.state.realm);
            const requiredRealmIndex = realmNames.indexOf(monster.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${monster.requirements.realm}` };
            }

            if (currentRealmIndex === requiredRealmIndex && this.state.level < monster.requirements.level) {
                return { success: false, message: `层级不足，需要${monster.requirements.realm}${monster.requirements.level}层` };
            }
        }

        // 处理技能
        let skillUsed = null;
        let skillBonusText = '';

        if (skillId && this.state.combatSkills[skillId] && this.state.combatSkills[skillId].learned) {
            const canUse = this.canUseSkill(skillId);
            if (canUse.can) {
                skillUsed = this.state.combatSkills[skillId];

                // 设置技能冷却
                if (skillUsed.cooldown > 0) {
                    this.state.combatSkillCooldowns[skillId] = Date.now() + skillUsed.cooldown * 1000;
                }

                // 更新技能使用次数
                this.state.combatSkills[skillId].timesUsed++;

                skillBonusText = `使用${skillUsed.name}，威力${skillUsed.power}倍！`;
            }
        }

        // 计算玩家属性
        const playerStats = this.calculateCombatStats();

        // 计算境界压制
        const suppression = this.calculateRealmSuppression(monster.requirements.realm, monster.requirements.level);

        // 应用压制
        const finalAttack = Math.floor(playerStats.attack * suppression.multiplier);
        const finalDefense = Math.floor(playerStats.defense * suppression.multiplier);

        // 技能加成
        const skillMultiplier = skillUsed ? skillUsed.power : 1.0;

        // 战斗计算
        const playerDamage = Math.max(1, finalAttack - monster.defense) * skillMultiplier;
        const monsterDamage = Math.max(1, monster.attack - finalDefense);

        // 计算回合数
        const playerRounds = Math.ceil(monster.hp / playerDamage);
        const monsterRounds = Math.ceil(playerStats.health / monsterDamage);

        // 幸运加成（暴击）
        const isCritical = Math.random() < playerStats.luckBonus;
        const critMultiplier = isCritical ? 1.5 : 1.0;

        if (playerRounds <= monsterRounds * critMultiplier) {
            // 胜利
            const spiritStones = Math.floor(Math.random() * (monster.rewards.spiritStones[1] - monster.rewards.spiritStones[0]) + monster.rewards.spiritStones[0]);
            const cultivation = Math.floor(Math.random() * (monster.rewards.cultivation[1] - monster.rewards.cultivation[0]) + monster.rewards.cultivation[0]);

            this.addSpiritStones(spiritStones);
            this.addCultivation(cultivation);

            const droppedItems = [];
            if (Math.random() < monster.rewards.dropRate) {
                const droppedItem = monster.rewards.items[Math.floor(Math.random() * monster.rewards.items.length)];
                this.addItem(droppedItem);
                droppedItems.push(droppedItem);
            }

            // 检查受伤
            const cultivationLoss = Math.floor(monsterRounds * monsterDamage * 0.1);
            if (cultivationLoss > 0) {
                this.state.cultivation = Math.max(0, this.state.cultivation - cultivationLoss);
            }

            // 更新最高伤害记录
            if (skillUsed) {
                const totalDamage = playerDamage * playerRounds;
                if (!this.state.combatSkills[skillId].highestDamage || totalDamage > this.state.combatSkills[skillId].highestDamage) {
                    this.state.combatSkills[skillId].highestDamage = Math.floor(totalDamage);
                }
            }

            let message = `战胜了${monster.name}！${skillBonusText}${suppression.hasSuppression ? suppression.description : ''}获得${spiritStones}灵石，${cultivation}修为`;
            if (droppedItems.length > 0) {
                message += `，获得${droppedItems.join('、')}`;
            }
            if (cultivationLoss > 0) {
                message += `，战斗受伤损失${cultivationLoss}修为`;
            }

            this.state.addLog(message, 'success');
            return { success: true, victory: true, message };
        } else {
            // 失败，受到惩罚
            const spiritStonesLost = Math.floor(this.state.spiritStones * 0.1);
            const cultivationLost = Math.floor(Math.random() * 100 + 50);

            this.state.spiritStones = Math.max(0, this.state.spiritStones - spiritStonesLost);
            this.state.cultivation = Math.max(0, this.state.cultivation - cultivationLost);

            const message = `被${monster.name}击败！${skillBonusText}损失${spiritStonesLost}灵石，${cultivationLost}修为`;
            this.state.addLog(message, 'danger');
            return { success: false, victory: false, message };
        }
    }

    // 学习战斗技能
    learnCombatSkill(skillId) {
        const skill = this.state.combatSkills[skillId];
        if (!skill) {
            return { success: false, message: '技能不存在' };
        }

        // 检查是否已学会
        if (this.state.combatSkills[skillId]) {
            return { success: false, message: '已学会此技能' };
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

        // 学习技能
        this.state.combatSkills[skillId] = {
            learned: true,
            timesUsed: 0,
            highestDamage: 0
        };

        this.state.addLog(`学会了战斗技能：${skill.name}！`, 'legendary');
        return { success: true, message: `学会${skill.name}` };
    }

    // 检查技能冷却
    canUseSkill(skillId) {
        const skill = this.state.combatSkills[skillId];
        if (!skill || !this.state.combatSkills[skillId]) {
            return { can: false, message: '未学会此技能' };
        }

        // 检查冷却时间
        if (this.state.combatSkillCooldowns[skillId]) {
            const cooldownEnd = this.state.combatSkillCooldowns[skillId];
            if (Date.now() < cooldownEnd) {
                const remainingTime = Math.ceil((cooldownEnd - Date.now()) / 1000);
                return { can: false, message: `冷却中，还需${remainingTime}秒` };
            }
        }

        return { can: true };
    }

    // 获取可用技能列表
    getAvailableCombatSkills() {
        const availableSkills = [];
        const realmIndex = Object.keys(this.state.realms).indexOf(this.state.realm);

        for (const [skillId, skill] of Object.entries(this.state.combatSkills)) {
            // 检查是否已学会
            if (!this.state.combatSkills[skillId]) {
                // 检查是否可以学习
                if (skill.requirements.realm) {
                    const reqRealmIndex = Object.keys(this.state.realms).indexOf(skill.requirements.realm);
                    if (realmIndex >= reqRealmIndex) {
                        if (realmIndex === reqRealmIndex && this.state.level >= skill.requirements.level) {
                            availableSkills.push({ id: skillId, skill, canLearn: true });
                        } else if (realmIndex > reqRealmIndex) {
                            availableSkills.push({ id: skillId, skill, canLearn: true });
                        }
                    }
                } else {
                    availableSkills.push({ id: skillId, skill, canLearn: true });
                }
            }
        }

        return availableSkills;
    }

    // 使用战斗技能
    useCombatSkill(skillId, targetId) {
        const canUse = this.canUseSkill(skillId);
        if (!canUse.can) {
            return { success: false, message: canUse.message };
        }

        const skill = this.state.combatSkills[skillId];

        // 设置技能冷却
        if (skill.cooldown > 0) {
            this.state.combatSkillCooldowns[skillId] = Date.now() + skill.cooldown * 1000;
        }

        // 更新技能使用次数
        this.state.combatSkills[skillId].timesUsed++;

        // 如果有目标，执行战斗
        if (targetId) {
            return this.fightMonster(targetId, skillId);
        }

        return { success: true, message: `使用了${skill.name}` };
    }

    // 获取法宝
    acquireArtifact(artifactId) {
        const artifact = this.state.artifacts[artifactId];
        if (!artifact) {
            return { success: false, message: '法宝不存在' };
        }

        // 检查是否已拥有
        const existingArtifact = this.state.artifacts.find(a => a.id === artifactId);
        if (existingArtifact) {
            // 已拥有，提升等级
            if (existingArtifact.level < existingArtifact.maxLevel) {
                existingArtifact.level++;
                this.state.addLog(`${artifact.name}升级到${existingArtifact.level}级！`, 'rare');
            } else {
                this.state.addLog(`${artifact.name}已达到最高级`, 'info');
                return { success: false, message: '法宝已满级' };
            }
        } else {
            // 新获得法宝
            const newArtifact = {
                id: artifact.id,
                name: artifact.name,
                grade: artifact.grade,
                type: artifact.type,
                level: artifact.level,
                maxLevel: artifact.maxLevel,
                baseStats: { ...artifact.baseStats },
                specialEffect: artifact.specialEffect,
                description: artifact.description,
                requirements: { ...artifact.requirements } // 复制装备要求
            };
            this.state.artifacts.push(newArtifact);
            this.state.addLog(`获得了${artifact.grade}法宝：${artifact.name}！`, 'legendary');
        }

        return { success: true, message: `获得${artifact.name}` };
    }

    // 装备法宝
    equipArtifact(artifactIndex) {
        if (artifactIndex < 0 || artifactIndex >= this.state.artifacts.length) {
            return { success: false, message: '法宝不存在' };
        }

        const artifact = this.state.artifacts[artifactIndex];

        // 检查装备要求
        if (artifact.requirements.realm) {
            const realmNames = Object.keys(this.state.realms);
            const currentRealmIndex = realmNames.indexOf(this.state.realm);
            const requiredRealmIndex = realmNames.indexOf(artifact.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${artifact.requirements.realm}` };
            }

            if (currentRealmIndex === requiredRealmIndex && this.state.level < artifact.requirements.level) {
                return { success: false, message: `层级不足，需要${artifact.requirements.realm}${artifact.requirements.level}层` };
            }
        }

        // 卸下当前装备的同类法宝
        const slot = artifact.type;
        if (this.state.equippedArtifacts[slot]) {
            this.state.addLog(`卸下了${this.state.equippedArtifacts[slot].name}`, 'info');
        }

        // 装备新法宝
        this.state.equippedArtifacts[slot] = artifact;
        this.state.addLog(`装备了${artifact.name}！`, 'success');

        // 显示属性变化
        const stats = this.calculateArtifactStats(artifact);
        if (stats.attack > 0 || stats.defense > 0 || stats.cultivation > 0) {
            this.state.addLog(`属性加成：攻击+${stats.attack} 防御+${stats.defense} 修炼+${stats.cultivation}`, 'info');
        }

        return { success: true, message: `装备${artifact.name}成功` };
    }

    // 卸下法宝
    unequipArtifact(slot) {
        if (!this.state.equippedArtifacts[slot]) {
            return { success: false, message: '该位置没有装备法宝' };
        }

        const artifact = this.state.equippedArtifacts[slot];
        this.state.addLog(`卸下了${artifact.name}`, 'info');
        this.state.equippedArtifacts[slot] = null;

        return { success: true, message: '卸下成功' };
    }

    // 计算法宝的属性加成
    calculateArtifactStats(artifact) {
        if (!artifact) return { attack: 0, defense: 0, cultivation: 0 };

        const levelMultiplier = 1 + (artifact.level - 1) * 0.2; // 每级+20%

        return {
            attack: Math.floor(artifact.baseStats.attack * levelMultiplier),
            defense: Math.floor(artifact.baseStats.defense * levelMultiplier),
            cultivation: Math.floor(artifact.baseStats.cultivation * levelMultiplier)
        };
    }

    // 强化法宝
    enhanceArtifact(artifactIndex) {
        if (artifactIndex < 0 || artifactIndex >= this.state.artifacts.length) {
            return { success: false, message: '法宝不存在' };
        }

        const artifact = this.state.artifacts[artifactIndex];
        if (artifact.level >= artifact.maxLevel) {
            return { success: false, message: '法宝已达到最高级' };
        }

        const gradeConfig = this.state.artifactEnhancement.successRates[artifact.grade];
        const currentLevel = artifact.level;
        const successRate = Math.max(0.05, gradeConfig.base - (currentLevel - 1) * gradeConfig.decrease);

        // 计算强化费用
        const costConfig = this.state.artifactEnhancement.costs[artifact.grade];
        const cost = Math.floor(costConfig.base * Math.pow(costConfig.multiplier, currentLevel - 1));

        if (this.state.spiritStones < cost) {
            return { success: false, message: `灵石不足，需要${cost}灵石` };
        }

        // 扣除费用
        this.state.spiritStones -= cost;

        // 强化判定
        if (Math.random() < successRate) {
            artifact.level++;
            this.state.addLog(`🎉 强化成功！${artifact.name}升级到${artifact.level}级！`, 'legendary');
            return { success: true, message: '强化成功' };
        } else {
            this.state.addLog(`强化失败！损失${cost}灵石`, 'danger');
            return { success: false, message: '强化失败' };
        }
    }

    // 随机获得法宝
    grantRandomArtifact() {
        // 根据玩家境界决定可以获得的法宝
        const realmIndex = Object.keys(this.state.realms).indexOf(this.state.realm);
        const luck = this.state.talents.luck + this.state.talents.fortune;

        // 可选法宝列表（按境界要求过滤）
        const availableArtifacts = Object.entries(this.state.artifacts).filter(([id, artifact]) => {
            if (!artifact.requirements || !artifact.requirements.realm) return true;
            const reqRealmIndex = Object.keys(this.state.realms).indexOf(artifact.requirements.realm);
            return realmIndex >= reqRealmIndex;
        });

        if (availableArtifacts.length === 0) return;

        // 根据幸运值决定法宝品质
        const random = Math.random() + luck * 0.01;
        let selectedArtifact = null;

        if (random > 0.98) { // 2%概率获得圣品
            selectedArtifact = availableArtifacts.find(([id, a]) => a.grade === '圣品');
        } else if (random > 0.90) { // 8%概率获得神品
            selectedArtifact = availableArtifacts.find(([id, a]) => a.grade === '神品');
        } else if (random > 0.75) { // 15%概率获得仙品
            selectedArtifact = availableArtifacts.find(([id, a]) => a.grade === '仙品');
        } else if (random > 0.50) { // 25%概率获得灵品
            selectedArtifact = availableArtifacts.find(([id, a]) => a.grade === '灵品');
        }

        // 默认凡品
        if (!selectedArtifact) {
            const mortalArtifacts = availableArtifacts.filter(([id, a]) => a.grade === '凡品');
            selectedArtifact = mortalArtifacts[Math.floor(Math.random() * mortalArtifacts.length)];
        }

        if (selectedArtifact) {
            this.acquireArtifact(selectedArtifact[0]);
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
}
