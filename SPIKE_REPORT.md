# Spike v0 Report

## Status

Implemented scaffold and first-pass components for both lines:

- Taro React: `Button`, `Card`, `Icon`, `Input`, `Modal`
- Native WeChat: `ai-button`, `ai-card`, `ai-icon`, `ai-input`, `ai-modal`

Automated validation was rerun on 2026-06-23 after restoring dependencies:

- `npm run typecheck`
- `npm run build:all`
- `npm run test`
- `npm run build:h5 -w examples-taro-demo`
- `npm run build:weapp -w examples-taro-demo`
- `npm run prepare:weapp-demo`

The H5 demo build still reports an entrypoint size warning (`app` about `298 KiB`), which is acceptable for Spike v0.

## Decisions

- Taro and native WeChat are parallel outputs, not a Taro reverse-compilation chain.
- Visual consistency is prioritized over identical API names.
- `Modal` does not use React Portal. Both lines render it in the normal component tree.
- `Input` does not simulate DOM `Event`. Each line emits platform-shaped change payloads.
- `Icon` uses a lightweight colored tile implementation for built-ins in Spike v0. Final asset strategy remains open.
- Native `custom-class` / `custom-style` are outer override hooks only. Internal component classes are not stable extension APIs in Spike v0.
- Spike v0 now includes lightweight CSS/WXSS motion parity for the five migrated components. It does not port Web-only GSAP/MotionPath effects.

## API Differences

- Taro uses `children`, `onClick`, `className`, `style`.
- Native WeChat uses `slot`, `bind:tap`, `custom-class`, `custom-style`.
- Native `ai-modal` includes `showFooter` as a practical Mini Program escape hatch because WXML slots do not provide a reliable React-like `footer === undefined` fallback model.
- Taro `Input` emits `{ value, event }` through `onChange`; native `ai-input` emits `event.detail.value` through `bind:change`.
- Taro `Modal` can replace the footer by passing `footer`; native `ai-modal` appends `slot="footer"` before the default buttons and uses `show-footer="{{false}}"` to hide the footer.

## Visual Acceptance Record

Source-level demo coverage exists for the 5 Spike v0 components in both demos:

- Button: primary, dashed, loading spinner, moving loading stripes, and press motion.
- Card: colored card, dashed card variants, and lift/press motion.
- Icon: three built-in icon names with explicit size and original-style scale/rotate bounce on hover/press.
- Input: controlled value, placeholder, prefix icon, clear action, value display, clear press motion, and status transition.
- Modal: mask fade-in, panel zoom-in, title, default footer buttons, close/ok behavior.

Automated builds confirm the Taro H5 and Taro weapp demo outputs compile. Native WeChat visual acceptance was manually checked in WeChat DevTools on 2026-06-23 after preparing `examples/weapp-demo/miniprogram_npm`; no issue was found for component resolution, visual consistency, loading/disabled states, modal stacking, scroll bleed, or safe-area behavior.

## Deferred Risks

- `Select`: requires a separate spike for `picker` versus custom overlay.
- `Loading`: should be redesigned as a Mini Program-specific lightweight animation.
- Full visual parity would still benefit from committed screenshots for future regression comparison.
- `Icon` asset strategy remains intentionally unresolved. Spike v0 validates API shape and visual tone with colored tiles; later work should decide whether to migrate upstream assets or define a new Mini Program asset pipeline.

## Next Batch Recommendation

If Spike v0 validates in both demos, the next migration batch should be:

- `Switch`
- `Checkbox`
- `Radio`
- `Title`
- `Divider`

Keep `Select`, `Loading`, `Table`, and `Tooltip` outside the next batch until their platform-specific decisions are settled.
