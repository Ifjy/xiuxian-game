# 🎮 游戏运行指南

## ⚠️ 重要说明

**本游戏使用 ES6 模块系统，需要通过 HTTP 服务器运行，不能直接双击 HTML 文件打开。**

---

## 🚀 如何运行游戏

### 方法1：使用 Python HTTP 服务器（推荐）

```bash
# 在项目目录运行
python -m http.server 8000

# 然后在浏览器打开
# http://localhost:8000/character-creation.html
```

### 方法2：使用 Node.js 服务器

```bash
# 安装 http-server（全局）
npm install -g http-server

# 运行
http-server -p 8000

# 访问
# http://localhost:8000/character-creation.html
```

### 方法3：使用 VS Code Live Server 插件

1. 安装 "Live Server" 插件
2. 右键点击 index.html
3. 选择 "Open with Live Server"

---

## ❓ 为什么不能直接打开 HTML 文件？

浏览器对 ES6 模块有 **CORS 安全限制**：
- `file://` 协议不允许加载模块
- 必须使用 `http://` 或 `https://` 协议
- 这是浏览器的安全策略，无法绕过

---

## 📦 如何分发游戏给别人玩？

### 方案1：部署到静态网站托管（免费）⭐ 推荐

**GitHub Pages**
```bash
# 推送到 GitHub
git push origin master

# 在 GitHub 仓库设置中启用 GitHub Pages
# 选择 master 分支作为源
# 访问：https://你的用户名.github.io/仓库名
```

**Netlify / Vercel**
- 拖拽项目文件夹到 netlify.com 或 vercel.com
- 自动部署，获得公开 URL
- 完全免费，支持自定义域名

### 方案2：打包为单文件版本（需要开发工作）

将所有 JS 模块打包成一个 `game-bundle.js`：
- 使用打包工具（Rollup / Webpack / esbuild）
- 删除模块导入/导出语法
- 生成单文件，可以直接双击运行

**当前不支持此方案**，需要添加打包配置。

### 方案3：本地分享

给对方提供：
1. 整个项目文件夹
2. 运行说明：使用 `python -m http.server 8000`

---

## 🔧 技术细节

**当前架构**：
- 使用 ES6 模块（`type="module"`）
- 模块化目录结构（`js/`）
- 通过 `import/export` 管理依赖

**如果要支持双击运行**：
- 需要添加打包步骤
- 或改回单文件架构（不推荐）

---

## 📝 快速启动脚本

创建 `start.bat`（Windows）或 `start.sh`（Mac/Linux）：

**Windows (start.bat)**:
```batch
@echo off
echo 正在启动游戏服务器...
echo 游戏地址: http://localhost:8000/character-creation.html
python -m http.server 8000
```

**Mac/Linux (start.sh)**:
```bash
#!/bin/bash
echo "正在启动游戏服务器..."
echo "游戏地址: http://localhost:8000/character-creation.html"
python3 -m http.server 8000
```

双击脚本即可启动游戏！
