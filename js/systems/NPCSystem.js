/**
 * NPC系统模块
 * 从 game.js 的 GameState 类中提取的NPC相关方法
 *
 * 包含功能：
 * - 获取可用的NPC列表
 * - 与NPC对话
 * - 赠送礼物给NPC
 * - NPC好感度管理
 * - NPC解锁
 */

export class NPCSystem {
    constructor(gameState) {
        this.state = gameState;
    }

    // 获取可用的NPC列表
    getAvailableNPCs() {
        const available = [];
        for (const npcId of this.state.unlockedNPCs) {
            const npc = this.state.npcs[npcId];
            if (!npc) continue;

            // 检查NPC要求
            let canAccess = true;
            if (npc.requirements) {
                if (npc.requirements.sect && this.state.sect !== npc.requirements.sect) {
                    canAccess = false;
                }
                if (npc.requirements.sectRank) {
                    const rankOrder = ['外门弟子', '内门弟子', '核心弟子', '真传弟子', '长老'];
                    const playerRankIndex = rankOrder.indexOf(this.state.sectRank);
                    const requiredRankIndex = rankOrder.indexOf(npc.requirements.sectRank);
                    if (playerRankIndex < requiredRankIndex) {
                        canAccess = false;
                    }
                }
                if (npc.requirements.realm) {
                    const realmNames = Object.keys(this.state.realms);
                    const currentRealmIndex = realmNames.indexOf(this.state.realm);
                    const requiredRealmIndex = realmNames.indexOf(npc.requirements.realm);
                    if (currentRealmIndex < requiredRealmIndex) {
                        canAccess = false;
                    }
                }
                if (npc.requirements.spiritStones && this.state.spiritStones < npc.requirements.spiritStones) {
                    canAccess = false;
                }
            }

            if (canAccess) {
                available.push({
                    ...npc,
                    id: npcId,
                    affection: this.getNPCAffection(npcId),
                    affectionLevel: this.getAffectionLevel(this.getNPCAffection(npcId))
                });
            }
        }
        return available;
    }

    // 与NPC对话
    talkToNPC(npcId) {
        const npc = this.state.npcs[npcId];
        if (!npc) {
            return { success: false, message: 'NPC不存在' };
        }

        // 检查是否解锁
        if (!this.state.unlockedNPCs.includes(npcId)) {
            return { success: false, message: '此NPC尚未解锁' };
        }

        // 检查访问条件
        if (npc.requirements) {
            if (npc.requirements.sect && this.state.sect !== npc.requirements.sect) {
                return { success: false, message: '需要加入特定宗门' };
            }
            if (npc.requirements.sectRank) {
                const rankOrder = ['外门弟子', '内门弟子', '核心弟子', '真传弟子', '长老'];
                const playerRankIndex = rankOrder.indexOf(this.state.sectRank);
                const requiredRankIndex = rankOrder.indexOf(npc.requirements.sectRank);
                if (playerRankIndex < requiredRankIndex) {
                    return { success: false, message: `需要${npc.requirements.sectRank}以上身份` };
                }
            }
            if (npc.requirements.realm) {
                const realmNames = Object.keys(this.state.realms);
                const currentRealmIndex = realmNames.indexOf(this.state.realm);
                const requiredRealmIndex = realmNames.indexOf(npc.requirements.realm);
                if (currentRealmIndex < requiredRealmIndex) {
                    return { success: false, message: `需要${npc.requirements.realm}境界` };
                }
            }
        }

        // 获取对话
        let dialog = null;
        let dialogId = null;

        // 检查是否有未完成的重要对话
        if (npc.dialogs) {
            for (const [id, dlg] of Object.entries(npc.dialogs)) {
                if (dlg.priority && !this.hasCompletedDialog(npcId, id)) {
                    dialog = dlg;
                    dialogId = id;
                    break;
                }
            }

            // 如果没有优先对话，随机选择一个可用对话
            if (!dialog) {
                const availableDialogs = Object.entries(npc.dialogs).filter(([id, dlg]) => {
                    // 检查是否已完成
                    if (dlg.once && this.hasCompletedDialog(npcId, id)) {
                        return false;
                    }
                    // 检查条件
                    if (dlg.requirements) {
                        if (dlg.requirements.affection && this.getNPCAffection(npcId) < dlg.requirements.affection) {
                            return false;
                        }
                        if (dlg.requirements.realm) {
                            const realmNames = Object.keys(this.state.realms);
                            const currentRealmIndex = realmNames.indexOf(this.state.realm);
                            const requiredRealmIndex = realmNames.indexOf(dlg.requirements.realm);
                            if (currentRealmIndex < requiredRealmIndex) {
                                return false;
                            }
                        }
                    }
                    return true;
                });

                if (availableDialogs.length > 0) {
                    const [id, dlg] = availableDialogs[Math.floor(Math.random() * availableDialogs.length)];
                    dialog = dlg;
                    dialogId = id;
                }
            }
        }

        // 记录对话历史
        if (dialogId) {
            this.recordNPCDialog(npcId, dialogId);
        }

        // 增加好感度
        let affectionGain = 0;
        if (dialog && dialog.affectionReward) {
            affectionGain = dialog.affectionReward;
        } else {
            // 默认对话增加少量好感度
            affectionGain = 0.5;
        }

        const newAffection = this.addNPCAffection(npcId, affectionGain);

        // 检查是否解锁新NPC
        if (dialog && dialog.unlockNPC) {
            this.unlockNPC(dialog.unlockNPC);
        }

        return {
            success: true,
            message: `与${npc.name}进行了对话`,
            dialog: dialog ? dialog.text : `${npc.name}: 你好，修士。`,
            affection: newAffection,
            choices: dialog ? dialog.choices : null
        };
    }

