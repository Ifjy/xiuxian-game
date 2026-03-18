// ==================== 游戏配置 ====================
// 从 game.js 提取的配置文件
// 使用 ES6 模块导出语法

export const MONSTERS_CONFIG = {
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
        name: '铁狼',
        level: 3,
        tier: '凡阶',
        hp: 50,
        attack: 8,
        defense: 3,
        rewards: {
            spiritStones: [20, 50],
            cultivation: [10, 25],
            items: ['聚气丹', '铁剑'],
            dropRate: 0.25
        },
        requirements: { realm: '炼气期', level: 2 }
    },
    {
        id: 'snake_1',
        name: '毒蛇',
        level: 4,
        tier: '凡阶',
        hp: 40,
        attack: 10,
        defense: 3,
        rewards: {
            spiritStones: [25, 60],
            cultivation: [12, 30],
            items: ['聚气丹', '解毒丹'],
            dropRate: 0.3
        },
        requirements: { realm: '炼气期', level: 3 }
    },
    {
        id: 'snake_2',
        name: '巨蟒',
        level: 6,
        tier: '凡阶',
        hp: 70,
        attack: 15,
        defense: 5,
        rewards: {
            spiritStones: [40, 80],
            cultivation: [20, 40],
            items: ['筑基丹', '护甲'],
            dropRate: 0.2
        },
        requirements: { realm: '炼气期', level: 5 }
    },
    {
        id: 'bandit_1',
        name: '山贼',
        level: 5,
        tier: '凡阶',
        hp: 60,
        attack: 12,
        defense: 4,
        rewards: {
            spiritStones: [30, 70],
            cultivation: [15, 35],
            items: ['聚气丹', '灵石袋'],
            dropRate: 0.35
        },
        requirements: { realm: '炼气期', level: 4 }
    },
    {
        id: 'bandit_2',
        name: '山贼头目',
        level: 8,
        tier: '凡阶',
        hp: 100,
        attack: 20,
        defense: 8,
        rewards: {
            spiritStones: [50, 120],
            cultivation: [25, 50],
            items: ['筑基丹', '洗髓丹', '铁剑'],
            dropRate: 0.25
        },
        requirements: { realm: '炼气期', level: 7 }
    },
    // 筑基期怪物（灵阶）
    {
        id: 'tiger_1',
        name: '猛虎',
        level: 10,
        tier: '灵阶',
        hp: 200,
        attack: 40,
        defense: 15,
        rewards: {
            spiritStones: [80, 200],
            cultivation: [40, 100],
            items: ['筑基丹', '金剑'],
            dropRate: 0.3
        },
        requirements: { realm: '筑基期', level: 1 }
    },
    {
        id: 'tiger_2',
        name: '白虎',
        level: 12,
        tier: '灵阶',
        hp: 300,
        attack: 60,
        defense: 25,
        rewards: {
            spiritStones: [120, 300],
            cultivation: [60, 150],
            items: ['金剑', '护甲', '法宝材料'],
            dropRate: 0.25
        },
        requirements: { realm: '筑基期', level: 3 }
    },
    {
        id: 'demon_1',
        name: '妖兽',
        level: 11,
        tier: '灵阶',
        hp: 250,
        attack: 50,
        defense: 20,
        rewards: {
            spiritStones: [100, 250],
            cultivation: [50, 125],
            items: ['筑基丹', '洗髓丹', '悟性丹'],
            dropRate: 0.3
        },
        requirements: { realm: '筑基期', level: 2 }
    },
    {
        id: 'demon_2',
        name: '妖将',
        level: 14,
        tier: '灵阶',
        hp: 400,
        attack: 80,
        defense: 35,
        rewards: {
            spiritStones: [150, 400],
            cultivation: [75, 200],
            items: ['金丹', '法宝材料', '天劫符'],
            dropRate: 0.2
        },
        requirements: { realm: '筑基期', level: 5 }
    },
    // 金丹期怪物（圣阶）
    {
        id: 'cultivator_1',
        name: '金丹修士',
        level: 15,
        tier: '圣阶',
        hp: 800,
        attack: 120,
        defense: 60,
        rewards: {
            spiritStones: [300, 800],
            cultivation: [150, 400],
            items: ['金丹', '悟性丹', '仙阶法宝'],
            dropRate: 0.25
        },
        requirements: { realm: '金丹期', level: 1 }
    },
    {
        id: 'cultivator_2',
        name: '元婴修士',
        level: 18,
        tier: '圣阶',
        hp: 1200,
        attack: 180,
        defense: 90,
        rewards: {
            spiritStones: [500, 1200],
            cultivation: [250, 600],
            items: ['仙阶法宝', '天劫符', '飞升令'],
            dropRate: 0.2
        },
        requirements: { realm: '金丹期', level: 5 }
    },
    {
        id: 'beast_king_1',
        name: '兽王',
        level: 16,
        tier: '圣阶',
        hp: 1000,
        attack: 150,
        defense: 75,
        rewards: {
            spiritStones: [400, 1000],
            cultivation: [200, 500],
            items: ['仙阶法宝', '法宝材料', '天劫符'],
            dropRate: 0.22
        },
        requirements: { realm: '金丹期', level: 3 }
    }
],

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
},
};
