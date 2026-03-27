# 业娱家 (webook.pub)

CPS 内容推广网站，分享文章/播客/短视频，穿插 CPS 推广。

技术栈：VitePress 1.x + Vite + Vue3

## 新机器快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/michaelhsuke/michaelhsuke.github.io.git
cd michaelhsuke.github.io

# 2. 安装依赖
npm install

# 3. 本地开发
npm run dev

# 4. 修改后推送（自动触发部署）
git add .
git commit -m "你的提交信息"
git push origin main
```

> 国内网络如无法连接 GitHub，可配置代理：
> ```bash
> git config --global http.proxy http://127.0.0.1:7890
> git config --global https.proxy http://127.0.0.1:7890
> ```

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 本地开发 |
| `npm run build` | 构建 |
| `npm run preview` | 预览构建产物 |

## 部署

推送代码到 `main` 分支后，GitHub Actions 会自动构建并部署到 [webook.pub](https://webook.pub)。

## 项目文档

- [PRD.md](./PRD.md) — 产品需求文档
- [DEPLOY.md](./DEPLOY.md) — 部署指南
