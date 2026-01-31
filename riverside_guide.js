<script>
    (function() {

    // 定义一个模块级变量，用于存储当前用户的组列表
    let currentUserGroups = [];

    // =================================================================
    // 1. 教程配置 (TOUR CONFIGURATION)
    // =================================================================
    const TOUR_CONFIG = {

    // --- 电脑端引导步骤 ---
    stepsDesktop: [
{
    popover: {
    title: '欢迎来到新论坛',
    description: '这是一个手动触发的引导教程，带你快速熟悉核心功能。'
}
},
{
    element: '#welcome-banner-search-input',
    popover: {
    title: '快速搜索',
    description: '直接在这里输入关键词，即可检索全站内容。'
}
},
{
    element: '.show-advanced-search',
    popover: {
    title: '高级筛选',
    description: '点击此图标可使用作者、时间等更精确的搜索条件。'
}
},
{
    element: '.category-drop',
    popover: {
    title: '按类别筛选',
    description: '点击这里按版块（如“一般”、“反馈”）筛选话题。'
}
},
{
    element: '.tag-drop',
    popover: {
    title: '按标签筛选',
    description: '通过标签快速过滤出你感兴趣的特定内容。'
}
},
{
    element: '#navigation-bar',
    popover: {
    title: '话题列表排序',
    description: '切换查看“最新”、“热门”或“未读”的帖子列表。'
}
},
{
    element: '#create-topic',
    popover: {
    title: '发帖',
    description: '点击这里发布新话题。'
}
},
{
    element: '.bulk-select',
    popover: {
    title: '批量操作',
    description: '开启批量选择模式，对多个话题进行统一管理。'
}
},
{
    element: '.topic-list-item .title',
    popover: {
    title: '阅读话题',
    description: '这是话题标题。点击即可进入详情页阅读。'
}
},
{
    element: '.topic-replies',
    popover: {
    title: '热度指标',
    description: '显示回复数量。数字越大，讨论越激烈。'
}
},
{
    element: '.topic-list-item .topic-activity-data',
    popover: {
    title: '最新动态',
    description: '显示最后回复的时间。点击可直接跳转到最新楼层。'
}
},
{
    element: '#current-user',
    popover: {
    title: '个人中心',
    description: '查看通知、书签、私信及个人设置。'
}
},
    // 聊天室步骤：增加了 requiresGroup 属性
{
    element: '[data-list-item-name="general"]',
    requiresGroup: 'verified_uestcer', // 仅 verified_uestcer 用户组可见
    popover: {
    title: '公共聊天室',
    description: '点击进入 General 频道，与其他用户实时互动。'
}
}
    ],

    // --- 手机端引导步骤 ---
    stepsMobile: [
{
    popover: {
    title: '欢迎 (手机版)',
    description: '这里是为手机用户定制的操作指南。'
}
},
{
    element: '#welcome-banner-search-input',
    popover: {
    title: '搜索',
    description: '在这里输入关键词搜索。'
}
},
{
    element: '#navigation-bar',
    popover: {
    title: '切换视图',
    description: '点击这里切换“最新”、“热门”帖子。'
}
},
{
    element: '#create-topic',
    popover: {
    title: '发帖',
    description: '点击这里发布新话题。'
}
},
{
    element: '#current-user',
    popover: {
    title: '个人中心',
    description: '点击头像查看消息和设置。'
}
}
    ]
};

    // =================================================================
    // 2. 核心逻辑 (CORE LOGIC)
    // =================================================================

    // --- 手动启动函数 ---
    window.startTour = function() {
    console.log("[Tour] Starting manual tour...");

    const driver = window.driver.js.driver;

    // 1. 智能路由检测
    const isHomePage = document.querySelector('#welcome-banner-search-input') || document.querySelector('.category-drop');

    if (!isHomePage) {
    // 跳转询问弹窗
    const redirectDriver = driver({
    showProgress: false,
    allowClose: true,
    overlayClick: true,
    animate: false,
    nextBtnText: '跳转回主页',
    prevBtnText: '取消',
    doneBtnText: '取消',
    steps: [
{
    popover: {
    title: '位置提示',
    description: '新手引导主要针对【论坛主页】的功能介绍。<br><br>当前页面无法演示所有步骤，是否跳转回主页？'
}
},
{
    element: 'body',
    popover: { title: '正在跳转...', description: '请稍候...' },
    onHighlightStarted: () => { window.location.href = "/"; }
}
    ]
});
    redirectDriver.drive();
    return;
}

    if (!document.querySelector('#create-topic')) {
    console.warn("[Tour] Warning: '#create-topic' not found.");
}

    // 2. 设备检测与配置加载
    const isMobile = window.innerWidth <= 600;
    let currentSteps = isMobile ? TOUR_CONFIG.stepsMobile : TOUR_CONFIG.stepsDesktop;

    // 3. 动态过滤：检查步骤是否需要特定用户组权限
    currentSteps = currentSteps.filter(step => {
    // 如果步骤定义了 requiresGroup，则检查当前用户是否属于该组
    if (step.requiresGroup) {
    const hasAccess = currentUserGroups.includes(step.requiresGroup);
    if (!hasAccess) {
    console.log(`[Tour] 跳过受限步骤: ${step.popover.title} (需要组: ${step.requiresGroup})`);
}
    return hasAccess;
}
    // 没有定义的步骤默认对所有人显示
    return true;
});

    console.log(`[Tour] Mode: ${isMobile ? 'Mobile' : 'Desktop'}, Steps: ${currentSteps.length}`);

    // 4. 启动引导
    const driverObj = driver({
    showProgress: true,
    allowClose: true,
    overlayClick: false,
    animate: !isMobile,
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '完成',
    steps: currentSteps
});

    try {
    driverObj.drive();
} catch (e) {
    console.error("[Tour] Failed to start:", e);
}
};


    // =================================================================
    // 3. 按钮初始化与权限检查 (BUTTON & PERMISSION)
    // =================================================================
    function initTourButton() {
    const DISMISS_KEY = 'discourse_tour_btn_hidden_permanent';
    const btn = document.getElementById('tour-trigger-btn');
    const closeBtn = document.getElementById('tour-btn-close');

    if (!btn || !closeBtn) return;

    // 绑定事件
    btn.addEventListener('click', () => window.startTour && window.startTour());
    closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.remove();
    // localStorage.setItem(DISMISS_KEY, 'true'); // 调试模式：暂不永久隐藏
    console.log("[Tour] 按钮已隐藏 (调试模式)");
});

    // 检查 LocalStorage
    if (localStorage.getItem(DISMISS_KEY)) {
    return;
}

    // 关键：调用 Discourse API 获取用户组 (仅用于步骤过滤，不影响按钮显示)
    try {
    const pluginApi = require('discourse/lib/plugin-api');
    pluginApi.withPluginApi('0.8', (api) => {
    const user = api.getCurrentUser();

    if (user && user.groups) {
    // 获取并保存当前用户的组列表，供 startTour 过滤使用
    currentUserGroups = user.groups.map(g => g.name);
    console.log("[Tour] 当前用户组:", currentUserGroups);
}

    // 不再检查 allowedGroups，直接显示按钮
    btn.style.display = 'flex';
});
} catch (e) {
    console.warn("[Tour] 无法加载 Discourse API，默认显示按钮:", e);
    btn.style.display = 'flex';
}
}

    // 页面加载后尝试初始化
    requestAnimationFrame(initTourButton);

    console.log("[Tour] Component loaded.");

})();
</script>

