# TODO：animal-island-ui-taro-port 迁移工作看板

## 项目目标

将 [guokaigdg/animal-island-ui](https://github.com/guokaigdg/animal-island-ui) 从 React Web 组件库移植到小程序生态。

当前采用“双线并行”方案：

- `packages/taro-ui`：面向 Taro 用户的 React + Taro 组件库。
- `packages/weapp-native`：面向纯微信小程序用户的原生组件库。

重要原则：

- 微信原生组件库不依赖 Taro 反向编译。
- Taro 线和微信原生线共享视觉 token、资源规范和组件语义，但 API 不强求完全一致。
- 视觉一致优先，平台 API 各自遵循生态习惯。
- `original-repo` 是上游源码的只读参考目录，不在其中开发。

## 当前阶段：Spike v0

Spike v0 只验证 5 个代表组件：

- `Button`
- `Card`
- `Icon`
- `Input`
- `Modal`

Spike v0 成功标准：

- Taro 组件库可以类型检查和构建。
- Taro demo 可以构建 H5 和微信小程序产物。
- 微信原生组件包结构完整，可以生成发布形态。
- 5 个组件在两条产物线中都能表达核心视觉与基础交互。
- `Modal` 不使用 React Portal，改为小程序可接受的普通树内遮罩层。

## 已完成

- [x] 初始化 Monorepo 工作区。
- [x] 创建 `packages/core`，包含共享 token、图标元信息、格式化工具。
- [x] 创建 `packages/taro-ui`。
- [x] 创建 `packages/weapp-native`。
- [x] 创建 `examples/taro-demo`。
- [x] 创建 `examples/weapp-demo`。
- [x] 实现 Taro 线 5 个组件：
  - [x] `Button`
  - [x] `Card`
  - [x] `Icon`
  - [x] `Input`
  - [x] `Modal`
- [x] 实现微信原生线 5 个组件：
  - [x] `ai-button`
  - [x] `ai-card`
  - [x] `ai-icon`
  - [x] `ai-input`
  - [x] `ai-modal`
- [x] 创建微信原生组件结构校验脚本：`scripts/check-weapp-structure.mjs`。
- [x] 创建微信原生包构建脚本：`packages/weapp-native/scripts/build.mjs`。
- [x] 创建 Taro CSS asset 复制脚本：`packages/taro-ui/scripts/copy-assets.mjs`。
- [x] 创建中文 README，并加入致谢、非商业声明、双线说明。
- [x] 创建 `LICENSE.upstream`，保留上游 MIT License。
- [x] 创建 `THIRD_PARTY_NOTICES.md`，记录上游来源和免责声明。
- [x] 创建 `SPIKE_REPORT.md`，记录 Spike v0 决策和后续建议。
- [x] 清理过程产物：
  - [x] `node_modules`
  - [x] 各 package 的 `dist`
  - [x] `examples/taro-demo/dist`

## 已验证记录

以下验证曾在安装依赖后通过：

- [x] `npm run typecheck`
- [x] `npm run build:all`
- [x] `npm run test`
- [x] `npm run check:weapp-structure`
- [x] `npm run build:h5 -w examples-taro-demo`
- [x] `npm run build:weapp -w examples-taro-demo`

注意：

- 目前 `node_modules` 已被清理，所以再次运行验证前需要先执行 `npm install`。
- `npm install` 后曾出现 npm audit 报告：`39 vulnerabilities`，主要来自 Taro/webpack 依赖树。不要直接 `npm audit fix --force`，以免破坏 Taro 兼容性。
- Taro H5 demo 构建曾有入口体积 warning，Spike 阶段可接受。

## 当前目录关键文件

- `README.md`：中文项目说明。
- `TODO.md`：当前看板。
- `SPIKE_REPORT.md`：Spike v0 报告。
- `package.json`：根工作区脚本与依赖。
- `tsconfig.base.json`：共享 TypeScript 配置。
- `scripts/check-weapp-structure.mjs`：微信原生组件结构校验。
- `packages/core`：共享 token 和工具。
- `packages/taro-ui`：Taro React 组件库。
- `packages/weapp-native`：微信原生组件库。
- `examples/taro-demo`：Taro 示例。
- `examples/weapp-demo`：微信原生示例。

## 待办：短期

- [x] 重新执行 `npm install`，恢复本地依赖。
- [x] 重新跑完整验证：
  - [x] `npm run typecheck`
  - [x] `npm run build:all`
  - [x] `npm run test`
  - [x] `npm run build:h5 -w examples-taro-demo`
  - [x] `npm run build:weapp -w examples-taro-demo`
- [ ] 在微信开发者工具中打开 `examples/weapp-demo`。
- [ ] 对 `examples/weapp-demo` 执行“构建 npm”并预览。
- [ ] 人工检查 5 个组件的视觉一致性：
  - [ ] 颜色
  - [ ] 圆角
  - [ ] 阴影
  - [ ] 间距
  - [ ] 禁用态
  - [ ] loading 态
  - [ ] Modal 遮罩与按钮行为
- [x] 补充 Spike v0 截图或视觉验收记录。
- [x] 根据实际预览结果更新 `SPIKE_REPORT.md`。

本次自动验证记录（2026-06-23）：

- `npm install` 通过，仍报告 `39 vulnerabilities`；不执行 `npm audit fix --force`。
- `npm run typecheck` 通过。
- `npm run build:all` 通过。
- `npm run test` 通过。
- `npm run build:h5 -w examples-taro-demo` 通过；仍有入口体积 warning，`app` 约 `298 KiB`。
- `npm run build:weapp -w examples-taro-demo` 通过。
- 沙箱内首次 H5 构建遇到 `spawn EPERM`，提升权限重跑后通过，判断为本地构建子进程权限问题。
- 微信开发者工具预览、真机层级/滚动穿透/安全区检查仍需人工执行。

## 待办：组件与实现修正

- [x] 确认 `Icon` 的 Spike v0 实现策略：
  - 当前 Spike v0 使用轻量彩色 tile 表达内置 icon。
  - 最终资产策略不在 Spike v0 内拍板，后续需要决定是否迁移上游 SVG/PNG 资源，或重新设计小程序可控资源方案。
- [x] 检查 `Input` 两线事件 payload 是否足够文档化。
- [ ] 检查 `Modal` 在真机或开发者工具中的层级、滚动穿透、安全区表现。
- [x] 给原生 `ai-modal` 的 footer slot / 默认 footer 行为写清楚文档。
- [x] 梳理 `custom-class`、`custom-style` 在原生组件中的覆盖边界。

## 待办：下一批推荐组件

如果 Spike v0 验证通过，下一批建议迁移：

- [ ] `Switch`
- [ ] `Checkbox`
- [ ] `Radio`
- [ ] `Title`
- [ ] `Divider`

这些组件相对低风险，适合继续验证双线迁移效率。

## 暂缓组件

以下组件暂不进入下一批，需单独做方案评估：

- [ ] `Select`
  - 原生 `picker` 稳定，但样式控制弱。
  - 自绘弹层视觉一致性好，但要处理层级、滚动穿透、键盘、安全区。
- [ ] `Loading`
  - 不迁移 Web 版 GSAP/MotionPath。
  - 后续定义为“小程序专用轻动画组件”。
- [ ] `Table`
  - Web `<table>` 标签不可直接平移。
  - 需要 `ScrollView + View` 栅格方案。
- [ ] `CodeBlock`
  - Web 的 `<pre>/<code>` 语义要改写。
- [ ] `Tooltip`
  - 小程序触发方式、层级、定位模型与 Web 差异较大。
- [ ] `Form`
  - 可复用状态逻辑，但字段注册、校验展示、滚动定位需要单独拆。

## 合规与版权待办

- [ ] 持续保留上游 MIT License 与版权声明。
- [ ] 不要把上游 MIT 授权代码错误改写成单一“非商业 License”。
- [ ] README 中保留原作者意愿与非商业声明。
- [ ] 发布前再次检查：
  - [ ] `LICENSE`
  - [ ] `LICENSE.upstream`
  - [ ] `THIRD_PARTY_NOTICES.md`
  - [ ] npm package `license` 字段
- [ ] 若未来要发布 npm，需要重新确认包名、License 表达和 README 免责声明。

## 注意事项

- 不要修改 `original-repo`。
- 不要提交构建输出目录：
  - `dist`
  - `.taro`
  - `.temp`
  - `.cache`
  - `miniprogram_npm`
  - `node_modules`
- `package-lock.json` 是依赖锁定文件，保留。
- 如果后续重新安装依赖后出现 audit 警告，先记录，不要盲目强制修复。
- 如果 Windows 删除过程产物遇到 `Access denied`，优先确认是否有 Taro/微信开发者工具/编辑器进程占用文件。
