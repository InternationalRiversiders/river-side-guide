# 安装

运行以下任意一个命令来安装driver.js：

```bash
# Using npm
    npm install driver.js
    
    # Using pnpm
    pnpm install driver.js
    
    # Using yarn
    yarn add driver.js
```

或者，您可以使用CDN并在HTML文件中包含脚本：

```html
<script src="https://cdn.jsdelivr.net/npm/driver.js@1.0.1/dist/driver.js.iife.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@1.0.1/dist/driver.css"/>
```

## 开始使用

安装完成后，您可以在项目中导入该包。以下示例展示了如何高亮一个元素：

```js
import { driver } from "driver.js";
    import "driver.js/dist/driver.css";
    
    const driverObj = driver();
    driverObj.highlight({
      element: "#some-element",
      popover: {
        title: "Title",
        description: "Description"
      }
    });
```

## 关于CDN的注意事项

如果您正在使用CDN，您将需要从`window`对象中使用该包：

```js
const driver = window.driver.js.driver;
    
    const driverObj = driver();
    
    driverObj.highlight({
      element: "#some-element",
      popover: {
        title: "Title",
        description: "Description"
      }
    });
```

# 基本用法

安装完成后，您可以导入并开始使用该库。有多种不同的配置选项可用于自定义该库。您可以在配置部分找到更多关于选项的详细信息。以下是基本的入门步骤。

这是一个创建具有多个步骤的导览的简单示例。

## 基本导览示例

```js
import { driver } from "driver.js";
    import "driver.js/dist/driver.css";
    
    const driverObj = driver({
      showProgress: true,
      steps: [
        { element: '.page-header', popover: { title: 'Title', description: 'Description' } },
        { element: '.top-nav', popover: { title: 'Title', description: 'Description' } },
        { element: '.sidebar', popover: { title: 'Title', description: 'Description' } },
        { element: '.footer', popover: { title: 'Title', description: 'Description' } },
      ]
    });
    
    driverObj.drive();
```

您可以将单个步骤配置传递给`highlight`方法来高亮单个元素。下面是一个简单的示例，展示如何高亮单个元素。

## 高亮一个简单元素

```js
import { driver } from "driver.js";
    import "driver.js/dist/driver.css";
    
    const driverObj = driver();
    driverObj.highlight({
      element: '#some-element',
      popover: {
        title: 'Title for the Popover',
        description: 'Description for it',
      },
    });
```

传递给`highlight`方法的相同配置可以用于创建导览。下面是一个简单的示例，展示如何创建一个具有单个步骤的导览。

上面的示例展示了库的基本用法。您可以在配置部分找到更多关于配置选项的详细信息，以及在示例部分找到示例。

# 配置

Driver.js旨在具有高度可配置性。您可以全局配置driver，也可以按步骤配置。您还可以在driver运行时实时配置它。

> Driver.js是用TypeScript编写的。配置选项大多数都是自解释的。此外，如果您使用的是像WebStorm或VSCode这样的IDE，您将获得所有配置选项的自动补全和文档提示。

## Driver配置

您可以通过将配置对象传递给`driver`方法或使用`setConfig`方法来全局配置它。以下是一些可用的配置选项。

