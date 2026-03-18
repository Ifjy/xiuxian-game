/**
 * 游戏状态管理核心类
 * 重构后的精简版本，引入各个系统模块
 *
 * 包含功能：
 * - 角色基本信息管理
 * - 游戏状态管理
 * - 系统模块集成
 */
import { GAME_CONFIG } from '../config/GameConfig.js';
import { SaveManager } from './SaveManager.js';
import { CultivationSystem } from '../systems/CultivationSystem.js';
import { AdventureSystem } from '../systems/AdventureSystem.js';
import { CombatSystem } from '../systems/CombatSystem.js';
import { DungeonSystem } from '../systems/DungeonSystem.js';
import { SectSystem } from '../systems/SectSystem.js';
import { PetSystem } from '../systems/PetSystem.js';
import { NPCSystem } from '../systems/NPCSystem.js';
import { QuestSystem } from '../systems/QuestSystem.js';
import { AchievementSystem } from '../systems/AchievementSystem.js';

export class GameState {
    constructor(characterData = null) {
        // 存档槽位
        this.saveSlot = characterData?.saveSlot || 1;

        // 角色基本信息
        if (characterData) {
            this.playerName = characterData.playerName || characterData.name;
            this.daoName = characterData.daoName;
            this.background = characterData.background;
            this.talents = characterData.talents;
            this.spiritualRoot = characterData.spiritualRoot || this.generateRandomSpiritualRoot();
        } else {
            // 默认值 - 用于加载存档时的实例化
            this.playerName = '凡人';
            this.daoName = '散修';
            this.background = 'commoner';
            this.talents = {
                wisdom: 0,
                luck: 0,
                potential: 0,
                fortune: 0
            };
            this.spiritualRoot = null;
        }

        // 修仙状态
        this.realm = characterData?.realm || '炼气期';
        this.level = characterData?.level || 1;
        this.cultivation = characterData?.cultivation || 0;
        this.maxCultivation = characterData?.maxCultivation || 100;
        this.spiritStones = characterData?.spiritStones || 0;
        this.cultivationRate = characterData?.cultivationRate || 1.0;
        this.totalDays = characterData?.totalDays || 0;

        // 状态管理
        this.isMeditating = characterData?.isMeditating || false;
        this.isAdventuring = characterData?.isAdventuring || false;
        this.isWorking = characterData?.isWorking || false;
        this.isExploring = characterData?.isExploring || false;
        this.adventureEndTime = characterData?.adventureEndTime || 0;
        this.workEndTime = characterData?.workEndTime || 0;
        this.explorationEndTime = characterData?.explorationEndTime || 0;
        this.currentAdventure = characterData?.currentAdventure || null;
        this.currentJob = characterData?.currentJob || null;
        this.currentExploration = characterData?.currentExploration || null;

        // 副本状态
        this.isInDungeon = characterData?.isInDungeon || false;
        this.currentDungeon = characterData?.currentDungeon || null;
        this.dungeonProgress = characterData?.dungeonProgress || {};

        // 永久加成
        this.permanentBoost = characterData?.permanentBoost || 0;

        // 宗门信息
        this.sect = characterData?.sect || 'none';
        this.sectContribution = characterData?.sectContribution || 0;
        this.sectRank = characterData?.sectRank || '外门弟子';
        this.sectReputation = characterData?.sectReputation || 0;

        // 物品
        this.inventory = characterData?.inventory || { '聚气丹': 3 };

        // 功法
        this.skills = characterData?.skills || { '基础吐纳法': { level: 1 } };
        this.currentSkill = characterData?.currentSkill || '基础吐纳法';

        // 宠物
        this.pets = characterData?.pets || {};
        this.currentPet = characterData?.currentPet || null;

        // 装备和法宝
        this.equipment = characterData?.equipment || {
            weapon: null,
            armor: null,
            accessory: null,
            special: null
        };
        this.artifacts = characterData?.artifacts || [];
        this.equippedArtifacts = characterData?.equippedArtifacts || {
            weapon: null,
            armor: null,
            accessory: null,
            special: null
        };

        // 战斗技能
        this.combatSkills = characterData?.combatSkills || {};
        this.activeCombatSkill = characterData?.activeCombatSkill || null;
        this.combatSkillCooldowns = characterData?.combatSkillCooldowns || {};

        // NPC系统
        this.npcAffection = characterData?.npcAffection || {};
        this.npcHistory = characterData?.npcHistory || {};
        this.unlockedNPCs = characterData?.unlockedNPCs || ['mysterious_taoist', 'merchant'];

        // 剧情任务系统
        this.questProgress = characterData?.questProgress || {};
        this.completedQuests = characterData?.completedQuests || [];
        this.currentChapter = characterData?.currentChapter || 1;
        this.storyFlags = characterData?.storyFlags || {};

        // 成就
        this.achievements = characterData?.achievements || [];
        this.logs = characterData?.logs || [];

        // 境界成就配置
        this.realmAchievements = GAME_CONFIG.realmAchievements;

        // Buff状态
        this.buffs = characterData?.buffs || {
            cultivation: { multiplier: 1.0, endTime: 0 },
            breakthrough: { bonus: 0.0, endTime: 0 },
            luck: null
        };

        // 时间相关
        this.lastSaveTime = characterData?.lastSaveTime || Date.now();
        this.totalPlayTime = characterData?.totalPlayTime || 0;

        // 初始化系统模块
        this.initSystems();

        // 配置引用（用于系统访问）
        this.realms = GAME_CONFIG.realms;
        this.spiritualRoots = GAME_CONFIG.spiritualRoots;
        this.backgrounds = GAME_CONFIG.backgrounds;
        this.skillConfig = GAME_CONFIG.skills; // 技能配置，不覆盖已学技能

        // 只在创建新角色时应用出身加成
        if (!characterData || !characterData.playerName) {
            if (!this.spiritualRoot) {
                this.spiritualRoot = this.generateRandomSpiritualRoot();
            }
            this.applyBackgroundBonus();
            this.learnInitialCombatSkill();
            this.giveInitialArtifact();
        } else if (!this.spiritualRoot) {
            this.spiritualRoot = this.generateRandomSpiritualRoot();
            this.addLog(`觉醒了${this.spiritualRoot}！`, 'rare');
        }
    }

