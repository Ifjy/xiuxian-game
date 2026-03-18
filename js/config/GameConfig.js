// ==================== 游戏配置 ====================
// 从 game.js 提取的配置文件
// 使用 ES6 模块导出语法

export const GAME_CONFIG = {
spiritualRoots: {
    // 天灵根（单元素，最强）
    '天火灵根': {
        tier: '天灵根',
        element: '火',
        cultivationBonus: 1.5,      // 修炼速度+50%
        skillBonus: 1.3,            // 功法学习+30%
        alchemyBonus: 1.2,          // 炼丹成功率+20%
        combatBonus: { fire: 0.3 }, // 火系技能威力+30%
        description: '天灵根之最，火焰之力，修炼如神助',
        color: '#FF4500',
        chance: 0.01  // 1%概率
    },
    '天水灵根': {
        tier: '天灵根',
        element: '水',
        cultivationBonus: 1.5,
        skillBonus: 1.3,
        alchemyBonus: 1.4,  // 水灵根炼丹更强
        combatBonus: { water: 0.3 },
        description: '天灵根之最，水之精华，炼丹如神',
        color: '#1E90FF',
        chance: 0.01
    },
    '天木灵根': {
        tier: '天灵根',
        element: '木',
        cultivationBonus: 1.5,
        skillBonus: 1.3,
        alchemyBonus: 1.3,
        combatBonus: { wood: 0.3 },
        healingBonus: 0.3,  // 木灵根治疗效果+30%
        description: '天灵根之最，生命之源，恢复如神',
        color: '#228B22',
        chance: 0.01
    },
    '天金灵根': {
        tier: '天灵根',
        element: '金',
        cultivationBonus: 1.5,
        skillBonus: 1.3,
        alchemyBonus: 1.1,
        combatBonus: { metal: 0.3 },
        attackBonus: 0.2,  // 金灵根攻击力+20%
        description: '天灵根之最，锋芒毕露，战力如神',
        color: '#FFD700',
        chance: 0.01
    },
    '天土灵根': {
        tier: '天灵根',
        element: '土',
        cultivationBonus: 1.5,
        skillBonus: 1.3,
        alchemyBonus: 1.1,
        combatBonus: { earth: 0.3 },
        defenseBonus: 0.2,  // 土灵根防御力+20%
        description: '天灵根之最，厚德载物，防御如神',
        color: '#8B4513',
        chance: 0.01
    },
    // 地灵根（双元素，较强）
    '水木灵根': {
        tier: '地灵根',
        elements: ['水', '木'],
        cultivationBonus: 1.25,
        skillBonus: 1.15,
        alchemyBonus: 1.3,
        healingBonus: 0.15,
        description: '水木相生，修炼与炼丹皆有优势',
        color: '#20B2AA',
        chance: 0.05
    },
    '火土灵根': {
        tier: '地灵根',
        elements: ['火', '土'],
        cultivationBonus: 1.25,
        skillBonus: 1.15,
        alchemyBonus: 1.1,
        combatBonus: { fire: 0.15, earth: 0.15 },
        description: '火土相济，战力与防御皆佳',
        color: '#CD5C5C',
        chance: 0.05
    },
    '金木灵根': {
        tier: '地灵根',
        elements: ['金', '木'],
        cultivationBonus: 1.25,
        skillBonus: 1.15,
        alchemyBonus: 1.2,
        attackBonus: 0.1,
        healingBonus: 0.1,
        description: '金木相克，攻守平衡',
        color: '#9ACD32',
        chance: 0.05
    },
    // 人灵根（三元素，普通）
    '金木水灵根': {
        tier: '人灵根',
        elements: ['金', '木', '水'],
        cultivationBonus: 1.1,
        skillBonus: 1.05,
        alchemyBonus: 1.15,
        description: '三灵根，中规中矩',
        color: '#4682B4',
        chance: 0.2
    },
    '木水火灵根': {
        tier: '人灵根',
        elements: ['木', '水', '火'],
        cultivationBonus: 1.1,
        skillBonus: 1.05,
        alchemyBonus: 1.2,
        combatBonus: { fire: 0.1 },
        description: '三灵根，修炼平稳',
        color: '#DC143C',
        chance: 0.2
    },
    '水火土灵根': {
        tier: '人灵根',
        elements: ['水', '火', '土'],
        cultivationBonus: 1.1,
        skillBonus: 1.05,
        alchemyBonus: 1.1,
        combatBonus: { fire: 0.1, earth: 0.1 },
        description: '三灵根，水火交融',
        color: '#B8860B',
        chance: 0.2
    },
    // 杂灵根（四/五元素，较弱）
    '四系灵根': {
        tier: '杂灵根',
        elements: ['金', '木', '水', '火'],
        cultivationBonus: 1.0,
        skillBonus: 1.0,
        alchemyBonus: 1.0,
        description: '四系杂灵根，修炼缓慢',
        color: '#808080',
        chance: 0.3
    },
    '五系灵根': {
        tier: '杂灵根',
        elements: ['金', '木', '水', '火', '土'],
        cultivationBonus: 0.9,  // 修炼速度-10%
        skillBonus: 0.95,     // 功法学习-5%
        alchemyBonus: 1.0,
        description: '五系杂灵根，仙途艰难',
        color: '#696969',
        chance: 0.05
    }
},

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

    meditationEvents: [
    {
        name: '灵气波动',
        message: '四周灵气突然充沛起来！',
        effect: 'cultivation_boost',
        value: [10, 50],
        chance: 0.08
    }
],

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
    }
],

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
    }
],

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
    }
],

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
        id: 'qingyun_sect',
        name: '青云宗',
        description: '正道大宗，讲究循序渐进，稳扎稳打',
        requirements: { realm: '炼气期', level: 3 },
        benefits: {
            cultivationBonus: 0.1,
            defenseBonus: 0.05
        },
        joinCost: 500
    },
    {
        id: 'tianjian_sect',
        name: '天剑宗',
        description: '剑修圣地，攻击力强大',
        requirements: { realm: '炼气期', level: 5 },
        benefits: {
            attackBonus: 0.15,
            breakthroughChance: 0.05
        },
        joinCost: 800
    },
    {
        id: 'yaowang_valley',
        name: '药王谷',
        description: '炼丹圣地，擅长炼丹和治疗',
        requirements: { realm: '炼气期', level: 3 },
        benefits: {
            alchemyBonus: 0.2,
            healthRegen: 0.1
        },
        joinCost: 600
    },
    {
        id: 'demon_sect',
        name: '魔教',
        description: '魔道大宗，实力强大但修炼艰难',
        requirements: { realm: '筑基期', level: 1 },
        benefits: {
            cultivationBonus: 0.2,
            attackBonus: 0.1
        },
        joinCost: 2000
    }
],

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
    }
],

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

    npcs: {
    'sect_elder': {
        id: 'sect_elder',
        name: '宗门长老',
        title: '青云宗长老',
        description: '负责管理宗门事务的威严长者',
        avatar: '👴',
        location: 'sect',
        requirements: {
            sect: 'qingyun_sect'
        },
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
            { type: 'chat', description: '请教' },
            { type: 'give_gift', description: '赠送礼物' }
        ],
        gifts: {
            '聚气丹': { affection: 5 },
            '筑基丹': { affection: 20 },
            '灵石': { affection: 0.01 }
        }
    },
    'mysterious_taoist': {
        id: 'mysterious_taoist',
        name: '神秘道人',
        title: '云游四方的修仙者',
        description: '一身灰袍，来去无踪，似乎知道许多秘密',
        avatar: '🧙',
        location: 'adventure',
        requirements: {
            realm: '炼气期',
            level: 3
        },
        dialogs: {
            'greeting': {
                text: '呵呵，有趣有趣。我游历天下，见过无数修仙者，但像你这样的...很少见。',
                options: [
                    { text: '道长过奖了', next: 'humble' },
                    { text: '道长是何方神圣？', next: 'identity' },
                    { text: '告辞', next: null }
                ]
            },
            'humble': {
                text: '并非过奖。修仙之道，天赋固然重要，但更重要的是心境。你心性不错，日后必成大器。',
                options: [
                    { text: '多谢道长指点', next: null }
                ]
            },
            'identity': {
                text: '我不过是个云游修仙者罢了。追寻天道，遍访名山大川。你若想听故事，我可以给你讲讲。',
                options: [
                    { text: '我想听关于上古秘境的传说', next: 'ancient_secret' },
                    { text: '我想听关于修仙境界的事', next: 'realms_info' },
                    { text: '下次再听', next: null }
                ]
            },
            'ancient_secret': {
                text: '上古秘境...那是很危险的地方。传闻中有无数宝物，但也有恐怖的守护者。只有真正的强者才能活着出来。',
                options: [
                    { text: '多谢告知', next: null }
                ]
            },
            'realms_info': {
                text: '修仙境界，从炼气到筑基，再到金丹、元婴...每一步都是一次蜕变。突破境界时最是凶险，需要做好准备。',
                options: [
                    { text: '受教了', next: null }
                ]
            }
        },
        actions: [
            { type: 'chat', description: '交谈' },
            { type: 'buy_info', description: '购买情报 (100灵石)' }
        ],
        gifts: {
            '灵石': { affection: 0.05 },
            '稀有物品': { affection: 10 }
        }
    },
    'merchant': {
        id: 'merchant',
        name: '坊市商贾',
        title: '做灵石生意的商人',
        description: '眼睛很小，总是笑眯眯的，看起来很精明',
        avatar: '🧔',
        location: 'market',
        requirements: {
            realm: '炼气期'
        },
        dialogs: {
            'greeting': {
                text: '哎呀呀，客官您来了！小店虽然不大，但货物齐全。您看看有什么需要的？',
                options: [
                    { text: '看看你的货物', next: 'show_wares' },
                    { text: '最近有什么消息吗？', next: 'market_info' },
                    { text: '我只是路过', next: null }
                ]
            },
            'show_wares': {
                text: '小店有聚气丹、筑基丹等各种丹药，还有灵石袋。价格公道，童叟无欺！当然，如果您有稀有物品，我也可以收购。',
                options: [
                    { text: '我下次再来买', next: null }
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

    storyQuests: {
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
                    { type: 'cultivation', value: 50 },
                    { type: 'spiritStones', value: 100 }
                ]
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
                    unlockNPC: 'sect_elder'
                }
            }
        ],
        onComplete: {
            chapter: 2,
            rewards: [
                { type: 'item', value: '聚气丹', amount: 5 }
            ]
        }
    },
    'cultivation_milestone_1': {
        id: 'cultivation_milestone_1',
        chapter: 1,
        name: '修炼小成',
        description: '积累修为，稳固根基',
        type: 'side',
        requirements: { realm: '炼气期', level: 1 },
        stages: [
            {
                id: 'stage1',
                name: '积累修为',
                description: '修炼到500修为',
                objective: { type: 'cultivate', target: 500 },
                rewards: [
                    { type: 'cultivation', value: 100 },
                    { type: 'spiritStones', value: 200 }
                ]
            }
        ],
        onComplete: {
            rewards: [
                { type: 'item', value: '聚气丹', amount: 3 }
            ]
        }
    },
    'cultivation_milestone_2': {
        id: 'cultivation_milestone_2',
        chapter: 1,
        name: '修炼精进',
        description: '继续修炼，追求更高的境界',
        type: 'side',
        requirements: { realm: '炼气期', level: 3 },
        stages: [
            {
                id: 'stage1',
                name: '精进修为',
                description: '修炼到2000修为',
                objective: { type: 'cultivate', target: 2000 },
                rewards: [
                    { type: 'cultivation', value: 200 },
                    { type: 'spiritStones', value: 500 }
                ]
            }
        ],
        onComplete: {
            rewards: [
                { type: 'item', value: '筑基丹', amount: 1 }
            ]
        }
    },
    'breakthrough_qi_refining': {
        id: 'breakthrough_qi_refining',
        chapter: 2,
        name: '突破炼气期',
        description: '努力突破到筑基期',
        type: 'main',
        requirements: { realm: '炼气期', level: 7 },
        stages: [
            {
                id: 'stage1',
                name: '准备突破',
                description: '达到炼气期9层',
                objective: { type: 'breakthrough', target: 9 },
                rewards: [
                    { type: 'cultivation', value: 300 },
                    { type: 'spiritStones', value: 1000 }
                ],
                onComplete: {
                    message: '已做好突破准备，可以尝试突破到筑基期'
                }
            }
        ],
        onComplete: {
            chapter: 3,
            rewards: [
                { type: 'item', value: '筑基丹', amount: 2 },
                { type: 'item', value: '洗髓丹', amount: 1 }
            ]
        }
    },
    'adventure_exploration': {
        id: 'adventure_exploration',
        chapter: 1,
        name: '历练探索',
        description: '外出历练，增长见识',
        type: 'side',
        requirements: { realm: '炼气期', level: 2 },
        stages: [
            {
                id: 'stage1',
                name: '初次历练',
                description: '完成3次历练',
                objective: { type: 'adventure', target: 3 },
                rewards: [
                    { type: 'spiritStones', value: 300 },
                    { type: 'cultivation', value: 150 }
                ]
            }
        ],
        onComplete: {
            rewards: [
                { type: 'item', value: '聚气丹', amount: 5 }
            ]
        }
    },
    'adventure_veteran': {
        id: 'adventure_veteran',
        chapter: 2,
        name: '历练老手',
        description: '成为历练达人',
        type: 'side',
        requirements: { realm: '炼气期', level: 5 },
        stages: [
            {
                id: 'stage1',
                name: '多次历练',
                description: '完成10次历练',
                objective: { type: 'adventure', target: 10 },
                rewards: [
                    { type: 'spiritStones', value: 800 },
                    { type: 'cultivation', value: 400 }
                ]
            }
        ],
        onComplete: {
            rewards: [
                { type: 'item', value: '筑基丹', amount: 2 },
                { type: 'item', value: '铁剑', amount: 1 }
            ]
        }
    },
    'combat_training': {
        id: 'combat_training',
        chapter: 1,
        name: '战斗训练',
        description: '通过战斗磨练技艺',
        type: 'side',
        requirements: { realm: '炼气期', level: 1 },
        stages: [
            {
                id: 'stage1',
                name: '击败野兽',
                description: '击败5只怪物',
                objective: { type: 'defeat_monsters', target: 5 },
                rewards: [
                    { type: 'spiritStones', value: 200 },
                    { type: 'cultivation', value: 100 }
                ]
            }
        ],
        onComplete: {
            rewards: [
                { type: 'item', value: '聚气丹', amount: 3 }
            ]
        }
    },
    'combat_master': {
        id: 'combat_master',
        chapter: 2,
        name: '战斗大师',
        description: '成为战斗高手',
        type: 'side',
        requirements: { realm: '炼气期', level: 6 },
        stages: [
            {
                id: 'stage1',
                name: '击败强敌',
                description: '击败20只怪物',
                objective: { type: 'defeat_monsters', target: 20 },
                rewards: [
                    { type: 'spiritStones', value: 1000 },
                    { type: 'cultivation', value: 500 }
                ]
            }
        ],
        onComplete: {
            rewards: [
                { type: 'item', value: '金剑', amount: 1 },
                { type: 'item', value: '护甲', amount: 1 }
            ]
        }
    },
    'sect_joining': {
        id: 'sect_joining',
        chapter: 2,
        name: '加入宗门',
        description: '找到一个适合自己的宗门',
        type: 'side',
        requirements: { realm: '炼气期', level: 3 },
        stages: [
            {
                id: 'stage1',
                name: '积累贡献',
                description: '获得100宗门贡献',
                objective: { type: 'sect_contribution', target: 100 },
                rewards: [
                    { type: 'spiritStones', value: 500 },
                    { type: 'sect_contribution', value: 50 }
                ]
            }
        ],
        onComplete: {
            rewards: [
                { type: 'item', value: '筑基丹', amount: 1 }
            ]
        }
    },
    'sect_promotion': {
        id: 'sect_promotion',
        chapter: 3,
        name: '宗门晋升',
        description: '在宗门中晋升等级',
        type: 'side',
        requirements: { sect: '!none', realm: '炼气期', level: 5 },
        stages: [
            {
                id: 'stage1',
                name: '晋升内门',
                description: '晋升到内门弟子',
                objective: { type: 'sect_rank', target: '内门弟子' },
                rewards: [
                    { type: 'spiritStones', value: 1500 },
                    { type: 'sect_contribution', value: 200 },
                    { type: 'sect_reputation', value: 100 }
                ]
            }
        ],
        onComplete: {
            rewards: [
                { type: 'item', value: '洗髓丹', amount: 2 },
                { type: 'item', value: '悟性丹', amount: 1 }
            ]
        }
    },
    'breakthrough_zhuji': {
        id: 'breakthrough_zhuji',
        chapter: 3,
        name: '突破筑基期',
        description: '努力突破到金丹期',
        type: 'main',
        requirements: { realm: '筑基期', level: 7 },
        stages: [
            {
                id: 'stage1',
                name: '准备突破',
                description: '达到筑基期9层',
                objective: { type: 'breakthrough', target: 9 },
                rewards: [
                    { type: 'cultivation', value: 1000 },
                    { type: 'spiritStones', value: 5000 }
                ],
                onComplete: {
                    message: '已做好突破准备，可以尝试突破到金丹期'
                }
            }
        ],
        onComplete: {
            chapter: 4,
            rewards: [
                { type: 'item', value: '金丹', amount: 3 },
                { type: 'item', value: '天劫符', amount: 1 }
            ]
        }
    }
},

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