<style>
    /* 样式修正：电脑端按钮放大 */
    #tour-trigger-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 900;

    background-color: var(--tertiary);
    color: var(--secondary);

    align-items: center;
    gap: 10px;

    /* --- 电脑端：大尺寸样式 --- */
    padding: 14px 24px;
    font-size: 16px;
    /* -------------------------- */

    border-radius: 50px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.2s, box-shadow 0.2s;
}

    #tour-trigger-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
}

    #tour-trigger-btn svg {
    width: 1.2em;
    height: 1.2em;
    fill: currentColor;
}

    .tour-btn-close {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 22px;
    height: 22px;
    background: #e74c3c;
    color: white;
    border-radius: 50%;

    font-size: 18px;
    line-height: 20px;

    text-align: center;
    font-family: Arial, sans-serif;

    opacity: 0;
    transform: scale(0.5);
    pointer-events: none;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

    #tour-trigger-btn:hover .tour-btn-close {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
}

    .tour-btn-close:hover {
    background: #c0392b;
    transform: scale(1.2) !important;
}

    /* 手机端适配 */
    @media (max-width: 600px) {
    #tour-trigger-btn {
    bottom: 20px;
    right: 20px;
    padding: 8px 14px;
    font-size: 13px;
    gap: 6px;
}
    .tour-btn-close {
    width: 18px;
    height: 18px;
    font-size: 14px;
    line-height: 16px;
}
}

    /* Driver.js 样式修正 */
    .driver-overlay { z-index: 99990 !important; }
    .driver-popover { z-index: 99999 !important; }
    #driver-highlight-container { z-index: 99991 !important; }

    @media (min-width: 601px) {
    .driver-popover {
    max-width: 450px !important;
    padding: 24px !important;
    border-radius: 12px !important;
}
    .driver-popover-title {
    font-size: 20px !important;
    line-height: 1.5 !important;
    margin-bottom: 12px !important;
}
    .driver-popover-description {
    font-size: 16px !important;
    line-height: 1.6 !important;
}
    .driver-popover-footer button {
    font-size: 14px !important;
    padding: 8px 16px !important;
    border-radius: 6px !important;
}
}
</style>

<!-- 悬浮按钮 (纯 HTML 结构，逻辑已移至上方脚本) -->
<div id="tour-trigger-btn" style="display: none;" title="点击开始新手引导">
    <svg className="fa d-icon d-icon-graduation-cap svg-icon svg-string" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 512 512">
        <path
            d="M219.3 .5c3.1-.6 6.3-1.5 9.4-1.5H283.3c3.1 0 6.3 .9 9.4 1.5l177.5 35.5c24.2 4.8 41.8 26 41.8 50.7v58.7c0 14.5-10 27.2-23.9 30.2l-3.3 .7c-26.6 5.8-49.9 22.1-64.7 45.4l-11.4 17.8c-12.3 19.3-33.6 30.9-56.5 30.9H159.9c-22.9 0-44.2-11.6-56.5-30.9l-11.4-17.8c-14.8-23.2-38.1-39.6-64.7-45.4l-3.3-.7C10 172.5 0 159.8 0 145.3V86.7c0-24.7 17.6-45.8 41.8-50.7L219.3 .5zM448 375.4V448H64V375.4c17.1 2.3 32.7 10.9 43.6 24l9.6 11.5c4.7 5.6 11.6 8.9 18.9 8.9h239.7c7.3 0 14.2-3.3 18.9-8.9l9.6-11.5c10.9-13.1 26.5-21.7 43.6-24z"/>
    </svg>
    <span>新手教程</span>
    <div id="tour-btn-close" className="tour-btn-close" title="关闭且不再显示">×</div>
</div>