    // 初始化系统模块
    initSystems() {
        this.cultivationSystem = new CultivationSystem(this);
        this.adventureSystem = new AdventureSystem(this);
        this.combatSystem = new CombatSystem(this);
        this.dungeonSystem = new DungeonSystem(this);
        this.sectSystem = new SectSystem(this);
        this.petSystem = new PetSystem(this);
        this.npcSystem = new NPCSystem(this);
        this.questSystem = new QuestSystem(this);
        this.achievementSystem = new AchievementSystem(this);
    }

    // 生成道号
    generateDaoName() {
        const surnames = ['云', '风', '雨', '雷', '电', '天', '地', '玄', '黄', '宇', '宙', '洪', '荒'];
        const names = ['虚', '空', '无', '极', '道', '仙', '神', '魔', '佛', '圣', '尊', '祖'];
        const titles = ['子', '真人', '散人', '居士', '道人', '上人', '尊者'];

        const surname = surnames[Math.floor(Math.random() * surnames.length)];
        const name = names[Math.floor(Math.random() * names.length)];
        const title = Math.random() < 0.3 ? titles[Math.floor(Math.random() * titles.length)] : '';

        return surname + name + title;
    }

    // 生成随机灵根
    generateRandomSpiritualRoot() {
        const roots = Object.entries(GAME_CONFIG.spiritualRoots);
        const roll = Math.random();
        let cumulative = 0;

        for (const [rootName, rootConfig] of roots) {
            cumulative += rootConfig.chance;
            if (roll <= cumulative) {
                return rootName;
            }
        }

        return '四系灵根';
    }

    // 获取灵根配置
    getSpiritualRootConfig() {
        if (!this.spiritualRoot) return null;
        return GAME_CONFIG.spiritualRoots[this.spiritualRoot];
    }

    // 计算灵根对修炼速度的影响
    getSpiritualRootCultivationBonus() {
        const rootConfig = this.getSpiritualRootConfig();
        if (!rootConfig) return 1.0;
        return rootConfig.cultivationBonus || 1.0;
    }

