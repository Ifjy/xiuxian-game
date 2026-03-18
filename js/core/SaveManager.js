// ==================== 存档管理系统 ====================
// 从 game.js 提取的存档管理类
export class SaveManager {
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
