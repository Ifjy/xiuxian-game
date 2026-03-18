# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个纯 CMD 风格的文字修仙挂机游戏，使用纯前端技术（HTML + CSS + JavaScript ES6 模块）开发。

### 技术栈
- **前端**：HTML5 + CSS3 + 原生 JavaScript (ES6 模块)
- **存储**：浏览器 localStorage（3个存档槽位）
- **部署**：静态文件，可直接用浏览器打开或部署到任何静态服务器

### 游戏页面流程
1. **character-creation.html** → 角色创建页面（背景故事、属性分配）
2. **index.html** → 主游戏界面
3. 通过 sessionStorage 传递角色数据

## 代码架构

### 目录结构
```
js/
├── main.js                    # 主入口，初始化游戏
├── core/                      # 核心模块
│   ├── GameState.js          # 游戏状态管理中心（核心类）
│   ├── GameUI.js             # UI 更新和事件绑定
│   └── SaveManager.js        # 存档管理（localStorage）
├── systems/                   # 游戏系统模块
│   ├── CultivationSystem.js  # 修炼、突破、功法系统
│   ├── AdventureSystem.js    # 历练、打工、探索系统
│   ├── CombatSystem.js       # 战斗、战斗技能、法宝系统
│   ├── DungeonSystem.js      # 副本、天劫系统
│   ├── SectSystem.js         # 宗门系统
│   ├── PetSystem.js          # 宠物系统
│   ├── NPCSystem.js          # NPC交互系统
│   ├── QuestSystem.js        # 任务系统
│   └── AchievementSystem.js  # 成就系统
└── config/                    # 配置数据
    ├── GameConfig.js         # 主配置（境界、灵根、出身、功法等）
    ├── ItemsConfig.js        # 物品配置
    ├── MonstersConfig.js     # 怪物配置
    ├── DungeonsConfig.js     # 副本配置
    └── ASCIIArt.js           # ASCII艺术字符画
```

### 核心设计模式

**GameState 类（核心中心）**
- 所有游戏数据存储在 `GameState` 实例中
- 使用**代理模式**：GameState 将具体操作委托给各个系统类
- 各系统类通过构造函数接收 GameState 实例，可以访问和修改游戏状态

示例：
```javascript
// GameState 中的代理方法
addCultivation(amount) {
    return this.cultivationSystem.addCultivation(amount);
}

// CultivationSystem 中的实际实现
addCultivation(amount) {
    this.gameState.cultivation += amount;
    // ... 其他逻辑
}
```

**模块化系统架构**
- 每个系统继承自对应的基类，独立管理自己的功能
- 系统之间通过 GameState 通信
- 配置数据集中在 `config/` 目录，与逻辑代码分离

## 开发工作流

### 本地开发
```bash
# 直接用浏览器打开（无需服务器）
# Windows
start index.html

# 或使用简单的 HTTP 服务器（推荐，避免跨域问题）
python -m http.server 8000
# 然后访问 http://localhost:8000
```

### 配置数据管理
项目提供了两个 Python 脚本用于从旧的单文件版本提取配置：
- `extract_config.py` - 从 game.js 提取配置段
- `format_config.py` - 格式化为 ES6 模块

### 调试命令
打开浏览器控制台（F12）可以使用：

```javascript
// 访问游戏实例
window.game                    // 当前 GameState 实例
window.ui                      // 当前 GameUI 实例

// 常用操作
game.save()                    // 保存游戏
game.addCultivation(1000)     // 添加修为
game.addSpiritStones(1000)    // 添加灵石
game.addItem("聚气丹")          // 添加物品
window.debugGame()             // 调试游戏状态

// 访问存档
localStorage.getItem('xiuxian_save_1')
localStorage.setItem('xiuxian_save_1', JSON.stringify(data))
```

## 关键系统说明

### 1. 修炼系统（CultivationSystem）
- 核心循环：每秒自动增加修为
- 修炼速度 = 基础速度 × 灵根加成 × 功法加成 × 宠物加成
- 突破机制：修为满后可尝试突破，成功率受悟性、功法影响
- 境界系统：炼气→筑基→金丹→元婴→化神→渡劫→大乘

