# 业娱家部署指南

## 仓库信息

- **GitHub 仓库**: https://github.com/michaelhsuke/michaelhsuke.github.io
- **域名**: webook.pub
- **部署方式**: GitHub Actions → GitHub Pages

---

## 一、首次部署：从零到上线

### 1. 生成 Personal Access Token

> 该 Token 用于 Git 推送认证，无需安装 gh CLI。

1. 打开 https://github.com/settings/tokens?type=beta
2. 点击 **Generate new token**
3. 填写配置：

| 配置项 | 值 |
|--------|-----|
| Token name | `cps-deploy`（自定义名称） |
| Expiration | 建议选 90 天或自定义 |
| Repository access | **Only select repositories** → 选 `michaelhsuke/michaelhsuke.github.io` |

4. **Permissions** 设置（关键）：

   - **Account permissions → Actions** → `Read and write`（必须，否则无法推送 workflow 文件）
   - **Repository permissions → Contents** → `Read and write`（必须，否则无法推送代码）
   - **Repository permissions → Workflows** → `Read and write`（必须）

5. 点击 **Generate token**，**立即复制保存**（离开页面后无法再次查看）

### 2. 配置 Git Remote

```bash
# 进入项目目录
cd /Users/xuke/my.dev/cps-demo

# 初始化 git（仅首次）
git init
git branch -m main

# 配置 remote（将 <你的TOKEN> 替换为上一步生成的 Token）
git remote add origin https://michaelhsuke:<你的TOKEN>@github.com/michaelhsuke/michaelhsuke.github.io.git
```

### 3. 首次推送

```bash
git add .
git commit -m "init: 业娱家 CPS 内容推广网站"
git push --force origin main
```

> `--force` 仅在首次推送、远程仓库有旧内容需要覆盖时使用。后续正常推送不要加。

### 4. 开启 GitHub Pages

1. 打开 https://github.com/michaelhsuke/michaelhsuke.github.io/settings/pages
2. **Build and deployment → Source** 选择 **GitHub Actions**（不是 Deploy from a branch）
3. 保存

推送后 GitHub Actions 会自动构建部署，1-2 分钟后访问 https://michaelhsuke.github.io 即可。

### 5. 绑定自定义域名（可选）

**DNS 配置**（在域名服务商如阿里云、Cloudflare 添加）：

| 类型 | 主机记录 | 记录值 |
|------|---------|--------|
| CNAME | www | michaelhsuke.github.io |
| CNAME | @ | michaelhsuke.github.io |

> 部分 DNS 服务商不支持 Apex 域名的 CNAME 记录，此时用 A 记录：
> ```
> 185.199.108.153
> 185.199.109.153
> 185.199.110.153
> 185.199.111.153
> ```

**GitHub 仓库配置**：
1. 打开 https://github.com/michaelhsuke/michaelhsuke.github.io/settings/pages
2. **Custom domain** 填入 `webook.pub`
3. 勾选 **Enforce HTTPS**
4. 保存

> `docs/.vitepress/public/CNAME` 已配置为 `webook.pub`，每次部署自动生效。

---

## 二、日常开发与推送

### 本地开发

```bash
npm run dev        # 启动开发服务器 http://localhost:5173
npm run build      # 构建验证
npm run preview    # 预览构建产物
```

### 推送更新

```bash
# 1. 确保在 main 分支
git checkout main

# 2. 添加修改
git add .

# 3. 提交
git commit -m "feat: 新增文章 / fix: 修复xxx"

# 4. 推送（自动触发部署）
git push origin main
```

### Token 过期后更换

Token 过期或泄露时，重新生成一个（参考第一步），然后更新 remote：

```bash
git remote set-url origin https://michaelhsuke:<新TOKEN>@github.com/michaelhsuke/michaelhsuke.github.io.git
```

---

## 三、发布新文章

1. 在 `docs/posts/<分类>/` 下创建 `.md` 文件
2. 文件头部添加 frontmatter：

```yaml
---
title: 文章标题
date: 2026-03-27
category: 好物推荐
tags: [标签1, 标签2]
cover: /images/xxx.jpg
skills: [Vue3]         # 可选，关联技能档案
tutorial: false        # true 表示教程文章
---
```

3. 在 `docs/.vitepress/config.ts` 的 `sidebar` 中添加条目
4. 提交推送，自动部署

---

## 四、管理社区技能交换

1. 访客通过 `/exchange/` 页面提交技能，自动创建 GitHub Issue（需配置 `SkillSubmitForm.vue` 中的 `GITHUB_REPO`）
2. 审核通过的 Issue，提取信息添加到 `docs/.vitepress/utils/community-skills.ts`：

```ts
export const data: CommunityMember[] = [
  {
    id: '4',
    name: '访客昵称',
    avatar: 'https://github.com/xxx.png',  // 可选
    have: ['Vue3', '摄影'],
    want: ['钢琴'],
    contact: 'visitor@example.com',
    contactType: 'email',  // 'email' | 'wechat' | 'github'
    date: '2026-03-27',
  },
]
```

3. 提交推送，自动部署

---

## 五、GitHub Actions

### 部署工作流

配置文件：`.github/workflows/deploy.yml`

- **触发**：推送 `main` 分支时自动运行
- **流程**：安装依赖 → 构建 → 部署到 GitHub Pages

### 手动触发部署

1. 打开 https://github.com/michaelhsuke/michaelhsuke.github.io/actions
2. 选择 **Deploy VitePress to GitHub Pages** 工作流
3. 点击 **Run workflow** → 选择 `main` → 确认

### 查看部署状态

Actions 页面会显示每次推送的构建状态：
- 🟢 绿色 = 部署成功
- 🔴 红色 = 部署失败，点击查看日志

---

## 六、待配置的第三方服务

| 服务 | 配置位置 | 说明 |
|------|---------|------|
| Giscus 评论 | `config.ts` → `comment` | 替换 `repo` / `repoId` / `categoryId` |
| 百度统计 | `config.ts` → `head` | 取消注释并替换 `YOUR_BAIDU_ID` |
| GitHub Issue 表单 | `SkillSubmitForm.vue` → `GITHUB_REPO` | 替换为实际仓库地址 |
| 社交链接 | `config.ts` → `socialLinks` | 替换 GitHub 链接 |

---

## 七、故障排查

### 推送失败：Token 权限不足

错误信息：`refusing to allow a Personal Access Token to create or update workflow ... without workflow scope`

解决：重新生成 Token，确保勾选 **Actions → Read and write** 和 **Workflows → Read and write**。

### 推送失败：Token 过期

错误信息：`authentication failed`

解决：重新生成 Token，更新 remote URL（参考日常开发 → Token 过期后更换）。

### 部署失败

1. 打开 https://github.com/michaelhsuke/michaelhsuke.github.io/actions 查看日志
2. 本地先运行 `npm run build` 验证
3. 常见原因：Node.js 版本不兼容、依赖安装失败、构建语法错误

### 域名不生效

1. 检查 DNS：`dig webook.pub`
2. 检查 GitHub Pages Custom domain 设置
3. DNS 生效可能需要几分钟到 48 小时

### 页面 404

1. 检查 GitHub Actions 是否构建成功
2. 检查文件名是否含中文或特殊字符
3. 等待 1-2 分钟后刷新
