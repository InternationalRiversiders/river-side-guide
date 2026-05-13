# Riverside Guide（Discourse 主题组件）

`Riverside Guide` 是一个 Discourse Theme Component，使用 [Driver.js](https://driverjs.com) 提供首页和帖子页的新手引导功能。

## 功能概览

- **首页引导**：介绍发帖、导航、搜索、话题筛选、通知、用户菜单等核心功能（桌面端 + 移动端自适应）
- **帖子页引导**：介绍标题区、时间轴导航、回复操作等常用区域
- **跨页面串联**：首页引导完成后自动跳转到目标帖子并继续帖子页引导
- **条件步骤**：根据用户组动态显示/隐藏步骤（如未认证校友提示认证）
- **弹窗定位**：支持配置引导弹窗的 `side`（位置）和 `align`（对齐方式）
- **确认退出**：引导中途退出时弹出确认对话框
- **自动清理**：引导结束时自动关闭可能被打开的菜单

## 技术说明

- 基于 Discourse Theme Component API（`apiInitializer`）实现
- Driver.js JS（IIFE）内嵌在 `riverside-guide.gjs`，CSS 内嵌在 `common/common.scss`，无外部 CDN 依赖
- 支持通过 `settings.yml` 中的 `objects` 类型配置自定义引导步骤

## 目录结构

```
riverside-guide/
├── about.json                           # 组件元数据
├── settings.yml                         # 组件设置（6 个配置项）
├── common/
│   ├── common.scss                      # 内嵌 driver.css + 自定义按钮/弹窗样式
│   ├── footer.html                      # 悬浮按钮 HTML
│   └── head_tag.html                    # 头部标签（Driver.js 已迁移至 GJS）
├── javascripts/discourse/api-initializers/
│   └── riverside-guide.gjs              # 核心引导逻辑（~758 行）
├── locales/
│   ├── zh_CN.yml                        # 中文文案
│   └── en.yml                           # 英文文案
├── dist/                                # Driver.js 构建产物（升级版本时参考）
├── CLAUDE.md                            # AI 编码助手指南
└── README.md
```

## 设置项

| 字段 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `home_tour_target_topic_id` | integer | 19 | 首页引导完成后跳转的目标帖子 ID |
| `certification_tutorial_topic_id` | integer | 5 | 校友认证教程帖子 ID（<=0 视为未配置） |
| `verified_groups` | groups | `[]` | 已完成认证的用户组（多选；留空则始终显示认证提示步骤） |
| `home_tour_steps` | objects | `[]` | 首页引导步骤（为空则使用内置默认步骤） |
| `topic_tour_steps` | objects | `[]` | 帖子页引导步骤（为空则使用内置默认步骤） |
| `conditional_steps` | objects | `[]` | 条件步骤配置 |

### 步骤配置属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `title_key` | string(必填) | 标题 i18n key |
| `description_key` | string(必填) | 描述 i18n key |
| `element` | string | CSS 选择器，为空则全屏高亮 |
| `device` | enum | `both`（通用）/ `desktop`（仅桌面）/ `mobile`（仅移动） |
| `side` | enum | 弹窗位置：`top` / `right` / `bottom` / `left`（留空自动选择） |
| `align` | enum | 弹窗对齐：`start` / `center` / `end`（留空自动选择） |
| `on_highlighted` | enum | 高亮时的回调：`auto_open_hamburger` / `auto_open_user_menu` / `auto_close_menu` |
| `on_next` | enum | 点击"下一步"时的动作（仅帖子页）：`navigate_to_cert` |
| `buttons` | list | 显示的按钮，管道符分隔，如 `next\|previous\|close` |

## 使用方式

1. 在 Discourse 后台 **Admin → Customize → Themes → Components** 中安装该组件
2. 确保 `home_tour_target_topic_id` 指向一个有效的帖子
3. 根据需要配置 `certification_tutorial_topic_id` 和 `verified_groups`
4. 可选：在 `home_tour_steps` / `topic_tour_steps` / `conditional_steps` 中自定义引导步骤
5. 启用组件后，首页右下角会出现「新手教程」悬浮按钮

## 开发说明

### 更新 Driver.js

1. 下载新版 Driver.js 构建产物到 `dist/` 目录
2. 从 `dist/driver.js.iife.js` 提取函数体：去掉前缀 `this.driver=this.driver||{};this.driver.js=` 和后缀 `({});`
3. 替换 `riverside-guide.gjs` 中 `__driverGlobal.driver.js = ` 之后的旧函数体（保留 `__driverGlobal` 包装）
4. 对比 `dist/driver.css` 和 `common/common.scss` 顶部嵌入式 CSS，如有变化则替换

### 开发规范

- 无构建系统，直接编辑组件文件
- 编辑后在 Discourse 实例中上传/更新组件进行测试
- 涉及路由切换与异步渲染时，使用 `requestAnimationFrame` 或 `waitForElement` 等待 DOM 就绪
- 新增步骤前确认目标 CSS 选择器在对应页面和设备下存在
- `onHighlighted` / `onDeselected` / `onHighlightStarted` 是 **步骤级** 钩子，不要放在 `popover` 内
- `onNextClick` / `onPrevClick` / `onCloseClick` 是 **Popover 级** 钩子

## 版本历史

| 版本 | 变更 |
|------|------|
| 0.2.0 | 升级 Driver.js 至最新版；修复 `onHighlighted` 回调位置 bug；新增 `side`/`align` 弹窗定位；补全英文文案；添加 `onDestroyed` 菜单清理 |
| 0.1.0 | 初始版本 |

## 许可

本主题组件使用 [Driver.js](https://github.com/kamranahmedse/driver.js) 作为引导交互引擎（MIT License）。
