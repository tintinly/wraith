# Wraith

个人门户主页，汇聚导航、项目、技能栈等信息的入口站点。

示例访问：[tintinly.top](https://tintinly.top)

## 技术栈

- **框架**：Vue 3（Composition API + `<script setup>`）
- **语言**：TypeScript
- **构建工具**：Vite
- **样式**：Tailwind CSS v4
- **图标**：Iconify（Font Awesome 7 / Skill Icons / Twemoji）
- **路由**：Vue Router（SPA 模式）

## 功能

- 个人导航（Portal / Blog / Notes）
- 社交链接（GitHub / Bilibili / X / YouTube / Email）
- 项目展示
- 技能栈展示（支持明暗主题图标切换）
- 明暗主题切换
- 响应式布局

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建产物
npm run preview
```

## 目录结构

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── composables/     # 组合式函数
├── data/            # 静态数据配置
│   ├── navs.ts      # 导航链接
│   ├── socials.ts   # 社交链接
│   ├── projects.ts  # 项目列表
│   ├── skills.ts    # 技能栈
│   └── websites.ts  # 站点列表
├── router/          # 路由配置
├── styles/          # 全局样式
└── views/           # 页面视图
```

## 部署

项目输出为纯静态 SPA，构建产物在 `dist/` 目录，可直接部署到任意静态托管服务（Nginx、GitHub Pages、Cloudflare Pages 等）。
