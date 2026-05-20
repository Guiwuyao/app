# Toolbox | 沉浸式工具集

> 化繁为简，静心创造。一个基于纯原生技术栈（Vanilla Web）构建的模块化个人工具箱。

## 🌟 项目概况

Toolbox 是一个旨在提供“沉浸式体验”的小工具聚合网站。本项目没有引入任何前端构建工具（如 Webpack、Vite、React 或 Vue），完全使用最纯粹的 **HTML5 + CSS3 + Vanilla JavaScript** 打造。

### ✨ 核心特性
- **极致纯粹**：零依赖，免安装（No `npm install`），双击 `index.html` 即可运行。
- **高内聚低耦合**：每一个子应用都在 `apps/` 目录下拥有独立的文件夹，工具之间互不干扰。
- **数据驱动首页**：首页卡片完全由 JS 动态生成，新增工具只需修改一份 JSON 配置。
- **现代 UI/UX**：
  - 全局深色沉浸主题 (Dark Mode)。
  - 优雅的毛玻璃卡片拟物化设计 (Glassmorphism)。
  - 引入「霞鹜文楷 Lite」提供极佳的文字阅读体验。
  - 内置基于 Canvas 的星空连线粒子背景与鼠标涟漪点击特效。

---

## 🛠️ 当前已集成的工具

1. **666个写作灵感** (`apps/Inspiration`)：当你面对空白文档不知所措时，随机抽取话题激发创作欲。
2. **禅定呼吸** (`apps/Breath`)：基于 4-7-8 呼吸法的视觉引导工具，跟随光晕律动找回平静。
3. **极简番茄钟** (`apps/Pomodoro`)：纯粹的 25 分钟/5 分钟专注计时器，使用 Web Audio API 生成提示音。
4. **解压敲击 (电子木鱼)** (`apps/Muyu`)：点击头像释放压力，伴随弹性动画、震动反馈、满屏彩带与随机赞美。
5. **一言 (Hitokoto)** (`apps/Hitokoto`)：通过一言官方 API 随机获取直击心灵的句子，附带作者、出处与外链解析。

---

## 📂 目录结构

```text
app/
├── index.html                   # 网站首页 (数据驱动渲染容器)
├── README.md                    # 本说明文档
├── assets/                      # 全局公共资源
│   ├── css/
│   │   └── global.css           # 全局样式（色彩、排版、毛玻璃、特效样式）
│   └── js/
│       ├── data.js              # 核心配置文件：首页工具列表数据
│       ├── main.js              # 首页卡片动态渲染逻辑
│       └── effects.js           # 粒子背景与鼠标点击特效引擎
└── apps/                        # 独立工具应用目录
    ├── _template/               # 💡 标准工具模板（开发新应用请复制此文件夹）
    ├── Inspiration/             # 写作灵感应用
    ├── Breath/                  # 禅定呼吸应用
    └── Pomodoro/                # 番茄钟应用
```

---

## 🚀 如何新增一个应用？

本项目的架构设计让新增应用变得极其简单，只需 **三步**：

### 第一步：复制模板文件夹
进入 `apps/` 目录，将 `_template/` 文件夹复制一份，并重命名为你的新工具名称（例如 `MyNewTool`）。

### 第二步：开发你的工具
进入新创建的 `apps/MyNewTool/` 目录：
1. **修改 `index.html`**：更改 `<title>` 和应用内部的文本，编写你的功能 HTML 结构。（模板已经为你配置好了全局样式、特效引入以及统一的“返回首页”导航）。
2. **修改 `style.css`**：编写该工具专属的 CSS 样式。**注意：工具内部的样式请包裹在 `.tool-content` 内，避免污染全局。**
3. **修改 `script.js`**：编写你的交互逻辑代码。

### 第三步：在首页注册新应用
打开全局配置文件 `assets/js/data.js`，在 `TOOLS_DATA` 数组中追加一个新对象：

```javascript
const TOOLS_DATA = [
    // ...之前的工具
    {
        id: "MyNewTool", // 唯一标识符
        title: "我的新工具", // 卡片显示的标题
        description: "这是我刚刚开发的新工具的简短描述。", // 卡片显示的描述
        icon: "🚀", // 卡片图标（可以是 Emoji，也可以是图片 <img> 标签）
        path: "./apps/MyNewTool/index.html" // 指向你新工具的相对路径
    }
];
```
保存文件，刷新主页，你就会看到新的毛玻璃卡片已经自动生成了！🎉

---

## 🌐 部署指南 (GitHub Pages)

本项目非常适合托管在 GitHub Pages 上，免费且访问速度快：
1. 将当前项目推送到你的 GitHub 仓库。
2. 在仓库页面点击 `Settings` (设置)。
3. 在左侧菜单找到 `Pages`。
4. 在 `Build and deployment` 下的 `Source` 选择 `Deploy from a branch`。
5. 在 `Branch` 选择你的主分支（通常是 `main` 或 `master`），文件夹选择 `/ (root)`，点击 `Save`。
6. 等待 1-2 分钟，刷新页面即可看到属于你自己的工具箱上线链接！