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

已完成 Spike v0、下一批低风险组件迁移、`Collapse`、`CodeBlock` 和 `Table` 首版迁移。当前双线合计 13 个组件可用，Taro 线额外完成 `Typewriter`：

- `Button` / `ai-button`
- `Card` / `ai-card`
- `Icon` / `ai-icon`
- `Input` / `ai-input`
- `Modal` / `ai-modal`
- `Switch` / `ai-switch`
- `Checkbox` / `ai-checkbox`
- `Radio` / `ai-radio`
- `Title` / `ai-title`
- `Divider` / `ai-divider`
- `Collapse` / `ai-collapse`
- `CodeBlock` / `ai-code-block`
- `Table` / `ai-table`
- `Typewriter`（仅 Taro 线）

已完成的必要工程工作：

- 初始化 monorepo，并建立 `packages/core`、`packages/taro-ui`、`packages/weapp-native`。
- 建立 Taro demo 与微信原生 demo，已同步展示全部双线已迁移组件；Taro demo 额外展示 `Typewriter`。
- Taro 组件包已可类型检查和构建，Taro demo 已可构建 H5 与微信小程序产物。
- 微信原生组件包已可生成发布形态，demo 已可生成 `node_modules` / `miniprogram_npm` 接入目录。
- 已建立 Taro asset 复制、微信原生包构建、原生组件结构校验、原生 demo npm 同步等脚本。
- 已补充中文 `README.md`、`SPIKE_REPORT.md`、`LICENSE.upstream` 和 `THIRD_PARTY_NOTICES.md`。

最近一次完整验证日期：2026-06-23。

- `npm run typecheck`
- `npm run build:all`
- `npm run test`
- `npm run check:weapp-structure`
- `npm run build:h5 -w examples-taro-demo`
- `npm run build:weapp -w examples-taro-demo`
- `npm run prepare:weapp-demo`

已知情况：

- `npm install` 后仍报告 `39 vulnerabilities`，主要来自 Taro / webpack 依赖树；不要直接执行 `npm audit fix --force`。
- Taro H5 构建仍有入口体积 warning，`app` 约 `298 KiB`，Spike 阶段暂接受。
- 沙箱内 Taro H5 / weapp 构建可能遇到 `spawn EPERM` 或子进程无输出卡住；提升权限重跑后可通过，判断为本地 Taro 构建子进程权限问题。
- `prepare:weapp-demo` 如遇 `EPERM`，优先关闭微信开发者工具或停止其编译，再重跑。

## 当前待办

### 组件验收

- [ ] 人工预览 Taro H5、Taro weapp 和微信原生 demo 中的 13 个双线已迁移组件，并额外预览 Taro `Typewriter`。
- [ ] 重点确认 `Switch`、`Checkbox`、`Radio`、`Title`、`Divider`、`Collapse`、`CodeBlock`、`Table`、`Typewriter` 的视觉、交互和事件表现。
- [ ] 为人工预览补充简要验收记录或截图。

### 文档与 API

- [ ] 在 `README.md` 中补充已迁移组件的简要 API 示例。
- [ ] 记录 Taro / 微信原生事件 payload 差异，优先覆盖 `Switch`、`Checkbox`、`Radio`、`Collapse`、`CodeBlock`、`Table`、`Typewriter`。
- [ ] 记录 `Table` 原生 v1 边界：`ai-table` 只支持按 `dataIndex` 渲染文本单元格，不支持 Taro `column.render` 函数式单元格。
- [ ] 记录原生组件 `custom-class` / `custom-style` 的覆盖边界。
- [ ] 根据人工验收结果更新 `SPIKE_REPORT.md` 或新增迁移记录。

### 实现债务

- [ ] 评估 `Icon` 最终资产策略：继续轻量 tile、迁移上游资产，或重新设计小程序资源方案。
- [ ] 评估是否抽离 Taro / Weapp 共享样式 token 生成机制，减少两线样式重复。
- [ ] 评估是否增加更系统的类型测试、轻量单元测试或 demo 验收记录。
- [ ] 评估微信原生 demo 是否需要分组，避免首页继续膨胀。

## 下一批候选组件

下一批建议优先选择小程序适配风险较低、视觉独立性较强的组件：

- [ ] `Tabs`: 常用导航型交互，需要确认横向滚动、激活指示器和受控 API。
- [ ] `Footer`: 展示型组件，需确认版权与非商业声明表达。
- [ ] `Time`: 展示型组件，需确认是否依赖实时刷新。
- [ ] `Phone`: 展示型组件，适合补充视觉资产迁移经验。

## 暂缓组件

以下组件需要先做单独方案评估：

- [ ] `Select`: 原生 `picker` 样式控制弱，自绘弹层需要处理层级、滚动穿透、键盘和安全区。
- [ ] `Loading`: 不迁移 Web 版 GSAP / MotionPath，后续定义为小程序专用轻动画组件。
- [ ] `Tooltip`: 小程序触发方式、层级、定位模型与 Web 差异较大。
- [ ] `Form`: 字段注册、校验展示、滚动定位需要单独拆。

## 发布前检查

- [ ] 确认 `README.md` 保留原作者意愿与非商业声明。
- [ ] 确认 `LICENSE`、`LICENSE.upstream`、`THIRD_PARTY_NOTICES.md` 表达一致。
- [ ] 不要把上游 MIT 授权代码错误改写成单一非商业 License。
- [ ] 若未来发布 npm，重新确认包名、license 字段和 README 免责声明。
- [ ] 发布前重新执行完整验证：
  - [ ] `npm run typecheck`
  - [ ] `npm run build:all`
  - [ ] `npm run test`
  - [ ] `npm run check:weapp-structure`
  - [ ] `npm run build:h5 -w examples-taro-demo`
  - [ ] `npm run build:weapp -w examples-taro-demo`
  - [ ] `npm run prepare:weapp-demo`

## 维护备注

- `package-lock.json` 是依赖锁定文件，保留。
- 如果后续重新安装依赖后出现 audit 警告，先记录，不要盲目强制修复。
- 如果 Windows 删除过程产物遇到 `Access denied`，优先确认是否有 Taro、微信开发者工具或编辑器进程占用文件。
- 组件迁移时先读上游 `original-repo` 中对应组件的 API、样式和 demo，再做小程序适配。
