# @animal-island-ui/weapp

Spike v0 native WeChat Mini Program component package.

The native line intentionally follows Mini Program conventions:

- content: `slot`
- event: `bind:tap`, `bind:change`, `bind:clear`, `bind:close`, `bind:ok`
- style hooks: `custom-class`, `custom-style`

Visual consistency with the Taro package is prioritized over identical API names.

## Spike v0 component notes

### `ai-input`

`bind:change` emits a Mini Program custom event:

```js
Page({
  handleNameChange(event) {
    const value = event.detail.value;
  }
});
```

`bind:clear` is emitted after the clear button resets the internal value. It does not carry an extra payload in Spike v0.

### `ai-modal`

`ai-modal` renders inside the normal Mini Program component tree with a fixed mask. It does not depend on Taro reverse compilation.

Footer behavior:

- `show-footer="{{true}}"` renders the footer area and the default Cancel/OK buttons.
- `show-footer="{{false}}"` hides the entire footer area.
- `slot="footer"` is rendered before the default buttons when `show-footer` is true.

WXML slots do not provide a reliable React-like `footer === undefined` fallback check, so Spike v0 keeps `show-footer` as the explicit escape hatch.

### `ai-collapse`

`ai-collapse` uses the `question` property for the header and the default slot for panel content.

`bind:change` emits:

```js
Page({
  handleCollapseChange(event) {
    const expanded = event.detail.expanded;
  }
});
```

When `expanded` is omitted, the component initializes from `default-expanded` and manages its own open state. When `expanded` is provided, the page should update it from `event.detail.expanded`.

### `ai-code-block`

`ai-code-block` uses the `code` property and highlights JSX / TS-like snippets with the same built-in regex rules as the upstream React component.

```xml
<ai-code-block
  code="{{codeString}}"
  custom-style="border-radius: 5px; background-color: #242c46ff;"
></ai-code-block>
```

The native component follows Mini Program style hooks: use `custom-class` and `custom-style` instead of React `className` and `style`. It does not expose a `language` property or a copy action in Spike v0.

### Style override boundary

`custom-class` and `custom-style` are intended for safe outer layout overrides, such as margins, width, display placement, or one-off panel styling. Internal class names and child layout are not treated as stable public API in Spike v0.