    // 应用出身加成
    applyBackgroundBonus() {
        const bgConfig = GAME_CONFIG.backgrounds[this.background];
        const bonus = bgConfig.bonus;

        if (bonus.spiritStones) {
            this.spiritStones += bonus.spiritStones;
        }
        if (bonus.wisdom) {
            this.talents.wisdom += bonus.wisdom;
        }
        if (bonus.luck) {
            this.talents.luck += bonus.luck;
        }
        if (bonus.potential) {
            this.talents.potential += bonus.potential;
        }
        if (bonus.fortune) {
            this.talents.fortune += bonus.fortune;
        }
    }

    // 新角色学习初始战斗技能
    learnInitialCombatSkill() {
        const initialSkillId = '剑气术';
        const result = this.combatSystem.learnCombatSkill(initialSkillId);
        if (result.success) {
            this.activeCombatSkill = initialSkillId;
        }
    }

    // 新角色获得初始法宝
    giveInitialArtifact() {
        // 由战斗系统或物品系统处理
    }

    // 添加日志
    addLog(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        this.logs.unshift({ message, type, timestamp });
        if (this.logs.length > 100) {
            this.logs.pop();
        }
    }

    // 计算离线进度
    calculateOfflineProgress() {
        const now = Date.now();
        const offlineTime = now - this.lastSaveTime;
        const hours = Math.floor(offlineTime / (1000 * 60 * 60));
        const minutes = Math.floor((offlineTime % (1000 * 60 * 60)) / (1000 * 60));

        if (hours < 1) {
            return { totalCultivation: 0, timeText: '' };
        }

        // 简单的离线修炼计算
        const baseCultivationPerHour = 10;
        const cultivationMultiplier = this.getSpiritualRootCultivationBonus();
        const totalCultivation = Math.floor(baseCultivationPerHour * hours * cultivationMultiplier);

        let timeText = '';
        if (hours > 0) {
            timeText += `${hours}小时`;
        }
        if (minutes > 0) {
            timeText += `${minutes}分钟`;
        }

        return { totalCultivation, timeText };
    }

    // ========== 代理方法 - 转发到各个系统 ==========

    // 修炼系统
    addCultivation(amount) {
        return this.cultivationSystem.addCultivation(amount);
    }

    startMeditation() {
        return this.cultivationSystem.startMeditation();
    }

    stopMeditation() {
        return this.cultivationSystem.stopMeditation();
    }

    attemptBreakthrough() {
        return this.cultivationSystem.attemptBreakthrough();
    }

    // 冒险系统
    startAdventure(adventureId) {
        return this.adventureSystem.startAdventure(adventureId);
    }

    completeAdventure() {
        return this.adventureSystem.completeAdventure();
    }

    startWork(jobId) {
        return this.adventureSystem.startWork(jobId);
    }

    completeWork() {
        return this.adventureSystem.completeWork();
    }

    // 战斗系统
    fight(monsterId) {
        return this.combatSystem.fight(monsterId);
    }

    learnCombatSkill(skillId) {
        return this.combatSystem.learnCombatSkill(skillId);
    }

    // 副本系统
    enterDungeon(dungeonId) {
        return this.dungeonSystem.enterDungeon(dungeonId);
    }

    getAvailableDungeons() {
        return this.dungeonSystem.getAvailableDungeons();
    }

    // NPC系统
    talkToNPC(npcId) {
        return this.npcSystem.talkToNPC(npcId);
    }

    getAvailableNPCs() {
        return this.npcSystem.getAvailableNPCs();
    }

    // 任务系统
    acceptQuest(questId) {
        return this.questSystem.acceptQuest(questId);
    }

    completeQuest(questId) {
        return this.questSystem.completeQuest(questId);
    }

    // ========== 更多代理方法 ==========

    // CultivationSystem 额外代理方法
    calculateActualCultivationRate() {
        return this.cultivationSystem.calculateActualCultivationRate();
    }

    canBreakthrough() {
        return this.cultivationSystem.canBreakthrough();
    }

    checkRealmAchievement() {
        return this.cultivationSystem.checkRealmAchievement();
    }