```ts
type Config = {
      // Array of steps to highlight. You should pass
      // this when you want to setup a product tour.
      steps?: DriveStep[];
    
      // Whether to animate the product tour. (default: true)
      animate?: boolean;
      // Overlay color. (default: black)
      // This is useful when you have a dark background
      // and want to highlight elements with a light
      // background color.
      overlayColor?: string;
      // Whether to smooth scroll to the highlighted element. (default: false)
      smoothScroll?: boolean;
      // Whether to allow closing the popover by clicking on the backdrop. (default: true)
      allowClose?: boolean;
      // Opacity of the backdrop. (default: 0.5)
      overlayOpacity?: number;
      // Distance between the highlighted element and the cutout. (default: 10)
      stagePadding?: number;
      // Radius of the cutout around the highlighted element. (default: 5)
      stageRadius?: number;
    
      // Whether to allow keyboard navigation. (default: true)
      allowKeyboardControl?: boolean;
    
      // Whether to disable interaction with the highlighted element. (default: false)
      disableActiveInteraction?: boolean;
    
      // If you want to add custom class to the popover
      popoverClass?: string;
      // Distance between the popover and the highlighted element. (default: 10)
      popoverOffset?: number;
      // Array of buttons to show in the popover. Defaults to ["next", "previous", "close"]
      // for product tours and [] for single element highlighting.
      showButtons?: AllowedButtons[];
      // Array of buttons to disable. This is useful when you want to show some of the
      // buttons, but disable some of them.
      disableButtons?: AllowedButtons[];
    
      // Whether to show the progress text in popover. (default: false)
      showProgress?: boolean;
      // Template for the progress text. You can use the following placeholders in the template:
      //  - {{current}}: The current step number
      //  - {{total}}: Total number of steps
      progressText?: string;
    
      // Text to show in the buttons. `doneBtnText`
      // is used on the last step of a tour.
      nextBtnText?: string;
      prevBtnText?: string;
      doneBtnText?: string;
    
      // Called after the popover is rendered.
      // PopoverDOM is an object with references to
      // the popover DOM elements such as buttons
      // title, descriptions, body, container etc.
      onPopoverRender?: (popover: PopoverDOM, options: { config: Config; state: State }) => void;
    
      // Hooks to run before and after highlighting
      // each step. Each hook receives the following
      // parameters:
      //   - element: The target DOM element of the step
      //   - step: The step object configured for the step
      //   - options.config: The current configuration options
      //   - options.state: The current state of the driver
      onHighlightStarted?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void;;
      onHighlighted?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void;;
      onDeselected?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void;;
    
      // Hooks to run before and after the driver
      // is destroyed. Each hook receives
      // the following parameters:
      //   - element: Currently active element
      //   - step: The step object configured for the currently active
      //   - options.config: The current configuration options
      //   - options.state: The current state of the driver
      onDestroyStarted?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void;;
      onDestroyed?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void;;
    
      // Hooks to run on button clicks. Each hook receives
      // the following parameters:
      //   - element: The current DOM element of the step
      //   - step: The step object configured for the step
      //   - options.config: The current configuration options
      //   - options.state: The current state of the driver
      onNextClick?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void;;
      onPrevClick?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void;;
      onCloseClick?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void;;
    };
```

> 注意：通过覆盖`onNextClick`和`onPrevClick`钩子，您可以控制driver的导航。这意味着用户将无法使用按钮进行导航，您将不得不调用`driverObj.moveNext()`或`driverObj.movePrevious()`来导航到下一个/上一个步骤。
> 您可以使用此功能来实现自定义逻辑以在步骤之间导航。当您处理动态内容并希望根据某些逻辑高亮显示下一个/上一个元素时，这也很有用。
> `onNextClick`和`onPrevClick`钩子也可以在步骤级别进行配置。在driver级别进行配置时，您控制所有步骤的导航。在步骤级别进行配置时，您只控制特定步骤的导航。

## 弹出框配置

弹出框是Driver.js的主要UI元素。它是突出显示目标元素并显示步骤内容的元素。您可以全局配置弹出框，也可以按步骤配置。以下是一些可用的配置选项。

