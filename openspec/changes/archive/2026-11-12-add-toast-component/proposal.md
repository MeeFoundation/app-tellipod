## Why

The app has to tell the user that something happened without leaving the screen: "All suggested contact info added" after the user accepts suggested contact info, or "Server error!" when a request fails.
The Tellipod design shows this as a Toast (nodes 908:19458, 914:20086 and 820:17710 of "Mee - Tellipod App v4.0.3"), and the design system defines it (Toast page, node 28:11001 of "Mee - Design System v5.2.4").
The ui-kit has no Toast, so a screen would build it from raw markup, which the kit rule "components match the design system" forbids, and would also have to decide alone where it sits and when it goes away.

**Example:** After the user adds all suggested contact info, a green toast "All suggested contact info added" with a check-circle icon and a close button appears above the bottom edge of the screen.
When a request fails, a red toast "Server error!" with the line "Try to refresh your page." and a "Refresh" link appears in the same place.

## What Changes

- Add the `Toast` to the kit: a card with an optional leading icon, a title, an optional description, and either one link on the right or a row of links below the text, plus an optional close button.
- Give the `Toast` the design-system types that a screen needs: `primary`, `secondary`, `success` and `danger`.
- Add the `ToastHost` and an imperative `toast` API: any code calls `toast.show(...)` and the host, mounted once at the root of the app, shows the toast above the bottom edge of the screen, above the safe area.
- Add the icons `x` and `exclamation-octagon` to the Icon list; the Toast's close button and its `danger` icon draw them.
- Mount the `ToastHost` in the root layout of `apps/app-tellipod`.
- List both components in the ui-kit `README.md` index and export them from the kit.
- Add stories for the `Toast` and for the host.

Out of scope: the Toast with an Avatar (it needs the Avatar's top badge and status dot, which the Avatar spec leaves out), the types `tertiary`, `dark` and `warning`, which no screen uses and which the design frames I read do not show, and any screen that fires a toast.
The notification list items of the "Notifications" section (`Notification`, nodes 1370:29080 and others) are a separate component.

## Capabilities

### New Capabilities

- `components/ui-kit/toast`: the Toast with its types, its slots (icon, title, description, right link, bottom links, close button) and its look.
- `components/ui-kit/toast-host`: the host and the `toast` API that show, replace and dismiss a Toast above the safe area.

### Modified Capabilities

- `components/ui-kit/icon`: the list of icon names gains `x` and `exclamation-octagon`.

`components/ui-kit/README.md` also gets two index rows; it is an index, not a spec.

## Impact

- New code in `packages/ui-kit/src/Toast` and `packages/ui-kit/src/ToastHost`, plus exports in `packages/ui-kit/src/index.ts`.
- Adds `x` and `exclamation-octagon` to `packages/ui-kit/src/Icon/glyphs.tsx` and its test.
- Reuses `Icon`, `react-native-reanimated`, `react-native-safe-area-context` and the tokens in `components/ui-kit/tokens-and-theming`. The kit already depends on both libraries.
- Edits `apps/app-tellipod/src/app/_layout.tsx` to mount the host inside the safe-area provider.
- No change to pod data or to any screen.
- Sources: "Mee - Design System v5.2.4" (Toast page, node 28:11001; Playground nodes 2685:29246, 2685:29367, 2685:26881 and 2685:26882, and the types Primary 2686:31028, Secondary 2685:28205, Success 2686:31133, Danger 2686:31348) and "Mee - Tellipod App v4.0.3" (Toast 908:19458, 914:20086 and 820:17710).

## Decisions

- **Scope of the types.** The kit implements `primary`, `secondary`, `success` and `danger`. The Playground shows the brand-tinted toast as Primary, the white toast as Secondary and the red toast as Danger; the Tellipod file shows the green Success. `tertiary`, `dark` and `warning` wait for a screen, as the kit rule "a component is added when a screen needs it" says, and the Toast spec names them as left out.
- **Layouts.** The Toast has slots, not one prop per Playground example: `icon`, `title`, `description`, `action` (right) or `actions` (bottom), and `onClose`. The three Playground layouts without an avatar are combinations of these slots.
- **Imperative API.** A toast is fired from event handlers, effects and request callbacks that have no view to render it in, so the kit gives `toast.show(...)` and one `ToastHost` and does not make every screen hold `open` state for a Toast.
- **One toast at a time.** `toast.show` replaces the toast on screen. The design shows no stack.
- **How long a toast stays.** A toast without actions leaves by itself after 4 s; a toast with an `action` or `actions` stays until the user closes it, taps an action that dismisses it, or code calls `toast.dismiss`. The design shows no timer, so the 4 s is chosen here and confirmed by the user. The caller cannot set another duration.
- **Screen reader.** The host announces the title and the description as a polite announcement and leaves screen reader focus where it was.
- **Close button.** `Toast` shows it only when given `onClose`, and the host shows it only when the caller passes `closable`.
- **Danger icon.** The design draws `exclamation-octagon`, not the `exclamation-circle` that the Icon already has, so the Icon list gains it.
