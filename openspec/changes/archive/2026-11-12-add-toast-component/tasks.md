## 1. Resolve the open questions

- [x] 1.1 Get the user's answers to the proposal's open questions (timer: auto-dismiss only toasts without actions; announcement: polite, focus unchanged; close button: only when asked) and update the proposal, the host spec and the design to match
- [x] 1.2 Open the Secondary (2685:28205) and Success (2686:31133) type frames in "Mee - Design System v5.2.4", compare their colors with the table in the Toast spec, and verify the table and the "Open questions" entries agree with them

## 2. Icon

- [x] 2.1 Add `x` and `exclamation-octagon` to the Bootstrap glyph map in `packages/ui-kit/src/Icon/glyphs.tsx` and to the list in `Icon.test.tsx`; verify `pnpm --filter ui-kit test` passes and the test fails when a glyph entry is removed (scenario "Icons for a toast")

## 3. Toast

- [x] 3.1 Implement `packages/ui-kit/src/Toast/Toast.tsx` with the surface (two views, `shadow-3`, border, `rounded-lg`, clip), the type table, the icon slot, the title and the description, and verify tests cover every scenario of "The Toast has the design-system types", "Looks follow the design" and "The Toast shows an icon, a title and a description"
- [x] 3.2 Add the `action` (right) and `actions` (bottom) links as `Pressable` text in `SM/Regular` with the link color of the type, and verify tests cover all three scenarios of "The Toast offers a right link or bottom links"
- [x] 3.3 Add the `onClose` close button with a 20 px `x` icon and a `hitSlop` that reaches the 44 pt and 48 dp minimums, and verify tests cover both scenarios of "The close button is shown when the screen handles it" and that the Toast height is unchanged by the touch area
- [x] 3.4 Add the reading order (title, description, then links), the "Close" label, the button roles and the hidden icon, and verify tests cover both scenarios of "The Toast is described to assistive technology"
- [x] 3.5 Measure the contrast of each type's title, description and link against its fill (`code-practices/accessibility/spec.md`), list any failure under "Accessibility exceptions" in the Toast spec, and verify the contrast test lists the Toast pairs
- [x] 3.6 Add `UI/Toast` stories for the types, the slot combinations and a long title and verify they render in Storybook

## 4. ToastHost and toast

- [x] 4.1 Implement the store with `toast.show`, `toast.dismiss` and the id counter in `packages/ui-kit/src/ToastHost`, and verify tests cover "Dismissing a toast", "A second toast" and that a late `dismiss` of a replaced id does nothing
- [x] 4.2 Implement `ToastHost` with the absolute touch-through layer, the 12 px margins and the bottom inset, and verify tests cover both scenarios of "The host places the toast like the design", including the 378 px width on a 402 px screen
- [x] 4.3 Add the enter and leave movement and the Reduce Motion fade, and verify a test covers "Reduce Motion"
- [x] 4.4 Add `closable` and the `onClose` the host passes to the Toast, and verify a test covers "Closing a toast" and that tapping an action does not dismiss the toast
- [x] 4.5 Announce the title and description with `AccessibilityInfo.announceForAccessibility` when a toast appears, and verify a test covers "Announcing a danger toast" by asserting the call and its text
- [x] 4.6 Dismiss a toast without actions after 4 s from the host and keep one with `action` or `actions`, and verify fake-timer tests cover all three scenarios of "A toast without actions leaves by itself"
- [x] 4.7 Add `UI/ToastHost` stories with a button for each of the four types and verify they render in Storybook
- [x] 4.8 Verify "A screen fires a success toast" with `toast.show` called from a handler outside React in a test, and that `toast.show` without a mounted host does not throw

## 5. Exports, root and indexes

- [x] 5.1 Export `Toast`, `ToastHost`, `toast` and their prop types from `packages/ui-kit/src/index.ts`, and verify `pnpm --filter ui-kit typecheck` passes
- [x] 5.2 Mount `ToastHost` in `apps/app-tellipod/src/app/_layout.tsx` after `<Slot />` inside `SafeAreaProvider`, and verify the app typechecks and a toast shows above a screen on a simulator
- [x] 5.3 Add rows for `toast` and `toast-host` to `openspec/specs/components/ui-kit/README.md` in the main tree (read when: "Using or changing the Toast", "Showing a toast from a screen or changing where and how toasts appear"), and verify the table lists them
- [x] 5.4 Run `openspec validate add-toast-component --strict` and the ui-kit tests, typecheck and lint, and verify all pass

## 6. Walk-through on devices

- [ ] 6.1 Walk the toast through with VoiceOver on iOS and TalkBack on Android (announcement without a focus move, the close button and links reachable), and verify the result is recorded in the accessibility notes of the Toast spec
