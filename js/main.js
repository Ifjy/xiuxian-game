/**
 * 修仙游戏 - 主入口文件
 * 负责初始化游戏状态和界面
 */

import { GameState } from './core/GameState.js';
import { GameUI } from './core/GameUI.js';
import { SaveManager } from './core/SaveManager.js';

/**
 * 获取角色创建数据
 * @returns {Object|null} 角色数据或null
 */
function getCharacterDataFromCreation() {
    const characterData = sessionStorage.getItem('xiuxian_new_character');
    if (!characterData) {
        return null;
    }
    const parsedData = JSON.parse(characterData);
    sessionStorage.removeItem('xiuxian_new_character');
    return parsedData;
}

/**
 * 加载存档
 * @param {number} slot 存档槽位
 * @returns {Object|null} 存档数据或null
 */
function loadSave(slot) {
    const savedData = SaveManager.load(slot);
    if (!savedData) {
        return null;
    }
    return savedData;
}

/**
 * 初始化游戏
 */
function initGame() {
    try {
        console.log('游戏初始化中...');

        let gameState = null;
        let isLoadingSave = false;

        // 检查是否是加载存档
        const loadSlot = sessionStorage.getItem('xiuxian_load_slot');
        if (loadSlot) {
            isLoadingSave = true;
            const savedData = loadSave(parseInt(loadSlot));
            sessionStorage.removeItem('xiuxian_load_slot');

            if (savedData) {
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
            const characterData = getCharacterDataFromCreation();
            if (!characterData) {
                // 没有角色数据，跳转到角色创建页面
                window.location.href = 'character-creation.html';
                return;
            }

            // 创建新游戏
            gameState = new GameState(characterData);
        }

        // 创建UI
        const gameUI = new GameUI(gameState);

        // 设置全局变量（用于调试和控制台访问）
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

        // 定期保存（每60秒）
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

            console.log('基本信息：', {
                realm: game.realm,
                level: game.level,
                cultivation: game.cultivation,
                maxCultivation: game.maxCultivation,
                cultivationRate: game.calculateActualCultivationRate()
            });

            console.log('属性：', {
                attack: game.attack,
                defense: game.defense,
                speed: game.speed,
                hp: game.hp,
                maxHp: game.maxHp
            });

            console.log('状态：', {
                isMeditating: game.isMeditating,
                isAdventuring: game.isAdventuring,
                isWorking: game.isWorking
            });

            console.log('背包：', game.inventory);
            console.log('装备：', game.equipment);
            console.log('已学功法：', game.learnedSkills);

            return game;
        };

        console.log('游戏启动成功！');

    } catch (error) {
        console.error('游戏初始化失败:', error);
        alert('游戏初始化失败：' + error.message + '\n请刷新页面重试');
    }
}

// DOM加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
