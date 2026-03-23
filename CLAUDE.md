# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Riverside Guide 是一个 Discourse Theme Component（主题组件），使用 Driver.js 提供首页和帖子页的新手引导功能。

## Key Architecture

| 文件 | 用途 |
|------|------|
| `javascripts/discourse/api-initializers/riverside-guide.gjs` | 核心入口，包含嵌入式 Driver.js 代码和引导逻辑 |
| `common/common.scss` | 样式文件，含嵌入式 driver.css 和自定义按钮/弹窗样式 |
| `common/footer.html` | 悬浮按钮 HTML |
| `common/head_tag.html` | 头部标签（内联 Driver.js IIFE 脚本） |
| `settings.yml` | 主题组件设置项 |
| `locales/zh_CN.yml` / `locales/en.yml` | 引导文案国际化 |
| `dist/` | Driver.js 官方构建输出（升级版本时使用） |

## Settings 配置

| 字段 | 类型 | 说明 |
|------|------|------|
| `home_tour_target_topic_id` | integer | 首页引导完成后跳转的目标帖子 ID |
| `certification_tutorial_topic_id` | integer | 校友认证教程帖子 ID（<=0 视为未配置） |
| `verified_group_name` | string | 已完成认证的用户组名称（留空则始终显示认证提示步骤） |

## Core Concepts

- **Two tour configs**: `HOME_TOUR_CONFIG`（首页）和 `TOPIC_TOUR_CONFIG`（帖子页）
- **Device filter**: `device: 0` = 仅桌面端，`device: 1` = 仅移动端，不填 = 通用
- **Mobile breakpoint**: `window.innerWidth <= 600` 判断移动端
- **Cross-page flow**: 首页引导完成后通过 `sessionStorage["riverside_guide_pending_tour"]` 存储 pending 状态，跳转帖子页后自动继续引导
- **Embedded Driver.js**: Driver.js 的 JS（IIFE）和 CSS 都以内嵌方式集成在 `common/head_tag.html` 和 `common/common.scss` 中

## Development Commands

This is a Discourse theme component - no build system, no tests, no linting. Development is done by:
1. Editing the component files directly
2. Uploading/installing the component in a Discourse instance for testing

To update Driver.js version:
1. Download new build from Driver.js repository
2. Copy `driver.js.iife.js` content to `common/head_tag.html`（保留 `__driverGlobal` 包装检查）
3. Copy `driver.css` content to `common/common.scss` 顶部嵌入式注释块内

## Key Patterns

- **I18n**: Use `t("key.path")` function for translations, with optional `{ count: n }` options
- **Translation keys**: Defined in `locales/zh_CN.yml` with prefix like `tour.home.welcome.title`
- **Element detection**: Use `requestAnimationFrame` or `waitForElement` helper for async rendering
- **Routing**: Use `DiscourseURL.routeTo(path)` for navigation
- **Settings access**: Use `settings.setting_name`（仅在 Discourse 运行时可用）
- **Page detection**: Check `window.location.pathname === "/"` for home page

## Testing

Manual verification required:
1. Enable the component in Discourse admin
2. Visit homepage and click "新手教程" button
3. Verify step flow on desktop and mobile (`<= 600px`)
4. Confirm home tour completion routes to topic and triggers topic tour
5. Ensure button only appears on `/`
