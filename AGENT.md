# Riverside Guide Discourse Component

## Purpose
- Provide a guided tour on the Discourse home page and topic page using Driver.js.
- Expose a floating “新手教程” button that triggers the tour.

## Key Files
- `riverside_guide.component.js`: Theme component JS. Contains the embedded Driver.js IIFE and all tour logic.
- `riverside_guide.css`: Theme component CSS. Contains embedded `driver.css` plus custom button/popover styles.
- `riverside_guide.footer.html`: Injects the floating button markup.
- `riverside_guide.head.html`: Notes that no external assets are required.
- `dist/`: Upstream Driver.js build outputs (use as source when updating embedded assets).
- `driver.js的API文档.md`: Driver.js reference (Chinese).

## Runtime Behavior
- Two configs: `HOME_TOUR_CONFIG` and `TOPIC_TOUR_CONFIG`.
- Step filter: `device = 0` (desktop only), `device = 1` (mobile only), omit for both.
- `startTour()` chooses config by path (`/` or `/t/...`) and filters by `window.innerWidth <= 600`.
- Finishing home tour sets `sessionStorage["riverside_guide_pending_tour"]="topic"` and routes to `/t/{TOPIC_TARGET_ID}`.
- `startTopicTourIfPending()` waits for `#topic-title` then starts the topic tour.
- The tour button only shows on the home page; the close button currently just removes the node (the localStorage dismissal is commented out).

## Editing Guidance
- Updating Driver.js assets: copy minified content from `dist/driver.js.iife.js` and `dist/driver.css`
  into the embedded sections at the top of `riverside_guide.component.js` and `riverside_guide.css`.
  Keep the wrapper (`__driverGlobal` check) intact.
- When adding steps, ensure selectors exist on both desktop/mobile; use `device` to guard.
- Avoid direct DOM access before render; prefer `requestAnimationFrame` or `waitForElement`.
- Keep Discourse APIs (`apiInitializer`, `api.onPageChange`, `DiscourseURL.routeTo`) intact.

## Manual Verification
- Enable the component and click “新手教程” on home page.
- Verify step flow on desktop and on mobile width (<= 600px).
- Confirm home tour completion routes to `/t/{TOPIC_TARGET_ID}` and triggers the topic tour.
- Ensure the tour button only appears on `/`.