### 2. 战斗系统（CombatSystem）
- 回合制战斗
- 战斗技能系统（可学习、升级技能）
- 法宝系统（武器、护甲、饰品、特殊）
- 装备法宝可改变战斗属性

### 3. 副本系统（DungeonSystem）
- 秘境探索：随机生成的探索内容
- 天劫系统：突破大境界时的渡劫挑战
- 支持 team battle（多轮战斗）

### 4. 宗门系统（SectSystem）
- 宗门等级：外门弟子→内门弟子→核心弟子→真传弟子→长老
- 宗门任务：获得贡献度和声望
- 宗门商店：购买功法和物品

### 5. 灵根系统
- 天灵根（单元素）：修炼速度 +50%
- 地灵根（双元素）：修炼速度 +30%
- 三系灵根：修炼速度 +15%
- 四系灵根：修炼速度 +5%
- 五系灵根：修炼速度 +2%（杂灵根）

## 存档系统

### 存储位置
- 使用浏览器 localStorage
- 存档键：`xiuxian_save_1`、`xiuxian_save_2`、`xiuxian_save_3`
- 自动保存：每60秒 + 页面关闭前
- 导出/导入：游戏内支持导出为 JSON 文件

### 存档结构
GameState.toSaveObject() 方法将游戏状态序列化为可存储的对象，包含：
- 角色信息（姓名、道号、出身、灵根）
- 修仙状态（境界、等级、修为、灵石）
- 所有系统数据（背包、功法、宠物、装备、NPC、任务等）

## 代码规范

### 命名约定
- **类名**：PascalCase（如 `GameState`）
- **函数/方法**：camelCase（如 `addCultivation`）
- **常量**：UPPER_SNAKE_CASE（如 `MAX_SAVES`）
- **配置对象**：camelCase（如 `spiritualRoots`）
- **私有方法**：使用下划线前缀（如 `_internalMethod`）

### 文件组织
- 每个系统一个文件
- 配置数据与逻辑分离
- 导出使用 ES6 `export` 语法
- 导入使用 ES6 `import` 语法

### 注释规范
- 函数/方法应添加 JSDoc 注释
- 中文注释说明业务逻辑
- 复杂算法需要解释

## 常见任务

### 添加新系统
1. 在 `js/systems/` 创建新系统类
2. 在 `GameState.js` 的 `initSystems()` 中初始化
3. 在 `GameState` 中添加代理方法
4. 在 `GameUI.js` 中绑定 UI 事件

### 添加新配置
1. 在 `js/config/` 对应的配置文件中添加
2. 确保导出正确的对象结构
3. 在需要的地方导入使用

### 修改游戏平衡性
- 主要在 `GameConfig.js` 中修改数值
- 修炼速度、突破概率、掉落率等

### UI 修改
- 主要在 `GameUI.js` 中
- HTML 结构在 `index.html` 和 `character-creation.html`
- 样式在 `style.css` 和 `creation-style.css`

## 注意事项

### 重要限制
- 存档存储在浏览器本地，清除浏览器数据会丢失存档
- 无后端服务器，无法跨设备自动同步
- 使用 sessionStorage 在页面间传递数据，刷新页面会丢失

### 已知问题
- 从单文件（game.js）到模块化重构正在进行中
- 部分功能可能还在旧文件中
- 测试覆盖有限

### 性能考虑
- 游戏循环使用 setInterval（每秒执行）
- 注意避免在游戏循环中执行重计算
- 大量数据操作考虑防抖/节流

## 相关文档
- `README.md` - 游戏说明和功能介绍
- `SAVE_MANAGEMENT.md` - 存档管理详细说明
- `GAME_DEVELOPMENT_PLAN.md` - 开发规划和路线图
- `TESTING_REPORT.md` - 测试报告
- `FUTURE_ROADMAP.md` - 未来功能规划
