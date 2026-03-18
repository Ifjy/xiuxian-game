/**
 * 副本系统模块
 * 新建的副本系统，参考 CONFIG.dungeons 配置实现
 *
 * 包含功能：
 * - 获取可进入的副本列表
 * - 检查副本解锁条件
 * - 进入副本
 * - 战斗副本怪物
 * - 战斗副本BOSS
 * - 完成副本
 * - 获取副本进度
 */

import { DUNGEONS_CONFIG } from '../config/DungeonsConfig.js';

export class DungeonSystem {
    constructor(gameState) {
        this.state = gameState;
        this.dungeons = DUNGEONS_CONFIG.dungeons;
        // 初始化副本进度
        this.state.dungeonProgress = this.state.dungeonProgress || {};
    }

    // 获取可进入的副本列表
    getAvailableDungeons() {
        const available = [];

        for (const [dungeonId, dungeon] of Object.entries(this.dungeons)) {
            if (this.checkDungeonUnlock(dungeonId)) {
                available.push({
                    id: dungeonId,
                    ...dungeon,
                    progress: this.getDungeonProgress(dungeonId)
                });
            }
        }

        // 按层级排序
        available.sort((a, b) => {
            const realmOrder = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期', '炼虚期', '合体期', '大乘期', '渡劫期'];
            const aIndex = realmOrder.indexOf(a.minRealm);
            const bIndex = realmOrder.indexOf(b.minRealm);
            if (aIndex !== bIndex) {
                return aIndex - bIndex;
            }
            return a.minLevel - b.minLevel;
        });

        return available;
    }

    // 检查副本解锁条件
    checkDungeonUnlock(dungeonId) {
        const dungeon = this.dungeons[dungeonId];
        if (!dungeon) {
            return false;
        }

        const requirements = dungeon.unlockRequirements;
        if (!requirements) {
            return true;
        }

        // 检查境界
        if (requirements.realm) {
            const realmNames = Object.keys(this.state.realms);
            const currentRealmIndex = realmNames.indexOf(this.state.realm);
            const requiredRealmIndex = realmNames.indexOf(requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                return false;
            }

            // 同境界需要检查层级
            if (currentRealmIndex === requiredRealmIndex && this.state.level < requirements.level) {
                return false;
            }
        }

        return true;
    }

    // 进入副本
    enterDungeon(dungeonId) {
        const dungeon = this.dungeons[dungeonId];
        if (!dungeon) {
            return { success: false, message: '副本不存在' };
        }

        // 检查解锁条件
        if (!this.checkDungeonUnlock(dungeonId)) {
            return { success: false, message: `需要${dungeon.minRealm}${dungeon.minLevel}层才能进入` };
        }

        // 检查当前状态
        const canDo = this.canDoAction('dungeon');
        if (!canDo.can) {
            return { success: false, message: canDo.message };
        }

        // 初始化副本进度
        if (!this.state.dungeonProgress[dungeonId]) {
            this.state.dungeonProgress[dungeonId] = {
                monstersDefeated: [],
                bossDefeated: false,
                completed: false
            };
        }

        this.state.currentDungeon = dungeonId;
        this.state.isInDungeon = true;

        this.state.addLog(`进入了${dungeon.name}！`, 'rare');
        this.state.addLog(dungeon.description, 'info');

        return {
            success: true,
            message: `进入${dungeon.name}`,
            dungeon: dungeon,
            progress: this.state.dungeonProgress[dungeonId]
        };
    }

    // 战斗副本怪物
    fightMonster(dungeonId, monsterIndex) {
        const dungeon = this.dungeons[dungeonId];
        if (!dungeon) {
            return { success: false, message: '副本不存在' };
        }

        if (this.state.currentDungeon !== dungeonId || !this.state.isInDungeon) {
            return { success: false, message: '请先进入副本' };
        }

        // 检查怪物是否已击败
        const progress = this.state.dungeonProgress[dungeonId];
        if (progress.monstersDefeated.includes(monsterIndex)) {
            return { success: false, message: '该怪物已击败' };
        }

        // 获取怪物数据
        if (monsterIndex >= dungeon.monsters.length) {
            return { success: false, message: '怪物不存在' };
        }

        const monsterId = dungeon.monsters[monsterIndex];
        const monster = this.state.monsters.find(m => m.id === monsterId);
        if (!monster) {
            return { success: false, message: '怪物数据不存在' };
        }

        // 执行战斗
        const fightResult = this.fightMonsterWithStats(monster);
        if (!fightResult.success) {
            return fightResult;
        }

        // 标记怪物已击败
        progress.monstersDefeated.push(monsterIndex);

        this.state.addLog(`击败了${dungeon.name}的怪物！`, 'success');

        return {
            success: true,
            message: fightResult.message,
            rewards: fightResult.rewards,
            progress: progress
        };
    }

