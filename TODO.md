# TODO: animal-island-ui-taro-port 迁移看板

## 项目目标

将 [guokaigdg/animal-island-ui](https://github.com/guokaigdg/animal-island-ui) 从 React Web 组件库分批移植到小程序生态。

当前采用双线并行方案：

- `packages/taro-ui`: 面向 Taro 开发者的 React + Taro 组件库。
- `packages/weapp-native`: 面向纯微信小程序开发者的原生组件库。

迁移原则：

- 微信原生组件库不依赖 Taro 反向编译。
- Taro 线和微信原生线共享视觉 token、组件语义和 demo 验证节奏。
- API 不强求完全一致，优先遵循各平台生态习惯。
- 视觉一致优先于 API 对齐。
- `original-repo` 只作为上游源码参考，不在其中开发。
- 不提交构建产物目录：`dist`、`.taro`、`.temp`、`.cache`、`miniprogram_npm`、`node_modules`。

## 当前状态

当前已经完成 Spike v0 和下一批低风险组件迁移，双线合计 10 个组件可用。

- Taro 组件包已可类型检查和构建。
- Taro demo 已同步展示全部已迁移组件。
- Taro demo 已可构建 H5 和微信小程序产物。
- 微信原生组件包结构完整，已可生成发布形态。
- 微信原生 demo 已同步展示全部已迁移组件，并可生成 `node_modules` / `miniprogram_npm` 接入目录。
- `scripts/check-weapp-structure.mjs` 已覆盖当前 10 个原生组件。

## 已完成组件

### Spike v0 组件

- [x] `Button` / `ai-button`
- [x] `Card` / `ai-card`
- [x] `Icon` / `ai-icon`
- [x] `Input` / `ai-input`
- [x] `Modal` / `ai-modal`

### 下一批低风险组件

- [x] `Switch` / `ai-switch`
- [x] `Checkbox` / `ai-checkbox`
- [x] `Radio` / `ai-radio`
- [x] `Title` / `ai-title`
- [x] `Divider` / `ai-divider`

## 已完成工程项

- [x] 初始化 monorepo 工作区。
- [x] 创建 `packages/core`，包含共享 token、图标元信息和格式化工具。
- [x] 创建 `packages/taro-ui`。
- [x] 创建 `packages/weapp-native`。
- [x] 创建 `examples/taro-demo`。
- [x] 创建 `examples/weapp-demo`。
- [x] 创建 Taro CSS asset 复制脚本：`packages/taro-ui/scripts/copy-assets.mjs`。
- [x] 创建微信原生包构建脚本：`packages/weapp-native/scripts/build.mjs`。
- [x] 创建微信原生组件结构校验脚本：`scripts/check-weapp-structure.mjs`。
- [x] 创建微信原生 demo npm 同步脚本：`scripts/prepare-weapp-demo-npm.mjs`。
- [x] 创建中文 `README.md`，包含致谢、非商业声明、双线说明和组件范围。
- [x] 创建 `SPIKE_REPORT.md`，记录 Spike v0 决策和后续建议。
- [x] 创建 `LICENSE.upstream`，保留上游 MIT License。
- [x] 创建 `THIRD_PARTY_NOTICES.md`，记录上游来源和免责声明。

## 最近验证记录

验证日期：2026-06-23。

- [x] `npm run typecheck`
- [x] `npm run build:all`
- [x] `npm run test`
- [x] `npm run check:weapp-structure`
- [x] `npm run build:h5 -w examples-taro-demo`
- [x] `npm run build:weapp -w examples-taro-demo`
- [x] `npm run prepare:weapp-demo`

已知情况：

- `npm install` 后仍报告 `39 vulnerabilities`，主要来自 Taro / webpack 依赖树；不要直接执行 `npm audit fix --force`。
- Taro H5 构建仍有入口体积 warning，`app` 约 `298 KiB`，Spike 阶段暂接受。
- 沙箱内 Taro H5 / weapp 构建可能遇到 `spawn EPERM` 或子进程无输出卡住；提升权限重跑后可通过，判断为本地 Taro 构建子进程权限问题。
- `prepare:weapp-demo` 如遇 `EPERM`，优先关闭微信开发者工具或停止其编译，再重跑。

## 当前待办

### 组件质量补强

- [ ] 人工复查新增 5 个组件在微信开发者工具中的视觉和交互：
  - [ ] `ai-switch`
  - [ ] `ai-checkbox`
  - [ ] `ai-radio`
  - [ ] `ai-title`
  - [ ] `ai-divider`
- [ ] 人工复查新增 5 个组件在 Taro H5 demo 中的视觉和交互。
- [ ] 人工复查新增 5 个组件在 Taro weapp 产物中的视觉和交互。
- [ ] 为新增 5 个组件补充截图或验收记录。
- [ ] 根据人工预览结果更新 `SPIKE_REPORT.md` 或新增下一批迁移记录。

### 文档与 API

- [ ] 在 `README.md` 中补充新增组件的简要 API 示例。
- [ ] 明确 Taro / 微信原生事件 payload 对照表：
  - [ ] `Switch` / `ai-switch`
  - [ ] `Checkbox` / `ai-checkbox`
  - [ ] `Radio` / `ai-radio`
- [ ] 梳理新增原生组件的 `custom-class` / `custom-style` 覆盖边界。
- [ ] 记录 `Title` 色板与 `Card.color` 的对应关系。
- [ ] 记录 `Divider` 当前 CSS-only 实现与上游图片资产实现的差异。

### 实现债务

- [ ] 评估 `Icon` 最终资产策略：
  - [ ] 继续使用轻量彩色 tile。
  - [ ] 迁移上游 SVG / PNG 资产。
  - [ ] 重新设计小程序可控资源方案。
- [ ] 评估是否抽离 Taro / Weapp 共享样式 token 生成机制，减少两线样式重复。
- [ ] 评估是否给 Taro 组件增加更系统的类型测试或轻量单元测试。
- [ ] 评估微信原生组件是否需要单独的 demo 页面分组，避免首页继续膨胀。

## 下一批候选组件

下一批建议优先从小程序适配风险较低、视觉独立性较强的组件中选择。

- [ ] `Collapse`
  - 相对独立，适合继续验证状态型组件迁移。
  - 需要确认展开动效在 Taro / Weapp 中的高度动画策略。
- [ ] `Tabs`
  - 常用基础组件，适合补齐 demo 的导航型交互。
  - 需要确认横向滚动、激活指示器和受控 API。
- [ ] `Footer`
  - 展示型组件，风险低。
  - 需要确认版权与非商业声明表达。
- [ ] `Time`
  - 展示型组件，风险低。
  - 需要确认是否依赖实时刷新。
- [ ] `Phone`
  - 展示型组件，适合补充视觉资产迁移经验。
  - 需要确认小程序布局和图片 / CSS 方案。

## 暂缓组件

以下组件暂不直接进入下一批，需要先做单独方案评估：

- [ ] `Select`
  - 原生 `picker` 稳定，但样式控制弱。
  - 自绘弹层视觉一致性好，但需要处理层级、滚动穿透、键盘和安全区。
- [ ] `Loading`
  - 不迁移 Web 版 GSAP / MotionPath。
  - 后续定义为小程序专用轻动画组件。
- [ ] `Table`
  - Web `<table>` 标签不可直接平移。
  - 需要 `ScrollView + View` 栅格方案。
- [ ] `CodeBlock`
  - Web `<pre>` / `<code>` 语义需要改写。
  - 需要确认复制、横向滚动和语法高亮方案。
- [ ] `Tooltip`
  - 小程序触发方式、层级、定位模型与 Web 差异较大。
- [ ] `Form`
  - 可复用状态逻辑，但字段注册、校验展示、滚动定位需要单独拆。

## 发布前检查

- [ ] 确认 `README.md` 保留原作者意愿与非商业声明。
- [ ] 确认 `LICENSE`、`LICENSE.upstream`、`THIRD_PARTY_NOTICES.md` 表达一致。
- [ ] 不要把上游 MIT 授权代码错误改写成单一非商业 License。
- [ ] 若未来发布 npm，重新确认包名、license 字段和 README 免责声明。
- [ ] 发布前重新执行完整验证：
  - [ ] `npm run typecheck`
  - [ ] `npm run build:all`
  - [ ] `npm run test`
  - [ ] `npm run build:h5 -w examples-taro-demo`
  - [ ] `npm run build:weapp -w examples-taro-demo`
  - [ ] `npm run prepare:weapp-demo`

## 维护备注

- `package-lock.json` 是依赖锁定文件，保留。
- 如果后续重新安装依赖后出现 audit 警告，先记录，不要盲目强制修复。
- 如果 Windows 删除过程产物遇到 `Access denied`，优先确认是否有 Taro、微信开发者工具或编辑器进程占用文件。
- 组件迁移时先读上游 `original-repo` 中对应组件的 API、样式和 demo，再做小程序适配。
