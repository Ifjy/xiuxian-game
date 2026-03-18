/**
 * 成就系统模块
 * 从 game.js 的 GameState 类中提取的成就相关方法
 *
 * 包含功能：
 * - 检查成就
 * - 解锁成就
 * - 获取成就列表
 * - 成就进度追踪
 */

export class AchievementSystem {
    constructor(gameState) {
        this.state = gameState;
    }

    // 检查并解锁成就
    checkAchievements() {
        const unlockedAchievements = [];

        // 检查所有成就类型
        unlockedAchievements.push(...this.checkRealmAchievements());
        unlockedAchievements.push(...this.checkCombatAchievements());
        unlockedAchievements.push(...this.checkCollectionAchievements());
        unlockedAchievements.push(...this.checkSocialAchievements());
        unlockedAchievements.push(...this.checkExplorationAchievements());

        return unlockedAchievements;
    }

    // 检查境界成就
    checkRealmAchievements() {
        const unlocked = [];

        for (const [achievementId, achievement] of Object.entries(this.state.realmAchievements)) {
            // 跳过已解锁的成就
            if (this.state.achievements.includes(achievementId)) {
                continue;
            }

            // 检查是否满足条件
            if (this.state.realm === achievementId && this.state.level === achievement.requirements.level) {
                const result = this.unlockAchievement(achievementId);
                if (result.success) {
                    unlocked.push({ type: 'realm', achievementId, ...result });
                }
            }
        }

        return unlocked;
    }

    // 检查战斗成就
    checkCombatAchievements() {
        const unlocked = [];

        // 这里可以根据实际的战斗成就配置来实现
        // 例如：击败特定数量的怪物、战胜BOSS等

        // 检查是否击败了100个怪物
        const totalMonstersDefeated = this.state.questProgress['defeat_monsters']?.progress?.defeated || 0;
        if (totalMonstersDefeated >= 100 && !this.state.achievements.includes('monster_hunter_100')) {
            const result = this.unlockAchievement('monster_hunter_100');
            if (result.success) {
                unlocked.push({ type: 'combat', achievementId: 'monster_hunter_100', ...result });
            }
        }

        return unlocked;
    }

    // 检查收集成就
    checkCollectionAchievements() {
        const unlocked = [];

        // 检查物品收集数量
        const totalItems = Object.keys(this.state.inventory).length;
        if (totalItems >= 10 && !this.state.achievements.includes('collector_10')) {
            const result = this.unlockAchievement('collector_10');
            if (result.success) {
                unlocked.push({ type: 'collection', achievementId: 'collector_10', ...result });
            }
        }

        // 检查法宝收集数量
        const totalArtifacts = this.state.artifacts.length;
        if (totalArtifacts >= 5 && !this.state.achievements.includes('artifact_collector_5')) {
            const result = this.unlockAchievement('artifact_collector_5');
            if (result.success) {
                unlocked.push({ type: 'collection', achievementId: 'artifact_collector_5', ...result });
            }
        }

        // 检查功法学习数量
        const totalSkills = Object.keys(this.state.skills).length;
        if (totalSkills >= 3 && !this.state.achievements.includes('skill_master_3')) {
            const result = this.unlockAchievement('skill_master_3');
            if (result.success) {
                unlocked.push({ type: 'collection', achievementId: 'skill_master_3', ...result });
            }
        }

        return unlocked;
    }

    // 检查社交成就
    checkSocialAchievements() {
        const unlocked = [];

        // 检查宗门等级
        if (this.state.sect !== 'none' && this.state.sectRank === '核心弟子' && !this.state.achievements.includes('sect_core_disciple')) {
            const result = this.unlockAchievement('sect_core_disciple');
            if (result.success) {
                unlocked.push({ type: 'social', achievementId: 'sect_core_disciple', ...result });
            }
        }

        // 检查NPC好感度
        let friendsCount = 0;
        for (const [npcId, affection] of Object.entries(this.state.npcAffection)) {
            if (affection >= 50) {
                friendsCount++;
            }
        }
        if (friendsCount >= 3 && !this.state.achievements.includes('popular_3')) {
            const result = this.unlockAchievement('popular_3');
            if (result.success) {
                unlocked.push({ type: 'social', achievementId: 'popular_3', ...result });
            }
        }

        return unlocked;
    }

    // 检查探索成就
    checkExplorationAchievements() {
        const unlocked = [];

        // 检查副本完成情况
        const completedDungeons = Object.values(this.state.dungeonProgress || {}).filter(p => p.completed).length;
        if (completedDungeons >= 3 && !this.state.achievements.includes('dungeon_explorer_3')) {
            const result = this.unlockAchievement('dungeon_explorer_3');
            if (result.success) {
                unlocked.push({ type: 'exploration', achievementId: 'dungeon_explorer_3', ...result });
            }
        }

        return unlocked;
    }