    // 战斗副本BOSS
    fightBoss(dungeonId) {
        const dungeon = this.dungeons[dungeonId];
        if (!dungeon) {
            return { success: false, message: '副本不存在' };
        }

        if (this.state.currentDungeon !== dungeonId || !this.state.isInDungeon) {
            return { success: false, message: '请先进入副本' };
        }

        const progress = this.state.dungeonProgress[dungeonId];

        // 检查是否已击败BOSS
        if (progress.bossDefeated) {
            return { success: false, message: 'BOSS已击败' };
        }

        // 检查是否需要先击败所有小怪
        if (dungeon.monsters.length > 0) {
            const allMonstersDefeated = dungeon.monsters.every((_, index) =>
                progress.monstersDefeated.includes(index)
            );
            if (!allMonstersDefeated) {
                return { success: false, message: '需要先击败所有怪物' };
            }
        }

        // 获取BOSS数据
        const boss = dungeon.boss;
        if (!boss) {
            return { success: false, message: 'BOSS数据不存在' };
        }

        this.state.addLog(`遭遇${dungeon.name}的BOSS：${boss.name}！`, 'rare');

        // 执行BOSS战斗
        const fightResult = this.fightBossWithStats(boss);
        if (!fightResult.success) {
            return fightResult;
        }

        // 标记BOSS已击败
        progress.bossDefeated = true;

        this.state.addLog(`击败了${dungeon.name}的BOSS：${boss.name}！`, 'legendary');

        return {
            success: true,
            message: fightResult.message,
            rewards: fightResult.rewards,
            progress: progress
        };
    }

    // 完成副本
    completeDungeon(dungeonId) {
        const dungeon = this.dungeons[dungeonId];
        if (!dungeon) {
            return { success: false, message: '副本不存在' };
        }

        const progress = this.state.dungeonProgress[dungeonId];
        if (!progress) {
            return { success: false, message: '请先进入副本' };
        }

        // 检查是否击败了BOSS
        if (!progress.bossDefeated) {
            return { success: false, message: '需要先击败BOSS' };
        }

        if (progress.completed) {
            return { success: false, message: '副本已完成' };
        }

        // 标记副本完成
        progress.completed = true;
        this.state.isInDungeon = false;
        this.state.currentDungeon = null;

        // 发放完成奖励
        const rewards = dungeon.completionRewards;
        const rewardMessages = [];

        if (rewards.spiritStones) {
            this.addSpiritStones(rewards.spiritStones);
            rewardMessages.push(`${rewards.spiritStones}灵石`);
        }

        if (rewards.cultivation) {
            this.addCultivation(rewards.cultivation);
            rewardMessages.push(`${rewards.cultivation}修为`);
        }

        if (rewards.items && rewards.items.length > 0) {
            for (const item of rewards.items) {
                this.addItem(item);
                rewardMessages.push(item);
            }
        }

        this.state.addLog(`完成${dungeon.name}！获得${rewardMessages.join('、')}`, 'legendary');

        return {
            success: true,
            message: `完成${dungeon.name}`,
            rewards: rewards
        };
    }

    // 获取副本进度
    getDungeonProgress(dungeonId) {
        const dungeon = this.dungeons[dungeonId];
        if (!dungeon) {
            return null;
        }

        const progress = this.state.dungeonProgress[dungeonId];
        if (!progress) {
            return {
                totalMonsters: dungeon.monsters.length,
                defeatedMonsters: 0,
                bossDefeated: false,
                completed: false,
                canEnter: this.checkDungeonUnlock(dungeonId)
            };
        }

        return {
            totalMonsters: dungeon.monsters.length,
            defeatedMonsters: progress.monstersDefeated.length,
            bossDefeated: progress.bossDefeated,
            completed: progress.completed,
            canEnter: this.checkDungeonUnlock(dungeonId)
        };
    }

