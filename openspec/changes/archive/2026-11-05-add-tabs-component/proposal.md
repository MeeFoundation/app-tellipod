## Why

Screens that switch between a few views of the same content, such as a profile's sections, need the design system's Tabs.
The kit has no tabs, and a screen cannot build the look from the Figma file without them.
This change adds Tabs to `packages/ui-kit` ahead of the first screen that uses it, which is a deliberate exception to "the kit holds only components the app uses" in `components/ui-kit/components`.

**Example:** the Figma Tabs page ("Mee - Design System v5.2.4", Tabs page) has a Tab with State `Default`, `Hover`, `Focus` and `Active` and Size `M` (36 px) and `L` (44 px), and a Tabs horizontal bar of Size `M` (44 px high) and `L` (56 px high).
Its Active tab is a white raised pill on a pale gray track, and each tab reads `[icon] Tab label [icon]`.

## What Changes

- Add `Tabs` to `packages/ui-kit` with the Figma sizes and states, and its grouped stories next to it.
- `Tabs` is a container of `Tab` buttons: `<Tabs size layout><Tab label active onPress leadingIcon trailingIcon /></Tabs>`. The screen owns the selection and passes `active`. `Tabs` gives its size and layout to the tabs through context.
- `Tabs` renders the bar only. The screen shows the content of the Active tab.
- The bar is always as wide as its parent. Two layouts: `content`, where each tab is as wide as its content, which is the only layout the design shows, and which scrolls horizontally when the tabs are wider than the bar, and `equal`, where the tabs share the bar's width evenly. Scrolling and `equal` are not in the design system and are flagged under "Open questions".
- Hover has no touch equivalent, so a pressed tab shows the Hover look, as the Button does.
- Add the Figma `alpha/dark/5` and `alpha/dark/10` colors to the color tokens. The bar's track and the Active tab's border use them, and the kit has no token for them yet.
- Add the `Tabs` export to the kit index and a row to the ui-kit spec index.

## Capabilities

### New Capabilities

- `components/ui-kit/tabs`: the Tabs' props, sizes, layouts, states, selection and accessibility contract.

### Modified Capabilities

None. The new color tokens follow the existing rule in `components/ui-kit/tokens-and-theming` that a design value with no token gets one first.

## Impact

- New: `packages/ui-kit/src/Tabs/`.
- Edited: `packages/ui-kit/tailwind/tokens/colors.ts` (two alpha colors), `packages/ui-kit/src/index.ts`, `openspec/specs/components/ui-kit/README.md`.
- Dependencies: none new. Tabs use the existing `Icon` through slots.
- `apps/storybook` picks up the new stories through its existing story glob. `apps/app-tellipod` is untouched.
- Authoritative sources: Figma file "Mee - Design System v5.2.4" (Tabs page, node 0:1; Tab 4:7862, Tabs horizontal 6466:3053), WCAG 2.2 AA through `code-practices/accessibility`.

## Left out of the design

- The background blur behind the bar. React Native has no matching cross-platform effect, and the track is a flat translucent fill.
- Vertical tabs, a disabled tab, a badge or count in a tab, and tab panels. The Tabs page shows none of them.

## Open questions

### The `equal` layout is not in the design

`components/ui-kit/components` says the kit gets a variant only when the design system has it.
The Figma bar is content-width only.

**Example:** three tabs "Posts", "Media" and "About" on a 390 pt wide phone.

| Option | Result | Consequence |
| --- | --- | --- |
| A (recommended) | `layout="equal"` splits the bar into three tabs of the same width | Built now as a documented exception, and design is asked to add it to the Tabs page. |
| B | Only `layout="content"`, tabs sit at the left and the rest of the bar is empty | Matches the design, but a three-tab bar on a phone looks unfinished. |

This change takes A, and the spec names the layout as an addition to the design.

### Accessibility of the designed colors

The Active and Default tabs use `text/gray/on-soft-background` on white and on the translucent gray track, and Hover and Focus use `text/default/body` on `surface/gray/light` and `surface/gray/soft`.
Their contrast is unmeasured until the pairs are checked against 4.5:1.

**Example:** `text/default/body` (`gray/800`) on `surface/gray/light` (`gray/100`) is measured in the tasks, and a failing pair is built as designed and listed under "Accessibility exceptions" in the Tabs spec, as the Badge does.
