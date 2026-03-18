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
