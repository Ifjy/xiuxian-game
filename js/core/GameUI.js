import { GAME_CONFIG as CONFIG } from '../config/GameConfig.js';
import { ASCII_ART } from '../config/ASCIIArt.js';
import { SaveManager } from './SaveManager.js';

/**
 * GameUI 类 - 处理游戏界面相关的所有操作
 */
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

            // 副本按钮事件绑定
            const dungeonBtn = document.getElementById('dungeonBtn');
            if (dungeonBtn) {
                dungeonBtn.addEventListener('click', () => {
                    try {
                        this.showDungeonList();
                    } catch (e) {
                        console.error('显示副本列表出错:', e);
                        this.state.addLog('副本列表打开失败：' + e.message, 'danger');
                        this.updateLogs();
                    }
                });
            }

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
                        <button class="slot-action-btn" data-action="save" data-slot="${save.slot}">保存到此槽位</button>
                    </div>
                `;
            } else {
                html += `
                    <div class="slot-content">
                        <div class="player-info">
                            <div><strong>角色：</strong>${save.data.playerName}</div>
                            <div><strong>道号：</strong>${save.data.daoName}</div>
                            <div><strong>境界：</strong>${save.data.realm} ${save.data.level}层</div>
                            <div><strong>修为：</strong>${this.formatNumber(save.data.cultivation)}/${this.formatNumber(save.data.maxCultivation)}</div>
                            <div><strong>灵石：</strong>${this.formatNumber(save.data.spiritStones)}</div>
                            <div><strong>游戏时长：</strong>${save.data.totalDays.toFixed(2)}天</div>
                            <div><strong>保存时间：</strong>${save.timestamp}</div>
                        </div>
                        <div class="slot-actions">
                            ${!isCurrent ? `<button class="slot-action-btn" data-action="load" data-slot="${save.slot}">加载存档</button>` : ''}
                            <button class="slot-action-btn" data-action="overwrite" data-slot="${save.slot}">覆盖保存</button>
                            <button class="slot-action-btn danger" data-action="export" data-slot="${save.slot}">导出存档</button>
                            <button class="slot-action-btn danger" data-action="delete" data-slot="${save.slot}">删除存档</button>
                        </div>
                    </div>
                `;
            }

            html += `
                </div>
            `;
        });

        html += `
                </div>
                <div class="save-actions">
                    <button class="slot-action-btn" id="importSaveBtn">导入存档</button>
                    <button class="slot-action-btn" id="closeSaveBtn">关闭</button>
                </div>
            </div>
        `;

        modalBody.innerHTML = html;

        // 绑定按钮事件
        modalBody.querySelectorAll('.slot-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.getAttribute('data-action');
                const slot = parseInt(btn.getAttribute('data-slot'));

                switch (action) {
                    case 'save':
                        this.state.saveSlot = slot;
                        this.state.save();
                        this.showSaveModal();
                        this.state.addLog(`已保存到槽位 ${slot}`, 'success');
                        break;
                    case 'load':
                        if (confirm('确定要加载此存档吗？当前未保存的进度将丢失！')) {
                            sessionStorage.setItem('xiuxian_load_slot', slot);
                            window.location.href = 'character-creation.html';
                        }
                        break;
                    case 'overwrite':
                        this.state.saveSlot = slot;
                        this.state.save();
                        this.showSaveModal();
                        this.state.addLog(`已覆盖保存到槽位 ${slot}`, 'success');
                        break;
                    case 'export':
                        this.exportSave(slot);
                        break;
                    case 'delete':
                        if (confirm('确定要删除此存档吗？此操作不可恢复！')) {
                            SaveManager.deleteSave(slot);
                            this.showSaveModal();
                            this.state.addLog(`已删除槽位 ${slot} 的存档`, 'info');
                        }
                        break;
                }
            });
        });

        // 导入存档按钮
        modalBody.querySelector('#importSaveBtn').addEventListener('click', () => {
            this.importSave();
        });

        // 关闭按钮
        modalBody.querySelector('#closeSaveBtn').addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.classList.add('active');
    }

    // 导出存档
    exportSave(slot) {
        const saveData = SaveManager.getRawSaveData(slot);
        if (!saveData) {
            alert('存档数据不存在');
            return;
        }

        const dataStr = JSON.stringify(saveData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `xiuxian_save_slot${slot}_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.state.addLog(`已导出槽位 ${slot} 的存档`, 'success');
    }

    // 导入存档
    importSave() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const saveData = JSON.parse(event.target.result);
                    if (!saveData.playerName || !saveData.realm) {
                        throw new Error('无效的存档文件');
                    }

                    // 找到第一个空槽位或让用户选择
                    const allSaves = SaveManager.getAllSaves();
                    const emptySlot = allSaves.find(s => s.empty);

                    if (emptySlot) {
                        if (confirm(`将导入到槽位 ${emptySlot.slot}，确定吗？`)) {
                            SaveManager.saveToSlot(emptySlot.slot, saveData);
                            this.showSaveModal();
                            this.state.addLog(`已导入存档到槽位 ${emptySlot.slot}`, 'success');
                        }
                    } else {
                        const slot = prompt('所有槽位都已占用，请输入要覆盖的槽位编号(1-3):');
                        if (slot && slot >= 1 && slot <= 3) {
                            if (confirm(`确定要覆盖槽位 ${slot} 吗？`)) {
                                SaveManager.saveToSlot(parseInt(slot), saveData);
                                this.showSaveModal();
                                this.state.addLog(`已导入存档到槽位 ${slot}`, 'success');
                            }
                        }
                    }
                } catch (error) {
                    alert('导入失败：' + error.message);
                }
            };
            reader.readAsText(file);
        };

        input.click();
    }

    // 显示商店界面
    showShop() {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = '┌─── 商 店 ───┐';

        let html = '<div class="shop-tabs">';
        html += '<button class="shop-tab active" data-tab="items">道具</button>';
        html += '<button class="shop-tab" data-tab="skills">功法</button>';
        html += '</div>';

        html += '<div class="shop-tab-content" id="tabItems">';
        html += '<div class="shop-list">';

        for (const [itemName, itemConfig] of Object.entries(CONFIG.items)) {
            if (!itemConfig.price) continue;

            html += `
                <div class="shop-item" data-item="${itemName}">
                    <div class="item-name">${itemName}</div>
                    <div class="item-description">${itemConfig.description}</div>
                    <div class="item-price">${itemConfig.price} 灵石</div>
                </div>
            `;
        }

        html += '</div></div>';

        html += '<div class="shop-tab-content" id="tabSkills" style="display: none;">';
        html += '<div class="shop-list">';

        for (const [skillName, skillConfig] of Object.entries(CONFIG.skills)) {
            if (!skillConfig.learnCost) continue;

            html += `
                <div class="shop-item" data-skill="${skillName}">
                    <div class="item-name">${skillName} (${skillConfig.tier})</div>
                    <div class="item-description">${skillConfig.description}</div>
                    <div class="item-price">${skillConfig.learnCost} 灵石</div>
                </div>
            `;
        }

        html += '</div></div>';

        modalBody.innerHTML = html;

        // 标签切换
        modalBody.querySelectorAll('.shop-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                modalBody.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const tabName = tab.getAttribute('data-tab');
                modalBody.querySelectorAll('.shop-tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                modalBody.querySelector(`#tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).style.display = 'block';
            });
        });

        // 购买物品
        modalBody.querySelectorAll('#tabItems .shop-item').forEach(item => {
            item.addEventListener('click', () => {
                const itemName = item.getAttribute('data-item');
                const itemConfig = CONFIG.items[itemName];
                if (this.state.spiritStones >= itemConfig.price) {
                    this.state.spiritStones -= itemConfig.price;
                    this.state.addItem(itemName);
                    this.state.addLog(`购买了${itemName}`, 'success');
                    this.updateDisplay();
                } else {
                    alert('灵石不足');
                }
            });
        });

        // 购买功法
        modalBody.querySelectorAll('#tabSkills .shop-item').forEach(item => {
            item.addEventListener('click', () => {
                const skillName = item.getAttribute('data-skill');
                const skillConfig = CONFIG.skills[skillName];
                if (this.state.spiritStones >= skillConfig.learnCost) {
                    if (this.state.skills[skillName]) {
                        alert('已经学过此功法');
                        return;
                    }

                    // 检查前置要求
                    if (skillConfig.requirements) {
                        const realmNames = Object.keys(CONFIG.realms);
                        const currentRealmIndex = realmNames.indexOf(this.state.realm);
                        const requiredRealmIndex = realmNames.indexOf(skillConfig.requirements.realm);

                        if (currentRealmIndex < requiredRealmIndex) {
                            alert(`境界不足，需要${skillConfig.requirements.realm}`);
                            return;
                        }

                        if (currentRealmIndex === requiredRealmIndex && this.state.level < skillConfig.requirements.level) {
                            alert(`层级不足，需要${skillConfig.requirements.realm}${skillConfig.requirements.level}层`);
                            return;
                        }
                    }

                    this.state.spiritStones -= skillConfig.learnCost;
                    this.state.skills[skillName] = { level: 1 };
                    this.state.addLog(`学会了${skillName}`, 'legendary');
                    this.updateDisplay();
                } else {
                    alert('灵石不足');
                }
            });
        });

        modal.classList.add('active');
    }

    // 显示背包界面
    showInventory() {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = '┌─── 背 包 ───┐';

        const items = Object.entries(this.state.inventory).filter(([name, count]) => count > 0);

        if (items.length === 0) {
            modalBody.innerHTML = '<div class="empty-list">背包为空</div>';
        } else {
            let html = '<div class="inventory-list">';

            for (const [itemName, count] of items) {
                const itemConfig = CONFIG.items[itemName];
                html += `
                    <div class="inventory-item" data-item="${itemName}">
                        <div class="item-name">${itemName} × ${count}</div>
                        <div class="item-description">${itemConfig ? itemConfig.description : ''}</div>
                        <div class="item-actions">
                            ${itemConfig && itemConfig.consume ? '<button class="use-btn">使用</button>' : ''}
                            <button class="sell-btn">出售</button>
                        </div>
                    </div>
                `;
            }

            html += '</div>';
            modalBody.innerHTML = html;

            // 使用物品
            modalBody.querySelectorAll('.use-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const itemDiv = e.target.closest('.inventory-item');
                    const itemName = itemDiv.getAttribute('data-item');
                    const result = this.state.useItem(itemName);
                    if (result.success) {
                        this.state.addLog(result.message, 'success');
                        this.updateDisplay();
                        this.showInventory();
                    } else {
                        alert(result.message);
                    }
                });
            });

            // 出售物品
            modalBody.querySelectorAll('.sell-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const itemDiv = e.target.closest('.inventory-item');
                    const itemName = itemDiv.getAttribute('data-item');
                    const itemConfig = CONFIG.items[itemName];
                    const sellPrice = itemConfig.sellPrice || Math.floor(itemConfig.price * 0.3);

                    if (confirm(`确定要以${sellPrice}灵石出售${itemName}吗？`)) {
                        this.state.inventory[itemName]--;
                        this.state.spiritStones += sellPrice;
                        this.state.addLog(`出售了${itemName}，获得${sellPrice}灵石`, 'info');
                        this.updateDisplay();
                        this.showInventory();
                    }
                });
            });
        }

        modal.classList.add('active');
    }

    // 显示法宝背包界面
    showArtifactBag() {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = '┌─── 法 宝 袋 ───┐';

        if (this.state.artifacts.length === 0) {
            modalBody.innerHTML = '<div class="empty-list">暂无法宝</div>';
        } else {
            let html = '<div class="artifact-list">';

            for (const artifactName of this.state.artifacts) {
                const artifactConfig = CONFIG.artifacts[artifactName];
                const stats = this.state.calculateArtifactStats(artifactName);
                const isEquipped = Object.values(this.state.equippedArtifacts).includes(artifactName);

                html += `
                    <div class="artifact-item ${isEquipped ? 'equipped' : ''}" data-artifact="${artifactName}">
                        <div class="artifact-name">${artifactName} ${isEquipped ? '✓' : ''}</div>
                        <div class="artifact-tier">${artifactConfig.tier}</div>
                        <div class="artifact-description">${artifactConfig.description}</div>
                        <div class="artifact-stats">
                            ${stats.attack > 0 ? `攻击+${stats.attack.toFixed(0)} ` : ''}
                            ${stats.defense > 0 ? `防御+${stats.defense.toFixed(0)} ` : ''}
                            ${stats.cultivation > 0 ? `修炼+${(stats.cultivation * 100).toFixed(0)}%` : ''}
                        </div>
                        <div class="artifact-actions">
                            ${!isEquipped ? '<button class="equip-btn">装备</button>' : '<button class="unequip-btn">卸下</button>'}
                        </div>
                    </div>
                `;
            }

            html += '</div>';
            modalBody.innerHTML = html;

            // 装备法宝
            modalBody.querySelectorAll('.equip-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const artifactDiv = e.target.closest('.artifact-item');
                    const artifactName = artifactDiv.getAttribute('data-artifact');
                    const result = this.state.equipArtifact(artifactName);
                    if (result.success) {
                        this.state.addLog(result.message, 'success');
                        this.updateDisplay();
                        this.showArtifactBag();
                    } else {
                        alert(result.message);
                    }
                });
            });

            // 卸下法宝
            modalBody.querySelectorAll('.unequip-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const artifactDiv = e.target.closest('.artifact-item');
                    const artifactName = artifactDiv.getAttribute('data-artifact');
                    this.state.unequipArtifact(artifactName);
                    this.state.addLog(`卸下了${artifactName}`, 'info');
                    this.updateDisplay();
                    this.showArtifactBag();
                });
            });
        }

        modal.classList.add('active');
    }

    // 显示秘境列表
    showSecretRealms() {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = '┌─── 秘 境 探 索 ───┐';

        let html = '<div class="realms-list">';

        for (const [realmId, realm] of Object.entries(CONFIG.secretRealms)) {
            // 检查解锁条件
            let locked = false;
            let lockedReason = '';

            if (realm.requirements) {
                const realmNames = Object.keys(CONFIG.realms);
                const currentRealmIndex = realmNames.indexOf(this.state.realm);
                const requiredRealmIndex = realmNames.indexOf(realm.requirements.realm);

                if (currentRealmIndex < requiredRealmIndex) {
                    locked = true;
                    lockedReason = `需要${realm.requirements.realm}及以上境界`;
                } else if (currentRealmIndex === requiredRealmIndex && this.state.level < realm.requirements.level) {
                    locked = true;
                    lockedReason = `需要${realm.requirements.realm}${realm.requirements.level}层`;
                }
            }

            const typeText = this.getRealmTypeText(realm.type);

            html += `
                <div class="realm-item ${locked ? 'realm-locked' : ''}" data-realm="${realmId}">
                    <div class="realm-name">${realm.name} ${locked ? '🔒' : ''}</div>
                    <div class="realm-type">${typeText}</div>
                    <div class="realm-description">${realm.description}</div>
                    ${locked ? `<div class="realm-locked-reason">${lockedReason}</div>` : ''}
                    ${realm.difficulty ? `<div class="realm-difficulty">难度: ${realm.difficulty}层</div>` : ''}
                    ${realm.risk !== undefined ? `<div class="realm-risk">风险: ${(realm.risk * 100).toFixed(0)}%</div>` : ''}
                    ${!locked ? `<button class="explore-btn" data-action="explore" data-realm="${realmId}">探索</button>
                                  <button class="gather-btn" data-action="gather" data-realm="${realmId}">采集</button>
                                  <button class="challenge-btn" data-action="challenge" data-realm="${realmId}">挑战</button>` : ''}
                </div>
            `;
        }

        html += '</div>';
        modalBody.innerHTML = html;

        // 绑定按钮事件
        modalBody.querySelectorAll('button[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                const realmId = btn.getAttribute('data-realm');
                const realm = CONFIG.secretRealms[realmId];

                switch (action) {
                    case 'explore':
                        this.state.addLog(`正在探索${realm.name}...`, 'warning');
                        this.performRealmExploration(realm);
                        break;
                    case 'gather':
                        this.performRealmGathering(realm);
                        break;
                    case 'challenge':
                        this.state.addLog(`在${realm.name}中遇到守护者！`, 'warning');
                        this.performRealmChallenge(realm);
                        break;
                }
            });
        });

        modal.classList.add('active');
    }

    // 执行秘境探索
    performRealmExploration(realm) {
        const luckBonus = this.state.calculateCombatStats().luckBonus;
        const modifiedChance = Math.min(1, realm.risk - luckBonus * 0.05); // 幸运降低风险

        if (Math.random() >= modifiedChance && realm.outcomes) {
            // 根据概率选择一个结果
            const roll = Math.random();
            let cumulative = 0;
            let selectedOutcome = null;

            for (const outcome of realm.outcomes) {
                cumulative += outcome.chance;
                if (roll <= cumulative) {
                    selectedOutcome = outcome;
                    break;
                }
            }

            if (selectedOutcome) {
                if (selectedOutcome.rewards) {
                    selectedOutcome.rewards.forEach(reward => {
                        this.grantRealmReward(reward);
                    });
                }
                if (selectedOutcome.penalty) {
                    this.applyRealmPenalty(selectedOutcome.penalty);
                }
            }
        } else {
            this.state.addLog('探索失败，什么都没发现', 'info');
        }

        document.getElementById('gameModal').classList.remove('active');
        this.updateDisplay();
    }

    // 执行秘境采集
    performRealmGathering(realm) {
        const gatheringItems = {
            'ancient_cave': ['聚气丹', '筑基丹', '灵石袋'],
            'spirit_mine': ['灵石袋', '灵石袋', '灵石袋', '筑基丹']
        };

        const items = gatheringItems[realm.id] || ['灵石袋'];
        const item = items[Math.floor(Math.random() * items.length)];

        if (Math.random() < 0.7) {
            this.state.addItem(item);
            this.state.addLog(`采集到了${item}！`, 'success');
        } else {
            this.state.addLog(`采集失败，什么都没找到`, 'info');
        }

        document.getElementById('gameModal').classList.remove('active');
        this.updateDisplay();
    }

    // 执行秘境挑战
    performRealmChallenge(realm) {
        // 根据秘境难度生成敌人
        const difficulty = realm.difficulty;
        const monsters = CONFIG.monsters.filter(m => {
            if (!m.requirements) return false;
            const reqRealmIndex = Object.keys(CONFIG.realms).indexOf(m.requirements.realm);
            const playerRealmIndex = Object.keys(CONFIG.realms).indexOf(this.state.realm);
            return Math.abs(m.level - this.state.level) <= difficulty * 3 && playerRealmIndex >= reqRealmIndex;
        });

        if (monsters.length > 0) {
            const monster = monsters[Math.floor(Math.random() * monsters.length)];
            document.getElementById('gameModal').classList.remove('active');
            this.showFightModal();
        } else {
            this.state.addLog('这个秘境暂时没有守护者', 'info');
        }
    }

    // 发放秘境奖励
    grantRealmReward(reward) {
        switch (reward.type) {
            case 'cultivation':
                const cultivation = Array.isArray(reward.value)
                    ? this.randomInt(reward.value[0], reward.value[1])
                    : reward.value;
                this.state.addCultivation(cultivation);
                this.state.addLog(`获得了${cultivation}修为！`, 'success');
                break;
            case 'spiritStones':
                const stones = Array.isArray(reward.value)
                    ? this.randomInt(reward.value[0], reward.value[1])
                    : reward.value;
                this.state.spiritStones += stones;
                this.state.addLog(`获得了${stones}灵石！`, 'success');
                break;
            case 'item':
                this.state.addItem(reward.value);
                break;
            case 'skill':
                const skillResult = this.state.learnSkill(reward.value);
                if (skillResult.success) {
                    this.state.addLog(`学会了功法：${reward.value}！`, 'legendary');
                }
                break;
            case 'artifact':
                const artifactResult = this.state.addArtifact(reward.value);
                if (artifactResult.success) {
                    this.state.addLog(`获得了法宝：${reward.value}！`, 'legendary');
                }
                break;
        }
    }

    // 应用秘境惩罚
    applyRealmPenalty(penalty) {
        switch (penalty.type) {
            case 'cultivation_loss':
                const loss = Array.isArray(penalty.value)
                    ? this.randomInt(penalty.value[0], penalty.value[1])
                    : penalty.value;
                this.state.cultivation = Math.max(0, this.state.cultivation - loss);
                this.state.addLog(`修为损失了${loss}！`, 'danger');
                break;
            case 'injured':
            case 'heavy_injured':
                const damage = Array.isArray(penalty.value)
                    ? this.randomInt(penalty.value[0], penalty.value[1])
                    : penalty.value;
                this.state.addLog(`受到了${damage}点伤害！`, 'danger');
                break;
        }
    }

    // 随机整数
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

        const currentStats = this.state.calculateCombatStats();
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
                        <p>境界：${this.state.realm} ${this.state.level}层</p>
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
            const result = this.state.startTribulation(targetRealm);
            if (result.success) {
                modal.classList.remove('active');
                this.state.addLog(result.message, 'rare');
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
        if (!this.state.tribulationState || !this.state.tribulationState.isTribulating) return;

        // 设置定时器模拟渡劫过程
        setTimeout(() => {
            this.state.processTribulation();
            // 继续下一波，直到完成
            if (this.state.tribulationState && this.state.tribulationState.isTribulating) {
                this.processTribulationWave();
            }
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
            availableSkills.forEach(skillData => {
                const skill = skillData.skill;
                const skillId = skillData.id;
                const isOnCooldown = this.state.combatSkillCooldowns[skillId] > Date.now();
                const cooldownText = isOnCooldown
                    ? `冷却中 (${Math.ceil((this.state.combatSkillCooldowns[skillId] - Date.now()) / 1000)}秒)`
                    : skill.description;
                const cooldownClass = isOnCooldown ? 'skill-on-cooldown' : '';
                const selectedClass = this.state.activeCombatSkill === skillId ? 'skill-selected' : '';

                html += `
                    <div class="combat-skill-card ${cooldownClass} ${selectedClass}" data-skill="${skillId}">
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

    // ==================== 副本系统 ====================

    /**
     * 显示副本列表
     */
    showDungeonList() {
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = '┌─── 副本列表 ───┐';

        // 检查是否有副本配置
        if (!CONFIG.dungeons || Object.keys(CONFIG.dungeons).length === 0) {
            modalBody.innerHTML = `
                <div class="dungeon-list-empty">
                    <div class="empty-title">暂无可用副本</div>
                    <div class="empty-hint">提升境界以解锁更多副本</div>
                </div>
            `;
            modal.classList.add('active');
            return;
        }

        let html = '<div class="dungeon-list-container">';

        for (const [dungeonId, dungeon] of Object.entries(CONFIG.dungeons)) {
            // 检查解锁条件
            let locked = false;
            let lockedReason = '';

            if (dungeon.requirements) {
                const realmNames = Object.keys(CONFIG.realms);
                const currentRealmIndex = realmNames.indexOf(this.state.realm);
                const requiredRealmIndex = realmNames.indexOf(dungeon.requirements.realm);

                if (currentRealmIndex < requiredRealmIndex) {
                    locked = true;
                    lockedReason = `需要${dungeon.requirements.realm}及以上境界`;
                } else if (currentRealmIndex === requiredRealmIndex && this.state.level < dungeon.requirements.level) {
                    locked = true;
                    lockedReason = `需要${dungeon.requirements.realm}${dungeon.requirements.level}层`;
                }
            }

            // 检查今日挑战次数
            const todayChallenges = this.state.dungeonChallengeRecords?.[dungeonId] || 0;
            const maxChallenges = dungeon.dailyLimit || 3;
            const canChallenge = todayChallenges < maxChallenges;

            html += `
                <div class="dungeon-card ${locked ? 'dungeon-locked' : ''}" data-dungeon="${dungeonId}">
                    <div class="dungeon-header">
                        <div class="dungeon-name">${dungeon.name} ${locked ? '🔒' : ''}</div>
                        <div class="dungeon-tier">${dungeon.tier || '普通'}</div>
                    </div>
                    <div class="dungeon-description">${dungeon.description}</div>
                    ${locked ? `<div class="dungeon-locked-reason">${lockedReason}</div>` : ''}
                    <div class="dungeon-info">
                        <div>难度: ${dungeon.difficulty || 1}层</div>
                        <div>推荐战力: ${dungeon.recommendedPower || '无要求'}</div>
                        <div>挑战次数: ${todayChallenges}/${maxChallenges}</div>
                        ${dungeon.rewards ? `<div class="dungeon-rewards">奖励: ${dungeon.rewards.map(r => `${r.name}×${r.count}`).join(', ')}</div>` : ''}
                    </div>
                    ${!locked && canChallenge ? `
                        <div class="dungeon-actions">
                            <button class="dungeon-enter-btn" data-action="enter" data-dungeon="${dungeonId}">进入副本</button>
                            <button class="dungeon-auto-btn" data-action="auto" data-dungeon="${dungeonId}">自动战斗</button>
                        </div>
                    ` : ''}
                    ${!locked && !canChallenge ? `<div class="dungeon-exhausted">今日挑战次数已用尽</div>` : ''}
                </div>
            `;
        }

        html += '</div>';
        modalBody.innerHTML = html;

        // 绑定按钮事件
        modalBody.querySelectorAll('.dungeon-enter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const dungeonId = btn.getAttribute('data-dungeon');
                this.showDungeonDetail(dungeonId);
            });
        });

        modalBody.querySelectorAll('.dungeon-auto-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const dungeonId = btn.getAttribute('data-dungeon');
                if (confirm('确定要自动战斗吗？将直接使用当前最优策略进行战斗。')) {
                    this.startDungeonBattle(dungeonId, true);
                }
            });
        });

        modal.classList.add('active');
    }

    /**
     * 显示副本详情
     * @param {string} dungeonId - 副本ID
     */
    showDungeonDetail(dungeonId) {
        const dungeon = CONFIG.dungeons[dungeonId];
        if (!dungeon) {
            alert('副本不存在');
            return;
        }

        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = `┌─── ${dungeon.name} ───┐`;

        const playerStats = this.state.calculateCombatStats();

        let html = `
            <div class="dungeon-detail-container">
                <div class="dungeon-detail-info">
                    <h3>${dungeon.name}</h3>
                    <p class="dungeon-detail-desc">${dungeon.description}</p>
                    <div class="dungeon-detail-stats">
                        <div>难度等级: ${dungeon.difficulty || 1}</div>
                        <div>推荐战力: ${dungeon.recommendedPower || '无要求'}</div>
                        <div>你的战力: 攻击${playerStats.attack}/防御${playerStats.defense}</div>
                        ${dungeon.stages ? `<div>关卡数: ${dungeon.stages.length}</div>` : ''}
                    </div>
                </div>

                ${dungeon.stages ? `
                    <div class="dungeon-stages">
                        <h4>关卡信息</h4>
                        ${dungeon.stages.map((stage, index) => `
                            <div class="stage-preview">
                                <strong>第${index + 1}关:</strong> ${stage.description || '未知'}
                                ${stage.monsters ? `<br>怪物: ${stage.monsters.map(m => m.name).join(', ')}` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${dungeon.rewards ? `
                    <div class="dungeon-detail-rewards">
                        <h4>通关奖励</h4>
                        ${dungeon.rewards.map(reward => `
                            <div class="reward-preview">${reward.name} × ${reward.count}</div>
                        `).join('')}
                    </div>
                ` : ''}

                <div class="dungeon-detail-actions">
                    <button class="dungeon-start-btn" data-dungeon="${dungeonId}">开始挑战</button>
                    <button class="dungeon-back-btn" data-back="true">返回列表</button>
                </div>
            </div>
        `;

        modalBody.innerHTML = html;

        // 绑定开始挑战按钮
        modalBody.querySelector('.dungeon-start-btn').addEventListener('click', () => {
            this.startDungeonBattle(dungeonId, false);
        });

        // 绑定返回按钮
        modalBody.querySelector('.dungeon-back-btn').addEventListener('click', () => {
            this.showDungeonList();
        });

        modal.classList.add('active');
    }

    /**
     * 显示副本战斗界面
     * @param {string} dungeonId - 副本ID
     */
    showDungeonBattle(dungeonId) {
        const dungeon = CONFIG.dungeons[dungeonId];
        if (!dungeon) {
            alert('副本不存在');
            return;
        }

        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');
        const modalHeader = document.getElementById('modalHeader');

        modalHeader.querySelector('pre').textContent = `┌─── ${dungeon.name} ───┐`;

        const playerStats = this.state.calculateCombatStats();
        const availableSkills = this.state.getAvailableCombatSkills();

        // 获取当前关卡
        const currentStageIndex = this.state.currentDungeonState?.currentStage || 0;
        const currentStage = dungeon.stages?.[currentStageIndex];

        let html = `
            <div class="dungeon-battle-container">
                <div class="battle-status">
                    <div class="stage-info">当前关卡: ${currentStage ? currentStageIndex + 1 : '-'}/${dungeon.stages?.length || '?'}</div>
                    <div class="player-battle-stats">
                        <div>攻击: ${playerStats.attack}</div>
                        <div>防御: ${playerStats.defense}</div>
                        <div>生命: ${playerStats.health}</div>
                    </div>
                </div>

                ${currentStage ? `
                    <div class="current-monsters">
                        <h4>当前敌人</h4>
                        ${currentStage.monsters?.map(monster => {
                            const monsterConfig = typeof monster === 'string' ? CONFIG.monsters.find(m => m.id === monster) : monster;
                            return monsterConfig ? `
                                <div class="monster-battle-card">
                                    <div class="monster-name">${monsterConfig.name}</div>
                                    <div class="monster-stats">
                                        生命: ${monsterConfig.hp} | 攻击: ${monsterConfig.attack} | 防御: ${monsterConfig.defense}
                                    </div>
                                </div>
                            ` : '';
                        }).join('') || '<div>无敌人信息</div>'}
                    </div>
                ` : ''}

                <div class="combat-skills-section">
                    <div class="skills-title">战斗技能</div>
                    <div class="skills-selection">
        `;

        if (availableSkills.length > 0) {
            availableSkills.forEach(skillData => {
                const skill = skillData.skill;
                const skillId = skillData.id;
                const isOnCooldown = this.state.combatSkillCooldowns[skillId] > Date.now();
                const cooldownText = isOnCooldown
                    ? `冷却中 (${Math.ceil((this.state.combatSkillCooldowns[skillId] - Date.now()) / 1000)}秒)`
                    : skill.description;
                const cooldownClass = isOnCooldown ? 'skill-on-cooldown' : '';
                const selectedClass = this.state.activeCombatSkill === skillId ? 'skill-selected' : '';

                html += `
                    <div class="combat-skill-card ${cooldownClass} ${selectedClass}" data-skill="${skillId}">
                        <div class="skill-card-name">${skill.name} <span style="font-size: 10px; color: var(--rare-color);">[${skill.tier}]</span></div>
                        <div class="skill-card-desc">${cooldownText}</div>
                        <div class="skill-card-effect">威力: ${skill.power}x | 消耗: ${skill.cost}</div>
                    </div>
                `;
            });
        } else {
            html += `<div class="empty-skills">暂无可用战斗技能</div>`;
        }

        html += `
                    </div>
                </div>

                <div class="battle-actions">
                    <button class="battle-attack-btn" data-dungeon="${dungeonId}">攻击</button>
                    <button class="battle-flee-btn" data-flee="true">逃跑</button>
                </div>
            </div>
        `;

        modalBody.innerHTML = html;

        // 绑定技能选择事件
        modalBody.querySelectorAll('.combat-skill-card:not(.skill-on-cooldown)').forEach(skillCard => {
            skillCard.addEventListener('click', () => {
                modalBody.querySelectorAll('.combat-skill-card').forEach(card => {
                    card.classList.remove('skill-selected');
                });
                skillCard.classList.add('skill-selected');
                this.state.activeCombatSkill = skillCard.getAttribute('data-skill');
            });
        });

        // 绑定攻击按钮
        modalBody.querySelector('.battle-attack-btn').addEventListener('click', () => {
            this.executeDungeonBattle(dungeonId);
        });

        // 绑定逃跑按钮
        modalBody.querySelector('.battle-flee-btn').addEventListener('click', () => {
            if (confirm('确定要逃跑吗？进度将不会保存。')) {
                this.state.currentDungeonState = null;
                modal.classList.remove('active');
            }
        });

        modal.classList.add('active');
    }

    /**
     * 执行副本战斗
     * @param {string} dungeonId - 副本ID
     */
    executeDungeonBattle(dungeonId) {
        const dungeon = CONFIG.dungeons[dungeonId];
        if (!dungeon) {
            alert('副本不存在');
            return;
        }

        // 初始化副本状态
        if (!this.state.currentDungeonState) {
            this.state.currentDungeonState = {
                dungeonId: dungeonId,
                currentStage: 0,
                defeatedMonsters: []
            };
        }

        const currentStageIndex = this.state.currentDungeonState.currentStage;
        const currentStage = dungeon.stages?.[currentStageIndex];

        if (!currentStage) {
            alert('关卡数据错误');
            return;
        }

        // 战斗逻辑
        const playerStats = this.state.calculateCombatStats();
        let battleSuccess = true;
        let battleLog = [];

        if (currentStage.monsters && currentStage.monsters.length > 0) {
            for (const monsterData of currentStage.monsters) {
                const monsterConfig = typeof monsterData === 'string'
                    ? CONFIG.monsters.find(m => m.id === monsterData)
                    : monsterData;

                if (!monsterConfig) continue;

                // 执行战斗（简化版）
                const result = this.state.fightMonster(
                    typeof monsterData === 'string' ? monsterData : monsterData.id || monsterData.name,
                    this.state.activeCombatSkill
                );

                if (result.victory) {
                    battleLog.push(`击败了${monsterConfig.name}！`);
                    this.state.currentDungeonState.defeatedMonsters.push(monsterConfig.id || monsterConfig.name);
                } else {
                    battleLog.push(`被${monsterConfig.name}击败了...`);
                    battleSuccess = false;
                    break;
                }
            }
        }

        // 更新界面
        if (battleSuccess) {
            // 进入下一关或完成副本
            this.state.currentDungeonState.currentStage++;

            if (this.state.currentDungeonState.currentStage >= dungeon.stages.length) {
                // 副本完成
                this.completeDungeon(dungeonId);
            } else {
                // 继续下一关
                this.state.addLog(`通过了第${currentStageIndex + 1}关！`, 'success');
                this.showDungeonBattle(dungeonId);
            }
        } else {
            // 战斗失败
            this.state.addLog(`在第${currentStageIndex + 1}关失败了...`, 'danger');
            alert('战斗失败！请提升实力后再来挑战。');
            this.state.currentDungeonState = null;
            document.getElementById('gameModal').classList.remove('active');
        }

        this.updateDisplay();
    }

    /**
     * 开始副本战斗
     * @param {string} dungeonId - 副本ID
     * @param {boolean} auto - 是否自动战斗
     */
    startDungeonBattle(dungeonId, auto = false) {
        const dungeon = CONFIG.dungeons[dungeonId];
        if (!dungeon) {
            alert('副本不存在');
            return;
        }

        // 检查挑战次数
        const todayChallenges = this.state.dungeonChallengeRecords?.[dungeonId] || 0;
        const maxChallenges = dungeon.dailyLimit || 3;

        if (todayChallenges >= maxChallenges) {
            alert('今日挑战次数已用尽');
            return;
        }

        // 初始化副本状态
        this.state.currentDungeonState = {
            dungeonId: dungeonId,
            currentStage: 0,
            defeatedMonsters: []
        };

        if (auto) {
            // 自动战斗模式
            this.autoDungeonBattle(dungeonId);
        } else {
            // 手动战斗模式
            this.showDungeonBattle(dungeonId);
        }
    }

    /**
     * 自动副本战斗
     * @param {string} dungeonId - 副本ID
     */
    autoDungeonBattle(dungeonId) {
        const dungeon = CONFIG.dungeons[dungeonId];
        if (!dungeon) return;

        const playerStats = this.state.calculateCombatStats();
        let currentStage = 0;
        let allVictories = true;

        // 自动选择最优技能
        const availableSkills = this.state.getAvailableCombatSkills();
        const bestSkill = availableSkills.length > 0
            ? availableSkills.reduce((best, current) =>
                (current.skill.power || 0) > (best?.skill.power || 0) ? current : best, availableSkills[0])
            : null;

        this.state.activeCombatSkill = bestSkill?.id || null;

        // 自动战斗每一关
        for (const stage of dungeon.stages || []) {
            if (stage.monsters && stage.monsters.length > 0) {
                for (const monsterData of stage.monsters) {
                    const monsterId = typeof monsterData === 'string'
                        ? monsterData
                        : monsterData.id || monsterData.name;

                    const result = this.state.fightMonster(monsterId, this.state.activeCombatSkill);

                    if (!result.victory) {
                        allVictories = false;
                        this.state.addLog(`自动战斗在第${currentStage + 1}关失败`, 'danger');
                        alert(`战斗失败！在第${currentStage + 1}关被击败了。`);
                        this.state.currentDungeonState = null;
                        this.updateDisplay();
                        return;
                    }
                }
            }
            currentStage++;
        }

        // 全部通关
        if (allVictories) {
            this.completeDungeon(dungeonId);
        }

        this.updateDisplay();
    }

    /**
     * 完成副本
     * @param {string} dungeonId - 副本ID
     */
    completeDungeon(dungeonId) {
        const dungeon = CONFIG.dungeons[dungeonId];
        if (!dungeon) return;

        // 发放奖励
        if (dungeon.rewards) {
            for (const reward of dungeon.rewards) {
                if (reward.type === 'item') {
                    this.state.addItem(reward.name, reward.count);
                    this.state.addLog(`获得了${reward.name}×${reward.count}`, 'success');
                } else if (reward.type === 'spiritStones') {
                    this.state.spiritStones += reward.count;
                    this.state.addLog(`获得了${reward.count}灵石`, 'success');
                } else if (reward.type === 'cultivation') {
                    this.state.addCultivation(reward.count);
                    this.state.addLog(`获得了${reward.count}修为`, 'success');
                }
            }
        }

        // 记录挑战次数
        if (!this.state.dungeonChallengeRecords) {
            this.state.dungeonChallengeRecords = {};
        }
        this.state.dungeonChallengeRecords[dungeonId] = (this.state.dungeonChallengeRecords[dungeonId] || 0) + 1;

        // 清除副本状态
        this.state.currentDungeonState = null;

        this.state.addLog(`恭喜通关${dungeon.name}！`, 'legendary');
        alert(`恭喜通关${dungeon.name}！\n\n${dungeon.rewards?.map(r => `${r.name}×${r.count}`).join('\n') || '无奖励'}`);

        document.getElementById('gameModal').classList.remove('active');
        this.showDungeonList();
        this.updateDisplay();
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

                // 新增：检查活动状态（防止状态卡死）
                this.state.checkActivityStatus();

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

            // 更新加成显示（放在最后，确保所有状态都已更新）
            this.updateBonusDisplay();
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
                <div class="pet-item ${isCurrent ? 'pet-current' : ''}" data-pet="${petName}" style="${isCurrent ? 'background: rgba(0, 255, 0, 0.1); border-color: var(--success-color);' : ''}">
                    <span class="pet-name">${petName}${isCurrent ? ' ✓' : ''}</span>
                    <span class="pet-level">${petData.level}/${pet.maxLevel}</span>
                </div>
            `;
        }

        petsListDiv.innerHTML = petsHtml || '<div class="empty-list">暂无宠物</div>';

        // 添加宠物点击切换事件
        petsListDiv.querySelectorAll('.pet-item').forEach(petItem => {
            petItem.addEventListener('click', () => {
                const petName = petItem.getAttribute('data-pet');
                const result = this.state.setCurrentPet(petName);
                if (result.success) {
                    this.updateDisplay();
                } else {
                    alert(result.message);
                }
            });
        });

        // 更新成就显示
        this.updateAchievementsDisplay();
    }

    // 更新加成显示
    updateBonusDisplay() {
        const bonusDiv = document.getElementById('currentBonus');
        if (!bonusDiv) return;

        const bonuses = this.calculateAllBonuses();

        let html = '<div class="bonus-list">';

        if (bonuses.cultivation !== 0) {
            html += `<div class="bonus-item">修炼速度: ${bonuses.cultivation > 0 ? '+' : ''}${(bonuses.cultivation * 100).toFixed(0)}%</div>`;
        }
        if (bonuses.attack !== 0) {
            html += `<div class="bonus-item">攻击: ${bonuses.attack > 0 ? '+' : ''}${bonuses.attack.toFixed(0)}</div>`;
        }
        if (bonuses.defense !== 0) {
            html += `<div class="bonus-item">防御: ${bonuses.defense > 0 ? '+' : ''}${bonuses.defense.toFixed(0)}</div>`;
        }
        if (bonuses.health !== 0) {
            html += `<div class="bonus-item">生命: ${bonuses.health > 0 ? '+' : ''}${(bonuses.health * 100).toFixed(0)}%</div>`;
        }
        if (bonuses.luck !== 0) {
            html += `<div class="bonus-item">幸运: ${bonuses.luck > 0 ? '+' : ''}${(bonuses.luck * 100).toFixed(0)}%</div>`;
        }

        if (html === '<div class="bonus-list">') {
            html += '<div class="bonus-empty">暂无额外加成</div>';
        }

        html += '</div>';
        bonusDiv.innerHTML = html;
    }

    // 计算所有加成（用于显示）
    calculateAllBonuses() {
        const bonuses = {
            cultivation: 0, // 修炼速度加成（基础倍率，不含基础1.0）
            attack: 0,     // 攻击加成（绝对值）
            defense: 0,    // 防御加成（绝对值）
            health: 0,     // 生命加成（百分比）
            luck: 0        // 幸运加成（百分比）
        };

        const realmConfig = CONFIG.realms[this.state.realm];

        // 功法加成
        if (this.state.currentSkill && this.state.skills[this.state.currentSkill]) {
            const skill = CONFIG.skills[this.state.currentSkill];
            const skillLevel = this.state.skills[this.state.currentSkill].level;

            if (skill.effect === 'cultivation_speed') {
                bonuses.cultivation += skill.value * skillLevel;
            } else if (skill.effect === 'attack_boost') {
                bonuses.attack += realmConfig.baseAttack * skill.value * skillLevel;
            } else if (skill.effect === 'defense_boost') {
                bonuses.defense += realmConfig.baseDefense * skill.value * skillLevel;
            } else if (skill.effect === 'all_stats') {
                bonuses.attack += realmConfig.baseAttack * skill.value * skillLevel;
                bonuses.defense += realmConfig.baseDefense * skill.value * skillLevel;
                bonuses.health += skill.value * skillLevel * 0.05;
            }
        }

        // 宠物加成
        if (this.state.currentPet && this.state.pets[this.state.currentPet]) {
            const pet = CONFIG.pets[this.state.currentPet];
            const petLevel = this.state.pets[this.state.currentPet].level;

            if (pet.effect === 'cultivation_boost') {
                bonuses.cultivation += pet.value * petLevel * 0.1;
            } else if (pet.effect === 'attack_boost') {
                bonuses.attack += 10 * pet.value * petLevel * 0.1;
            } else if (pet.effect === 'defense_boost') {
                bonuses.defense += 8 * pet.value * petLevel * 0.1;
            } else if (pet.effect === 'luck_boost') {
                bonuses.luck += pet.value * petLevel * 0.1;
            }
        }

        // 法宝加成
        for (const [slot, artifact] of Object.entries(this.state.equippedArtifacts)) {
            if (artifact) {
                const stats = this.state.calculateArtifactStats(artifact);
                bonuses.attack += stats.attack;
                bonuses.defense += stats.defense;
                bonuses.cultivation += stats.cultivation * 0.01;
            }
        }

        return bonuses;
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

    // 更新角色信息显示
    updateCharacterDisplay() {
        // 可以在这里添加更多角色信息的显示更新
        console.log('角色信息:', {
            姓名: this.state.playerName,
            道号: this.state.daoName,
            境界: this.state.realm,
            层级: this.state.level + '层'
        });
    }

    // 保存并退出
    saveAndQuit() {
        this.stopGameLoop();
        this.state.save();
    }
}

export { GameUI };
