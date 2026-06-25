# animal-island-ui-taro-port

> 💡 **致谢与声明**  
> 本项目是 [guokaigdg/animal-island-ui](https://github.com/guokaigdg/animal-island-ui)（原 React Web 版）的**多端小程序移植版本**。  
> - 核心的视觉设计、像素动画及创意均归原作者 **@guokaigdg** 所有。  
> - 本项目仅使用 Taro + React 进行小程序的生态适配与重构，方便小程序开发者使用。  
> - 鉴于原作者意愿，本项目**严格禁止任何商业用途**。

## 项目简介

本仓库是将 `animal-island-ui` 移植到小程序生态的 Spike 验证项目，目标不是一次性完成全量迁移，而是先验证双线方案是否成立，再分批补齐低风险组件。
Demo页：https://gospelion.github.io/animal-island-ui-taro-port

当前采用两条产物线并行：

- `packages/taro-ui`：面向 Taro 开发者的 React + Taro 组件库。
- `packages/weapp-native`：面向纯微信小程序开发者的原生组件库。

微信原生组件库**不依赖 Taro 反向编译**。Taro 编译产物后续可以作为参考或辅助实验，但不是原生组件库的架构基础。

## 已迁移组件范围

Spike v0 已验证 5 个代表组件：

- `Button`
- `Card`
- `Icon`
- `Input`
- `Modal`

下一批低风险组件已完成双线实现：

- `Switch`
- `Checkbox`
- `Radio`
- `Title`
- `Divider`
- `Collapse`
- `CodeBlock`
- `Table`

Taro 线额外已完成：

- `Typewriter`

以下组件暂不进入当前批次：

- `Select`：需要单独比较原生 `picker` 与自绘弹层方案。
- `Loading`：后续会定义为“小程序专用轻动画组件”，不承诺复刻 Web 版 GSAP/MotionPath 动效。
- `Tooltip`、`Form`：暂不迁移。

## API 原则

本项目优先保证视觉风格一致，API 不强求两条产物线完全同名。

- Taro 线使用 React 习惯：`children`、`onClick`、`className`、`style`。
- 微信原生线使用小程序习惯：`slot`、`bind:tap`、`custom-class`、`custom-style`。
- Taro CSS 中使用 `rpx` 表示需要参与跨端缩放的尺寸；需要保留真实 CSS 像素时使用大写 `PX`，避免 H5 构建被 `pxtransform` 转成 `rem`。

Spike v0 中有几个刻意保留的平台差异：

- Taro `Input` 的 `onChange` 接收 `{ value, event }`，其中 `event` 是 Taro 原始输入事件；点击清除按钮时 `event` 为 `{ type: 'clear' }`。
- 微信原生 `ai-input` 的 `bind:change` 接收小程序事件，业务值位于 `event.detail.value`；`bind:clear` 不额外携带值。
- Taro `Modal` 使用 `footer={null}` 隐藏 footer，`footer={undefined}` 使用默认取消/确定按钮，传入节点时渲染自定义 footer。
- 微信原生 `ai-modal` 使用 `show-footer="{{false}}"` 隐藏 footer；提供 `slot="footer"` 时会追加到默认按钮前，Spike v0 暂不实现“有 footer slot 就替换默认 footer”的探测逻辑。
- 微信原生组件的 `custom-class` 和 `custom-style` 只作用在组件根节点或主面板节点，用于外层间距、宽度、阴影等安全覆盖；内部结构类名不作为稳定 API。
- Taro `Checkbox` / `Radio` 采用上游组选项语义：`options`、`value` / `defaultValue`、`onChange`。
- 微信原生 `ai-checkbox` / `ai-radio` 使用 `options` 与 `value` 属性，变化值位于 `event.detail.value`。
- 微信原生 `ai-switch` 使用 `checked` 属性与 `bind:change`，变化值位于 `event.detail.checked`。
- Taro `Collapse` 使用 `question` 和 `children`，支持 `expanded` / `defaultExpanded`，`onChange` 接收下一个展开值。
- 微信原生 `ai-collapse` 使用 `question` 属性与默认 slot，变化值位于 `event.detail.expanded`。
- Taro `CodeBlock` 与上游保持一致，使用 `code`、`style`、`className`，仅支持 JSX / TS 风格的内置高亮。
- 微信原生 `ai-code-block` 使用 `code`、`custom-class`、`custom-style`，不提供 `language` 或复制按钮。
- Taro `Table` 使用 `ScrollView + View` 栅格实现，支持 `columns`、`dataSource`、`rowKey`、`striped`、`showHeader`、`loading`、`emptyText`、`scroll`、`column.render` 和 `onRowClick`。
- 微信原生 `ai-table` 使用 `columns`、`data-source`、`row-key`、`striped`、`show-header`、`loading`、`empty-text`、`scroll-x`、`scroll-y`；`bind:rowtap` 的变化值位于 `event.detail`，原生 v1 不支持函数式单元格 `render`。
- Taro `Typewriter` 与上游保持一致，不输出额外包裹节点，支持 `children`、`speed`、`trigger`、`autoPlay` 和 `onDone`；当前未提供微信原生版本。

## 目录结构

```text
packages/
  core/          共享 token、图标元信息、工具函数
  taro-ui/       Taro React 组件
  weapp-native/  微信小程序原生组件
examples/
  taro-demo/     Taro 示例
  weapp-demo/    微信原生小程序示例
```

## 常用命令

```bash
npm install
npm run typecheck
npm run build:all
npm run test
npm run check:weapp-structure
npm run prepare:weapp-demo
npm run build:demo
npm run deploy
npm run build:h5 -w examples-taro-demo
npm run build:weapp -w examples-taro-demo
npm run demo:taro:h5
npm run demo:taro:weapp
```

`examples/weapp-demo` 用于验证原生微信组件包的接入方式。由于微信开发者工具不理解 npm workspace 的根级依赖布局，打开前需要先执行：

```bash
npm run prepare:weapp-demo
```

该命令会构建 `packages/weapp-native`，并生成：

- `examples/weapp-demo/node_modules/@animal-island-ui/weapp`
- `examples/weapp-demo/miniprogram_npm/@animal-island-ui/weapp`

前者供 DevTools 执行“构建 npm”时读取，后者供页面 `usingComponents` 直接解析 `@animal-island-ui/weapp/components/...`。如果 Windows 提示文件被占用，先关闭微信开发者工具或停止编译，再重新执行该命令。

## GitHub Pages Demo

本仓库只发布 Taro H5 demo 到 GitHub Pages。推荐使用已内置的 GitHub Actions 自动发布流程：

1. 推送代码到 `main`。
2. 在 GitHub 仓库 `Settings` → `Pages` 中，将 `Build and deployment` 的 `Source` 设置为 `GitHub Actions`。
3. 之后每次 `main` 更新都会自动执行 `.github/workflows/pages.yml`，构建并发布 `examples/taro-demo/dist`。

本地仍可手动验证构建：

```bash
npm run build:demo
```

- `build:demo` 会先构建 `packages/core` 和 `packages/taro-ui`，再构建 `examples/taro-demo` 的 H5 产物，并生成 `examples/taro-demo/dist/index.html`。
- `deploy` 会执行 `build:demo`，然后使用 `gh-pages -d examples/taro-demo/dist` 手动发布到 `gh-pages` 分支；这是备选方案，不是自动发布必需步骤。
- 默认 GitHub Pages base path 是 `/animal-island-ui-taro-port/`。如果仓库名不同，可以在构建时设置 `TARO_PUBLIC_PATH`，例如 `TARO_PUBLIC_PATH=/your-repo/ npm run build:demo`。
- `examples/weapp-demo` 是微信原生小程序项目，不发布到 github.io；它仍通过微信开发者工具验证。

## Spike v0 验证记录

2026-06-23 已重新恢复依赖并通过自动验证：

- `npm run typecheck`
- `npm run build:all`
- `npm run test`
- `npm run build:h5 -w examples-taro-demo`
- `npm run build:weapp -w examples-taro-demo`
- `npm run prepare:weapp-demo`

已知情况：

- `npm install` 后 npm audit 报告 `39 vulnerabilities`，主要来自 Taro/webpack 依赖树；Spike v0 不执行 `npm audit fix --force`。
- H5 构建有入口体积 warning：`app` 入口约 `298 KiB`，Spike 阶段暂接受。
- 微信原生 demo 已在微信开发者工具中完成 Spike v0 人工验收；后续更新原生组件后仍建议先执行 `npm run prepare:weapp-demo` 再预览。

## 版权与许可

本项目基于上游 `guokaigdg/animal-island-ui` 进行移植验证，并跟随上游改用 Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)。

- 本仓库整体使用 [LICENSE](./LICENSE) 中声明的 CC BY-NC 4.0；商业用途禁止。
- 来自上游项目的代码、设计描述及派生修改，保留上游版权声明与 CC BY-NC 4.0 许可声明。详见 [LICENSE.upstream](./LICENSE.upstream) 与 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)。
- 允许的非商业用途包括个人学习、研究、评估、测试和非商业展示；分发或展示时必须保留原作者归属、版权声明和许可声明。
- 本项目不是任天堂官方产品，与 Nintendo Co., Ltd. 无任何关联、授权或合作关系。
