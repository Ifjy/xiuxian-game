// ==================== 游戏配置 ====================
const CONFIG = {
    // 境界配置
    realms: {
        '炼气期': {
            levels: 9,
            baseRequirement: 100,
            growthMultiplier: 1.8,
            baseCultivationRate: 1.0,
            breakthroughBaseChance: 0.95,
            breakthroughVariance: 0.1,
            baseAttack: 10,
            baseDefense: 5,
            baseHealth: 100
        },
        '筑基期': {
            levels: 9,
            baseRequirement: 500,
            growthMultiplier: 2.0,
            baseCultivationRate: 1.5,
            breakthroughBaseChance: 0.85,
            breakthroughVariance: 0.15,
            baseAttack: 25,
            baseDefense: 15,
            baseHealth: 250
        },
        '金丹期': {
            levels: 9,
            baseRequirement: 2500,
            growthMultiplier: 2.2,
            baseCultivationRate: 2.0,
            breakthroughBaseChance: 0.75,
            breakthroughVariance: 0.2,
            baseAttack: 50,
            baseDefense: 30,
            baseHealth: 500
        },
        '元婴期': {
            levels: 9,
            baseRequirement: 12500,
            growthMultiplier: 2.4,
            baseCultivationRate: 2.5,
            breakthroughBaseChance: 0.65,
            breakthroughVariance: 0.25,
            baseAttack: 100,
            baseDefense: 60,
            baseHealth: 1000
        },
        '化神期': {
            levels: 9,
            baseRequirement: 62500,
            growthMultiplier: 2.6,
            baseCultivationRate: 3.0,
            breakthroughBaseChance: 0.55,
            breakthroughVariance: 0.3,
            baseAttack: 200,
            baseDefense: 120,
            baseHealth: 2000
        },
        '炼虚期': {
            levels: 9,
            baseRequirement: 312500,
            growthMultiplier: 2.8,
            baseCultivationRate: 3.5,
            breakthroughBaseChance: 0.45,
            breakthroughVariance: 0.35,
            baseAttack: 400,
            baseDefense: 240,
            baseHealth: 4000
        },
        '合体期': {
            levels: 9,
            baseRequirement: 1562500,
            growthMultiplier: 3.0,
            baseCultivationRate: 4.0,
            breakthroughBaseChance: 0.35,
            breakthroughVariance: 0.4,
            baseAttack: 800,
            baseDefense: 480,
            baseHealth: 8000
        },
        '大乘期': {
            levels: 9,
            baseRequirement: 7812500,
            growthMultiplier: 3.2,
            baseCultivationRate: 4.5,
            breakthroughBaseChance: 0.25,
            breakthroughVariance: 0.45,
            baseAttack: 1600,
            baseDefense: 960,
            baseHealth: 16000
        },
        '渡劫期': {
            levels: 9,
            baseRequirement: 39062500,
            growthMultiplier: 3.4,
            baseCultivationRate: 5.0,
            breakthroughBaseChance: 0.15,
            breakthroughVariance: 0.5,
            baseAttack: 3200,
            baseDefense: 1920,
            baseHealth: 32000
        }
    },

    // 出身背景配置
    backgrounds: {
        'commoner': { name: '凡人', bonus: {}, description: '普通人家，一切从零开始' },
        'noble': {
            name: '贵族子弟',
            bonus: { spiritStones: 1000, wisdom: 2 },
            description: '家境殷实，初始灵石+1000，悟性+2'
        },
        'merchant': {
            name: '商贾之家',
            bonus: { spiritStones: 500, luck: 3 },
            description: '善于经营，初始灵石+500，幸运+3'
        },
        'scholar': {
            name: '书香门第',
            bonus: { wisdom: 5, potential: 2 },
            description: '饱读诗书，悟性+5，根骨+2'
        },
        'farmer': {
            name: '农家子弟',
            bonus: { potential: 5, fortune: 1 },
            description: '吃苦耐劳，根骨+5，机缘+1'
        },
        'warrior': {
            name: '武学世家',
            bonus: { attack: 10, defense: 5 },
            description: '世代习武，攻击+10，防御+5'
        },
        'orphan': {
            name: '孤儿',
            bonus: { luck: 5, fortune: 3 },
            description: '命运多舛但坚韧不拔，幸运+5，机缘+3'
        }
    },

    // 功法配置
    skills: {
        '基础吐纳法': {
            tier: '人阶',
            level: 1,
            maxLevel: 3,
            effect: 'cultivation_speed',
            value: 0.1,
            description: '最基础的修炼功法',
            requirements: {}
        },
        '引气诀': {
            tier: '人阶',
            level: 1,
            maxLevel: 3,
            effect: 'cultivation_speed',
            value: 0.15,
            description: '引导天地灵气入体',
            requirements: { realm: '炼气期', level: 2 }
        },
        '长春功': {
            tier: '人阶',
            level: 1,
            maxLevel: 5,
            effect: 'health_regen',
            value: 0.1,
            description: '增强生命恢复能力',
            requirements: { realm: '炼气期', level: 3 }
        },
        '金刚诀': {
            tier: '人阶',
            level: 1,
            maxLevel: 5,
            effect: 'defense_boost',
            value: 0.2,
            description: '增强身体防御力',
            requirements: { realm: '筑基期', level: 1 }
        },
        '烈焰掌': {
            tier: '人阶',
            level: 1,
            maxLevel: 5,
            effect: 'attack_boost',
            value: 0.25,
            description: '增强攻击力，附带火焰伤害',
            requirements: { realm: '筑基期', level: 2 }
        },
        '紫霞功': {
            tier: '地阶',
            level: 1,
            maxLevel: 7,
            effect: 'cultivation_speed',
            value: 0.3,
            description: '名门正派功法，大幅提升修炼速度',
            requirements: { realm: '金丹期', level: 1 }
        },
        '天罡战气': {
            tier: '地阶',
            level: 1,
            maxLevel: 7,
            effect: 'all_stats',
            value: 0.15,
            description: '全面提升战斗能力',
            requirements: { realm: '金丹期', level: 3 }
        },
        '太上忘情录': {
            tier: '地阶',
            level: 1,
            maxLevel: 9,
            effect: 'breakthrough_chance',
            value: 0.2,
            description: '提升突破成功率',
            requirements: { realm: '元婴期', level: 1 }
        },
        '九转玄功': {
            tier: '天阶',
            level: 1,
            maxLevel: 9,
            effect: 'all_stats',
            value: 0.5,
            description: '传说中的无上功法，大幅提升各项能力',
            requirements: { realm: '化神期', level: 1 }
        }
    },

    // 战斗技能配置
    combatSkills: {
        // === 攻击类技能 ===
        '剑气术': {
            id: 'sword_qi',
            name: '剑气术',
            type: 'attack',
            tier: '人阶',
            power: 1.5,
            cooldown: 0, // 0表示无冷却
            cost: 0,
            description: '凝聚剑气，造成150%攻击伤害',
            effect: 'damage_multiplier',
            value: 0.5,
            requirements: { realm: '炼气期', level: 1 }
        },
        '烈焰掌': {
            id: 'flame_palm',
            name: '烈焰掌',
            type: 'attack',
            tier: '人阶',
            power: 1.8,
            cooldown: 3,
            cost: 10,
            description: '燃烧的火焰掌力，造成180%攻击伤害，10%概率灼烧',
            effect: 'damage_dot',
            value: 0.1,
            requirements: { realm: '炼气期', level: 3 }
        },
        '雷法': {
            id: 'thunder_spell',
            name: '雷法',
            type: 'attack',
            tier: '地阶',
            power: 2.5,
            cooldown: 5,
            cost: 20,
            description: '召唤雷电，造成250%攻击伤害',
            effect: 'damage_multiplier',
            value: 1.5,
            requirements: { realm: '筑基期', level: 1 }
        },
        '飞剑术': {
            id: 'flying_sword',
            name: '飞剑术',
            type: 'attack',
            tier: '地阶',
            power: 2.0,
            cooldown: 4,
            cost: 15,
            description: '御剑飞行，无视部分防御（50%）',
            effect: 'armor_penetration',
            value: 0.5,
            requirements: { realm: '金丹期', level: 1 }
        },

        // === 防御类技能 ===
        '护体罡气': {
            id: 'body_protection',
            name: '护体罡气',
            type: 'defense',
            tier: '人阶',
            power: 1.0,
            cooldown: 5,
            cost: 15,
            description: '护体罡气，减少50%伤害，持续2回合',
            effect: 'damage_reduction',
            value: 0.5,
            duration: 2,
            requirements: { realm: '炼气期', level: 2 }
        },
        '闪避术': {
            id: 'dodge_technique',
            name: '闪避术',
            type: 'defense',
            tier: '人阶',
            power: 1.0,
            cooldown: 4,
            cost: 10,
            description: '身法闪避，提高50%闪避率',
            effect: 'dodge_boost',
            value: 0.5,
            requirements: { realm: '炼气期', level: 1 }
        },
        '金钟罩': {
            id: 'golden_bell',
            name: '金钟罩',
            type: 'defense',
            tier: '地阶',
            power: 1.0,
            cooldown: 8,
            cost: 25,
            description: '金钟罩护体，免疫一次攻击',
            effect: 'immunity',
            value: 1,
            charges: 1,
            requirements: { realm: '筑基期', level: 3 }
        },

        // === 辅助类技能 ===
        '聚气': {
            id: 'gather_qi',
            name: '聚气',
            type: 'buff',
            tier: '人阶',
            power: 1.0,
            cooldown: 6,
            cost: 10,
            description: '聚气凝神，下回合攻击翻倍',
            effect: 'next_attack_boost',
            value: 1.0,
            requirements: { realm: '炼气期', level: 1 }
        },
        '破防': {
            id: 'break_defense',
            name: '破防',
            type: 'debuff',
            tier: '人阶',
            power: 1.0,
            cooldown: 5,
            cost: 12,
            description: '寻找破绽，降低敌人30%防御',
            effect: 'enemy_defense_reduction',
            value: 0.3,
            requirements: { realm: '炼气期', level: 2 }
        },
        '狂暴': {
            id: 'berserk',
            name: '狂暴',
            type: 'buff',
            tier: '地阶',
            power: 1.0,
            cooldown: 8,
            cost: 30,
            description: '进入狂暴状态，攻击+50%，防御-30%，持续3回合',
            effect: 'attack_defense_tradeoff',
            value: { attack: 0.5, defense: -0.3 },
            duration: 3,
            requirements: { realm: '筑基期', level: 5 }
        }
    },

    // 宠物配置
    pets: {
        '灵猫': {
            tier: '凡阶',
            level: 1,
            maxLevel: 10,
            effect: 'luck_boost',
            value: 0.1,
            description: '小巧可爱，能增加幸运',
            requirements: { realm: '炼气期', level: 1 }
        },
        '灵犬': {
            tier: '凡阶',
            level: 1,
            maxLevel: 10,
            effect: 'find_items',
            value: 0.15,
            description: '嗅觉灵敏，能帮你找到宝物',
            requirements: { realm: '炼气期', level: 2 }
        },
        '飞鹰': {
            tier: '灵阶',
            level: 1,
            maxLevel: 20,
            effect: 'adventure_bonus',
            value: 0.2,
            description: '翱翔天际，增加历练收益',
            requirements: { realm: '筑基期', level: 1 }
        },
        '灵蛇': {
            tier: '灵阶',
            level: 1,
            maxLevel: 20,
            effect: 'defense_boost',
            value: 0.15,
            description: '剧毒之物，能增加防御',
            requirements: { realm: '筑基期', level: 3 }
        },
        '仙鹤': {
            tier: '灵阶',
            level: 1,
            maxLevel: 20,
            effect: 'cultivation_boost',
            value: 0.1,
            description: '灵气十足，能增加修炼速度',
            requirements: { realm: '金丹期', level: 1 }
        },
        '麒麟': {
            tier: '圣阶',
            level: 1,
            maxLevel: 30,
            effect: 'all_stats',
            value: 0.2,
            description: '神兽麒麟，全面提升能力',
            requirements: { realm: '元婴期', level: 1 }
        },
        '凤凰': {
            tier: '圣阶',
            level: 1,
            maxLevel: 30,
            effect: 'rebirth',
            value: 0.5,
            description: '不死神鸟，有复活效果',
            requirements: { realm: '化神期', level: 1 }
        },
        '青龙': {
            tier: '神阶',
            level: 1,
            maxLevel: 40,
            effect: 'domination',
            value: 0.5,
            description: '四神兽之首，战力惊人',
            requirements: { realm: '炼虚期', level: 1 }
        },
        '白虎': {
            tier: '神阶',
            level: 1,
            maxLevel: 40,
            effect: 'attack_boost',
            value: 0.4,
            description: '主杀伐，大幅提升攻击',
            requirements: { realm: '合体期', level: 1 }
        }
    },

    // 物品配置
    items: {
        '聚气丹': {
            description: '短时间内提升修炼速度',
            effect: 'cultivation_boost',
            value: 2.0,
            duration: 60000,
            rarity: 'common',
            price: 50
        },
        '筑基丹': {
            description: '大幅提升突破成功率',
            effect: 'breakthrough_boost',
            value: 0.3,
            duration: 0,
            rarity: 'rare',
            price: 500
        },
        '灵石袋': {
            description: '包含随机数量的灵石（约80-200个）',
            effect: 'spirit_stones',
            value: [80, 200],
            duration: 0,
            rarity: 'common',
            price: 100
        },
        '天劫符': {
            description: '渡劫时使用，大幅提升成功率',
            effect: 'tribulation_boost',
            value: 0.5,
            duration: 0,
            rarity: 'legendary',
            price: 5000
        },
        '洗髓丹': {
            description: '改善根骨，永久增加根骨+1',
            effect: 'potential_boost',
            value: 1,
            duration: 0,
            rarity: 'rare',
            price: 1000
        },
        '悟性丹': {
            description: '开启智慧，永久增加悟性+1',
            effect: 'wisdom_boost',
            value: 1,
            duration: 0,
            rarity: 'rare',
            price: 1000
        },
        '幸运符': {
            description: '暂时提升幸运',
            effect: 'luck_boost',
            value: 5,
            duration: 300000,
            rarity: 'common',
            price: 200
        },
        '灵宠丹': {
            description: '提升宠物等级',
            effect: 'pet_level',
            value: 1,
            rarity: 'rare',
            price: 1500
        }
    },

    // 怪物配置（完善版）
    monsters: [
        // 炼气期怪物（凡阶）
        {
            id: 'wolf_1',
            name: '灰狼',
            level: 1,
            tier: '凡阶',
            hp: 30,
            attack: 5,
            defense: 2,
            rewards: {
                spiritStones: [10, 30],
                cultivation: [5, 15],
                items: ['聚气丹'],
                dropRate: 0.3
            },
            requirements: { realm: '炼气期', level: 1 }
        },
        {
            id: 'wolf_2',
            name: '铁背狼',
            level: 3,
            tier: '凡阶',
            hp: 60,
            attack: 10,
            defense: 5,
            rewards: {
                spiritStones: [30, 60],
                cultivation: [15, 35],
                items: ['聚气丹', '筑基丹'],
                dropRate: 0.2
            },
            requirements: { realm: '炼气期', level: 3 }
        },
        {
            id: 'snake_1',
            name: '毒蛇',
            level: 2,
            tier: '凡阶',
            hp: 40,
            attack: 8,
            defense: 3,
            rewards: {
                spiritStones: [20, 40],
                cultivation: [10, 25],
                items: ['聚气丹'],
                dropRate: 0.25
            },
            requirements: { realm: '炼气期', level: 2 }
        },
        {
            id: 'snake_2',
            name: '铁线蛇',
            level: 5,
            tier: '凡阶',
            hp: 80,
            attack: 15,
            defense: 8,
            rewards: {
                spiritStones: [50, 100],
                cultivation: [25, 50],
                items: ['聚气丹', '筑基丹'],
                dropRate: 0.2
            },
            requirements: { realm: '炼气期', level: 7 }
        },
        {
            id: 'bandit_1',
            name: '小山贼',
            level: 2,
            tier: '凡阶',
            hp: 50,
            attack: 7,
            defense: 4,
            rewards: {
                spiritStones: [25, 50],
                cultivation: [12, 30],
                items: ['灵石袋'],
                dropRate: 0.3
            },
            requirements: { realm: '炼气期', level: 2 }
        },
        {
            id: 'bandit_2',
            name: '山贼头目',
            level: 6,
            tier: '凡阶',
            hp: 120,
            attack: 18,
            defense: 10,
            rewards: {
                spiritStones: [80, 150],
                cultivation: [40, 80],
                items: ['筑基丹', '灵石袋'],
                dropRate: 0.2
            },
            requirements: { realm: '炼气期', level: 9 }
        },
        // 筑基期怪物（灵阶）
        {
            id: 'tiger_1',
            name: '猛虎',
            level: 7,
            tier: '灵阶',
            hp: 200,
            attack: 25,
            defense: 12,
            rewards: {
                spiritStones: [100, 200],
                cultivation: [50, 100],
                items: ['聚气丹', '筑基丹'],
                dropRate: 0.25
            },
            requirements: { realm: '筑基期', level: 1 }
        },
        {
            id: 'tiger_2',
            name: '白虎精',
            level: 9,
            tier: '灵阶',
            hp: 400,
            attack: 40,
            defense: 20,
            rewards: {
                spiritStones: [200, 400],
                cultivation: [100, 200],
                items: ['筑基丹', '洗髓丹'],
                dropRate: 0.2
            },
            requirements: { realm: '筑基期', level: 5 }
        },
        {
            id: 'demon_1',
            name: '低阶妖兽',
            level: 8,
            tier: '灵阶',
            hp: 300,
            attack: 35,
            defense: 18,
            rewards: {
                spiritStones: [150, 300],
                cultivation: [75, 150],
                items: ['筑基丹', '洗髓丹'],
                dropRate: 0.2
            },
            requirements: { realm: '筑基期', level: 7 }
        },
        {
            id: 'demon_2',
            name: '中阶妖兽',
            level: 10,
            tier: '灵阶',
            hp: 600,
            attack: 50,
            defense: 25,
            rewards: {
                spiritStones: [300, 600],
                cultivation: [150, 300],
                items: ['洗髓丹', '悟性丹'],
                dropRate: 0.15
            },
            requirements: { realm: '金丹期', level: 1 }
        },
        // 金丹期怪物（灵阶-圣阶）
        {
            id: 'cultivator_1',
            name: '散修',
            level: 11,
            tier: '灵阶',
            hp: 800,
            attack: 60,
            defense: 30,
            rewards: {
                spiritStones: [400, 800],
                cultivation: [200, 400],
                items: ['筑基丹', '悟性丹'],
                dropRate: 0.2
            },
            requirements: { realm: '金丹期', level: 1 }
        },
        {
            id: 'cultivator_2',
            name: '宗门弟子',
            level: 13,
            tier: '灵阶',
            hp: 1200,
            attack: 80,
            defense: 40,
            rewards: {
                spiritStones: [600, 1200],
                cultivation: [300, 600],
                items: ['悟性丹', '天劫符'],
                dropRate: 0.15
            },
            requirements: { realm: '金丹期', level: 5 }
        },
        {
            id: 'beast_king_1',
            name: '虎妖王',
            level: 14,
            tier: '圣阶',
            hp: 2000,
            attack: 120,
            defense: 60,
            rewards: {
                spiritStones: [1000, 2000],
                cultivation: [500, 1000],
                items: ['悟性丹', '天劫符', '洗髓丹'],
                dropRate: 0.2
            },
            requirements: { realm: '元婴期', level: 1 }
        },
        // 元婴期怪物（圣阶）
        {
            id: 'beast_emperor_1',
            name: '虎妖皇',
            level: 16,
            tier: '圣阶',
            hp: 3500,
            attack: 180,
            defense: 90,
            rewards: {
                spiritStones: [2000, 4000],
                cultivation: [1000, 2000],
                items: ['天劫符', '洗髓丹', '悟性丹'],
                dropRate: 0.15
            },
            requirements: { realm: '元婴期', level: 5 }
        },
        {
            id: 'demon_king_1',
            name: '妖王',
            level: 15,
            tier: '圣阶',
            hp: 3000,
            attack: 150,
            defense: 75,
            rewards: {
                spiritStones: [1500, 3000],
                cultivation: [750, 1500],
                items: ['天劫符', '悟性丹'],
                dropRate: 0.2
            },
            requirements: { realm: '化神期', level: 1 }
        },
        // 化神期怪物（圣阶-神阶）
        {
            id: 'demon_emperor_1',
            name: '妖皇',
            level: 17,
            tier: '神阶',
            hp: 5000,
            attack: 250,
            defense: 125,
            rewards: {
                spiritStones: [5000, 10000],
                cultivation: [2500, 5000],
                items: ['天劫符', '洗髓丹', '悟性丹'],
                dropRate: 0.1
            },
            requirements: { realm: '炼虚期', level: 1 }
        }
    ],

    // 打坐时的随机事件
    meditationEvents: [
        {
            name: '灵气波动',
            message: '四周灵气突然充沛起来！',
            effect: 'cultivation_boost',
            value: [10, 50],
            chance: 0.08
        },
        {
            name: '心魔侵扰',
            message: '修炼时心魔来袭，需要定力抵抗！',
            effect: 'cultivation_loss',
            value: [5, 20],
            chance: 0.06
        },
        {
            name: '顿悟',
            message: '你对修炼有了新的感悟！',
            effect: 'cultivation_bonus',
            value: [30, 100],
            chance: 0.04
        },
        {
            name: '天地异象',
            message: '天降异象，灵气狂涌！',
            effect: 'global_boost',
            value: 2.0,
            duration: 60000,
            chance: 0.02
        },
        {
            name: '走火入魔',
            message: '修炼出错，差点走火入魔！',
            effect: 'cultivation_loss',
            value: [20, 80],
            chance: 0.03
        },
        {
            name: '仙人指路',
            message: '梦中得仙人指点，获益匪浅！',
            effect: 'cultivation_large_bonus',
            value: [100, 300],
            chance: 0.01
        },
        {
            name: '灵兽现世',
            message: '一只灵兽出现在你面前！',
            effect: 'pet_encounter',
            chance: 0.005
        },
        {
            name: '古迹发现',
            message: '你发现了一处古代修士的遗迹！',
            effect: 'skill_fragment',
            chance: 0.003
        }
    ],

    // 历练事件
    adventures: [
        {
            name: '探索秘境',
            message: '你深入一处秘境探险...',
            duration: 30000,
            outcomes: [
                { chance: 0.4, result: 'success', reward: { type: 'cultivation', value: [100, 300] } },
                { chance: 0.3, result: 'item', reward: { type: 'item', value: '聚气丹' } },
                { chance: 0.2, result: 'failure', penalty: { type: 'cultivation_loss', value: [50, 150] } },
                { chance: 0.1, result: 'great_success', reward: { type: 'item', value: '筑基丹' } }
            ]
        },
        {
            name: '寻找灵草',
            message: '你前往深山寻找灵草...',
            duration: 20000,
            outcomes: [
                { chance: 0.5, result: 'success', reward: { type: 'spirit_stones', value: [150, 400] } },
                { chance: 0.3, result: 'item', reward: { type: 'item', value: '聚气丹' } },
                { chance: 0.2, result: 'failure', message: '什么都没找到，白白浪费时间' }
            ]
        },
        {
            name: '挑战妖兽',
            message: '你向一只低阶妖兽发起挑战...',
            duration: 40000,
            outcomes: [
                { chance: 0.3, result: 'success', reward: { type: 'cultivation', value: [200, 500] } },
                { chance: 0.2, result: 'great_success', reward: { type: 'item', value: '天劫符' } },
                { chance: 0.5, result: 'failure', penalty: { type: 'injured', value: [30, 80] } }
            ]
        },
        {
            name: '坊市淘宝',
            message: '你在坊市中寻找宝物...',
            duration: 15000,
            outcomes: [
                { chance: 0.6, result: 'success', reward: { type: 'item', value: '聚气丹' } },
                { chance: 0.2, result: 'great_success', reward: { type: 'item', value: '洗髓丹' } },
                { chance: 0.2, result: 'failure', message: '空手而归，花费了一些路费' }
            ]
        },
        {
            name: '捕捉灵兽',
            message: '你尝试捕捉一只灵兽...',
            duration: 25000,
            outcomes: [
                { chance: 0.4, result: 'success', reward: { type: 'pet', value: '灵猫' } },
                { chance: 0.3, result: 'item', reward: { type: 'item', value: '幸运符' } },
                { chance: 0.3, result: 'failure', message: '灵兽逃走了，你被反击受伤' }
            ]
        }
    ],

    // 秘境探索配置
    secretRealms: [
        {
            id: 'ancient_cave',
            name: '古修洞府',
            description: '上古修士留下的洞府，可能藏有宝物',
            type: 'exploration',
            difficulty: 1, // 难度等级 1-5
            duration: 60000, // 探索时长（毫秒）
            requirements: { realm: '炼气期', level: 3 },
            cost: { spiritStones: 100 }, // 探索消耗
            risk: 0.3, // 风险概率
            outcomes: [
                { chance: 0.4, result: 'success', rewards: [
                    { type: 'spirit_stones', value: [200, 500] },
                    { type: 'cultivation', value: [100, 200] }
                ]},
                { chance: 0.2, result: 'good_find', rewards: [
                    { type: 'spirit_stones', value: [500, 1000] },
                    { type: 'item', value: '筑基丹' }
                ]},
                { chance: 0.1, result: 'great_find', rewards: [
                    { type: 'artifact', value: '铁剑' },
                    { type: 'spirit_stones', value: [1000, 2000] }
                ]},
                { chance: 0.3, result: 'failure', penalty: { type: 'injured', value: [50, 150] } }
            ]
        },
        {
            id: 'beast_nest',
            name: '妖兽巢穴',
            description: '妖兽聚集之地，危险但收益丰厚',
            type: 'combat',
            difficulty: 2,
            duration: 90000,
            requirements: { realm: '筑基期', level: 1 },
            cost: { spiritStones: 200 },
            risk: 0.5,
            outcomes: [
                { chance: 0.3, result: 'victory', rewards: [
                    { type: 'spirit_stones', value: [500, 1000] },
                    { type: 'cultivation', value: [200, 400] }
                ]},
                { chance: 0.15, result: 'boss_kill', rewards: [
                    { type: 'artifact', value: '青霜剑' },
                    { type: 'spirit_stones', value: [2000, 3000] },
                    { type: 'cultivation', value: [500, 800] }
                ]},
                { chance: 0.05, result: 'legendary_kill', rewards: [
                    { type: 'artifact', value: '烈焰环' },
                    { type: 'spirit_stones', value: [5000, 8000] }
                ]},
                { chance: 0.5, result: 'defeat', penalty: { type: 'heavy_injured', value: [100, 300] } }
            ]
        },
        {
            id: 'spirit_mine',
            name: '灵脉矿点',
            description: '蕴含丰富灵石的矿脉',
            type: 'gathering',
            difficulty: 1,
            duration: 45000,
            requirements: { realm: '炼气期', level: 5 },
            cost: { spiritStones: 50 },
            risk: 0.2,
            outcomes: [
                { chance: 0.5, result: 'success', rewards: [
                    { type: 'spirit_stones', value: [300, 600] }
                ]},
                { chance: 0.25, result: 'rich_vein', rewards: [
                    { type: 'spirit_stones', value: [800, 1500] },
                    { type: 'item', value: '聚气丹' }
                ]},
                { chance: 0.1, result: 'super_rare', rewards: [
                    { type: 'spirit_stones', value: [2000, 4000] },
                    { type: 'artifact', value: '青铜盾' }
                ]},
                { chance: 0.15, result: 'failure', penalty: { type: 'cultivation_loss', value: [30, 80] } }
            ]
        },
        {
            id: 'ancient_ruins',
            name: '上古遗迹',
            description: '神秘的史前遗迹，充满未知',
            type: 'puzzle',
            difficulty: 3,
            duration: 120000,
            requirements: { realm: '金丹期', level: 1 },
            cost: { spiritStones: 500 },
            risk: 0.4,
            outcomes: [
                { chance: 0.35, result: 'solved', rewards: [
                    { type: 'cultivation', value: [500, 1000] },
                    { type: 'skill', value: '基础剑法' }
                ]},
                { chance: 0.15, result: 'secret_found', rewards: [
                    { type: 'artifact', value: '青云剑' },
                    { type: 'cultivation', value: [1000, 2000] }
                ]},
                { chance: 0.05, result: 'legacy', rewards: [
                    { type: 'artifact', value: '九天玄盾' },
                    { type: 'spirit_stones', value: [10000, 15000] }
                ]},
                { chance: 0.45, result: 'trapped', penalty: { type: 'sealed', value: [200, 500] } }
            ]
        },
        {
            id: 'void_crack',
            name: '虚空裂缝',
            description: '连接异空间的裂缝，极度危险',
            type: 'challenge',
            difficulty: 5,
            duration: 180000,
            requirements: { realm: '元婴期', level: 1 },
            cost: { spiritStones: 1000 },
            risk: 0.7,
            outcomes: [
                { chance: 0.25, result: 'survived', rewards: [
                    { type: 'cultivation', value: [1000, 2000] },
                    { type: 'spirit_stones', value: [5000, 10000] }
                ]},
                { chance: 0.1, result: 'conqueror', rewards: [
                    { type: 'artifact', value: '轩辕剑' },
                    { type: 'cultivation', value: [3000, 5000] }
                ]},
                { chance: 0.02, result: 'void_master', rewards: [
                    { type: 'artifact', value: '昊天塔' },
                    { type: 'spirit_stones', value: [50000, 100000] }
                ]},
                { chance: 0.63, result: 'lost', penalty: { type: 'realm_fall', value: 1 } }
            ]
        }
    ],

    // 打工配置
    jobs: [
        {
            id: 'manual_labor',
            name: '体力劳动',
            description: '为村民干农活，搬运货物',
            duration: 10000,
            baseReward: [50, 100],
            risk: 0.05,
            riskPenalty: [10, 30],
            attribute: 'potential',
            bonusMultiplier: 0.1
        },
        {
            id: 'merchant_assistant',
            name: '商行助手',
            description: '在商行帮忙整理货物',
            duration: 15000,
            baseReward: [80, 150],
            risk: 0.03,
            riskPenalty: [5, 15],
            attribute: 'luck',
            bonusMultiplier: 0.15
        },
        {
            id: 'library_helper',
            name: '藏经阁助手',
            description: '整理古籍，可能获得额外奖励',
            duration: 20000,
            baseReward: [100, 200],
            risk: 0.02,
            riskPenalty: [5, 10],
            attribute: 'wisdom',
            bonusMultiplier: 0.2
        },
        {
            id: 'alchemy_assistant',
            name: '炼丹房助手',
            description: '帮忙处理药材，学习炼丹知识',
            duration: 25000,
            baseReward: [150, 300],
            risk: 0.08,
            riskPenalty: [20, 50],
            attribute: 'wisdom',
            bonusMultiplier: 0.15
        }
    ],

    // 宗门配置
    sects: [
        {
            id: 'none',
            name: '无门无派',
            description: '自由自在，无拘无束',
            requirements: {},
            benefits: {},
            joinCost: 0
        },
        {
            id: 'cloud_sword',
            name: '云剑宗',
            description: '正道大宗，以剑入道',
            requirements: { realm: '炼气期', level: 3 },
            benefits: { cultivationBonus: 0.1, attackBonus: 0.05 },
            joinCost: 1000,
            specialFeatures: ['剑意修炼', '御剑飞行']
        },
        {
            id: 'spirit_valley',
            name: '灵谷门',
            description: '擅长炼丹',
            requirements: { realm: '炼气期', level: 5 },
            benefits: { alchemyBonus: 0.2, healthBonus: 0.1 },
            joinCost: 2000,
            specialFeatures: ['丹药炼制', '灵草培育']
        },
        {
            id: 'shadow_peak',
            name: '暗影峰',
            description: '神秘宗门，行踪诡秘',
            requirements: { realm: '筑基期', level: 1 },
            benefits: { adventureBonus: 0.15, luckBonus: 0.1 },
            joinCost: 5000,
            specialFeatures: ['暗影步', '刺杀术']
        },
        {
            id: 'heaven_union',
            name: '天道盟',
            description: '修仙界最大联盟',
            requirements: { realm: '金丹期', level: 1 },
            benefits: { allBonus: 0.1 },
            joinCost: 10000,
            specialFeatures: ['天道功法', '联盟支援']
        }
    ],

    // 宗门等级配置
    sectRanks: {
        '外门弟子': {
            level: 1,
            minContribution: 0,
            minRealm: '炼气期',
            taskBonus: 1.0,
            shopDiscount: 1.0,
            permissions: ['basic_tasks', 'basic_shop'],
            description: '宗门底层成员，需努力修炼'
        },
        '内门弟子': {
            level: 2,
            minContribution: 100,
            minRealm: '炼气期',
            taskBonus: 1.2,
            shopDiscount: 0.95,
            permissions: ['basic_tasks', 'basic_shop', 'intermediate_tasks'],
            description: '宗门中坚力量，享受部分优待'
        },
        '核心弟子': {
            level: 3,
            minContribution: 500,
            minRealm: '筑基期',
            taskBonus: 1.5,
            shopDiscount: 0.9,
            permissions: ['basic_tasks', 'basic_shop', 'intermediate_tasks', 'advanced_tasks'],
            description: '宗门精英，享有重要地位'
        },
        '长老': {
            level: 4,
            minContribution: 2000,
            minRealm: '金丹期',
            taskBonus: 2.0,
            shopDiscount: 0.8,
            permissions: ['basic_tasks', 'basic_shop', 'intermediate_tasks', 'advanced_tasks', 'elders_privileges'],
            description: '宗门长老，一言九鼎'
        },
        '宗主': {
            level: 5,
            minContribution: 5000,
            minRealm: '元婴期',
            taskBonus: 3.0,
            shopDiscount: 0.7,
            permissions: ['all'],
            description: '宗门之主，至高无上',
            special: true
        }
    },

    // 宗门任务配置（重新设计，与外部任务差异化）
    sectTasks: [
        {
            id: 'sect_patrol',
            name: '宗门巡逻',
            description: '巡视宗门周边区域，驱逐入侵者',
            duration: 15000,
            contributionReward: [15, 30],
            spiritStonesReward: [80, 150],
            experienceReward: [50, 100],
            requirements: {},
            specialReward: '可能获得宗门声望，偶尔发现宝物'
        },
        {
            id: 'sect_herb_gathering',
            name: '灵药采集',
            description: '为宗门采集稀有灵药，炼丹必备',
            duration: 20000,
            contributionReward: [25, 45],
            spiritStonesReward: [100, 200],
            experienceReward: [80, 150],
            requirements: { minLevel: 3 },
            specialReward: '有概率获得丹药奖励'
        },
        {
            id: 'sect_monster_hunt',
            name: '宗门除妖',
            description: '消灭威胁宗门的强大妖兽',
            duration: 30000,
            contributionReward: [40, 80],
            spiritStonesReward: [200, 400],
            experienceReward: [150, 300],
            requirements: { minLevel: 5 },
            specialReward: '可能获得妖兽材料，可炼制法宝'
        },
        {
            id: 'sect_mission',
            name: '宗门任务',
            description: '完成宗门指派的特殊任务',
            duration: 45000,
            contributionReward: [60, 120],
            spiritStonesReward: [300, 600],
            experienceReward: [250, 500],
            requirements: { minRealm: '筑基期' },
            specialReward: '表现优异可获得长老奖励'
        },
        {
            id: 'sect_research',
            name: '功法研究',
            description: '协助研究古老功法，提升修为',
            duration: 60000,
            contributionReward: [80, 150],
            spiritStonesReward: [400, 800],
            experienceReward: [400, 800],
            requirements: { minRealm: '金丹期' },
            specialReward: '可能领悟新的功法招式'
        },
        {
            id: 'sect_elite_guard',
            name: '精英护卫',
            description: '担任宗门重要人物护卫，责任重大',
            duration: 40000,
            contributionReward: [100, 200],
            spiritStonesReward: [600, 1200],
            experienceReward: [500, 1000],
            requirements: { minRealm: '元婴期' },
            specialReward: '可能获得法宝或特殊功法'
        }
    ],

    // 宗门商店配置
    sectShop: {
        skills: [
            {
                name: '引气诀',
                price: 500,
                currency: 'spiritStones',
                requirements: {}
            },
            {
                name: '长春功',
                price: 1000,
                currency: 'spiritStones',
                requirements: {}
            },
            {
                name: '金刚诀',
                price: 2000,
                currency: 'spiritStones',
                requirements: { minRealm: '筑基期' }
            },
            {
                name: '烈焰掌',
                price: 3000,
                currency: 'spiritStones',
                requirements: { minRealm: '筑基期' }
            },
            {
                name: '紫霞功',
                price: 5000,
                currency: 'contribution',
                requirements: { minRealm: '金丹期', sect: 'cloud_sword' }
            },
            {
                name: '天罡战气',
                price: 8000,
                currency: 'contribution',
                requirements: { minRealm: '金丹期', sect: 'cloud_sword' }
            },
            {
                name: '太上忘情录',
                price: 12000,
                currency: 'contribution',
                requirements: { minRealm: '元婴期' }
            },
            {
                name: '九转玄功',
                price: 20000,
                currency: 'contribution',
                requirements: { minRealm: '化神期' }
            }
        ],
        items: [
            {
                name: '聚气丹',
                price: 30,
                currency: 'spiritStones',
                requirements: {}
            },
            {
                name: '筑基丹',
                price: 400,
                currency: 'spiritStones',
                requirements: {}
            },
            {
                name: '洗髓丹',
                price: 800,
                currency: 'spiritStones',
                requirements: {}
            },
            {
                name: '悟性丹',
                price: 800,
                currency: 'spiritStones',
                requirements: {}
            },
            {
                name: '天劫符',
                price: 4000,
                currency: 'contribution',
                requirements: { minRealm: '筑基期' }
            },
            {
                name: '灵宠丹',
                price: 1000,
                currency: 'contribution',
                requirements: { minRealm: '金丹期' }
            },
            {
                name: '护身符',
                price: 200,
                currency: 'spiritStones',
                requirements: {},
                type: 'consumable',
                effect: 'tribulation_protection'
            }
        ]
    },

    // 法宝系统配置
    artifacts: {
        // 凡品法宝
        '铁剑': {
            id: 'iron_sword',
            name: '铁剑',
            grade: '凡品',
            type: 'weapon',
            level: 1,
            maxLevel: 5,
            baseStats: { attack: 5, defense: 0, cultivation: 0 },
            specialEffect: '无特殊效果',
            description: '普通的铁剑，勉强能用',
            requirements: { realm: '炼气期', level: 1 },
            dropSource: '山贼头目、普通妖兽',
            value: 50,
            price: 100
        },
        '青铜盾': {
            id: 'bronze_shield',
            name: '青铜盾',
            grade: '凡品',
            type: 'accessory',
            level: 1,
            maxLevel: 5,
            baseStats: { attack: 0, defense: 8, cultivation: 0 },
            specialEffect: '无特殊效果',
            description: '青铜制作的盾牌，提供基础防护',
            requirements: { realm: '炼气期', level: 1 },
            dropSource: '山贼头目、普通妖兽',
            value: 60,
            price: 120
        },

        // 灵品法宝
        '青霜剑': {
            id: 'frost_sword',
            name: '青霜剑',
            grade: '灵品',
            type: 'weapon',
            level: 1,
            maxLevel: 10,
            baseStats: { attack: 25, defense: 5, cultivation: 2 },
            specialEffect: '冰冻攻击：有10%概率冻结敌人1回合',
            description: '蕴含寒冰之力的飞剑，攻击附带冰冻效果',
            requirements: { realm: '筑基期', level: 1 },
            dropSource: '寒潭妖兽、秘境宝箱',
            value: 2000,
            price: 3000
        },
        '烈焰环': {
            id: 'flame_ring',
            name: '烈焰环',
            grade: '灵品',
            type: 'accessory',
            level: 1,
            maxLevel: 10,
            baseStats: { attack: 10, defense: 5, cultivation: 3 },
            specialEffect: '火焰护体：受到攻击时有15%概率反弹火焰伤害',
            description: '燃烧着火焰的法环，攻防一体',
            requirements: { realm: '筑基期', level: 3 },
            dropSource: '火山秘境、BOSS掉落',
            value: 2500,
            price: 4000
        },
        '聚灵珠': {
            id: 'spirit_gathering_pearl',
            name: '聚灵珠',
            grade: '灵品',
            type: 'accessory',
            level: 1,
            maxLevel: 8,
            baseStats: { attack: 0, defense: 0, cultivation: 10 },
            specialEffect: '聚灵效果：修炼速度+20%',
            description: '能够聚集天地灵气的宝珠，修炼必备',
            requirements: { realm: '炼气期', level: 5 },
            dropSource: '古修洞府、宗门商店',
            value: 3000,
            price: 5000
        },

        // 仙品法宝
        '青云剑': {
            id: 'cloud_sword',
            name: '青云剑',
            grade: '仙品',
            type: 'weapon',
            level: 1,
            maxLevel: 15,
            baseStats: { attack: 80, defense: 10, cultivation: 15 },
            specialEffect: '御剑飞行：移动速度+50%，攻击范围+2',
            description: '名震修仙界的仙剑，青云直上九万里',
            requirements: { realm: '金丹期', level: 1 },
            dropSource: '秘境BOSS、天劫奖励',
            value: 20000,
            price: 30000
        },
        '九天玄盾': {
            id: 'nine_heavens_shield',
            name: '九天玄盾',
            grade: '仙品',
            type: 'accessory',
            level: 1,
            maxLevel: 15,
            baseStats: { attack: 0, defense: 100, cultivation: 10 },
            specialEffect: '绝对防御：每场战斗前3回合免疫所有伤害',
            description: '九天玄铁所制，防御力惊人',
            requirements: { realm: '元婴期', level: 1 },
            dropSource: '上古遗迹、天劫奖励',
            value: 25000,
            price: 40000
        },
        '本命鼎炉': {
            id: 'life_furnace',
            name: '本命鼎炉',
            grade: '仙品',
            type: 'special',
            level: 1,
            maxLevel: 10,
            baseStats: { attack: 20, defense: 20, cultivation: 50 },
            specialEffect: '炼丹大师：炼丹成功率+30%，丹药效果+50%',
            description: '可以炼制顶级丹药的本命法宝',
            requirements: { realm: '金丹期', level: 5 },
            dropSource: '炼丹大师传承、宗门奖励',
            value: 30000,
            price: 50000
        },

        // 神品法宝
        '轩辕剑': {
            id: 'xuanyuan_sword',
            name: '轩辕剑',
            grade: '神器',
            type: 'weapon',
            level: 1,
            maxLevel: 20,
            baseStats: { attack: 200, defense: 30, cultivation: 50 },
            specialEffect: '剑意凌天：攻击力翻倍，无视50%防御',
            description: '传说中的神剑，蕴含圣道之力',
            requirements: { realm: '化神期', level: 1 },
            dropSource: '天劫考验、上古传承',
            value: 100000,
            price: 150000
        },
        '东皇钟': {
            id: 'east_emperor_bell',
            name: '东皇钟',
            grade: '神器',
            type: 'special',
            level: 1,
            maxLevel: 15,
            baseStats: { attack: 50, defense: 150, cultivation: 100 },
            specialEffect: '镇压诸天：每回合对敌方造成最大生命值10%伤害',
            description: '能够镇压万物的钟，防御力无双',
            requirements: { realm: '合体期', level: 1 },
            dropSource: '天劫考验、秘境终极宝藏',
            value: 150000,
            price: 200000
        },

        // 圣品法宝
        '昊天塔': {
            id: 'haotian_tower',
            name: '昊天塔',
            grade: '圣品',
            type: 'special',
            level: 1,
            maxLevel: 25,
            baseStats: { attack: 100, defense: 200, cultivation: 200 },
            specialEffect: '圣道镇压：封印敌方所有技能3回合，属性降低30%',
            description: '镇压鸿蒙的至宝，蕴含圣道法则',
            requirements: { realm: '渡劫期', level: 1 },
            dropSource: '飞升考验、天道机缘',
            value: 500000,
            price: 1000000
        },

        // 法宝材料
        '玄铁': {
            id: 'black_iron',
            name: '玄铁',
            type: 'material',
            description: '炼制法宝的材料',
            value: 100
        },
        '千年寒冰': {
            id: 'millennium_ice',
            name: '千年寒冰',
            type: 'material',
            description: '蕴含寒气的千年冰块',
            value: 200
        },
        '地心之火': {
            id: 'earth_core_fire',
            name: '地心之火',
            type: 'material',
            description: '地底深处的火焰',
            value: 300
        },
        '星辰砂': {
            id: 'star_sand',
            name: '星辰砂',
            type: 'material',
            description: '蕴含星辰之力的砂粒',
            value: 500
        }
    },

    // 法宝强化配置
    artifactEnhancement: {
        successRates: {
            '凡品': { base: 0.9, decrease: 0.05 },
            '灵品': { base: 0.7, decrease: 0.08 },
            '仙品': { base: 0.5, decrease: 0.1 },
            '神器': { base: 0.3, decrease: 0.12 },
            '圣品': { base: 0.15, decrease: 0.15 }
        },
        costs: {
            '凡品': { base: 100, multiplier: 1.5 },
            '灵品': { base: 500, multiplier: 2.0 },
            '仙品': { base: 2000, multiplier: 2.5 },
            '神器': { base: 10000, multiplier: 3.0 },
            '圣品': { base: 50000, multiplier: 3.5 }
        },
        materials: {
            '凡品': { base: 1, multiplier: 1 },
            '灵品': { base: 3, multiplier: 1 },
            '仙品': { base: 10, multiplier: 1 },
            '神器': { base: 30, multiplier: 1 },
            '圣品': { base: 100, multiplier: 1 }
        }
    },

    // 段位成就系统
    realmAchievements: {
        '炼气期': {
            id: 'qi_refining_master',
            name: '炼气大师',
            description: '炼气期九层圆满',
            requirements: { realm: '炼气期', level: 9 },
            rewards: {
                good: { chance: 0.7, items: ['筑基丹'], cultivation: 500, message: '恭喜！你掌握了炼气的精髓，获得筑基丹和500修为！' },
                bad: { chance: 0.3, items: [], cultivation: -200, message: '炼气虽成，但根基不稳，损失200修为。' }
            }
        },
        '筑基期': {
            id: 'foundation_master',
            name: '筑基大成',
            description: '筑基期九层圆满',
            requirements: { realm: '筑基期', level: 9 },
            rewards: {
                good: { chance: 0.6, items: ['洗髓丹', '筑基丹'], cultivation: 1000, message: '筑基大成！获得洗髓丹、筑基丹和1000修为！' },
                bad: { chance: 0.4, items: [], cultivation: -500, message: '筑基未稳，遭遇瓶颈，损失500修为。' }
            }
        },
        '金丹期': {
            id: 'golden_core_master',
            name: '金丹圆满',
            description: '金丹期九层圆满',
            requirements: { realm: '金丹期', level: 9 },
            rewards: {
                good: { chance: 0.5, items: ['悟性丹', '天劫符'], cultivation: 2000, message: '金丹圆满！获得悟性丹、天劫符和2000修为！' },
                bad: { chance: 0.5, items: [], cultivation: -1000, message: '金丹受损，需要重新修炼，损失1000修为。' }
            }
        },
        '元婴期': {
            id: 'nascent_master',
            name: '元婴大成',
            description: '元婴期九层圆满',
            requirements: { realm: '元婴期', level: 9 },
            rewards: {
                good: { chance: 0.4, items: ['洗髓丹', '悟性丹'], cultivation: 5000, message: '元婴大成！获得洗髓丹、悟性丹和5000修为！' },
                bad: { chance: 0.6, items: [], cultivation: -2000, message: '元婴受损，损失2000修为。' }
            }
        },
        '化神期': {
            id: 'transformation_master',
            name: '化神圆满',
            description: '化神期九层圆满',
            requirements: { realm: '化神期', level: 9 },
            rewards: {
                good: { chance: 0.3, items: ['天劫符'], cultivation: 10000, message: '化神圆满！获得天劫符和10000修为！' },
                bad: { chance: 0.7, items: [], cultivation: -5000, message: '化神失败，损失5000修为。' }
            }
        }
    },

    // 天劫系统配置
    heavenlyTribulations: {
        '筑基期': {
            type: 'minor_tribulation',
            name: '筑基小天劫',
            description: '筑基之时，天地不纳，降下小天劫考验',
            types: ['雷劫', '火劫'],
            difficulty: 1,
            baseSuccessRate: 0.7,
            waves: 3,
            preparation: {
                canUseItems: true,
                canInviteHelpers: true,
                maxHelpers: 1
            },
            failurePenalty: {
                cultivationLoss: 0.3,
                possibilityOfInjury: 0.2
            }
        },
        '金丹期': {
            type: 'major_tribulation',
            name: '金丹大天劫',
            description: '结丹之时，九九天劫，生死考验',
            types: ['雷劫', '火劫', '风劫', '心魔劫'],
            difficulty: 2,
            baseSuccessRate: 0.5,
            waves: 6,
            preparation: {
                canUseItems: true,
                canInviteHelpers: true,
                maxHelpers: 2
            },
            failurePenalty: {
                cultivationLoss: 0.5,
                possibilityOfInjury: 0.4,
                possibilityOfRealmDrop: 0.1
            }
        },
        '元婴期': {
            type: 'nascent_tribulation',
            name: '元婴天劫',
            description: '成婴之时，天地同悲，万劫考验',
            types: ['九霄雷劫', '红莲业火', '罡风劫', '心魔幻境', '生死大劫'],
            difficulty: 3,
            baseSuccessRate: 0.3,
            waves: 9,
            preparation: {
                canUseItems: true,
                canInviteHelpers: true,
                maxHelpers: 3
            },
            failurePenalty: {
                cultivationLoss: 0.7,
                possibilityOfInjury: 0.6,
                possibilityOfRealmDrop: 0.3
            }
        },
        '化神期': {
            type: 'transformation_tribulation',
            name: '化神天劫',
            description: '化神之时，天道不容，轮回之劫',
            types: ['灭世雷劫', '虚无之火', '时空风暴', '因果纠缠', '六道轮回', '生死无常'],
            difficulty: 4,
            baseSuccessRate: 0.15,
            waves: 12,
            preparation: {
                canUseItems: true,
                canInviteHelpers: true,
                maxHelpers: 5
            },
            failurePenalty: {
                cultivationLoss: 0.9,
                possibilityOfInjury: 0.8,
                possibilityOfRealmDrop: 0.5,
                possibilityOfDeath: 0.1
            }
        }
    }
};

