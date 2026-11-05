## Why

Screens need a bottom sheet for a short list of actions or details about one item, such as the sheet over an info claim "Email: bogdan@gmail.com" with "Copy value", "Add to info I share" and "This isn't right, remove it".
The UI kit has no overlay component yet, so each screen would build its own sheet, with its own handling of swipe, backdrop, Android back, safe areas and content taller than the screen.
Two needs are not covered by a plain sheet: a sheet the user cannot dismiss (a step they must finish) and content of any length.

## What Changes

- Add a `Modal` component to `packages/ui-kit`: a bottom sheet with a grabber, a title, a subtitle, an optional badge and a free-form body.
- The screen owns visibility through `open`. `onClose` reports that the user asked to dismiss, by swiping down, tapping the backdrop or pressing Android back.
- A `locked` flag, absent by default, makes the sheet non-closable: swipe, backdrop tap and back do nothing, the grabber is hidden and `onClose` is never called. The screen closes a locked sheet by setting `open` to false.
- The header stays pinned. The body scrolls when the content is taller than the room the sheet has, and the sheet is as tall as its content otherwise.
- Add the sheet's shadow, from the design, to the kit's shadow tokens.
- Add stories `UI/Modal/...` and update the Storybook preview with what the sheet engine needs.
- The backdrop is `alpha/always/dark/80` over a 10 px background blur, as design specified.
- Add `@gorhom/bottom-sheet`, `react-native-gesture-handler`, `react-native-reanimated`, `react-native-safe-area-context` and `expo-blur` as peer dependencies of `packages/ui-kit`. The first four are already in the workspace catalog, and `expo-blur` is added to it.
- No footer or action row: buttons sit inside the scrolling body, as in the design.

**Example:** the design's sheet is 331 pt high with three buttons. With 40 buttons the same sheet stops below the status bar, keeps "Email: bogdan@gmail.com" and "Shared by Geo yesterday" in view, and scrolls the buttons.

## Capabilities

### New Capabilities

- `components/ui-kit/modal`: the Modal bottom sheet, its header, looks, scrolling body, closable and locked behavior, accessibility and stories.

### Modified Capabilities

None. The new shadow token and the index row in `components/ui-kit/README.md` change no requirement of an existing spec.

## Impact

- `packages/ui-kit`: new `src/Modal/`, an export in `src/index.ts`, a shadow token in `tailwind/tokens/shadows.ts`, peer dependencies in `package.json`.
- `apps/storybook`: the preview wraps stories in the providers the sheet needs.
- Every app that uses `Modal` has to mount the gesture-handler root and the sheet provider once, near its root.
- Source: Figma file "Mee - Tellipod App v4.0.3", node 119:9506 (Modal). The other ui-kit specs cite "Mee - Design System v5.2.4"; this node is in the app file.

## Open questions

- **Backdrop look.** Answered by design: `alpha/always/dark/80` with a 10 px background blur.
- **Height cap.** Accepted: a tall sheet stops 16 pt below the top safe area.
- **Name of the flag.** `locked` is the working name for the non-closable mode, chosen over `nonDismissible`, `persistent` (Material uses it for a non-blocking sheet) and `mandatory`.
