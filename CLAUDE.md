# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Riverside Guide 是一个 Discourse Theme Component（主题组件），使用 Driver.js 提供首页和帖子页的新手引导功能。

## Key Architecture

- **入口点**: `javascripts/discourse/api-initializers/riverside-guide.gjs` - 核心引导逻辑，包含嵌入式 Driver.js 代码
- **样式**: `common/common.scss` - 包含嵌入式 driver.css 和自定义按钮/弹窗样式
- **UI**: `common/footer.html` - 悬浮按钮 HTML
- **配置**: `settings.yml` - 主题组件设置项（目标帖子ID、认证教程ID、用户组名）
- **国际化**: `locales/zh_CN.yml` 和 `locales/en.yml` - 引导文案

## Core Concepts

- **Two tour configs**: `HOME_TOUR_CONFIG`（首页）和 `TOPIC_TOUR_CONFIG`（帖子页）
- **Device filter**: `device: 0` = 仅桌面端，`device: 1` = 仅移动端，不填 = 通用
- **Cross-page flow**: 首页引导完成后通过 `sessionStorage` 存储 pending 状态，跳转到目标帖子页后自动继续引导
- **Embedded Driver.js**: Driver.js 脚本和样式以内嵌方式集成，无需外部 CDN

## Development Commands

This is a Discourse theme component - no build system, no tests, no linting. Development is done by:
1. Editing the component files directly
2. Uploading/installing the component in a Discourse instance for testing

To update Driver.js version:
1. Download new build from Driver.js repository
2. Copy `driver.js.iife.js` content to the embedded section in `riverside-guide.gjs`
3. Copy `driver.css` content to the embedded section in `common/common.scss`

## Key Patterns

- **I18n**: Use `t("key.path")` function for translations, with optional `{ count: n }` options
- **Translation keys**: Defined in `locales/zh_CN.yml` with prefix like `tour.home.welcome.title`
- **Element detection**: Use `requestAnimationFrame` or `waitForElement` helper for async rendering
- **Routing**: Use `DiscourseURL.routeTo(path)` for navigation
- **Settings access**: Use `settings.setting_name` (only available at runtime in Discourse)

## Testing

Manual verification required:
1. Enable the component in Discourse admin
2. Visit homepage and click "新手教程" button
3. Verify step flow on desktop and mobile (<= 600px)
4. Confirm home tour completion routes to topic and triggers topic tour
5. Ensure button only appears on `/`