// 境界成就配置
realmAchievements: {
    '炼气期': {
        id: 'realm_qi',
        name: '炼气初成',
        requirements: { realm: '炼气期', level: 9 },
        rewards: {
            good: { chance: 0.5, items: ['聚气丹'], spiritStones: 100 },
            normal: { items: ['聚气丹'], spiritStones: 50 }
        },
        description: '完成炼气期修炼'
    },
    '筑基期': {
        id: 'realm_zhuji',
        name: '筑基成功',
        requirements: { realm: '筑基期', level: 9 },
        rewards: {
            good: { chance: 0.4, items: ['筑基丹'], spiritStones: 500 },
            normal: { items: ['聚气丹 x3'], spiritStones: 200 }
        },
        description: '完成筑基期修炼'
    },
    '金丹期': {
        id: 'realm_jindan',
        name: '金丹大成',
        requirements: { realm: '金丹期', level: 9 },
        rewards: {
            good: { chance: 0.3, items: ['筑基丹 x2'], spiritStones: 2000 },
            normal: { items: ['聚气丹 x5'], spiritStones: 1000 }
        },
        description: '完成金丹期修炼'
    },
    '元婴期': {
        id: 'realm_yuanying',
        name: '元婴诞生',
        requirements: { realm: '元婴期', level: 9 },
        rewards: {
            good: { chance: 0.2, items: ['金丹 x2'], spiritStones: 10000 },
            normal: { items: ['筑基丹 x3'], spiritStones: 5000 }
        },
        description: '完成元婴期修炼'
    },
    '化神期': {
        id: 'realm_huashen',
        name: '化神大成',
        requirements: { realm: '化神期', level: 9 },
        rewards: {
            good: { chance: 0.15, items: ['元婴丹 x2'], spiritStones: 50000 },
            normal: { items: ['金丹 x3'], spiritStones: 20000 }
        },
        description: '完成化神期修炼'
    }
}
};
