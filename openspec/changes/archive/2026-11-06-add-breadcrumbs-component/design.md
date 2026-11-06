## Context

See proposal.md for why, and `specs/components/ui-kit/breadcrumbs/spec.md` for the requirements.
The kit has `Tabs`, which is the nearest precedent: a container that gives its size to its items through context, a `ScrollView` for overflow, `Pressable` items with a tracked pressed and focused state, vertical `hitSlop` to reach the platform touch minimum, and classes written out in full in a styles module.
Every token the design uses is in the kit: `text/brand/solid`, `text/brand/solid_hover`, `text/gray/solid`, `surface/gray/soft`, `surface/brand/light`, `stroke/gray/light`, `rounded-md`, `rounded` (4 px), spacing `0.5`, `1`, `1.5`, `2`, `2.5`, opacity `60`, and the `text-xs`, `text-sm` and `text-base` sizes.
The Icon list lacks `house` and `chevron-right`; both are Bootstrap Icons names (`icon` spec), so adding them is two imports.
The component is a view of labels the screen gives it. Which pod is the parent of which is defined by `MeeFoundation/pod-ontologies`, and the app resolves it before it renders the line.

## Goals / Non-Goals

**Goals:**

- Match the design's Breadcrumbs: three sizes, two styles, the link states.
- The same shape as `Tabs`, so the kit stays consistent for screens.

**Non-Goals:**

- Reading the ontology, building the trail from a pod, or navigating. The screen does these in `onPress`.
- Collapsing a long trail into "..." by itself. The screen decides which items to hide and passes "..." as an item.
- A hover state, because touch has none.

## Decisions

**D1. `Breadcrumbs` and `Breadcrumb`, with the separator drawn by the container.**
`Breadcrumbs` reads its children with `Children.toArray`, wraps each in a small context that carries whether it is the last, and the `Breadcrumb` draws its own chevron unless it is last. In the design the chevron is inside the item, and the Focus fill covers it, so it stays inside the item's pressable view instead of being a sibling.
The size reaches the items through one context, as in `Tabs`. Text and icon colors reach the leading `Icon` through the kit's `IconDefaultsProvider`, with the size from the table.

**Rejected alternatives:**

- An `items` array prop (`{ label, onPress }[]`): fewer parts to compose, but it cannot take a leading icon or a custom element in one item, and `Tabs` already composes children.
- The container draws the chevrons as siblings between items: the Focus fill would stop at the label and not match the design.

**D2. Link or text is decided by `onPress`.**
An item with `onPress` renders a `Pressable` with the role of link. An item without renders a `View` with text, with no press handling and no states. A separate `current` flag would let a link be marked current while still tappable, which the design does not show.
`disabled` keeps the Pressable, so a screen reader still finds it and announces it as disabled, and applies 60% opacity.

**D3. State is tracked in the item and the classes are fixed per state.**
As in `Tabs`, pressed and focused come from `onPressIn`, `onPressOut`, `onFocus` and `onBlur`, and the looks are a table of whole class strings in `breadcrumbsStyles.ts`. Pressed is the Hover look. The underline is a 1 px view on the label, as in the design, shown for Hover only.
Every look sets the same variables from the first render, for the reason in `tabsStyles.ts`: a look that gains a shadow or variable after its first render remounts under NativeWind. The Breadcrumbs has no shadow, so this is checked in the first test of states and not assumed.

**D4. Overflow is a horizontal `ScrollView` that starts at the end.**
The line is a `ScrollView` with `horizontal`, no indicator, and `onContentSizeChange` calls `scrollToEnd({ animated: false })` so the current place is in view. A horizontal `ScrollView` takes no width from its content when no parent fixes the width, and collapses to nothing: the first version, sized by `self-start max-w-full` alone, showed nothing in the Storybook stories. So the line measures the width of its content (`onContentSizeChange`) and the width its parent gives (`onLayout` of a full-width view around the box) and sets the `ScrollView` width to the smaller, less the outlined box's padding and border. A short trail is as wide as its items and a long one fills the parent and scrolls. The `ScrollView` is also `grow-0`: a horizontal `ScrollView` grows by default, and under a column parent without a fixed height it took the whole screen and pushed everything after it out of view. The outlined style puts the fill, border, radius and padding on a box with `self-start max-w-full`, with the `ScrollView` inside it.
`scrollToEnd` on every content size change would pull the user back while they read earlier items if the trail is edited. The trail is edited when the screen changes pods, which is a new position, so it scrolls to the end then too.

**Rejected alternatives:**

- Wrap to several lines: the line grows with the trail and pushes the screen down.
  - **Cons:** the screen under it moves each time the user opens a deeper pod.
- Truncate each label with an ellipsis: all items stay visible.
  - **Cons:** short labels such as "Home" lose nothing while long labels become unreadable, and the design shows no truncation.
- Collapse into "..." inside the kit: the kit would decide which parents to hide, which belongs to the screen and to design.

**D5. Touch target by vertical `hitSlop`.**
The items touch, so slop is only above and below: `ceil((minimum - height) / 2)` for 44 pt on iOS and 48 dp on Android, the function `hitSlopFor` the `Tabs` already has. It moves to a shared module if the Breadcrumbs needs it, instead of being copied; whether it is exported from `Tabs/Tab.tsx` for reuse or lifted to `src/` is decided when the second use is written, and `knip` must stay clean.
The outlined style's 4 px vertical padding sits outside the items and does not add touch area.

**D6. Glyph sizes are explicit.**
The house takes the table size through `IconDefaultsProvider`, and the chevron is an `Icon` of the table size with the item's text color. Both are decorative: no accessibility label, so they are hidden from assistive technology.

## Risks / Trade-offs

- [A touch area padded only vertically leaves a narrow target for a short label, such as "Home" at size `s`, about 30 px wide] → Listed under accessibility exceptions. Design is asked whether a larger item padding is acceptable.
- [Scrolling to the end can hide "Home", the way back to the root] → The first item stays reachable by swiping, and the open question in proposal.md asks design for the intended overflow.
- [`onContentSizeChange` runs on every layout and could fight the user's own scroll] → The scroll to the end runs only when the content width changes, and a test checks that a re-render with the same items does not scroll.
- [NativeWind class changes between states could remount an item and drop the press] → The same fixed-class approach as `Tabs`, with a test that presses an item and checks it keeps the pressed look until release.
