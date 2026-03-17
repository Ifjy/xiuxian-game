// ==================== 存档管理器 ====================
class SaveManager {
    static MAX_SAVES = 3;
    static SAVE_PREFIX = 'xiuxian_save_';

    // 获取所有存档
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

    // 保存存档
    static save(slot, data) {
        if (slot < 1 || slot > this.MAX_SAVES) {
            throw new Error('无效的存档槽位');
        }
        localStorage.setItem(this.SAVE_PREFIX + slot, JSON.stringify(data));
    }

    // 加载存档
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

    // 删除存档
    static delete(slot) {
        if (slot < 1 || slot > this.MAX_SAVES) {
            throw new Error('无效的存档槽位');
        }
        localStorage.removeItem(this.SAVE_PREFIX + slot);
    }

    // 检查存档是否存在
    static exists(slot) {
        return localStorage.getItem(this.SAVE_PREFIX + slot) !== null;
    }
}

// ==================== 角色创建管理器 ====================
class CharacterCreation {
    constructor() {
        this.talents = {
            wisdom: 0,      // 悟性
            luck: 0,        // 幸运
            potential: 0,   // 根骨
            fortune: 0      // 机缘
        };
        this.remainingPoints = 20;
        this.background = 'commoner';
        this.selectedSlot = null;
        this.init();
    }

    init() {
        // 显示存档管理界面
        this.showSaveManagement();

        // 绑定事件
        this.bindEvents();
    }

