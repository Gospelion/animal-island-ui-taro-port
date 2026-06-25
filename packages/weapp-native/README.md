# @animal-island-ui/weapp

微信原生小程序组件包。V1 范围内的组件已经完成迁移，并在微信开发者工具中完成人工检查。

原生线刻意遵循小程序习惯：

- 内容：`slot`
- 事件：`bind:tap`、`bind:change`、`bind:clear`、`bind:close`、`bind:ok`
- 样式扩展：`custom-class`、`custom-style`

本包优先保证与 Taro 组件包的视觉一致，不强求 API 名称完全一致。

## V1 组件

- `ai-button`
- `ai-card`
- `ai-icon`
- `ai-input`
- `ai-modal`
- `ai-switch`
- `ai-checkbox`
- `ai-radio`
- `ai-title`
- `ai-divider`
- `ai-collapse`
- `ai-code-block`
- `ai-table`

## 组件说明

### `ai-input`

`bind:change` 会触发小程序自定义事件：

```js
Page({
  handleNameChange(event) {
    const value = event.detail.value;
  }
});
```

点击清除按钮后会触发 `bind:clear`，该事件不额外携带业务值。

### `ai-modal`

`ai-modal` 渲染在普通小程序组件树中，通过固定定位遮罩展示，不依赖 Taro 反向编译。

Footer 行为：

- `show-footer="{{true}}"`：展示 footer 区域与默认取消 / 确定按钮。
- `show-footer="{{false}}"`：隐藏整个 footer 区域。
- `slot="footer"`：当 `show-footer` 为 true 时，插入到默认按钮之前。

WXML slot 不能可靠模拟 React 中 `footer === undefined` 的判断，因此 V1 保留 `show-footer` 作为显式开关。

### `ai-collapse`

`ai-collapse` 使用 `question` 属性作为标题，使用默认 slot 作为面板内容。

`bind:change` 会触发：

```js
Page({
  handleCollapseChange(event) {
    const expanded = event.detail.expanded;
  }
});
```

未传入 `expanded` 时，组件会从 `default-expanded` 初始化并自行管理展开状态；传入 `expanded` 时，页面应根据 `event.detail.expanded` 更新受控值。

### `ai-code-block`

`ai-code-block` 使用 `code` 属性，并沿用上游 React 组件的内置 JSX / TS 风格高亮规则。

```xml
<ai-code-block
  code="{{codeString}}"
  custom-style="border-radius: 5px; background-color: #242c46ff;"
></ai-code-block>
```

原生组件使用小程序样式扩展：`custom-class` 与 `custom-style`，不使用 React 的 `className` 与 `style`。V1 不提供 `language` 属性或复制按钮。

### `ai-table`

`ai-table` 支持 `columns`、`data-source`、`row-key`、`striped`、`show-header`、`loading`、`empty-text`、`scroll-x`、`scroll-y`。

`bind:rowtap` 的事件数据位于 `event.detail`。原生 V1 只支持按 `dataIndex` 渲染文本单元格，不支持 Taro 线的 `column.render` 函数式单元格。

### 样式覆盖边界

`custom-class` 和 `custom-style` 只用于安全的外层布局覆盖，例如间距、宽度、展示位置或一次性的面板样式。内部类名与子节点布局不作为稳定公开 API。