    // 退出副本
    exitDungeon() {
        if (!this.state.isInDungeon) {
            return { success: false, message: '当前不在副本中' };
        }

        const dungeonId = this.state.currentDungeon;
        this.state.isInDungeon = false;
        this.state.currentDungeon = null;

        this.state.addLog('退出了副本', 'info');

        return { success: true, message: '退出副本' };
    }

    // 重置副本进度（允许重复挑战）
    resetDungeon(dungeonId) {
        const dungeon = this.dungeons[dungeonId];
        if (!dungeon) {
            return { success: false, message: '副本不存在' };
        }

        // 重置进度
        this.state.dungeonProgress[dungeonId] = {
            monstersDefeated: [],
            bossDefeated: false,
            completed: false
        };

        this.state.addLog(`重置了${dungeon.name}的进度`, 'info');

        return { success: true, message: '重置副本进度' };
    }

    // 检查是否可以进行某个操作
    canDoAction(action) {
        if (this.state.isAdventuring) {
            return { can: false, message: '历练中无法进入副本' };
        }
        if (this.state.isWorking) {
            return { can: false, message: '打工中无法进入副本' };
        }
        if (this.state.isExploring) {
            return { can: false, message: '探索秘境中无法进入副本' };
        }
        if (this.state.isMeditating) {
            return { can: false, message: '入定中无法进入副本' };
        }
        if (this.state.isInDungeon) {
            return { can: false, message: '已在副本中' };
        }
        return { can: true };
    }

    // 辅助方法：与怪物战斗
    fightMonsterWithStats(monster) {
        // 使用战斗系统进行战斗
        if (this.state.combatSystem) {
            return this.state.combatSystem.fightMonster(monster.id);
        }

        // 如果没有战斗系统，提供简单实现
        const playerStats = this.calculatePlayerStats();
        const playerDamage = Math.max(1, playerStats.attack - monster.defense);
        const monsterDamage = Math.max(1, monster.attack - playerStats.defense);

        const playerRounds = Math.ceil(monster.hp / playerDamage);
        const monsterRounds = Math.ceil(playerStats.health / monsterDamage);

        if (playerRounds <= monsterRounds) {
            const spiritStones = Math.floor(Math.random() * (monster.rewards?.spiritStones?.[1] - monster.rewards?.spiritStones?.[0]) + monster.rewards?.spiritStones?.[0] || 100);
            const cultivation = Math.floor(Math.random() * (monster.rewards?.cultivation?.[1] - monster.rewards?.cultivation?.[0]) + monster.rewards?.cultivation?.[0] || 50);

            this.addSpiritStones(spiritStones);
            this.addCultivation(cultivation);

            return {
                success: true,
                message: `战胜了${monster.name}！`,
                rewards: { spiritStones, cultivation }
            };
        } else {
            return {
                success: false,
                message: `被${monster.name}击败！`
            };
        }
    }

    // 辅助方法：与BOSS战斗
    fightBossWithStats(boss) {
        // BOSS战斗，使用战斗系统
        if (this.state.combatSystem) {
            // 创建临时怪物对象用于战斗
            const tempMonster = {
                id: boss.id,
                name: boss.name,
                hp: boss.hp,
                attack: boss.attack,
                defense: boss.defense,
                requirements: { realm: this.state.realm, level: this.state.level },
                rewards: boss.rewards
            };
            return this.state.combatSystem.fightMonster(tempMonster.id);
        }

        // 简单实现
        const playerStats = this.calculatePlayerStats();
        const playerDamage = Math.max(1, playerStats.attack - boss.defense);
        const bossDamage = Math.max(1, boss.attack - playerStats.defense);

        const playerRounds = Math.ceil(boss.hp / playerDamage);
        const bossRounds = Math.ceil(playerStats.health / bossDamage);

        if (playerRounds <= bossRounds) {
            const spiritStones = Math.floor(Math.random() * (boss.rewards.spiritStones[1] - boss.rewards.spiritStones[0]) + boss.rewards.spiritStones[0]);
            const cultivation = Math.floor(Math.random() * (boss.rewards.cultivation[1] - boss.rewards.cultivation[0]) + boss.rewards.cultivation[0]);

            this.addSpiritStones(spiritStones);
            this.addCultivation(cultivation);

            // 随机掉落物品
            const droppedItems = [];
            if (Math.random() < boss.rewards.dropRate) {
                const droppedItem = boss.rewards.items[Math.floor(Math.random() * boss.rewards.items.length)];
                this.addItem(droppedItem);
                droppedItems.push(droppedItem);
            }

            return {
                success: true,
                message: `击败了${boss.name}！`,
                rewards: { spiritStones, cultivation, items: droppedItems }
            };
        } else {
            return {
                success: false,
                message: `被${boss.name}击败！`
            };
        }
    }

