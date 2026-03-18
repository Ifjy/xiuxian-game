# 🚀 GitHub Pages 部署指南

## 📋 部署步骤

### 第一步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `xiuxian-game`（或你喜欢的名字）
   - **Description**: `文字修仙 - 纯CMD风格挂机游戏`
   - **Public**: ✅ 选择公开（免费用户必须选公开才能用 Pages）
   - **Add a README file**: ❌ 不要勾选（我们已经有了）
3. 点击 **Create repository**

### 第二步：推送代码到 GitHub

在项目目录运行：

```bash
# 添加 GitHub 仓库地址（替换成你的用户名）
git remote add origin https://github.com/你的用户名/xiuxian-game.git

# 推送代码到 GitHub
git push -u origin master
```

**如果推送失败**，可能是因为 GitHub 默认分支是 `main`：

```bash
# 修改本地分支名为 main
git branch -M main

# 推送到 main 分支
git push -u origin main
```

### 第三步：启用 GitHub Pages

1. 访问你刚创建的仓库
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. 在 **Source** 部分：
   - **Branch**: 选择 `master` 或 `main`
   - **Folder**: `/ (root)`
5. 点击 **Save**

### 第四步：等待部署完成

- GitHub 会自动部署你的网站
- 通常需要 1-5 分钟
- 在 **Pages** 设置页面会显示：
  ```
  Your site is live at https://你的用户名.github.io/xiuxian-game/
  ```

### 第五步：测试游戏

访问部署好的链接：
```
https://你的用户名.github.io/xiuxian-game/character-creation.html
```

---

## 🎮 分享给朋友

直接发送这个链接：
```
https://你的用户名.github.io/xiuxian-game/
```

朋友点击后：
1. 打开角色创建页面
2. 创建角色开始游戏
3. 存档自动保存在他们本地浏览器

---

## 📝 更新游戏

当你修改代码后，只需：

```bash
git add .
git commit -m "更新内容"
git push
```

GitHub Pages 会自动重新部署！通常 1-2 分钟后生效。

---

## 🔧 自定义域名（可选）

如果你想用自己的域名：

1. 在域名注册商处添加 CNAME 记录：
   ```
   你的域名.com  →  你的用户名.github.io
   ```

2. 在 GitHub Pages 设置中添加自定义域名

3. 等待 DNS 生效（可能需要几小时到几天）

---

## 📊 示例

假设你的 GitHub 用户名是 `zhangsan`：

1. 创建仓库：`https://github.com/zhangsan/xiuxian-game`
2. 推送代码：
   ```bash
   git remote add origin https://github.com/zhangsan/xiuxian-game.git
   git push -u origin master
   ```
3. 启用 Pages 后，游戏链接：
   ```
   https://zhangsan.github.io/xiuxian-game/
   ```

分享给朋友：
```
来玩我做的修仙游戏！
https://zhangsan.github.io/xiuxian-game/

纯 CMD 风格，角色创建 → 修炼 → 突破 → 渡劫
存档自动保存在浏览器本地
```

---

## ❓ 常见问题

### Q: 部署后显示 404 错误？
**A**: 等待 5-10 分钟，GitHub Pages 需要时间部署。检查分支名称是否正确。

### Q: 游戏无法加载模块？
**A**: 确认 `index.html` 中使用的是相对路径：
```html
<script type="module" src="js/main.js"></script>
```

### Q: 如何查看部署状态？
**A**: 在仓库的 **Actions** 标签可以看到部署日志。

### Q: 免费版有限制吗？
**A**:
- ✅ 完全免费
- ✅ 无流量限制
- ✅ 支持 HTTPS
- ✅ 自动部署
- ❌ 只支持公开仓库
- ❌ 只有静态网站（无法用后端）