    processMeditationEvent() {
        // 打坐时的随机事件
        if (!this.isMeditating) return;

        const random = Math.random();
        if (random < 0.05) { // 5%概率触发事件
            const events = [
                { message: '心神不宁，修炼速度下降', effect: () => { this.buffs.cultivation.multiplier *= 0.5; } },
                { message: '灵感迸发，修炼速度提升', effect: () => { this.buffs.cultivation.multiplier *= 1.5; } },
                { message: '偶有所得，获得修为', effect: () => { this.addCultivation(50); } }
            ];
            const event = events[Math.floor(Math.random() * events.length)];
            event.effect();
            this.addLog(`打坐时${event.message}`, 'rare');
        }
    }

    checkCultivationStatus() {
        // 检查修炼状态，用于自动突破等
        if (this.cultivation >= this.maxCultivation * 2) {
            this.addLog('修为已满，请及时突破！', 'warning');
        }
    }

    learnSkill(skillName) {
        return this.cultivationSystem.learnSkill(skillName);
    }

    setCurrentSkill(skillName) {
        return this.cultivationSystem.setCurrentSkill(skillName);
    }

    // CombatSystem 额外代理方法
    calculateCombatStats() {
        return this.combatSystem.calculateCombatStats();
    }

    fightMonster(monsterId, skillId) {
        return this.combatSystem.fightMonster(monsterId, skillId);
    }

    getAvailableCombatSkills() {
        return this.combatSystem.getAvailableCombatSkills();
    }

    calculateArtifactStats(artifact) {
        return this.combatSystem.calculateArtifactStats(artifact);
    }

    equipArtifact(artifactName) {
        // 查找法宝
        const artifactIndex = this.artifacts.findIndex(a => a.name === artifactName);
        if (artifactIndex === -1) {
            return { success: false, message: '法宝不存在' };
        }
        return this.combatSystem.equipArtifact(artifactIndex);
    }

    unequipArtifact(artifactName) {
        // 根据法宝名称找到槽位
        const artifact = this.artifacts.find(a => a.name === artifactName);
        if (!artifact) {
            return { success: false, message: '法宝不存在' };
        }
        return this.combatSystem.unequipArtifact(artifact.type);
    }

    addArtifact(artifactName) {
        return this.combatSystem.acquireArtifact(artifactName);
    }

    // AchievementSystem 代理方法
    checkAchievements() {
        return this.achievementSystem.checkAchievements();
    }

    // AdventureSystem 额外代理方法
    completeExploration() {
        return this.adventureSystem.completeExploration();
    }

    doWork(jobId) {
        return this.adventureSystem.startWork(jobId);
    }

    alchemy() {
        // 炼丹功能
        if (this.isWorking) {
            return { success: false, message: '正在忙碌中' };
        }

        if (!this.inventory['聚气丹'] || this.inventory['聚气丹'] < 1) {
            return { success: false, message: '材料不足' };
        }

        this.isWorking = true;
        this.workEndTime = Date.now() + 5000; // 5秒炼丹时间

        return { success: true, message: '开始炼制聚气丹' };
    }

    // SectSystem 代理方法
    joinSect(sectId) {
        return this.sectSystem.joinSect(sectId);
    }

    getSectRankBonus() {
        if (this.sect === 'none') {
            return { taskBonus: 0, shopDiscount: 0 };
        }

        const rankBonuses = {
            '外门弟子': { taskBonus: 0.1, shopDiscount: 0.05 },
            '内门弟子': { taskBonus: 0.2, shopDiscount: 0.1 },
            '核心弟子': { taskBonus: 0.3, shopDiscount: 0.15 },
            '真传弟子': { taskBonus: 0.5, shopDiscount: 0.2 },
            '长老': { taskBonus: 0.7, shopDiscount: 0.25 }
        };

        return rankBonuses[this.sectRank] || { taskBonus: 0, shopDiscount: 0 };
    }

    checkSectRankPromotion() {
        // 检查是否可以晋升
        if (this.sect === 'none') return;

        const promotionRequirements = {
            '外门弟子': { contribution: 100, reputation: 50, nextRank: '内门弟子' },
            '内门弟子': { contribution: 500, reputation: 200, nextRank: '核心弟子' },
            '核心弟子': { contribution: 2000, reputation: 1000, nextRank: '真传弟子' },
            '真传弟子': { contribution: 5000, reputation: 3000, nextRank: '长老' }
        };

        const requirement = promotionRequirements[this.sectRank];
        if (!requirement) return;

        if (this.sectContribution >= requirement.contribution && this.sectReputation >= requirement.reputation) {
            this.sectRank = requirement.nextRank;
            this.addLog(`恭喜晋升为${requirement.nextRank}！`, 'legendary');
        }
    }