// ==================== ASCII 艺术 ====================
const ASCII_ART = {
    cultivator: `
    ▲
   ╱╲
  ╱ ╱
  ╱ ╱
   ╳╳
  ╱ ╱
   ╱
  ▼
    `,

    // 不同境界的修炼姿态
    realmCultivators: {
        '炼气期': `
        ▲
       ╱╲
      ╱ ╱
     ╱ ╱
      ╳╳
     ╱ ╱
     ╱
    ▼
        `,
        '筑基期': `
       ◢◣
      ╱╲
     ╱ ╱
     ╳╳
    ╱ ╱
     ╱
    ▼
        `,
        '金丹期': `
        ●
       ╱╲
      ╱ ╱
     ╳╳
    ╱ ╱
     ╱
    ▼
        `,
        '元婴期': `
        ★
       ╱╲
      ╱ ╱
     ╳╳
    ╱ ╱
     ╱
    ▼
        `,
        'default': `
        ☯
       ╱╲
      ╱ ╱
     ╳╳
    ╱ ╱
     ╱
    ▼
        `
    },

    adventurer: `
   →→
  ╱╲
 ╱ ╱
 ╳╳
╱ ╱
 ╱
▼
    `,

    // ==================== NPC配置 ====================
    npcs: {
        'sect_elder': {
            id: 'sect_elder',
            name: '宗门长老',
            title: '青云宗长老',
            description: '负责管理宗门事务的威严长者',
            avatar: '👴',
            location: 'sect',
            requirements: { sect: 'qingyun_sect', sectRank: '外门弟子' },
            dialogs: {
                'greeting': {
                    text: '年轻人，看你骨骼精奇，是个修仙的好苗子。在宗门好好修炼，莫要辜负了你的天赋。',
                    options: [
                        { text: '请长老指点', next: 'teachings' },
                        { text: '我想了解更多关于宗门', next: 'about_sect' },
                        { text: '告辞', next: null }
                    ]
                },
                'teachings': {
                    text: '修仙之路，贵在坚持。炼气期打好基础，筑基期稳固根基，金丹期凝结元婴，方能踏上大道。',
                    options: [
                        { text: '受教了', next: null },
                        { text: '还有其他建议吗？', next: 'advice' }
                    ]
                },
                'advice': {
                    text: '多历练、多参悟。切勿急功近利，否则容易走火入魔。另外，与宗门同仁搞好关系，对你的修行大有裨益。',
                    options: [
                        { text: '明白了', next: null }
                    ]
                },
                'about_sect': {
                    text: '我青云宗乃是方圆千里内的大宗，历史悠久，强者如云。只要你努力修炼，提升声望，宗门自会给你更多资源。',
                    options: [
                        { text: '我会努力的', next: null }
                    ]
                }
            },
            actions: [
                { type: 'give_gift', description: '赠送礼物（提升好感度）' },
                { type: 'request_guidance', description: '请求指点（提升修炼速度）' },
                { type: 'sect_mission', description: '领取宗门任务' }
            ],
            gifts: {
                '聚气丹': { affection: 5 },
                '筑基丹': { affection: 20 },
                '灵石': { affection: 0.01 } // 每个灵石+0.01好感度
            }
        },
        'mysterious_taoist': {
            id: 'mysterious_taoist',
            name: '神秘道人',
            title: '云游四方的修仙者',
            description: '一身灰袍，来去无踪，似乎知道许多秘密',
            avatar: '🧙',
            location: 'adventure',
            requirements: { realm: '炼气期', level: 5 },
            dialogs: {
                'greeting': {
                    text: '呵呵，年轻人，你我相遇即是缘分。看你气息不凡，想必不是池中之物。',
                    options: [
                        { text: '前辈过奖了', next: 'humble' },
                        { text: '您是何人？', next: 'identity' },
                        { text: '告辞', next: null }
                    ]
                },
                'humble': {
                    text: '不必过谦。修仙界实力为尊，只要你足够强大，就有资格骄傲。',
                    options: [
                        { text: '请教前辈修行之法', next: 'teach_secret' }
                    ]
                },
                'identity': {
                    text: '我不过是一介闲云野鹤，云游四海罢了。倒是有些秘闻，不知你是否有兴趣听闻？',
                    options: [
                        { text: '愿闻其详', next: 'secret_rumor' },
                        { text: '以后再说', next: null }
                    ]
                },
                'teach_secret': {
                    text: '修行无捷径，唯有坚持二字。不过...若你能在历练中遇到机缘，或许能得偿所愿。',
                    options: [
                        { text: '多谢前辈指点', next: null, effect: { type: 'buff', value: 'cultivation', duration: 300000 } }
                    ]
                },
                'secret_rumor': {
                    text: '听说...在东边深山之中，有一处古修洞府，藏有上古宝物。但那里也是妖兽聚集之地，凶险异常。',
                    options: [
                        { text: '多谢前辈告知', next: null, effect: { type: 'unlock_location', value: 'ancient_cave' } }
                    ]
                }
            },
            actions: [
                { type: 'give_gift', description: '赠送礼物' },
                { type: 'buy_info', description: '购买情报（需灵石）' }
            ],
            gifts: {
                '灵石': { affection: 0.02 },
                '洗髓丹': { affection: 15 }
            }
        },
        'merchant': {
            id: 'merchant',
            name: '坊市商人',
            title: '万宝楼掌柜',
            description: '精明的商人，似乎什么都能买到',
            avatar: '🧔',
            location: 'market',
            requirements: { spiritStones: 100 },
            dialogs: {
                'greeting': {
                    text: '客官，欢迎光临万宝楼！本店丹药、法宝、功法应有尽有，您想看点什么？',
                    options: [
                        { text: '看看有什么好东西', next: 'show_items' },
                        { text: '打听行情', next: 'market_info' },
                        { text: '只是路过', next: null }
                    ]
                },
                'show_items': {
                    text: '今日新到了一批聚气丹，效果不俗。另外还有几件不错的法宝，您有需要吗？',
                    options: [
                        { text: '购买聚气丹', action: 'buy_item', item: '聚气丹' },
                        { text: '下次再来', next: null }
                    ]
                },
                'market_info': {
                    text: '最近坊市里灵石行情看涨，听闻大宗门都在收购灵石储备物资。若是手头宽裕，多囤些丹药总是没错的。',
                    options: [
                        { text: '多谢告知', next: null }
                    ]
                }
            },
            actions: [
                { type: 'trade', description: '交易物品' },
                { type: 'give_gift', description: '赠送礼物' }
            ],
            gifts: {
                '灵石': { affection: 0.05 },
                '稀有物品': { affection: 10 }
            }
        }
    },

    // ==================== 剧情任务配置 ====================
    storyQuests: {
        // 第一章：初入仙途
        'chapter1_start': {
            id: 'chapter1_start',
            chapter: 1,
            name: '初入仙途',
            description: '刚踏入修仙界的你，需要了解这个世界的规则',
            type: 'main',
            requirements: { realm: '炼气期', level: 1 },
            stages: [
                {
                    id: 'stage1',
                    name: '初次修炼',
                    description: '尝试修炼，感受灵气在体内流动',
                    objective: { type: 'cultivate', target: 100 },
                    rewards: [
                        { type: 'spirit_stones', value: 50 },
                        { type: 'item', value: '聚气丹', quantity: 2 }
                    ],
                    onComplete: {
                        message: '你成功感受到了灵气的存在！这感觉真是奇妙。',
                        unlocks: ['chapter1_stage2']
                    }
                },
                {
                    id: 'stage2',
                    name: '突破一层',
                    description: '将修为提升到突破的临界点',
                    objective: { type: 'breakthrough', target: 2 },
                    rewards: [
                        { type: 'spirit_stones', value: 100 },
                        { type: 'cultivation', value: 50 }
                    ],
                    onComplete: {
                        message: '成功突破到炼气期二层！你的修为有了明显提升。',
                        unlocks: ['chapter1_stage3']
                    }
                },
                {
                    id: 'stage3',
                    name: '第一次历练',
                    description: '离开安全区，去外面的世界看看',
                    objective: { type: 'adventure', target: 1 },
                    rewards: [
                        { type: 'item', value: '洗髓丹' },
                        { type: 'spirit_stones', value: 150 }
                    ],
                    onComplete: {
                        message: '历练归来，你对外面的世界有了更多了解。',
                        unlocks: ['chapter1_stage4'],
                        setFlag: { flag: 'completed_first_adventure', value: true }
                    }
                },
                {
                    id: 'stage4',
                    name: '选择宗门',
                    description: '是时候决定你的归属了',
                    objective: { type: 'join_sect', target: 1 },
                    rewards: [
                        { type: 'spirit_stones', value: 200 },
                        { type: 'item', value: '筑基丹', quantity: 1 }
                    ],
                    onComplete: {
                        message: '恭喜！你已成为宗门一员，修仙之路正式开启！',
                        unlocks: ['chapter2_start'],
                        nextChapter: 2
                    }
                }
            ]
        },

        // 第二章：宗门生涯
        'chapter2_start': {
            id: 'chapter2_start',
            chapter: 2,
            name: '宗门生涯',
            description: '在宗门中努力修炼，争取早日筑基',
            type: 'main',
            requirements: { sect: 'any', realm: '炼气期', level: 3 },
            stages: [
                {
                    id: 'stage1',
                    name: '宗门贡献',
                    description: '为宗门做出贡献，提升声望',
                    objective: { type: 'sect_contribution', target: 100 },
                    rewards: [
                        { type: 'sect_contribution', value: 50 },
                        { type: 'spirit_stones', value: 200 }
                    ],
                    onComplete: {
                        message: '你在宗门的地位有所提升。',
                        unlocks: ['chapter2_stage2']
                    }
                },
                {
                    id: 'stage2',
                    name: '内门考核',
                    description: '通过内门弟子考核',
                    objective: { type: 'sect_rank', target: '内门弟子' },
                    rewards: [
                        { type: 'skill', value: '基础剑法' },
                        { type: 'item', value: '筑基丹', quantity: 2 }
                    ],
                    onComplete: {
                        message: '成为内门弟子！你可以学习更高深的功法了。',
                        unlocks: ['chapter2_stage3']
                    }
                },
                {
                    id: 'stage3',
                    name: '筑基准备',
                    description: '收集筑基所需的资源',
                    objective: { type: 'collect_items', items: { '筑基丹': 1 } },
                    rewards: [
                        { type: 'item', value: '天劫符' },
                        { type: 'cultivation', value: 200 }
                    ],
                    onComplete: {
                        message: '筑基的准备已经完成，只待时机成熟！',
                        unlocks: ['chapter2_stage4']
                    }
                },
                {
                    id: 'stage4',
                    name: '筑基天劫',
                    description: '渡过筑基天劫，进入筑基期',
                    objective: { type: 'tribulation', target: '筑基期' },
                    rewards: [
                        { type: 'artifact', value: '青霜剑' },
                        { type: 'spirit_stones', value: 1000 }
                    ],
                    onComplete: {
                        message: '恭喜！你成功筑基，踏入修仙界的更高层次！',
                        unlocks: ['chapter3_start'],
                        nextChapter: 3
                    }
                }
            ]
        },

        // 支线任务：身世之谜
        'side_mystery': {
            id: 'side_mystery',
            chapter: 0,
            name: '身世之谜',
            description: '探索你的身世，寻找真相',
            type: 'side',
            requirements: { realm: '炼气期', level: 5, flag: 'completed_first_adventure' },
            stages: [
                {
                    id: 'stage1',
                    name: '神秘信物',
                    description: '检查随身物品，发现一个古老的玉佩',
                    objective: { type: 'check_inventory', trigger: 0.3 }, // 30%概率在历练时触发
                    rewards: [
                        { type: 'item', value: '神秘玉佩' }
                    ],
                    onComplete: {
                        message: '你在一次历练中发现了自己随身携带的神秘玉佩，上面刻着奇异的符文。',
                        unlocks: ['side_mystery_stage2'],
                        setFlag: { flag: 'found_mysterious_jade', value: true }
                    }
                },
                {
                    id: 'stage2',
                    name: '寻找线索',
                    description: '询问NPC关于玉佩的信息',
                    objective: { type: 'npc_dialog', npc: 'mysterious_taoist', dialog: 'jade_inquiry' },
                    rewards: [
                        { type: 'cultivation', value: 100 },
                        { type: 'info', value: '玉佩来自上古修仙家族' }
                    ],
                    onComplete: {
                        message: '神秘道人告诉你，这玉佩来自一个早已消失的上古修仙家族。',
                        unlocks: ['side_mystery_stage3']
                    }
                },
                {
                    id: 'stage3',
                    name: '探索遗迹',
                    description: '前往玉佩指示的地点',
                    objective: { type: 'explore_realm', realm: 'ancient_ruins' },
                    rewards: [
                        { type: 'item', value: '家族传承功法' },
                        { type: 'spirit_stones', value: 500 }
                    ],
                    onComplete: {
                        message: '在遗迹中，你发现了家族的传承功法！原来你是上古修仙家族的后裔！',
                        setFlag: { flag: 'discovered_heritage', value: true }
                    }
                }
            ]
        },

        // 支线任务：宗门荣耀
        'side_sect_glory': {
            id: 'side_sect_glory',
            chapter: 0,
            name: '宗门荣耀',
            description: '为宗门争光，提升宗门声望',
            type: 'side',
            requirements: { sect: 'any', realm: '筑基期' },
            stages: [
                {
                    id: 'stage1',
                    name: '宗门大比',
                    description: '参加宗门大比，展示实力',
                    objective: { type: 'defeat_monsters', count: 10, minRealm: '筑基期' },
                    rewards: [
                        { type: 'sect_reputation', value: 50 },
                        { type: 'spirit_stones', value: 300 }
                    ],
                    onComplete: {
                        message: '你在宗门大比中表现出色，为宗门赢得了荣誉！',
                        unlocks: ['side_sect_glory_stage2']
                    }
                },
                {
                    id: 'stage2',
                    name: '宗门战争',
                    description: '参与宗门战争，击退敌对宗门',
                    objective: { type: 'sect_war', victory: true },
                    rewards: [
                        { type: 'sect_reputation', value: 100 },
                        { type: 'artifact', value: '宗门令牌' }
                    ],
                    onComplete: {
                        message: '你成功击退敌对宗门，成为宗门的英雄！',
                        setFlag: { flag: 'sect_hero', value: true }
                    }
                }
            ]
        }
    }
};

