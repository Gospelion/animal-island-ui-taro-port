# Project Notes for Codex

## Memory maintenance

- When a task reveals a project-wide constraint, recurring pitfall, migration rule, or quality standard that future Codex runs should remember, add it to this `AGENTS.md` in the same turn.
- Prefer concise, actionable notes tied to files, frameworks, or workflows. Update or correct an existing note when new evidence disproves it instead of leaving stale guidance behind.

## Taro demo typography

- In `examples/taro-demo`, document-reading text must render at the intended browser pixel size:
  - body/readable text: `14PX`
  - section subtitles: `18PX`
- Use uppercase `PX` for these fixed typography rules. Do not use `rpx` for text that must measure exactly in H5, because Taro H5 may convert `rpx` through `rem` and the page root font-size can shrink the final computed size.
- Before finishing typography-related work, inspect changed CSS for `font-size` values in readable document surfaces and confirm they still match the required `14PX` / `18PX` contract.

## Table text alignment

- The upstream React Table uses native `<table>/<tr>/<th>/<td>` layout. The Taro port uses `View` nodes, but H5 CSS should preserve table semantics with `display: table`, `display: table-row`, and `display: table-cell`; do not convert it back to flex rows for H5.
- Keep normal cell text directly in the table-cell flow. Avoid making `.ai-table-text` a block/flex layout wrapper, because that reintroduces baseline and vertical alignment drift between Chinese and Latin cells.

## Typewriter migration

- The upstream `Typewriter` intentionally emits no wrapper element. Keep the Taro component as a `Fragment` render that truncates/clones the existing ReactNode tree, so parent text/layout styles continue to come from the caller.
- `Typewriter` is currently migrated only for `packages/taro-ui`; do not document or count a WeChat native `ai-typewriter` until that separate implementation exists.

## Divider migration

- `Divider` must expose all 9 upstream variants in demos: `line-*`, `wave-yellow`, and `dashed-*`, including the white variants on a dark preview background.
- In `packages/taro-ui`, `line-*` dividers should render the upstream-style repeated triangle decoration, `wave-yellow` should render a continuous wave stroke, and `dashed-*` should stay as thin dashed rules; do not regress these to solid rectangles or dotted circles.