```ts
type Popover = {
      // Title and descriptions shown in the popover.
      // You can use HTML in these. Also, you can
      // omit one of these to show only the other.
      title?: string;
      description?: string;
    
      // The position and alignment of the popover
      // relative to the target element.
      side?: "top" | "right" | "bottom" | "left";
      align?: "start" | "center" | "end";
    
      // Array of buttons to show in the popover.
      // When highlighting a single element, there
      // are no buttons by default. When showing
      // a tour, the default buttons are "next",
      // "previous" and "close".
      showButtons?: ("next" | "previous" | "close")[];
      // An array of buttons to disable. This is
      // useful when you want to show some of the
      // buttons, but disable some of them.
      disableButtons?: ("next" | "previous" | "close")[];
    
      // Text to show in the buttons. `doneBtnText`
      // is used on the last step of a tour.
      nextBtnText?: string;
      prevBtnText?: string;
      doneBtnText?: string;
    
      // Whether to show the progress text in popover.
      showProgress?: boolean;
      // Template for the progress text. You can use
      // the following placeholders in the template:
      //   - {{current}}: The current step number
      //   - {{total}}: Total number of steps
      // Defaults to following if `showProgress` is true:
      //   - "{{current}} of {{total}}"
      progressText?: string;
    
      // Custom class to add to the popover element.
      // This can be used to style the popover.
      popoverClass?: string;
    
      // Hook to run after the popover is rendered.
      // You can modify the popover element here.
      // Parameter is an object with references to
      // the popover DOM elements such as buttons
      // title, descriptions, body, etc.
      onPopoverRender?: (popover: PopoverDOM, options: { config: Config; state: State }) => void;
    
      // Callbacks for button clicks. You can use
      // these to add custom behavior to the buttons.
      // Each callback receives the following parameters:
      //   - element: The current DOM element of the step
      //   - step: The step object configured for the step
      //   - options.config: The current configuration options
      //   - options.state: The current state of the driver
      onNextClick?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void
      onPrevClick?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void
      onCloseClick?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void
    }
步骤配置
步骤配置是传递给`highlight`方法或`drive`方法的`steps`数组的配置对象。您可以为每个步骤配置弹出框和目标元素。以下是一些可用的配置选项。

type DriveStep = {
      // The target element to highlight.
      // This can be a DOM element, or a CSS selector.
      // If this is a selector, the first matching
      // element will be highlighted.
      element: Element | string;
    
      // The popover configuration for this step.
      // Look at the Popover Configuration section
      popover?: Popover;
    
      // Callback when the current step is deselected,
      // about to be highlighted or highlighted.
      // Each callback receives the following parameters:
      //   - element: The current DOM element of the step
      //   - step: The step object configured for the step
      //   - options.config: The current configuration options
      //   - options.state: The current state of the driver
      onDeselected?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void;
      onHighlightStarted?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void;
      onHighlighted?: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => void;
    }
```

## 状态

您可以通过调用`getState`方法来访问driver的当前状态。它也会传递给钩子和回调函数。

```ts
type State = {
      // Whether the driver is currently active or not
      isInitialized?: boolean;
    
      // Index of the currently active step if using
      // as a product tour and have configured the
      // steps array.
      activeIndex?: number;
      // DOM element of the currently active step
      activeElement?: Element;
      // Step object of the currently active step
      activeStep?: DriveStep;
    
      // DOM element that was previously active
      previousElement?: Element;
      // Step object of the previously active step
      previousStep?: DriveStep;
    
      // DOM elements for the popover i.e. including
      // container, title, description, buttons etc.
      popover?: PopoverDOM;
    }
```

# API 参考

这是初始化driver后，driver提供的方法列表。

> **注意**：为了简洁起见，我们省略了配置选项。请查看配置部分以获取选项。下面的描述中提供了链接。