// ==================== 游戏状态 ====================
class GameState {
    constructor(characterData = null) {
        // 存档槽位
        this.saveSlot = characterData?.saveSlot || 1;

        // 角色基本信息
        if (characterData) {
            this.playerName = characterData.playerName || characterData.name;
            this.daoName = characterData.daoName;
            this.background = characterData.background;
            this.talents = characterData.talents;
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
        this.isExploring = characterData?.isExploring || false; // 秘境探索状态
        this.adventureEndTime = characterData?.adventureEndTime || 0;
        this.workEndTime = characterData?.workEndTime || 0;
        this.explorationEndTime = characterData?.explorationEndTime || 0; // 秘境探索结束时间
        this.currentAdventure = characterData?.currentAdventure || null;
        this.currentJob = characterData?.currentJob || null;
        this.currentExploration = characterData?.currentExploration || null; // 当前探索的秘境

        // 永久加成
        this.permanentBoost = characterData?.permanentBoost || 0;

        // 宗门信息
        this.sect = characterData?.sect || 'none';
        this.sectContribution = characterData?.sectContribution || 0;
        this.sectRank = characterData?.sectRank || '外门弟子'; // 宗门等级
        this.sectReputation = characterData?.sectReputation || 0; // 宗门声望

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
        this.artifacts = characterData?.artifacts || []; // 拥有的法宝列表
        this.equippedArtifacts = characterData?.equippedArtifacts || {
            weapon: null,
            armor: null,
            accessory: null,
            special: null
        };

        // 战斗技能
        this.combatSkills = characterData?.combatSkills || {}; // 学会的战斗技能
        this.activeCombatSkill = null; // 当前激活的战斗技能
        this.combatSkillCooldowns = characterData?.combatSkillCooldowns || {}; // 技能冷却时间

        // NPC系统
        this.npcAffection = characterData?.npcAffection || {}; // NPC好感度 {npcId: value}
        this.npcHistory = characterData?.npcHistory || {}; // NPC对话历史 {npcId: [dialogIds]}
        this.unlockedNPCs = characterData?.unlockedNPCs || ['mysterious_taoist', 'merchant']; // 已解锁的NPC列表

        // 剧情任务系统
        this.questProgress = characterData?.questProgress || {}; // 任务进度 {questId: progress}
        this.completedQuests = characterData?.completedQuests || []; // 已完成任务列表
        this.currentChapter = characterData?.currentChapter || 1; // 当前章节（1-9）
        this.storyFlags = characterData?.storyFlags || {}; // 剧情标记 {flag: value}

        // 成就
        this.achievements = characterData?.achievements || [];
        this.logs = characterData?.logs || [];

        // Buff状态
        this.buffs = characterData?.buffs || {
            cultivation: { multiplier: 1.0, endTime: 0 },
            breakthrough: { bonus: 0.0, endTime: 0 },
            luck: null
        };

        // 时间相关
        this.lastSaveTime = characterData?.lastSaveTime || Date.now();
        this.totalPlayTime = characterData?.totalPlayTime || 0;

        // 只在创建新角色时应用出身加成（不处理从存档加载的情况）
        if (!characterData || !characterData.playerName) {
            this.applyBackgroundBonus();
            // 新角色自动学习第一个战斗技能
            this.learnInitialCombatSkill();
            // 新角色获得初始法宝
            this.giveInitialArtifact();
        }
    }

    generateDaoName() {
        const surnames = ['云', '风', '雨', '雷', '电', '天', '地', '玄', '黄', '宇', '宙', '洪', '荒'];
        const names = ['虚', '空', '无', '极', '道', '仙', '神', '魔', '佛', '圣', '尊', '祖'];
        const titles = ['子', '真人', '散人', '居士', '道人', '上人', '尊者'];

        const surname = surnames[Math.floor(Math.random() * surnames.length)];
        const name = names[Math.floor(Math.random() * names.length)];
        const title = Math.random() < 0.3 ? titles[Math.floor(Math.random() * titles.length)] : '';

        return surname + name + title;
    }

    applyBackgroundBonus() {
        const bgConfig = CONFIG.backgrounds[this.background];
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
        if (bonus.attack) {
            // 暂时存储攻击加成，战斗时应用
        }
        if (bonus.defense) {
            // 暂时存储防御加成，战斗时应用
        }
    }

    // 新角色学习初始战斗技能
    learnInitialCombatSkill() {
        // 自动学习剑气术（第一个技能，无要求）
        const initialSkillId = 'sword_qi';
        const result = this.learnCombatSkill(initialSkillId);
        if (result.success) {
            this.activeCombatSkill = initialSkillId;
            console.log('自动学会初始战斗技能:', result.message);
        }
    }

    // 新角色获得初始法宝
    giveInitialArtifact() {
        // 给新角色一个铁剑作为初始武器
        const initialArtifact = CONFIG.artifacts['铁剑'];
        if (initialArtifact) {
            const newArtifact = {
                id: initialArtifact.id,
                name: initialArtifact.name,
                grade: initialArtifact.grade,
                type: initialArtifact.type,
                level: initialArtifact.level,
                maxLevel: initialArtifact.maxLevel,
                baseStats: { ...initialArtifact.baseStats },
                specialEffect: initialArtifact.specialEffect,
                description: initialArtifact.description,
                requirements: { ...initialArtifact.requirements }
            };
            this.artifacts.push(newArtifact);
            console.log('获得初始法宝:', newArtifact.name);
        }
    }

    // 检查并学习新的战斗技能
    checkAndLearnCombatSkills() {
        for (const [skillId, skill] of Object.entries(CONFIG.combatSkills)) {
            // 跳过已学会的技能
            if (this.combatSkills[skillId] && this.combatSkills[skillId].learned) {
                continue;
            }

            // 检查是否满足技能要求
            if (skill.requirements.realm) {
                const realmNames = Object.keys(CONFIG.realms);
                const currentRealmIndex = realmNames.indexOf(this.realm);
                const requiredRealmIndex = realmNames.indexOf(skill.requirements.realm);

                if (currentRealmIndex >= requiredRealmIndex) {
                    if (currentRealmIndex === requiredRealmIndex && this.level < skill.requirements.level) {
                        continue; // 同境界但层级不够
                    }

                    // 满足条件，自动学习
                    const result = this.learnCombatSkill(skillId);
                    if (result.success) {
                        this.addLog(`突破境界，领悟了${skill.name}！`, 'rare');
                    }
                }
            }
        }
    }

    // ==================== NPC系统 ====================

    // 获取可用的NPC列表
    getAvailableNPCs() {
        const available = [];
        for (const npcId of this.unlockedNPCs) {
            const npc = CONFIG.npcs[npcId];
            if (!npc) continue;

            // 检查NPC要求
            let canAccess = true;
            if (npc.requirements) {
                if (npc.requirements.sect && this.sect !== npc.requirements.sect) {
                    canAccess = false;
                }
                if (npc.requirements.sectRank) {
                    const rankOrder = ['外门弟子', '内门弟子', '核心弟子', '真传弟子', '长老'];
                    const playerRankIndex = rankOrder.indexOf(this.sectRank);
                    const requiredRankIndex = rankOrder.indexOf(npc.requirements.sectRank);
                    if (playerRankIndex < requiredRankIndex) {
                        canAccess = false;
                    }
                }
                if (npc.requirements.realm) {
                    const realmNames = Object.keys(CONFIG.realms);
                    const currentRealmIndex = realmNames.indexOf(this.realm);
                    const requiredRealmIndex = realmNames.indexOf(npc.requirements.realm);
                    if (currentRealmIndex < requiredRealmIndex) {
                        canAccess = false;
                    }
                }
                if (npc.requirements.spiritStones && this.spiritStones < npc.requirements.spiritStones) {
                    canAccess = false;
                }
            }

            if (canAccess) {
                available.push(npc);
            }
        }
        return available;
    }

    // 获取NPC好感度
    getNPCAffection(npcId) {
        return this.npcAffection[npcId] || 0;
    }

    // 增加NPC好感度
    addNPCAffection(npcId, amount) {
        if (!this.npcAffection[npcId]) {
            this.npcAffection[npcId] = 0;
        }
        this.npcAffection[npcId] += amount;

        // 好感度等级
        const oldLevel = this.getAffectionLevel(this.npcAffection[npcId] - amount);
        const newLevel = this.getAffectionLevel(this.npcAffection[npcId]);

        if (newLevel > oldLevel) {
            const npc = CONFIG.npcs[npcId];
            this.addLog(`${npc.name}对你的好感度提升了！达到${newLevel}`, 'rare');
        }

        return this.npcAffection[npcId];
    }

    // 获取好感度等级
    getAffectionLevel(affection) {
        if (affection >= 100) return '知己';
        if (affection >= 50) return '好友';
        if (affection >= 20) return '熟悉';
        if (affection >= 5) return '认识';
        return '陌生人';
    }

    // 记录对话历史
    recordNPCDialog(npcId, dialogId) {
        if (!this.npcHistory[npcId]) {
            this.npcHistory[npcId] = [];
        }
        if (!this.npcHistory[npcId].includes(dialogId)) {
            this.npcHistory[npcId].push(dialogId);
        }
    }

    // 检查是否已完成某个对话
    hasCompletedDialog(npcId, dialogId) {
        return this.npcHistory[npcId]?.includes(dialogId) || false;
    }

    // 解锁NPC
    unlockNPC(npcId) {
        if (!this.unlockedNPCs.includes(npcId)) {
            this.unlockedNPCs.push(npcId);
            const npc = CONFIG.npcs[npcId];
            if (npc) {
                this.addLog(`发现了新人物：${npc.name}！`, 'rare');
            }
        }
    }

    // 赠送礼物给NPC
    giveGiftToNPC(npcId, itemName, amount = 1) {
        const npc = CONFIG.npcs[npcId];
        if (!npc) {
            return { success: false, message: 'NPC不存在' };
        }

        if (!npc.gifts || !npc.gifts[itemName]) {
            return { success: false, message: `${npc.name}不接受这个礼物` };
        }

        // 检查物品数量
        if ((this.inventory[itemName] || 0) < amount) {
            return { success: false, message: `物品不足` };
        }

        // 消耗物品
        this.inventory[itemName] -= amount;
        if (this.inventory[itemName] <= 0) {
            delete this.inventory[itemName];
        }

        // 增加好感度
        const affectionGain = npc.gifts[itemName].affection * amount;
        const newAffection = this.addNPCAffection(npcId, affectionGain);

        return {
            success: true,
            message: `你送给${npc.name}${amount}个${itemName}，好感度+${affectionGain.toFixed(1)}`,
            newAffection: newAffection
        };
    }

    // 计算当前层级的修炼需求
    calculateCultivationRequirement() {
        const realmConfig = CONFIG.realms[this.realm];
        const levelIndex = this.level - 1;

        let requirement = realmConfig.baseRequirement;
        requirement *= Math.pow(realmConfig.growthMultiplier, levelIndex);

        // 根骨影响修为需求
        requirement *= (1 - this.talents.potential * 0.02);

        return Math.floor(requirement);
    }

    // 计算基础修炼速度
    calculateBaseCultivationRate() {
        const realmConfig = CONFIG.realms[this.realm];
        let rate = realmConfig.baseCultivationRate;

        // 功法加成
        if (this.currentSkill && this.skills[this.currentSkill]) {
            const skill = CONFIG.skills[this.currentSkill];
            if (skill.effect === 'cultivation_speed') {
                rate *= (1 + skill.value * this.skills[this.currentSkill].level);
            }
        }

        // 宠物加成
        if (this.currentPet) {
            const pet = CONFIG.pets[this.currentPet];
            if (pet.effect === 'cultivation_boost') {
                rate *= (1 + pet.value * this.pets[this.currentPet].level * 0.1);
            }
        }

        // 法宝加成
        for (const [slot, artifact] of Object.entries(this.equippedArtifacts)) {
            if (artifact) {
                const stats = this.calculateArtifactStats(artifact);
                rate *= (1 + stats.cultivation * 0.01); // 法宝修炼加成
            }
        }

        // 宗门加成
        if (this.sect !== 'none') {
            const sect = CONFIG.sects.find(s => s.id === this.sect);
            if (sect && sect.benefits.cultivationBonus) {
                rate *= (1 + sect.benefits.cultivationBonus);
            }
        }

        // 悟性影响修炼速度
        rate *= (1 + this.talents.wisdom * 0.05);

        return rate;
    }

    // 计算实际修炼速度
    calculateActualCultivationRate() {
        const base = this.calculateBaseCultivationRate();
        const buffMultiplier = this.buffs.cultivation.multiplier;

        // 随时间有小幅波动
        const timeFactor = 0.8 + Math.random() * 0.4;

        // 幸运影响修炼波动
        let luckFactor = this.talents.luck * 0.01;
        if (this.buffs.luck) {
            luckFactor += this.buffs.luck.value * 0.02;
        }

        const finalFactor = timeFactor + luckFactor;

        return base * buffMultiplier * finalFactor;
    }

    // 计算境界压制
    calculateRealmSuppression(targetRealm, targetLevel) {
        const realmNames = Object.keys(CONFIG.realms);
        const playerRealmIndex = realmNames.indexOf(this.realm);
        const targetRealmIndex = realmNames.indexOf(targetRealm);

        // 同境界，计算层级压制
        if (playerRealmIndex === targetRealmIndex) {
            const levelDiff = this.level - targetLevel;
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

    // 计算战斗属性（完善版）
    calculateCombatStats() {
        const realmConfig = CONFIG.realms[this.realm];
        let attack = realmConfig.baseAttack;
        let defense = realmConfig.baseDefense;
        let health = realmConfig.baseHealth;

        // 根骨影响生命值和防御
        health *= (1 + this.talents.potential * 0.1);
        defense *= (1 + this.talents.potential * 0.05);

        // 悟性影响攻击
        attack *= (1 + this.talents.wisdom * 0.05);

        // 幸运影响暴击（通过计算战斗时体现）
        let luckBonus = this.talents.luck * 0.02;
        if (this.buffs.luck) {
            luckBonus += this.buffs.luck.value * 0.02;
        }

        // 功法加成
        if (this.currentSkill && this.skills[this.currentSkill]) {
            const skill = CONFIG.skills[this.currentSkill];
            const skillLevel = this.skills[this.currentSkill].level;

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
        if (this.currentPet && this.pets[this.currentPet]) {
            const pet = CONFIG.pets[this.currentPet];
            const petLevel = this.pets[this.currentPet].level;

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
        for (const [slot, artifact] of Object.entries(this.equippedArtifacts)) {
            if (artifact) {
                const stats = this.calculateArtifactStats(artifact);
                attack += stats.attack;
                defense += stats.defense;

                // 法宝修炼加成直接加到基础修炼速度
                // (在calculateActualCultivationRate中应用)
            }
        }

        // 宗门加成
        if (this.sect !== 'none') {
            const sect = CONFIG.sects.find(s => s.id === this.sect);
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

    // 计算突破成功率
    calculateBreakthroughChance() {
        const realmConfig = CONFIG.realms[this.realm];
        let chance = realmConfig.breakthroughBaseChance;

        // 每层成功率递减
        const levelPenalty = Math.log(this.level + 1) * 0.1;
        chance -= levelPenalty;

        // 悟性影响突破成功率
        chance += this.talents.wisdom * 0.02;

        // 功法加成
        if (this.currentSkill && this.skills[this.currentSkill]) {
            const skill = CONFIG.skills[this.currentSkill];
            if (skill.effect === 'breakthrough_chance') {
                chance += skill.value * this.skills[this.currentSkill].level;
            }
        }

        // 加上buff加成
        chance += this.buffs.breakthrough.bonus;

        // 添加随机波动
        const variance = realmConfig.breakthroughVariance;
        chance += (Math.random() - 0.5) * variance;

        // 限制在0.05-0.95之间
        return Math.max(0.05, Math.min(0.95, chance));
    }

    // 检查是否可以突破
    canBreakthrough() {
        return this.cultivation >= this.maxCultivation;
    }

    // 尝试突破
    attemptBreakthrough() {
        if (!this.canBreakthrough()) {
            return { success: false, message: '修为不足，无法突破' };
        }

        // 检查是否需要渡劫（大境界突破）
        const needsTribulation = this.level >= CONFIG.realms[this.realm].levels;
        const nextRealm = this.getNextRealm();

        if (needsTribulation && nextRealm && CONFIG.heavenlyTribulations[nextRealm]) {
            // 需要渡劫
            return {
                success: false,
                needTribulation: true,
                targetRealm: nextRealm,
                message: `突破到${nextRealm}需要渡过${CONFIG.heavenlyTribulations[nextRealm].name}！`
            };
        }

        const chance = this.calculateBreakthroughChance();
        const success = Math.random() < chance;

        if (success) {
            const realmConfig = CONFIG.realms[this.realm];

            if (this.level < realmConfig.levels) {
                this.level++;
                this.addLog(`恭喜！突破成功！达到${this.realm} ${this.level}层`, 'success');
            } else {
                // 这里不会到达，因为上面检查了needsTribulation
                const realmNames = Object.keys(CONFIG.realms);
                const currentIndex = realmNames.indexOf(this.realm);

                if (currentIndex < realmNames.length - 1) {
                    this.realm = realmNames[currentIndex + 1];
                    this.level = 1;
                    this.addLog(`境界突破！进入${this.realm}！`, 'legendary');
                } else {
                    this.addLog('你已达到修仙界的巅峰！即将飞升！', 'legendary');
                }
            }

            this.cultivation = Math.floor(this.maxCultivation * 0.1);
            this.maxCultivation = this.calculateCultivationRequirement();

            // 检查并学习新的战斗技能
            this.checkAndLearnCombatSkills();

            // 更新任务进度
            try {
                this.updateQuestProgress('breakthrough', this.level);
            } catch (error) {
                console.error('任务进度更新失败:', error);
            }

            return { success: true, message: '突破成功！' };
        } else {
            const failurePenalty = Math.floor(this.maxCultivation * 0.2);
            this.cultivation = Math.max(0, this.cultivation - failurePenalty);

            this.addLog(`突破失败！损失${failurePenalty}修为`, 'danger');
            return { success: false, message: '突破失败！修为受损' };
        }
    }

    // 获取下一个境界
    getNextRealm() {
        const realmNames = Object.keys(CONFIG.realms);
        const currentIndex = realmNames.indexOf(this.realm);
        if (currentIndex < realmNames.length - 1) {
            return realmNames[currentIndex + 1];
        }
        return null;
    }

    // 开始渡劫
    startTribulation(targetRealm) {
        const tribulation = CONFIG.heavenlyTribulations[targetRealm];
        if (!tribulation) {
            return { success: false, message: '此境界无需渡劫' };
        }

        // 保存渡劫状态
        this.tribulationState = {
            targetRealm: targetRealm,
            currentWave: 0,
            totalWaves: tribulation.waves,
            isTribulating: true,
            preparation: {
                itemsUsed: [],
                helpersInvited: []
            }
        };

        return {
            success: true,
            message: `开始渡劫${tribulation.name}`,
            tribulation: tribulation
        };
    }

    // 渡劫处理
    processTribulation() {
        const state = this.tribulationState;
        if (!state || !state.isTribulating) return;

        const tribulation = CONFIG.heavenlyTribulations[state.targetRealm];

        // 检查是否完成所有波次
        if (state.currentWave >= state.totalWaves) {
            this.completeTribulation(true);
            return;
        }

        // 处理当前波次
        state.currentWave++;
        const currentWaveDifficulty = 1 + (state.currentWave * 0.2); // 难度递增

        // 计算成功率（考虑准备因素）
        let successRate = tribulation.baseSuccessRate;

        // 物品加成
        for (const item of state.preparation.itemsUsed) {
            if (item === '天劫符') successRate += 0.15;
            if (item === '护身符') successRate += 0.1;
        }

        // 护法加成
        const helperBonus = state.preparation.helpersInvited.length * 0.05;
        successRate += helperBonus;

        // 境界压制
        const realmBonus = (this.getRealmLevel(this.realm) - 1) * 0.05;
        successRate += realmBonus;

        // 随机判定
        const waveSuccess = Math.random() < successRate;

        if (waveSuccess) {
            this.addLog(`第${state.currentWave}波天劫成功度过！剩余${state.totalWaves - state.currentWave}波`, 'success');
        } else {
            this.addLog(`第${state.currentWave}波天劫失败！受到重创！`, 'danger');
            // 渡劫失败处理
            this.tribulationFailed();
            return;
        }

        // 检查是否完成
        if (state.currentWave >= state.totalWaves) {
            this.completeTribulation(true);
        }
    }

    // 完成渡劫
    completeTribulation(success) {
        const state = this.tribulationState;
        if (!state) return;

        if (success) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentIndex = realmNames.indexOf(this.realm);
            const targetIndex = realmNames.indexOf(state.targetRealm);

            if (targetIndex > currentIndex) {
                this.realm = state.targetRealm;
                this.level = 1;
                this.cultivation = 0;
                this.maxCultivation = this.calculateCultivationRequirement();

                this.addLog(`🌟 渡劫成功！突破到${state.targetRealm}！🌟`, 'legendary');
                this.addLog(`天道认可，仙路可期！`, 'legendary');

                // 清除渡劫状态
                this.tribulationState = null;
            }
        } else {
            this.tribulationFailed();
        }
    }

    // 渡劫失败处理
    tribulationFailed() {
        const state = this.tribulationState;
        if (!state) return;

        const tribulation = CONFIG.heavenlyTribulations[state.targetRealm];
        const penalty = tribulation.failurePenalty;

        // 修为损失
        const loss = Math.floor(this.maxCultivation * penalty.cultivationLoss);
        this.cultivation = Math.max(0, this.cultivation - loss);

        this.addLog(`渡劫失败！损失${loss}修为`, 'danger');

        // 境界跌落检查
        if (penalty.possibilityOfRealmDrop > 0 && Math.random() < penalty.possibilityOfRealmDrop) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentIndex = realmNames.indexOf(this.realm);

            if (currentIndex > 0) {
                this.realm = realmNames[currentIndex - 1];
                this.level = CONFIG.realms[this.realm].levels;
                this.cultivation = 0;
                this.maxCultivation = this.calculateCultivationRequirement();

                this.addLog(`境界跌落至${this.realm} ${this.level}层`, 'danger');
            }
        }

        // 死亡检查
        if (penalty.possibilityOfDeath > 0 && Math.random() < penalty.possibilityOfDeath) {
            this.addLog('渡劫失败，身死道消...', 'danger');
            // 这里可以添加转世系统或游戏结束逻辑
        }

        this.tribulationState = null;
    }

    // 获取境界等级（用于计算）
    getRealmLevel(realm) {
        const realmNames = Object.keys(CONFIG.realms);
        return realmNames.indexOf(realm) + 1;
    }

    // 增加修为
    addCultivation(amount) {
        // amount 应该是每秒修为的基础值，不需要再次计算
        const oldCultivation = this.cultivation;
        this.cultivation = Math.floor(this.cultivation + amount);

        // 更新任务进度（使用try-catch防止错误影响修炼）
        try {
            this.updateQuestProgress('cultivate', amount);
        } catch (error) {
            console.error('任务进度更新失败:', error);
        }

        // 先检查是否达到自动突破条件（在限制之前）
        if (oldCultivation < this.maxCultivation * 2 && this.cultivation >= this.maxCultivation * 2) {
            this.autoBreakthrough();
        }

        // 限制修为不超过最大值的2倍（为自动突破留出空间）
        if (this.cultivation >= this.maxCultivation * 2) {
            this.cultivation = this.maxCultivation * 2;
        }

        // 检查段位成就
        this.checkRealmAchievement();

        return this.cultivation >= this.maxCultivation;
    }

    // 自动突破
    autoBreakthrough() {
        const realmConfig = CONFIG.realms[this.realm];
        const maxLevel = realmConfig.levels;

        // 检查是否已经是该境界最高层
        if (this.level >= maxLevel) {
            // 尝试突破到下一个境界
            const success = Math.random() < 0.5;
            if (success) {
                const realmNames = Object.keys(CONFIG.realms);
                const currentIndex = realmNames.indexOf(this.realm);

                if (currentIndex < realmNames.length - 1) {
                    this.realm = realmNames[currentIndex + 1];
                    this.level = 1;
                    this.cultivation = 0;
                    this.maxCultivation = this.calculateCultivationRequirement();
                    this.addLog(`修为爆满，自动突破！进入${this.realm}！`, 'legendary');
                } else {
                    this.addLog('你已达到修仙界的巅峰！修为继续积累...', 'legendary');
                }
            } else {
                // 突破失败，损失一半修为
                const loss = Math.floor(this.maxCultivation * 0.5);
                this.cultivation = Math.max(0, this.cultivation - loss);
                this.addLog(`自动突破失败！损失${loss}修为`, 'danger');
            }
        } else {
            // 同境界内升级
            this.level++;
            this.cultivation = 0;
            this.maxCultivation = this.calculateCultivationRequirement();
            this.addLog(`修为爆满，自动突破到${this.realm} ${this.level}层！`, 'success');
        }

        this.checkRealmAchievement();
    }

    // 检查段位成就
    checkRealmAchievement() {
        const achievement = CONFIG.realmAchievements[this.realm];
        if (!achievement) return;

        if (this.level === achievement.requirements.level) {
            if (this.achievements.includes(achievement.id)) return;

            this.achievements.push(achievement.id);

            const random = Math.random();
            const isGood = random < achievement.rewards.good.chance;

            if (isGood) {
                const reward = achievement.rewards.good;
                this.addLog(`🏆 段位成就：${achievement.name}！${reward.message}`, 'legendary');

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
                this.addLog(`⚠️ 段位考验失败！${penalty.message}`, 'danger');

                if (penalty.cultivation && penalty.cultivation < 0) {
                    this.cultivation = Math.max(0, this.cultivation + penalty.cultivation);
                }
            }
        }
    }

    // 获取当前状态
    getCurrentState() {
        if (this.isWorking) {
            return {
                type: 'working',
                text: '打工中',
                endTime: this.workEndTime,
                job: this.currentJob
            };
        } else if (this.isExploring) {
            return {
                type: 'exploring',
                text: '探索秘境中',
                endTime: this.explorationEndTime,
                exploration: this.currentExploration
            };
        } else if (this.isAdventuring) {
            return {
                type: 'adventuring',
                text: '历练中',
                endTime: this.adventureEndTime,
                adventure: this.currentAdventure
            };
        } else if (this.isMeditating) {
            return {
                type: 'meditating',
                text: '入定中',
                endTime: this.buffs.cultivation.endTime
            };
        } else {
            return {
                type: 'cultivating',
                text: '修炼中',
                endTime: 0
            };
        }
    }

    // 检查是否可以进行某个操作
    canDoAction(action) {
        const currentState = this.getCurrentState();

        switch (action) {
            case 'meditate':
                if (currentState.type === 'adventuring' || currentState.type === 'working') {
                    return { can: false, message: `${currentState.text}无法入定` };
                }
                if (currentState.type === 'meditating') {
                    return { can: false, message: '已经在入定状态中' };
                }
                return { can: true };

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

            case 'fight':
                if (currentState.type !== 'cultivating') {
                    return { can: false, message: `${currentState.text}无法战斗` };
                }
                return { can: true };

            case 'alchemy':
                if (currentState.type === 'adventuring') {
                    return { can: false, message: '历练中无法炼丹' };
                }
                return { can: true };

            default:
                return { can: true };
        }
    }

    // 开始入定
    startMeditation() {
        const canDo = this.canDoAction('meditate');
        if (!canDo.can) {
            this.addLog(canDo.message + '！', 'danger');
            return false;
        }

        this.buffs.cultivation.multiplier = 3.0;
        this.buffs.cultivation.endTime = Date.now() + 30000;
        this.isMeditating = true;
        this.addLog('进入深度入定状态，修炼速度提升3倍，持续30秒', 'success');
        return true;
    }

    // 开始历练
    startAdventure() {
        const canDo = this.canDoAction('adventure');
        if (!canDo.can) {
            this.addLog(canDo.message + '！', 'danger');
            return false;
        }

        const adventure = CONFIG.adventures[Math.floor(Math.random() * CONFIG.adventures.length)];
        this.currentAdventure = adventure;
        this.isAdventuring = true;
        this.adventureEndTime = Date.now() + adventure.duration;

        this.addLog(adventure.message, 'success');
        return true;
    }

    // 完成历练
    completeAdventure() {
        if (!this.currentAdventure) return;

        const adventure = this.currentAdventure;
        const random = Math.random();
        let cumulative = 0;

        for (const outcome of adventure.outcomes) {
            cumulative += outcome.chance;
            if (random <= cumulative) {
                this.processAdventureOutcome(outcome);
                break;
            }
        }

        this.isAdventuring = false;
        this.currentAdventure = null;
        this.adventureEndTime = 0;

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
            this.addLog(canDo.message + '！', 'danger');
            return false;
        }

        const realm = CONFIG.secretRealms.find(r => r.id === realmId);
        if (!realm) {
            this.addLog('秘境不存在', 'danger');
            return false;
        }

        // 检查要求
        if (realm.requirements.realm) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentRealmIndex = realmNames.indexOf(this.realm);
            const requiredRealmIndex = realmNames.indexOf(realm.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                this.addLog(`境界不足，需要${realm.requirements.realm}`, 'danger');
                return false;
            }

            if (currentRealmIndex === requiredRealmIndex && this.level < realm.requirements.level) {
                this.addLog(`层级不足，需要${realm.requirements.realm}${realm.requirements.level}层`, 'danger');
                return false;
            }
        }

        // 检查消耗
        if (realm.cost && realm.cost.spiritStones) {
            if (this.spiritStones < realm.cost.spiritStones) {
                this.addLog(`灵石不足，需要${realm.cost.spiritStones}灵石`, 'danger');
                return false;
            }
            this.spiritStones -= realm.cost.spiritStones;
        }

        this.currentExploration = realm;
        this.isExploring = true;
        this.explorationEndTime = Date.now() + realm.duration;

        this.addLog(`开始探索${realm.name}...`, 'rare');
        this.addLog(`预计耗时${realm.duration / 1000}秒`, 'info');
        return true;
    }

    // 完成秘境探索
    completeExploration() {
        if (!this.currentExploration) return;

        const realm = this.currentExploration;
        const random = Math.random();
        let cumulative = 0;

        // 计算幸运值影响
        const luckBonus = (this.talents.luck + this.talents.fortune) * 0.01;
        const adjustedRandom = random - luckBonus * 0.5;

        for (const outcome of realm.outcomes) {
            cumulative += outcome.chance;
            if (adjustedRandom <= cumulative) {
                this.processExplorationOutcome(outcome, realm);
                break;
            }
        }

        this.isExploring = false;
        this.currentExploration = null;
        this.explorationEndTime = 0;
    }

    // 处理秘境探索结果
    processExplorationOutcome(outcome, realm) {
        this.addLog(`探索${realm.name}结果：${this.getExplorationResultText(outcome.result)}`, outcome.result.includes('great') || outcome.result.includes('legendary') || outcome.result.includes('boss') || outcome.result.includes('conqueror') || outcome.result === 'legacy' || outcome.result === 'void_master' ? 'legendary' : outcome.result.includes('good') || outcome.result === 'victory' || outcome.result === 'solved' || outcome.result === 'rich_vein' || outcome.result === 'secret_found' || outcome.result === 'survived' ? 'success' : 'danger');

        if (outcome.rewards) {
            for (const reward of outcome.rewards) {
                if (reward.type === 'spirit_stones') {
                    const amount = Math.floor(Math.random() * (reward.value[1] - reward.value[0]) + reward.value[0]);
                    this.addSpiritStones(amount);
                    this.addLog(`获得${amount}灵石`, 'success');
                } else if (reward.type === 'cultivation') {
                    const amount = Math.floor(Math.random() * (reward.value[1] - reward.value[0]) + reward.value[0]);
                    this.addCultivation(amount);
                    this.addLog(`获得${amount}修为`, 'success');
                } else if (reward.type === 'item') {
                    this.addItem(reward.value);
                    this.addLog(`获得${reward.value}`, 'rare');
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
                this.cultivation = Math.max(0, this.cultivation - loss);
                this.addLog(`受伤损失${loss}修为`, 'danger');
            } else if (outcome.penalty.type === 'cultivation_loss') {
                const loss = Math.floor(Math.random() * (outcome.penalty.value[1] - outcome.penalty.value[0]) + outcome.penalty.value[0]);
                this.cultivation = Math.max(0, this.cultivation - loss);
                this.addLog(`损失${loss}修为`, 'danger');
            } else if (outcome.penalty.type === 'sealed') {
                const loss = Math.floor(Math.random() * (outcome.penalty.value[1] - outcome.penalty.value[0]) + outcome.penalty.value[0]);
                this.cultivation = Math.max(0, this.cultivation - loss);
                this.addLog(`被困在遗迹中，损失${loss}修为`, 'danger');
            } else if (outcome.penalty.type === 'realm_fall') {
                this.addLog('在虚空中迷失，境界跌落一层！', 'danger');
                // 境界跌落逻辑
                const realmNames = Object.keys(CONFIG.realms);
                const currentIndex = realmNames.indexOf(this.realm);
                if (currentIndex > 0) {
                    this.realm = realmNames[currentIndex - outcome.penalty.value];
                    this.level = 9;
                    this.cultivation = 0;
                    this.maxCultivation = CONFIG.realms[this.realm].baseRequirement;
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

    // 处理历练结果
    processAdventureOutcome(outcome) {
        switch (outcome.result) {
            case 'success':
            case 'great_success':
                if (outcome.reward.type === 'cultivation') {
                    const amount = Math.floor(Math.random() * (outcome.reward.value[1] - outcome.reward.value[0]) + outcome.reward.value[0]);
                    this.addCultivation(amount);
                    this.addLog(`历练成功！获得${amount}修为`, outcome.result === 'great_success' ? 'legendary' : 'success');

                    // 大成功时有概率获得法宝
                    if (outcome.result === 'great_success' && Math.random() < 0.15) {
                        this.grantRandomArtifact();
                    }
                } else if (outcome.reward.type === 'item') {
                    this.addItem(outcome.reward.value);
                    this.addLog(`历练成功！获得${outcome.reward.value}`, outcome.result === 'great_success' ? 'legendary' : 'success');
                } else if (outcome.reward.type === 'spirit_stones') {
                    const amount = Math.floor(Math.random() * (outcome.reward.value[1] - outcome.reward.value[0]) + outcome.reward.value[0]);
                    this.addSpiritStones(amount);
                    this.addLog(`历练成功！获得${amount}灵石`, 'success');
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
                        this.cultivation = Math.max(0, this.cultivation - loss);
                        this.addLog(`历练失败！损失${loss}修为`, 'danger');
                    } else if (outcome.penalty.type === 'injured') {
                        const injury = Math.floor(Math.random() * (outcome.penalty.value[1] - outcome.penalty.value[0]) + outcome.penalty.value[0]);
                        this.cultivation = Math.max(0, this.cultivation - injury);
                        this.addLog(`历练失败！受伤损失${injury}修为`, 'danger');
                    }
                } else if (outcome.message) {
                    this.addLog(outcome.message, 'danger');
                }
                break;
        }

        this.checkRealmAchievement();
    }

    // 战斗系统
    fightMonster(monsterId, skillId = null) {
        const monster = CONFIG.monsters.find(m => m.id === monsterId);
        if (!monster) {
            return { success: false, message: '怪物不存在' };
        }

        // 检查要求
        if (monster.requirements.realm) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentRealmIndex = realmNames.indexOf(this.realm);
            const requiredRealmIndex = realmNames.indexOf(monster.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${monster.requirements.realm}` };
            }

            if (currentRealmIndex === requiredRealmIndex && this.level < monster.requirements.level) {
                return { success: false, message: `层级不足，需要${monster.requirements.realm}${monster.requirements.level}层` };
            }
        }

        // 处理技能
        let skillUsed = null;
        let skillBonusText = '';

        if (skillId && this.combatSkills[skillId] && this.combatSkills[skillId].learned) {
            const canUse = this.canUseSkill(skillId);
            if (canUse.can) {
                skillUsed = CONFIG.combatSkills[skillId];

                // 设置技能冷却
                if (skillUsed.cooldown > 0) {
                    this.combatSkillCooldowns[skillId] = Date.now() + (skillUsed.cooldown * 1000);
                }

                // 更新技能使用统计
                this.combatSkills[skillId].timesUsed = (this.combatSkills[skillId].timesUsed || 0) + 1;

                skillBonusText = `【使用${skillUsed.name}】`;
            } else {
                return { success: false, message: canUse.message };
            }
        }

        // 计算境界压制
        const suppression = this.calculateRealmSuppression(monster.requirements.realm, monster.requirements.level);

        // 计算基础战斗属性
        const playerStats = this.calculateCombatStats();

        // 应用境界压制效果
        let finalPlayerAttack = playerStats.attack;
        let finalPlayerDefense = playerStats.defense;

        if (suppression.hasSuppression) {
            if (suppression.suppressionLevel === 'suppressed') {
                finalPlayerAttack *= suppression.multiplier;
                finalPlayerDefense *= suppression.multiplier;
            } else {
                finalPlayerAttack *= suppression.multiplier;
                finalPlayerDefense *= suppression.multiplier;
            }
        }

        // 应用技能效果
        if (skillUsed) {
            if (skillUsed.type === 'attack') {
                // 攻击技能：增加伤害
                finalPlayerAttack *= skillUsed.power;
            } else if (skillUsed.type === 'defense') {
                // 防御技能：减少受到的伤害
                finalPlayerDefense *= skillUsed.power;
            } else if (skillUsed.type === 'buff') {
                // Buff技能：全面提升
                finalPlayerAttack *= skillUsed.power;
                finalPlayerDefense *= skillUsed.power;
            }
        }

        // 战斗计算
        const playerDamage = Math.max(1, finalPlayerAttack - monster.defense);
        const monsterDamage = Math.max(1, monster.attack - finalPlayerDefense);

        // 计算回合数
        const playerRounds = Math.ceil(monster.hp / playerDamage);
        const monsterRounds = Math.ceil(playerStats.health / monsterDamage);

        // 幸运影响
        const luckReduction = playerStats.luckBonus > 0 ? Math.random() < playerStats.luckBonus : false;
        const actualMonsterRounds = luckReduction ? Math.max(1, monsterRounds - 1) : monsterRounds;

        const victory = playerRounds <= actualMonsterRounds;

        // 构建信息
        let suppressionInfo = '';
        if (suppression.hasSuppression) {
            if (suppression.suppressionLevel === 'suppressed') {
                suppressionInfo = `【被${suppression.description}，属性${(suppression.multiplier * 100).toFixed(0)}%】`;
            } else {
                suppressionInfo = `【${suppression.description}，属性${(suppression.multiplier * 100).toFixed(0)}%】`;
            }
        }

        if (victory) {
            // 胜利，获得奖励
            const spiritStones = Math.floor(Math.random() * (monster.rewards.spiritStones[1] - monster.rewards.spiritStones[0]) + monster.rewards.spiritStones[0]);
            const cultivation = Math.floor(Math.random() * (monster.rewards.cultivation[1] - monster.rewards.cultivation[0]) + monster.rewards.cultivation[0]);

            this.addSpiritStones(spiritStones);
            this.addCultivation(cultivation);

            // 检查物品掉落
            let droppedItems = [];
            if (Math.random() < monster.rewards.dropRate) {
                const droppedItem = monster.rewards.items[Math.floor(Math.random() * monster.rewards.items.length)];
                this.addItem(droppedItem);
                droppedItems.push(droppedItem);
            }

            // 受伤计算（即使胜利也会受伤）
            const damageTaken = monsterDamage * (playerRounds - 1);

            // 防御技能减少受到的伤害
            let reducedDamage = damageTaken;
            if (skillUsed && skillUsed.effect === 'damage_reduction') {
                reducedDamage *= (1 - skillUsed.value);
            }

            const healthLoss = Math.min(playerStats.health * 0.3, reducedDamage);
            const cultivationLoss = Math.floor(healthLoss * 0.5);

            if (cultivationLoss > 0) {
                this.cultivation = Math.max(0, this.cultivation - cultivationLoss);
            }

            // 更新最高伤害记录
            if (skillUsed) {
                const totalDamage = playerDamage * playerRounds;
                if (!this.combatSkills[skillId].highestDamage || totalDamage > this.combatSkills[skillId].highestDamage) {
                    this.combatSkills[skillId].highestDamage = Math.floor(totalDamage);
                }
            }

            let message = `战胜了${monster.name}！${skillBonusText}${suppressionInfo}获得${spiritStones}灵石，${cultivation}修为`;
            if (droppedItems.length > 0) {
                message += `，获得${droppedItems.join('、')}`;
            }
            if (cultivationLoss > 0) {
                message += `，战斗受伤损失${cultivationLoss}修为`;
            }

            this.addLog(message, 'success');
            return { success: true, victory: true, message };
        } else {
            // 失败，受到惩罚
            const spiritStonesLost = Math.floor(this.spiritStones * 0.1);
            const cultivationLost = Math.floor(Math.random() * 100 + 50);

            this.spiritStones = Math.max(0, this.spiritStones - spiritStonesLost);
            this.cultivation = Math.max(0, this.cultivation - cultivationLost);

            const message = `被${monster.name}击败！${skillBonusText}损失${spiritStonesLost}灵石，${cultivationLost}修为`;
            this.addLog(message, 'danger');
            return { success: false, victory: false, message };
        }
    }

    // 打工系统
    doWork(jobId) {
        const job = CONFIG.jobs.find(j => j.id === jobId);
        if (!job) {
            return { success: false, message: '工作不存在' };
        }

        const canDo = this.canDoAction('work');
        if (!canDo.can) {
            return { success: false, message: canDo.message };
        }

        this.isWorking = true;
        this.workEndTime = Date.now() + job.duration;
        this.currentJob = job;

        // 计算基础奖励
        let baseReward = Math.floor(Math.random() * (job.baseReward[1] - job.baseReward[0]) + job.baseReward[0]);

        // 属性加成
        const attributeValue = this.talents[job.attribute] || 0;
        baseReward = Math.floor(baseReward * (1 + attributeValue * job.bonusMultiplier));

        this.addLog(`开始${job.name}，预计${job.duration/1000}秒完成`, 'info');

        // 模拟工作过程
        setTimeout(() => {
            // 检查风险
            if (Math.random() < job.risk) {
                // 工作出意外
                const penalty = Math.floor(Math.random() * (job.riskPenalty[1] - job.riskPenalty[0]) + job.riskPenalty[0]);
                this.cultivation = Math.max(0, this.cultivation - penalty);
                this.addLog(`工作出意外了，损失${penalty}修为`, 'danger');
            } else {
                // 工作成功
                this.addSpiritStones(baseReward);
                this.addLog(`工作完成！获得${baseReward}灵石`, 'success');
            }

            // 重置工作状态
            this.isWorking = false;
            this.workEndTime = 0;
            this.currentJob = null;
        }, job.duration);

        return { success: true, message: `开始${job.name}` };
    }

    // 宗门任务
    doSectTask(taskId) {
        if (this.sect === 'none') {
            return { success: false, message: '未加入宗门，无法执行宗门任务' };
        }

        const task = CONFIG.sectTasks.find(t => t.id === taskId);
        if (!task) {
            return { success: false, message: '任务不存在' };
        }

        // 检查要求
        if (task.requirements.minRealm) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentRealmIndex = realmNames.indexOf(this.realm);
            const requiredRealmIndex = realmNames.indexOf(task.requirements.minRealm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${task.requirements.minRealm}` };
            }
        }

        if (task.requirements.minLevel && this.level < task.requirements.minLevel) {
            return { success: false, message: `层级不足，需要${task.requirements.minLevel}层` };
        }

        const canDo = this.canDoAction('work');
        if (!canDo.can) {
            return { success: false, message: canDo.message };
        }

        this.isWorking = true;
        this.workEndTime = Date.now() + task.duration;
        this.currentJob = { name: `宗门任务: ${task.name}` };

        this.addLog(`开始执行宗门任务：${task.name}，预计${task.duration/1000}秒完成`, 'info');
        if (task.specialReward) {
            this.addLog(`特殊奖励: ${task.specialReward}`, 'rare');
        }

        // 模拟任务过程
        setTimeout(() => {
            this.isWorking = false;
            this.workEndTime = 0;
            this.currentJob = null;

            const rankBonus = this.getSectRankBonus().taskBonus;

            const contribution = Math.floor(Math.random() * (task.contributionReward[1] - task.contributionReward[0]) + task.contributionReward[0] * rankBonus);
            const spiritStones = Math.floor(Math.random() * (task.spiritStonesReward[1] - task.spiritStonesReward[0]) + task.spiritStonesReward[0]);
            const experience = task.experienceReward ? Math.floor(Math.random() * (task.experienceReward[1] - task.experienceReward[0]) + task.experienceReward[0] * rankBonus) : 0;

            this.sectContribution += contribution;
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

            this.addLog(logMessage, 'legendary');

            // 检查是否可以提升宗门等级
            this.checkSectRankPromotion();
        }, task.duration);

        return { success: true, message: `开始执行${task.name}` };
    }

    // 检查并提升宗门等级
    checkSectRankPromotion() {
        if (this.sect === 'none') return;

        const currentRank = CONFIG.sectRanks[this.sectRank];
        if (!currentRank) return;

        // 查找下一个等级
        const nextRanks = Object.entries(CONFIG.sectRanks)
            .filter(([_, rank]) => rank.level === currentRank.level + 1);

        for (const [rankName, rankConfig] of nextRanks) {
            // 检查升级条件
            const hasEnoughContribution = this.sectContribution >= rankConfig.minContribution;
            const hasEnoughRealm = this.checkRealmRequirement(rankConfig.minRealm);

            if (hasEnoughContribution && hasEnoughRealm) {
                this.sectRank = rankName;
                this.addLog(`恭喜！你在宗门中晋升为${rankName}！`, 'legendary');
                this.addLog(`新的身份享有${(rankConfig.taskBonus * 100 - 100).toFixed(0)}%任务奖励加成`, 'rare');
            }
        }
    }

    // 检查境界要求
    checkRealmRequirement(requiredRealm) {
        if (!requiredRealm) return true;

        const realmNames = Object.keys(CONFIG.realms);
        const currentRealmIndex = realmNames.indexOf(this.realm);
        const requiredRealmIndex = realmNames.indexOf(requiredRealm);

        return currentRealmIndex >= requiredRealmIndex;
    }

    // 获取当前宗门等级加成
    getSectRankBonus() {
        if (this.sect === 'none') return { taskBonus: 1.0, shopDiscount: 1.0 };

        const rank = CONFIG.sectRanks[this.sectRank];
        return {
            taskBonus: rank.taskBonus,
            shopDiscount: rank.shopDiscount
        };
    }

    // 检查宗门权限
    hasSectPermission(permission) {
        if (this.sect === 'none') return false;

        const rank = CONFIG.sectRanks[this.sectRank];
        return rank.permissions.includes(permission) || rank.permissions.includes('all');
    }
    joinSect(sectId) {
        const sect = CONFIG.sects.find(s => s.id === sectId);
        if (!sect) {
            return { success: false, message: '宗门不存在' };
        }

        // 检查要求
        if (sect.requirements.realm) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentRealmIndex = realmNames.indexOf(this.realm);
            const requiredRealmIndex = realmNames.indexOf(sect.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${sect.requirements.realm}` };
            }

            if (currentRealmIndex === requiredRealmIndex && this.level < sect.requirements.level) {
                return { success: false, message: `层级不足，需要${sect.requirements.realm}${sect.requirements.level}层` };
            }
        }

        // 检查灵石
        if (this.spiritStones < sect.joinCost) {
            return { success: false, message: `灵石不足，需要${sect.joinCost}灵石` };
        }

        // 退出当前宗门
        if (this.sect !== 'none') {
            this.addLog(`退出了${CONFIG.sects.find(s => s.id === this.sect).name}`, 'info');
        }

        // 加入新宗门
        this.spiritStones -= sect.joinCost;
        this.sect = sectId;
        this.sectContribution = 0;

        this.addLog(`成功加入${sect.name}！`, 'legendary');
        return { success: true, message: `成功加入${sect.name}` };
    }

    // 从宗门商店购买
    buyFromSectShop(itemType, itemName) {
        if (this.sect === 'none') {
            return { success: false, message: '未加入宗门，无法购买' };
        }

        const shop = CONFIG.sectShop;
        const items = itemType === 'skills' ? shop.skills : shop.items;

        const shopItem = items.find(item => item.name === itemName);
        if (!shopItem) {
            return { success: false, message: '商品不存在' };
        }

        // 检查要求
        if (shopItem.requirements.minRealm) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentRealmIndex = realmNames.indexOf(this.realm);
            const requiredRealmIndex = realmNames.indexOf(shopItem.requirements.minRealm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${shopItem.requirements.minRealm}` };
            }
        }

        if (shopItem.requirements.sect && this.sect !== shopItem.requirements.sect) {
            return { success: false, message: `此商品仅特定宗门可购买` };
        }

        // 检查货币
        if (shopItem.currency === 'spiritStones') {
            if (this.spiritStones < shopItem.price) {
                return { success: false, message: '灵石不足' };
            }
            this.spiritStones -= shopItem.price;
        } else if (shopItem.currency === 'contribution') {
            if (this.sectContribution < shopItem.price) {
                return { success: false, message: '贡献度不足' };
            }
            this.sectContribution -= shopItem.price;
        }

        // 发放物品
        if (itemType === 'skills') {
            const learnResult = this.learnSkill(itemName);
            if (!learnResult.success) {
                // 退款
                if (shopItem.currency === 'spiritStones') {
                    this.spiritStones += shopItem.price;
                } else {
                    this.sectContribution += shopItem.price;
                }
                return learnResult;
            }
        } else {
            this.addItem(itemName);
        }

        this.addLog(`从宗门购买了${itemName}`, 'success');
        return { success: true, message: `成功购买${itemName}` };
    }

    // 增加灵石
    addSpiritStones(amount) {
        this.spiritStones += amount;
        this.addLog(`获得${amount}灵石`, 'success');
    }

    // 添加物品
    addItem(itemName, count = 1) {
        if (!this.inventory[itemName]) {
            this.inventory[itemName] = 0;
        }
        this.inventory[itemName] += count;
        this.addLog(`获得${itemName} x${count}`, 'rare');
    }

    // 使用物品
    useItem(itemName) {
        if (!this.inventory[itemName] || this.inventory[itemName] <= 0) {
            return { success: false, message: '没有此物品' };
        }

        const item = CONFIG.items[itemName];
        if (!item) {
            return { success: false, message: '未知物品' };
        }

        switch (item.effect) {
            case 'cultivation_boost':
                this.buffs.cultivation.multiplier = item.value;
                this.buffs.cultivation.endTime = Date.now() + item.duration;
                this.addLog(`使用了${itemName}，修炼速度提升${item.value}倍，持续${item.duration/1000}秒`, 'success');
                break;

            case 'breakthrough_boost':
                this.buffs.breakthrough.bonus = item.value;
                this.buffs.breakthrough.endTime = Date.now() + 300000;
                this.addLog(`使用了${itemName}，突破成功率提升${(item.value * 100).toFixed(0)}%`, 'success');
                break;

            case 'spirit_stones':
                const amount = Math.floor(Math.random() * (item.value[1] - item.value[0]) + item.value[0]);
                this.addSpiritStones(amount);
                break;

            case 'tribulation_boost':
                this.buffs.breakthrough.bonus = item.value;
                this.buffs.breakthrough.endTime = Date.now() + 600000;
                this.addLog(`使用了${itemName}，突破成功率大幅提升！`, 'legendary');
                break;

            case 'potential_boost':
                this.talents.potential += item.value;
                this.addLog(`使用了${itemName}，根骨永久+${item.value}！`, 'legendary');
                break;

            case 'wisdom_boost':
                this.talents.wisdom += item.value;
                this.addLog(`使用了${itemName}，悟性永久+${item.value}！`, 'legendary');
                break;

            case 'luck_boost':
                this.buffs.luck = { value: item.value, endTime: Date.now() + item.duration };
                this.addLog(`使用了${itemName}，幸运+${item.value}，持续${item.duration/1000}秒`, 'success');
                break;

            case 'pet_level':
                if (this.currentPet && this.pets[this.currentPet]) {
                    this.pets[this.currentPet].level = Math.min(
                        CONFIG.pets[this.currentPet].maxLevel,
                        this.pets[this.currentPet].level + item.value
                    );
                    this.addLog(`${this.currentPet}提升了！`, 'success');
                } else {
                    return { success: false, message: '没有宠物' };
                }
                break;

            default:
                return { success: false, message: '未知效果' };
        }

        this.inventory[itemName]--;
        if (this.inventory[itemName] <= 0) {
            delete this.inventory[itemName];
        }

        return { success: true, message: `使用了${itemName}` };
    }

    // 学习功法
    learnSkill(skillName) {
        if (this.skills[skillName]) {
            return { success: false, message: '已经学过此功法' };
        }

        const skill = CONFIG.skills[skillName];
        if (!skill) {
            return { success: false, message: '未知功法' };
        }

        // 检查要求
        if (skill.requirements.realm) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentRealmIndex = realmNames.indexOf(this.realm);
            const requiredRealmIndex = realmNames.indexOf(skill.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${skill.requirements.realm}` };
            }

            if (currentRealmIndex === requiredRealmIndex && this.level < skill.requirements.level) {
                return { success: false, message: `层级不足，需要${skill.requirements.realm}${skill.requirements.level}层` };
            }
        }

        this.skills[skillName] = { level: 1 };
        this.addLog(`学会了${skillName}！`, 'legendary');
        return { success: true, message: `学会了${skillName}` };
    }

    // 升级功法
    upgradeSkill(skillName) {
        if (!this.skills[skillName]) {
            return { success: false, message: '未学过此功法' };
        }

        const skill = CONFIG.skills[skillName];
        const currentLevel = this.skills[skillName].level;

        if (currentLevel >= skill.maxLevel) {
            return { success: false, message: '功法已至最高层' };
        }

        // 计算升级消耗
        const cost = 100 * currentLevel;
        if (this.spiritStones < cost) {
            return { success: false, message: `灵石不足，需要${cost}灵石` };
        }

        this.spiritStones -= cost;
        this.skills[skillName].level++;
        this.addLog(`${skillName}升至${this.skills[skillName].level}层！`, 'success');
        return { success: true, message: `${skillName}升级成功` };
    }

    // 设置当前功法
    setCurrentSkill(skillName) {
        if (!this.skills[skillName]) {
            return { success: false, message: '未学过此功法' };
        }

        this.currentSkill = skillName;
        this.addLog(`切换功法为${skillName}`, 'info');
        return { success: true, message: `切换功法为${skillName}` };
    }

    // 捕获宠物
    catchPet(petName) {
        if (this.pets[petName]) {
            return { success: false, message: '已有此宠物' };
        }

        const pet = CONFIG.pets[petName];
        if (!pet) {
            return { success: false, message: '未知宠物' };
        }

        // 检查要求
        if (pet.requirements.realm) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentRealmIndex = realmNames.indexOf(this.realm);
            const requiredRealmIndex = realmNames.indexOf(pet.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${pet.requirements.realm}` };
            }

            if (currentRealmIndex === requiredRealmIndex && this.level < pet.requirements.level) {
                return { success: false, message: `层级不足，需要${pet.requirements.realm}${pet.requirements.level}层` };
            }
        }

        this.pets[petName] = { level: 1 };
        if (!this.currentPet) {
            this.currentPet = petName;
        }
        this.addLog(`获得了${petName}！`, 'legendary');
        return { success: true, message: `获得了${petName}` };
    }

    // 设置当前宠物
    setCurrentPet(petName) {
        if (!this.pets[petName]) {
            return { success: false, message: '没有此宠物' };
        }

        this.currentPet = petName;
        this.addLog(`出战${petName}`, 'info');
        return { success: true, message: `出战${petName}` };
    }

    // 学习战斗技能
    learnCombatSkill(skillId) {
        const skill = CONFIG.combatSkills[skillId];
        if (!skill) {
            return { success: false, message: '技能不存在' };
        }

        // 检查是否已学会
        if (this.combatSkills[skillId]) {
            return { success: false, message: '已学会此技能' };
        }

        // 检查要求
        if (skill.requirements.realm) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentRealmIndex = realmNames.indexOf(this.realm);
            const requiredRealmIndex = realmNames.indexOf(skill.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${skill.requirements.realm}` };
            }

            if (currentRealmIndex === requiredRealmIndex && this.level < skill.requirements.level) {
                return { success: false, message: `层级不足，需要${skill.requirements.realm}${skill.requirements.level}层` };
            }
        }

        // 学习技能
        this.combatSkills[skillId] = {
            learned: true,
            timesUsed: 0,
            highestDamage: 0
        };

        this.addLog(`学会了战斗技能：${skill.name}！`, 'legendary');
        return { success: true, message: `学会${skill.name}` };
    }

    // 检查技能冷却
    canUseSkill(skillId) {
        const skill = CONFIG.combatSkills[skillId];
        if (!skill || !this.combatSkills[skillId]) {
            return { can: false, message: '未学会此技能' };
        }

        // 检查冷却时间
        if (this.combatSkillCooldowns[skillId]) {
            const cooldownEnd = this.combatSkillCooldowns[skillId];
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
        const realmIndex = Object.keys(CONFIG.realms).indexOf(this.realm);

        for (const [skillId, skill] of Object.entries(CONFIG.combatSkills)) {
            // 检查是否已学会
            if (!this.combatSkills[skillId]) {
                // 检查是否可以学习
                if (skill.requirements.realm) {
                    const reqRealmIndex = Object.keys(CONFIG.realms).indexOf(skill.requirements.realm);
                    if (realmIndex >= reqRealmIndex) {
                        if (realmIndex === reqRealmIndex && this.level >= skill.requirements.level) {
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

    // 获取法宝
    acquireArtifact(artifactId) {
        const artifact = CONFIG.artifacts[artifactId];
        if (!artifact) {
            return { success: false, message: '法宝不存在' };
        }

        // 检查是否已拥有
        const existingArtifact = this.artifacts.find(a => a.id === artifactId);
        if (existingArtifact) {
            // 已拥有，提升等级
            if (existingArtifact.level < existingArtifact.maxLevel) {
                existingArtifact.level++;
                this.addLog(`${artifact.name}升级到${existingArtifact.level}级！`, 'rare');
            } else {
                this.addLog(`${artifact.name}已达到最高级`, 'info');
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
            this.artifacts.push(newArtifact);
            this.addLog(`获得了${artifact.grade}法宝：${artifact.name}！`, 'legendary');
        }

        return { success: true, message: `获得${artifact.name}` };
    }

    // 装备法宝
    equipArtifact(artifactIndex) {
        if (artifactIndex < 0 || artifactIndex >= this.artifacts.length) {
            return { success: false, message: '法宝不存在' };
        }

        const artifact = this.artifacts[artifactIndex];

        // 检查装备要求
        if (artifact.requirements.realm) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentRealmIndex = realmNames.indexOf(this.realm);
            const requiredRealmIndex = realmNames.indexOf(artifact.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                return { success: false, message: `境界不足，需要${artifact.requirements.realm}` };
            }

            if (currentRealmIndex === requiredRealmIndex && this.level < artifact.requirements.level) {
                return { success: false, message: `层级不足，需要${artifact.requirements.realm}${artifact.requirements.level}层` };
            }
        }

        // 卸下当前装备的同类法宝
        const slot = artifact.type;
        if (this.equippedArtifacts[slot]) {
            this.addLog(`卸下了${this.equippedArtifacts[slot].name}`, 'info');
        }

        // 装备新法宝
        this.equippedArtifacts[slot] = artifact;
        this.addLog(`装备了${artifact.name}！`, 'success');

        // 显示属性变化
        const stats = this.calculateArtifactStats(artifact);
        if (stats.attack > 0 || stats.defense > 0 || stats.cultivation > 0) {
            this.addLog(`属性加成：攻击+${stats.attack} 防御+${stats.defense} 修炼+${stats.cultivation}`, 'info');
        }

        return { success: true, message: `装备${artifact.name}成功` };
    }

    // 卸下法宝
    unequipArtifact(slot) {
        if (!this.equippedArtifacts[slot]) {
            return { success: false, message: '该位置没有装备法宝' };
        }

        const artifact = this.equippedArtifacts[slot];
        this.addLog(`卸下了${artifact.name}`, 'info');
        this.equippedArtifacts[slot] = null;

        return { success: true, message: '卸下成功' };
    }

    // 计算法法宝的属性加成
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
        if (artifactIndex < 0 || artifactIndex >= this.artifacts.length) {
            return { success: false, message: '法宝不存在' };
        }

        const artifact = this.artifacts[artifactIndex];
        if (artifact.level >= artifact.maxLevel) {
            return { success: false, message: '法宝已达到最高级' };
        }

        const gradeConfig = CONFIG.artifactEnhancement.successRates[artifact.grade];
        const currentLevel = artifact.level;
        const successRate = Math.max(0.05, gradeConfig.base - (currentLevel - 1) * gradeConfig.decrease);

        // 计算强化费用
        const costConfig = CONFIG.artifactEnhancement.costs[artifact.grade];
        const cost = Math.floor(costConfig.base * Math.pow(costConfig.multiplier, currentLevel - 1));

        if (this.spiritStones < cost) {
            return { success: false, message: `灵石不足，需要${cost}灵石` };
        }

        // 扣除费用
        this.spiritStones -= cost;

        // 强化判定
        if (Math.random() < successRate) {
            artifact.level++;
            this.addLog(`🎉 强化成功！${artifact.name}升级到${artifact.level}级！`, 'legendary');
            return { success: true, message: '强化成功' };
        } else {
            this.addLog(`强化失败！损失${cost}灵石`, 'danger');
            return { success: false, message: '强化失败' };
        }
    }

    // 炼制法宝（简化版）
    craftArtifact(material1, material2, material3) {
        // 检查材料
        const materials = [material1, material2, material3].filter(m => m);
        if (materials.length < 2) {
            return { success: false, message: '至少需要2种材料' };
        }

        // 简化炼制逻辑：基于材料价值决定炼制出的法宝
        const totalValue = materials.reduce((sum, mat) => sum + (CONFIG.artifacts[mat]?.value || 0), 0);

        let resultArtifact = null;
        const random = Math.random();

        if (totalValue > 1000 && random < 0.3) {
            resultArtifact = '青云剑';
        } else if (totalValue > 500 && random < 0.5) {
            resultArtifact = '青霜剑';
        } else if (totalValue > 200 && random < 0.7) {
            resultArtifact = '烈焰环';
        } else {
            resultArtifact = '铁剑';
        }

        if (resultArtifact && CONFIG.artifacts[resultArtifact]) {
            return this.acquireArtifact(resultArtifact);
        }

        return { success: false, message: '炼制失败' };
    }

    // 随机获得法宝
    grantRandomArtifact() {
        // 根据玩家境界决定可以获得的法宝
        const realmIndex = Object.keys(CONFIG.realms).indexOf(this.realm);
        const luck = this.talents.luck + this.talents.fortune;

        // 可选法宝列表（按境界要求过滤）
        const availableArtifacts = Object.entries(CONFIG.artifacts).filter(([id, artifact]) => {
            if (!artifact.requirements || !artifact.requirements.realm) return true;
            const reqRealmIndex = Object.keys(CONFIG.realms).indexOf(artifact.requirements.realm);
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

    // 检查并移除过期buff
    checkBuffs() {
        const now = Date.now();

        if (this.buffs.cultivation.endTime > 0 && now > this.buffs.cultivation.endTime) {
            this.buffs.cultivation.multiplier = 1.0;
            this.buffs.cultivation.endTime = 0;
            this.isMeditating = false;
            this.addLog('修炼加速效果结束，退出入定状态', 'info');
        }

        if (this.buffs.breakthrough.endTime > 0 && now > this.buffs.breakthrough.endTime) {
            this.buffs.breakthrough.bonus = 0.0;
            this.buffs.breakthrough.endTime = 0;
            this.addLog('突破加成效果结束', 'info');
        }

        if (this.buffs.luck && now > this.buffs.luck.endTime) {
            this.buffs.luck = null;
            this.addLog('幸运加成效果结束', 'info');
        }
    }

    // 炼丹
    alchemy() {
        if (this.spiritStones < 100) {
            this.addLog('灵石不足，无法炼丹', 'danger');
            return { success: false, message: '灵石不足' };
        }

        if (this.isAdventuring) {
            this.addLog('历练中无法炼丹！', 'danger');
            return { success: false, message: '历练中无法炼丹' };
        }

        this.spiritStones -= 100;

        // 炼丹有成功率，受悟性和宗门影响
        let successRate = 0.6 + this.talents.wisdom * 0.02;

        // 宗门加成
        if (this.sect !== 'none') {
            const sect = CONFIG.sects.find(s => s.id === this.sect);
            if (sect && sect.benefits.alchemyBonus) {
                successRate += sect.benefits.alchemyBonus;
            }
        }

        if (Math.random() < successRate) {
            const items = ['聚气丹', '聚气丹', '聚气丹', '筑基丹', '洗髓丹', '悟性丹'];
            const result = items[Math.floor(Math.random() * items.length)];
            this.addItem(result);
            this.addLog(`炼丹成功！获得${result}`, 'success');
            return { success: true, message: `炼丹成功！获得${result}` };
        } else {
            this.addLog('炼丹失败，材料浪费了', 'danger');
            return { success: false, message: '炼丹失败' };
        }
    }

    // 处理打坐随机事件
    processMeditationEvent() {
        // 只有在修炼中才触发，每秒有2%的概率
        if (this.isAdventuring || this.isWorking) return; // 特殊状态不打坐

        let eventChance = 0.02;
        eventChance += this.talents.fortune * 0.005;

        if (this.buffs.luck) {
            eventChance += this.buffs.luck.value * 0.002;
        }

        if (Math.random() > eventChance) {
            return null;
        }

        const event = CONFIG.meditationEvents[Math.floor(Math.random() * CONFIG.meditationEvents.length)];

        // 机缘影响事件触发
        if (Math.random() > event.chance + this.talents.fortune * 0.01) {
            return null;
        }

        // 应用事件效果
        switch (event.effect) {
            case 'cultivation_boost':
                const boost = Math.floor(Math.random() * (event.value[1] - event.value[0]) + event.value[0]);
                this.addCultivation(boost);
                this.addLog(`${event.message} (+${boost}修为)`, 'rare');
                break;

            case 'cultivation_loss':
                const loss = Math.floor(Math.random() * (event.value[1] - event.value[0]) + event.value[0]);
                this.cultivation = Math.max(0, this.cultivation - loss);
                this.addLog(`${event.message} (-${loss}修为)`, 'danger');
                break;

            case 'cultivation_bonus':
                const bonus = Math.floor(Math.random() * (event.value[1] - event.value[0]) + event.value[0]);
                this.addCultivation(bonus);
                this.addLog(`${event.message} (+${bonus}修为)`, 'legendary');
                break;

            case 'cultivation_large_bonus':
                const largeBonus = Math.floor(Math.random() * (event.value[1] - event.value[0]) + event.value[0]);
                this.addCultivation(largeBonus);
                this.addLog(`${event.message} (+${largeBonus}修为)`, 'legendary');
                break;

            case 'global_boost':
                this.buffs.cultivation.multiplier = event.value;
                this.buffs.cultivation.endTime = Date.now() + event.duration;
                this.addLog(`${event.message} (修炼速度${event.value}倍，持续${event.duration/1000}秒)`, 'legendary');
                break;

            case 'pet_encounter':
                // 随机遇到一个可以捕捉的宠物
                const availablePets = Object.keys(CONFIG.pets).filter(pet => {
                    const petConfig = CONFIG.pets[pet];
                    const realmNames = Object.keys(CONFIG.realms);
                    const currentRealmIndex = realmNames.indexOf(this.realm);
                    const requiredRealmIndex = realmNames.indexOf(petConfig.requirements.realm);
                    return currentRealmIndex >= requiredRealmIndex && !this.pets[pet];
                });

                if (availablePets.length > 0) {
                    const randomPet = availablePets[Math.floor(Math.random() * availablePets.length)];
                    this.catchPet(randomPet);
                }
                break;

            case 'skill_fragment':
                // 随机获得一个功法碎片
                const availableSkills = Object.keys(CONFIG.skills).filter(skill => {
                    const skillConfig = CONFIG.skills[skill];
                    const realmNames = Object.keys(CONFIG.realms);
                    const currentRealmIndex = realmNames.indexOf(this.realm);
                    const requiredRealmIndex = realmNames.indexOf(skillConfig.requirements.realm);
                    return currentRealmIndex >= requiredRealmIndex && !this.skills[skill];
                });

                if (availableSkills.length > 0) {
                    const randomSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
                    this.learnSkill(randomSkill);
                }
                break;
        }

        return event;
    }

    // 添加日志
    addLog(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        this.logs.unshift({ timestamp, message, type });

        if (this.logs.length > 50) {
            this.logs = this.logs.slice(0, 50);
        }
    }

    // 计算离线进度
    calculateOfflineProgress() {
        const now = Date.now();
        const lastSave = this.lastSaveTime || now;
        const offlineTime = now - lastSave;

        // 最多计算24小时的离线收益
        const maxOfflineTime = 24 * 60 * 60 * 1000;
        const effectiveTime = Math.min(offlineTime, maxOfflineTime);

        if (effectiveTime < 60000) { // 少于1分钟不计算
            return { totalCultivation: 0, timeText: '' };
        }

        // 计算离线期间的修炼
        const offlineHours = effectiveTime / (1000 * 60 * 60);
        const offlineSeconds = effectiveTime / 1000;
        const baseRate = this.calculateBaseCultivationRate();
        const totalCultivation = Math.floor(offlineSeconds * baseRate * 0.5); // 离线效率为50%

        // 格式化时间文本
        let timeText = '';
        if (offlineHours < 1) {
            const minutes = Math.floor(offlineSeconds / 60);
            timeText = `离线${minutes}分钟`;
        } else if (offlineHours < 24) {
            timeText = `离线${offlineHours.toFixed(1)}小时`;
        } else {
            timeText = `离线24小时（已达上限）`;
        }

        return { totalCultivation, timeText };
    }

    // 检查修为状态
    checkCultivationStatus() {
        // 这个方法用于在游戏循环中检查修为状态
        // 主要逻辑已经在 addCultivation 方法中实现
        // 这里可以添加额外的检查逻辑
        if (this.cultivation >= this.maxCultivation && !this.isMeditating && !this.isAdventuring && !this.isWorking) {
            // 修为已满且不在特殊状态中，提醒突破
            if (Math.random() < 0.1) { // 10%概率提醒，避免刷屏
                this.addLog('修为已满，可以突破境界了！', 'rare');
            }
        }
    }

    // 保存游戏
    save() {
        this.lastSaveTime = Date.now();
        SaveManager.save(this.saveSlot, this);
    }

    // 加载游戏
    static load(slot) {
        return SaveManager.load(slot);
    }

    // 重置游戏
    static reset() {
        localStorage.removeItem('xiuxian_character');
        window.location.href = 'character-creation.html';
    }
};

// ==================== 存档管理器 ====================
class SaveManager {
    static MAX_SAVES = 3;
    static SAVE_PREFIX = 'xiuxian_save_';

    static save(slot, data) {
        if (slot < 1 || slot > this.MAX_SAVES) {
            throw new Error('无效的存档槽位');
        }
        localStorage.setItem(this.SAVE_PREFIX + slot, JSON.stringify(data));
    }

    static load(slot) {
        if (slot < 1 || slot > this.MAX_SAVES) {
            throw new Error('无效的存档槽位');
        }
        const saveData = localStorage.getItem(this.SAVE_PREFIX + slot);
        if (!saveData) {
            return null;
        }
        return JSON.parse(saveData);
    }

    static getAllSaves() {
        const saves = [];
        for (let i = 1; i <= this.MAX_SAVES; i++) {
            const saveData = localStorage.getItem(this.SAVE_PREFIX + i);
            if (saveData) {
                try {
                    const parsed = JSON.parse(saveData);
                    saves.push({
                        slot: i,
                        ...parsed
                    });
                } catch (e) {
                    console.error(`存档${i}数据损坏`, e);
                }
            } else {
                saves.push({
                    slot: i,
                    empty: true
                });
            }
        }
        return saves;
    }

    static delete(slot) {
        if (slot < 1 || slot > this.MAX_SAVES) {
            throw new Error('无效的存档槽位');
        }
        localStorage.removeItem(this.SAVE_PREFIX + slot);
    }
}

// ==================== 游戏界面管理 ====================
class GameUI {
    constructor(gameState) {
        this.state = gameState;
        this.updateInterval = null;
        this.saveInterval = null;
    }

    init() {
        try {
            console.log('开始初始化游戏界面...');

            // 检查必要的DOM元素是否存在
            const requiredElements = ['breakthroughBtn', 'meditateBtn', 'adventureBtn', 'currentRealm', 'cultivationBar'];
            for (const elementId of requiredElements) {
                const element = document.getElementById(elementId);
                if (!element) {
                    throw new Error(`必要的DOM元素不存在: ${elementId}`);
                }
            }

            console.log('所有必要元素检查通过');

            this.bindEvents();
            console.log('事件绑定完成');

            // 初始化Toast通知系统
            this.initToastSystem();

            this.updateDisplay();
            console.log('界面更新完成');

            this.startGameLoop();
            console.log('游戏循环已启动');

            // 显示离线奖励
            const offlineProgress = this.state.calculateOfflineProgress();
            if (offlineProgress.totalCultivation > 0) {
                this.state.addCultivation(offlineProgress.totalCultivation);
                this.state.addLog(`${offlineProgress.timeText}，修炼获得${offlineProgress.totalCultivation}修为`, 'success');
            }

            // 检查成就
            this.state.checkRealmAchievement();

            // 更新玩家信息
            this.updateCharacterDisplay();

            console.log('游戏初始化完成');
        } catch (error) {
            console.error('游戏初始化失败:', error);
            alert('游戏初始化失败：' + error.message + '\n请刷新页面重试');
        }
    }

    updateCharacterDisplay() {
        document.getElementById('playerNameDisplay').textContent = this.state.playerName;
        document.getElementById('daoNameDisplay').textContent = this.state.daoName;
    }

    bindEvents() {
        try {
            document.getElementById('breakthroughBtn').addEventListener('click', () => {
                const result = this.state.attemptBreakthrough();
                if (result.needTribulation) {
                    // 需要渡劫
                    if (confirm(result.message + '\n是否开始渡劫？')) {
                        this.showTribulationModal(result.targetRealm);
                    }
                } else {
                    this.updateDisplay();
                    this.state.checkRealmAchievement();
                }
            });

            document.getElementById('meditateBtn').addEventListener('click', () => {
                const result = this.state.startMeditation();
                if (result !== false) {
                    this.updateDisplay();
                }
            });

            document.getElementById('adventureBtn').addEventListener('click', () => {
                const result = this.state.startAdventure();
                if (result !== false) {
                    this.updateDisplay();
                }
            });

            document.getElementById('fightBtn').addEventListener('click', () => {
                this.showFightModal();
            });

            document.getElementById('workBtn').addEventListener('click', () => {
                this.showWorkModal();
            });

            document.getElementById('alchemyBtn').addEventListener('click', () => {
                const result = this.state.alchemy();
                this.updateDisplay();
            });

            document.getElementById('inventoryBtn').addEventListener('click', () => {
                this.showInventory();
            });

            document.getElementById('shopBtn').addEventListener('click', () => {
                this.showShop();
            });

            document.getElementById('sectBtn').addEventListener('click', () => {
                try {
                    this.showSectModal();
                } catch (e) {
                    console.error('显示宗门界面出错:', e);
                    this.state.addLog('宗门界面打开失败：' + e.message, 'danger');
                    this.updateLogs();
                }
            });

            const npcBtn = document.getElementById('npcBtn');
            if (npcBtn) {
                npcBtn.addEventListener('click', () => {
                    try {
                        this.showNPCListModal();
                    } catch (e) {
                        console.error('显示NPC列表出错:', e);
                        this.state.addLog('NPC列表打开失败：' + e.message, 'danger');
                        this.updateLogs();
                    }
                });
            }

            document.getElementById('artifactBtn').addEventListener('click', () => {
                try {
                    this.showArtifactBag();
                } catch (e) {
                    console.error('显示法宝界面出错:', e);
                    this.state.addLog('法宝界面打开失败：' + e.message, 'danger');
                    this.updateLogs();
                }
            });

            document.getElementById('explorationBtn').addEventListener('click', () => {
                try {
                    this.showSecretRealms();
                } catch (e) {
                    console.error('显示秘境界面出错:', e);
                    this.state.addLog('秘境界面打开失败：' + e.message, 'danger');
                    this.updateLogs();
                }
            });

            const questBtn = document.getElementById('questBtn');
            if (questBtn) {
                questBtn.addEventListener('click', () => {
                    try {
                        this.showQuestModal();
                    } catch (e) {
                        console.error('显示任务界面出错:', e);
                        this.state.addLog('任务界面打开失败：' + e.message, 'danger');
                        this.updateLogs();
                    }
                });
            }

            const saveMenuBtn = document.getElementById('saveMenuBtn');
            if (saveMenuBtn) {
                saveMenuBtn.addEventListener('click', () => {
                    try {
                        this.showSaveModal();
                    } catch (e) {
                        console.error('显示存档界面出错:', e);
                        this.state.addLog('存档界面打开失败：' + e.message, 'danger');
                        this.updateLogs();
                    }
                });
            }

            document.getElementById('MainMenuBtn').addEventListener('click', () => {
                if (confirm('确定要返回主菜单吗？未保存的进度将会丢失！')) {
                    this.state.save();
                    window.location.href = 'character-creation.html';
                }
            });

            document.getElementById('clearLogBtn').addEventListener('click', () => {
                this.state.logs = [];
                this.updateLogs();
            });

            document.getElementById('closeModalBtn').addEventListener('click', () => {
                document.getElementById('gameModal').classList.remove('active');
            });

            // 添加ESC键关闭模态框功能
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const modal = document.getElementById('gameModal');
                    if (modal && modal.classList.contains('active')) {
                        modal.classList.remove('active');
                    }
                }
            });

            // 添加点击模态框背景关闭功能
            const modal = document.getElementById('gameModal');
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });

            console.log('所有按钮事件绑定完成');
        } catch (error) {
            console.error('按钮事件绑定错误:', error);
            alert('按钮事件绑定失败：' + error.message);
        }
    }

    // ==================== 存档管理界面 ====================

    showSaveModal() {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = '┌─── 存 档 管 理 ───┐';

        const allSaves = SaveManager.getAllSaves();
        const currentSlot = this.state.saveSlot;

        let html = `
            <div class="save-management-container">
                <div class="save-info">
                    <div style="color: var(--text-secondary); font-size: 12px; margin-bottom: 15px;">
                        💾 存档存储在浏览器中，清除浏览器数据会丢失存档！<br>
                        ⬇️ 建议定期导出存档备份
                    </div>
                </div>

                <div class="save-slots">
        `;

        allSaves.forEach(save => {
            const isEmpty = save.empty;
            const isCurrent = save.slot === currentSlot;

            html += `
                <div class="save-slot-card ${isCurrent ? 'current-slot' : ''}" data-slot="${save.slot}">
                    <div class="slot-header">
                        <div class="slot-title">存档槽位 ${save.slot}</div>
                        ${isCurrent ? '<div class="current-badge">当前</div>' : ''}
                    </div>
            `;

            if (isEmpty) {
                html += `
                    <div class="slot-empty">
                        <div class="empty-text">空槽位</div>
                        <div class="save-action">
                            <button class="action-btn save-to-slot-btn" data-slot="${save.slot}">[保存到此处]</button>
                        </div>
                    </div>
                `;
            } else {
                const saveDate = save.lastSaveTime ? new Date(save.lastSaveTime).toLocaleString('zh-CN') : '未知';
                html += `
                    <div class="slot-content">
                        <div class="player-info">
                            <div class="info-name">${save.playerName || '未知'}</div>
                            <div class="info-details">
                                <div>道号：${save.daoName || '无'}</div>
                                <div>境界：${save.realm || '未知'} ${save.level || 0}层</div>
                                <div>灵石：${save.spiritStones || 0}</div>
                                <div>保存时间：${saveDate}</div>
                            </div>
                        </div>
                        <div class="slot-actions">
                            <button class="action-btn load-save-btn" data-slot="${save.slot}">[加载]</button>
                            <button class="action-btn save-to-slot-btn" data-slot="${save.slot}">[覆盖]</button>
                            <button class="action-btn export-save-btn" data-slot="${save.slot}">[导出]</button>
                            <button class="action-btn danger delete-save-btn" data-slot="${save.slot}">[删除]</button>
                        </div>
                    </div>
                `;
            }

            html += `</div>`;
        });

        html += `
                </div>

                <div class="save-global-actions">
                    <div class="action-section-title">批量操作</div>
                    <button class="action-btn export-all-btn" id="exportAllBtn">[导出所有存档]</button>
                    <button class="action-btn import-save-btn" id="importSaveBtn">[导入存档]</button>
                    <input type="file" id="importFileInput" accept=".json" style="display: none;">
                </div>
            </div>
        `;

        modalBody.innerHTML = html;

        // 绑定保存按钮事件
        modalBody.querySelectorAll('.save-to-slot-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const slot = parseInt(btn.getAttribute('data-slot'));
                this.state.saveSlot = slot;
                this.state.save();
                this.state.addLog(`已保存到槽位${slot}`, 'success');
                this.showSaveModal(); // 刷新界面
                this.updateDisplay();
            });
        });

        // 绑定加载按钮事件
        modalBody.querySelectorAll('.load-save-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const slot = parseInt(btn.getAttribute('data-slot'));
                if (confirm(`确定要加载槽位${slot}的存档吗？当前进度将丢失！`)) {
                    const loadedState = SaveManager.load(slot);
                    if (loadedState) {
                        window.location.reload(); // 重新加载页面应用新存档
                    } else {
                        alert('存档加载失败');
                    }
                }
            });
        });

        // 绑定删除按钮事件
        modalBody.querySelectorAll('.delete-save-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const slot = parseInt(btn.getAttribute('data-slot'));
                if (confirm(`确定要删除槽位${slot}的存档吗？此操作不可恢复！`)) {
                    SaveManager.delete(slot);
                    this.state.addLog(`槽位${slot}存档已删除`, 'info');
                    this.showSaveModal(); // 刷新界面
                }
            });
        });

        // 绑定导出单个存档按钮
        modalBody.querySelectorAll('.export-save-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const slot = parseInt(btn.getAttribute('data-slot'));
                this.exportSingleSave(slot);
            });
        });

        // 绑定导出所有存档按钮
        const exportAllBtn = modalBody.querySelector('#exportAllBtn');
        if (exportAllBtn) {
            exportAllBtn.addEventListener('click', () => {
                this.exportAllSaves();
            });
        }

        // 绑定导入存档按钮
        const importBtn = modalBody.querySelector('#importSaveBtn');
        const fileInput = modalBody.querySelector('#importFileInput');
        if (importBtn && fileInput) {
            importBtn.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.importSave(file);
                }
            });
        }

        modal.classList.add('active');
    }

    // 导出单个存档
    exportSingleSave(slot) {
        const saveData = SaveManager.load(slot);
        if (!saveData) {
            alert('存档不存在');
            return;
        }

        const dataStr = JSON.stringify(saveData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `xiuxian_save_slot${slot}_${new Date().toISOString().slice(0, 10)}.json`;
        link.click();

        URL.revokeObjectURL(url);
        this.state.addLog(`槽位${slot}存档已导出`, 'success');
    }

    // 导出所有存档
    exportAllSaves() {
        const allSaves = {
            exportDate: new Date().toISOString(),
            exportVersion: '2.0',
            saves: {}
        };

        for (let i = 1; i <= SaveManager.MAX_SAVES; i++) {
            const saveData = SaveManager.load(i);
            if (saveData) {
                allSaves.saves[i] = saveData;
            }
        }

        const dataStr = JSON.stringify(allSaves, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `xiuxian_all_saves_${new Date().toISOString().slice(0, 10)}.json`;
        link.click();

        URL.revokeObjectURL(url);
        this.state.addLog('所有存档已导出', 'success');
    }

    // 导入存档
    importSave(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                // 检查是单个存档还是批量存档
                if (data.saves) {
                    // 批量存档
                    let importCount = 0;
                    for (const [slot, saveData] of Object.entries(data.saves)) {
                        SaveManager.save(parseInt(slot), saveData);
                        importCount++;
                    }
                    alert(`成功导入${importCount}个存档！`);
                    this.state.addLog(`成功导入${importCount}个存档`, 'success');
                } else if (data.playerName) {
                    // 单个存档
                    const slot = data.saveSlot || 1;
                    SaveManager.save(slot, data);
                    alert(`存档已导入到槽位${slot}！`);
                    this.state.addLog(`存档已导入到槽位${slot}`, 'success');
                } else {
                    alert('存档格式不正确');
                }

                this.showSaveModal(); // 刷新界面

            } catch (error) {
                alert('存档导入失败：' + error.message);
                console.error('存档导入错误:', error);
            }
        };

        reader.readAsText(file);
    }

    showInventory() {
        const modal = document.getElementById('gameModal');
        const modalHeader = document.getElementById('modalHeader');
        const modalBody = document.getElementById('modalBody');

        modalHeader.querySelector('pre').textContent = '┌─── 背 包 ───┐';

        let content = '<div class="item-list">';

        const items = Object.keys(this.state.inventory);
        if (items.length === 0) {
            content = '<div style="text-align: center; color: var(--text-secondary);">背包为空</div>';
        } else {
            for (const itemName of items) {
                const count = this.state.inventory[itemName];
                const item = CONFIG.items[itemName];

                content += `
                    <div class="item-card" data-item="${itemName}">
                        <div class="card-name">${itemName} x${count}</div>
                        <div class="card-description">${item.description}</div>
                        <div class="card-effect">点击使用</div>
                    </div>
                `;
            }
        }

        content += '</div>';
        modalBody.innerHTML = content;

        // 添加点击事件
        modalBody.querySelectorAll('.item-card').forEach(card => {
            card.addEventListener('click', () => {
                const itemName = card.getAttribute('data-item');
                const result = this.state.useItem(itemName);
                this.state.addLog(result.message, result.success ? 'success' : 'info');
                this.updateDisplay();
                modal.classList.remove('active');
            });
        });

        modal.classList.add('active');
    }

    showShop() {
        const modal = document.getElementById('gameModal');
        const modalHeader = document.getElementById('modalHeader');
        const modalBody = document.getElementById('modalBody');

        modalHeader.querySelector('pre').textContent = '┌─── 商 店 ───┐';

        let content = '<div style="display: flex; flex-direction: column; gap: 20px;">';

        // 物品区域
        content += '<div>';
        content += '<h4 style="color: var(--accent-color); margin-bottom: 10px;">丹药和物品</h4>';
        content += '<div class="item-list">';

        for (const [itemName, item] of Object.entries(CONFIG.items)) {
            content += `
                <div class="item-card" data-item="${itemName}" data-type="item">
                    <div class="card-name">${itemName}</div>
                    <div class="card-description">${item.description}</div>
                    <div class="card-stats">
                        <span>价格: ${item.price}灵石</span>
                    </div>
                </div>
            `;
        }

        content += '</div></div>';

        // 法宝区域
        content += '<div>';
        content += '<h4 style="color: var(--accent-color); margin-bottom: 10px;">法宝</h4>';
        content += '<div class="item-list">';

        // 根据玩家境界显示可购买的法宝
        const realmIndex = Object.keys(CONFIG.realms).indexOf(this.state.realm);
        const availableArtifacts = Object.entries(CONFIG.artifacts).filter(([id, artifact]) => {
            if (!artifact.price) return false; // 没有价格的不在商店出售
            if (!artifact.requirements || !artifact.requirements.realm) return true;
            const reqRealmIndex = Object.keys(CONFIG.realms).indexOf(artifact.requirements.realm);
            return realmIndex >= reqRealmIndex;
        });

        if (availableArtifacts.length === 0) {
            content += '<div style="color: var(--text-secondary); padding: 10px;">暂无可购买的法宝</div>';
        } else {
            for (const [artifactId, artifact] of availableArtifacts) {
                content += `
                    <div class="item-card" data-item="${artifactId}" data-type="artifact">
                        <div class="card-name" style="color: ${this.getGradeColor(artifact.grade)}">[${artifact.grade}] ${artifact.name}</div>
                        <div class="card-description">${artifact.description || '一件神秘法宝'}</div>
                        <div class="card-stats">
                            <span>价格: ${artifact.price}灵石</span>
                        </div>
                    </div>
                `;
            }
        }

        content += '</div></div></div>';
        modalBody.innerHTML = content;

        // 添加点击事件
        modalBody.querySelectorAll('.item-card').forEach(card => {
            card.addEventListener('click', () => {
                const itemName = card.getAttribute('data-item');
                const type = card.getAttribute('data-type');

                if (type === 'item') {
                    const item = CONFIG.items[itemName];
                    if (this.state.spiritStones >= item.price) {
                        this.state.spiritStones -= item.price;
                        this.state.addItem(itemName);
                        this.state.addLog(`购买了${itemName}`, 'success');
                        this.updateDisplay();
                        modal.classList.remove('active');
                    } else {
                        alert('灵石不足');
                    }
                } else if (type === 'artifact') {
                    const artifact = CONFIG.artifacts[itemName];
                    if (this.state.spiritStones >= artifact.price) {
                        this.state.spiritStones -= artifact.price;
                        const result = this.state.acquireArtifact(itemName);
                        this.state.addLog(result.message, 'success');
                        this.updateDisplay();
                        modal.classList.remove('active');
                    } else {
                        alert('灵石不足');
                    }
                }
            });
        });

        modal.classList.add('active');
    }

    showArtifactBag() {
        const modal = document.getElementById('gameModal');
        const modalHeader = document.getElementById('modalHeader');
        const modalBody = document.getElementById('modalBody');

        modalHeader.querySelector('pre').textContent = '┌─── 法 宝 背 包 ───┐';

        // 如果没有法宝，显示提示信息
        if (this.state.artifacts.length === 0) {
            modalBody.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <div style="font-size: 16px; margin-bottom: 10px;">暂无法宝</div>
                    <div style="font-size: 12px;">通过历练、炼丹或商店可获得法宝</div>
                </div>
            `;
            modal.classList.add('active');
            return;
        }

        // 显示已装备的法宝
        let equippedHtml = '<div style="margin-bottom: 20px;">';
        equippedHtml += '<h4 style="color: var(--accent-color); margin-bottom: 10px;">已装备法宝</h4>';

        const slots = ['weapon', 'armor', 'accessory', 'special'];
        const slotNames = { weapon: '武器', armor: '护甲', accessory: '饰品', special: '特殊' };
        let hasEquipped = false;

        for (const slot of slots) {
            const artifact = this.state.equippedArtifacts[slot];
            if (artifact) {
                hasEquipped = true;
                const stats = this.state.calculateArtifactStats(artifact);
                equippedHtml += `
                    <div class="artifact-card-equipped" style="background: var(--bg-color); border: 1px solid var(--border-color); padding: 12px; margin-bottom: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="color: ${this.getGradeColor(artifact.grade)}; font-weight: bold; font-size: 14px;">[${artifact.grade}] ${artifact.name}</div>
                                <div style="font-size: 11px; color: var(--text-secondary); margin: 3px 0;">${slotNames[slot]} | ${artifact.level}级</div>
                                <div style="font-size: 10px; color: var(--text-primary);">
                                    ${stats.attack > 0 ? `攻击+${stats.attack} ` : ''}
                                    ${stats.defense > 0 ? `防御+${stats.defense} ` : ''}
                                    ${stats.cultivation > 0 ? `修炼+${stats.cultivation.toFixed(1)}` : ''}
                                </div>
                                ${artifact.specialEffect ? `<div style="font-size: 10px; color: var(--rare-color);">${artifact.specialEffect}</div>` : ''}
                            </div>
                            <button class="unequip-btn" data-slot="${slot}" style="padding: 4px 8px; font-size: 11px; cursor: pointer;">[卸下]</button>
                        </div>
                    </div>
                `;
            }
        }

        if (!hasEquipped) {
            equippedHtml += '<div style="color: var(--text-secondary); font-size: 12px; padding: 10px;">未装备任何法宝</div>';
        }
        equippedHtml += '</div>';

        // 显示所有法宝
        let allArtifactsHtml = '<div>';
        allArtifactsHtml += '<h4 style="color: var(--accent-color); margin-bottom: 10px;">所有法宝</h4>';

        for (let i = 0; i < this.state.artifacts.length; i++) {
            const artifact = this.state.artifacts[i];
            const stats = this.state.calculateArtifactStats(artifact);
            const isEquipped = Object.values(this.state.equippedArtifacts).some(a => a && a.id === artifact.id);

            allArtifactsHtml += `
                <div class="artifact-card" data-artifact-index="${i}" style="background: var(--bg-color); border: 1px solid ${isEquipped ? 'var(--success-color)' : 'var(--border-color)'}; padding: 12px; margin-bottom: 8px; cursor: pointer;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: ${this.getGradeColor(artifact.grade)}; font-weight: bold; font-size: 14px;">[${artifact.grade}] ${artifact.name}</div>
                            <div style="font-size: 11px; color: var(--text-secondary); margin: 3px 0;">${slotNames[artifact.type]} | ${artifact.level}/${artifact.maxLevel}级 ${isEquipped ? '<span style="color: var(--success-color);">[已装备]</span>' : ''}</div>
                            <div style="font-size: 10px; color: var(--text-primary);">
                                ${stats.attack > 0 ? `攻击+${stats.attack} ` : ''}
                                ${stats.defense > 0 ? `防御+${stats.defense} ` : ''}
                                ${stats.cultivation > 0 ? `修炼+${stats.cultivation.toFixed(1)}` : ''}
                            </div>
                            ${artifact.specialEffect ? `<div style="font-size: 10px; color: var(--rare-color);">${artifact.specialEffect}</div>` : ''}
                            ${artifact.description ? `<div style="font-size: 10px; color: var(--text-secondary); margin-top: 3px;">${artifact.description}</div>` : ''}
                        </div>
                        <div style="display: flex; gap: 5px;">
                            ${!isEquipped ? `<button class="equip-btn" data-index="${i}" style="padding: 4px 8px; font-size: 11px; cursor: pointer;">[装备]</button>` : ''}
                            ${artifact.level < artifact.maxLevel ? `<button class="enhance-btn" data-index="${i}" style="padding: 4px 8px; font-size: 11px; cursor: pointer;">[强化]</button>` : '<span style="font-size: 10px; color: var(--text-secondary);">已满级</span>'}
                        </div>
                    </div>
                </div>
            `;
        }

        allArtifactsHtml += '</div>';

        modalBody.innerHTML = equippedHtml + allArtifactsHtml;

        // 添加卸下按钮事件
        modalBody.querySelectorAll('.unequip-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const slot = btn.getAttribute('data-slot');
                const result = this.state.unequipArtifact(slot);
                if (result.success) {
                    this.state.addLog(result.message, 'success');
                    this.showArtifactBag(); // 刷新界面
                    this.updateDisplay();
                }
            });
        });

        // 添加装备按钮事件
        modalBody.querySelectorAll('.equip-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.getAttribute('data-index'));
                const result = this.state.equipArtifact(index);
                if (result.success) {
                    this.state.addLog(result.message, 'success');
                    this.showArtifactBag(); // 刷新界面
                    this.updateDisplay();
                } else {
                    alert(result.message);
                }
            });
        });

        // 添加强化按钮事件
        modalBody.querySelectorAll('.enhance-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.getAttribute('data-index'));
                const artifact = this.state.artifacts[index];
                const cost = artifact.level * 500;

                if (this.state.spiritStones < cost) {
                    alert(`灵石不足，需要${cost}灵石`);
                    return;
                }

                if (confirm(`消耗${cost}灵石强化${artifact.name}？\n强化成功率：${this.state.calculateEnhancementSuccessRate(artifact.level).toFixed(0)}%`)) {
                    const result = this.state.enhanceArtifact(index);
                    if (result.success) {
                        this.state.addLog(result.message, 'success');
                    } else {
                        this.state.addLog(result.message, 'danger');
                        alert(result.message);
                    }
                    this.showArtifactBag(); // 刷新界面
                    this.updateDisplay();
                }
            });
        });

        modal.classList.add('active');
    }

    getGradeColor(grade) {
        const colors = {
            '凡品': '#e0e0e0',
            '灵品': '#00ff00',
            '仙品': '#9400d3',
            '神品': '#ffd700',
            '圣品': '#ff0000'
        };
        return colors[grade] || '#e0e0e0';
    }

    showSecretRealms() {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = '┌─── 秘 境 探 索 ───┐';

        let content = '<div class="secret-realms-list">';

        // 根据玩家境界过滤可探索的秘境
        const realmIndex = Object.keys(CONFIG.realms).indexOf(this.state.realm);
        const availableRealms = CONFIG.secretRealms.filter(realm => {
            if (!realm.requirements || !realm.requirements.realm) return true;
            const reqRealmIndex = Object.keys(CONFIG.realms).indexOf(realm.requirements.realm);
            return realmIndex >= reqRealmIndex;
        });

        if (availableRealms.length === 0) {
            content = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);">暂无可探索的秘境</div>';
        } else {
            for (const realm of availableRealms) {
                const difficultyStars = '⭐'.repeat(realm.difficulty);
                const canAfford = !realm.cost || this.state.spiritStones >= (realm.cost.spiritStones || 0);

                content += `
                    <div class="realm-card" data-realm-id="${realm.id}" style="background: var(--bg-color); border: 1px solid var(--border-color); padding: 15px; margin-bottom: 15px; cursor: pointer; ${!canAfford ? 'opacity: 0.5;' : ''}">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div style="flex: 1;">
                                <div style="color: var(--legendary-color); font-weight: bold; font-size: 16px; margin-bottom: 5px;">${realm.name}</div>
                                <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">${realm.description}</div>
                                <div style="font-size: 11px; color: var(--text-primary); margin-bottom: 3px;">
                                    <span style="color: var(--warning-color);">难度：</span>${difficultyStars} (${realm.difficulty}/5)
                                </div>
                                <div style="font-size: 11px; color: var(--text-primary); margin-bottom: 3px;">
                                    <span style="color: var(--accent-color);">耗时：</span>${realm.duration / 1000}秒
                                </div>
                                <div style="font-size: 11px; color: var(--text-primary); margin-bottom: 3px;">
                                    <span style="color: var(--danger-color);">风险：</span>${(realm.risk * 100).toFixed(0)}%
                                </div>
                                ${realm.cost ? `<div style="font-size: 11px; color: ${canAfford ? 'var(--success-color)' : 'var(--danger-color)'}; margin-bottom: 3px;">消耗：${realm.cost.spiritStones}灵石</div>` : ''}
                                ${realm.requirements.realm ? `<div style="font-size: 11px; color: var(--text-secondary);">要求：${realm.requirements.realm} ${realm.requirements.level || ''}层</div>` : ''}
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 10px; color: var(--text-secondary); margin-bottom: 5px;">${this.getRealmTypeText(realm.type)}</div>
                                ${canAfford ? '<div style="color: var(--success-color); font-size: 11px;">[可探索]</div>' : '<div style="color: var(--danger-color); font-size: 11px;">[灵石不足]</div>'}
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        content += '</div>';

        // 添加说明信息
        content += `
            <div style="margin-top: 20px; padding: 15px; background: rgba(0, 255, 0, 0.05); border: 1px solid var(--border-color); font-size: 11px; color: var(--text-secondary);">
                <div style="color: var(--accent-color); font-weight: bold; margin-bottom: 8px;">💡 探索说明</div>
                <div>• 秘境探索有风险，可能获得丰厚奖励或受到惩罚</div>
                <div>• 幸运值会影响探索结果，建议幸运值较高时探索高难度秘境</div>
                <div>• 探索期间无法进行其他活动</div>
                <div>• 高难度秘境有概率获得稀有法宝</div>
            </div>
        `;

        modalBody.innerHTML = content;

        // 添加点击事件
        modalBody.querySelectorAll('.realm-card').forEach(card => {
            card.addEventListener('click', () => {
                const realmId = card.getAttribute('data-realm-id');
                const result = this.state.startExploration(realmId);
                if (result) {
                    modal.classList.remove('active');
                }
            });
        });

        modal.classList.add('active');
    }

    getRealmTypeText(type) {
        const types = {
            'exploration': '🗺️ 探索',
            'combat': '⚔️ 战斗',
            'gathering': '⛏️ 采集',
            'puzzle': '🧩 解谜',
            'challenge': '🔥 挑战'
        };
        return types[type] || type;
    }

    // 初始化Toast通知系统
    initToastSystem() {
        // 创建Toast容器
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(toastContainer);
    }

    // 显示Toast通知
    showToast(message, type = 'info', duration = 3000) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        const colors = {
            'info': 'var(--accent-color)',
            'success': 'var(--success-color)',
            'warning': 'var(--warning-color)',
            'danger': 'var(--danger-color)',
            'rare': 'var(--rare-color)',
            'legendary': 'var(--legendary-color)'
        };

        toast.style.cssText = `
            background: var(--panel-bg);
            border: 1px solid ${colors[type] || colors.info};
            border-left: 4px solid ${colors[type] || colors.info};
            padding: 12px 16px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            pointer-events: auto;
            min-width: 250px;
            max-width: 400px;
            animation: slideIn 0.3s ease;
            color: var(--text-primary);
            font-size: 14px;
        `;

        toast.innerHTML = `
            <div style="font-weight: bold; color: ${colors[type] || colors.info}; margin-bottom: 4px;">
                ${this.getToastTitle(type)}
            </div>
            <div style="white-space: pre-wrap;">${message}</div>
        `;

        toastContainer.appendChild(toast);

        // 自动移除
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    getToastTitle(type) {
        const titles = {
            'info': '📢 提示',
            'success': '✅ 成功',
            'warning': '⚠️ 警告',
            'danger': '❌ 错误',
            'rare': '💎 稀有',
            'legendary': '🌟 传说'
        };
        return titles[type] || '📢 提示';
    }

    showSectModal() {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        if (this.state.sect === 'none') {
            // 显示可加入的宗门列表
            modalHeader.querySelector('pre').textContent = '┌─── 加 入 宗 门 ───┐';

            let html = '<div class="sect-list">';

            for (const sect of CONFIG.sects) {
                if (sect.id === 'none') continue;

                html += `
                    <div class="sect-item" data-sect-id="${sect.id}">
                        <div class="sect-name">${sect.name}</div>
                        <div class="sect-description">${sect.description}</div>
                        <div class="sect-requirements">
                            要求: ${sect.requirements.realm || '无'} ${sect.requirements.level || ''} |
                            加入费用: ${sect.joinCost}灵石
                        </div>
                    </div>
                `;
            }

            html += '</div>';
            modalBody.innerHTML = html;

            // 添加点击事件
            modalBody.querySelectorAll('.sect-item').forEach(item => {
                item.addEventListener('click', () => {
                    const sectId = item.getAttribute('data-sect-id');
                    const result = this.state.joinSect(sectId);
                    if (result.success) {
                        modal.classList.remove('active');
                        this.updateDisplay();
                    } else {
                        alert(result.message);
                    }
                });
            });
        } else {
            // 显示当前宗门功能界面
            const sect = CONFIG.sects.find(s => s.id === this.state.sect);

            modalHeader.querySelector('pre').textContent = `┌─── ${sect.name} ───┐`;

            let benefitsText = '';
            for (const [key, value] of Object.entries(sect.benefits)) {
                if (typeof value === 'number') {
                    benefitsText += `${key}: +${(value * 100).toFixed(0)}% `;
                }
            }

            modalBody.innerHTML = `
                <div class="sect-tabs">
                    <button class="sect-tab active" data-tab="info">宗门信息</button>
                    <button class="sect-tab" data-tab="tasks">宗门任务</button>
                    <button class="sect-tab" data-tab="shop">宗门商店</button>
                </div>

                <div class="sect-tab-content" id="tabInfo">
                    <div class="sect-info-display">
                        <strong>宗门：</strong>${sect.name}<br>
                        <strong>身份：</strong><span style="color: var(--legendary-color)">${this.state.sectRank}</span><br>
                        <strong>贡献度：</strong>${this.state.sectContribution}<br>
                        <strong>声望：</strong>${this.state.sectReputation}<br>
                        <strong>身份加成：</strong>任务奖励${(this.state.getSectRankBonus().taskBonus * 100).toFixed(0)}%，商店折扣${(this.state.getSectRankBonus().shopDiscount * 100).toFixed(0)}%<br>
                        <strong>宗门加成：</strong>${benefitsText || '无特殊加成'}<br>
                        <strong>宗门特色：</strong>${sect.specialFeatures ? sect.specialFeatures.join('、') : '无'}
                    </div>
                    <div class="sect-actions">
                        <button class="sect-action-btn" id="contributeBtn">[贡献灵石(100)]</button>
                        <button class="sect-action-btn" id="reputationBtn">[增加声望]</button>
                        <button class="sect-action-btn danger" id="leaveSectBtn">[退出宗门]</button>
                    </div>
                </div>

                <div class="sect-tab-content" id="tabTasks" style="display: none;">
                    <div class="sect-tasks-list"></div>
                </div>

                <div class="sect-tab-content" id="tabShop" style="display: none;">
                    <div class="sect-shop-content">
                        <div class="shop-section">
                            <h4>功法</h4>
                            <div class="shop-items-list" id="shopSkills"></div>
                        </div>
                        <div class="shop-section">
                            <h4>物品</h4>
                            <div class="shop-items-list" id="shopItems"></div>
                        </div>
                    </div>
                </div>
 `;

            // 宗门信息按钮
            document.getElementById('contributeBtn').addEventListener('click', () => {
                if (this.state.spiritStones >= 100) {
                    this.state.spiritStones -= 100;
                    this.state.sectContribution += 100;
                    this.state.addLog('向宗门贡献了100灵石，获得100贡献度', 'success');
                    // 检查是否可以升级
                    this.state.checkSectRankPromotion();
                    this.updateDisplay();
                    this.showSectModal();
                } else {
                    alert('灵石不足');
                }
            });

            document.getElementById('reputationBtn').addEventListener('click', () => {
                const options = [
                    '帮助宗门击退妖兽入侵',
                    '捐献稀有丹药',
                    '传授宗门功法',
                    '外出为宗门扬名'
                ];
                const choice = prompt('选择增加声望的方式：\n' + options.map((o, i) => `${i+1}. ${o}`).join('\n'));

                if (choice && choice >= 1 && choice <= options.length) {
                    const reputationGain = Math.floor(Math.random() * 20 + 10);
                    this.state.sectReputation += reputationGain;
                    this.state.addLog(`通过${options[choice-1]}获得了${reputationGain}声望！`, 'rare');
                    this.updateDisplay();
                    this.showSectModal();
                }
            });

            document.getElementById('leaveSectBtn').addEventListener('click', () => {
                const currentSect = CONFIG.sects.find(s => s.id === this.state.sect);
                const currentRank = this.state.sectRank;
                const contribution = this.state.sectContribution;
                const reputation = this.state.sectReputation;

                const warningMessage = `【警告】退出宗门的严重后果：\n\n` +
                    `当前宗门：${currentSect ? currentSect.name : '无'}\n` +
                    `当前身份：${currentRank}\n` +
                    `贡献度：${contribution}\n` +
                    `声望：${reputation}\n\n` +
                    `退出后将失去：\n` +
                    `• 所有贡献度（${contribution}）\n` +
                    `• 所有声望（${reputation}）\n` +
                    `• 宗门身份（回到外门弟子）\n` +
                    `• 宗门加成效果\n` +
                    `• 宗门商店购买权限\n\n` +
                    `此操作不可逆！确定要退出吗？`;

                if (confirm(warningMessage)) {
                    this.state.sect = 'none';
                    this.state.sectContribution = 0;
                    this.state.sectReputation = 0;
                    this.state.sectRank = '外门弟子';
                    this.state.addLog(`退出了${currentSect ? currentSect.name : ''}，失去所有贡献和声望`, 'danger');
                    modal.classList.remove('active');
                    this.updateDisplay();
                }
            });

            // 宗门任务列表
            const tasksList = modalBody.querySelector('.sect-tasks-list');
            const rankBonus = this.state.getSectRankBonus();

            for (const task of CONFIG.sectTasks) {
                // 检查任务要求和权限
                let canDo = true;
                let requirementText = '';
                let lockedReason = '';

                // 检查基础要求
                if (task.requirements.minRealm) {
                    const realmNames = Object.keys(CONFIG.realms);
                    const currentRealmIndex = realmNames.indexOf(this.state.realm);
                    const requiredRealmIndex = realmNames.indexOf(task.requirements.minRealm);
                    if (currentRealmIndex < requiredRealmIndex) {
                        canDo = false;
                        requirementText = `需要${task.requirements.minRealm}`;
                    }
                }

                if (task.requirements.minLevel && this.state.level < task.requirements.minLevel) {
                    canDo = false;
                    requirementText = `需要${task.requirements.minLevel}层`;
                }

                // 根据任务名称确定权限等级
                let requiredRank = '外门弟子';
                if (task.name.includes('精英') || task.name.includes('长老')) {
                    requiredRank = '核心弟子';
                } else if (task.name.includes('功法研究')) {
                    requiredRank = '内门弟子';
                }

                const hasPermission = this.state.hasSectPermission('all') ||
                    (requiredRank === '外门弟子' && this.state.hasSectPermission('basic_tasks')) ||
                    (requiredRank === '内门弟子' && this.state.hasSectPermission('intermediate_tasks')) ||
                    (requiredRank === '核心弟子' && this.state.hasSectPermission('advanced_tasks'));

                if (!hasPermission) {
                    lockedReason = `需要${requiredRank}身份`;
                }

                const taskDiv = document.createElement('div');
                taskDiv.className = 'task-item';

                if (canDo && hasPermission) {
                    // 可执行的任务
                    const expReward = task.experienceReward ? `${task.experienceReward[0]}-${task.experienceReward[1]}修为` : '';

                    taskDiv.innerHTML = `
                        <div class="task-name">${task.name}</div>
                        <div class="task-description">${task.description}</div>
                        <div class="task-duration">时长: ${task.duration/1000}秒</div>
                        <div class="task-rewards">
                            奖励: ${task.contributionReward[0]}-${task.contributionReward[1]}贡献×${rankBonus.taskBonus.toFixed(1)}
                        </div>
                        <div class="task-rewards">
                            ${task.spiritStonesReward[0]}-${task.spiritStonesReward[1]}灵石
                            ${expReward ? '| ' + expReward : ''}
                        </div>
                        ${task.specialReward ? `<div class="task-bonus">${task.specialReward}</div>` : ''}
                        <button class="task-btn" data-task="${task.id}">[执行]</button>
                    `;

                    taskDiv.querySelector('.task-btn').addEventListener('click', () => {
                        const result = this.state.doSectTask(task.id);
                        if (result.success) {
                            modal.classList.remove('active');
                        } else {
                            alert(result.message);
                        }
                    });
                } else {
                    // 锁定的任务
                    const reason = lockedReason || requirementText || '条件不足';
                    taskDiv.style.opacity = '0.6';
                    taskDiv.style.cursor = 'not-allowed';
                    taskDiv.innerHTML = `
                        <div class="task-name">${task.name} 🔒</div>
                        <div class="task-description">${task.description}</div>
                        <div class="task-bonus" style="color: var(--danger-color)">${reason}</div>
                    `;
                }

                tasksList.appendChild(taskDiv);
            }

            // 宗门商店
            const shopSkills = modalBody.querySelector('#shopSkills');
            const shopItems = modalBody.querySelector('#shopItems');

            // 功法
            for (const skill of CONFIG.sectShop.skills) {
                let canBuy = true;
                if (skill.requirements.minRealm) {
                    const realmNames = Object.keys(CONFIG.realms);
                    const currentRealmIndex = realmNames.indexOf(this.state.realm);
                    const requiredRealmIndex = realmNames.indexOf(skill.requirements.minRealm);
                    if (currentRealmIndex < requiredRealmIndex) {
                        canBuy = false;
                    }
                }

                if (skill.requirements.sect && this.state.sect !== skill.requirements.sect) {
                    canBuy = false;
                }

                const skillDiv = document.createElement('div');
                skillDiv.className = 'shop-item';
                skillDiv.innerHTML = `
                    <div class="shop-item-name">${skill.name}</div>
                    <div class="shop-item-price">${skill.price} ${skill.currency === 'spiritStones' ? '灵石' : '贡献'}</div>
                `;

                if (canBuy) {
                    skillDiv.addEventListener('click', () => {
                        const result = this.state.buyFromSectShop('skills', skill.name);
                        if (result.success) {
                            this.state.addLog(result.message, 'success');
                            this.updateDisplay();
                            modal.classList.remove('active');
                        } else {
                            alert(result.message);
                        }
                    });
                }

                shopSkills.appendChild(skillDiv);
            }

            // 物品
            for (const item of CONFIG.sectShop.items) {
                let canBuy = true;
                if (item.requirements.minRealm) {
                    const realmNames = Object.keys(CONFIG.realms);
                    const currentRealmIndex = realmNames.indexOf(this.state.realm);
                    const requiredRealmIndex = realmNames.indexOf(item.requirements.minRealm);
                    if (currentRealmIndex < requiredRealmIndex) {
                        canBuy = false;
                    }
                }

                const itemDiv = document.createElement('div');
                itemDiv.className = 'shop-item';
                itemDiv.innerHTML = `
                    <div class="shop-item-name">${item.name}</div>
                    <div class="shop-item-price">${item.price} ${item.currency === 'spiritStones' ? '灵石' : '贡献'}</div>
                `;

                if (canBuy) {
                    itemDiv.addEventListener('click', () => {
                        const result = this.state.buyFromSectShop('items', item.name);
                        if (result.success) {
                            this.state.addLog(result.message, 'success');
                            this.updateDisplay();
                            modal.classList.remove('active');
                        } else {
                            alert(result.message);
                        }
                    });
                }

                shopItems.appendChild(itemDiv);
            }

            // 标签切换 - 只有在有标签的情况下才添加
            const tabs = modalBody.querySelectorAll('.sect-tab');
            if (tabs.length > 0) {
                tabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        modalBody.querySelectorAll('.sect-tab').forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');

                        const tabName = tab.getAttribute('data-tab');
                        modalBody.querySelectorAll('.sect-tab-content').forEach(content => {
                            content.style.display = 'none';
                        });

                        // 使用更安全的方式获取元素
                        const tabInfo = modalBody.querySelector('#tabInfo');
                        const tabTasks = modalBody.querySelector('#tabTasks');
                        const tabShop = modalBody.querySelector('#tabShop');

                        if (tabName === 'info' && tabInfo) {
                            tabInfo.style.display = 'block';
                        } else if (tabName === 'tasks' && tabTasks) {
                            tabTasks.style.display = 'block';
                        } else if (tabName === 'shop' && tabShop) {
                            tabShop.style.display = 'block';
                        }
                    });
                });
            }
        }

        modal.classList.add('active');
    }

    // 显示渡劫界面
    showTribulationModal(targetRealm) {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        const tribulation = CONFIG.heavenlyTribulations[targetRealm];
        if (!tribulation) {
            alert('此境界无需渡劫');
            return;
        }

        modalHeader.querySelector('pre').textContent = `┌─── ${tribulation.name} ───┐`;

        const currentStats = this.calculateCombatStats();
        const baseChance = tribulation.baseSuccessRate;

        modalBody.innerHTML = `
            <div class="tribulation-info">
                <div class="tribulation-desc">${tribulation.description}</div>
                <div class="tribulation-details">
                    <p><strong>劫数类型：</strong>${tribulation.types.join('、')}</p>
                    <p><strong>波次数量：</strong>${tribulation.waves}波</p>
                    <p><strong>基础成功率：</strong>${(baseChance * 100).toFixed(0)}%</p>
                    <p><strong>失败后果：</strong>修为损失${(tribulation.failurePenalty.cultivationLoss * 100).toFixed(0)}%</p>
                    ${tribulation.failurePenalty.possibilityOfRealmDrop ? `<p><strong>境界跌落概率：</strong>${(tribulation.failurePenalty.possibilityOfRealmDrop * 100).toFixed(0)}%</p>` : ''}
                    ${tribulation.failurePenalty.possibilityOfDeath ? `<p><strong>身死道消概率：</strong>${(tribulation.failurePenalty.possibilityOfDeath * 100).toFixed(0)}%</p>` : ''}
                </div>

                <div class="tribulation-status">
                    <div class="your-stats">
                        <h4>当前状态</h4>
                        <p>境界：${this.realm} ${this.level}层</p>
                        <p>攻击：${currentStats.attack}</p>
                        <p>防御：${currentStats.defense}</p>
                        <p>生命：${currentStats.health}</p>
                    </div>
                </div>

                <div class="tribulation-preparation">
                    <h4>渡劫准备</h4>
                    <p>可以使用天劫符提升成功率</p>
                    <p>可以邀请道友护法</p>
                </div>

                <div class="tribulation-actions">
                    <button class="action-btn" id="startTribulationBtn">[开始渡劫]</button>
                    <button class="action-btn" id="cancelTribulationBtn">[暂不渡劫]</button>
                </div>
            </div>
        `;

        // 绑定按钮事件
        document.getElementById('startTribulationBtn').addEventListener('click', () => {
            const result = this.startTribulation(targetRealm);
            if (result.success) {
                modal.classList.remove('active');
                this.addLog(result.message, 'rare');
                // 开始渡劫动画效果（可以后续添加）
                this.processTribulationWave();
            } else {
                alert(result.message);
            }
        });

        document.getElementById('cancelTribulationBtn').addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.classList.add('active');
    }

    // 处理渡劫波次（用于游戏循环调用）
    processTribulationWave() {
        if (!this.tribulationState || !this.tribulationState.isTribulating) return;

        // 设置定时器模拟渡劫过程
        setTimeout(() => {
            this.processTribulation();
        }, 2000); // 每2秒一波
    }

    // ==================== NPC对话系统 ====================

    // 显示NPC列表
    showNPCListModal() {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = '┌─── N P C 列 表 ───┐';

        const availableNPCs = this.state.getAvailableNPCs();

        if (availableNPCs.length === 0) {
            modalBody.innerHTML = `
                <div class="npc-list-empty">
                    <div class="empty-text">暂无可用NPC</div>
                    <div class="empty-hint">提升境界或加入宗门可解锁更多NPC</div>
                </div>
            `;
        } else {
            let html = '<div class="npc-list">';

            availableNPCs.forEach(npc => {
                const affection = this.state.getNPCAffection(npc.id);
                const affectionLevel = this.state.getAffectionLevel(affection);

                html += `
                    <div class="npc-card" data-npc="${npc.id}">
                        <div class="npc-avatar">${npc.avatar}</div>
                        <div class="npc-info">
                            <div class="npc-name">${npc.name}</div>
                            <div class="npc-title">${npc.title}</div>
                            <div class="npc-description">${npc.description}</div>
                            <div class="npc-affection">好感度：${affection.toFixed(1)} (${affectionLevel})</div>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
            modalBody.innerHTML = html;

            // 添加NPC点击事件
            modalBody.querySelectorAll('.npc-card').forEach(card => {
                card.addEventListener('click', () => {
                    const npcId = card.getAttribute('data-npc');
                    this.showNPCDialogModal(npcId);
                });
            });
        }

        modal.classList.add('active');
    }

    // 显示NPC对话界面
    showNPCDialogModal(npcId, dialogId = 'greeting') {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        const npc = CONFIG.npcs[npcId];
        if (!npc) {
            alert('NPC不存在');
            return;
        }

        const dialog = npc.dialogs[dialogId];
        if (!dialog) {
            alert('对话不存在');
            return;
        }

        // 记录对话历史
        this.state.recordNPCDialog(npcId, dialogId);

        modalHeader.querySelector('pre').textContent = `┌─── ${npc.name} ───┐`;

        const affection = this.state.getNPCAffection(npcId);
        const affectionLevel = this.state.getAffectionLevel(affection);

        let html = `
            <div class="npc-dialog-container">
                <div class="npc-dialog-header">
                    <div class="npc-dialog-avatar">${npc.avatar}</div>
                    <div class="npc-dialog-info">
                        <div class="npc-dialog-name">${npc.name}</div>
                        <div class="npc-dialog-title">${npc.title}</div>
                        <div class="npc-dialog-affection">好感度：${affection.toFixed(1)} (${affectionLevel})</div>
                    </div>
                </div>

                <div class="npc-dialog-content">
                    <div class="npc-dialog-text">${dialog.text}</div>
                </div>

                <div class="npc-dialog-options">
        `;

        // 添加对话选项
        if (dialog.options && dialog.options.length > 0) {
            dialog.options.forEach((option, index) => {
                html += `
                    <div class="dialog-option" data-option="${index}" data-next="${option.next || ''}" data-action="${option.action || ''}">
                        ${index + 1}. ${option.text}
                    </div>
                `;
            });
        } else {
            html += `<div class="dialog-option dialog-end" data-close="true">结束对话</div>`;
        }

        html += `
                </div>

                <div class="npc-dialog-actions">
                    <div class="npc-actions-title">
                        可用操作：
                    </div>
                    <div class="npc-actions-list">
        `;

        // 添加NPC操作按钮
        if (npc.actions && npc.actions.length > 0) {
            npc.actions.forEach(action => {
                html += `<div class="npc-action-btn" data-action="${action.type}">${action.description}</div>`;
            });
        }

        html += `
                    </div>
                </div>
            </div>
        `;

        modalBody.innerHTML = html;

        // 绑定对话选项事件
        modalBody.querySelectorAll('.dialog-option:not(.dialog-end)').forEach(option => {
            option.addEventListener('click', () => {
                const nextDialogId = option.getAttribute('data-next');
                const actionType = option.getAttribute('data-action');
                const optionData = dialog.options[parseInt(option.getAttribute('data-option'))];

                // 处理选项效果
                if (optionData && optionData.effect) {
                    this.applyDialogEffect(optionData.effect);
                }

                // 处理动作
                if (actionType) {
                    this.handleNPCAction(npcId, actionType, optionData);
                } else if (nextDialogId) {
                    // 继续对话
                    this.showNPCDialogModal(npcId, nextDialogId);
                } else {
                    // 结束对话
                    modal.classList.remove('active');
                }
            });
        });

        // 绑定结束对话事件
        const endOption = modalBody.querySelector('.dialog-option.dialog-end');
        if (endOption) {
            endOption.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // 绑定操作按钮事件
        modalBody.querySelectorAll('.npc-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const actionType = btn.getAttribute('data-action');
                this.handleNPCAction(npcId, actionType);
            });
        });

        modal.classList.add('active');
    }

    // 应用对话效果
    applyDialogEffect(effect) {
        if (!effect) return;

        switch (effect.type) {
            case 'buff':
                if (effect.value === 'cultivation') {
                    this.state.buffs.cultivation.multiplier = 1.5;
                    this.state.buffs.cultivation.endTime = Date.now() + (effect.duration || 300000);
                    this.state.addLog('修炼速度提升50%，持续5分钟', 'success');
                }
                break;
            case 'unlock_location':
                // 解锁新位置（可以与秘境系统关联）
                this.state.addLog(`发现了新地点：${effect.value}`, 'rare');
                break;
        }
    }

    // 处理NPC操作
    handleNPCAction(npcId, actionType, optionData = null) {
        const npc = CONFIG.npcs[npcId];
        if (!npc) return;

        switch (actionType) {
            case 'give_gift':
                this.showNPCCiftModal(npcId);
                break;
            case 'buy_info':
                // 购买情报逻辑
                if (this.state.spiritStones >= 100) {
                    this.state.spiritStones -= 100;
                    this.state.addLog('花费100灵石购买了情报', 'info');
                    // 可以显示一些游戏提示或秘籍
                } else {
                    alert('灵石不足');
                }
                break;
            case 'request_guidance':
                // 请求指点，提升修炼速度
                const affection = this.state.getNPCAffection(npcId);
                if (affection >= 20) {
                    this.state.buffs.cultivation.multiplier = 1.3;
                    this.state.buffs.cultivation.endTime = Date.now() + 600000;
                    this.state.addLog(`${npc.name}指点你修炼，修炼速度提升30%，持续10分钟`, 'success');
                    document.getElementById('gameModal').classList.remove('active');
                } else {
                    alert('好感度不足，需要达到"熟悉"（20点）');
                }
                break;
            case 'sect_mission':
                document.getElementById('gameModal').classList.remove('active');
                // 跳转到宗门任务标签
                setTimeout(() => this.showSectModal(), 100);
                break;
            case 'trade':
                // 交易逻辑（可以与商店系统关联）
                this.state.addLog('与商人交易', 'info');
                break;
            case 'buy_item':
                if (optionData && optionData.item) {
                    // 购买物品逻辑
                    this.state.addLog(`购买${optionData.item}`, 'info');
                }
                break;
        }
    }

    // 显示赠送礼物界面
    showNPCCiftModal(npcId) {
        const npc = CONFIG.npcs[npcId];
        if (!npc) return;

        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = `┌─── 赠送礼物 ───┐`;

        let html = `
            <div class="gift-container">
                <div class="gift-target">送给：${npc.name} ${npc.avatar}</div>
                <div class="gift-items-list">
        `;

        // 显示可赠送的物品
        const giftableItems = Object.keys(npc.gifts || {});
        let hasItems = false;

        for (const itemName of giftableItems) {
            const quantity = this.state.inventory[itemName] || 0;
            if (quantity > 0) {
                hasItems = true;
                const affectionGain = npc.gifts[itemName].affection * quantity;
                html += `
                    <div class="gift-item" data-item="${itemName}">
                        <div class="gift-item-name">${itemName} × ${quantity}</div>
                        <div class="gift-item-effect">好感度 +${affectionGain.toFixed(1)}</div>
                    </div>
                `;
            }
        }

        if (!hasItems) {
            html += `<div class="empty-gifts">没有可赠送的物品</div>`;
        }

        html += `
                </div>
                <div class="gift-actions">
                    <div class="gift-back-btn" data-back-to-npc="${npcId}">返回对话</div>
                </div>
            </div>
        `;

        modalBody.innerHTML = html;

        // 绑定赠送事件
        modalBody.querySelectorAll('.gift-item').forEach(item => {
            item.addEventListener('click', () => {
                const itemName = item.getAttribute('data-item');
                const result = this.state.giveGiftToNPC(npcId, itemName);
                if (result.success) {
                    this.state.addLog(result.message, 'success');
                    this.updateDisplay();
                    // 刷新界面
                    this.showNPCCiftModal(npcId);
                } else {
                    alert(result.message);
                }
            });
        });

        // 绑定返回事件
        const backBtn = modalBody.querySelector('.gift-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                const targetNpcId = backBtn.getAttribute('data-back-to-npc');
                this.showNPCDialogModal(targetNpcId);
            });
        }

        modal.classList.add('active');
    }

    // ==================== 剧情任务系统 ====================

    // 获取当前可用的任务列表
    getAvailableQuests() {
        const available = [];
        for (const [questId, quest] of Object.entries(CONFIG.storyQuests)) {
            if (this.completedQuests.includes(questId)) continue;
            if (quest.requirements && !this.checkQuestRequirements(quest.requirements)) continue;
            const currentStage = this.getCurrentQuestStage(questId);
            if (!currentStage && !this.canStartQuest(questId)) continue;
            available.push({ id: questId, ...quest, currentStage });
        }
        return available;
    }

    // 检查任务前置条件
    checkQuestRequirements(requirements) {
        if (requirements.realm) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentRealmIndex = realmNames.indexOf(this.realm);
            const requiredRealmIndex = realmNames.indexOf(requirements.realm);
            if (currentRealmIndex < requiredRealmIndex) return false;
            if (currentRealmIndex === requiredRealmIndex && this.level < requirements.level) return false;
        }
        if (requirements.sect && requirements.sect !== 'any' && this.sect !== requirements.sect) return false;
        if (requirements.sect === 'any' && this.sect === 'none') return false;
        if (requirements.flag && !this.storyFlags[requirements.flag]) return false;
        return true;
    }

    // 检查是否可以开始任务
    canStartQuest(questId) {
        const quest = CONFIG.storyQuests[questId];
        if (!quest) return false;
        if (quest.type === 'main') return quest.chapter <= this.currentChapter;
        return this.checkQuestRequirements(quest.requirements);
    }

    // 获取任务的当前阶段
    getCurrentQuestStage(questId) {
        if (this.questProgress[questId]) {
            const stageId = this.questProgress[questId].currentStage;
            const quest = CONFIG.storyQuests[questId];
            return quest ? quest.stages.find(s => s.id === stageId) : null;
        }
        return null;
    }

    // 开始任务
    startQuest(questId) {
        const quest = CONFIG.storyQuests[questId];
        if (!quest) return { success: false, message: '任务不存在' };
        if (this.completedQuests.includes(questId)) return { success: false, message: '任务已完成' };
        if (this.questProgress[questId]) return { success: false, message: '任务已进行中' };
        if (!this.canStartQuest(questId)) return { success: false, message: '任务条件未满足' };

        this.questProgress[questId] = {
            currentStage: quest.stages[0].id,
            progress: {},
            startTime: Date.now()
        };
        this.addLog(`开始任务：${quest.name}`, 'rare');
        return { success: true, message: `开始任务：${quest.name}` };
    }

    // 更新任务进度
    updateQuestProgress(objectiveType, value) {
        const updatedQuests = [];
        for (const [questId, progress] of Object.entries(this.questProgress)) {
            const quest = CONFIG.storyQuests[questId];
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
                        progress.progress.level = this.level;
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
                        progress.progress.contribution = this.sectContribution;
                        progressed = true;
                    }
                    break;
                case 'sect_rank':
                    if (objective.type === 'sect_rank') {
                        progress.progress.rank = this.sectRank;
                        progressed = true;
                    }
                    break;
                case 'collect_items':
                    if (objective.type === 'collect_items') {
                        if (!progress.progress.collected) progress.progress.collected = {};
                        for (const item of Object.keys(objective.items)) {
                            progress.progress.collected[item] = this.inventory[item] || 0;
                        }
                        progressed = true;
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

            if (progressed && this.checkStageCompletion(questId, currentStage)) {
                this.completeQuestStage(questId, currentStage);
                updatedQuests.push({ questId, quest });
            }
        }
        return updatedQuests;
    }

    // 检查阶段是否完成
    checkStageCompletion(questId, stage) {
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
                for (const [item, count] of Object.entries(objective.items)) {
                    if ((this.inventory[item] || 0) < count) return false;
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
        const quest = CONFIG.storyQuests[questId];
        const onComplete = stage.onComplete;

        // 发放奖励
        if (stage.rewards) {
            for (const reward of stage.rewards) {
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
                        if (!this.skills[reward.value]) {
                            this.skills[reward.value] = { level: 1 };
                        }
                        break;
                    case 'artifact':
                        this.artifacts.push(reward.value);
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

        this.addLog(onComplete.message, 'legendary');

        // 设置剧情标记
        if (onComplete.setFlag) {
            this.storyFlags[onComplete.setFlag.flag] = onComplete.setFlag.value;
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
            this.completeQuest(questId);
        }
    }

    // 完成任务
    completeQuest(questId) {
        if (!this.questProgress[questId]) return;
        delete this.questProgress[questId];
        this.completedQuests.push(questId);
        const quest = CONFIG.storyQuests[questId];
        this.addLog(`任务完成：${quest.name}`, 'legendary');
    }

    // 获取任务进度描述
    getQuestProgressText(questId) {
        const progress = this.questProgress[questId];
        const quest = CONFIG.storyQuests[questId];
        if (!progress || !quest) return '未开始';

        const currentStage = quest.stages.find(s => s.id === progress.currentStage);
        if (!currentStage) return '已完成';

        const objective = currentStage.objective;
        switch (objective.type) {
            case 'cultivate':
                return `修炼进度：${progress.progress.cultivated || 0}/${objective.target}`;
            case 'breakthrough':
                return `突破层级：${this.level}/${objective.target}层`;
            case 'adventure':
                return `历练次数：${progress.progress.adventures || 0}/${objective.target}`;
            case 'sect_contribution':
                return `宗门贡献：${this.sectContribution}/${objective.target}`;
            case 'sect_rank':
                return `当前等级：${this.sectRank}，目标：${objective.target}`;
            case 'collect_items':
                let text = '收集物品：';
                for (const [item, count] of Object.entries(objective.items)) {
                    text += `${item} ${this.inventory[item] || 0}/${count} `;
                }
                return text;
            case 'tribulation':
                return this.realm === objective.target ? '已达成' : `需达到${objective.target}`;
            case 'defeat_monsters':
                return `击败怪物：${progress.progress.defeated || 0}/${objective.target}`;
            default:
                return currentStage.description;
        }
    }

    // 显示战斗界面
    showFightModal() {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = '┌─── 战 斗 场 ───┐';

        const playerStats = this.state.calculateCombatStats();
        const availableSkills = this.state.getAvailableCombatSkills();

        let html = `
            <div class="player-stats">
                <div class="stats-title">你的属性</div>
                <div class="stat-row">攻击: ${playerStats.attack}</div>
                <div class="stat-row">防御: ${playerStats.defense}</div>
                <div class="stat-row">生命: ${playerStats.health}</div>
                <div class="stat-row">幸运加成: ${(playerStats.luckBonus * 100).toFixed(1)}%</div>
            </div>

            <div class="combat-skills-section">
                <div class="skills-title">战斗技能</div>
                <div class="skills-selection">
        `;

        if (availableSkills.length > 0) {
            availableSkills.forEach(skill => {
                const isOnCooldown = this.state.combatSkillCooldowns[skill.id] > Date.now();
                const cooldownText = isOnCooldown
                    ? `冷却中 (${Math.ceil((this.state.combatSkillCooldowns[skill.id] - Date.now()) / 1000)}秒)`
                    : skill.description;
                const cooldownClass = isOnCooldown ? 'skill-on-cooldown' : '';
                const selectedClass = this.state.activeCombatSkill === skill.id ? 'skill-selected' : '';

                html += `
                    <div class="combat-skill-card ${cooldownClass} ${selectedClass}" data-skill="${skill.id}">
                        <div class="skill-card-name">${skill.name} <span style="font-size: 10px; color: var(--rare-color);">[${skill.tier}]</span></div>
                        <div class="skill-card-desc">${cooldownText}</div>
                        <div class="skill-card-effect">威力: ${skill.power}x | 消耗: ${skill.cost}</div>
                    </div>
                `;
            });
        } else {
            html += `<div class="empty-skills">暂无可用战斗技能<br><span style="font-size: 11px; color: var(--text-secondary);">提升境界可解锁更多技能</span></div>`;
        }

        html += `
                </div>
            </div>

            <div class="monster-list">
                <div class="monster-title">可选怪物</div>
        `;

        for (const monster of CONFIG.monsters) {
            // 检查是否可以挑战
            let canChallenge = true;
            let requirementText = '';

            if (monster.requirements.realm) {
                const realmNames = Object.keys(CONFIG.realms);
                const currentRealmIndex = realmNames.indexOf(this.state.realm);
                const requiredRealmIndex = realmNames.indexOf(monster.requirements.realm);

                if (currentRealmIndex < requiredRealmIndex) {
                    canChallenge = false;
                    requirementText = `需要${monster.requirements.realm}`;
                } else if (currentRealmIndex === requiredRealmIndex && this.state.level < monster.requirements.level) {
                    canChallenge = false;
                    requirementText = `需要${monster.requirements.realm}${monster.requirements.level}层`;
                }
            }

            if (canChallenge) {
                html += `
                    <div class="monster-item" data-monster="${monster.id}">
                        <div class="monster-name">${monster.name} (${monster.tier})</div>
                        <div class="monster-stats">
                            生命: ${monster.hp} | 攻击: ${monster.attack} | 防御: ${monster.defense}
                        </div>
                        <div class="monster-rewards">
                            奖励: ${monster.rewards.spiritStones[0]}-${monster.rewards.spiritStones[1]}灵石
                        </div>
                    </div>
                `;
            }
        }

        html += '</div>';
        modalBody.innerHTML = html;

        // 添加技能选择事件
        modalBody.querySelectorAll('.combat-skill-card:not(.skill-on-cooldown)').forEach(skillCard => {
            skillCard.addEventListener('click', () => {
                // 移除其他技能的选中状态
                modalBody.querySelectorAll('.combat-skill-card').forEach(card => {
                    card.classList.remove('skill-selected');
                });
                // 选中当前技能
                skillCard.classList.add('skill-selected');
                this.state.activeCombatSkill = skillCard.getAttribute('data-skill');
            });
        });

        // 添加怪物点击事件
        modalBody.querySelectorAll('.monster-item').forEach(item => {
            item.addEventListener('click', () => {
                const monsterId = item.getAttribute('data-monster');
                const result = this.state.fightMonster(monsterId, this.state.activeCombatSkill);
                this.state.addLog(result.message, result.success ? (result.victory ? 'success' : 'info') : 'danger');
                this.updateDisplay();

                if (!result.success && !result.victory) {
                    alert(result.message);
                } else {
                    modal.classList.remove('active');
                }
            });
        });

        modal.classList.add('active');
    }

    // ==================== 剧情任务界面 ====================

    // 显示任务界面
    showQuestModal() {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = '┌─── 任 务 列 表 ───┐';

        const availableQuests = this.state.getAvailableQuests();

        if (availableQuests.length === 0) {
            modalBody.innerHTML = `
                <div class="quest-list-empty">
                    <div class="empty-title">暂无可用任务</div>
                    <div class="empty-hint">继续修仙，提升境界以解锁更多任务</div>
                </div>
            `;
        } else {
            let html = '<div class="quest-list-container">';

            availableQuests.forEach(quest => {
                const isMainQuest = quest.type === 'main';
                const questClass = isMainQuest ? 'quest-card-main' : 'quest-card-side';
                const questTypeText = isMainQuest ? '【主线】' : '【支线】';
                const currentStage = quest.currentStage;
                const inProgress = this.state.questProgress[quest.id];

                html += `
                    <div class="quest-card ${questClass}" data-quest="${quest.id}">
                        <div class="quest-header">
                            <div class="quest-title">${questTypeText}${quest.name}</div>
                            <div class="quest-chapter">第${quest.chapter}章</div>
                        </div>
                        <div class="quest-description">${quest.description}</div>
                `;

                if (currentStage) {
                    const progressText = this.state.getQuestProgressText(quest.id);
                    html += `
                        <div class="quest-current-stage">
                            <div class="stage-name">当前目标：${currentStage.name}</div>
                            <div class="stage-description">${currentStage.description}</div>
                            <div class="stage-progress">${progressText}</div>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="quest-not-started">
                            <div class="start-hint">点击开始任务</div>
                        </div>
                    `;
                }

                html += `
                        <div class="quest-rewards">
                            <div class="rewards-title">完成奖励：</div>
                            <div class="rewards-list">
                `;

                if (currentStage) {
                    currentStage.rewards.forEach(reward => {
                        html += `<span class="reward-item">${this.formatQuestReward(reward)}</span>`;
                    });
                }

                html += `
                            </div>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
            modalBody.innerHTML = html;

            // 绑定任务卡片点击事件
            modalBody.querySelectorAll('.quest-card').forEach(card => {
                card.addEventListener('click', () => {
                    const questId = card.getAttribute('data-quest');
                    if (this.state.questProgress[questId]) {
                        this.showQuestDetailModal(questId);
                    } else {
                        const result = this.state.startQuest(questId);
                        if (result.success) {
                            this.updateDisplay();
                            this.showQuestModal();
                        } else {
                            alert(result.message);
                        }
                    }
                });
            });
        }

        modal.classList.add('active');
    }

    // 格式化奖励文本
    formatQuestReward(reward) {
        switch (reward.type) {
            case 'spirit_stones': return `${reward.value}灵石`;
            case 'cultivation': return `${reward.value}修为`;
            case 'item': return `${reward.value}×${reward.quantity || 1}`;
            case 'skill': return `功法：${reward.value}`;
            case 'artifact': return `法宝：${reward.value}`;
            case 'sect_contribution': return `${reward.value}贡献`;
            case 'sect_reputation': return `${reward.value}声望`;
            default: return '未知奖励';
        }
    }

    // 显示任务详情
    showQuestDetailModal(questId) {
        const quest = CONFIG.storyQuests[questId];
        if (!quest) return;

        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = `┌─── 任 务 详 情 ───┐`;

        const currentStage = this.state.getCurrentQuestStage(questId);
        const progressText = this.state.getQuestProgressText(questId);

        let html = `
            <div class="quest-detail-container">
                <div class="quest-detail-header">
                    <div class="quest-detail-title">${quest.name}</div>
                    <div class="quest-detail-type">${quest.type === 'main' ? '主线任务' : '支线任务'}</div>
                </div>

                <div class="quest-detail-description">${quest.description}</div>

                <div class="quest-detail-stage">
                    <div class="stage-title">当前目标</div>
                    <div class="stage-name">${currentStage.name}</div>
                    <div class="stage-desc">${currentStage.description}</div>
                    <div class="stage-progress-text">${progressText}</div>
                </div>

                <div class="quest-detail-rewards">
                    <div class="rewards-title">阶段奖励</div>
                    <div class="rewards-grid">
        `;

        currentStage.rewards.forEach(reward => {
            html += `<div class="reward-item-detail">${this.formatQuestReward(reward)}</div>`;
        });

        html += `
                    </div>
                </div>

                <div class="quest-detail-actions">
                    <div class="quest-back-btn" data-close="true">返回列表</div>
                </div>
            </div>
        `;

        modalBody.innerHTML = html;

        const backBtn = modalBody.querySelector('.quest-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.showQuestModal();
            });
        }

        modal.classList.add('active');
    }

    // 显示打工界面
    showWorkModal() {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = '┌─── 打 工 场 ───┐';

        let html = '<div class="job-list">';

        for (const job of CONFIG.jobs) {
            const attributeValue = this.state.talents[job.attribute] || 0;
            const bonus = Math.floor(attributeValue * job.bonusMultiplier * 100);

            html += `
                <div class="job-item" data-job="${job.id}">
                    <div class="job-name">${job.name}</div>
                    <div class="job-description">${job.description}</div>
                    <div class="job-duration">时长: ${job.duration / 1000}秒</div>
                    <div class="job-reward">奖励: ${job.baseReward[0]}-${job.baseReward[1]}灵石</div>
                    <div class="job-bonus">属性加成: ${bonus}% (${job.attribute === 'wisdom' ? '悟性' : job.attribute === 'luck' ? '幸运' : job.attribute === 'potential' ? '根骨' : '机缘'})</div>
                    <div class="job-risk">风险: ${(job.risk * 100).toFixed(0)}%</div>
                </div>
            `;
        }

        html += '</div>';
        modalBody.innerHTML = html;

        // 添加工作点击事件
        modalBody.querySelectorAll('.job-item').forEach(item => {
            item.addEventListener('click', () => {
                const jobId = item.getAttribute('data-job');
                const result = this.state.doWork(jobId);
                if (result.success) {
                    this.state.addLog(result.message, 'info');
                    modal.classList.remove('active');
                } else {
                    alert(result.message);
                }
            });
        });

        modal.classList.add('active');
    }

    // 开始游戏循环
    startGameLoop() {
        console.log('正在启动游戏循环...');
        this.updateInterval = setInterval(() => {
            try {
                // 只有不在历练、打工和探索中才增加修为
                if (!this.state.isAdventuring && !this.state.isWorking && !this.state.isExploring) {
                    // 计算实际修炼速度（包含buff和随机波动）
                    const actualCultivationRate = this.state.calculateActualCultivationRate();
                    const canBreakthrough = this.state.addCultivation(actualCultivationRate);

                    if (canBreakthrough && this.state.cultivation < this.state.maxCultivation * 2) {
                        this.state.addLog('修为已满，可以突破境界了！', 'rare');
                    }

                    // 处理打坐随机事件
                    this.state.processMeditationEvent();

                    // 检查修为状态（自动突破等）
                    this.state.checkCultivationStatus();
                }

                // 检查历练是否完成
                if (this.state.isAdventuring && Date.now() >= this.state.adventureEndTime) {
                    this.state.completeAdventure();
                }

                // 检查秘境探索是否完成
                if (this.state.isExploring && Date.now() >= this.state.explorationEndTime) {
                    this.state.completeExploration();
                }

                // 检查buff
                this.state.checkBuffs();

                // 更新总时间
                this.state.totalDays += 1 / 86400;

                // 更新界面
                this.updateDisplay();
            } catch (error) {
                console.error('游戏循环执行错误:', error);
            }
        }, 1000);

        this.saveInterval = setInterval(() => {
            try {
                this.state.save();
                console.log('自动保存完成');
            } catch (error) {
                console.error('自动保存失败:', error);
            }
        }, 30000);

        console.log('游戏循环启动成功，interval ID:', this.updateInterval);
    }

    // 停止游戏循环
    stopGameLoop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        if (this.saveInterval) {
            clearInterval(this.saveInterval);
        }
    }

    // 更新显示
    updateDisplay() {
        try {
            // 更新境界显示
            const currentRealm = document.getElementById('currentRealm');
            if (currentRealm) currentRealm.textContent = `${this.state.realm} ${this.state.level}层`;

            // 更新修为显示
            const currentCultivation = document.getElementById('currentCultivation');
            const maxCultivation = document.getElementById('maxCultivation');
            if (currentCultivation) currentCultivation.textContent = this.formatNumber(this.state.cultivation);
            if (maxCultivation) maxCultivation.textContent = this.formatNumber(this.state.maxCultivation);

            // 更新修为进度条
            this.updateCultivationBar();

            // 更新属性显示
            const wisdomAttr = document.getElementById('wisdomAttr');
            const luckAttr = document.getElementById('luckAttr');
            const potentialAttr = document.getElementById('potentialAttr');
            const fortuneAttr = document.getElementById('fortuneAttr');
            if (wisdomAttr) wisdomAttr.textContent = this.state.talents.wisdom;
            if (luckAttr) luckAttr.textContent = this.state.talents.luck;
            if (potentialAttr) potentialAttr.textContent = this.state.talents.potential;
            if (fortuneAttr) fortuneAttr.textContent = this.state.talents.fortune;

            // 更新战斗属性
            const combatStats = this.state.calculateCombatStats();
            const attackAttr = document.getElementById('attackAttr');
            const defenseAttr = document.getElementById('defenseAttr');
            const healthAttr = document.getElementById('healthAttr');
            if (attackAttr) attackAttr.textContent = combatStats.attack;
            if (defenseAttr) defenseAttr.textContent = combatStats.defense;
            if (healthAttr) healthAttr.textContent = combatStats.health;

            // 更新资源显示
            const spiritStones = document.getElementById('spiritStones');
            const cultivationRate = document.getElementById('cultivationRate');
            const totalDays = document.getElementById('totalDays');
            if (spiritStones) spiritStones.textContent = this.formatNumber(this.state.spiritStones);
            if (cultivationRate) cultivationRate.textContent = this.state.calculateActualCultivationRate().toFixed(1);
            if (totalDays) totalDays.textContent = this.state.totalDays.toFixed(2);

            // 更宗门显示
            const sectNames = {
                'none': '无门无派',
                'cloud_sword': '云剑宗',
                'spirit_valley': '灵谷门',
                'shadow_peak': '暗影峰',
                'heaven_union': '天道盟'
            };
            const sectName = document.getElementById('sectName');
            if (sectName) sectName.textContent = sectNames[this.state.sect] || '无门无派';

            // 更新突破按钮
            const breakthroughBtn = document.getElementById('breakthroughBtn');
            if (breakthroughBtn) {
                const canBreakthrough = this.state.canBreakthrough();
                breakthroughBtn.disabled = !canBreakthrough;
            }

            // 更新功法显示
            this.updateSkillsDisplay();

            // 更新宠物显示
            this.updatePetsDisplay();

            // 更新成就显示
            this.updateAchievementsDisplay();

            // 更新日志
            this.updateLogs();

            // 更新修炼小人
            this.updateCultivator();

            // 更新状态显示
            this.updateStatusDisplay();
        } catch (error) {
            console.error('更新界面时出错:', error);
        }
    }

    // 更新修为进度条（ASCII风格）
    updateCultivationBar() {
        const percentage = this.state.cultivation / this.state.maxCultivation;
        const barLength = 30;
        const filledLength = Math.floor(barLength * percentage);

        let bar = '[';
        for (let i = 0; i < barLength; i++) {
            if (i < filledLength) {
                bar += '█';
            } else {
                bar += '░';
            }
        }
        bar += ']';

        document.getElementById('cultivationBar').textContent = bar;
        document.getElementById('cultivationPercentage').textContent = `${(percentage * 100).toFixed(1)}%`;
    }

    // 更新功法显示
    updateSkillsDisplay() {
        // 更新当前功法
        const currentSkillDiv = document.getElementById('currentSkill');
        const currentSkill = CONFIG.skills[this.state.currentSkill];
        const currentSkillLevel = this.state.skills[this.state.currentSkill].level;
        const currentBonus = this.calculateSkillBonus(this.state.currentSkill);

        currentSkillDiv.innerHTML = `
            <div class="skill-name">${this.state.currentSkill} <span style="font-size: 10px; color: var(--rare-color);">(${currentSkill.tier})</span></div>
            <div class="skill-level">${currentSkillLevel}/${currentSkill.maxLevel}层</div>
            <div class="skill-effect">${this.getSkillEffectText(currentSkill, currentBonus)}</div>
        `;

        // 更新功法列表
        const skillsListDiv = document.getElementById('skillsList');
        let skillsHtml = '';

        for (const [skillName, skillData] of Object.entries(this.state.skills)) {
            const skill = CONFIG.skills[skillName];
            const isCurrent = skillName === this.state.currentSkill;
            const bonus = this.calculateSkillBonus(skillName);

            skillsHtml += `
                <div class="skill-item ${isCurrent ? 'current-skill' : ''}" data-skill="${skillName}" style="${isCurrent ? 'background: rgba(0, 255, 0, 0.1); border-color: var(--accent-color);' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                        <div style="flex: 1;">
                            <div class="skill-name" style="${isCurrent ? 'color: var(--accent-color);' : ''}">${skillName}</div>
                            <div style="font-size: 9px; color: var(--text-secondary);">${skill.tier} | ${skillData.level}/${skill.maxLevel}层</div>
                            <div style="font-size: 9px; color: var(--success-color);">${this.getSkillEffectText(skill, bonus)}</div>
                        </div>
                        ${isCurrent ? '<div style="font-size: 9px; color: var(--accent-color);">[当前]</div>' : '<div style="font-size: 9px; color: var(--text-secondary);">[切换]</div>'}
                    </div>
                </div>
            `;
        }

        skillsListDiv.innerHTML = skillsHtml || '<div class="empty-list">暂无功法</div>';

        // 添加点击切换事件
        skillsListDiv.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('click', () => {
                const skillName = item.getAttribute('data-skill');
                if (skillName !== this.state.currentSkill) {
                    this.switchSkill(skillName);
                }
            });
        });
    }

    // 计算功法加成
    calculateSkillBonus(skillName) {
        const skill = CONFIG.skills[skillName];
        const skillLevel = this.state.skills[skillName].level;
        const bonus = skill.value * skillLevel;

        let result = {
            type: skill.effect,
            value: bonus,
            display: ''
        };

        switch (skill.effect) {
            case 'cultivation_speed':
                result.display = `修炼速度+${(bonus * 100).toFixed(0)}%`;
                break;
            case 'attack_boost':
                result.display = `攻击力+${(bonus * 100).toFixed(0)}%`;
                break;
            case 'defense_boost':
                result.display = `防御力+${(bonus * 100).toFixed(0)}%`;
                break;
            case 'health_regen':
                result.display = `生命值+${(bonus * 10).toFixed(0)}%`;
                break;
            case 'all_stats':
                result.display = `全属性+${(bonus * 100).toFixed(0)}%`;
                break;
            case 'breakthrough_chance':
                result.display = `突破成功率+${(bonus * 100).toFixed(0)}%`;
                break;
            default:
                result.display = skill.description;
        }

        return result;
    }

    // 获取功法效果文本
    getSkillEffectText(skill, bonus) {
        if (bonus && bonus.display) {
            return `${bonus.display}`;
        }
        return skill.description;
    }

    // 切换功法
    switchSkill(skillName) {
        if (!this.state.skills[skillName]) {
            alert('未学过此功法');
            return;
        }

        const skill = CONFIG.skills[skillName];

        // 检查要求
        if (skill.requirements.realm) {
            const realmNames = Object.keys(CONFIG.realms);
            const currentRealmIndex = realmNames.indexOf(this.state.realm);
            const requiredRealmIndex = realmNames.indexOf(skill.requirements.realm);

            if (currentRealmIndex < requiredRealmIndex) {
                alert(`境界不足，需要${skill.requirements.realm}`);
                return;
            }

            if (currentRealmIndex === requiredRealmIndex && this.state.level < skill.requirements.level) {
                alert(`层级不足，需要${skill.requirements.realm}${skill.requirements.level}层`);
                return;
            }
        }

        const oldSkill = this.state.currentSkill;
        const oldBonus = this.calculateSkillBonus(oldSkill);
        const newBonus = this.calculateSkillBonus(skillName);

        // 显示切换对比
        const confirmMessage = `确定要切换功法吗？\n\n从：${oldSkill} (${oldBonus.display})\n到：${skillName} (${newBonus.display})`;

        if (confirm(confirmMessage)) {
            this.state.setCurrentSkill(skillName);
            this.state.addLog(`切换功法为${skillName}`, 'success');
            this.updateDisplay();
        }
    }

    // 更新宠物显示
    updatePetsDisplay() {
        // 更新当前宠物
        const currentPetDiv = document.getElementById('currentPet');

        if (this.state.currentPet) {
            const pet = CONFIG.pets[this.state.currentPet];
            const petData = this.state.pets[this.state.currentPet];

            currentPetDiv.innerHTML = `
                <div class="pet-name">${this.state.currentPet}</div>
                <div class="pet-level">${petData.level}/${pet.maxLevel}阶</div>
                <div class="pet-effect">${pet.description}</div>
            `;
        } else {
            currentPetDiv.innerHTML = '<div class="pet-status">暂无宠物</div>';
        }

        // 更新宠物列表
        const petsListDiv = document.getElementById('petsList');
        let petsHtml = '';

        for (const [petName, petData] of Object.entries(this.state.pets)) {
            const pet = CONFIG.pets[petName];
            const isCurrent = petName === this.state.currentPet;

            petsHtml += `
                <div class="pet-item" data-pet="${petName}">
                    <span class="pet-name">${petName}</span>
                    <span class="pet-level">${petData.level}/${pet.maxLevel}</span>
                </div>
            `;
        }

        petsListDiv.innerHTML = petsHtml || '<div class="empty-list">暂无宠物</div>';

        // 更新成就显示
        this.updateAchievementsDisplay();
    }

    // 更新成就显示
    updateAchievementsDisplay() {
        const achievementsList = document.getElementById('achievementsList');
        if (!achievementsList) return; // 安全检查

        if (this.state.achievements.length === 0) {
            achievementsList.innerHTML = '<div class="empty-list">暂无成就</div>';
            return;
        }

        achievementsList.innerHTML = '';

        for (const achievementId of this.state.achievements) {
            let achievement = null;
            for (const [realm, realmAchievement] of Object.entries(CONFIG.realmAchievements)) {
                if (realmAchievement.id === achievementId) {
                    achievement = realmAchievement;
                    break;
                }
            }

            if (achievement) {
                const achievementDiv = document.createElement('div');
                achievementDiv.className = 'achievement-item';
                achievementDiv.innerHTML = `
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.description}</div>
                `;
                achievementsList.appendChild(achievementDiv);
            }
        }
    }

    // 更新状态显示
    updateStatusDisplay() {
        const currentState = this.state.getCurrentState();
        const statusText = document.getElementById('currentStatus');
        const statusTimer = document.getElementById('statusTimer');

        // 更新状态文本
        statusText.textContent = `[${currentState.text}]`;
        statusText.className = 'status-text ' + currentState.type;

        // 更新计时器
        if (currentState.endTime > 0) {
            const remainingTime = Math.max(0, Math.ceil((currentState.endTime - Date.now()) / 1000));
            statusTimer.textContent = `剩余${remainingTime}秒`;

            if (currentState.type === 'meditating') {
                statusTimer.textContent += ' (3倍修炼速度)';
            } else if (currentState.type === 'adventuring' && currentState.adventure) {
                statusTimer.textContent += ` (${currentState.adventure.name})`;
            } else if (currentState.type === 'working' && currentState.job) {
                statusTimer.textContent += ` (${currentState.job.name})`;
            }
        } else {
            statusTimer.textContent = '';
        }
    }

    // 更新日志显示
    updateLogs() {
        const logContent = document.getElementById('logContent');
        logContent.innerHTML = '';

        for (const log of this.state.logs) {
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry ${log.type}`;
            logEntry.textContent = `[${log.timestamp}] ${log.message}`;
            logContent.appendChild(logEntry);
        }
    }

    // 更新修炼小人
    updateCultivator() {
        const cultivatorDiv = document.getElementById('asciiCultivator');

        if (this.state.isAdventuring) {
            cultivatorDiv.textContent = ASCII_ART.adventurer;
        } else {
            const realmCultivator = ASCII_ART.realmCultivators[this.state.realm] || ASCII_ART.realmCultivators['default'];
            cultivatorDiv.textContent = realmCultivator;
        }
    }

    // 格式化数字
    formatNumber(num) {
        if (num >= 100000000) {
            return (num / 100000000).toFixed(1) + '亿';
        } else if (num >= 10000) {
            return (num / 10000).toFixed(1) + '万';
        } else {
            return num.toString();
        }
    }

    // 保存并退出
    saveAndQuit() {
        this.stopGameLoop();
        this.state.save();
    }
}

// ==================== 初始化游戏 ====================
document.addEventListener('DOMContentLoaded', () => {
    try {
        let gameState = null;
        let isLoadingSave = false;

        // 检查是否是加载存档
        const loadSlot = sessionStorage.getItem('xiuxian_load_slot');
        if (loadSlot) {
            isLoadingSave = true;
            // 加载存档
            const savedData = SaveManager.load(parseInt(loadSlot));
            sessionStorage.removeItem('xiuxian_load_slot');

            if (savedData) {
                // 使用保存的数据创建游戏状态
                gameState = new GameState(savedData);

                // 重置活动状态（避免加载时还在执行旧的活动）
                gameState.isMeditating = false;
                gameState.isAdventuring = false;
                gameState.isWorking = false;
                gameState.buffs.cultivation.endTime = 0;
            } else {
                alert('存档加载失败');
                window.location.href = 'character-creation.html';
                return;
            }
        } else {
            // 检查是否有新角色数据
            const characterData = sessionStorage.getItem('xiuxian_new_character');
            if (!characterData) {
                // 没有角色数据，跳转到角色创建页面
                window.location.href = 'character-creation.html';
                return;
            }

            // 创建新游戏
            const parsedCharacterData = JSON.parse(characterData);
            gameState = new GameState(parsedCharacterData);

            // 清除临时数据
            sessionStorage.removeItem('xiuxian_new_character');
        }

        // 创建UI
        const gameUI = new GameUI(gameState);

        // 设置全局变量
        window.game = gameState;
        window.ui = gameUI;

        // 初始化UI（这会绑定事件和开始游戏循环）
        gameUI.init();

        // 加载存档时添加欢迎消息
        if (isLoadingSave) {
            gameState.addLog('欢迎回来！', 'info');
        }

        // 立即增加一次修为，避免第一秒空转
        if (!gameState.isAdventuring && !gameState.isWorking) {
            const initialCultivation = gameState.calculateActualCultivationRate();
            gameState.addCultivation(initialCultivation);
        }

        // 强制更新一次UI显示
        gameUI.updateDisplay();

        // 页面关闭前保存
        window.addEventListener('beforeunload', () => {
            if (window.game) {
                window.game.save();
            }
        });

        // 定期保存
        setInterval(() => {
            if (window.game) {
                window.game.save();
            }
        }, 60000);

        console.log('欢迎来到文字修仙！');
        console.log('游戏循环已启动，修为正常增加中...');
        console.log('当前状态:', {
            realm: gameState.realm,
            level: gameState.level,
            cultivation: gameState.cultivation,
            maxCultivation: gameState.maxCultivation,
            cultivationRate: gameState.calculateActualCultivationRate().toFixed(2)
        });
        console.log('可用命令：');
        console.log('  game.save() - 保存游戏');
        console.log('  window.ui.updateDisplay() - 手动更新界面');
        console.log('  window.debugGame() - 调试游戏状态');

        // 添加调试方法
        window.debugGame = function() {
            console.log('=== 游戏状态调试 ===');
            const game = window.game;
            console.log('基本信息:', {
                姓名: game.playerName,
                道号: game.daoName,
                境界: game.realm + ' ' + game.level + '层',
                修为: game.cultivation + '/' + game.maxCultivation,
                灵石: game.spiritStones
            });
            console.log('修炼速度:', {
                基础: game.calculateBaseCultivationRate().toFixed(2),
                实际: game.calculateActualCultivationRate().toFixed(2),
                Buff: game.buffs.cultivation.multiplier
            });
            console.log('状态:', {
                入定: game.isMeditating,
                历练: game.isAdventuring,
                打工: game.isWorking
            });
            console.log('最近日志:', game.logs.slice(0, 5));
            console.log('游戏循环状态:', window.ui.updateInterval !== null);
        };

    } catch (error) {
        console.error('游戏初始化错误:', error);
        alert('游戏初始化失败：' + error.message);
    }
});