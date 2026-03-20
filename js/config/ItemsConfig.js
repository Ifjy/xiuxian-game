// ==================== 游戏配置 ====================
// 从 game.js 提取的配置文件
// 使用 ES6 模块导出语法

export const ITEMS_CONFIG = {
items: {
    '聚气丹': {
        description: '短时间内提升修炼速度',
        effect: 'cultivation_boost',
        value: 2.0,
        duration: 60000,
        rarity: 'common',
        price: 50,
        consume: true  // 可使用
    },
    '筑基丹': {
        description: '大幅提升突破成功率',
        effect: 'breakthrough_boost',
        value: 0.3,
        duration: 0,
        rarity: 'rare',
        price: 500,
        consume: true  // 可使用
    },
    '灵石袋': {
        description: '包含随机数量的灵石（约80-200个）',
        effect: 'spirit_stones',
        value: [80, 200],
        duration: 0,
        rarity: 'common',
        price: 100,
        consume: true  // 可使用
    },
    '天劫符': {
        description: '渡劫时使用，大幅提升成功率',
        effect: 'tribulation_boost',
        value: 0.5,
        duration: 0,
        rarity: 'legendary',
        price: 5000,
        consume: true  // 可使用
    },
    '洗髓丹': {
        description: '改善根骨，永久增加根骨+1',
        effect: 'potential_boost',
        value: 1,
        duration: 0,
        rarity: 'rare',
        price: 1000,
        consume: true  // 可使用
    },
    '悟性丹': {
        description: '开启智慧，永久增加悟性+1',
        effect: 'wisdom_boost',
        value: 1,
        duration: 0,
        rarity: 'rare',
        price: 1000,
        consume: true  // 可使用
    },
    '幸运符': {
        description: '暂时提升幸运',
        effect: 'luck_boost',
        value: 5,
        duration: 300000,
        rarity: 'common',
        price: 200,
        consume: true  // 可使用
    },
    '灵宠丹': {
        description: '提升宠物等级',
        effect: 'pet_level',
        value: 1,
        rarity: 'rare',
        price: 1500,
        consume: true  // 可使用
    }
},

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
};