    // 辅助方法：计算玩家属性
    calculatePlayerStats() {
        const realmConfig = this.state.realms[this.state.realm];
        return {
            attack: realmConfig.baseAttack,
            defense: realmConfig.baseDefense,
            health: realmConfig.baseHealth
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

    // ========== 渡劫系统 ==========

    // 开始渡劫
    startTribulation(targetRealm) {
        // 检查是否在渡劫配置中
        const tribulationConfig = this.state.heavenlyTribulations?.[targetRealm];
        if (!tribulationConfig) {
            return { success: false, message: `${targetRealm}不需要渡劫或配置不存在` };
        }

        // 检查状态
        if (!this.canDoAction('tribulation')) {
            return { success: false, message: '当前状态无法渡劫' };
        }

        // 检查修为是否足够
        if (!this.state.cultivationSystem.canBreakthrough()) {
            return { success: false, message: '修为不足，无法渡劫' };
        }

        // 初始化渡劫状态
        this.state.currentTribulation = {
            targetRealm: targetRealm,
            config: tribulationConfig,
            currentWave: 0,
            totalWaves: tribulationConfig.waves,
            wavesCompleted: 0,
            startTime: Date.now(),
            preparations: {
                itemsUsed: [],
                helpers: []
            }
        };

        this.state.isInTribulation = true;

        this.state.addLog(`开始${tribulationConfig.name}！`, 'legendary');
        this.state.addLog(tribulationConfig.description, 'info');
        this.state.addLog(`共${tribulationConfig.waves}波天劫，请做好准备！`, 'warning');

        return {
            success: true,
            message: `开始${tribulationConfig.name}`,
            tribulation: this.state.currentTribulation
        };
    }

    // 处理渡劫进程
    processTribulation() {
        if (!this.state.isInTribulation || !this.state.currentTribulation) {
            return { success: false, message: '当前未在渡劫' };
        }

        const tribulation = this.state.currentTribulation;
        const config = tribulation.config;

        // 进入下一波
        tribulation.currentWave++;
        this.state.addLog(`第${tribulation.currentWave}波天劫降临！`, 'rare');

        // 计算这一波的难度
        const waveDifficulty = config.difficulty * (1 + (tribulation.currentWave - 1) * 0.2);

        // 随机选择天劫类型
        const tribulationType = config.types[Math.floor(Math.random() * config.types.length)];
        this.state.addLog(`遭遇${tribulationType}！`, 'warning');

        // 计算成功率
        let successRate = config.baseSuccessRate;

        // 应用各种加成
        const playerStats = this.calculatePlayerStats();

        // 境界压制
        const realmIndex = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期', '炼虚期', '合体期', '大乘期', '渡劫期'].indexOf(this.state.realm);
        const targetIndex = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期', '炼虚期', '合体期', '大乘期', '渡劫期'].indexOf(tribulation.targetRealm);

        if (realmIndex >= targetIndex) {
            successRate += 0.2; // 已经达到或超过目标境界，额外加成
        }

        // 功法加成
        const skillConfig = this.state.skillConfig?.[this.state.currentSkill];
        if (skillConfig && skillConfig.benefits?.breakthroughChance) {
            successRate += skillConfig.benefits.breakthroughChance;
        }

        // 宗门加成
        const sectConfig = this.state.sects?.find(s => s.id === this.state.sect);
        if (sectConfig && sectConfig.benefits?.breakthroughChance) {
            successRate += sectConfig.benefits.breakthroughChance;
        }

        // 悟性加成
        successRate += this.state.talents?.wisdom * 0.01;

        // 难度修正
        successRate -= (waveDifficulty - 1) * 0.1;

        // 限制在0.05-0.95之间
        successRate = Math.max(0.05, Math.min(0.95, successRate));

        // 判定结果
        const success = Math.random() < successRate;

        if (success) {
            this.state.addLog(`成功抵挡第${tribulation.currentWave}波${tribulationType}！`, 'success');

            tribulation.wavesCompleted++;

            // 检查是否完成所有波次
            if (tribulation.wavesCompleted >= tribulation.totalWaves) {
                return this.completeTribulation(true);
            }

            return {
                success: true,
                message: `成功抵挡第${tribulation.currentWave}波`,
                waveCompleted: true,
                nextWave: tribulation.currentWave + 1,
                totalWaves: tribulation.totalWaves
            };
        } else {
            this.state.addLog(`未能抵挡第${tribulation.currentWave}波${tribulationType}！`, 'danger');

            // 渡劫失败
            return this.completeTribulation(false);
        }
    }

    // 完成渡劫
    completeTribulation(success) {
        const tribulation = this.state.currentTribulation;
        const config = tribulation.config;

        this.state.isInTribulation = false;

        if (success) {
            // 渡劫成功
            this.state.addLog(`成功渡过${config.name}！`, 'legendary');

            // 突破到下一境界
            const targetRealm = tribulation.targetRealm;
            this.state.realm = targetRealm;
            this.state.level = 1;
            this.state.cultivation = 0;
            this.state.maxCultivation = this.state.realms[targetRealm].maxCultivation;

            this.state.addLog(`成功突破到${targetRealm}！`, 'legendary');

            // 检查成就
            this.state.checkRealmAchievement();

            // 清理渡劫状态
            this.state.currentTribulation = null;

            return {
                success: true,
                message: `成功渡过${config.name}，突破到${targetRealm}！`,
                breakthrough: true,
                newRealm: targetRealm
            };
        } else {
            // 渡劫失败
            this.state.addLog(`${config.name}失败！`, 'danger');

            const penalty = config.failurePenalty;

            // 损失修为
            if (penalty.cultivationLoss) {
                const lost = Math.floor(this.state.cultivation * penalty.cultivationLoss);
                this.state.cultivation -= lost;
                this.state.addLog(`损失${lost}修为`, 'warning');
            }

            // 可能受伤
            if (penalty.possibilityOfInjury && Math.random() < penalty.possibilityOfInjury) {
                this.state.addLog('渡劫失败受了重伤！', 'danger');
                // 可以添加受伤状态
            }

            // 可能境界跌落
            if (penalty.possibilityOfRealmDrop && Math.random() < penalty.possibilityOfRealmDrop) {
                const realmNames = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期'];
                const currentIndex = realmNames.indexOf(this.state.realm);
                if (currentIndex > 0) {
                    this.state.realm = realmNames[currentIndex - 1];
                    this.state.level = this.state.realms[this.state.realm].levels;
                    this.state.addLog(`境界跌落至${this.state.realm}！`, 'danger');
                }
            }

            // 清理渡劫状态
            this.state.currentTribulation = null;

            return {
                success: false,
                message: `${config.name}失败`,
                failure: true
            };
        }
    }

    // 检查是否可以进行某个操作（扩展版）
    canDoAction(action) {
        if (this.state.isAdventuring) {
            return { can: false, message: '历练中无法进行此操作' };
        }
        if (this.state.isWorking) {
            return { can: false, message: '打工中无法进行此操作' };
        }
        if (this.state.isExploring) {
            return { can: false, message: '探索秘境中无法进行此操作' };
        }
        if (this.state.isMeditating) {
            return { can: false, message: '入定中无法进行此操作' };
        }
        if (this.state.isInDungeon) {
            return { can: false, message: '副本中无法进行此操作' };
        }
        if (this.state.isInTribulation) {
            return { can: false, message: '渡劫中无法进行此操作' };
        }
        return { can: true };
    }
}