    // 显示存档管理界面
    showSaveManagement() {
        const saves = SaveManager.getAllSaves();
        const saveSlotsDiv = document.getElementById('saveSlots');

        let html = '';
        for (const save of saves) {
            if (save.empty) {
                html += `
                    <div class="save-slot empty" data-slot="${save.slot}">
                        <div class="save-slot-info">
                            <div class="save-slot-info-text">存档 ${save.slot} - 空槽位</div>
                        </div>
                    </div>
                `;
            } else {
                const playTime = this.formatPlayTime(save.totalPlayTime || 0);
                const lastSave = this.formatTime(save.lastSaveTime);

                html += `
                    <div class="save-slot" data-slot="${save.slot}">
                        <div class="save-slot-header">
                            <div class="save-slot-title">存档 ${save.slot}</div>
                            <div class="save-slot-actions">
                                <button class="save-slot-action-btn delete" data-action="delete" data-slot="${save.slot}">[删除]</button>
                            </div>
                        </div>
                        <div class="save-slot-info">
                            <div class="save-slot-info-row">
                                <span class="save-slot-label">姓名:</span>
                                <span class="save-slot-value">${save.playerName || '未知'}</span>
                            </div>
                            <div class="save-slot-info-row">
                                <span class="save-slot-label">道号:</span>
                                <span class="save-slot-value">${save.daoName || '未知'}</span>
                            </div>
                            <div class="save-slot-info-row">
                                <span class="save-slot-label">境界:</span>
                                <span class="save-slot-value">${save.realm || '炼气期'} ${save.level || 1}层</span>
                            </div>
                            <div class="save-slot-info-row">
                                <span class="save-slot-label">修炼天数:</span>
                                <span class="save-slot-value">${save.totalDays?.toFixed(1) || '0'}天</span>
                            </div>
                            <div class="save-slot-info-row">
                                <span class="save-slot-label">游戏时长:</span>
                                <span class="save-slot-value">${playTime}</span>
                            </div>
                            <div class="save-slot-info-row">
                                <span class="save-slot-label">最后保存:</span>
                                <span class="save-slot-value">${lastSave}</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        saveSlotsDiv.innerHTML = html;

        // 绑定存档槽位点击事件
        saveSlotsDiv.querySelectorAll('.save-slot').forEach(slot => {
            slot.addEventListener('click', (e) => {
                // 如果点击的是删除按钮，不处理加载
                if (e.target.classList.contains('save-slot-action-btn')) {
                    return;
                }

                const slotNum = parseInt(slot.getAttribute('data-slot'));
                const isEmpty = slot.classList.contains('empty');

                if (isEmpty) {
                    // 空槽位，选择用于创建新角色
                    this.selectSlotForCreation(slotNum);
                } else {
                    // 有存档，询问是否加载
                    this.askToLoadSave(slotNum);
                }
            });
        });

        // 绑定删除按钮事件
        saveSlotsDiv.querySelectorAll('.save-slot-action-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // 阻止事件冒泡
                const slotNum = parseInt(btn.getAttribute('data-slot'));
                this.deleteSave(slotNum);
            });
        });

        // 显示存档管理界面
        document.getElementById('saveManagement').style.display = 'block';
        document.getElementById('characterForm').style.display = 'none';
    }

    // 选择槽位创建新角色
    selectSlotForCreation(slot) {
        this.selectedSlot = slot;

        // 隐藏存档管理，显示角色创建表单
        document.getElementById('saveManagement').style.display = 'none';
        document.getElementById('characterForm').style.display = 'block';

        // 重置表单
        this.resetForm();
    }

    // 询问是否加载存档
    askToLoadSave(slot) {
        const save = SaveManager.load(slot);
        if (!save) {
            alert('存档数据损坏');
            this.showSaveManagement();
            return;
        }

        if (confirm(`要加载存档吗？\n姓名: ${save.playerName}\n道号: ${save.daoName}\n境界: ${save.realm} ${save.level}层`)) {
            this.loadSave(slot);
        }
    }

    // 加载存档开始游戏
    loadSave(slot) {
        // 临时保存要加载的槽位，让游戏知道加载哪个存档
        sessionStorage.setItem('xiuxian_load_slot', slot);

        // 跳转到主游戏
        window.location.href = 'index.html';
    }

    // 删除存档
    deleteSave(slot) {
        if (confirm(`确定要删除存档${slot}吗？此操作不可恢复！`)) {
            SaveManager.delete(slot);
            this.addLog(`已删除存档${slot}`, 'info');
            this.showSaveManagement(); // 刷新界面
        }
    }

    // 重置表单
    resetForm() {
        document.getElementById('playerName').value = '';
        document.getElementById('daoName').value = '';
        document.getElementById('playerBackground').value = 'commoner';

        // 重置天赋
        this.talents = {
            wisdom: 0,
            luck: 0,
            potential: 0,
            fortune: 0
        };
        this.remainingPoints = 20;
        this.updateTalentDisplay();
    }

    // 绑定事件
    bindEvents() {
        // 创建新角色按钮
        document.getElementById('createNewBtn').addEventListener('click', () => {
            // 找第一个空槽位
            const saves = SaveManager.getAllSaves();
            const emptySlot = saves.find(s => s.empty);

            if (emptySlot) {
                this.selectSlotForCreation(emptySlot.slot);
            } else {
                alert('存档已满，请先删除一个存档');
            }
        });

        // 天赋点分配按钮
        document.querySelectorAll('.talent-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const attribute = e.target.dataset.attribute;
                const action = e.target.dataset.action;

                if (action === '+1') {
                    this.addTalentPoint(attribute);
                } else if (action === '-1') {
                    this.removeTalentPoint(attribute);
                }
            });
        });

        // 开始游戏按钮
        document.getElementById('startBtn').addEventListener('click', () => {
            this.createCharacter();
        });

        // 返回按钮
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showSaveManagement();
        });
    }

    addTalentPoint(attribute) {
        if (this.remainingPoints > 0 && this.talents[attribute] < 10) {
            this.talents[attribute]++;
            this.remainingPoints--;
            this.updateTalentDisplay();
        }
    }

    removeTalentPoint(attribute) {
        if (this.talents[attribute] > 0) {
            this.talents[attribute]--;
            this.remainingPoints++;
            this.updateTalentDisplay();
        }
    }

    updateTalentDisplay() {
        // 更新显示值
        document.getElementById('wisdomValue').textContent = this.talents.wisdom;
        document.getElementById('luckValue').textContent = this.talents.luck;
        document.getElementById('potentialValue').textContent = this.talents.potential;
        document.getElementById('fortuneValue').textContent = this.talents.fortune;

        // 更新剩余点数
        document.getElementById('remainingPoints').textContent = this.remainingPoints;

        // 更新按钮状态
        document.querySelectorAll('.talent-btn').forEach(btn => {
            const attribute = btn.dataset.attribute;
            const action = btn.dataset.action;

            if (action === '+1') {
                btn.disabled = this.remainingPoints <= 0 || this.talents[attribute] >= 10;
            } else if (action === '-1') {
                btn.disabled = this.talents[attribute] <= 0;
            }
        });
    }

    createCharacter() {
        const playerName = document.getElementById('playerName').value.trim();
        const daoName = document.getElementById('daoName').value.trim();
        const background = document.getElementById('playerBackground').value;

        // 验证输入
        if (!playerName) {
            alert('请输入姓名');
            return;
        }

        if (!daoName) {
            alert('请输入道号');
            return;
        }

        if (this.remainingPoints > 0) {
            alert(`还有${this.remainingPoints}点天赋点未分配`);
            return;
        }

        // 创建角色数据
        const characterData = {
            playerName: playerName,
            daoName: daoName,
            background: background,
            talents: { ...this.talents },
            saveSlot: this.selectedSlot
        };

        // 临时保存角色数据，让游戏知道是新角色
        sessionStorage.setItem('xiuxian_new_character', JSON.stringify(characterData));

        // 跳转到主游戏页面
        window.location.href = 'index.html';
    }

    // 格式化时间
    formatTime(timestamp) {
        if (!timestamp) return '未知';
        const date = new Date(timestamp);
        return date.toLocaleString('zh-CN');
    }

    // 格式化游戏时长
    formatPlayTime(seconds) {
        if (!seconds) return '0小时';
        const hours = Math.floor(seconds / 3600);
        if (hours < 24) {
            return `${hours}小时`;
        } else {
            const days = Math.floor(hours / 24);
            return `${days}天${hours % 24}小时`;
        }
    }

    addLog(message, type = 'info') {
        console.log(`[${type}] ${message}`);
    }
}

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    new CharacterCreation();
});