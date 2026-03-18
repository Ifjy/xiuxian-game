// ==================== 游戏配置 ====================
// 从 game.js 提取的配置文件
// 使用 ES6 模块导出语法

export const DUNGEONS_CONFIG = {
dungeons: {
    'wolf_mountain': {
        id: 'wolf_mountain',
        name: '狼山',
        description: '群狼聚集的山峰，低级修士的试炼场',
        tier: '凡阶',
        minRealm: '炼气期',
        minLevel: 1,
        monsters: ['wolf_1', 'wolf_2'],
        boss: {
            id: 'wolf_boss',
            name: '狼王',
            hp: 150,
            attack: 20,
            defense: 10,
            rewards: {
                spiritStones: [200, 400],
                cultivation: [100, 200],
                items: ['筑基丹', '铁剑'],
                dropRate: 0.5
            }
        },
        completionRewards: {
            spiritStones: 500,
            cultivation: 250,
            items: ['聚气丹', '聚气丹', '聚气丹']
        },
        unlockRequirements: { realm: '炼气期', level: 1 }
    },
    'snake_valley': {
        id: 'snake_valley',
        name: '蛇谷',
        description: '毒蛇横行的山谷，稍有不慎便会丧命',
        tier: '凡阶',
        minRealm: '炼气期',
        minLevel: 3,
        monsters: ['snake_1', 'snake_2'],
        boss: {
            id: 'snake_boss',
            name: '蛇妖',
            hp: 200,
            attack: 25,
            defense: 12,
            rewards: {
                spiritStones: [300, 600],
                cultivation: [150, 300],
                items: ['筑基丹', '洗髓丹'],
                dropRate: 0.4
            }
        },
        completionRewards: {
            spiritStones: 800,
            cultivation: 400,
            items: ['筑基丹', '灵石袋']
        },
        unlockRequirements: { realm: '炼气期', level: 5 }
    },
    'bandit_hideout': {
        id: 'bandit_hideout',
        name: '山贼据点',
        description: '山贼盘踞的据点，有许多宝物',
        tier: '凡阶',
        minRealm: '炼气期',
        minLevel: 5,
        monsters: ['bandit_1', 'bandit_2'],
        boss: {
            id: 'bandit_boss',
            name: '山贼大王',
            hp: 300,
            attack: 35,
            defense: 18,
            rewards: {
                spiritStones: [500, 1000],
                cultivation: [250, 500],
                items: ['洗髓丹', '灵石袋'],
                dropRate: 0.5
            }
        },
        completionRewards: {
            spiritStones: 1500,
            cultivation: 750,
            items: ['洗髓丹', '悟性丹']
        },
        unlockRequirements: { realm: '炼气期', level: 9 }
    },
    'tiger_cave': {
        id: 'tiger_cave',
        name: '猛虎洞',
        description: '猛虎栖息的洞穴，危险异常',
        tier: '灵阶',
        minRealm: '筑基期',
        minLevel: 1,
        monsters: ['tiger_1', 'tiger_2'],
        boss: {
            id: 'tiger_boss',
            name: '虎王',
            hp: 800,
            attack: 100,
            defense: 50,
            rewards: {
                spiritStones: [1000, 2000],
                cultivation: [500, 1000],
                items: ['金剑', '护甲'],
                dropRate: 0.4
            }
        },
        completionRewards: {
            spiritStones: 3000,
            cultivation: 1500,
            items: ['筑基丹', '筑基丹', '洗髓丹']
        },
        unlockRequirements: { realm: '筑基期', level: 3 }
    },
    'demon_forest': {
        id: 'demon_forest',
        name: '妖兽森林',
        description: '妖兽出没的森林，只有强者敢于进入',
        tier: '灵阶',
        minRealm: '筑基期',
        minLevel: 5,
        monsters: ['demon_1', 'demon_2'],
        boss: {
            id: 'demon_boss',
            name: '妖王',
            hp: 1500,
            attack: 150,
            defense: 75,
            rewards: {
                spiritStones: [2000, 4000],
                cultivation: [1000, 2000],
                items: ['悟性丹', '法宝材料'],
                dropRate: 0.3
            }
        },
        completionRewards: {
            spiritStones: 5000,
            cultivation: 2500,
            items: ['悟性丹', '天劫符']
        },
        unlockRequirements: { realm: '筑基期', level: 9 }
    },
    'ancient_ruins': {
        id: 'ancient_ruins',
        name: '上古遗迹',
        description: '上古修仙者留下的遗迹，宝物与危险并存',
        tier: '圣阶',
        minRealm: '金丹期',
        minLevel: 1,
        monsters: ['cultivator_1', 'cultivator_2', 'beast_king_1'],
        boss: {
            id: 'ancient_guardian',
            name: '遗迹守护者',
            hp: 3000,
            attack: 200,
            defense: 100,
            rewards: {
                spiritStones: [5000, 10000],
                cultivation: [2500, 5000],
                items: ['仙阶法宝', '天劫符'],
                dropRate: 0.2
            }
        },
        completionRewards: {
            spiritStones: 15000,
            cultivation: 7500,
            items: ['仙阶法宝', '飞升令']
        },
        unlockRequirements: { realm: '金丹期', level: 5 }
    }
},
};