    hasSectPermission(permission) {
        if (this.sect === 'none') return false;

        const permissions = {
            '外门弟子': ['basic_tasks'],
            '内门弟子': ['basic_tasks', 'intermediate_tasks'],
            '核心弟子': ['basic_tasks', 'intermediate_tasks', 'advanced_tasks'],
            '真传弟子': ['basic_tasks', 'intermediate_tasks', 'advanced_tasks'],
            '长老': ['all']
        };

        const rankPermissions = permissions[this.sectRank] || [];
        return rankPermissions.includes('all') || rankPermissions.includes(permission);
    }

    doSectTask(taskId) {
        return this.sectSystem.doSectTask(taskId);
    }

    buyFromSectShop(category, itemName) {
        // 宗门商店购买
        if (this.sect === 'none') {
            return { success: false, message: '未加入宗门' };
        }

        const rankBonus = this.getSectRankBonus();
        const discount = rankBonus.shopDiscount;

        // 查找商品
        let item = null;
        if (category === 'skills') {
            item = this.skills[itemName];
        } else if (category === 'items') {
            item = { name: itemName, price: 100 }; // 简化处理
        }

        if (!item) {
            return { success: false, message: '商品不存在' };
        }

        const price = Math.floor(item.price * (1 - discount));
        if (this.spiritStones < price) {
            return { success: false, message: `灵石不足，需要${price}灵石` };
        }

        this.spiritStones -= price;

        if (category === 'skills') {
            const result = this.learnSkill(itemName);
            if (result.success) {
                return { success: true, message: `购买并学会了${itemName}` };
            }
            return result;
        } else {
            this.addItem(itemName);
            return { success: true, message: `购买了${itemName}` };
        }
    }

    // NPCSystem 额外代理方法
    getNPCAffection(npcId) {
        return this.npcAffection[npcId] || 0;
    }

    getAffectionLevel(affection) {
        if (affection >= 80) return '挚友';
        if (affection >= 50) return '好友';
        if (affection >= 20) return '相识';
        return '陌生';
    }

    recordNPCDialog(npcId, dialogId) {
        if (!this.npcHistory[npcId]) {
            this.npcHistory[npcId] = [];
        }
        this.npcHistory[npcId].push(dialogId);
    }

    giveGiftToNPC(npcId, itemName) {
        return this.npcSystem.giveGift(npcId, itemName);
    }

    // QuestSystem 额外代理方法
    getAvailableQuests() {
        return this.questSystem.getAvailableQuests();
    }

    getQuestProgressText(questId) {
        return this.questSystem.getQuestProgressText(questId);
    }

    startQuest(questId) {
        return this.questSystem.acceptQuest(questId);
    }

    getCurrentQuestStage(questId) {
        return this.questSystem.getCurrentQuestStage(questId);
    }

    // DungeonSystem 额外代理方法
    startTribulation(targetRealm) {
        return this.dungeonSystem.startTribulation(targetRealm);
    }

    processTribulation() {
        return this.dungeonSystem.processTribulation();
    }

    // PetSystem 代理方法
    setCurrentPet(petName) {
        return this.petSystem.setCurrentPet(petName);
    }

    // 物品系统
    addItem(itemName, count = 1) {
        if (!this.inventory[itemName]) {
            this.inventory[itemName] = 0;
        }
        this.inventory[itemName] += count;
        this.addLog(`获得${itemName} x${count}`, 'rare');
    }

    useItem(itemName) {
        const item = this.inventory[itemName];
        if (!item || item < 1) {
            return { success: false, message: '物品不存在或数量不足' };
        }

        // 简单的物品使用逻辑
        if (itemName === '聚气丹') {
            this.inventory[itemName]--;
            this.addCultivation(50);
            return { success: true, message: '使用了聚气丹，获得50修为' };
        }

        return { success: false, message: '该物品无法使用' };
    }

