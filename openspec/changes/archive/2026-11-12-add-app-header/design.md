## Context

The kit (`packages/ui-kit/src`) holds one folder per component with the component, its stories and its tests, exported from `index.ts`.
Components are styled with NativeWind token classes and static class names (`components/ui-kit/tokens-and-theming`); colors that a class cannot express, such as gradient stops, are passed from token values, as `Button/ButtonBase.tsx` does with `expo-linear-gradient`.
The kit already depends on `expo-linear-gradient`, `react-native-reanimated` and `react-native-safe-area-context`, and has `touchTarget.ts` (`MIN_TARGET`, `hitSlopFor`) and `useReduceMotion`.
The `Modal` reads the safe-area inset with `useSafeAreaInsets`, and the `ToastHost` is the pattern for reanimated movement with a Reduce Motion fallback.
The `TextField` is a labelled input whose `Pressable` focuses a `TextInput`, so it cannot be a button that only looks like a field.
See `proposal.md` for the motivation, the scope and the open questions, and `specs/components/ui-kit/app-header`, `header-icon-button` and `search-entry` for the requirements.

## Goals / Non-Goals

**Goals:**

- One `AppHeader` that the Home, Pod, Pod with tabs and Filter layouts of the design all compose from slots.
- A height change that does not jump the content below it.

**Non-Goals:**

- No status bar content, no scroll-linked collapse, no navigation logic: the header does not know about routes, and the screen wires `onPress` handlers.

## Decisions

### The shell is a gradient view with a content column

`AppHeader` renders an outer view with the shadow and the bottom corners, and inside it a clipped `LinearGradient` (from `surface/brand/light` to `surface/default/main`, top to bottom) that holds the content: a top spacer of the safe-area inset, the title row, and the children.
The two-view pattern of `Card` and `CardSurface` and of the Toast applies: the outer view carries the shadow, because `overflow: hidden` on the inner view clips it, and the inner view carries the 1 px bottom border, the 28 px bottom radius and the clip.
The shadow is a new token (0 px x, 1 px y, 15 px blur, `alpha/always/dark/15`) next to the Modal's upward shadow in `tailwind/tokens/shadows.ts`, because `noArbitraryValues` forbids writing the numbers in the component.
The gradient colors come from the token object, not from a class, so the stops stay tied to the tokens.

**Rejected alternatives:**

- A `View` with `bg-gradient-to-b` classes.
  - **Cons:** NativeWind on React Native has no gradient utility, which is why `ButtonBase` uses `expo-linear-gradient`.
- A solid fill.
  - **Cons:** does not match the design's visible gradient.

### Slots are props, the bottom slot is `children`

`leading`, `media`, `title`, `subtitle` and `trailing` are named props of type node, and `children` is the bottom slot.
A string `title` or `subtitle` is wrapped in a `Text` with the design's look, and any other node is rendered as it is; the title's wrapper has `numberOfLines={1}` and `ellipsizeMode="tail"`, and a node title is the caller's to truncate.
The text column is a `flex-1` view with `min-w-0`, so a long title truncates instead of pushing the trailing slot out.
`titleSize` (`base` or `xl`) and `titleAlign` (`start` or `center`) are the only look props, because the design has these two title looks and two alignments.
With `titleAlign` `center`, the text column centers its text, and the row adds a 44 px empty view on the side that has no `leading` or `trailing`, which reproduces the Filter frame's hidden 44 px balancing button (node 364:11225, opacity 0), so the title is centered on the header, not between the chevron and the edge.

**Rejected alternatives:**

- A `variant` prop (`home`, `pod`, `filter`).
  - **Cons:** repeats the slot combinations under names, and grows with every screen, as the Toast design also rejected.
- Compound components (`AppHeader.Title`, `AppHeader.Trailing`).
  - **Cons:** more API for the same result, and the kit's components (Toast, Card) take slots as props.

### The safe-area inset is read with `useSafeAreaInsets`

The top spacer is `insets.top` high, so the real device decides the status bar area, as the `Modal` does for its bottom.
The header draws no status bar, because the device draws the real clock and battery over the gradient, and `expo-status-bar` is the app's concern.
Stories run inside a `SafeAreaProvider`, with a top inset of 64 in the story decorator, so the stories match the Figma heights (142 and 206).

### The height animates with a reanimated layout transition

The content column uses `LinearTransition` with a 200 ms duration, so when the children or a slot is added or removed, the header's height eases, and `entering` and `exiting` fades on the bottom slot keep it from popping.
The first render has no `entering` animation, so a screen opens with the header already in place.
When `useReduceMotion` is true the transition and the fades are not set, so the height changes at once.
The 200 ms comes from the Toast host's movement, since the design shows no timing.

**Rejected alternatives:**

- Animating a measured height with a shared value.
  - **Cons:** needs `onLayout` measuring and a second render to know the target, and breaks when the content wraps or the font scales.
- `LayoutAnimation` from React Native.
  - **Cons:** animates every layout change on the screen, not only the header, and needs a platform flag on Android.

### `HeaderIconButton` and `SearchEntry` are separate components

`HeaderIconButton` is a `Pressable` of the role button, a 44 px square, with an `Icon` of 24 px, a `hitSlop` from `hitSlopFor` so Android reaches 48 dp, and a pressed fill from `surface/gray/light`.
The required `accessibilityLabel` is a required prop of the type, so a missing label is a type error.
`SearchEntry` is a `Pressable` of the role button that draws the field's look (border, fill, 12 px radius, 12 px padding, a 20 px `search` icon and the placeholder) and a `surface/gray/soft` fill while pressed, because the placeholder on `surface/gray/light` measures 4.34:1; it is not a `TextField` with a disabled input.
A read-only `TextField` would still be a labelled input to a screen reader, would need a floating label that the design does not show, and would open the keyboard on some platforms when tapped.

**Rejected alternatives:**

- A `TextField` with `editable={false}` and an `onPress`.
  - **Cons:** the `TextField` requires a label and announces itself as an input, which is wrong for a button that opens another screen.
- Building the back and kebab buttons from `Button` with an icon.
  - **Cons:** the design-system Button has no icon-only 44 px square type, and the kit rule "exactly the variants of the design-system component" forbids adding one.

## Risks / Trade-offs

- **[Height differs from Figma on other devices]** The header's height depends on the real top inset, so it is not 142 or 206 on every device → the spec names the inset as the variable, and the stories pin it at 64.
- **[The gradient is drawn behind text]** The title and subtitle sit on a gradient, so the contrast depends on where they sit → the contrast test measures them against `surface/brand/light`, the darkest stop.
- **[`LinearTransition` and the safe-area spacer]** A change of the inset (rotation) would animate the header's height → rotation is not supported by the app, and Reduce Motion removes the animation anyway.
- **[Layout animations in tests]** Jest does not run reanimated's layout animations → tests assert the presence of the `layout` prop and Reduce Motion's absence of it, and the animation is verified in Storybook.
