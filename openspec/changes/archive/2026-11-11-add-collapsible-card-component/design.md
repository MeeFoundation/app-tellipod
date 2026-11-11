## Context

`packages/ui-kit` has Button, Badge, TextField, Tabs, Breadcrumbs, Modal and Icon, a Tailwind preset with design tokens, and NativeWind for styling.
`TextField/useReduceMotion.ts` reads the system Reduce Motion setting, and `touchTarget.ts` gives `MIN_TARGET` and `hitSlopFor` for the accessibility touch-target minimum.
`Icon` takes a name from `Icon/glyphs.tsx`, where each Bootstrap icon is imported as an SVG component.
See proposal.md for motivation and the open questions.

Figma values read from the Info tab (node 820:14161): the Card is 362 px wide and its header is 48 px high.
A body row (`cell-info`) is 62 px high and is inset 12 px on each side, so it is 338 px wide.
The footer container is 56 px high and holds a 346 x 44 px Button inset 8 px.
The component is `Card-Cell-Details-Preview`, with a `List` slot for the body and a `Container` slot for the footer.
Exact colors, radius and shadow still need to be read from the Figma variables.

## Goals / Non-Goals

**Goals:**
- A `Card` that a screen can use for both the expandable "Contact info" and the navigable "Members".
- A `CellInfo` and a `Divider` that fit in its body slot.

**Non-Goals:**
- The Info screen, the Avatar, the pod top bar and the "FORMS" section label.
- Persisting the expanded state. The screen owns it when it needs it.
- Drag handles, swipe actions and a disabled Card, because the design shows none.

## Decisions

### One Card with two modes

`Card` takes `mode`, which is `expandable` or `navigable`, and shares the header in both.
In `expandable` it shows a down chevron and the body and footer when expanded.
In `navigable` it shows a right chevron and calls `onPress`, and ignores any body.
This follows Figma, where both are one component, and keeps the header's look in one place.

**Rejected alternatives:**
- Two components, `Card` and `NavigationCard`. They would duplicate the header and drift apart.
- Deriving the mode from the props, such as `onPress` present means navigable. It hides a mode that decides the chevron and the accessibility state.

### Controlled or uncontrolled expansion

`expanded` and `onExpandedChange` make the Card controlled, and `defaultExpanded` makes it uncontrolled, as React inputs do.
A screen that stores nothing gets a working Card, and a screen that restores state per pod can own it.

**Rejected alternatives:**
- Controlled only. Every screen would need a `useState` for a toggle that nobody else reads.

### Body and footer are slots, children are the body

The Card renders `children` as the body and a `footer` node under it, inside the Card's border.
`CellInfo`, `Divider` and `Button` stay independent kit components, so the Card does not know about them.

**Rejected alternatives:**
- A `rows` array. It hides the body from JSX and blocks the Divider and other content.
- A Card that renders its own "Add" button. The label, icon and handler would all become Card props.

### Animating the measured height with React Native `Animated`

One `Animated.Value` goes from 0 to 1 on the JS driver and drives the body's height, its opacity and the chevron's turn.
The height cannot use the native driver, so everything follows the one value.
The body and footer are laid out absolutely inside a clipped box, and `onLayout` gives their height, so the box's height is that value times the measured height.
The content stays mounted until the collapse has finished, and a Card that is open on mount starts at 1 and does not animate.
When `useReduceMotion` is true, durations are 0.
`useReduceMotion` is moved from `TextField/` to the kit root so that both components import it from one place.

**Rejected alternatives:**
- `react-native-reanimated`. The kit's components use `Animated`, and reanimated is only a peer dependency of the Modal.
- Fade and chevron only, with the body mounting at full height. It is simple, but the Card jumps open and closed.
- `LayoutAnimation`. It animates every layout change on the screen, not only this Card.
- Duplicating the hook in `Card/`. The kit would have two copies of one rule.

### A visible edge: 1 px border and the `shadow-3` token

Figma draws the Card edge as the "Box shadow/1st Level" effect: a 1 px ring and a 20 px glow, both at 5% dark.
On a white or lightly tinted background that is nearly invisible on a device, so the Card uses a 1 px `stroke/gray/light` border, the same color as the header line, and the existing `shadow-3` token.
This differs from the Figma effect on purpose, so the Card spec states no shadow and the difference is recorded here.

**Rejected alternatives:**
- The Figma effect as a new `level-1` shadow token. It rendered, but too faintly to read the Card's edge in Storybook.

### Touch targets by hit slop

The header is 48 px high, so it already meets 44 pt on iOS and 48 dp on Android.
The pencil in `CellInfo` is an icon button and gets `hitSlopFor` padding to reach `MIN_TARGET`.

### Icons added to the kit

The eight glyphs are Bootstrap icons that exist in the installed package, and each is imported in `Icon/glyphs.tsx`.
The Icon spec lists the new names.

## Risks / Trade-offs

- [Names may differ from the design system] -> The kit names are recorded as an assumption in proposal.md and are cheap to rename before use.
- [The first frame of an expanding body is laid out before its height is measured] -> The box starts at no height and the animation is 200 ms, so the unmeasured frame is clipped. Check it in Storybook on iOS and Android.
- [A body that changes height while open] -> `onLayout` keeps the measured height current, so the box follows it.
- [A body of many rows is tall when expanded] -> The Card grows with its content. A scrolling body is out of scope until a screen needs it.
- [Bootstrap `pencil` and `plus` may differ in weight from the Figma glyphs] -> Compare in Storybook, and note any difference in the Icon spec, as the Icon spec already does for other glyphs.