    // Buff系统
    checkBuffs() {
        const now = Date.now();

        // 检查修炼buff
        if (this.buffs.cultivation.endTime > 0 && now >= this.buffs.cultivation.endTime) {
            this.buffs.cultivation.multiplier = 1.0;
            this.buffs.cultivation.endTime = 0;
            this.addLog('修炼加成效果已结束', 'info');
        }

        // 检查突破buff
        if (this.buffs.breakthrough.endTime > 0 && now >= this.buffs.breakthrough.endTime) {
            this.buffs.breakthrough.bonus = 0.0;
            this.buffs.breakthrough.endTime = 0;
            this.addLog('突破加成效果已结束', 'info');
        }

        // 检查幸运buff
        if (this.buffs.luck && now >= this.buffs.luck.endTime) {
            this.buffs.luck = null;
            this.addLog('幸运加成效果已结束', 'info');
        }
    }

    // 状态获取
    getCurrentState() {
        let text = '修炼中';
        let type = 'cultivating';
        let endTime = 0;
        let adventure = null;
        let job = null;

        // 确定当前状态
        if (this.isMeditating) {
            text = '打坐中';
            type = 'meditating';
        } else if (this.isAdventuring && this.adventureEndTime > 0) {
            text = '历练中';
            type = 'adventuring';
            endTime = this.adventureEndTime;
            adventure = this.currentAdventure;
        } else if (this.isWorking && this.workEndTime > 0) {
            text = '打工中';
            type = 'working';
            endTime = this.workEndTime;
            job = this.currentJob;
        } else if (this.isExploring && this.explorationEndTime > 0) {
            text = '探索中';
            type = 'exploring';
            endTime = this.explorationEndTime;
        } else if (this.isInDungeon) {
            text = '副本中';
            type = 'dungeon';
        }

        return {
            text,
            type,
            endTime,
            adventure,
            job,
            realm: this.realm,
            level: this.level,
            cultivation: this.cultivation,
            maxCultivation: this.maxCultivation,
            isMeditating: this.isMeditating,
            isAdventuring: this.isAdventuring,
            isWorking: this.isWorking,
            isExploring: this.isExploring,
            spiritStones: this.spiritStones,
            currentSkill: this.currentSkill,
            currentPet: this.currentPet
        };
    }

    // SaveManager 代理方法
    save() {
        return SaveManager.save(this.saveSlot, this.toSaveObject());
    }

    toSaveObject() {
        return {
            saveSlot: this.saveSlot,
            playerName: this.playerName,
            daoName: this.daoName,
            background: this.background,
            talents: this.talents,
            spiritualRoot: this.spiritualRoot,
            realm: this.realm,
            level: this.level,
            cultivation: this.cultivation,
            maxCultivation: this.maxCultivation,
            spiritStones: this.spiritStones,
            cultivationRate: this.cultivationRate,
            totalDays: this.totalDays,
            isMeditating: this.isMeditating,
            isAdventuring: this.isAdventuring,
            isWorking: this.isWorking,
            isExploring: this.isExploring,
            adventureEndTime: this.adventureEndTime,
            workEndTime: this.workEndTime,
            explorationEndTime: this.explorationEndTime,
            currentAdventure: this.currentAdventure,
            currentJob: this.currentJob,
            currentExploration: this.currentExploration,
            isInDungeon: this.isInDungeon,
            currentDungeon: this.currentDungeon,
            dungeonProgress: this.dungeonProgress,
            permanentBoost: this.permanentBoost,
            sect: this.sect,
            sectContribution: this.sectContribution,
            sectRank: this.sectRank,
            sectReputation: this.sectReputation,
            inventory: this.inventory,
            skills: this.skills,
            currentSkill: this.currentSkill,
            pets: this.pets,
            currentPet: this.currentPet,
            equipment: this.equipment,
            artifacts: this.artifacts,
            equippedArtifacts: this.equippedArtifacts,
            combatSkills: this.combatSkills,
            activeCombatSkill: this.activeCombatSkill,
            combatSkillCooldowns: this.combatSkillCooldowns,
            npcAffection: this.npcAffection,
            npcHistory: this.npcHistory,
            unlockedNPCs: this.unlockedNPCs,
            questProgress: this.questProgress,
            completedQuests: this.completedQuests,
            currentChapter: this.currentChapter,
            storyFlags: this.storyFlags,
            achievements: this.achievements,
            logs: this.logs,
            buffs: this.buffs,
            lastSaveTime: Date.now(),
            totalPlayTime: this.totalPlayTime
        };
    }
}
