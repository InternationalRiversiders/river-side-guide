import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  // =================================================================
  // 1. 教程配置 (TOUR CONFIGURATION)
  // =================================================================
  const TOUR_CONFIG = {
    steps: [
      // --- 引导步骤 不配置device为通用device: 0) ---
      // 不配置 device：通用
      // device = 0：仅电脑端
      // device = 1：仅手机端
      {
        popover: {
          title: "欢迎来到 riverside",
          description: "本论坛的风格与你熟悉的“清水河畔”有着完全不同的界面风格与使用逻辑。本教程将带你快速熟悉<b>首页</b>的核心功能。",
        },
      },
      {
        device: 0,
        element: "#create-topic",
        popover: {
          title: "发帖",
          description: "点击这里发布新话题。",
        },
      },
      {
        device: 1,
        element: "#toggle-hamburger-menu",
        popover: {
          title: "导航侧栏",
          description: "点击这里展开社区导航栏。",
        },
        onHighlighted: (element) => {
          const target = element || document.querySelector("#toggle-hamburger-menu");
          if (target) {
            target.dispatchEvent(
              new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
              })
            );
          }
        },
      },
      {
        element: '[data-section-name="community"]',
        popover: {
          title: "社区导航",
          description: "这里包含了<b>所有话题</b>、<b>我的消息</b>、<b>我的帖子</b>等常用入口。",
        },
      },
      {
        element: '[data-section-name="categories"]',
        popover: {
          title: "版块列表",
          description:
            "这里列出了论坛的所有版块。点击展开或折叠，快速跳转到你感兴趣的分区。<br><br><span style='color:#E45735; font-weight:bold;'>你可以点击右上角的按钮来自定义显示的版块。</span>",
        },
      },
      {
        element: '[data-section-name="chat-channels"]',
        popover: {
          title: "公共聊天室",
          description:
            "<div style='margin-bottom:6px;'><b>校友广场</b>：可以与论坛中的同学与校友实时互动。</div>" +
            "<div><b>二手交流</b>：二手交流信息、优惠券红包码，均在这里分享。</div>",
        },
      },
      {
        device: 1,
        element: "#search-button",
        popover: {
          title: "搜索",
          description: "点击进入搜索界面，可搜索全站内容",
        },
        onHighlighted: () => {
          const toggle = document.querySelector("#toggle-hamburger-menu");
          if (toggle) {
            toggle.dispatchEvent(
              new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
              })
            );
          }
        },
      },
      {
        device: 0,
        element: "#welcome-banner-search-input",
        popover: {
          title: "快速搜索",
          description: "直接在这里输入关键词，即可检索全站内容。",
        },
        onHighlighted: () => {
          const toggle = document.querySelector("#toggle-hamburger-menu");
          if (toggle) {
            toggle.dispatchEvent(
              new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
              })
            );
          }
        },
      },
      {
        device: 0,
        element: ".show-advanced-search",
        popover: {
          title: "高级搜索",
          description:
            "点击此图标进入<b>高级搜索</b>，可以根据 <b style='color:#0088CC'>分类</b>、<b style='color:#0088CC'>话题</b>、<b style='color:#0088CC'>标签</b>、<b style='color:#0088CC'>发帖人</b> 等条件进行精确搜索。",
        },
      },
      {
        device: 0,
        element: "#navigation-bar",
        popover: {
          title: "话题列表排序",
          description:
            "<div style='margin-bottom:8px;'><b style='color:#25AAE2; font-size:15px;'>最新发表</b><br>按发布时间排序，展示全站<b>最新创建的主题</b>。适合希望第一时间获取新鲜资讯的用户。</div>" +
            "<div style='margin-bottom:8px;'><b style='color:#25AAE2; font-size:15px;'>最新回复</b><br>按最后回复时间排序，显示<b>最近被活跃讨论的主题</b>。</div>" +
            "<div style='margin-bottom:8px;'><b style='color:#25AAE2; font-size:15px;'>未读 / 未读话题</b><br>• <b>未读话题</b>：您尚未浏览过的主题。<br>• <b>未读</b>：您已看过但<b>有新回复</b>的主题。</div>" +
            "<div><b style='color:#25AAE2; font-size:15px;'>热门 / 排行榜</b><br>基于浏览量、回复数筛选的高热度内容。</div>",
        },
      },
      {
        device: 0,
        element: ".category-drop",
        popover: {
          title: "按类别筛选",
          description: "点击这里按版块筛选话题。",
        },
      },
      {
        device: 0,
        element: ".tag-drop",
        popover: {
          title: "按标签筛选",
          description:
            "通过标签快速过滤出你感兴趣的特定内容。<br><span style='color:#E45735; font-weight:bold;'>选择“精华”标签，即可筛选出所有“精华”内容！</span>",
        },
      },
      {
        element: ".topic-list-item .title",
        popover: {
          title: "话题标题",
          description:
            "这是话题标题。点击<b>标题</b>以及周边空白区域即可进入详情页浏览帖子内容。",
        },
      },
      {
        element: ".topic-replies",
        popover: {
          title: "回复数",
          description: "这是该话题收到的<b>回帖数</b>。",
        },
      },
      {
        element: ".topic-list-item .topic-activity-data",
        popover: {
          title: "最新回复用户",
          description: "这是最新回复该话题的用户名以及回复时间。",
        },
      },
      {
        element: ".chat-header-icon",
        popover: {
          title: "聊天消息",
          description:
            "这里会显示你的聊天通知。点击可以快速打开聊天弹窗或全屏聊天窗口。",
        },
      },
      {
        element: "#current-user",
        popover: {
          title: "个人中心",
          description:
            "点击这里可以查看通知、私信和书签。<br><br><b style='color:#E45735;'>点击“下一步”，我们将自动为您打开菜单并介绍详细功能。</b>",
        },
        onHighlighted: (element) => {
          const target =
            element &&
            (element.querySelector("button, a, .header-dropdown-toggle") ||
              element);
          if (target) {
            target.dispatchEvent(
              new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
              })
            );
          }
        },
      },
      {
        element: "#user-menu-button-all-notifications",
        popover: {
          title: "所有通知",
          description:
            "这是您的<b style='color:#e67e22;'>消息总览</b>。<br>收到的点赞、被引用、系统通知都会汇总在这里。",
        },
      },
      {
        element: "#user-menu-button-replies",
        popover: {
          title: "回复通知",
          description:
            "专门显示<b style='color:#00a65a;'>别人对您的回复</b>。<br>想知道谁在和您对话？看这里就对了。",
        },
      },
      {
        element: "#user-menu-button-messages",
        popover: {
          title: "私信",
          description:
            "这是您的<b style='color:#0088cc;'>私人信箱</b>。<br>用于查看用户间的私聊消息以及机器人发送的通知。",
        },
      },
      {
        element: "#user-menu-button-bookmarks",
        popover: {
          title: "书签收藏",
          description:
            "您收藏的帖子都在这儿。<br>遇到好内容来不及看？点击帖子下方的<b>书签图标</b>，稍后在这里阅读。",
        },
      },
      {
        element: "#user-menu-button-chat-notifications",
        popover: {
          title: "聊天通知",
          description:
            "显示来自<b style='color:#9b59b6;'>公共频道</b>或<b style='color:#9b59b6;'>私聊频道</b>的即时消息提醒。",
        },
      },
      {
        element: "#user-menu-button-other-notifications",
        popover: {
          title: "其他通知",
          description:
            "<div>获得勋章、被邀请加入话题等低频通知会归类到这里。</div>",
        },
      },
      {
        element: "#user-menu-button-profile",
        popover: {
          title: "个人资料",
          description:
            "点击进入您的<b style='color:#2c3e50;'>个人主页</b>。<br>您可以在这里修改头像、更改密码、调整<b style='color:#2980b9;'>偏好设置</b>或查看您的发帖记录。",
        },
      },
      {
        element: "#tour-trigger-btn",
        popover: {
          title: "恭喜你完成首页引导！",
          description: "你可以进入任意帖子或者个人主页，再次点击本按钮进入引导。",
        },
        onHighlighted: () => {
          const container = document.querySelector("#current-user");
          if (!container) return;
          const target =
            container.querySelector("button, a, .header-dropdown-toggle") ||
            container;
          target.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window,
            })
          );
        },
      },
    ],
  };

  // --- 手动启动函数 ---
  function startTour() {
    if (!window.driver || !window.driver.js || !window.driver.js.driver) {
      console.warn("[Tour] Driver.js 未加载");
      return;
    }

    console.log("[Tour] Starting manual tour...");

    const driver = window.driver.js.driver;

    // 1. 获取当前域名并拼接目标 URL
    const baseUrl = window.location.origin;

    const { pathname } = window.location;
    const isHomePage = pathname === "/";
    const isTopicPage = /^\/t\/[^/]+\/\d+/.test(pathname);

    if (isTopicPage) {
      alert("帖子页面引导即将上线");
      return;
    }

    if (!isHomePage) {
      console.warn("[Tour] 当前页面不是首页，已跳过首页引导。");
      return;
    }

    if (!document.querySelector("#create-topic")) {
      console.warn("[Tour] Warning: '#create-topic' not found.");
    }

    // 3. 设备检测与配置加载
    const isMobile = window.innerWidth <= 600;
    const currentSteps = TOUR_CONFIG.steps.filter((step) => {
      if (step.device === 0) return !isMobile;
      if (step.device === 1) return isMobile;
      return true;
    });

    console.log(
      `[Tour] Mode: ${isMobile ? "Mobile" : "Desktop"}, Steps: ${currentSteps.length}`
    );

    // 5. 启动引导
    const driverObj = driver({
      showProgress: true,
      progressText: "第 {{current}} / {{total}} 步",
      allowClose: true,
      popoverClass: "tour-popover",
      animate: true,
      showButtons: ["next", "previous", "close"],
      nextBtnText: "下一步",
      prevBtnText: "上一步",
      doneBtnText: "完成",
      steps: currentSteps,
      onDestroyStarted: () => {
        if (!driverObj.hasNextStep() || confirm("仍有未查看的引导流程，确定要退出引导吗？")) {
          driverObj.destroy();
        }
      }
    });

    try {
      driverObj.drive();
    } catch (e) {
      console.error("[Tour] Failed to start:", e);
    }
  }

  window.startTour = startTour;

  // =================================================================
  // 3. 按钮初始化与权限检查 (BUTTON & PERMISSION)
  // =================================================================
  function initTourButton() {
    const DISMISS_KEY = "discourse_tour_btn_hidden_permanent";
    const btn = document.getElementById("tour-trigger-btn");
    const closeBtn = document.getElementById("tour-btn-close");

    if (!btn || !closeBtn) return;

    // 绑定事件 (防止重复绑定，先移除再添加)
    const startHandler = () => window.startTour && window.startTour();
    btn.removeEventListener("click", startHandler); // 简易防抖，实际场景直接覆盖即可
    btn.onclick = startHandler;

    closeBtn.onclick = (e) => {
      e.stopPropagation();
      btn.remove();
      // localStorage.setItem(DISMISS_KEY, 'true');
      console.log("[Tour] 按钮已隐藏 (调试模式)");
    };

    if (localStorage.getItem(DISMISS_KEY)) {
      return;
    }

    // 使用 onPageChange 确保在路由跳转后按钮依然显示
    api.onPageChange(() => {
      const existingBtn = document.getElementById("tour-trigger-btn");
      if (existingBtn) existingBtn.style.display = "flex";
    });

    btn.style.display = "flex";
  }

  requestAnimationFrame(initTourButton);

  console.log("[Tour] Component loaded.");
});