    // 解锁成就
    unlockAchievement(achievementId) {
        // 检查是否已解锁
        if (this.state.achievements.includes(achievementId)) {
            return { success: false, message: '成就已解锁' };
        }

        // 获取成就配置
        let achievement = null;

        // 检查境界成就
        if (this.state.realmAchievements[achievementId]) {
            achievement = this.state.realmAchievements[achievementId];
        }
        // 这里可以添加其他类型的成就检查
        // ...

        if (!achievement) {
            return { success: false, message: '成就不存在' };
        }

        // 检查解锁条件
        if (!this.checkAchievementRequirements(achievementId, achievement)) {
            return { success: false, message: '未满足解锁条件' };
        }

        // 解锁成就
        this.state.achievements.push(achievementId);

        // 发放奖励
        const rewards = this.giveAchievementRewards(achievement);

        // 显示成就解锁消息
        const message = achievement.name || `解锁成就：${achievementId}`;
        this.state.addLog(`🏆 ${message}`, 'legendary');

        return {
            success: true,
            message: `解锁成就：${message}`,
            achievement: achievement,
            rewards: rewards
        };
    }

    // 检查成就解锁条件
    checkAchievementRequirements(achievementId, achievement) {
        if (!achievement.requirements) {
            return true;
        }

        const requirements = achievement.requirements;

        // 检查境界要求
        if (requirements.realm) {
            const realmNames = Object.keys(this.state.realms);
            const currentRealmIndex = realmNames.indexOf(this.state.realm);
            const requiredRealmIndex = realmNames.indexOf(requirements.realm);
            if (currentRealmIndex < requiredRealmIndex) {
                return false;
            }
        }

        // 检查层级要求
        if (requirements.level && this.state.level < requirements.level) {
            return false;
        }

        // 检查修为要求
        if (requirements.cultivation && this.state.cultivation < requirements.cultivation) {
            return false;
        }

        // 检查灵石要求
        if (requirements.spiritStones && this.state.spiritStones < requirements.spiritStones) {
            return false;
        }

        // 检查特定条件
        if (requirements.customCheck) {
            // 这里可以根据实际的成就需求实现自定义检查
            // 暂时返回true
            return true;
        }

        return true;
    }

    // 发放成就奖励
    giveAchievementRewards(achievement) {
        if (!achievement.rewards) {
            return null;
        }

        const rewards = {
            spiritStones: 0,
            cultivation: 0,
            items: [],
            permanentBoost: 0
        };

        // 发放灵石奖励
        if (achievement.rewards.spiritStones) {
            this.addSpiritStones(achievement.rewards.spiritStones);
            rewards.spiritStones = achievement.rewards.spiritStones;
        }

        // 发放修为奖励
        if (achievement.rewards.cultivation) {
            this.addCultivation(achievement.rewards.cultivation);
            rewards.cultivation = achievement.rewards.cultivation;
        }

        // 发放物品奖励
        if (achievement.rewards.items && achievement.rewards.items.length > 0) {
            for (const item of achievement.rewards.items) {
                this.addItem(item);
                rewards.items.push(item);
            }
        }

        // 发放永久加成
        if (achievement.rewards.permanentBoost) {
            this.state.permanentBoost += achievement.rewards.permanentBoost;
            rewards.permanentBoost = achievement.rewards.permanentBoost;
        }

        return rewards;
    }

    // 获取成就列表
    getAchievements() {
        const achievements = [];

        // 境界成就
        for (const [achievementId, achievement] of Object.entries(this.state.realmAchievements)) {
            achievements.push({
                id: achievementId,
                name: achievement.name,
                description: achievement.description,
                type: 'realm',
                requirements: achievement.requirements,
                unlocked: this.state.achievements.includes(achievementId),
                rewards: achievement.rewards
            });
        }

        // 这里可以添加其他类型的成就
        // ...

        return achievements;
    }

    // 获取已解锁的成就
    getUnlockedAchievements() {
        return this.state.achievements.map(achievementId => {
            // 查找成就配置
            let achievement = null;

            if (this.state.realmAchievements[achievementId]) {
                achievement = this.state.realmAchievements[achievementId];
            }

            return {
                id: achievementId,
                name: achievement?.name || achievementId,
                description: achievement?.description || '',
                unlockedAt: Date.now()
            };
        });
    }

    // 获取成就进度
    getAchievementProgress(achievementId) {
        const unlocked = this.state.achievements.includes(achievementId);

        // 这里可以根据具体的成就类型返回进度信息
        // 暂时返回基础信息
        return {
            id: achievementId,
            unlocked: unlocked,
            progress: unlocked ? 100 : 0
        };
    }

    // 获取成就统计
    getAchievementStats() {
        const totalAchievements = Object.keys(this.state.realmAchievements).length; // 暂时只统计境界成就
        const unlockedCount = this.state.achievements.length;
        const completionRate = totalAchievements > 0 ? (unlockedCount / totalAchievements * 100).toFixed(1) : 0;

        return {
            total: totalAchievements,
            unlocked: unlockedCount,
            locked: totalAchievements - unlockedCount,
            completionRate: completionRate + '%'
        };
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
