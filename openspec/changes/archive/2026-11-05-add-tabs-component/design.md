## Context

`packages/ui-kit` has the Button, Badge, TextField and Icon, a Tailwind preset with the spacing, `borderRadius` (`2lg` 10 px, `xl` 12 px, `xl-2` 14 px), `boxShadow` (`2`, the two-layer shadow the Active tab uses) and `colors` tokens, and NativeWind for styling.
The preset already has `surface-default-main`, `surface-gray-light`, `surface-gray-soft`, `stroke-brand-strong`, `text-gray-on-soft-background` and `text-default-body`.
It has no `alpha/dark/5` or `alpha/dark/10` color, which the bar's track and the Active tab's border use.
`Icon` takes a size and a text color class, and reads defaults from `IconDefaultsProvider`, which the Badge already uses for icons in its slots.
See proposal.md for motivation and the open questions that this design resolves.

Figma values read from the Tabs page: the Tab is 36 px high at size `M` and 44 px at `L`, with 12 and 16 px horizontal padding, 8 px vertical padding, 8 px between its parts, a 10 px radius, a 24 px icon and a 16 px semibold label.
The bar has 4 px (`M`) or 6 px (`L`) padding, 12 or 14 px radius and 1 px between tabs.

## Goals / Non-Goals

**Goals:**
- A `Tabs` container and a `Tab` button that cover both sizes, all four states and both layouts, driven by `active` and `onPress`.
- A tab that a screen can place icons in the way a Badge does.

**Non-Goals:**
- Tab panels, routing and keeping the selection. The screen owns them. Scrolling the active tab into view is also left out.
- The bar's background blur, vertical tabs and a disabled tab.

## Decisions

### A container of `Tab` buttons, size and layout through context

`Tabs` renders its children in the bar and provides its `size` and `layout` through a context, and each exported `Tab` reads them.
React Native has no nested style inheritance, so the context is how a tab knows the bar's size and layout without the screen repeating them.
The screen owns the selection: it passes `active` to one tab and an `onPress` to each.

**Rejected alternatives:**
- An `items` array. It hides the tabs from JSX, and the bar would own selection and scrolling that a "just a container" bar does not need.
- Uncontrolled selection with a default value. The screen shows the tab's content, so it has to know the selection anyway.

### Icons are slots, colored through the existing context

Each `Tab` has `leadingIcon` and `trailingIcon` as `ReactNode`.
Each tab wraps its slots in `IconDefaultsProvider` with size 24 and the text color class of its current look, so an `Icon` in a slot matches the label in every state, as in the Badge.

**Rejected alternatives:**
- Icon names on the item. It ties Tabs to the Icon set and blocks other content.

### One file with a state-look table

`tabsStyles.ts` holds a table of complete class strings by look (default, hover, focus, active) and a table by size.
Class strings are written out in full because Tailwind finds classes by scanning, and `noArbitraryValues.test.ts` forbids arbitrary values.
The looks differ only in colors and borders, so one file is easier to compare with Figma than a file per state.

**Rejected alternatives:**
- A file per state, as the Button does. The states share structure, so it adds files without structure.

### A bar that is always full width, with scrolling only in `content`

The bar is always `w-full`, and holds the fill, radius and stroke. The bar's padding and the 1 px between tabs sit on an inner row.
In `equal` the inner row is a plain `View` and each tab is `flex-1`, so nothing scrolls.
In `content` the inner row is the content container of a horizontal `ScrollView` without a scroll indicator, so the tabs take the width they need, start at the leading edge, and scroll when they are wider than the bar.
The padding is inside the scroll content, so the scroll view is as large as the bar and the Active tab's shadow is clipped no more than by the bar's own padding.

**Rejected alternatives:**
- Scrolling in both layouts. In `equal` the tabs share the width, so there is nothing to scroll.
- Scrolling the Active tab into view. It needs the bar to know the Active tab and measure its children; the screen can scroll with its own ref later if needed.

### States come from `Pressable`

The tab is a `Pressable`. Its pressed state selects the Hover look, and a focus handler sets the Focus look, as the Button does.
An Active tab keeps the Active look in every state, and its press does not call `onPress`.

### Two alpha color tokens

`alpha/dark/5` and `alpha/dark/10` are added to `colors.ts` as `rgba(2, 6, 23, 0.05)` and `rgba(2, 6, 23, 0.1)`, the values Figma shows, under `alpha.dark`, next to `alpha.always.white`.
The Active tab uses the existing `shadow-2` token.

### Accessibility

The bar has `accessibilityRole="tablist"` and each tab `accessibilityRole="tab"` with `accessibilityState={{ selected }}`.
Icons are hidden from assistive technology unless they have a label, which `Icon` already does.
Size `m` tabs are 36 px high, below the 44 pt iOS and 48 dp Android minimums, so each tab has a `hitSlop` that pads the touch area to the minimum without changing its look.
Contrast of every text and background pair is measured with `contrast.test.ts`, and failures are listed in the Tabs spec, as for the Badge.

## Risks / Trade-offs

- [`hitSlop` of neighboring tabs overlaps, since tabs are 1 px apart] → Slop is clipped by the sibling that is touched first on iOS and Android; check it in the Storybook app and, if it misfires, pad vertically only.
- [The translucent track over a non-white screen changes the Active tab's contrast context] → Measure against white and the gray screen color, and list failures as exceptions.
- [Dropping the blur makes the track look different from Figma over images] → The track is meant for plain screens, and the spec lists the blur as left out.
