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
    // =================================================================

    window.startTour = function() {
    console.log("[Tour] Starting manual tour...");

    const driver = window.driver.js.driver;

    // 1. 智能路由检测：判断当前是否适合运行教程
    // 只要找不到核心元素（例如大搜索框或分类），就认为不在主页
    const isHomePage = document.querySelector('#welcome-banner-search-input') || document.querySelector('.category-drop');

    if (!isHomePage) {
    // --- 🆕 风格统一的“确认弹窗” ---
    // 我们创建一个临时的 Driver 实例，专门用来做跳转询问
    const redirectDriver = driver({
    showProgress: false,    // 不显示 "1/2" 进度
    allowClose: true,       // 允许点击 X 关闭
    overlayClick: true,     // 允许点击背景关闭（相当于取消）
    animate: false,

    // 巧妙的按钮文案配置
    nextBtnText: '跳转回主页',  // 把“下一步”伪装成“确认按钮”
    prevBtnText: '取消',       // 第一步通常不显示上一步，这里只是占位
    doneBtnText: '取消',       // 兜底

    steps: [
    // [步骤 1]：询问卡片
{
    // 不指定 element，让它居中显示
    popover: {
    title: '⚠️ 位置提示',
    description: '新手引导主要针对【论坛主页】的功能介绍。<br><br>当前页面无法演示所有步骤，是否跳转回主页？'
}
},
    // [步骤 2]：执行逻辑 (陷阱步骤)
    // 用户只有点击了“跳转回主页”，才会进入这个步骤，进而触发跳转代码
{
    element: 'body', // 随便绑个元素，防止报错
    popover: { title: '正在跳转...', description: '请稍候...' },

    // 关键：一旦进入这一步，立即执行跳转
    onHighlightStarted: () => {
    window.location.href = "/";
}
}
    ]
});

    redirectDriver.drive();
    return; // 停止执行后面的主教程
}

    // 2. 正常启动主教程 (如果在主页)
    // 检查关键元素是否存在 (防止报错)
    if (!document.querySelector('#create-topic')) {
    console.warn("[Tour] Warning: '#create-topic' not found.");
}

    const driverObj = driver({
    showProgress: true,
    allowClose: true,
    overlayClick: false,
    animate: false,
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