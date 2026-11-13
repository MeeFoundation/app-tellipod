## Context

The kit (`packages/ui-kit/src`) holds one folder per component with the component, its stories and its tests, exported from `index.ts`.
Components are styled with NativeWind token classes and static class names (`components/ui-kit/tokens-and-theming`).
The kit already depends on `react-native-reanimated`, `react-native-safe-area-context` and `react-native-gesture-handler`, and the `Modal` shows the pattern for a layer above the screen (it reads the Reduce Motion setting and announces itself to screen readers).
The app root (`apps/app-tellipod/src/app/_layout.tsx`) nests `GestureHandlerRootView`, `SafeAreaProvider`, a Jotai provider and `BottomSheetModalProvider` around the screens.
The `Button` has a `link` variant, but its label is `font-public-sans-semibold`, while the design's Toast link is `SM/Regular`.
See `proposal.md` for the motivation, the scope and the open questions, and `specs/components/ui-kit/toast` and `toast-host` for the requirements.

## Goals / Non-Goals

**Goals:**

- A `Toast` that renders the four implemented types from tokens and exposes slots, not one prop per Playground example.
- A `toast.show` call that works from any code, including code outside a React tree.

**Non-Goals:**

- No stack or queue of toasts, no swipe to dismiss, no Avatar slot.
- No caller-set duration: the timer is one constant.

## Decisions

### The Toast is a pure view with slots

`Toast` takes `type`, `icon`, `title`, `description`, `action`, `actions` and `onClose`, and holds no state.
The type picks a look from one table of static class names (fill, border, title, description, link), the way `Badge` and `LinkButton` pick theirs, so `noArbitraryValues` and NativeWind's static extraction keep working.
The surface uses the two-view pattern of `Card` and `CardSurface` (an outer view with `shadow-3`, an inner view with the border, the radius and the clip), because `overflow: hidden` clips the shadow.
The icon slot takes an `Icon`, and the Toast gives it the 16 px size and the title color of its type by the same rule as the Badge's icon slots (`components/ui-kit/icon`: an Icon given no size or color takes the slot's).
`description` sits in the same column as the title, with a 16 px spacer under the icon when there is an icon, as the design's `Icon-spacer` does.

**Rejected alternatives:**

- One prop per Playground example (`withAvatar`, `withActions`, and so on).
  - **Cons:** grows with every example and repeats the slots under different names.
- A `variant` prop of "layout" names.
  - **Cons:** the design has no such variant; the three layouts are combinations of the same parts.

### The Toast draws its links itself

Each link is a `Pressable` with the role of button and a `Text` in `SM/Regular` and the link color of the type, not a `Button` with `variant="link"`.
The `Button`'s link label is semibold at every size, so using it would not match the design, and changing it would change the Button without a design-system change.
The Toast's links are not `Button`s in the design either: the layer is `Link`, a text with an optional icon.

**Rejected alternatives:**

- `Button` with `variant="link"` and `size="s"`.
  - **Cons:** semibold label, 30 px height and button padding, none of which the toast's link has.
- Adding a regular-weight option to `Button`.
  - **Cons:** a variant that the design system's Button does not have, which the kit rule "exactly the variants of the design-system component" forbids.

### The close button's touch target comes from `hitSlop`

The close button is a 20 px `x` `Icon` in a `Pressable` whose `hitSlop` grows its touchable area to 44 pt on iOS and 48 dp on Android, using `touchTarget.ts`, which the kit already has, so the Toast does not get taller than the design's 44 px row.

### `toast` is a small store and the host subscribes to it

`toast.show` and `toast.dismiss` write to a module-level store holding the current toast (an id and its props) and notify subscribers.
`ToastHost` subscribes with `useSyncExternalStore`, so code outside React (a request callback, a handler) can call `toast.show` without a hook or a context, and a call made before the host mounts is kept and shown when the host mounts, because it is just the store's current value.
The store holds one toast, so `show` replaces it, which is the "one at a time" requirement.
The ids are a counter, and `dismiss(id)` removes the toast only when `id` is the current one, so a late `dismiss` for a replaced toast does nothing.

**Rejected alternatives:**

- A React context with a `useToast` hook.
  - **Cons:** cannot be called from code outside the tree, and every screen that fires a toast takes the hook.
- A Jotai atom, because the app already has Jotai.
  - **Cons:** the kit does not depend on Jotai and should not take it for one value; `useSyncExternalStore` is enough.

### The host sits in an absolute, touch-through layer

`ToastHost` renders an absolutely positioned view with `pointerEvents="box-none"` at the bottom of the screen, with `paddingBottom` of the bottom inset from `useSafeAreaInsets` plus 12 px and 12 px side padding, and the Toast inside it.
It is mounted in `_layout.tsx` after `<Slot />` and inside `SafeAreaProvider`, so it draws above every screen but takes touches only on the toast.
It is not a native modal: a native modal would take the touches of the screen and would sit under or over the `BottomSheetModal` unpredictably; the open question about the keyboard and the bottom menu is left to a later change, since the design shows neither.

**Rejected alternatives:**

- Showing the toast in a `Modal` or a bottom sheet.
  - **Cons:** blocks the screen behind it, which a toast must not do.
- Each screen renders its own `Toast` at the bottom.
  - **Cons:** every screen repeats the placement, and a toast fired by a handler would disappear on navigation.

### The host owns the timer

The host starts a 4 s timeout in an effect keyed on the toast's id when the toast has no `action` and no `actions`, and clears it when the id changes or the host unmounts, so a replacing toast gets its own 4 s and a dismissed toast leaves no stray timer.
The timeout calls `toast.dismiss(id)`, so the guard against a replaced id also covers a timer that fires late.
The store stays free of timers, so it is testable without fake timers.

**Rejected alternatives:**

- A `duration` prop on `toast.show`.
  - **Cons:** the user chose one rule, and a per-call duration is a variant the design does not show.
- Dismissing every toast after 4 s.
  - **Cons:** a toast with a "Refresh" link could vanish before the user reads it.

### Motion and announcement

The toast enters with a reanimated `FadeIn` and a slide from the bottom, and leaves the reverse, using the kit's `useReduceMotion` to drop the slide.
When a toast appears, the host calls `AccessibilityInfo.announceForAccessibility` with the title and the description, so the screen reader reads it without moving focus.
The same call exists on iOS and Android, so one code path serves both.

## Risks / Trade-offs

- [The announcement may be spoken twice or not at all on some Android versions] → verify with TalkBack as the accessibility spec requires, and fall back to a live region on the toast if needed.
- [A toast with actions never leaves by itself] → the screen that fires one passes `closable` or its handler calls `toast.dismiss`; the host's story shows both.
- [A module-level store is shared state in tests] → the host test resets the store in `beforeEach`.
- [The 12 px offset above the safe area is read from one Tellipod frame] → the spec states it as a requirement with the 402 px example, so a design change is a spec change.