```js
import { driver } from "driver.js";
    import "driver.js/dist/driver.css";
    
    // Look at the configuration section for the options
    // https://driverjs.cn/docs/configuration#driver-configuration
    const driverObj = driver({ /* ... */ });
    
    // --------------------------------------------------
    // driverObj is an object with the following methods
    // --------------------------------------------------
    
    // Start the tour using `steps` given in the configuration
    driverObj.drive();  // Starts at step 0
    driverObj.drive(4); // Starts at step 4
    
    driverObj.moveNext(); // Move to the next step
    driverObj.movePrevious(); // Move to the previous step
    driverObj.moveTo(4); // Move to the step 4
    driverObj.hasNextStep(); // Is there a next step
    driverObj.hasPreviousStep() // Is there a previous step
    
    driverObj.isFirstStep(); // Is the current step the first step
    driverObj.isLastStep(); // Is the current step the last step
    
    driverObj.getActiveIndex(); // Gets the active step index
    
    driverObj.getActiveStep(); // Gets the active step configuration
    driverObj.getPreviousStep(); // Gets the previous step configuration
    driverObj.getActiveElement(); // Gets the active HTML element
    driverObj.getPreviousElement(); // Gets the previous HTML element
    
    // Is the tour or highlight currently active
    driverObj.isActive();
    
    // Recalculate and redraw the highlight
    driverObj.refresh();
    
    // Look at the configuration section for configuration options
    // https://driverjs.cn/docs/configuration#driver-configuration
    driverObj.getConfig();
    driverObj.setConfig({ /* ... */ });
    
    driverObj.setSteps([ /* ... */ ]); // Set the steps
    
    // Look at the state section of configuration for format of the state
    // https://driverjs.cn/docs/configuration#state
    driverObj.getState();
    
    // Look at the DriveStep section of configuration for format of the step
    // https://driverjs.cn/docs/configuration/#driver-step-configuration
    driverObj.highlight({ /* ... */ }); // Highlight an element
    
    driverObj.destroy(); // Destroy the tour
```

# 定制主题

您可以通过为弹出框添加自定义类或对driver.js使用的不同类应用CSS来自定义driver的外观和动作。

## 弹出框样式定制

您可以在全局的driver配置中设置`popoverClass`选项，或者在步骤级别设置弹出框的自定义类，然后使用CSS来修改样式。

```js
const driverObj = driver({
      popoverClass: 'my-custom-popover-class'
    });
    
    // or you can also have different classes for different steps
    const driverObj2 = driver({
      steps: [
        {
          element: '#some-element',
          popover: {
            title: 'Title',
            description: 'Description',
            popoverClass: 'my-custom-popover-class'
          }
        }
      ],
    })
```

以下是应用于弹出框的类列表，您可以结合`popoverClass`选项使用这些类来为弹出框应用自定义样式。

```css
/* Class assigned to popover wrapper */
    .driver-popover {}
    
    /* Arrow pointing towards the highlighted element */
    .driver-popover-arrow {}
    
    /* Title and description */
    .driver-popover-title {}
    .driver-popover-description {}
    
    /* Close button displayed on the top right corner */
    .driver-popover-close-btn {}
    
    /* Footer of the popover displaying progress and navigation buttons */
    .driver-popover-footer {}
    .driver-popover-progress-text {}
    .driver-popover-prev-btn {}
    .driver-popover-next-btn {}
```

## 修改弹出框DOM

另外，您还可以使用`onPopoverRender`钩子，在弹出框显示之前修改弹出框的DOM。该钩子以弹出框DOM作为第一个参数被调用。

```ts
type PopoverDOM = {
      wrapper: HTMLElement;
      arrow: HTMLElement;
      title: HTMLElement;
      description: HTMLElement;
      footer: HTMLElement;
      progress: HTMLElement;
      previousButton: HTMLElement;
      nextButton: HTMLElement;
      closeButton: HTMLElement;
      footerButtons: HTMLElement;
    };
    
    onPopoverRender?: (popover: PopoverDOM, opts: { config: Config; state: State }) => void;
```

## 页面样式定制

当driver处于活动状态时，以下类将应用于页面。

```css
/* Applied to the `body` when the driver: */
    .driver-active {}  /* is active */
    .driver-fade {}    /* is animated */
    .driver-simple {}  /* is not animated */
```

以下类将应用于覆盖层，即显示在页面上的光箱。

```css
.driver-overlay {}
```

## 高亮元素样式定制

每当一个元素被高亮时，以下类将被应用于它。

```css
.driver-active-element {}
```