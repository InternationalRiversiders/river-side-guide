<script>
    (function() {

    // =================================================================
    // 1. 教程配置 (TOUR CONFIGURATION)
    //在此处添加或调整引导步骤
    // =================================================================
    const TOUR_CONFIG = {
    steps: [
    // --- 欢迎页 ---
{
    popover: {
    title: '👋 欢迎来到新论坛',
    description: '这是一个手动触发的引导教程，带你快速熟悉核心功能。'
}
},

    // --- 顶部搜索区域 ---
{
    element: '#welcome-banner-search-input', // 首页横幅大搜索框
    popover: {
    title: '🔍 快速搜索',
    description: '直接在这里输入关键词，即可检索全站内容。'
}
},
{
    element: '.show-advanced-search', // 高级搜索图标
    popover: {
    title: '🎛️ 高级筛选',
    description: '点击此图标可使用作者、时间等更精确的搜索条件。'
}
},

    // --- 列表筛选与导航 ---
{
    element: '.category-drop', // 分类下拉框
    popover: {
    title: '📂 按类别筛选',
    description: '点击这里按版块（如“一般”、“反馈”）筛选话题。'
}
},
{
    element: '.tag-drop', // 标签下拉框
    popover: {
    title: '🏷️ 按标签筛选',
    description: '通过标签快速过滤出你感兴趣的特定内容。'
}
},
{
    element: '#navigation-bar', // 列表排序 (最新/热门)
    popover: {
    title: '🧭 话题列表排序',
    description: '切换查看“最新”、“热门”或“未读”的帖子列表。'
}
},

    // --- 核心操作 ---
{
    element: '#create-topic', // 侧边栏发帖按钮
    popover: {
    title: '✍️ 发帖',
    description: '点击这里发布新话题。'
}
},
{
    element: '.bulk-select', // 批量操作按钮
    popover: {
    title: '☑️ 批量操作',
    description: '开启批量选择模式，对多个话题进行统一管理。'
}
},

    // --- 话题列表内容解读 ---
{
    element: '.topic-list-item .title', // 列表第一项标题
    popover: {
    title: '📃 阅读话题',
    description: '这是话题标题。点击即可进入详情页阅读。'
}
},
{
    element: '.topic-replies', // 回复数统计
    popover: {
    title: '💬 热度指标',
    description: '显示回复数量。数字越大，讨论越激烈。'
}
},
{
    element: '.topic-list-item .topic-activity-data', // 最后活跃时间
    popover: {
    title: '⏱️ 最新动态',
    description: '显示最后回复的时间。点击可直接跳转到最新楼层。'
}
},

    // --- 用户与侧边栏 ---
{
    element: '#current-user', // 顶部头像
    popover: {
    title: '👤 个人中心',
    description: '查看通知、书签、私信及个人设置。'
}
},
{
    element: '[data-list-item-name="general"]', // 侧边栏聊天室
    popover: {
    title: '💬 公共聊天室',
    description: '点击进入 General 频道，与其他用户实时互动。'
}
}
    ]
};

    // =================================================================
    // 2. 核心逻辑 (CORE LOGIC)
    // 负责初始化 Driver.js 并处理兼容性问题
    // =================================================================

    // 暴露全局函数 window.startTour() 供外部调用
    window.startTour = function() {
    console.log("[Tour] Starting manual tour...");

    const driver = window.driver.js.driver;

    // 容错处理：确保关键元素存在，避免报错
    if (!document.querySelector('#create-topic')) {
    console.warn("[Tour] Warning: '#create-topic' not found. Tour may display incorrectly.");
}

    // 初始化 Driver 实例
    const driverObj = driver({
    showProgress: true,     // 显示步骤进度 (1/13)
    allowClose: true,       // 允许用户中途退出
    overlayClick: false,    // 禁止点击遮罩层关闭 (防止误触)
    animate: false,         // 关闭动画以解决固定定位元素的偏移问题
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '完成',
    steps: TOUR_CONFIG.steps
});

    try {
    driverObj.drive();
} catch (e) {
    console.error("[Tour] Failed to start:", e);
}
};

    console.log("[Tour] Component loaded. Run window.startTour() to start.");

})();
</script>

<style>
    /* * =================================================================
    * 3. 样式修正 (STYLE FIXES)
    * 解决 Driver.js 遮罩层与 Discourse 侧边栏/顶部导航的层级冲突
    * =================================================================
    */

    /* 遮罩层 (Overlay) */
    .driver-overlay {
    z-index: 99990 !important;
}

    /* 气泡说明框 (Popover) */
    .driver-popover {
    z-index: 99999 !important;
}

    /* 高亮元素容器 */
    #driver-highlight-container {
    z-index: 99991 !important;
}
</style>