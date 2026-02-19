# Riverside Guide（Discourse 主题组件）

`Riverside Guide` 是一个用于 Discourse 的引导组件，提供首页和帖子页的新手教学流程，并在首页显示“新手教程”悬浮按钮。

## 功能概览

- 首页引导：介绍发帖、导航、搜索、话题筛选、通知入口等核心功能。
- 帖子页引导：介绍标题区、时间轴、回复操作等常用区域。
- 设备适配：支持按设备区分步骤（桌面端/移动端）。
- 串联流程：可在首页引导完成后自动跳转到目标帖子并继续引导。

## 技术说明

- 基于 Discourse Theme Component API（`apiInitializer`）实现。
- 引导引擎使用 **Driver.js**。
- `Driver.js` 脚本与样式以“内嵌”方式集成到组件中，运行时无需额外 CDN。

> 声明：本项目已使用 Driver.js 作为引导交互核心库。

## 目录结构

- `about.json`：组件元数据。
- `settings.yml`：组件设置项（引导目标帖子、认证教程帖子、认证用户组名）。
- `javascripts/discourse/api-initializers/riverside-guide.gjs`：核心引导逻辑与 Driver.js 内嵌脚本。
- `common/common.scss`：样式（含 driver.css 内嵌样式和自定义 UI）。
- `common/footer.html`：悬浮按钮 HTML。
- `common/head_tag.html`：头部说明（无外部 Driver.js 依赖）。
- `locales/en.yml`：主题描述文案。
- `driver.js的API文档.md`：Driver.js 中文参考文档。

## 使用方式

1. 在 Discourse 后台安装并启用该 Theme Component。
2. 进入论坛首页，点击右下角“新手教程”按钮启动引导。
3. 按步骤完成首页引导后，会根据配置进入帖子页继续引导。

## 开发说明

- 更新 Driver.js 时，请将新版本构建产物同步到组件中的内嵌脚本与样式区块。
- 新增步骤时建议先确认目标选择器在对应页面和设备下存在。
- 涉及路由切换与异步渲染时，优先使用 `requestAnimationFrame` 或等待元素出现后再启动步骤。
