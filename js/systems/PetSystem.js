/**
 * 宠物系统模块
 * 从 game.js 的 GameState 类中提取的宠物相关方法
 *
 * 包含功能：
 * - 捕获宠物
 * - 释放宠物
 * - 装备宠物
 * - 升级宠物
 * - 获取宠物列表
 */

export class PetSystem {
    constructor(gameState) {
        this.state = gameState;
    }

    // 捕获宠物
    capturePet(petName) {
        if (this.state.pets[petName]) {
            return { success: false, message: '已有此宠物' };
        }

        const pet = this.state.pets[petName];
        if (!pet) {
            return { success: false, message: '未知宠物' };
        }

        // 检查要求
        if (pet.requirements.realm) {
            const realmNames = Object.keys(this.state.realms);
            const currentRealmIndex = realmNames.indexOf(this.state.realm);
            const requiredRealmIndex = realmNames.indexOf(pet.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${pet.requirements.realm}` };
            }

            if (currentRealmIndex === requiredRealmIndex && this.state.level < pet.requirements.level) {
                return { success: false, message: `层级不足，需要${pet.requirements.realm}${pet.requirements.level}层` };
            }
        }

        this.state.pets[petName] = { level: 1 };
        if (!this.state.currentPet) {
            this.state.currentPet = petName;
        }
        this.state.addLog(`获得了${petName}！`, 'legendary');
        return { success: true, message: `获得了${petName}` };
    }

    // 释放宠物
    releasePet(petName) {
        if (!this.state.pets[petName]) {
            return { success: false, message: '没有此宠物' };
        }

        // 如果是当前装备的宠物，先卸下
        if (this.state.currentPet === petName) {
            this.state.currentPet = null;
        }

        delete this.state.pets[petName];
        this.state.addLog(`释放了${petName}`, 'info');
        return { success: true, message: '释放成功' };
    }

    // 装备宠物
    equipPet(petName) {
        if (!this.state.pets[petName]) {
            return { success: false, message: '没有此宠物' };
        }

        this.state.currentPet = petName;
        this.state.addLog(`出战${petName}`, 'info');
        return { success: true, message: `出战${petName}` };
    }

    // 卸下宠物
    unequipPet() {
        if (!this.state.currentPet) {
            return { success: false, message: '没有装备宠物' };
        }

        const petName = this.state.currentPet;
        this.state.currentPet = null;
        this.state.addLog(`收回了${petName}`, 'info');
        return { success: true, message: '收回成功' };
    }

    // 升级宠物
    upgradePet(petName, levels = 1) {
        if (!this.state.pets[petName]) {
            return { success: false, message: '没有此宠物' };
        }

        const pet = this.state.pets[petName];
        const petConfig = this.state.pets[petName];

        if (pet.level >= petConfig.maxLevel) {
            return { success: false, message: '宠物已达到最高级' };
        }

        // 计算升级消耗
        const costPerLevel = 100 * pet.level;
        const totalCost = costPerLevel * levels;

        if (this.state.spiritStones < totalCost) {
            return { success: false, message: `灵石不足，需要${totalCost}灵石` };
        }

        // 扣除费用
        this.state.spiritStones -= totalCost;

        // 升级
        const oldLevel = pet.level;
        pet.level = Math.min(pet.level + levels, petConfig.maxLevel);

        this.state.addLog(`${petName}从${oldLevel}级升到了${pet.level}级！`, 'success');
        return { success: true, message: `${petName}升级成功` };
    }

    // 获取宠物信息
    getPetInfo(petName) {
        if (!this.state.pets[petName]) {
            return null;
        }

        const petConfig = this.state.pets[petName];
        const petData = this.state.pets[petName];

        return {
            name: petName,
            level: petData.level,
            maxLevel: petConfig.maxLevel,
            effect: petConfig.effect,
            value: petConfig.value,
            description: petConfig.description,
            isEquipped: this.state.currentPet === petName
        };
    }

    // 获取所有宠物列表
    getAllPets() {
        const pets = [];

        for (const [petName, petData] of Object.entries(this.state.pets)) {
            const petConfig = this.state.pets[petName];
            pets.push({
                name: petName,
                level: petData.level,
                maxLevel: petConfig.maxLevel,
                effect: petConfig.effect,
                value: petConfig.value,
                isEquipped: this.state.currentPet === petName
            });
        }

        return pets;
    }

    // 获取可获得的宠物列表
    getAvailablePets() {
        const availablePets = [];
        const realmIndex = Object.keys(this.state.realms).indexOf(this.state.realm);

        for (const [petName, petConfig] of Object.entries(this.state.pets)) {
            // 跳过已获得的宠物
            if (this.state.pets[petName]) {
                continue;
            }

            // 检查境界要求
            if (petConfig.requirements.realm) {
                const reqRealmIndex = Object.keys(this.state.realms).indexOf(petConfig.requirements.realm);
                if (realmIndex < reqRealmIndex) {
                    continue;
                }

                // 同境界需要检查层级
                if (realmIndex === reqRealmIndex && this.state.level < petConfig.requirements.level) {
                    continue;
                }
            }

            availablePets.push({
                name: petName,
                effect: petConfig.effect,
                value: petConfig.value,
                description: petConfig.description,
                requirements: petConfig.requirements
            });
        }

        return availablePets;
    }

    // 获取当前装备的宠物
    getCurrentPet() {
        if (!this.state.currentPet) {
            return null;
        }

        return this.getPetInfo(this.state.currentPet);
    }

    // 计算宠物加成
    calculatePetBonus() {
        if (!this.state.currentPet) {
            return {
                attackBoost: 0,
                defenseBoost: 0,
                cultivationBoost: 0,
                allStatsBoost: 0,
                luckBoost: 0
            };
        }

        const pet = this.state.pets[this.state.currentPet];
        const petConfig = this.state.pets[this.state.currentPet];
        const petLevel = pet.level;

        const bonus = {
            attackBoost: 0,
            defenseBoost: 0,
            cultivationBoost: 0,
            allStatsBoost: 0,
            luckBoost: 0
        };

        switch (petConfig.effect) {
            case 'attack_boost':
                bonus.attackBoost = petConfig.value * petLevel * 0.1;
                break;
            case 'defense_boost':
                bonus.defenseBoost = petConfig.value * petLevel * 0.1;
                break;
            case 'cultivation_boost':
                bonus.cultivationBoost = petConfig.value * petLevel * 0.1;
                break;
            case 'all_stats':
                bonus.allStatsBoost = petConfig.value * petLevel * 0.1;
                break;
            case 'luck_boost':
                bonus.luckBoost = petConfig.value * petLevel * 0.1;
                break;
        }

        return bonus;
    }

    // 使用宠物升级道具
    usePetBoostItem(itemName, petName) {
        if (!this.state.pets[petName]) {
            return { success: false, message: '没有此宠物' };
        }

        if (!this.state.inventory[itemName] || this.state.inventory[itemName] <= 0) {
            return { success: false, message: '没有此物品' };
        }

        const item = this.state.items[itemName];
        if (!item || item.effect !== 'pet_level') {
            return { success: false, message: '此物品无法升级宠物' };
        }

        const pet = this.state.pets[petName];
        const petConfig = this.state.pets[petName];

        // 升级宠物
        const oldLevel = pet.level;
        pet.level = Math.min(pet.level + item.value, petConfig.maxLevel);

        // 消耗物品
        this.state.inventory[itemName]--;
        if (this.state.inventory[itemName] <= 0) {
            delete this.state.inventory[itemName];
        }

        if (pet.level > oldLevel) {
            this.state.addLog(`${petName}提升了${pet.level - oldLevel}级！`, 'success');
            return { success: true, message: `${petName}升级成功` };
        } else {
            this.state.addLog(`${petName}已达到最高级`, 'info');
            return { success: false, message: '宠物已满级' };
        }
    }

    // 设置宠物出战
    setCurrentPet(petName) {
        return this.equipPet(petName);
    }
}