    // 赠送礼物给NPC
    giveGift(npcId, itemName, amount = 1) {
        const npc = this.state.npcs[npcId];
        if (!npc) {
            return { success: false, message: 'NPC不存在' };
        }

        if (!npc.gifts || !npc.gifts[itemName]) {
            return { success: false, message: `${npc.name}不接受这个礼物` };
        }

        // 检查物品数量
        if ((this.state.inventory[itemName] || 0) < amount) {
            return { success: false, message: '物品不足' };
        }

        // 消耗物品
        this.state.inventory[itemName] -= amount;
        if (this.state.inventory[itemName] <= 0) {
            delete this.state.inventory[itemName];
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

    // 获取NPC好感度
    getNPCAffection(npcId) {
        return this.state.npcAffection[npcId] || 0;
    }

    // 增加NPC好感度
    addNPCAffection(npcId, amount) {
        if (!this.state.npcAffection[npcId]) {
            this.state.npcAffection[npcId] = 0;
        }
        this.state.npcAffection[npcId] += amount;

        // 好感度等级
        const oldLevel = this.getAffectionLevel(this.state.npcAffection[npcId] - amount);
        const newLevel = this.getAffectionLevel(this.state.npcAffection[npcId]);

        if (newLevel > oldLevel) {
            const npc = this.state.npcs[npcId];
            this.state.addLog(`${npc.name}对你的好感度提升了！达到${newLevel}`, 'rare');
        }

        return this.state.npcAffection[npcId];
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
        if (!this.state.npcHistory[npcId]) {
            this.state.npcHistory[npcId] = [];
        }
        if (!this.state.npcHistory[npcId].includes(dialogId)) {
            this.state.npcHistory[npcId].push(dialogId);
        }
    }

    // 检查是否已完成某个对话
    hasCompletedDialog(npcId, dialogId) {
        return this.state.npcHistory[npcId]?.includes(dialogId) || false;
    }

    // 解锁NPC
    unlockNPC(npcId) {
        if (!this.state.unlockedNPCs.includes(npcId)) {
            this.state.unlockedNPCs.push(npcId);
            const npc = this.state.npcs[npcId];
            if (npc) {
                this.state.addLog(`发现了新人物：${npc.name}！`, 'rare');
            }
        }
    }

    // 获取NPC详细信息
    getNPCInfo(npcId) {
        const npc = this.state.npcs[npcId];
        if (!npc) {
            return null;
        }

        return {
            ...npc,
            id: npcId,
            affection: this.getNPCAffection(npcId),
            affectionLevel: this.getAffectionLevel(this.getNPCAffection(npcId)),
            isUnlocked: this.state.unlockedNPCs.includes(npcId),
            dialogHistory: this.state.npcHistory[npcId] || []
        };
    }

    // 检查NPC是否可以访问
    canAccessNPC(npcId) {
        const npc = this.state.npcs[npcId];
        if (!npc) {
            return false;
        }

        // 检查是否解锁
        if (!this.state.unlockedNPCs.includes(npcId)) {
            return false;
        }

        // 检查访问条件
        if (npc.requirements) {
            if (npc.requirements.sect && this.state.sect !== npc.requirements.sect) {
                return false;
            }
            if (npc.requirements.sectRank) {
                const rankOrder = ['外门弟子', '内门弟子', '核心弟子', '真传弟子', '长老'];
                const playerRankIndex = rankOrder.indexOf(this.state.sectRank);
                const requiredRankIndex = rankOrder.indexOf(npc.requirements.sectRank);
                if (playerRankIndex < requiredRankIndex) {
                    return false;
                }
            }
            if (npc.requirements.realm) {
                const realmNames = Object.keys(this.state.realms);
                const currentRealmIndex = realmNames.indexOf(this.state.realm);
                const requiredRealmIndex = realmNames.indexOf(npc.requirements.realm);
                if (currentRealmIndex < requiredRealmIndex) {
                    return false;
                }
            }
            if (npc.requirements.spiritStones && this.state.spiritStones < npc.requirements.spiritStones) {
                return false;
            }
        }

        return true;
    }

    // 获取NPC可接受的礼物列表
    getNPCGifts(npcId) {
        const npc = this.state.npcs[npcId];
        if (!npc || !npc.gifts) {
            return [];
        }

        const gifts = [];
        for (const [itemName, giftConfig] of Object.entries(npc.gifts)) {
            const playerItemCount = this.state.inventory[itemName] || 0;
            gifts.push({
                name: itemName,
                affection: giftConfig.affection,
                count: playerItemCount
            });
        }

        return gifts;
    }

    // 处理NPC对话选择
    handleNPCChoice(npcId, choiceId) {
        const npc = this.state.npcs[npcId];
        if (!npc) {
            return { success: false, message: 'NPC不存在' };
        }

        // 查找对应的对话选择
        // 这里需要根据实际的对话配置来实现
        // 暂时返回基础响应
        return {
            success: true,
            message: '选择了对话选项'
        };
    }
}
