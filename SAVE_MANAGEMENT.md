# 文字修仙游戏 - 存档管理说明

## 📁 当前存档位置

游戏使用 **浏览器本地存储（localStorage）** 存档，具体信息：

### 存储位置
- **存储类型**：浏览器 localStorage
- **存档键名**：
  - `xiuxian_save_1`：存档槽位1
  - `xiuxian_save_2`：存档槽位2
  - `xiuxian_save_3`：存档槽位3
- **存储位置**：浏览器用户数据目录

### 不同浏览器的存档位置

**Windows 系统：**
- Chrome：`C:\Users\用户名\AppData\Local\Google\Chrome\User Data\Default\Local Storage`
- Edge：`C:\Users\用户名\AppData\Local\Microsoft\Edge\User Data\Default\Local Storage`
- Firefox：`C:\Users\用户名\AppData\Roaming\Mozilla\Firefox\Profiles\随机字符串\webappsstore.sqlite`

**Mac 系统：**
- Chrome：`~/Library/Application Support/Google/Chrome/Default/Local Storage`
- Firefox：`~/Library/Application Support/Firefox/Profiles/随机字符串`

## ⚠️ 重要限制

### localStorage 的局限性
1. **单浏览器限制**：存档只存储在当前浏览器中
   - Chrome 的存档在 Firefox 中看不到
   - 不同用户的浏览器数据独立

2. **清除数据丢失**：
   - 清除浏览器数据 → 存档丢失
   - 卸载浏览器 → 存档可能丢失
   - 使用隐私/无痕模式 → 存档不会保存

3. **设备限制**：
   - 电脑A的存档在电脑B上无法直接访问
   - 需要手动导出/导入才能跨设备

## ✅ 保护存档的方案

### 方案1：导出/导入功能（推荐）
游戏已添加存档导出/导入功能：
1. 点击[存档]按钮
2. 选择"导出存档" - 下载 `.json` 文件
3. 保存到安全位置（云盘、U盘等）
4. 需要时选择"导入存档" - 恢复存档

### 方案2：手动备份 localStorage
1. 打开浏览器开发者工具（F12）
2. 进入 Application / 应用 标签
3. 左侧找到 Local Storage
4. 找到你的域名
5. 复制所有 `xiuxian_save_*` 的值
6. 保存到文本文件

### 方案3：服务器存储（需要后端支持）
如果需要跨设备同步，需要：
- 添加后端服务器
- 用户登录系统
- 云端存档存储

## 🔄 如何备份和恢复存档

### 备份存档
```
1. 在游戏中点击 [存档] 按钮
2. 点击 [导出所有存档] 按钮
3. 保存下载的 xiuxian_saves_时间戳.json 文件
```

### 恢复存档
```
1. 在游戏中点击 [存档] 按钮
2. 点击 [导入存档] 按钮
3. 选择之前备份的 .json 文件
4. 确认导入
```

## 💡 最佳实践

1. **定期备份**：每周或重要节点（突破境界前）导出存档
2. **多份备份**：保存到多个位置（电脑+云盘）
3. **命名规范**：使用有意义的文件名，如 `修仙存档_筑基期_20260317.json`
4. **版本管理**：保留不同时期的存档，方便回退

## 🚀 部署到服务器时的注意事项

如果要在服务器上部署（让其他人玩）：

### 当前方案的限制
- 每个玩家的存档存储在自己的浏览器中
- 服务器端无法访问玩家的 localStorage
- 玩家更换设备/浏览器会丢失存档

### 推荐改进方案
1. **添加后端API**：
   - 存档保存到服务器数据库
   - 用户注册/登录系统
   - 跨设备同步

2. **简化方案**：
   - 添加用户ID（生成随机UUID）
   - 存档上传到服务器（需要自己搭建）
   - 保留导出/导入功能作为备份

## 📋 存档文件内容示例

```json
{
  "slot": 1,
  "playerName": "张三",
  "daoName": "青云道人",
  "realm": "筑基期",
  "level": 3,
  "cultivation": 1500,
  "maxCultivation": 5000,
  "spiritStones": 5000,
  "sect": "qingyun_sect",
  "inventory": {
    "聚气丹": 10,
    "筑基丹": 2
  },
  "skills": {
    "基础吐纳法": { "level": 5 },
    "基础剑法": { "level": 3 }
  },
  "artifacts": [
    {
      "id": "iron_sword",
      "name": "铁剑",
      "grade": "凡品",
      "level": 2
    }
  ],
  "questProgress": {},
  "completedQuests": []
}
```

## ⚙️ 技术细节

### 存档大小限制
- localStorage 限制：通常 5-10MB
- 单个存档大小：约 50-200KB
- 理论上可以存储数千个存档

### 存档格式
- 格式：JSON字符串
- 编码：UTF-8
- 包含：所有游戏状态数据

### 自动保存
- 游戏每30秒自动保存一次
- 保存到当前槽位
- 不会覆盖其他槽位

---

**最后更新**：2026-03-17
**游戏版本**：v2.0
**存档版本**：兼容性说明
