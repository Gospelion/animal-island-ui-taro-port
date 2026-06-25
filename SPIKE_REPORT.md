# V1 验收记录

## 状态

V1 范围内的组件已经完成迁移，并经过人工检查确认可作为正式版 V1：

- Taro React：`Button`、`Card`、`Icon`、`Input`、`Modal`、`Switch`、`Checkbox`、`Radio`、`Title`、`Divider`、`Collapse`、`CodeBlock`、`Table`、`Typewriter`
- 微信原生：`ai-button`、`ai-card`、`ai-icon`、`ai-input`、`ai-modal`、`ai-switch`、`ai-checkbox`、`ai-radio`、`ai-title`、`ai-divider`、`ai-collapse`、`ai-code-block`、`ai-table`

2026-06-25 人工检查结论：

- Taro 在网页端渲染正常。
- Taro 编译到小程序侧后可正常应用。
- 微信原生小程序 demo 在微信开发者工具中渲染与交互正常。

## 自动验证记录

2026-06-23 恢复依赖后已重新执行：

- `npm run typecheck`
- `npm run build:all`
- `npm run test`
- `npm run check:weapp-structure`
- `npm run build:h5 -w examples-taro-demo`
- `npm run build:weapp -w examples-taro-demo`
- `npm run prepare:weapp-demo`

H5 demo 构建仍会报告入口体积 warning，`app` 约 `298 KiB`，V1 暂接受。

## 架构决策

- Taro 与微信原生是并行产物，不以 Taro 反向编译作为原生组件库的基础。
- 视觉一致优先于 API 名称完全一致。
- `Modal` 不使用 React Portal，两条产物线都渲染在普通组件树中。
- `Input` 不模拟 DOM `Event`，两条产物线分别输出符合平台习惯的事件 payload。
- 原生 `custom-class` / `custom-style` 只作为外层覆盖入口，内部组件类名不作为稳定扩展 API。
- 小程序端只迁移轻量 CSS / WXSS 动效，不承诺复刻 Web-only GSAP / MotionPath 效果。

## API 差异

- Taro 使用 `children`、`onClick`、`className`、`style`。
- 微信原生使用 `slot`、`bind:tap`、`custom-class`、`custom-style`。
- 微信原生 `ai-modal` 提供 `show-footer`，用于显式控制 footer 是否显示。
- Taro `Input` 的 `onChange` 输出 `{ value, event }`；原生 `ai-input` 的业务值位于 `event.detail.value`。
- Taro `Table` 支持 `column.render`；原生 `ai-table` V1 只支持按 `dataIndex` 渲染文本单元格。
- Taro `Typewriter` 保持上游语义，不输出额外包裹节点；V1 暂无微信原生版本。

## 视觉验收记录

V1 demo 已覆盖所有已迁移组件：

- `Button`：主要按钮、虚线按钮、loading 状态、按压动效。
- `Card`：彩色卡片、虚线卡片、卡片层级与按压反馈。
- `Icon`：内置图标名、尺寸控制、缩放 / 旋转反馈。
- `Input`：受控值、placeholder、前缀图标、清除动作、状态展示。
- `Modal`：遮罩、弹层、标题、默认按钮、关闭 / 确认行为。
- `Switch`、`Checkbox`、`Radio`：受控 / 非受控展示与变化事件。
- `Title`、`Divider`：多变体视觉展示。
- `Collapse`：展开 / 收起状态与内容布局。
- `CodeBlock`：代码展示与内置高亮。
- `Table`：表头、行、空态、loading、滚动与点击事件。
- `Typewriter`：Taro 线文本截断、播放与完成回调。

微信原生小程序侧截图已提交到 `docs/images/weapp-v1-preview.png`，并在根 `README.md` 中展示。

## V1 外的后续风险

- `Select`：需要单独比较原生 `picker` 与自绘弹层方案。
- `Loading`：后续应定义为小程序专用轻动画组件，不直接复刻 Web 版 GSAP / MotionPath。
- `Tooltip`：需要单独评估触发方式、层级和定位模型。
- `Form`：字段注册、校验展示和滚动定位需要单独拆解。
- `Icon`：后续仍可评估是否迁移上游资源或建立新的小程序资源方案。
